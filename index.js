const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client();
const db = require('quick.db')

const loadCommands = require('./src/features/load-commands');


/*this is for for always on, don't worry if
 you will run this on your pc, or on a vps.*/
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hey Bud!'));
app.listen(port, () =>
	console.log(`Your App is listening at https.//localhost:${port}`)
);


const config = require('./config.json')

client.on('ready', async () => {
	console.log('The client is ready!')
	client.user.setPresence({
		activity: {
			name: '🚧',
			type: 'LISTENING',
			status: 'dnd'
		}
	});
	loadCommands(client)
})

client.login(process.env.TOKEN);