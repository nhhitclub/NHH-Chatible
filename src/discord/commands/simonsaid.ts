import Discord, { EmbedBuilder, ThreadChannel } from "discord.js"
import { getLogThread } from "../../handlers/postback/procedure/chatLogProcedure";
import { Chat } from "../../functions/database";
import { FacebookController } from "../../functions/facebook";
import { ChatController } from "../../functions/chatroom";
import { DiscordClient } from "../../functions/discord";
import { UserType } from "../../functions/interface";

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

        let targetUser = interaction.options.getString('targetUser')
		
        const chatDB = await Chat.findOne({ chatID: thread.name })
        let member:Array<string> = [] 
        if(targetUser){
            member.push(targetUser)
        }else{
            member = chatDB.members.map((f : any) => f.userID);
        }
        console.log(targetUser)
        const msg = "Tin nhắn đến từ chủ tịch: " + interaction.options.getString('message');
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