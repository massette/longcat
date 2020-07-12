exports.name = "ready"

exports.run = function(sql,client) {
	const userconfig = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'userconfig';").get();
	if (!userconfig["count(*)"]) {
		sql.prepare("CREATE TABLE userconfig (id VARCHAR(255) PRIMARY KEY, noembed BOOL DEFAULT FALSE);").run();
		sql.prepare("CREATE INDEX idx_userconfig_id ON userconfig(id);").run();

		sql.pragma("synchronous = 1");
		sql.pragma("journal_mode = wal");
	}

	const guildconfig = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'guildconfig';").get();
	if (!guildconfig["count(*)"]) {
		sql.prepare("CREATE TABLE guildconfig (id VARCHAR(255) PRIMARY KEY, prefix VARCHAR(5) DEFAULT '@:', noembed BOOL DEFAULT FALSE);").run();
		sql.prepare("CREATE INDEX idx_guildconfig_id ON guildconfig(id);").run();

		sql.pragma("synchronous = 1");
		sql.pragma("journal_mode = wal");
	}

	client.getUserConfig = sql.prepare("SELECT * FROM userconfig WHERE id=?;")
	client.setUserConfig = sql.prepare("INSERT OR REPLACE INTO userconfig (id, noembed) VALUES (@id, @noembed);")

	client.getGuildConfig = sql.prepare("SELECT * FROM guildconfig WHERE id=?;")
	client.setGuildConfig = sql.prepare("INSERT OR REPLACE INTO guildconfig (id, prefix, noembed) VALUES (@id, @prefix, @noembed);")

	console.log("Logged in as: " + (client.user.tag))
}