export type UserType = {
    userID: string,
    role: string,
    currentChatID: string,
    displayName:string,
    avatarURL:string
}

export type BanSentenceType = {
    userID: string,
    reason: string,
    expires: Date,
    startTime: Date,
}

export type MessageType = {
    sender: string,
    text: string,
    attachmentURL: string,
    emoji_ID: string,
    sent_time: { type : Date }
}

export type ChatType = {
    chatID: string,
    threadID: string,
    members: Array<UserType>,
    chatMess: Array<MessageType>
}

//string or String?

