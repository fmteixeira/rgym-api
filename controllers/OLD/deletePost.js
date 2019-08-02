var { MongoDB } = require("../mongodb");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

module.exports = function(app){
    app.route('/deletePost')
    .post(jsonParser, function (req, res) {
        sess = req.session;
        console.log('=> /deletePost');

        let title = req.body.title;
        console.log('Delete: ', title);

        if (!sess.admin) {
            sess.admin = -1;
            console.log('Not Allowed');
            sess.message = 'Not Allowed';
            res.send({permission: sess.admin, message: sess.message});
        } else if (title == undefined) {
            console.log('No ID submitted');
            sess.message = 'No ID submitted';
            res.send({permission: sess.admin, message: sess.message});
        } else {
            MongoDB.deletePost(title).then(function (result) {
                if (!result){
                    console.log('An error occured');
                    sess.message = "An error occured";
                    res.send({permission: sess.admin, message: sess.message});
                } else {
                    console.log('Post Deleted');
                    sess.message = 'Post Deleted';
                    res.send({permission: sess.admin, message: sess.message});
                }
            });
        }
    });
}