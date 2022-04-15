import { Client, Intents, MessageEmbed, TextChannel } from 'discord.js';
import { token, host } from './config.json';
import ping from 'ping';

const client = new Client({
    intents: [Intents.FLAGS.GUILDS],
});

const channel = client.channels.cache.get('964192733977792542') as TextChannel;

const upEmbed = new MessageEmbed()
    .setTitle('T.A.S.V. Server Status')
    .setDescription('T.A.S.V. has detected that the server is back up!')
    .setImage('https://pngimg.com/uploads/cat/cat_PNG50480.png')
    .setTimestamp();

const downEmbed = new MessageEmbed()
    .setTitle('T.A.S.V. Server Status')
    .setDescription('T.A.S.V. has detected that the server is down')
    .setImage('https://pngimg.com/uploads/cat/cat_PNG50480.png')
    .setTimestamp();

client.once('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});

/*
This function checks if the host is online, and outputs to the console.
If the bot goes down, an embed is sent and online switched to false.
If the bot goes back up, an embed is sent and online is switched to true.
*/

let online = true;

function checkOnline() {
    ping.sys.probe(host, function (isAlive: unknown) {
        const msg = isAlive
            ? 'host ' + host + ' is alive'
            : 'host ' + host + ' is dead';
        console.log(msg);

        const random = Math.floor(Math.random() * 100);

        if (15 >= random) {
            upEmbed.setImage('https://tenor.com/bJ9ud.gif');
            downEmbed.setImage('https://tenor.com/bJ9ud.gif');
        } else if (36 >= random) {
            upEmbed.setImage('https://tenor.com/bHcjE.gif');
            downEmbed.setImage('https://tenor.com/bHcjE.gif');
        } else {
            upEmbed.setImage('https://pngimg.com/uploads/cat/cat_PNG50480.png');
            downEmbed.setImage(
                'https://pngimg.com/uploads/cat/cat_PNG50480.png'
            );
        }

        switch (msg) {
            case 'host ' + host + ' is alive':
                if (online == false) {
                    channel.send({ embeds: [upEmbed] });
                    online = true;
                }
                break;

            case 'host ' + host + ' is dead':
                if (online == true) {
                    channel.send({ embeds: [downEmbed] });
                    online = false;
                }
                break;
        }
    });
}

client.login(token);

// Checks if the host is online every half hour (1 800 000 milliseconds)
setInterval(checkOnline, 1800000);
