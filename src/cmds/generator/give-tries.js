const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
	commands: ['giveentries', 'givetries'],
	expectedArgs: '<MentionTargetUser> <amount>',
	minArgs: 2,
	maxArgs: 2,
	perms: [],
	ownerOnly: true,
	guildOnly: false,
	run: (message, args, text, client) => {
		let person = message.guild.member(message.mentions.users.first() || message.guild.members.fetch(args[0]))
		db.set(`USER_${person.id}.entryAmount`, (db.get(`USER_${person.id}.entryAmount`) || 0) + args)

	}
}