exports.run = (client, message, args, sql) => {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
        if (!row) return message.reply("Your current level is 0");
        message.reply(`Your current level is ${row.level}`);
    });
}