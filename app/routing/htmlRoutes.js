// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------
  // Path example of joining an absolute and a relative path!
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  // If no matching route is found default to home
  // Note: This route path will match abcd, abxcd, abRANDOMcd, ab123cd, and so on.
  // app.get('/ab*cd', function (req, res) {
  //   res.send('ab*cd')
  // })
  //thus the star is a placeholder for the wild card - anything goes
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../app/public/home.html"));
  });
};