import { User, Chat } from "../../functions/mongooes"

import { NewUserRequestHandle } from "../message/NewUserRequestHandle"
import { ContinueChattingHandle } from "../message/ContinueChattingHandle"

export const handleMessageEvent = async (mess: any) => {
  const userID = mess.sender.id
  const userInDB = await User.find({ userID })

  if (userInDB.length === 0) {
    return await NewUserRequestHandle(userID)
  }
  if (userInDB[0].currentChatID === "") {
    return await ContinueChattingHandle(userID)
  }else{
    // let chatInDB = await Chat.find({chatID:userInDB})
  }
}
