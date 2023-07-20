import CHAT_REQUEST from "../postback/CHAT_REQUEST"
import END_CHAT from "../postback/END_CHAT"
import EXISTED_USER_START from "../postback/EXISTED_USER_START"
import SEND_LIKE from "../postback/menu/SEND_LIKE"
import REMOVE_FROM_QUEUE from "../postback/REMOVE_FROM_QUEUE"
import CHAT_REPORT_START from "../postback/report/CHAT_REPORT_START"
import START_FEEDBACK from "../postback/START_FEEDBACK"

export const handlePostbackEvent = async (mess: any) => {
    
    switch(mess.postback.payload) {
        case "CHAT_REQUEST": {
            await CHAT_REQUEST(mess)
            break
        }
            
        case "EXISTED_USER_START":{
            await EXISTED_USER_START(mess)
            break
        } 

        case "REMOVE_FROM_QUEUE":{
            await REMOVE_FROM_QUEUE(mess)
            break
        } 

        case "START_FEEDBACK": {
            await START_FEEDBACK(mess)
            break
        }

        case "SEND_LIKE": {
            await SEND_LIKE(mess)
            break
        }

        case "END_CHAT":{
            await END_CHAT(mess)
            break
        }

        case "CHAT_REPORT_START": { 
            await CHAT_REPORT_START(mess)
            break
        }

        default: {
            //sth about report here!
        }
            
    }
    
}
