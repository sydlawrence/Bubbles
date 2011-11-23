
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);








// twitter-node does not modify GLOBAL, that's so rude
var TwitterNode = require('twitter-node').TwitterNode
  , sys         = require('util')

// you can pass args to create() or set them on the TwitterNode instance
var twit = new TwitterNode({
  user: 'sydlawrence', 
  password: 'amain.lacquer85',
  host: 'syddev.com',         // proxy server name or ip addr
  port: 3000,							   // proxy port!
  track: ['baseball', 'football'],         // sports!
  follow: [12345, 67890],                  // follow these random users
  locations: [-122.75, 36.8, -121.75, 37.8] // tweets in SF
});

// adds to the track array set above
twit.track('foosball');

// adds to the following array set above
twit.follow(2345);

// follow tweets from NYC
twit.location(-74, 40, -73, 41)

// http://apiwiki.twitter.com/Streaming-API-Documentation#QueryParameters
twit.params['count'] = 100;

// http://apiwiki.twitter.com/Streaming-API-Documentation#Methods
twit.action = 'sample'; // 'filter' is default

twit.headers['User-Agent'] = 'whatever';



// Make sure you listen for errors, otherwise
// they are thrown
twit.addListener('error', function(error) {
  console.log(error.message);
});



twit
  .addListener('tweet', function(tweet) {
    sys.puts("@" + tweet.user.screen_name + ": " + tweet.text);
  })

  .addListener('limit', function(limit) {
    sys.puts("LIMIT: " + sys.inspect(limit));
  })

  .addListener('delete', function(del) {
    sys.puts("DELETE: " + sys.inspect(del));
  })

  .addListener('end', function(resp) {
    sys.puts("wave goodbye... " + resp.statusCode);
  })

//  .stream();
function run() {
  twit.stream();
}

run();

