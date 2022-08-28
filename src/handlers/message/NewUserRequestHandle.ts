import { FacebookController, TemplateBuilder } from "../../functions/facebook"

export const NewUserRequestHandle = async (userID: string, callback: Function = () => {}) => {
    const templateBuilder = new TemplateBuilder()
      .setTitle("🤗 Chào mừng bạn lần đầu đã đến với NHH Chatible")
      .setSubtitle("Trước hết, bạn cần phải chấp nhận điều khoản sử dụng của hệ thống")
      .addWebviewButton("Điều khoản sử dụng", "https://youtu.be/dQw4w9WgXcQ")
      .addPostbackButton("Tôi đồng ý", "EXISTED_USER_START")

    await FacebookController.getInstance().sendMessageUsingTemplate(userID, templateBuilder)
    callback();
}