import { FacebookController, TemplateBuilder } from "../../functions/facebook";
import { QueueManager } from "../../functions/queueManager";

export default async function handlePostbackEvent(mess: any) {
    const userID = mess.sender.id;
    const fbInstance = FacebookController.getInstance();
    
    QueueManager.getInstance().addUserToQueue(userID);

    const templateBuilder: TemplateBuilder = new TemplateBuilder()
        .setTitle("Chúng tớ đang tìm 1 người khác để nhắn với cậu")
        .setSubtitle(
            "Nếu có lâu quá thì cậu có thể hủy tìm kiếm bằng nút ở dưới"
        )
        .addPostbackButton("Hủy tìm kiếm", "REMOVE_FROM_QUEUE");


    await fbInstance.sendMessageUsingTemplate(userID, templateBuilder);
}
