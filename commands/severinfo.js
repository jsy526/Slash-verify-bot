const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
	name: "severinfo",
	description: '서버의 정보를 확인 합니다.',
	/**
	 * @param { CommandInteraction } Interaction
	 */

	async execute(interaction) {
        const verificationLevel = {
            NONE: '제한 없음',
            LOW: '이메일이 인증이 완료된 Disocrd 계정',
            MEDIUM: 'Discord에 가입한 지 5분',
            HIGH: '이 서버에 멤버가 된 지 10분',
            VERY_HIGH: '휴대폰 인증이 완료된 Discord 계정',
        }
        const embed = new MessageEmbed()
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .addFields(
            {
                name: "서버 이름",
                value:`**${interaction.guild.name}**`,
                inline: true
            },
        
            {
                name: "서버 ID",
                value:`\`${interaction.guild.id}\``,
                inline: true
            },
            {
                name: "서버 생성일",
                value:`<t:${Math.floor(interaction.guild.createdTimestamp / 1000)}:R>`, 
                inline: true
            },
            {
                name: "서버 멤버 수",
                value:`${interaction.guild.memberCount}명`,
                inline: true
            },
            {
                name: "서버 봇 수",
                value:`${interaction.guild.members.cache.filter((x) => x.user.bot).size}개`,
                inline: true
            },
            {
                name: "서버 부스트 레벨",
                value:`${interaction.guild.premiumTier}`,
                inline: true
            },
            {
                name: "서버 부스트 수",
                value:`${interaction.guild.premiumSubscriptionCount}개`,
                inline: true
            }, 
            {
                name: "서버 텍스트 채널 수",
                value:`${interaction.guild.channels.cache.filter(x => x.type === "GUILD_TEXT").size}개`,
                inline: true
            }, 
            {
                name: "서버  음성 채널 수",
                value:`${interaction.guild.channels.cache.filter(x => x.type === "GUILD_VOICE").size}개`,
                inline: true
            },
            {
                name: `**${interaction.guild.name}**의 주인`,
                value:`<@${interaction.guild.ownerId}>`,
                inline: true
            },
            {
                name: `**${interaction.guild.name}**의 주인 ID`,
                value:`\`${interaction.guild.ownerId}\``,
                inline: true
            },
            {
                name: `**${interaction.guild.name}**의 보안 레벨`,
                value:`${interaction.guild.verificationLevel}`,
                inline: true
            }, 
        )
		await interaction.reply({ embeds: [embed] })
		
     }
}
