exports.run = (client, message, args) => {
    message.channel.send("You rolled: " + (Math.floor(Math.random() * 6) + 1));
}