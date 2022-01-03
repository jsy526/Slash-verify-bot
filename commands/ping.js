const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
	name: "ping",
	description: '핑을 확인 합니다.',
	/**
	 * @param { CommandInteraction } Interaction
	 */

	async execute(interaction) {
        const embed = new MessageEmbed()
        .setTitle('퐁!')
        .addFields(
            {
                name: "핑",
                value:`> \`${Date.now() - interaction.createdTimestamp}\`ms`,
            },
        )
        .setColor('BLUE')
        .setTimestamp();
        
		await interaction.reply({ embeds: [embed] })
		
     }
}
