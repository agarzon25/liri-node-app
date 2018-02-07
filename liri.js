require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');

// Not working
var spotify = new Spotify(keys.spotify);
var request = require("request");
var client = new Twitter(keys.twitter);
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
	spotify.search({type: 'track', query: `${arg2}`}, (err, data) => {
		if (err) {
			console.log(err) 
		}
		console.log(data)
	})
}

function movieThis() {

	// request call to omdb api
	request(`http://www.omdbapi.com/?t=${arg2}&y=&plot=short&apikey=trilogy`, (err, response, data) => {
		if (!err && response.statusCode === 200) {
			console.log("")
			console.log("====================Movie Facts=======================")
			console.log("The Title of the movie is " + JSON.parse(data).Title);
			console.log("This move came out in " + JSON.parse(data).Released);
			console.log("IMDB rates this move a " + JSON.parse(data).imdbRating);
			// variable to get rotten tomatoes rating
			var ratings = JSON.parse(data).Ratings
			var rt = JSON.stringify(ratings[1].Value)
			
			console.log("Rotten Tomatoes rates this movie at " + rt);
			console.log("This movie was produced in the following country/countries: " + JSON.parse(data).Country);
			console.log("The language of the movie is in " + JSON.parse(data).Language);
			console.log("Here's the plot: " + JSON.parse(data).Plot);
			console.log("The actors in this movei: " + JSON.parse(data).Actors);
			console.log("======================================================")
		}
	})
}

switch (arg1) {
	case 'my-tweets':
		myTweets();
		break;
	case 'spotify-this-song':
		spotifyThis()
		break;
	case 'movie-this':
		movieThis();
		break;
	case 'do-what-it-says':
		//do()
		console.log("do");
		break;
}
