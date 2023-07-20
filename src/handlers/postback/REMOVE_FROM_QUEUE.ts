import { FacebookController, TemplateBuilder } from "../../functions/facebook";
import { QueueManager } from "../../functions/queueManager"

export default async function REMOVE_FROM_QUEUE(mess: any) {
    QueueManager.getInstance().rmUserFromQueue(mess.sender.id);

    const templateBuilder: TemplateBuilder = new TemplateBuilder()
    .setTitle("Đã hủy tìm kiếm")
    .setSubtitle("Chúng tớ rất xin lỗi vì sự cố này")
    .addPostbackButton("Tìm kiếm lại", "CHAT_REQUEST")

    await FacebookController.getInstance().sendMessageUsingTemplate(mess.sender.id, templateBuilder)
}