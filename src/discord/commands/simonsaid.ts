import Discord, { EmbedBuilder, ThreadChannel } from "discord.js"
import { getLogThread } from "../../handlers/postback/procedure/chatLogProcedure";
import { Chat } from "../../functions/database";
import { FacebookController } from "../../functions/facebook";

module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('simonsaid')
		.setDescription('"Vô tình" chen ngang cuộc nói chuyện, chỉ hoạt động trong thread')
        .addStringOption(option => 
            option.setName('message').setDescription('Muốn nói gì thầm kín thì ghi vào đây').setRequired(true)
        ),
        
	async execute(interaction: any) {

        const thread = await getLogThread(interaction.channelId);
        
        if(thread.type !== 11){
            await interaction.reply({ content: 'Error, invalid channel', ephemeral: true })
            return;
        }
		
        const fbInstance: FacebookController = FacebookController.getInstance()
        const chatDB = await Chat.findOne({ chatID: thread.name })
        const members = chatDB.members;
        const msg = "*ADMIN*: " + interaction.options.getString('message') + " -- " + new Date().toLocaleString("vi-VN");

        await fbInstance.sendTextOnlyMessage(members[0], msg)
        await fbInstance.sendTextOnlyMessage(members[1], msg) 

		const em:EmbedBuilder = new EmbedBuilder()
            .setColor(0x0099FF)
            .addFields({
                name: 'Message Sent!',
                value: msg
            });


        await interaction.reply({embeds:[em]})
	}
};