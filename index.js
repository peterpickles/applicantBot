console.log('Bot starting!');
var Twit = require("twit");
var config = require('./config.js');
var T = new Twit(config);
var stream = T.stream('user');
// var question = require('./question.js');

var questions = [
    "what is the answer to life?",
    "what makes you special?",
    "tell me about yourself",
    "tell me about your alter-ego?",
    "tell me about a time where you worked with a difficult person and how you dealt with it",
    "what is the most recent project you have done?",
    "let off some steam",
    "dead tired?"
]
var answers = [
    "42",
    "I stay up to date on current tech, work until the job gets done, integrate well team sizes, all while being on time for supper everynight!", 
    "I am an adopted son of the PNW with a PM for tech startups.  My passion is building great life style apps using the latest tech",
    "I'm the red power ranger and can call upon a megazord to destroy my enemies",
    "Oh my, that will take a little more than 142 characters, checkout my answer here:http://bit.ly/2oldpWs",
    "glad you asked! I love automating processes, I made a node.js/express/twitter API app.  Check it out here:http://bit.ly/2ELIFYW",
    "Bennet! https://youtu.be/t-tRErs5UcI",
    "Don't wake him... https://youtu.be/kR9CdLV0xzU"
]


function tweetIt(txt){
    var tweet = {
        status: txt
    }
    T.post('statuses/update', tweet, tweeted);
    console.log("sending", txt)
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
            tweetIt("@"+from+" "+answers[index]);
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



 