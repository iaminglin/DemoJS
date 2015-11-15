
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title:String,
    body:String,
    createTime:{type:Date,default:Date.now()},
    updateTime:{type:Date,default:Date.now()}
});

var Article = mongoose.model('Article',articleSchema);

module.exports = Article;