
/*
 * GET users listing.
 */

var LastFmNode = require('lastfm').LastFmNode;
var lastfm = new LastFmNode({
  api_key: '1713b5c9376c897dfa50a9a3ec2be3bf',
  secret: '9f5b5df6fdc3caee40581ba5561685a5'
});

exports.list = function(req, res){
    res.send("respond with a resource");
};

exports.login = function(req, res){
    var token = req.query.token;
    var key = "1713b5c9376c897dfa50a9a3ec2be3bf";
    var session = lastfm.session();
    session.authorise(token, {
        handlers: {
            authorised: function(session) {
                console.log("Logged in: ", token);
                console.log("Session: ", session);
                req.session.token = token;
                req.session.user = session;
                auth(session, req, res);
            }
         }
    });
};

function auth(session, req, res){
    var request = lastfm.request("user.getTopArtists", {
        user: session.user,
        handlers: {
            success: function(data) {
                var topartists = data.topartists.artist;
                var artists = Array();
                var counts = Array();
                var names = Array();
                for (i=0; i<topartists.length; i++) {
                    artists.push([topartists[i].name, topartists[i].playcount])
                    counts.push([topartists[i].playcount]);
                    a = topartists[i].name;
                    a = a.replace(/'/g, "\\'").replace(/&/g, "and");
                    names.push(["\'" + a + "\'"]);
                }
                console.log(artists);
                req.session.artists = topartists;
                res.render('home', {title: 'Visual Last.fm', artists: artists, counts: counts, names: names});
            },
            error: function(error) {
                console.log("Error: " + error.message);
            }
        }
    });
}