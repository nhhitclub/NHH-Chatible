import { FacebookController, TemplateBuilder } from "../../functions/facebook";
import { User,Chat } from "../../functions/mongooes";

export const END_CHAT = async (mess: any) => {
    const userID = mess.sender.id;
    // const deletedChatRoom = await Chat.findOneAndDelete({ members: userID }); // we still keep this one for
    // const members = deletedChatRoom.members;

    // console.log(members, "mem");

    // members?.forEach(async (memberID: string) => {
        // const templateBuilder = new TemplateBuilder()
        // .setTitle("Đã kết thúc cuộc trò chuyện")
        // .setSubtitle("Bạn có thể bắt đầu lại bằng cách nhấn nút bên dưới")
        // .addPostbackButton("Bắt đầu lại", "CHAT_REQUEST")
        // await FacebookController.getInstance().sendMessageUsingTemplate(memberID, templateBuilder)

    //     
    // })

    let senderInfo = await User.findOne({userID})
    let chatRoom = await Chat.findOne({chatID:senderInfo})
    
    chatRoom.members.forEach(async (memberID:string) => {
        User.findOneAndUpdate({memberID},{currentChatID:""})
        const templateBuilder = new TemplateBuilder()
        .setTitle("Đã kết thúc cuộc trò chuyện")
        .setSubtitle("Bạn có thể bắt đầu lại bằng cách nhấn nút bên dưới")
        .addPostbackButton("Bắt đầu lại", "CHAT_REQUEST")
        .addPostbackButton("Báo cáo đoạn chat", "CHAT_REPORT_START")


        await FacebookController.getInstance().sendMessageUsingTemplate(memberID, templateBuilder)


    });

    
};
