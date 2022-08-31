import { FacebookController, TemplateBuilder } from "../../functions/facebook";
import { Chat } from "../../functions/mongooes";

export const END_CHAT = async (mess: any) => {
    const userID = mess.sender.id;
    const deletedChatRoom = await Chat.findOneAndDelete({ members: userID });
    const members = deletedChatRoom.members;

    console.log(members, "mem");

    members?.forEach(async (memberID: string) => {
        const templateBuilder = new TemplateBuilder()
        .setTitle("Đã kết thúc cuộc trò chuyện")
        .setSubtitle("Bạn có thể bắt đầu lại bằng cách nhấn nút bên dưới")
        .addPostbackButton("Bắt đầu lại", "CHAT_REQUEST")

        await FacebookController.getInstance().sendMessageUsingTemplate(memberID, templateBuilder)
    })
    
};
