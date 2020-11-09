module.exports = {
	commands: 'setstatus',
	expectedArgs: '<newStatus>',
	minArgs: 1,
	ownerOnly: true,
	guildOnly: false,
	run: (message, args, text, client) => {
		if (args[0] === 'default') {
			client.user.setPresence({
				activity: {
					name: '🚧',
					type: 'LISTENING',
					status: 'dnd'
				}
			});
		} else {
			client.user.setPresence({
				activity: {
					name: text,
					type: 'LISTENING',
					status: 'dnd'
				}
			});
		}
		message.reply(`The status was changed to **${text}**.`);
	}
};
