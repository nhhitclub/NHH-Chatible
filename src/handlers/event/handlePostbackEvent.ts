import CHAT_REQUEST from "../postback/CHAT_REQUEST"
import { END_CHAT } from "../postback/END_CHAT"
import EXISTED_USER_START from "../postback/EXISTED_USER_START"
import { SEND_LIKE } from "../postback/menu/SEND_LIKE"
import { REMOVE_FROM_QUEUE } from "../postback/REMOVE_FROM_QUEUE"
import { START_FEEDBACK } from "../postback/START_FEEDBACK"

export const handlePostbackEvent = async (mess: any) => {
    
    switch(mess.postback.payload) {
        case "CHAT_REQUEST": {
            CHAT_REQUEST(mess)
            break
        }
            
        case "EXISTED_USER_START":{
            EXISTED_USER_START(mess)
            break
        } 

        case "REMOVE_FROM_QUEUE":{
            REMOVE_FROM_QUEUE(mess)
            break
        } 

        case "START_FEEDBACK": {
            START_FEEDBACK(mess)
            break
        }

        case "SEND_LIKE": {
            SEND_LIKE(mess)
            break
        }

        case "END_CHAT":{
            END_CHAT(mess)
            break
        }
            
    }
    
}
