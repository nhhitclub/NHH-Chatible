import { TemplateBuilder, FacebookController } from "../../functions/facebook"
import { User, Chat } from "../../functions/mongooes";


export const MenuHandle: Function = async (mess: any,userInDB:any, callback: Function = () => {}) => {
    let fbInstance:FacebookController = FacebookController.getInstance()
    let chatInDB = await Chat.findOne({chatID:userInDB.currentChatID})

    const userID = mess.sender.id

    //tối ưu dùm t chỗ này, t code lúc 12h19 nên não t ngu rồi
    let chatMembers:Array<string> = chatInDB.members
    let anootherMember:string
    if(userID === chatMembers[0]){
        anootherMember = chatMembers[1]
    }else{
        anootherMember = chatMembers[0] //toi nguk ngốc quá
    }
    let messageInfo = mess.message
    if("text" in messageInfo){
        //send to anoother mess
        fbInstance.sendTextOnlyMessage(anootherMember, messageInfo.text)

        //save to db
        chatInDB.chatMess.push({sender:userID,text:messageInfo.text})


    }
    if("attachments" in messageInfo){
        messageInfo.attachments.forEach(async (attachments:any) => {
            // t đuối quá rồi, phát tín hiệu cầu cứu

        });
    }
    //handle message types


    callback();
}