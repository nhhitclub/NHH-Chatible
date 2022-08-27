const { TemplateBuilder } = require("../functions/facebook")

const NewUserRequestHandle = async (messenger, userID, callback = () => {}) => {
    const templateBuilder = new TemplateBuilder()
      .setTitle("🤗 Chào mừng bạn lần đầu đã đến với NHH Chatible")
      .setSubtitle("Trước hết, bạn cần phải chấp nhận điều khoản sử dụng của hệ thống")
      .addWebviewButton("Điều khoản sử dụng", "https://youtu.be/dQw4w9WgXcQ")
      .addPostbackButton("Tôi đồng ý", "NEW_USER_START")

    await messenger.sendMessageUsingTemplate(userID, templateBuilder)
    callback();
}

module.exports = NewUserRequestHandle