import { FacebookController, TemplateBuilder } from "../functions/facebook";
import { QueueManager } from "../functions/queueManager";
import { ChatController } from "../functions/chatroom";

export const handleChatRandom = async () => {
    const facebookControllerInstance: FacebookController = FacebookController.getInstance();
    const queueManagerInstance: QueueManager = QueueManager.getInstance();
    const chatManager:ChatController = ChatController.getInstance()

    queueManagerInstance.shuffleUserInQueue();

    const chatRoomList = queueManagerInstance.popUserToChat();

    chatRoomList.forEach(async (chatRoom) => {

        chatManager.createRoom([chatRoom[0],chatRoom[1]])
        
        chatRoom.forEach(async (userChatID: string) => {


            const template = new TemplateBuilder()
                .setTitle("Đã tìm thấy người trò chuyện với bạn")
                .setSubtitle("Hãy bấm nút like để kích hoạt menu nha")
                .addPostbackButton("Kết thúc trò chuyện", "END_CHAT");


            try {
                await facebookControllerInstance.sendMessageUsingTemplate(userChatID,template);
            }catch(e) {}

        });
    });
};
