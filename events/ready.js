module.exports = async client => {
  client.logger.log(`Online`, "ready");
  client.user.setActivity(`test`, {type: "PLAYING"});
};
