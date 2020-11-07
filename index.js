const Discord = require('discord.js');
const client = new Discord.Client();
const cmdhandler = require('wokcommands');
const config = require('./config.json');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hey Bud!'));

app.listen(port, () => 
console.log(`Your App is listening at https.//localhost:${port}`)
);

client.on('ready', () => {
	console.log('The Client Is On!');
})

client.login(process.env.TOKEN);
