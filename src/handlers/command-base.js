const { prefix } = require('../handlers/prefix.json');
const { MessageEmbed } = require('discord.js');

const validatePermissions = permissions => {
	const validPermissions = [
		'CREATE_INSTANT_INVITE',
		'KICK_MEMBERS',
		'BAN_MEMBERS',
		'ADMINISTRATOR',
		'MANAGE_CHANNELS',
		'MANAGE_GUILD',
		'ADD_REACTIONS',
		'VIEW_AUDIT_LOG',
		'PRIORITY_SPEAKER',
		'STREAM',
		'VIEW_CHANNEL',
		'SEND_MESSAGES',
		'SEND_TTS_MESSAGES',
		'MANAGE_MESSAGES',
		'EMBED_LINKS',
		'ATTACH_FILES',
		'READ_MESSAGE_HISTORY',
		'MENTION_EVERYONE',
		'USE_EXTERNAL_EMOJIS',
		'VIEW_GUILD_INSIGHTS',
		'CONNECT',
		'SPEAK',
		'MUTE_MEMBERS',
		'DEAFEN_MEMBERS',
		'MOVE_MEMBERS',
		'USE_VAD',
		'CHANGE_NICKNAME',
		'MANAGE_NICKNAMES',
		'MANAGE_ROLES',
		'MANAGE_WEBHOOKS',
		'MANAGE_EMOJIS'
	];

	for (const permission of permissions) {
		if (!validPermissions.includes(permission)) {
			throw new Error(`Unknown permission node "${permission}"`);
		}
	}
};

module.exports = (client, commandOptions) => {
	let {
		commands,
		expectedArgs = '',
		permissionError = 'You do not have permission to run this command.',
		minArgs = 0,
		maxArgs = null,
		permissions = [],
		requiredRoles = [],
		ownerOnly = false,
		nullowOnly = false,
		guildOnly = true,
		run
	} = commandOptions;

	// Ensure the command and aliases are in an array
	if (typeof commands === 'string') {
		commands = [commands];
	}

	console.log(`Registering command "${commands[0]}"`);

	// Ensure the permissions are in an array and are all valid
	if (permissions.length) {
		if (typeof permissions === 'string') {
			permissions = [permissions];
		}

		validatePermissions(permissions);
	}

	// Listen for messages
	client.on('message', message => {
		const { member, content, guild, author, channel } = message;
		const emoji_x = '<:no:763054080872284210>';
		const failEmbed = new MessageEmbed().setColor('#ff0000');

		for (const alias of commands) {
			const command = `${prefix}${alias.toLowerCase()}`;

			if (
				content.toLowerCase().startsWith(`${command} `) ||
				content.toLowerCase() === command
			) {
				// A command has been ran

				// Ensure the user has the required permissions
				for (const permission of permissions) {
					if (!member.hasPermission(permission)) {
						const embed = new failEmbed()
							.setAuthor('Insufficient Permissions!')
							.setTitle(`${emoji_x + permissionError}`);
						message.channel.send(author.mention() + embed);
						return;
					}
				}

				// Ensure the user has the required roles
				for (const requiredRole of requiredRoles) {
					const role = guild.roles.cache.find(
						role => role.name === requiredRole
					);

					if (!role || !member.roles.cache.has(role.id)) {
						const embed = failEmbed
							.setAuthor('Insufficient Roles!')
							.setTitle(
								`${emoji_x} You don't have the required roles to use this command.`
							);
						message.reply(embed);
						return;
					}
				}

				// Split on any number of spaces
				const args = content.split(/[ ]+/);

				// Remove the command which is the first index
				args.shift();

				// Ensure we have the correct number of arguments
				if (
					args.length < minArgs ||
					(maxArgs !== null && args.length > maxArgs)
				) {
					const embed = failEmbed
						.setAuthor('Syntax Error!')
						.setTitle(
							`Incorrect syntax! Use \`\`\`${prefix}${alias} ${expectedArgs}\`\`\``
						);
					message.reply(embed);
					return;
				}

				// check if the command is ownerOnly
				if (ownerOnly === true) {
					if (author.id !== process.env.OWNER_ID)
						return message.reply('Only the bot owner can run this command.');
				}

				// check if this command is nullowOnly (since this was made for a single server, I used this easy version of the server owner and the bot owner option.)
				// if you will use this code for a multi-server bot, then you should use anotherr method.

				if (nullowOnly === true) {
					if (author.id !== process.env.NULLOW_ID) {
						if (author.id === process.env.OWNER_ID) {
							break;
						} else {
							return message.reply(
								'Only Nullow, or the bot owner can execute this command.'
							);
						}
					}
				}
				if (guildOnly === true) {
					if (!message.guild) {
						return message.author.send(embed);
					}
				}

				// Handle the custom command code
				run(message, args, args.join(' '), client);

				return;
			}
		}
	});
};
