
//awaitReply function
client.awaitReply = async (message, question, limit = 60000) => {
  const filter = m => m.author.id === message.author.id;
  await message.channel.send(question);
  try {
    const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
    return collected.first().content;
  } catch (e) {
    return false;
  }
};
//tidy's up code blocks, resolves promises and stringifies objects
client.clean = async (client, text) => {
  if (text && text.constructor.name == "Promise")
    text = await text;
  if (typeof evaled !== "string")
    text = require("util").inspect(text, {depth: 1});

  text = text
    .replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203))
    .replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");

  return text;
};
//command handling
client.loadCommand = (commandName) => {
   try {
     client.logger.log(`Loading Command: ${commandName}`);
     const props = require(`../commands/${commandName}`);
     if (props.init) {
       props.init(client);
     }
     client.commands.set(props.help.name, props);
     props.conf.aliases.forEach(alias => {
       client.aliases.set(alias, props.help.name);
     });
     return false;
   } catch (e) {
     return `Unable to load command ${commandName}: ${e}`;
   }
 };

 client.unloadCommand = async (commandName) => {
   let command;
   if (client.commands.has(commandName)) {
     command = client.commands.get(commandName);
   } else if (client.aliases.has(commandName)) {
     command = client.commands.get(client.aliases.get(commandName));
   }
   if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;

   if (command.shutdown) {
     await command.shutdown(client);
   }
   const mod = require.cache[require.resolve(`../commands/${commandName}`)];
   delete require.cache[require.resolve(`../commands/${commandName}.js`)];
   for (let i = 0; i < mod.parent.children.length; i++) {
     if (mod.parent.children[i] === mod) {
       mod.parent.children.splice(i, 1);
       break;
     }
   }
   return false;
};
