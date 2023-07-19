import { Chat, User } from "./database";
import { DiscordClient } from "./discord";
import { UserType, MessageType, ChatType } from "./interface";
import { v4 as uid_v4 } from "uuid";

export class ChatControler{

    private roomList:Array<ChatType> = []
    private userCache:Array<UserType>= []
    private static instance: ChatControler;
    // private discordControler:DiscordClient = DiscordClient.getInstance()


    public static getInstance(): ChatControler {
        if (!ChatControler.instance) ChatControler.instance = new ChatControler();
    
        return ChatControler.instance;
    }


    async createRoom(allUser:Array<UserType | string>):Promise<ChatType>{
      let listUser:Array<UserType> = []
      let userInfostring:string = ""

      //generate chatID
      let chatID:string = uid_v4()

      //reload type if not true
      for (let index = 0; index < allUser.length; index++) {
        let user = allUser[index];
        if(typeof user == "string"){
          listUser.push( (await User.findOne({userID:user})) as UserType )
        }else{
          listUser[index] = (allUser[index] as UserType)
        }
        await User.findOneAndUpdate({ userID: user }, { currentChatID: chatID });
        userInfostring = userInfostring+` ${index+1}.**${listUser[index].userID}** - ${listUser[index].displayName}\n`
      }
      
      
      //generate Discord Thread room
      let thread = await DiscordClient.createThread(process.env.CHAT_THREAD_ID,chatID,"Log chat có ID: **"+ chatID+"**\nCác thành viên:\n"+userInfostring)
      
      //save info to db
      const chatModel = new Chat({
        chatID,
        threadID:thread.id,
        members: listUser.map(user => user.userID),
        chatMess: [],
      });

      await chatModel.save()

      //save info to manager

      let ChatRoom:ChatType = {
        chatID,
        threadID:thread.id,
        members:listUser,
        chatMess:[]
      }
      this.roomList.push(ChatRoom)
      return ChatRoom
    }

    async addTextChatRecord(chatInput:string|ChatType,userInput:string|UserType,content:string){
      //if room is id base, change it to chat type
      let chat:ChatType 
      let user:UserType 

      if(typeof chatInput == "string"){
        chat = this.roomList.find(f => f.chatID == chatInput)
      }else{
        chat = chatInput
      }
      //if user is id base, change it to user type
      if(typeof userInput == "string"){
        user = this.userCache.find(f => f.userID == userInput)
        // console.log(user)
        //double check if cache being pruge
        if(!user){
          user = await User.findOne({userID:userInput})
          this.userCache.push(user)
        }
      }else{
        user = userInput
      }

      //send to discord
      await DiscordClient.sendTextChatToChatLog(user,chat,content)

      //send a save to db
      const chatInDB = await Chat.findOne({ chatID: chat.chatID })
      chatInDB.chatMess.push({ sender: user.userID, text: content, sent_time: Date.now() })
      chatInDB.save()

    }

    



}