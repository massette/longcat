exports.name = "message"

exports.run = function(sql,commands,client,message) {
	if (message.author.bot) return;

	let guildconfig = client.getGuildConfig.get(message.guild.id);
	if (!guildconfig) {
		guildconfig = {
			id: message.guild.id,
			prefix: "@:",
			noembed: 0
		}
	}

	const PREFIX = (process.env.PRODUCTION) ? guildconfig.prefix : "local:";
	if (message.content.indexOf(PREFIX) !== 0) return;
	
	const args    = message.content.slice(PREFIX.length).trim().split(" ");
	const command = args.shift().toLowerCase();

	let userconfig = client.getUserConfig.get(message.author.id);
	if (!userconfig) {
		userconfig = {
			id: message.author.id,
			noembed: guildconfig.noembed
		}
	}
	
	if (command === "help") commands["help"].run(guildconfig,userconfig,commands,client,message,args);
	else if (commands.commands.includes(command)) {
		if (message.guild || commands[command].dms) commands[command].run(guidlconfig,userconfig,client,message,args);
	}
}