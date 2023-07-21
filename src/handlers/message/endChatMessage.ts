import CryptoService from "../../functions/crypto";
import { FacebookController, TemplateBuilder } from "../../functions/facebook";
import { ChatType } from "../../functions/interface";


export const EndChatMessage = async (memberID: string, chatInfo: ChatType, forceToEnd: boolean = false, restartOption: boolean = true) => {

    const templateBuilder = new TemplateBuilder()
    .setTitle("Cuộc trò chuyện đã kết thúc" + (forceToEnd ? "bởi hệ thống": ""))
    .setSubtitle("ID: "+ chatInfo.chatID)
    
    if((forceToEnd && restartOption) || !forceToEnd){
        templateBuilder.addPostbackButton("Bắt đầu tìm kiếm", "CHAT_REQUEST");
    }

    if(!forceToEnd){
        templateBuilder.addWebviewButton('Báo cáo đoạn chat', 
            CryptoService.generateReportLink(
                memberID, chatInfo.chatID, chatInfo.threadID, chatInfo._doc._id.toString(), new Date()
            )
        )
    }

    await FacebookController.getInstance().sendMessageUsingTemplate(memberID, templateBuilder)



}