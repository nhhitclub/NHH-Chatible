import { FacebookController, TemplateBuilder } from "../functions/facebook";
import { User, Chat } from "../functions/mongooes";
import { QueueManager } from "../functions/queueManager";
import { v4 as uid_v4 } from "uuid";

export const handleChatRandom = async () => {
    const facebookControllerInstance: FacebookController = FacebookController.getInstance();
    const queueManagerInstance: QueueManager = QueueManager.getInstance();

    queueManagerInstance.shuffleUserInQueue();

    const chatRoomList = queueManagerInstance.popUserToChat();

    chatRoomList.forEach(async (chatRoom) => {
        const chatID = uid_v4();
        const chatModel = new Chat({
            chatID,
            members: chatRoom,
            chatMess: [],
        });

        await chatModel.save();
        chatRoom.forEach((userChatID: string) => {
            User.findOneAndUpdate({ userID: userChatID }, { currentChatID: chatID });

            const template = new TemplateBuilder()
                .setTitle("Đã tìm thấy người trò chuyện với bạn")
                .setSubtitle("Hãy bấm nút like để kích hoạt menu nha")
                .addPostbackButton("Kết thúc trò chuyện", "END_CHAT");


            try {
                facebookControllerInstance.sendMessageUsingTemplate(userChatID,template);
            }catch(e) {}

        });
    });
};
