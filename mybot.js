const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const config = require("./config.json");
require("./modules/functions.js")(client);

//enamp points
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");
const pointProvider = new EnmapLevel({
    name: "points"
});
client.points = new Enmap({
    provider: pointProvider
});

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        // super-secret recipe to call events with all their proper arguments *after* the `client` var.
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

client.on("message", message => {
    if (message.author.bot) return;
    client.pointsMonitor(client, message);
    if (message.content.indexOf(config.prefix) !== 0) return;

    // This is the best way to define args. Trust me.
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // The list of if/else is replaced with those simple 2 lines:
    try {
        let commandFile = require(`./commands/normal/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        console.error(err);
        message.channel.send("Command not supported! Type " + config.prefix + "help for a list of what's available.");
    }
});

+client.login(config.token);