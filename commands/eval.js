exports.run = async (client, message, args, level) => {
  const code = args.join(" ");
  try {
    const evaled = eval(code);
    const clean = await client.clean(client, evaled);
    message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``);
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
