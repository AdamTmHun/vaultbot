const loadCommands = require('../../features/load-commands');
const { prefix } = require('../../handlers/prefix.json');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
  commands: ['help', 'h'],
  description: "Describes all of this bot's commands",
  run: (message, arguments, text) => {
	const embed = new MessageEmbed()
		.setTitle('Vaultbot Help Menu')
		.setURL('https://estoka07.gitbook.io/vaultbot/')
		.addField('Useful Links:', '[Commands List](https://estoka07.gitbook.io/vaultbot/)\n[Server Website](https://www.nitrovault.tk)')
		//.addField('', 'https://www.nitrovault.tk/')
		.setThumbnail(message.guild.iconURL({ dynamic: true }));
	message.channel.send(embed)
  }
  
}