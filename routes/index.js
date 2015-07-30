var SC = require('node-soundcloud');
/*
 * GET home page.
 */

module.exports = function(app){
  var client_id = '6dd116d5567e5df8d3dd3676ec12ba9c';
  var client_secret = '09c538a8f51f9c58454f391a2825ab64';
  var callback_uri = 'http://localhost:3000/callback';

  SC.init({
    id: client_id,
    secret: client_secret,
    uri: callback_uri
  });

  // Connect user to authorize application
  app.get('/', function(req, res) {
    var url = SC.getConnectUrl();
    console.log(url)
    res.writeHead(301, {Location: url});
    res.end();
  });

  app.get('/callback', function(req, res) {
    var code = req.query.code;
    SC.authorize(code, function(err, accessToken) {
      if ( err ) {
        throw err;
      } else {
        res.redirect('/authorized')
        console.log('access token:', accessToken);
      }
      });
  });

  app.get('/authorized', function(req,res){
    SC.get('/tracks/164497989', function(err, track) {
      if ( err ) {
        throw err;
      } else {
        // console.log('track retrieved:', track);
        res.send(track)
      }
    });
  })
  // Get OAuth token (example endpoint discussed in the next section)

  // app.get('/', function(req,res){
  //   res.render('index', { title: 'Express' });
  // })
};