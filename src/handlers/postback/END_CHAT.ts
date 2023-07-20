import { ChatController } from "../../functions/chatroom";
import { User } from "../../functions/database";
import { ChatType } from "../../functions/interface";
import { EndChatMessage } from "../message/endChatMessage";

export const END_CHAT = async (mess: any) => {
    const userID = mess.sender.id;
    let chatManager:ChatController = ChatController.getInstance()
    const chatInfo:ChatType = chatManager.findChatRecord(userID)

    chatInfo.members.forEach(async (mem)=>{
        EndChatMessage(mem.userID,chatInfo.chatID)
    })
    chatManager.endChatRecord(chatInfo,userID)

    // const deletedChatRoom = await Chat.findOneAndDelete({ members: userID }); // we still keep this one for
    // const members = deletedChatRoom.members;
    
    // const senderInfo = await User.findOne({ userID })
    // await EndChatProcedure(senderInfo.currentChatID);
    

};
