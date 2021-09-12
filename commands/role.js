const { CommandInteraction } = require('discord.js')

module.exports = {
	name: "verify",
	description: '인증',
	/**
	 * @param { CommandInteraction } Interaction
	 */

	async execute(interaction) {        
		await interaction.reply(`Succes!`);
        interaction.member.roles.add("858870021265686569");
	}
}
