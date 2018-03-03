const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

const fs = require("fs")

client.on("ready", () => {
    console.log("Running");
    client.user.setActivity('&help | better than Teafox')
});

client.on("message", async message => {
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
        } else
        if (command === "kick") {
            if (!message.member.roles.some(r => ["White Gangsta"].includes(r.name)))
                return message.reply("Sorry, you don't have permissions to use this!");
            let member = message.mentions.members.first();
            if (!member)
                return message.reply("Please mention a valid member of this server");
            if (!member.kickable)
                return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
            let reason = args.slice(1).join(' ');
            if (!reason)
                return message.reply("Please indicate a reason for the kick!");
            await member.kick(reason)
                .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
            message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
        } else
        if (command === "ban") {
            if (!message.member.roles.some(r => ["White Gangsta"].includes(r.name)))
                return message.reply("Sorry, you don't have permissions to use this!");
            let member = message.mentions.members.first();
            if (!member)
                return message.reply("Please mention a valid member of this server");
            if (!member.bannable)
                return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
            let reason = args.slice(1).join(' ');
            if (!reason)
                return message.reply("Please indicate a reason for the ban!");
            await member.ban(reason)
                .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
            message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
        } else
        if (command === "purge") {
            const deleteCount = parseInt(args[0], 10);
            if (!deleteCount || deleteCount < 2 || deleteCount > 100)
                return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
            const fetched = await message.channel.fetchMessages({
                count: deleteCount
            });
            message.channel.bulkDelete(fetched)
                .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
            message.reply("Deleted " + deleteCount + " messages")
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
    } else
    if (command === "ping") {
        message.channel.send("Current bot ping is: " + client.ping);
    } else
    if (command === "foo") {
        message.channel.send("bar!");
    } else
    if (command === "asl") {
        let age = args[0];
        let sex = args[1];
        let location = args[2];
        message.channel.send("Hello " + message.author.username + ", I see you're a " + age + " year old " + sex + " from " + location + " . Wanna date?");
    } else
    if (command === "noob") {
        message.channel.send(args.join(" ") + " is noob.");
    }
});


client.login(config.token);