const { CommandInteraction } = require('discord.js')

module.exports = {
	name: "핑",
	description: '퐁',
	/**
	 * @param { CommandInteraction } Interaction
	 */

	async execute(interaction) {
		await interaction.reply(`pong!`)
	}
}