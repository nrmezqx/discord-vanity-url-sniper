const { token, guild_id, vanity_url } = require('./config');
const request = require('request');
const Client = require('discord.js').Client;
const bot = new Client();

bot.on('guildUpdate', (old_guild, new_guild) => {
 if(old_guild.vanityURLCode == vanity_url && new_guild.vanityURLCode !== vanity_url) {
 request({
        url:`https://discord.com/api/v9/guilds/${guild_id}/vanity-url`,
        body: { code: `${vanity_url}` },
        json: true,
        method: 'PATCH',
        headers: { "Authorization": `Bot ${token}` },
    }, 
 function (error, response, body) {
     if(!error && response.statusCode == 200) return process.exit( );
   });
 } else return;
});

bot.login(token).catch(e => console.log(e));
process.on('unhandledRejection', (e) => console.log(e));
