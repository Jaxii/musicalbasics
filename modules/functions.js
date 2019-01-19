
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
