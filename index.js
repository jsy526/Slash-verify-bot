const {Client,Intents, Collection,MessageEmbed} = require('discord.js');
const client = new Client({intents:[Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MEMBERS]})
const {token} = require('./config.json');
const fs = require('fs');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands = new Collection();
var data = []
for(const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	data.push({name: command.name, description: command.description, options:command.options});
}

client.on('messageUpdate', async(oldMessage, newMessage) => {
    if(oldMessage.content === newMessage.content) return 
    if(oldMessage.author.bot) return;
    const img = oldMessage.author.avatar ? `https://cdn.discordapp.com/avatars/${oldMessage.author.id}/${oldMessage.author.avatar}.webp?size=256` : undefined;
    const embed = new MessageEmbed()
    .setTitle(`${oldMessage.author.tag}님이 메시지를 수정했습니다.`)
    .setColor('#FFFF')
    .addField('수정 전 메시지:', oldMessage.content)
    .addField('수정 후 메시지:', newMessage.content)
    .setFooter(oldMessage.author.tag, img)
    .setTimestamp()
    client.channels.cache.get('899245273413451807').send({ embeds: [embed] })
  })
  
  
  
  client.on('messageDelete', async message => {
  if(message.author.bot) return
  const img = message.author.avatar ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=256` : undefined;
  const embed = new MessageEmbed() 
  .setTitle(`${message.author.tag} 님이 메시지를 삭제했습니다.`)
  .setColor('#FFFF')
  .addField('삭제된 메시지:', message.content)
  .setFooter(message.author.tag, img)
  .setTimestamp()
  client.channels.cache.get('898819684089081876').send({ embeds: [embed] })
  });

client.once('ready', async () => {
	console.log(`Logged In As ${client.user.tag}`)
	await client.guilds.cache.get('899245273413451807')?.commands.set(data)
});

const Dokdo = require('dokdo')

const DokdoHandler = new Dokdo(client, { aliases: ['dokdo', 'dok', '독도'], prefix: 's'})

client.on('messageCreate', message => {
    DokdoHandler.run(message)
})

client.on('interactionCreate', async interaction => {
	if(!interaction.isCommand()) return;
	if(!client.commands.has(interaction.commandName)) return;
	const command = client.commands.get(interaction.commandName);
	try {
		await command.execute(interaction)
	}catch(error) {
		console.log(`오류가 발생했습니다. \n오류내용 : ${error}`)
	}
})

client.login(token)
