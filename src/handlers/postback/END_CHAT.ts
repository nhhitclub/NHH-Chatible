import { ChatController } from "../../functions/chatroom";
import { User } from "../../functions/database";
import { FacebookController } from "../../functions/facebook";
import { ChatType } from "../../functions/interface";
import { EndChatMessage } from "../message/endChatMessage";

export default async function END_CHAT(mess: any) {
    const userID = mess.sender.id;
    let chatManager:ChatController = ChatController.getInstance()
    const senderInfo = await User.findOne({ userID })
    if(senderInfo.currentChatID == "") return FacebookController.getInstance().sendTextOnlyMessage(userID,"Bạn hiện đang không ở trong đoạn chat nào")

    const chatInfo:ChatType = await chatManager.findChatRecord(senderInfo.currentChatID)

    chatInfo.members.forEach(async (mem)=>{
        EndChatMessage(mem.userID,chatInfo.chatID)
    })
    chatManager.endChatRecord(chatInfo,userID)

    // const deletedChatRoom = await Chat.findOneAndDelete({ members: userID }); // we still keep this one for
    // const members = deletedChatRoom.members;
    
    // const senderInfo = await User.findOne({ userID })
    // await EndChatProcedure(senderInfo.currentChatID);
    

};
