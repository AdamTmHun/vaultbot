const { MessageEmbed, version: djsversion } = require('discord.js');
const { version } = require('../../../package.json');
const { utc } = require('moment');
const os = require('os');
const fs = require('fs');
const ms = require('ms');
const db = require('quick.db');
function formatBytes(bytes) {
		if (bytes === 0) return '0 Bytes';
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
	}

module.exports = {
	commands: ['botinfo', 'bot'],
	run: (message, args, text, client) => {
		const core = os.cpus()[0];
		const dir = '.././cmds';
		let commands = 0;
		
		const embed = new MessageEmbed()
			.setThumbnail(client.user.displayAvatarURL())
			.setColor(message.guild.me.displayHexColor || 'BLUE')
			.addField('General', [
				`**❯ Client:** ${client.user.tag} (${client.user.id})`,
				`**❯ Commands:** ${db.get('COMMAND_AMOUNT')}`,
				`**❯ Creation Date:** ${utc(client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
				`**❯ Node.js:** ${process.version}`,
				`**❯ Version:** v${version}`,
				`**❯ Discord.js:** v${djsversion}`,
				'\u200b'
			])
			.addField('System', [
				`**❯ Platform:** ${process.platform}`,
				`**❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })} (with restarts)`,
				`**❯ CPU:**`,
				`\u3000 Cores: ${os.cpus().length}`,
				`\u3000 Model: ${core.model}`,
				`\u3000 Speed: ${core.speed}MHz`,
				`**❯ Memory:**`,
				`\u3000 Total: ${formatBytes(process.memoryUsage().heapTotal)}`,
				`\u3000 Used: ${formatBytes(process.memoryUsage().heapUsed)}`
			])
			.setTimestamp();

		message.channel.send(embed);
	}
}