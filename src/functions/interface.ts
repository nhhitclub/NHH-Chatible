export type UserType = {
    userID: String,
    role: String,
    currentChatID: String,
    displayName:String,
    avatarURL:String
}

export type BanSentenceType = {
    userID: String,
    reason: String,
    expires: Date,
    startTime: Date,
}

export type MessageType = {
    sender: String,
    text: String,
    attachmentURL: String,
    emoji_ID: String,
    sent_time: { type : Date }
}

export type ChatType = {
    chatID: String,
    threadID: String,
    members: Array<UserType>,
    chatMess: Array<MessageType>
}

