import { User } from "../../functions/database"

import { NewUserRequestHandle } from "../message/NewUserRequestHandle"
import { NoneChattingHandle } from "../message/NoneChattingHandle"
import { MenuHandle } from "../message/MenuHandle"
import { InChatHandle } from "../message/InChatHandle"
import { UserType } from "../../functions/interface"
import { FacebookController } from "../../functions/facebook"

export const handleMessageEvent = async (mess: any) => {
  const userID = mess.sender.id
  const userInDB:UserType = await User.findOne({ userID: userID })
  
  if (!userInDB) {
    return await NewUserRequestHandle(userID)
  }

  if (userInDB.role == "banned") {
    return await FacebookController.getInstance().sendTextOnlyMessage(userID,"Tài khoản của bạn đã bị từ chối, xin cảm ơn")
  }

  if (mess.message.attachments?.[0].payload.sticker_id === 369239263222822) {
    return await MenuHandle(userID, userInDB)
  }

  if (userInDB?.currentChatID === "") {
    return await NoneChattingHandle(userID)
  }

  return await InChatHandle(mess, userInDB)
}
