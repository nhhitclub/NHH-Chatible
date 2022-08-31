import CHAT_REQUEST from "../postback/CHAT_REQUEST"
import { END_CHAT } from "../postback/END_CHAT"
import EXISTED_USER_START from "../postback/EXISTED_USER_START"
import { REMOVE_FROM_QUEUE } from "../postback/REMOVE_FROM_QUEUE"

export const handlePostbackEvent = async (mess: any) => {
    
    // switch(mess.postback.payload) {
    //     case "CHAT_REQUEST":
    //         CHAT_REQUEST(mess) 
    //         break
    //     case "EXISTED_USER_START": 
    //         EXISTED_USER_START(mess)
    //         break
    // }

    if(mess.postback.payload == "CHAT_REQUEST") CHAT_REQUEST(mess)
    if(mess.postback.payload == "EXISTED_USER_START") EXISTED_USER_START(mess)
    if(mess.postback.payload == "REMOVE_FROM_QUEUE") REMOVE_FROM_QUEUE(mess)
    if(mess.postback.payload == "END_CHAT") END_CHAT(mess)

    
}
