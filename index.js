/* eslint-disable no-mixed-spaces-and-tabs */
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token, CHANNEL_LISTEN, CHANNEL_POST } = require('./config.json');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
client.on(Events.MessageCreate, async (message) => {
	if (CHANNEL_LISTEN.includes(message.channel.id)) {
		const postChannel = client.channels.cache.get(CHANNEL_POST);
		// eslint-disable-next-line no-mixed-spaces-and-tabs
		// 檢查訊息是否包含圖片
		if (message.attachments.size > 0) {
			const attachment = message.attachments.first();
			await postChannel.send({
				content: message.content,
				files: [attachment.url],
			});
		}
		else {
			await postChannel.send(message.content);
		}
	}
});

client.login(token);