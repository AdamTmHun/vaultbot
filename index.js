const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()


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
	})

	const baseFile = 'command-base.js'
	const commandBase = require(`./src/handlers/${baseFile}`)

	const readCommands = (dir) => {
		const dirFormat = dir.replace('src/cmds/', '');
		console.log(dirFormat)
		const files = fs.readdirSync(path.join(__dirname, dir))
		for (const file of files) {
			const stat = fs.lstatSync(path.join(__dirname, dir, file))
			if (stat.isDirectory()) {
				readCommands(path.join(dir, file))
			} else if (file !== baseFile) {
				const option = require(path.join(__dirname, dir, file))
				commandBase(client, option)
			}
		}
	}

	readCommands('src/cmds')
})

client.login(process.env.TOKEN);