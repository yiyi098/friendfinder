// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the friends array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // req.body is available since we're using the body-parser middleware
    friends.push(req.body);


    var newUser = friends.slice(-1)[0];

    var matchingFriend = {};

    var newUserScore = 0;

    for (var i = 0; i < newUser.scores.length; i++) {
      newUserScore += parseInt(newUser.scores[i]);
    }

    // console.log('New User Score: ' + newUserScore);


    //logic to find the Match//
    var matchingDiff = 99999999;
    var diff = 0;
    var score = 0;

    for (var i = 0; i < friends.length - 1; i++) {
      for (var j = 0; j < friends[i].scores.length; j++) {
        score += parseInt(friends[i].scores[j]);
        // console.log('score: ' + score);
      }
      diff = Math.abs(score - newUserScore);
      // console.log('diff: ' + diff);
      if (diff < matchingDiff) {
        matchingDiff = diff;
        matchingFriend = friends[i];
        score = 0;
        // console.log(matchingFriend);
      } else {
        score = 0;
      }
    }
    res.json(matchingFriend);
  });
};