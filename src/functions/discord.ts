require("dotenv").config()
//import Discord, { ApplicationCommandOptionWithChoicesAndAutocompleteMixin } from "discord.js"
import Discord, { ForumChannel, GuildForumThreadCreateOptions } from "discord.js"

import fs from "node:fs"
import path from "node:path"



interface CommandsInterface{
    data:Discord.SlashCommandBuilder,
    execute:Function,
}

function handleInteractionCreate(){

}

export class DiscordClient {
    private static instance:DiscordClient
    private static client:Discord.Client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds] });
    static commands:Array<CommandsInterface> = []
    
    private constructor(){}
    
    public static getInstance(token?:string):DiscordClient{
        if(!DiscordClient.instance) DiscordClient.instance = new DiscordClient()
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
            
            //load discord commands
            fs.readdirSync(commandsPath).filter(fileFilter => fileFilter.endsWith(".ts")).forEach(async file =>{
                let command  = await import(path.join(commandsPath,file))
                if("data" in command && "execute" in command) DiscordClient.commands.push(command);
            })

            //load all discord event
            fs.readdirSync(eventPath).filter(fileFilter => fileFilter.endsWith(".ts")).forEach(async file =>{
                try {
                    let eventFiles  = await import(path.join(eventPath,file))
                    console.log(eventFiles.name)
                    if (eventFiles.once) {
                        DiscordClient.client.once(eventFiles.name, (...args) => {
                            // console.log(1)
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

        return DiscordClient.instance
    }

    public static async getChannelByID(id: string){
        return await DiscordClient.client.channels.fetch(id);
    }

    public static async getThread(channelID: string, threadID: string){
        return (await DiscordClient.getChannelByID(channelID) as ForumChannel).threads.fetch(threadID);
    }
    
    
    public static async createThread(channelID : string, name: string, u1:string, u2:string){
        return (await DiscordClient.getChannelByID(channelID) as ForumChannel)
            .threads.create({
                name,
                reason: 'Log chat for chat ID ' + name,
                message: {
                    content: '---BEGINNING OF LOG----\n USER 1: ' + u1 + ' and USER 2: ' + u2
                }
            } as GuildForumThreadCreateOptions);
    }

    
}

