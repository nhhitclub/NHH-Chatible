import { Chat, User } from "./database";
import { DiscordClient } from "./discord";
import { UserType, ChatType } from "./interface";
import { v4 as id_generation } from "uuid";

export class ChatController{

    private roomList:Array<ChatType> = []
    private userCache:Array<UserType> = []
    private static instance: ChatController;

    public static getInstance(): ChatController {
        if (!ChatController.instance) ChatController.instance = new ChatController();
    
        return ChatController.instance;
    }


    async createRoom(allUsers:Array<UserType | string>):Promise<ChatType>{
      const listUser:Array<UserType> = []
      let userInfoString:string = ""

      const chatID:string = id_generation()

      //reload type if not true
      await allUsers.forEach(async (user, index) => {
        if(typeof user == "string"){
          listUser.push((await User.findOne({userID:user})) as UserType)
        }else{
          listUser[index] = (user as UserType)
        }
        await User.findOneAndUpdate({ userID: user }, { currentChatID: chatID });
        userInfoString = userInfoString+` ${index+1}.**${listUser[index].userID}** - ${listUser[index].displayName}\n`
      })
      
      
      const thread = await DiscordClient.createThread(
        process.env.CHAT_THREAD_ID,chatID,
        "Log chat có ID: **"+ chatID+"**\nCác thành viên:\n"+userInfoString
      )
      
      const userObj: any = {
        chatID,
        threadID:thread.id,
        members: listUser.map(user => user.userID),
        chatMess: [],
      }

      const chatModel = new Chat(userObj);
      await chatModel.save()

      userObj.members = listUser;
      this.roomList.push(userObj);

      return userObj;
    }

    async addTextChatRecord(chatInput:string|ChatType,userInput:string|UserType,content:string){
      
      const chat:ChatType = 
        (typeof chatInput == "string") ? this.roomList.find(f => f.chatID == chatInput) : chatInput;

      const user:UserType = (typeof userInput == "string") ? (
        this.userCache.find(f => f.userID == userInput) || await User.findOne({userID:userInput})
      ) : userInput;

      if(!this.userCache.find(f => f.userID == userInput)) this.userCache.push(user);

      await DiscordClient.sendTextChatToChatLog(user, chat, content)

      const chatInDB = await Chat.findOne({ chatID: chat.chatID })
      chatInDB.chatMess.push({ sender: user.userID, text: content, sent_time: Date.now() })
      chatInDB.save()

    }



}