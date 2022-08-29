import fs from "fs"
import CHAT_REQEST from "../postback/CHAT_REQUEST"
import EXISTED_USER_START from "../postback/EXISTED_USER_START"

export const handlePostbackEvent = async (mess: any) => {
    // try {
    //     console.log(mess.postback.payload)
    //     let loader:any = require("../postback/EXISTED_USER_START")
    //     console.log(loader.default)
    //     await loader.default(mess)       
    // } catch (error:any) {
    //     console.log(error)
    // }


    if(mess.postback.payload === "CHAT_REQEST") CHAT_REQEST(mess)
    if(mess.postback.payload === "EXISTED_USER_START") EXISTED_USER_START(mess)
}
