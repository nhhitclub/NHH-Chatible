import { Chat, User } from "../../../functions/database";
import { FacebookController, TemplateBuilder } from "../../../functions/facebook";
import { EndLog } from "./chatLogProcedure";

export const EndChatProcedure = async (chatID: string, forceToEnd: boolean = false) => {

    const chatRoom = await Chat.findOne({ chatID: chatID })
    await EndLog(chatRoom.threadID);

    chatRoom.members.forEach(async (memberID: string) => {
        await User.findOneAndUpdate({ userID: memberID }, { currentChatID: "" })
        const templateBuilder = new TemplateBuilder()
            .setTitle("Đã kết thúc cuộc trò chuyện")
            .setSubtitle("Bạn có thể bắt đầu lại bằng cách nhấn nút bên dưới")
            .addPostbackButton("Bắt đầu lại", "CHAT_REQUEST")
            .addPostbackButton("Báo cáo đoạn chat", "CHAT_REPORT_START")


        await FacebookController.getInstance().sendMessageUsingTemplate(memberID, templateBuilder)

        if(forceToEnd){
            await FacebookController.getInstance().sendTextOnlyMessage(memberID, 'Cuộc trò chuyện đã kết thúc bởi ADMIN')
        }


    });
}