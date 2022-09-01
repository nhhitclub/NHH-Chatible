import { TemplateBuilder, FacebookController } from "../../functions/facebook"

export const MenuHandle: Function = async (userID: string,userInDB:any, callback: Function = () => {}) => {
    const fbInstance = FacebookController.getInstance()
    if(userInDB.currentChatID !==""){

        const templateBuilder = new TemplateBuilder()
        .setTitle("Menu truy cập nhanh")
        .setSubtitle("Menu này có các tính năng giúp bạn")
        .addPostbackButton("Gửi nút like", "SEND_LIKE")
        .addPostbackButton("Kết thúc đoạn chat", "END_CHAT")
        
        await fbInstance.sendMessageUsingTemplate(userID, templateBuilder)
    }

    callback();
}