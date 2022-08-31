import { FacebookController, TemplateBuilder } from "../functions/facebook"
import { User,Chat } from "../functions/mongooes"
import { QueueManager } from "../functions/queueManager";
import { v4 as uuidv4 } from 'uuid';


export const handleChatRandom = async () => {
    //create some instanse
    let facebookControllerInstance:FacebookController = FacebookController.getInstance()
    let queueManagerInstance:QueueManager =  QueueManager.getInstance()

    //shuffle a before generate list
    queueManagerInstance.shuffleUserInQueue() // ồ sao bé không lắc

    //pop user into a chat
    let chatList = queueManagerInstance.popUserToChat()
    chatList.forEach(chatRoom => {
        let chatID = uuidv4()
        let chatSchema = new Chat({
            chatID,
            members:chatRoom,
            chatMess:[]
        })
        chatRoom.forEach((userChatID:string) => {
            User.findOneAndUpdate({userID:userChatID},{currentChatID:chatID})

            const template = new TemplateBuilder().setTitle("Đã tìm thấy người trò chuyện với bạn")
            .setSubtitle("Hãy bấm nút like để kích hoạt menu nha")
            .addPostbackButton("Kết thúc trò chuyện", "END_CHAT")

            facebookControllerInstance.sendMessageUsingTemplate(userChatID, template)
        })
        
        


    })
}