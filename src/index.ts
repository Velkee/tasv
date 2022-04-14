import { Client, Intents, Message } from 'discord.js';
import { token } from './config.json';

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('messageCreate', (msg: Message) => {
    if (msg.content === 'ping'.toLowerCase()) {
        msg.reply('Pong!');
    }
});

client.login(token);
