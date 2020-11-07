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
	//commands (gotta organsie this later)
	command(client, ['ping', 'test'], (message) => {
		message.channel.send('Pong!');
	});

})

client.login(process.env.TOKEN);
