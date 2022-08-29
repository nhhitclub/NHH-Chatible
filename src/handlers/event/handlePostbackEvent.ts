import CHAT_REQUEST from "../postback/CHAT_REQUEST"
import EXISTED_USER_START from "../postback/EXISTED_USER_START"

export const handlePostbackEvent = async (mess: any) => {
    
    switch(mess.postback.payload) {
        case "CHAT_REQUEST": CHAT_REQUEST(mess)
        case "EXISTED_USER_START": EXISTED_USER_START(mess)
    }

    
}
