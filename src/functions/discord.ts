require("dotenv").config()
//import Discord, { ApplicationCommandOptionWithChoicesAndAutocompleteMixin } from "discord.js"
import Discord, { ForumChannel, GuildForumThreadCreateOptions, WebhookClient } from "discord.js"

import fs from "node:fs"
import path from "node:path"
import { ChatType, UserType } from "./interface"



interface CommandsInterface{
    data:Discord.SlashCommandBuilder,
    execute:Function,
}

function handleInteractionCreate(){

}

export class DiscordClient {

    private static client:Discord.Client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds] });
    static commands:Array<CommandsInterface> = []
    private static chatWebhookClient = new WebhookClient({ url: process.env.CHAT_WEBHOOK });
    
    public static initialization(token?:string){
        if(!(DiscordClient.client.isReady() as boolean) && token){

            //first load here
            try {
                DiscordClient.client.login(token)
            } catch (error) {
                console.log(error)
            }
            

            //load commands from list commands
            let commandsPath:string = path.join(__dirname, '../discord/commands');
            let eventPath:string = path.join(__dirname, '../discord/event');
            // console.log(fs.readdirSync(eventPath))

            fs.readdirSync(commandsPath).filter(fileFilter => fileFilter.endsWith(".ts") || fileFilter.endsWith(".js"))
            .forEach(async (file) =>{
                let command = await import(path.join(commandsPath,file))
                if("data" in command && "execute" in command) DiscordClient.commands.push(command);
            });

            //load all discord event
            fs.readdirSync(eventPath).filter(fileFilter => fileFilter.endsWith(".ts") || fileFilter.endsWith(".js")).forEach(async file =>{
                try {
                    let eventFiles  = await import(path.join(eventPath,file))
                    if (eventFiles.once) {
                        DiscordClient.client.once(eventFiles.name, (...args) => {
                            eventFiles.execute(...args)
                        });
                    } else {
                        DiscordClient.client.on(eventFiles.name, (...args) => eventFiles.execute(...args));
                    }
                } catch (errr) {
                    console.log(errr)
                    
                }
                

            })


        }

    }

    public static async getChannelByID(id: string){
        return await DiscordClient.client.channels.fetch(id);
    }

    public static async getThread(channelID: string, threadID: string){
        return (await DiscordClient.getChannelByID(channelID) as ForumChannel).threads.fetch(threadID);
    }
    
    public static async getChatThread( threadID: string){
        return (await DiscordClient.getChannelByID(process.env.CHAT_THREAD_ID) as ForumChannel).threads.fetch(threadID);
    }
    
    public static async createThread(channelID : string, name: string,startContent:string){
        return (await DiscordClient.getChannelByID(channelID) as ForumChannel)
            .threads.create({
                name,
                message: {
                    content: startContent
                }
            } as GuildForumThreadCreateOptions);
    }

    public static async sendTextChatToChatLog(user:UserType,chat:ChatType,message:string){
        await this.chatWebhookClient.send({ 
            username:`${user.displayName} - ${user.userID}`,
            avatarURL:(user.avatarURL as string),
            content:message,
            threadId:(chat.threadID as string)
        })
    }

    
}

