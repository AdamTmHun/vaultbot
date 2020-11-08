const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const command = require('./src/handlers/command');
const { prefix } = require('./src/handlers/prefix');

/*this is for for always on, don't worry if
you will run this on your pc, or on a vps.*/
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hey Bud!'));

app.listen(port, () =>
	console.log(`Your App is listening at https.//localhost:${port}`)
);

//after this is is the normal code.

client.on('ready', () => {
	console.log('Ready!');
	defaultStatus();
	//commands (gotta organsie this later)
	command(client, ['ping', 'test'], message => {
		message.channel.send('Pong!');
	});
	command(client, ['clear', 'purge'], message => {
		if (message.member.hasPermission('MANAGE_MESSAGES')) {
			let content = message.content.replace(`${prefix}purge `, '');
			content = content.replace(`${prefix}clear `, '');
			content = parseInt(content);
			if (typeof content !== 'number' || content <= 0) return message.reply('Please send a vaild intiger, that is greater than 0.');
			if (content > 100) return message.reply('Please send a vaild intiger that is lower or equal to 100');
			message.channel.bulkDelete(content);
		} else {
			return message.reply(
				"You don't have permissions to execute this command."
			);
		}
	});
	command(client, 'setstatus', message => {
		if (message.author.id !== process.env.OWNER_ID)
			return message.reply(
				"You are not the owner of the bot, you can't run this command."
			);
		const content = message.content.replace('>>setstatus ', '');
		if (content == 'default') {
			return defaultStatus();
		} else {
			client.user.setPresence({
				activity: {
					name: content,
					type: 'LISTENING'
				}
			});
		}
		message.channel.send(`My status was successfully set to **${content}**.`)
	});
});
function defaultStatus() {
	client.user.setPresence({
		activity: {
			name: '🚧',
			type: 'LISTENING'
		}
	});
}

client.login(process.env.TOKEN);
