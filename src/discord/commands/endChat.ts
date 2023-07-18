import Discord, { EmbedBuilder } from "discord.js"
import { EndChatProcedure } from "../../handlers/postback/procedure/endChatProcedure";
import { getLogThread } from "../../handlers/postback/procedure/chatLogProcedure";


module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('end')
		.setDescription('END_CHAT')
        .addChannelOption(option => 
            option.setName('channel').setDescription('Tag a thread you want to end')
        ),
        
	async execute(interaction:any) {

        const fbChannelID = 
            interaction.options.getChannel('channel')?.name ||
            ((await getLogThread(interaction.channelId)).name);
        
        const embed:EmbedBuilder = new EmbedBuilder()
            .setColor(0x0099FF)
            .addFields({
                name: 'CHAT DB-ID ' + fbChannelID + ' ENDED',
                value: 'Chat was ended by admin'
            });
    
        try{
    
            await EndChatProcedure(fbChannelID, true);
    
        }catch(er){
            await interaction.reply({ content: 'Error, invalid channel', ephemeral: true });
            return;
        }
    
        try{
    
            await interaction.reply({embeds:[embed]})
        }catch(e){}
        
	},
};