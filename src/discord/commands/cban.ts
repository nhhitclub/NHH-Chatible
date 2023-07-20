import Discord, { EmbedBuilder } from "discord.js"
import { BanSentence, User } from "../../functions/database"
import { FacebookController } from "../../functions/facebook";


module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('cban')
		.setDescription('Ban tạm thời')
        .addStringOption(option => 
            option.setName('target')
            .setDescription('Cút')
            .setRequired(true)
        )
        .addNumberOption(option =>
            option.setName('duration')
            .setDescription('Mấy cây là vừa')
            .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('unit')
            .setDescription('Giờ phút giây a có đánh rơi nhịp nào không')
            .addChoices(
                { name: 'Giờ', value: 'h' }, 
                { name: 'Phút', value: 'm' }, 
                { name: 'Giây', value: 's' }
            ).setRequired(true)
        )
        .addStringOption(option => 
            option.setName('reason')
            .setDescription('taiii saoooo').setRequired(true)
        )
    ,
	async execute(interaction:any) {

        const userID = interaction.options.getString('target');
        const duration = interaction.options.getNumber('duration')
        const unit = interaction.options.getString('unit')
        const reason = interaction.options.getString('reason');
        

        const user = await User.findOne({ userID });

        if(!user) { 
            await interaction.reply({ content: 'Invalid user FBID', ephemeral: true })

            return;
        }

        const expDate = new Date();
        const startDate = new Date();

        const addTime = (date: Date, time: number) => {
            expDate.setTime(date.getTime() + time);
        }

        switch(unit){
            case 's':
                addTime(expDate, duration * 1000);
                break;
            case 'm':
                addTime(expDate, duration * 60000);
                break;
            case 'h':
                addTime(expDate, duration * 3600000);
                break;
        }

        user.role = "banned";
        await user.save();

        const banSentence = new BanSentence({
            userID,
            reason,
            expires: expDate,
            startTime: startDate
        })

        await banSentence.save();

        await FacebookController.getInstance()
        .sendTextOnlyMessage(userID, 'Bạn đã bị ban trong ' + duration+unit + ' vì lý do: ' + reason)

        const em:EmbedBuilder = new EmbedBuilder()
            .setColor(0x0099FF)
            .addFields({
                name: 'Contemporary ban applied to user with ID: ' + userID,
                value: 'Duration: ' + duration + unit + 
                        ' (count started at: ' + startDate.toLocaleString("vi-VN") + 
                        ' to ' + expDate.toLocaleString("vi-VN") + ')'
                        + '\nReason: ' + reason
            });

        await interaction.reply({
            embeds: [ em ]
        })
    }
}