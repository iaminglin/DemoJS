var express = require('express');
var router = express.Router();
var validator = require('validator');
var uid = require('shortid');
var Article = require('../model/Common').Article;

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(req.session.user){
        Article.find({}, function (err,data) {
             res.render('article/index',{articles:data})
        })

    }else{
        res.render('login');
    }


});

router.get('/create', function (req, res, next) {

    if(req.session.user){
        res.render('article/create');
    }else{
        res.render('login');
    }
});
router.post('/create',function(req,res,next){
    if(req.session.user){
        var title = req.body.title;
        var body =  req.body.body;
        var article = new Article({
            title:title,
            body:body
        });
        article.save();
        res.redirect('/articles');
    }else{
        res.render('login');
    }

})
module.exports = router;
