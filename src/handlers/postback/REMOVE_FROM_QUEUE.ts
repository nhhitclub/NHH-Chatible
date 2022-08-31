import { FacebookController, TemplateBuilder } from "../../functions/facebook";
import { QueueManager } from "../../functions/queueManager"

export const REMOVE_FROM_QUEUE = async (mess: any) => {
    QueueManager.getInstance().rmUserFromQueue(mess.sender.id);

    const templateBuilder: TemplateBuilder = new TemplateBuilder()
    .setTitle("Đã hủy tìm kiếm")
    .addPostbackButton("Tìm kiếm lại", "CHAT_REQUEST")

    await FacebookController.getInstance().sendMessageUsingTemplate(mess.sender.id, templateBuilder)
}