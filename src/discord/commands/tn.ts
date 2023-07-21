import Discord, { EmbedBuilder } from "discord.js"
import CryptoService from "../../functions/crypto";

module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('tn')
		.setDescription('t'),
        
	async execute(interaction: any) {
		
		const em:EmbedBuilder = new EmbedBuilder()
            .setColor(0x0099FF)
            .addFields({
                name: 'Bot is working normally 🤖',
                value: 'Beep~~ Bop~'
            });
        
        const uid = '100076666011586'
        const cid = 'bbe78b9b-fd64-4c81-a74e-e2d9cc102cc6'
        const tid = '1130790810586206239'
        const oid = '64b6590106ef5a6be8afead2'
        const tstmp = new Date();
        //tstmp.setTime(1689931349389);

        const em2:EmbedBuilder = new EmbedBuilder()
        .setColor(0x0099FF)
        .addFields({
            name: 'Report link generated!',
            value: `Link: ` + CryptoService.generateReportLink(uid, cid, tid, oid, tstmp)
        })
        
        await interaction.reply({embeds:[
            em, em2
        ]})
	}
};