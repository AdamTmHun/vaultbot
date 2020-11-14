const path = require('path');
const fs = require('fs');
const db = require('quick.db');

module.exports = (client) => {
	const baseFile = 'command-base.js'
	const commandBase = require(`../handlers/${baseFile}`)
	let i = 0;

	const commands = [];

	db.set('COMMAND_AMOUNT', 0)

	const readCommands = (dir) => {
		if (db.get('RUN_COMMAND') === true) {
			let dirFormat = dir.replace('src/cmds/', '').toUpperCase();
			dirFormat = dirFormat.replace('SRC/CMDS', '');
			dirformat = dirFormat.replace('/', '');
			if (dirFormat !== '') console.log('----------  ' + dirFormat + '  ----------');
		}
		const files = fs.readdirSync(path.join('/home/runner/vaultbot', dir))
		for (const file of files) {
			const stat = fs.lstatSync(path.join('/home/runner/vaultbot', dir, file))
			if (stat.isDirectory()) {
				readCommands(path.join(dir, file));

			} else if (file !== baseFile) {
				const option = require(path.join('/home/runner/vaultbot', dir, file))
				commands.push(option);
				if (client) {
					commandBase(client, option)
				}
				i++;
				db.set('COMMAND_AMOUNT', i);
			}


		}


	}

	readCommands('src/cmds')

	return commands;
}