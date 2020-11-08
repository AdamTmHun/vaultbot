module.exports = {
	commands: ['ping', 'latency'],
	minArgs: 0,
	maxArgs: 0,
	perms: [],
	run: (client, message, args, text) => {
		message.channel.send(`Pong!🏓 \nLatency is \`${Date.now() - message.createdTimestamp}ms\`. API Latency is \`${Math.round(client.ws.ping)}ms\``);
	},
}