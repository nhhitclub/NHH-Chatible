import { FacebookController, MessageBuilder } from "../../functions/facebook"
import { Chat } from "../../functions/database";

// import { badWords } from "../../lib/vietnamese-badwords";

export const InChatHandle: Function = async (mess: any, userInDB: any, callback: Function = () => { }) => {
    const fbInstance: FacebookController = FacebookController.getInstance()
    const chatInDB = await Chat.findOne({ chatID: userInDB.currentChatID })

    const userID = mess.sender.id

    const chatMembers: Array<string> = chatInDB.members
    const anotherMember: string = chatMembers[(chatMembers.indexOf(userID) + 1) % 2]
    
    
    const messageInfo = mess.message

    // const filter = new Filter({ placeHolder: '*' })
    // filter.addWords(...badWords) // chưa loc đc tiếng việt :(
    // const censoredText = filter.clean(messageInfo.text)

    if ("text" in messageInfo) {
        await fbInstance.sendTextOnlyMessage(anotherMember, messageInfo.text)

        await chatInDB.chatMess.push({ sender: userID, text: messageInfo.text })
        await chatInDB.save();

    }
    if ("attachments" in messageInfo) {
        messageInfo.attachments.forEach(async (attachment: any) => {
            const messageBuilder = new MessageBuilder().addUrlAttachment(attachment.type ,attachment.payload.url)

            
            try{ 
                await fbInstance.sendMessage(anotherMember, messageBuilder)
            }catch(e) { console.log('error while sending attachment')}
            await chatInDB.chatMess.push({ sender: userID, attachmentUrl: attachment.payload.url})

        });
    }
    //handle message types


    callback();
}