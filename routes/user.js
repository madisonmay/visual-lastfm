
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
                res.redirect('artists');
            },
            error: function(error) {
                console.log("Error: " + error.message);
            }
        }
    });
}

exports.artists = function(req, res){
    var query = "user.getTopArtists";
    var label = "Artists";
    var querystring = "data.topartists.artist";
    return getData(req, res, query, label, querystring);
};

exports.albums = function(req, res){
    var query = "user.getTopAlbums";
    var label = "Albums";
    var querystring = "data.topalbums.album";
    return getData(req, res, query, label, querystring);
};

exports.songs = function(req, res){
    var query = "user.getTopTracks";
    var label = "Songs";
    var querystring = "data.toptracks.track";
    return getData(req, res, query, label, querystring);
};


function getData(req, res, query, label, querystring){
    var request = lastfm.request(query, {
        user: req.session.user.user,
        handlers: {
            success: function(data) {
                var topartists = eval(querystring);
                var artists = Array();
                var counts = Array();
                var names = Array();
                for (i=0; i<topartists.length; i++) {
                    artists.push([topartists[i].name, topartists[i].playcount]);
                    counts.push([topartists[i].playcount]);
                    a = topartists[i].name;
                    a = a.replace(/'/g, "\\'").replace(/&/g, "and");
                    names.push(["\'" + a + "\'"]);
                }
                console.log(artists);
                req.session.artists = topartists;
                res.render('home', {title: 'Visual last.fm', counts: counts, names: names, label: label, logged_in: true});
            },
            error: function(error) {
                console.log("Error: " + error.message);
            }
        }
    });
}
