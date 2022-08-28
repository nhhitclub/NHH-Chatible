import { TemplateBuilder, FacebookController } from "../../functions/facebook"

export const ContinueChattingHandle: Function = async (userID: string, callback: Function = () => {}) => {
    const templateBuilder = new TemplateBuilder()
    .setTitle("🤗 Chào mừng bạn đã quay trở lại với NHH Chatible")
    .setSubtitle("Để bắt đầu, hãy bấm vào nút bên dưới:vv")
    .addPostbackButton("Bắt đầu", "CHAT_REQUEST")

    await FacebookController.getInstance().sendMessageUsingTemplate(userID, templateBuilder)
    callback();
}
