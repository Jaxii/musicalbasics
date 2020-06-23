module.exports = (client, message) => {
  // Ignore all bots
  if (message.author.bot) return;

  if (message.content.indexOf(client.config.prefix) !== 0) return;

  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  //grab command data from commands Enmap
  const cmd = client.commands.get(command);

//if no command, silently exit
  if (!cmd) return;

  // Run command
  cmd.run(client, message, args);
};
