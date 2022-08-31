import { User, Chat } from "../../functions/mongooes"

import { NewUserRequestHandle } from "../message/NewUserRequestHandle"
import { NoneChattingHandle } from "../message/NoneChattingHandle"
import { MenuHandle } from "../message/MenuHandle"

export const handleMessageEvent = async (mess: any) => {
  const userID = mess.sender.id
  const userInDB = await User.find({ userID })

  if (userInDB.length === 0) {
    return await NewUserRequestHandle(userID)
  }

  if (mess.message.attachments[0].payload.sticker_id === 369239263222822) { //handle like button
    return await MenuHandle(userID,userInDB)
  }

  if (userInDB[0].currentChatID === "") {
    return await NoneChattingHandle(userID)
  }else{
    // let chatInDB = await Chat.find({chatID:userInDB})
  }
}
