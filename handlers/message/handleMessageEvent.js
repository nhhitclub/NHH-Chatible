const { User } = require("../../functions/mongooes")

const NewUserRequestHandle = require("./NewUserRequestHandle")
const ContinueChattingHandle = require("./ContinueChattingHandle")

const handleMessageEvent = async (messenger, mess) => {
  const userID = mess.sender.id
  const userInDB = await User.find({ userID })


  if (userInDB.length === 0) {
    return await NewUserRequestHandle(messenger, userID)
  }
  if (userInDB[0].currentChat === "") {
    return await ContinueChattingHandle(messenger, userID)
  }
}

module.exports = handleMessageEvent
