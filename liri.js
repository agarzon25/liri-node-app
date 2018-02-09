require("dotenv").config();
var fs = require("fs")
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
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


// function to call node-spotify-api 
function spotifyThis(arg) {

	// Using spotify api to search a track
	spotify.search({type: 'track', query: `${arg}`}, (err, data) => {
		// console log error if caught
		if (err) {
			console.log(err) 
		} else {
			
			// parse data object and stringify tracks.items
			var list = JSON.stringify(data.tracks.items)
			console.log("=================================== Top 20 Songs ==================================");	
			
			// separating by track in object array
			for (var song in data.tracks.items) {
				console.log(data.tracks.items[song])
				console.log("===================================================================================")
			}
		}
	})
}

function movieThis(arg) {

	// request call to omdb api
	request(`http://www.omdbapi.com/?t=${arg}&y=&plot=short&apikey=trilogy`, (err, response, data) => {
		if (!err && response.statusCode === 200) {
			console.log("")
			console.log("================================== Movie Facts =====================================")
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
			console.log("The actors in this movie: " + JSON.parse(data).Actors);
			console.log("===================================================================================")
		}
	})
}

// function to read from random.txt

function doThis() {

	// reading random.txt from filesystem (fs)
	fs.readFile("random.txt", "utf8", function(error,data) {
		// if error is caught console log it
		if (error) {
			console.log(error);
		}
		// create an array from the data split by ','
		var dataArr = data.split(',');

		// use first string in array to call switchstate
		switchstate(dataArr[0]);
	})
}

// function for switch statement

function switchstate(arg) {

	switch (arg) {
	
		case 'my-tweets':
			myTweets();
			break;
		case 'spotify-this-song':
			spotifyThis(arg2)
			break;
		case 'movie-this':
			if (!arg2) {
				arg2 = "Mr. Nobody"
			}
			movieThis(arg2);
			break;
		case 'do-what-it-says':
			doThis();
			break;
	}
}


// Main

switchstate(arg1)