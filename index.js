const config  = require("./config.json");

const DISCORD = require("discord.js");
const FS      = require("fs");
const SQLITE  = require("better-sqlite3");

const client  = new DISCORD.Client();
const sql     = new SQLITE("./data.sqlite");

let commands = {};
commands.types = [];


FS.readdir("./commands/", function(err,files) {
	if (err) return console.error(err);
	
	files.forEach(function(f) {
		let command = require("./commands/" + f);
		
		if (!commands.types.includes(command.info.type)) { // keep track of what types commands are
			commands[command.info.type] = [];
			commands.types.push(command.info.type);
		}
		
		commands[command.info.type].push(command.info.name);
		commands[command.info.name.toLowerCase()] = command;
		
		if (command.info.aliases) {
			command.info.aliases.forEach(function(a) {
				commands[a] = command;
			})
		}
	})
	
	commands.commands = Object.keys(commands);
	
	commands.commands.shift(); // remove "types" from commands
	
	commands.types.forEach(function(t) { // remove everything else that isn't a command
		commands.commands.splice(commands.commands.indexOf(t),1);
	})
})


FS.readdir("./events/", function(err,files) {
	if (err) return console.error(err);
	
	files.forEach(function(f) {
		let event = require("./events/" + f)
		
		if (event.name === "message") client.on(event.name, (...args) => event.run(config,commands,client, ...args));
		else { client.on(event.name, (...args) => event.run(config,client, ...args)); }
	})
})


client.login(process.env.TOKEN)