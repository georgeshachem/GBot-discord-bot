const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

const fs = require("fs")

client.on("ready", () => {
    console.log("Running");
});

client.on("message", (message) => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    //command getter
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    //admin commands
    if (message.author.id == config.ownerID) {
        if (command === "prefix") {
            temp_var = message.content.split(" ").slice(1, 2)[0]
            if (temp_var) {
                let newPrefix = temp_var;
                config.prefix = newPrefix;
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
            } else
                message.channel.send("Error!!! Empty Prefix!")
        } else
        if (command === "say") {
            let text = args.join(" ");
            if (text) {
                message.channel.send(text);
            }
            message.delete();
        }
    }

    //normal commands
    if (command === "help") {
        message.channel.send({
            embed: {
                color: 16772096,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: "GBot Help Menu",
                url: "https://github.com/georgeshachem",
                description: "Click [here](https://github.com/georgeshachem) for more information. ```\nStill in beta testing!```",
                fields: [{
                        name: "🤔Normal Commands",
                        value: "ping | foo | asl"
                    },
                    {
                        "name": "😱Admin Commands",
                        "value": "prefix | say"
                    },
                    {
                        "name": "🙄More to come",
                        "value": "I'm still working on adding more"
                    }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Georges8431"
                }
            }
        });
    } else if (command === "ping") {
        message.channel.send("Current bot ping is: " + client.ping);
    } else if (command === "foo") {
        message.channel.send("bar!");
    } else if (command === "asl") {
        let [age, sex, location] = args;
        message.reply(`Hello ${message.author.username}, I see you're a ${age} year old ${sex} from ${location}. Wanna date?`);
    }
});


client.login(config.token);