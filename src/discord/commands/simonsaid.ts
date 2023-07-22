import Discord, { EmbedBuilder, ThreadChannel } from "discord.js"
import { Chat } from "../../functions/database";
import { FacebookController } from "../../functions/facebook";
import { ChatController } from "../../functions/chatroom";
import { DiscordClient } from "../../functions/discord";

module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('simonsaid')
		.setDescription('"Vô tình" chen ngang cuộc nói chuyện, chỉ hoạt động trong thread')
        .addStringOption(option => 
            option.setName('message').setDescription('Muốn nói gì thầm kín thì ghi vào đây').setRequired(true)
        )
        .addStringOption(option => 
            option.setName('targetuser').setDescription('Nhắn đến chính xác ai')
        ),
        
	async execute(interaction: any) {
        const chatManager:ChatController = ChatController.getInstance()
        const fbInstance: FacebookController = FacebookController.getInstance()


        const thread = await DiscordClient.getChatThread(interaction.channelId);
        
        if(thread.type !== 11){
            await interaction.reply({ content: 'Error, invalid channel', ephemeral: true })
            return;
        }

        let targetUser = interaction.options.getString('targetuser')
        let content = interaction.options.getString('message')
		
        const chatDB = await Chat.findOne({ chatID: thread.name })
        let member:Array<string> = [] 
        
        if(targetUser){
            
            member.push(targetUser)
            chatManager.addTextChatRecord(thread.name,"system",`${targetUser}-${content}`)
        }else{
            chatManager.addTextChatRecord(thread.name,"system",`${content}`)
            member = chatDB.members
        }
        
        const msg = "Tin nhắn đến từ admin: " + content;
        member.forEach(async (mem) => {
            // console.log(mem)
            await fbInstance.sendTextOnlyMessage(mem, msg)

        })

		const em:EmbedBuilder = new EmbedBuilder()
            .setColor(0x0099FF)
            .addFields({
                name: 'Message Sent!',
                value: msg
            });


        await interaction.reply({embeds:[em]})
	}
};