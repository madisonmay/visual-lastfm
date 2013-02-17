
/*
 * GET users listing.
 */

exports.list = function(req, res){
    res.send("respond with a resource");
};

exports.home = function(req, res){
    console.log("Logged in");
    console.log(req.query);
    res.render('home', {title: 'Visual Last.fm'})
};