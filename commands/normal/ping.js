exports.run = (client, message, args) => {
    message.channel.send("Current bot ping is: " + client.ping);
}