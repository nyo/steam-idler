var steamUser = require("steam-user");
var moment = require("moment");
var fs = require("fs");
var colors = require("colors");

function log(message) {
	moment.locale("fr");
	var log = "[ " + moment().format("L LTS").yellow + " ] " + message.grey;
	console.log(log);
	fs.appendFileSync("account.log", log + "\n");
}

var steamClient = function(config) {
	var client  = new steamUser({ dataDirectory: "./steam_data" });
	client.username = config.username;
	client.password = config.password;
	client.games = config.games;

	client.doStart = function() {
		log(`Logging in as ${this.username}:${"*".repeat(this.password.length)}`);
		this.logOn({ accountName: this.username, password: this.password });
	};

	client.on("loggedOn", function(details) {
		log(`Logged into Steam as /id/${client.vanityURL}`);
		client.setPersona(steamUser.EPersonaState.Online);
		if (this.games) {
			client.gamesPlayed(this.games, true); // if playing a game elsewhere, kick other session first
			if (this.games) {
				log("Successfuly idling following games:");
				this.games.forEach(function(game) {
					log(`- ${game["game_extra_info"]}`);
				});
			}
		}
	});

	client.on("error", function(err) {
		log(err);
		setTimeout(function() { client.doStart(); }, 30*60*1000); // waits 30 minutes & tries to reconnect
	});

	client.on("friendTyping", function(senderID) {
		client.getPersonas([senderID], function(personas) {
			var persona = personas[senderID];
			var name = persona ? persona.player_name : senderID;
			log(`${name} (${senderID.getSteam2RenderedID()}) is typing...`);
		});
	});

	client.on("friendMessage", function(senderID, message) {
		client.getPersonas([senderID], function(personas) {
			var persona = personas[senderID];
			var name = persona ? persona.player_name : senderID;
			log(`${name} (${senderID.getSteam2RenderedID()}): ${message}`);
		});
	});

	client.on("friendRelationship", function(sid, relationship) {
		client.getPersonas([sid], function(personas) {
			var persona = personas[sid];
			var name = persona ? persona.player_name : sid;
			log(`New relationship with ${name} (${sid.getSteam2RenderedID()}): ${steamUser.EFriendRelationship[relationship]}.grey`);
		});
	});

	return client;
}

module.exports = steamClient;
