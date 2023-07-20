import { FacebookController, TemplateBuilder } from "../../../functions/facebook";

export default async function CHAT_REPORT_START(mess: any) { 
    const fbInstance = FacebookController.getInstance();

    const templateBuilder: TemplateBuilder = new TemplateBuilder()
    .setTitle('Báo cáo đoạn chat')
    .setSubtitle('Bạn điền form giúp mình nhe, chỉ 2p thuii')
    .addWebviewButton('Bắt đầu', process.env.PRIVACY_POLICY)

    await fbInstance.sendMessageUsingTemplate(mess.sender.id, templateBuilder);
    console.dir(mess);
    
}