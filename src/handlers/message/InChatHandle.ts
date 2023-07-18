import { FacebookController, MessageBuilder } from "../../functions/facebook"
import { Chat } from "../../functions/database";
import { DiscordClient } from "../../functions/discord";


export const InChatHandle: Function = async (mess: any, userInDB: any, callback: Function = () => { }) => {
    const fbInstance: FacebookController = FacebookController.getInstance()
    const chatInDB = await Chat.findOne({ chatID: userInDB.currentChatID })

    const userID = mess.sender.id

    const chatMembers: Array<string> = chatInDB.members
    const anotherMember: string = chatMembers[(chatMembers.indexOf(userID) + 1) % 2]
    
    
    const messageInfo = mess.message


    if (messageInfo.text) {
        await fbInstance.sendTextOnlyMessage(anotherMember, messageInfo.text)
        await chatInDB.chatMess.push({ sender: userID, text: messageInfo.text, sent_time: mess.timestamp })
        await (await DiscordClient.getThread('1041402162166644876', chatInDB.threadID)).send(
            userID + ": " + messageInfo.text
        )
        
    }
    if (messageInfo.attachments) {
        messageInfo.attachments.forEach(async (attachment: any) => {
            const messageBuilder = new MessageBuilder().addUrlAttachment(attachment.type ,attachment.payload.url)
            
            
            try{ 
                await fbInstance.sendMessage(anotherMember, messageBuilder)
                
            }catch(e) { 
                console.log('error while sending attachment')
            }
            
            await chatInDB.chatMess.push({ 
                sender: userID, 
                attachmentURL: attachment.payload.url, 
                sent_time: mess.timestamp
            })
            await (await DiscordClient.getThread('1041402162166644876', chatInDB.threadID)).send(
                userID + ": " + attachment.payload.url
            )

        });
    }
    //handle message types
    
    chatInDB.save();
    callback();
}