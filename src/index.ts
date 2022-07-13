import { MessageEmbed, WebhookClient } from 'discord.js';
import { host, webhookId, webhookToken } from './config.json';
import tcpp from 'tcp-ping';

const webhookClient = new WebhookClient({ id: webhookId, token: webhookToken });

const testEmbed = new MessageEmbed()
    .setTitle('T.A.S.V. Online!')
    .setTimestamp();

const upEmbed = new MessageEmbed()
    .setTitle('T.A.S.V. Server Status')
    .setDescription('T.A.S.V. has detected that the server is back up!')
    .setImage('https://pngimg.com/uploads/cat/cat_PNG50480.png')
    .setTimestamp();

const downEmbed = new MessageEmbed()
    .setTitle('T.A.S.V. Server Status')
    .setDescription(
        'T.A.S.V. has detected that the server is down. <@422049592864014339>'
    )
    .setImage('https://pngimg.com/uploads/cat/cat_PNG50480.png')
    .setTimestamp();

// Sends an embed verifying the bot has come online.
webhookClient.send({
    username: 'T.A.S.V.',
    avatarURL:
        'https://github.com/cat-milk/Anime-Girls-Holding-Programming-Books/blob/master/Typescript/inugami_korone_effective_typescript.png?raw=true',
    embeds: [testEmbed],
});

/*
This function checks if the host is online, and outputs to the console.
If the bot goes down, an embed is sent and online switched to false.
If the bot goes back up, an embed is sent and online is switched to true.
*/

let online = true;

function checkOnline() {
    tcpp.probe(host, 25565, function (isAlive: unknown) {
        const msg = isAlive
            ? 'host ' + host + ' is alive'
            : 'host ' + host + ' is dead';
        console.log(msg);

        /*
        This gives a 16% chance for the embed image being Ralsei smoking a blunt
        and a 21% chance for it to be Freddy Fazbear twerking.

        Comment out line 54-67 to disable.
        */
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
                    webhookClient.send({
                        username: 'T.A.S.V.',
                        avatarURL:
                            'https://github.com/cat-milk/Anime-Girls-Holding-Programming-Books/blob/master/Typescript/inugami_korone_effective_typescript.png?raw=true',
                        embeds: [upEmbed],
                    });
                    online = true;
                }
                break;

            case 'host ' + host + ' is dead':
                if (online == true) {
                    webhookClient.send({
                        username: 'T.A.S.V.',
                        avatarURL:
                            'https://github.com/cat-milk/Anime-Girls-Holding-Programming-Books/blob/master/Typescript/inugami_korone_effective_typescript.png?raw=true',
                        embeds: [downEmbed],
                    });
                    online = false;
                }
                break;
        }
    });
}

// Checks if the host is online, then checks again every half hour (1 800 000 milliseconds).
checkOnline();
setInterval(checkOnline, 1800000);
