const config  = require("./config.json")

const DISCORD = require("discord.js");
const FS      = require("fs");

const client  = new DISCORD.Client();

let commands = {}

FS.readdir("./commands/", function(err,files) {
	if (err) return console.error(err);
	
	files.forEach(function(f) {
		let command = require("./commands/" + f)
		
		commands[command.info.name] = command
	})
})

commands.keys = Object.keys(commands)


FS.readdir("./events/", function(err,files) {
	if (err) return console.error(err);
	
	files.forEach(function(f) {
		let event = require("./events/" + f)
		
		if (event.name === "message") client.on(event.name, (...args) => event.run(config,commands,client, ...args));
		else { client.on(event.name, (...args) => event.run(config,client, ...args)); }
	})
})

client.login(process.env.TOKEN)