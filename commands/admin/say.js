exports.run = (client, message, args) => {
    let text = args.join(" ");
    if (text) {
        message.channel.send(text);
    }
    message.delete();
}