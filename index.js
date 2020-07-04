const DISCORD = require("discord.js");
const client  = new DISCORD.Client();

client.on("ready", function() {
	console.log("Logged in as " + (client.user) + "!")
});