import { User } from "../../functions/mongooes"

import { NewUserRequestHandle } from "./NewUserRequestHandle"
import { ContinueChattingHandle } from "./ContinueChattingHandle"

export const handleMessageEvent = async (mess: any) => {
  const userID = mess.sender.id
  const userInDB = await User.find({ userID })


  if (userInDB.length === 0) {
    return await NewUserRequestHandle(userID)
  }
  if (userInDB[0].currentChat === "") {
    return await ContinueChattingHandle(userID)
  }
}
