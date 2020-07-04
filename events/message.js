exports.name = "message"

exports.run = function(config,commands,client,message) {
	if (message.author.bot || message.content.indexOf(config.prefix) !== 0) return;
	
	const args    = message.content.slice(config.prefix.length).trim().split(" ");
	const command = args.shift().toLowerCase();
	
	
	if (command === "help") commands["help"].run(config,commands,client,args);
	else if (commands.keys.includes(command)) commands[command].run(config,client,args);
}