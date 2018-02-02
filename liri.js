require("dotenv").config();
var Spotify = require("twitter")
var Twitter = require("spotify")

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var arg1 = process.argv[2];
var arg2 = process.argv[3];

switch (arg1) {
	case 'my-tweets':
		//myTweets()
		console.log("twitter")
		break;
	case 'spotify-this-song':
		//spotifyThis()
		console.log("spotify")
		break;
	case 'movie-this':
		//movieThis()
		console.log("movie-this")
		break;
	case 'do-what-it-says':
		//do()
		console.log("do")
		break;
}
