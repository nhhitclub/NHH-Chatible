import Discord, { EmbedBuilder } from "discord.js"
import { EndChatProcedure } from "../../handlers/postback/procedure/endChatProcedure";
import { getLogThread } from "../../handlers/postback/procedure/chatLogProcedure";
import { ChatController } from "../../functions/chatroom";
import { ChatType } from "../../functions/interface";
import { EndChatMessage } from "../../handlers/message/endChatMessage";


module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('end')
		.setDescription('END_CHAT')
        .addChannelOption(option => 
            option.setName('channel').setDescription('Tag a thread you want to end')
        ),
        
	async execute(interaction:any) {
        const chatManager:ChatController = ChatController.getInstance()

        // const fbChannelID = interaction.options.getChannel('channel')?.name || (await ChatController.getInstance().findChatRecordByThreadId(interaction.channelId)).chatID;
        
        const chatInfo:ChatType = 
            await (chatManager.findChatRecord(
                    interaction.options.getChannel('channel')?.name
            ) || ChatController.getInstance().findChatRecordByThreadId(interaction.channelId))

        const embed:EmbedBuilder = new EmbedBuilder()
            .setColor(0x0099FF)
            .addFields({
                name: 'kết thúc đoạn chat: ' + chatInfo.chatID,
                value: 'Đoạn chat đã kết thúc bởi '+(await interaction.guild.members.fetch(interaction.user.id)).user.username

            });
    
        try{
            chatManager.endChatRecord(chatInfo,"system")

            await chatInfo.members.forEach(async (member) => {
                await EndChatMessage(member.userID,chatInfo.chatID,true)
            })

            // await EndChatProcedure(fbChannelID, true);
            await interaction.reply({embeds:[embed]})
        }catch(er){
            await interaction.reply({ content: 'Không thể tìm thấy channel hoặc đã có lỗi xảy ra', ephemeral: true });
            return;
        }
        
	},
};