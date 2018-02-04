require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');

// Not working
//var spotify = Spotify(keys.spotify);
var client = Twitter(keys.twitter);
var arg1 = process.argv[2];
var arg2 = process.argv[3];


// Twitter function to retrieve last 20 mentions on user timeline
function myTweets() {
	client.get('statuses/mentions_timeline', (error,tweets,response) => {
		
		// IF loop to catch error message
		if (!error) {

			// run a for-in loop through the tweets object
			// and display each object element separated with a line at the bottom
			console.log("-------------------------------------------------My Tweets!----------------------------------------------------")
			for (var prop in tweets) {
				console.log(tweets[prop])
				console.log("-----------------------------------------------------------------------------------------------------------")
			}

		// console log error if caught
		} else {
			console.log(error)
		}
	})
}

function spotifyThis() {
	spotify.search({type: 'type', query: arg2}, (err, data) => {
		if (!err) {
			console.log(data) 
		}
	})
}

switch (arg1) {
	case 'my-tweets':
		myTweets();
		break;
	case 'spotify-this-song':
		spotifyThis()
		console.log("spotify");
		break;
	case 'movie-this':
		//movieThis()
		console.log("movie-this");
		break;
	case 'do-what-it-says':
		//do()
		console.log("do");
		break;
}
