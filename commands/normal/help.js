exports.run = (client, message, args) => {
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
}