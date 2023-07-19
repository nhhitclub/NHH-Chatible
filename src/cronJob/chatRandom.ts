import { FacebookController, TemplateBuilder } from "../functions/facebook";
import { User, Chat } from "../functions/database";
import { QueueManager } from "../functions/queueManager";
import { v4 as uid_v4 } from "uuid";
import { StartLog } from "../handlers/postback/procedure/chatLogProcedure";
import { ChatControler } from "../functions/chatroom";

export const handleChatRandom = async () => {
    const facebookControllerInstance: FacebookController = FacebookController.getInstance();
    const queueManagerInstance: QueueManager = QueueManager.getInstance();
    const chatManager:ChatControler = ChatControler.getInstance()

    queueManagerInstance.shuffleUserInQueue();

    const chatRoomList = queueManagerInstance.popUserToChat();

    chatRoomList.forEach(async (chatRoom) => {
        // const chatID = uid_v4();
        // const threadID = await StartLog(chatID, chatRoom[0], chatRoom[1]);

        // const chatModel = new Chat({
        //     chatID,
        //     threadID,
        //     members: chatRoom,
        //     chatMess: [],
        // });

        // await chatModel.save();

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
