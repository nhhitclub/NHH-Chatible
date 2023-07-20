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
          await User.findOneAndUpdate({ userID: user }, { currentChatID: chatID });// TODO: bug here
        }else{
          listUser[index] = (user as UserType)
          await User.findOneAndUpdate({ userID: listUser[index].userID}, { currentChatID: chatID });// TODO: bug here

        }
        //add user to cache
        await this.userCache.push(listUser[index])
        //add to userInfostring
        await (userInfoString = userInfoString+` ${index+1}.**${listUser[index].userID}** - ${listUser[index].displayName}\n`)
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
        (typeof chatInput == "string") ? this.roomList.find(f => f.chatID == chatInput)  : chatInput; //TODO: add chat info from db if cannot find

      const user:UserType = (typeof userInput == "string") ? (
        this.userCache.find(f => f.userID == userInput) || await User.findOne({userID:userInput})
      ) : userInput;

      if(!this.userCache.find(f => f.userID == userInput)) this.userCache.push(user);

      await DiscordClient.sendTextChatToChatLog(user, chat, content)

      const chatInDB = await Chat.findOne({ chatID: chat.chatID })
      chatInDB.chatMess.push({ sender: user.userID, text: content, sent_time: Date.now() })
      chatInDB.save()

    }

    async endChatRecord(chatInput:string|ChatType,userInput:string|UserType){
      const chat:ChatType = 
        (typeof chatInput == "string") ? this.roomList.find(f => f.chatID == chatInput) : chatInput; //TODO: add chat info from db if cannot find

      const user:UserType = (typeof userInput == "string") ? (
        this.userCache.find(f => f.userID == userInput) || await User.findOne({userID:userInput})
      ) : userInput;

      // if(!this.userCache.find(f => f.userID == userInput)) this.userCache.push(user);

      //cập nhật dữ liệu lên db và xóa dữ liệu trong cache
      chat.members.forEach(async (mem) =>{
        //cập nhật dữ liệu db
        await User.findOneAndUpdate({ userID: mem.userID }, { currentChatID: "" });
        this.userCache.filter((val,ind,arr)=> { if(val.userID == mem.userID ){arr.splice(ind,1);return true} return false})
      })


      this.addTextChatRecord(chat,"system","Đoạn chat đã được kết thúc bởi: "+ user.displayName+" - "+user.userID)
    }

    findChatRecord(chatInput:string|ChatType){
      return (typeof chatInput == "string") ? this.roomList.find(f => f.chatID == chatInput) : chatInput
    }

    findChatRecordByThreadId(threadID:string){
      return this.roomList.find(f => f.threadID == threadID)
    }


}