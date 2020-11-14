const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client();
const db = require('quick.db');
db.set('RUN_COMMAND', true)
// require('events').EventEmitter.defaultMaxListeners = 15;


const loadCommands = require('./src/features/load-commands');


/*this is for for always on, don't worry if
 you will run this on your pc, or on a vps.*/
function exp() {
	const express = require('express');
	const app = express();
	const port = 3000;

	app.get('/', (req, res) => res.send('Started The bot.'));
	app.listen(port, () =>
		console.log(`Your App is listening at https.//localhost:${port}`)
	);
};
setTimeout(exp, 1000)


const config = require('./config.json')

client.on('ready', async () => {
	console.log('The client is ready!')
	let statuses = [
		`>>help`,
		`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} members`,
		`${db.get('COMMAND_AMOUNT')} Commands`,
		`Made By: AdamTm`,
		`Exclusive for Nitro Vault`
	];
	let i = 0;
	
	
	setInterval(function() {
		if (i >= statuses.length) i = 0;
		client.user.setActivity(statuses[i], { type: 'WATCHING' })
		i++;
	}, 10000)
	loadCommands(client);
})

client.login(process.env.TOKEN);