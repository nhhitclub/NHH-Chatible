import Discord, { EmbedBuilder } from "discord.js"
import { EndChatProcedure } from "../../handlers/postback/procedure/endChatProcedure";

module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('end')
		.setDescription('END CHAT')
        .addChannelOption(option => 
            option.setName('channel').setDescription('Tag a thread you want to end')
        ),
        
	async execute(interaction:any) {

        interaction.options._hoistedOptions.forEach(async (channel: any) => {
            const fbChannelID = channel.channel.name;
            await EndChatProcedure(fbChannelID, true);
            const embed:EmbedBuilder = new EmbedBuilder()
                .setColor(0x0099FF)
                .addFields({
                    name: 'CHAT DB-ID ' + fbChannelID + ' ENDED',
                    value: 'Chat was ended by admin'
                });


            interaction.reply({embeds:[embed]})
        })

        
	},
};