import { DiscordClient } from "../../../functions/discord";

const CHANNEL_ID = '1041402162166644876';

const getLogThread = async (threadID: string) => {
    const currentThread = await DiscordClient.getThread(CHANNEL_ID, threadID);

    return currentThread;
}

const sendMessageInThread = async (threadID: string, message: string) => {
    const currentThread = await getLogThread(threadID);
    await currentThread.send(message)

    return currentThread;
}

const LogChat = async (threadID: string, userID: string, message: string) => {    
    await sendMessageInThread(threadID, userID + ": " + message)
}

const StartLog = async (chatID: string, user1: string, user2: string) => {
    const newThread = await DiscordClient.createThread("","","");

    return newThread.id;
}

const EndLog = async (threadID: string) => {
    await (await sendMessageInThread(threadID, "----END OF LOG---")).setArchived(true);
}

export { LogChat, StartLog, EndLog, getLogThread }