var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/demojsdb', function (err) {
    if(!err){
        console.log("Connect to DB success");
    }
    else{
        console.log("Connect to DB Failed");
    }

});

exports.Article = require('./Article');
exports.User = require('./User');
