# tasv

A small project written in TypeScript with Discord.js to check if a server is running and post an embed if the server's status changes.

<br/>

## Installation and Configuration

This project requires Node.js to run.

Make sure you install the required dependencies with `npm i`, then simply run either `tsc` or `npm run build` to build.

For the program to work correctly, you will need to make a 'config.json' file inside of 'src/', and fill in the required variables:

### host

The host to ping, this can either be given as a domain or as an IP address.

### webhookId

The ID of the webhook, this is the string right after '/api/webhooks/' in the url.

### webhookToken

The webhook token, this is the string that comes after the webhook ID.
