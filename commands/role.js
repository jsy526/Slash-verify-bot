\const { CommandInteraction } = require('discord.js')

module.exports = {
	name: "verify",
	description: '인증',
	/**
	 * @param { CommandInteraction } Interaction
	 */

	async execute(interaction) {        
		await interaction.reply({ content: '성공적으로 지급 되었습니다!', ephemeral: true });
       interaction.member.roles.add("927392548694163496");
		
     }
}
