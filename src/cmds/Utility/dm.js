module.exports = {
	commands: 'dm',
	minArgs: 2,
	maxArgs: 2,
	expectedArgs: '<user> <message>',
	requiredPerms: ['MANAGE_MESSAGES'],
	run: (message, args, text, client) => {
		text = text.replace(`${args[0]} `, '');

		const person = message.guild.member(message.mentions.users.first() || message.guild.members.fetch(args[0]));

		person.send(text);
	}
}