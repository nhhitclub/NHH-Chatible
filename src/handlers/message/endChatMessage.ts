import { FacebookController, TemplateBuilder } from "../../functions/facebook";


export const EndChatMessage = async (memberID: string,id:string, forceToEnd: boolean = false, restartOption: boolean = true) => {

    const templateBuilder = new TemplateBuilder()
    .setTitle("Cuộc trò chuyện đã kết thúc" + (forceToEnd ? "bởi hệ thống": ""))
    .setSubtitle("ID: "+id)
    
    if((forceToEnd && restartOption) || !forceToEnd){
        templateBuilder.addPostbackButton("Bắt đầu tìm kiếm", "CHAT_REQUEST");
    }

    if(!forceToEnd){
        templateBuilder.addWebviewButton('Báo cáo đoạn chat', process.env.PRIVACY_POLICY)
    }

    await FacebookController.getInstance().sendMessageUsingTemplate(memberID, templateBuilder)



}