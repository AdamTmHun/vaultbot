const { MessageEmbed } = require('discord.js')
module.exports = {
	commands: 'easteregg',
	cooldown: 0,
	guildOnly: false,
	run: (message, args, text, client) => {
		const embed = new MessageEmbed()
			.setTitle("You've found an easter egg!")
			.setDescription('Your reward:\n Nothing!')
			.setThumbnail('https://cdn.discordapp.com/attachments/739518500900700231/775351447210295326/14615a29-f9dc-48ae-837f-a7abfbd47353.png')
			.setColor('PURPLE');
		return message.channel.send(embed);
	}
};
