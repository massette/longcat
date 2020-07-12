exports.info         = {};
exports.info.name    = "Config";
exports.info.type    = "Utility";
exports.info.blurb   = "View and set user specific settings";
exports.info.desc    = "`{0}`: Doesn't do anything yet."

exports.info.aliases = ["set"]

exports.dms        = true;


exports.run = function(guildconfig,userconfig,client,message,args) {
	message.channel.send("Did thing.");

	guildconfig.prefix = "--";
	client.setGuildConfig.run(guildconfig);
}