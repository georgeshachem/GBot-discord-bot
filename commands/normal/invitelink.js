exports.run = (client, message, args) => {
    message.channel.send({
        embed: {
            color: 16772096,
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
            },
            title: "GBot Invitation Menu",
            url: "https://github.com/georgeshachem",
            description: "Click [here](https://discordapp.com/api/oauth2/authorize?client_id=419477388691374090&permissions=8&scope=bot) to invite me to your server. ```\nStill in beta testing!```",
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: "© Georges8431"
            }
        }
    });
}