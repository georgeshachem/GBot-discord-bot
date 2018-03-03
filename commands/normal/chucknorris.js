exports.run = (client, message, args) => {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var req = new XMLHttpRequest();
    req.open('GET', 'http://api.icndb.com/jokes/random', false);
    req.send(null);
    if (req.status == 200) {
        var obj = JSON.parse(req.responseText);
        message.channel.send(obj.value.joke);
    }
}