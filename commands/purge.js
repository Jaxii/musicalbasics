exports.run = (client, message) => {

  // variables
  const config = require("./config.json");
  const args = message.content.split(" ").slice(1);

  // error message
  const embed = {
  "title": "Command usage.",
  "description": "Insufficient data: `\nusage: .purge {number of messages}`",
  "color": 65423
  };

  if (message.content.startsWith(config.prefix + "purge")) {
    if(!message.member.roles.has(devRoleID)) return; // role check [developer only ATM]

    async function purge() {
      message.delete();

      // if command does not recieve required fields.
      if (isNaN(args[0])) {
        message.channel.send({embed});
        return;
      }
      // fetch messages
      const wiadomosc = await message.channel.fetchMessages({limit: args[0]});

      // deleted the messages once fetched
      message.channel.bulkDelete(wiadomosc);
        .catch(error => message.channel.send('$(error)'));
    }
    purge();
  }

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: ["Bot Owner", "Bot Dev", "Bot Admin", "Concetmasters", "Conductors"]
};

exports.help = {
  name: "purge",
  category: "System",
  description: "Removes messages from a channel",
  usage: "purge [amount]"
};
