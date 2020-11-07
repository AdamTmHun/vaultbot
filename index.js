const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const command = require('./src/handlers/command');

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
	command(client, ['ping', 'test'], (message) => {
		message.channel.send('Pong!');
	});
	command(client, ['cc', 'clearchannel'], (message) => {
		if (message.member.hasPermission('ADMINISTRATOR')) {
			message.channel.messages.fetch().then((results) => {
				message.channel.bulkDelete(results);
			});
		} else {
			return message.reply('You don\'t have permissions to execute this command.')
		}
	});
	command(client, 'setstatus', (message) => {
		if (message.author.id !== process.env.OWNER_ID) return message.reply('You are not the owner of the bot, you can\'t run this command.');
		const content = message.content.replace('.setstatus ', '')
		if (content == 'default') {
			return defaultStatus();
		} else {
			client.user.setPresence({
				activity: {
					name: content,
					type: 'LISTENING'
				}
			})
		}
	});

});
function defaultStatus() {
	client.user.setPresence({
		activity: {
			name: '🚧',
			type: 'LISTENING',

		}
	})
}

client.login(process.env.TOKEN);
