exports.run = (client, message) => {
  const config = require("./config.json");
  const args = message.content.split(" ").slice(1);

  if (message.content.startsWith(config.prefix + "eval")) {
    if(!message.member.roles.has(devRoleID)) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: ["Bot Owner", "Bot Dev", "Bot Admin"]
};

exports.help = {
  name: "eval",
  category: "System",
  description: "Runs arbitrary javascript",
  usage: "eval [args]"
};
