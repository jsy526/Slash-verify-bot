// use discord.js v13
const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
    name: "프사",
    description: '유저의 프로필을 표시합니다.',
    options: [
        {
            name: "유저",
            description: "프로필을 볼 유저를 입력해주세요.",
            type: "USER",
            required: true,
        },
    ],
    /**
     * @param { CommandInteraction } Interaction
     */

    async execute(interaction) {
        const user = interaction.options.getUser('유저');

        const av = user.displayAvatarURL({size: 2048, dynamic: true})

        const embed = new MessageEmbed()
            .setTitle(`${user.username} 님의 프로필`)
            .setDescription(`[프로필 다운로드](${av})`)
            .setImage(av)
            .setColor(interaction.member.displayHexColor || "RANDOM");

        await interaction.reply({ embeds: [embed] })
    }
}