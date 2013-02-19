
/*
 * GET home page.
 */

exports.index = function(req, res){
    req.session.token = ''
    res.render('index', { title: 'Visual last.fm', logged_in: true });
};