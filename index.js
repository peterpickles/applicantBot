console.log('It is rising!');
var Twit = require("twit");
var config = require('./config');
var T = new Twit(config);

//get requests - search by hashtag, location, user
//post request - Tweeting about thing
//stream --contineous user @mention  use that and get back
var params = { 
    q: 'rainbow', 
    count: 2
}

T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
    var tweets = data.statuses;
    for (var i = 0; i <tweets.length; i++) {
        console.log(tweets[i].text);
    }
}; 