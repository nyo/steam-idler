const steamClient = require("./client.js");

const config = {};
config.username = "username";
config.password = "password";
config.games = [{
	"game_id": "730",
	"game_extra_info": "Counter-Strike: Global Offensive"
}];
// config.games = null; // uncomment this if you don't want the account to play any game

process.stdout.write("\033c"); // clear terminal before the client starts
const client = steamClient(config);
client.doStart();
