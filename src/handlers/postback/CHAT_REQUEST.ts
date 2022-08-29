import { FacebookController, TemplateBuilder } from "../../functions/facebook";
import { QueueManager } from "../../functions/queueManager";

export default async function handlePostbackEvent(mess: any) {
    const userID = mess.sender.id;
    const fbInstance = FacebookController.getInstance();

    QueueManager.getInstance().addUserToQueue(userID);

    const templateBuilder: TemplateBuilder = new TemplateBuilder()
        .setTitle("Hãy chờ 1 chút nha")
        .setSubtitle(
            "Chúng tớ đang tìm 1 người khác để nhắn với cậu. Nếu có lâu quá thì cậu có thể hủy tìm kiếm bằng nút ở dưới"
        )
        .addPostbackButton("Hủy tìm kiếm", "REMOVE_FROM_QUEUE");

    await fbInstance.sendTextOnlyMessage(
        userID,
        "Chúng tớ đã nhận được yêu cầu của bạn. Hãy chờ 1 chút cho đến khi bạn ghép cặp chung với 1 người khác nha"
    );
    await fbInstance.sendMessageUsingTemplate(userID, templateBuilder);

    const list = QueueManager.getInstance().popUserToChat();

    setTimeout(async () => {
        const template = new TemplateBuilder().setTitle("Đã tìm thấy người trò chuyện với bạn")
        .setSubtitle("Trò chuyện vui vẻ nhé.")
        .addPostbackButton("Kết thúc trò chuyện", "END_CHAT")

        await fbInstance.sendMessageUsingTemplate(userID, template)

    }, 20 * 1000)
    
}
