exports.name = "ready"

exports.run = function(config,client) {
	console.log("Logged in as: " + (client.user.tag))
}