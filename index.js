console.log('Bot starting!');
var Twit = require("twit");
var config = require('./config.js');
var T = new Twit(config);
var stream = T.stream('user');
var question = require('./question.js');



function tweetIt(txt){
    var tweet = {
        status: txt
    }
    T.post('statuses/update', tweet, tweeted);
    function tweeted(err, data, response) {
        if (err){
            console.log("Something went wrong", err);
        } else {
            console.log("It worked!");
        }
    }
}


stream.on('tweet', tweetEvent);
function tweetEvent(tweet) {
    var replyto = tweet.in_reply_to_screen_name;
    var from = tweet.user.screen_name;
    var text = tweet.text;
    console.log("Tweet Object ", tweet);
    questions.forEach(function(question, index){
        if(text.includes(question)){
            tweetIt('@'+ from + answers[index]);
        }
        
    })
        
    //while someone is tweeting at me
    //if they say "What's the weather today?"
    //I will say "rainy!"
}


stream.on('follow', followed);
function followed(tweet) {
    var name = tweet.source.name;
    var screenName = tweet.source.screen_name;
    console.log("the screename is ", screenName);
    tweetIt('@' + screenName + ' How you doinnnnn!');
}



 