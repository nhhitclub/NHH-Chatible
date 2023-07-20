import { User } from "../../functions/database";
import { EndChatProcedure } from "./procedure/endChatProcedure";

export default async function END_CHAT(mess: any) {
    const userID = mess.sender.id;
    // const deletedChatRoom = await Chat.findOneAndDelete({ members: userID }); // we still keep this one for
    // const members = deletedChatRoom.members;
    
    const senderInfo = await User.findOne({ userID })
    await EndChatProcedure(senderInfo.currentChatID);

};
