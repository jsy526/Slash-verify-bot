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
    .setTitle(`**${oldMessage.author.tag}**님이 메시지를 수정했습니다.`)
    .setColor('#FFFF')
    .addField('수정 전 메시지:', oldMessage.content)
    .addField('수정 후 메시지:', newMessage.content)
    .setFooter(oldMessage.author.tag, img)
    .setTimestamp()
    client.channels.cache.get('927482738590744596').send({ embeds: [embed] })
  })
  
  
  
  client.on('messageDelete', async message => {
  if(message.author.bot) return
  const img = message.author.avatar ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=256` : undefined;
  const embed1 = new MessageEmbed() 
  .setTitle(`**${message.author.tag}**님이 메시지를 삭제했습니다.`)
  .setColor('#FFFF')
  .addField('삭제된 메시지:', message.content)
  .setFooter(message.author.tag, img)
  .setTimestamp()
  client.channels.cache.get('927482761718169620').send({ embeds: [embed1] })
  });

 // client.on('message', message =>{
    //if(message.channel.id === '927482761718169620' && message.member.hasPermission('ADMINISTRATOR') && message.author.id === ('825604702011785258')){
        
     //   message.react("1️⃣");
      //  message.react("2️⃣");
      //  message.react("3️⃣");
      //  
       // const Filter_1 = (reaction) => reaction.emoji.name === "1️⃣";
       // const Filter_2 = (reaction) => reaction.emoji.name === "2️⃣";
       // const Filter_3 = (reaction) => reaction.emoji.name === "3️⃣";

      //  const role_1 = message.createReactionCollector(Filter_1, {time: 900000, dispose: true});
       // const role_2 = message.createReactionCollector(Filter_2, {time: 900000, dispose: true});
      //  const role_3 = message.createReactionCollector(Filter_3, {time: 900000, dispose: true});

     //   role_1.on("collect", async (reaction, user) => {
            //await reaction.message.guild.members.cache.get(user.id).roles.add('903529970708660234')
      //  });

      //  role_2.on("collect", async (reaction, user) => {
         //   await reaction.message.guild.members.cache.get(user.id).roles.add('903529979319570472')
      //  });

       // role_3.on("collect", async (reaction, user) => {
           // await reaction.message.guild.members.cache.get(user.id).roles.add('903529982633070613')
        //});
   // }
//})

//client.on('guildMemberAdd', guildMember =>{
    //guildMember.setNickname(`신입_${guildMember.user.username}`) 
   // guildMember.addRole('900711319714533406') //들어오면 역할주는거
    //guildMember.guild.channels.cache.get('903590620709408769').send(`<@${guildMember.user.id}>${message.guild.name}에 오신걸 환영해요!`)
  //});

client.once('ready', async () => {
	console.log(`Logged In As ${client.user.tag}`)
	await client.guilds.cache.get('921594738338062366')?.commands.set(data)
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
