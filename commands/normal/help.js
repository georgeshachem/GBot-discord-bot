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
            description: "Click [here](https://github.com/georgeshachem) for more information. ```\nStill in beta testing! More features to come!```",
            fields: [{
                    name: "🤔Normal Commands",
                    value: "ping | chucknorris | dice | invitelink | noob"
                },
                {
                    "name": "😱Admin Commands - not activated yet",
                    "value": "prefix | say"
                },
                {
                    "name": "🙄Points System",
                    "value": "points | level"
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