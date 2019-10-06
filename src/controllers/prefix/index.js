const fs = require("fs");
const path = require("path");
const prefixController = async message => {
    const args = message.content.split(' ');
    if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("Insufficient Permissions");
    if(!args[1]) return message.reply("Thats not a valid prefix you got there mate.");
    let settings = JSON.parse(fs.readFileSync(path.join(__dirname, "../../config/prefixconfig.json"), "utf8"));
    settings[message.guild.id] = {
        prefix: args[1]
    };
    fs.writeFile(path.join(__dirname, "../../config/prefixconfig.json"), JSON.stringify(settings), (err) => {
        if (err) console.log(err);
    });
    message.channel.send("Prefix set!");
}
module.exports = prefixController;