const DISCORD  = require("discord.js");
const NO_EMBED = false;
// flag should be moved to somewhere where it can be changed per server/user
// favor server default where user hasnt specified
// favor embed where none is specified

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



exports.run = function(config,commands,client,message,args) {
	if (NO_EMBED) {
		if (args.length && commands[args[0].toLowerCase()]) {
			const cmd = commands[args[0].toLowerCase()]
			message.channel.send("__**HELP:**__ " + cmd.info.name + "\n" + cmd.info.desc.replace(/\{0\}/g,config.prefix + cmd.info.name.toLowerCase()) + "\n\n" + "**Aliases:** " + list(cmd.info.aliases));
		} else {
			let msg = "__**HELP:**__\nUse `" + config.prefix + "help [command]` to get help on a specific command. ex. `" + config.prefix + "help pokedex`\n\n";
			
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
			embed.setDescription(cmd.info.desc.replace(/\{0\}/g,config.prefix + cmd.info.name.toLowerCase()))
			embed.addField("Aliases",list(cmd.info.aliases))
			embed.setColor("#ffdd00");
			
			embed.setFooter("Made by Name");
			embed.setTimestamp();
			
			message.channel.send(embed);
		} else {
			const embed = new DISCORD.MessageEmbed();
			embed.setTitle("HELP");
			embed.setAuthor("Longcat", client.user.avatarURL({format: "jpeg", dynamic: true, size: 128}), "https://github.com/massette/longcat");
			embed.setDescription("Use `" + config.prefix + "help [command]` to get help on a specific command. ex. `" + config.prefix + "help pokedex`")
			embed.setColor("#ffdd00");
			
			commands.types.forEach(function(t){
				let fstr = "";
				commands[t].forEach(function(cmd){
					fstr += "`" + (config.prefix + commands[cmd.toLowerCase()].info.name.toLowerCase()) + "`: " + (commands[cmd.toLowerCase()].info.blurb) + "\n";
				})
				embed.addField(t,fstr.substr(0,fstr.length-1));
			})
			
			embed.setFooter("Made by Name");
			embed.setTimestamp();
			
			message.channel.send(embed);
		}
	}
}