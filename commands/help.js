const DISCORD  = require("discord.js");

exports.info       = {};
exports.info.name  = "Help";
exports.info.type  = "Utility";
exports.info.blurb = "Look up information on commands";
exports.info.desc  = "`{0}`: Shows a list of all commands\n`{0} [command]`: Shows information about how to use a specific command."


function list(ls) {
	let out = "";
	
	if (ls) {
		ls.forEach(function(i){
			out += i + ", ";
		})
	} else { return "None"; }
	
	return out.substr(0,out.length-2);
}



exports.run = function(guildconfig,userconfig,commands,client,message,args) {
	const PREFIX = (process.env.PRODUCTION) ? guildconfig.prefix : "local:";

	if (userconfig.noembed) {// favor server default where user hasnt specified
							 // favor embed where none is specified
		if (args.length && commands[args[0].toLowerCase()]) {
			const cmd = commands[args[0].toLowerCase()]
			message.channel.send("__**HELP:**__ " + cmd.info.name + "\n" + cmd.info.desc.replace(/\{0\}/g,PREFIX + cmd.info.name.toLowerCase()) + "\n\n" + "**Aliases:** " + list(cmd.info.aliases));
		} else {
			let msg = "__**HELP:**__\nUse `" + PREFIX + "help [command]` to get help on a specific command. ex. `" + PREFIX + "help pokedex`\n\n";
			
			commands.types.forEach(function(t){
				msg += "__**" + t + ":**__\n";
				commands[t].forEach(function(cmd){
					msg += "**" + (cmd) + ":** " + (commands[cmd.toLowerCase()].info.blurb) +"\n";
				})
				msg += "\n";
			})
			
			message.channel.send(msg.substr(0,msg.length-2));
		}
	} else {
		if (args.length && commands[args[0].toLowerCase()]) {
			const cmd = commands[args[0].toLowerCase()]
			const embed = new DISCORD.MessageEmbed();
			embed.setTitle("HELP: " + cmd.info.name);
			embed.setAuthor("Longcat", client.user.avatarURL({format: "jpeg", dynamic: true, size: 128}), "https://github.com/massette/longcat");
			embed.setDescription(cmd.info.desc.replace(/\{0\}/g,PREFIX + cmd.info.name.toLowerCase()))
			embed.addField("Aliases",list(cmd.info.aliases))
			embed.setColor("#ffdd00");
			
			embed.setFooter("Made by Name");
			embed.setTimestamp();
			
			message.channel.send(embed);
		} else {
			const embed = new DISCORD.MessageEmbed();
			embed.setTitle("HELP");
			embed.setAuthor("Longcat", client.user.avatarURL({format: "jpeg", dynamic: true, size: 128}), "https://github.com/massette/longcat");
			embed.setDescription("Use `" + PREFIX + "help [command]` to get help on a specific command. ex. `" + PREFIX + "help pokedex`")
			embed.setColor("#ffdd00");
			
			commands.types.forEach(function(t){
				let fstr = "";
				commands[t].forEach(function(cmd){
					fstr += "`" + (PREFIX + commands[cmd.toLowerCase()].info.name.toLowerCase()) + "`: " + (commands[cmd.toLowerCase()].info.blurb) + "\n";
				})
				embed.addField(t,fstr.substr(0,fstr.length-1));
			})
			
			embed.setFooter("Made by Name");
			embed.setTimestamp();
			
			message.channel.send(embed);
		}
	}
}