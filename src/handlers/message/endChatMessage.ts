import { Chat, User } from "../../functions/database";
import { FacebookController, TemplateBuilder } from "../../functions/facebook";


export const EndChatMessage = async (memberID: string,id:string, forceToEnd: boolean = false, restartOption: boolean = true) => {


    if(forceToEnd){
        const templateBuilder = new TemplateBuilder()
        .setTitle("Cuộc trò chuyện đã kết thúc bởi hệ thống")
        .setSubtitle("ID: "+id)
        if(restartOption){
            templateBuilder.addPostbackButton("Bắt đầu tìm kiếm", "CHAT_REQUEST")
        }
        await FacebookController.getInstance().sendMessageUsingTemplate(memberID, templateBuilder)

    }else{
        const templateBuilder = new TemplateBuilder()
        .setTitle("Cuộc trò chuyện đã kết thúc")
        .setSubtitle("ID: "+id)
        .addPostbackButton("Bắt đầu tìm kiếm", "CHAT_REQUEST")
        await FacebookController.getInstance().sendMessageUsingTemplate(memberID, templateBuilder)


    }


}