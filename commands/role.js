const { CommandInteraction } = require('discord.js')

module.exports = {
	name: "인증",
	description: 'verify',
	/**
	 * @param { CommandInteraction } Interaction
	 */

	async execute(interaction) {        
		await interaction.reply({ content: '성공적으로 지급 되었습니다!', ephemeral: true });
        interaction.member.roles.add("858870021265686569");
		
	}
}
