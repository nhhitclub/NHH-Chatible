import { FacebookController, TemplateBuilder } from "../functions/facebook";
import { User, Chat } from "../functions/database";
import { QueueManager } from "../functions/queueManager";
import { v4 as uid_v4 } from "uuid";
import { DiscordClient } from "../functions/discord";

export const handleChatRandom = async () => {
    const facebookControllerInstance: FacebookController = FacebookController.getInstance();
    const queueManagerInstance: QueueManager = QueueManager.getInstance();

    queueManagerInstance.shuffleUserInQueue();

    const chatRoomList = queueManagerInstance.popUserToChat();

    chatRoomList.forEach(async (chatRoom) => {
        const chatID = uid_v4();
        const newThread = await DiscordClient.createThread('1041402162166644876', chatID, chatRoom[0], chatRoom[1]);
        const chatModel = new Chat({
            chatID,
            threadID: newThread.id,
            members: chatRoom,
            chatMess: [],
        });

        await chatModel.save();
        chatRoom.forEach(async (userChatID: string) => {
            await User.findOneAndUpdate({ userID: userChatID }, { currentChatID: chatID });

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
