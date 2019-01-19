exports.run = async (client, message, args, level) => {
  const msg = await message.channel.send("Ping?");
  msg.edit(`Pong! Latency: ${msg.createdTimestamp - message.createdTimestamp}ms. API: ${Math.round(client.ping)}ms`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Accidentals"
};

exports.help = {
  name: "ping",
  category: "System",
  description: "Pings... then pongs!",
  usage: "ping"
};
