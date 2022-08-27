const { TemplateBuilder } = require("../functions/facebook")

const ContinueChattingHandle = async (messenger, userID, callback = () => {}) => {
    const templateBuilder = new TemplateBuilder()
    .setTitle("🤗 Chào mừng bạn đã quay trở lại với NHH Chatible")
    .setSubtitle("Để bắt đầu, hãy bấm vào nút bên dưới:vv")
    .addPostbackButton("Bắt đầu", "CHAT_REQUEST")

    await messenger.sendMessageUsingTemplate(userID, templateBuilder)
    callback();
}

module.exports = ContinueChattingHandle