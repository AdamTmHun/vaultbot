const { MessageEmbed } = require('discord.js')

module.exports = {
	commands: ['ping', 'latency'],
	minArgs: 0,
	maxArgs: 0,
	perms: [],
	guildOnly: false,
	run: (message, args, text, client) => {
		const embed = new MessageEmbed()
		.setTitle('Pong!🏓')
		.setDescription(`**Bot Latency**\n\`${Date.now() - message.createdTimestamp}ms\`\n**API Latency**\n\`${Math.round(client.ws.ping)}ms\``)
		.setThumbnail('https://media.discordapp.net/attachments/775120125132275742/775344312929878026/image0.png')
		message.channel.send(embed);

	},
}