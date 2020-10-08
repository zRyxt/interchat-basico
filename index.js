//creado por zRyxt

//creado de servidor en repl.it
//require("http").createServer((_, res) => res.end("Estoy vivo!")).listen(8080)
//quita los "//" de el creador de replit si usas replit y borra lo de glitch

//creador de servidor de glich
const http = require('http');
const express = require('express');
const app = express();

//app.use(express.static('public'));

app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`); 
}, 280000);

const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const db = require("quick.db");


//encendido del bot
client.on("ready", () => {
client.user.setActivity("🟣 g.ayuda | creado por **tu nombre** 🟣", { type: "WATCHING"})
  console.log(`El bot se ha encendido como: ${client.user.username}...`);
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
  const args = message.content
    .slice(config.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  //uso: g.canal #canal del chat
  
  if (command === "canal") {
    const channel = message.mentions.channels.first();
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`> ¡Necesitas el permiso de **Gestionar Servidor**!`)
    if (!channel)
      return message.channel.send(
        "> _Canal invalido_, **Menciona un canal**"
      );
    db.set(`g_${message.guild.id}`, `${channel.id}`);
    message.channel.send(`> ¡El **chat global** se ha establecido como: ${channel}!`);
  }
});

//mensaje de ayuda
client.on("message", (message) => {
if(message.content == "g.help"){ // Check if content of message is "!ping"
const embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username} • ${message.author.id}`,message.author.displayAvatarURL())
      .setColor('RANDOM')
      .setDescription("🟣 **GLOBAL CHAT HELP** 🟣\nPara ayuda en español usa: `g.ayuda`")
      .setURL("")
      .addField("`g.canal`", "Defines the ** channel ** in which the global chat will work. Example: g.canal #global-chat.")
      .addField("`g.help`", "Shows this **message**.")
      .addField("`g.ping`", "Shows the **delay** of the bot sending a message.")
      .addField("`g.invite`", "Make an **invite** for the actual channel.")
      .addField("▬▬▬▬▬▬▬▬▬\nImportant links:", "[invite to your server]() | [support server]() | [youtube]()")
      .setTimestamp()
      .setFooter(`Created by `);
      message.channel.send(embed);
	}
});

client.on("message", (message) => {
if(message.content == "g.ayuda"){ // Check if content of message is "!ping"
const embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username} • ${message.author.id}`,message.author.displayAvatarURL())
      .setColor('RANDOM')
      .setDescription("🟣 **AYUDA CHAT GLOBAL** 🟣\nFor help in english use: `g.help`")
      .setURL("")
      .addField("`g.canal`", "Define el **canal** en el que va a funcionar el chat global. Ejemplo: g.canal #chat-global.")
      .addField("`g.ayuda`", "Muestra este **mensaje**.")
      .addField("`g.ping`", "Muestra el **retraso** que tiene el bot al enviar un mensaje.")
      .addField("`g.invite`", "Crea una **invitacion** al canal actual.")
      .addField("▬▬▬▬▬▬▬▬▬\nEnlaces importantes:", "[invitame a tu servidor]() | [servidor de soporte]() | [youtube]()")
      .setTimestamp()
      .setFooter(`Creado por `);
      message.channel.send(embed);
	}
});
//fin del mensaje de ayuda

//comando ping
client.on("message", (message) => {
if(message.content == "g.ping"){

    let ping = Math.floor(message.client.ping);
    
    message.channel.send("¡PINGEANDO! :ping_pong:")
      .then(m => {

          m.edit(`>>> :incoming_envelope: Ping mensaje: **${Math.floor(m.createdTimestamp - Date.now())} ms**`);
      
      });
    
  }
 })
//fin del comando ping

client.on("message", async message => {
  if (message.author.bot) return;
  if (message.content.startsWith(config.prefix)) return;
  if (message.content.includes('discord.gg/')) return;
  if (message.content.includes('discord.com/invite/')) return;
  let set = db.fetch(`g_${message.guild.id}`);
  if (message.channel.id === set) {
 message.delete()
let channel = message.channel;
channel.createInvite({unique: true})
.then(invite => {
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} • ${message.author.id}`,message.author.displayAvatarURL())
      .setColor('RANDOM')
      .setDescription(`🟣 **CHAT GLOBAL** 🟣\n \n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n[unirse a este servidor](https://discord.gg/${invite.code})  |  [invitacion del bot]()\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
      .setURL("https://discord.gg/")
      .addField("**Mensaje:**", message.content)
      .setTimestamp()
      .setThumbnail(message.guild.iconURL())
      .setFooter(`${message.guild.name} • Miembros: ${message.guild.memberCount} • ${message.guild.id}`, message.guild.iconURL());

     client.guilds.cache.forEach(g => {
      try {
        client.channels.cache.get(db.fetch(`g_${g.id}`)).send(embed);
      } catch (e) {
        return;
      }
    });
  }
)}
});

//comando de invite a server
client.on("message", message => {
let channel = message.channel;
if(!message.content.startsWith(`g.invite`)) return;
channel.createInvite({unique: true})
.then(invite => {
message.reply("He creado una invite para ti uwu: https://discord.gg/" + invite.code)
})
});

const config = require("./config.json");
client.login(process.env.TOKEN);
