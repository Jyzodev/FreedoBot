const { CommandInteraction, MessageEmbed } = require('discord.js');
const axios = require('axios').default;

module.exports = {
	name: 'dadjoke',
	description: 'Display a Dad joke in the chat',
	usage: "/dadjoke",
	permission: 'SEND_MESSAGES',

	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		const { user } = interaction;

		const options = {
			method: 'GET',
			url: 'https://icanhazdadjoke.com/',
			headers: {
				'Accept': 'application/json',
				'User-Agent': 'Discord Bot (https://github.com/skullgaming31/skulledbotDiscord)' 
			}
		};

		const response = await axios.request(options);

		const dadJoke = new MessageEmbed()
			.setColor('RANDOM')
			.setAuthor({ name: `${user.username}`, iconURL: `${user.displayAvatarURL({ dynamic: true, size: 512 })}` })
			.setThumbnail(`${user.displayAvatarURL({ dynamic: true, size: 512 })}`)
			.setDescription(`${response.data.joke}`)
			.setFooter({ text: 'Made by Jyzo.' });

		interaction.reply({ embeds: [dadJoke] });
	}
};