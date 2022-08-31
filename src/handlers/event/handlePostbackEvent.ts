import CHAT_REQUEST from "../postback/CHAT_REQUEST"
import { END_CHAT } from "../postback/END_CHAT"
import EXISTED_USER_START from "../postback/EXISTED_USER_START"
import { REMOVE_FROM_QUEUE } from "../postback/REMOVE_FROM_QUEUE"

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

        case "END_CHAT":{
            END_CHAT(mess)
            break
        }
            
    }
    
}
