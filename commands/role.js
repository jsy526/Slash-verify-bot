const { CommandInteraction } = require('discord.js')

module.exports = {
	name: "verify",
	description: '인증',
	/**
	 * @param { CommandInteraction } Interaction
	 */

	async execute(interaction) {        
		await interaction.reply(`성공적으로 지급 되었습니다!`);
		
        interaction.member.roles.add("858870021265686569");
	}
}
