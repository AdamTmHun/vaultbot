const { prefix } = require('../../config.json');

module.exposts = (client, aliases, run) => {
	if (typeof aliases === 'string') {
		aliases = [aliases];
	}

	client.on('message', message => {
		const { content } = message;

		aliases.forkEach(alias => {
			const command = `${prefix}${alias}`

			if (content.startsWith(`${command} `)  || content)
		})

	})

}