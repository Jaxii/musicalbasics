
module.exports = async (client, error) => {
  client.logger.log(`Discord.js error event: \n${JSON.stringify(error)}`, "error");
};
