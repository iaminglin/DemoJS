var express = require('express');
var router = express.Router();
var validator = require('validator');
var uid = require('shortid');
var User = require('../model/Common').User;

/* GET users listing. */
router.get('/', function(req, res, next) {
        var user = req.session.user;
    if(typeof user !== "undefined"){
        res.render('index',{user:user});
    }

});

router.get('/register', function (req, res, next) {
    res.render('register',{Errors:{}});
});

router.post('/register', function (req, res, next) {
    var errors = {};
    var userName = req.body.userName;
    var password = req.body.password;
    var confirm  = req.body.confirm;
    if(!validator.isLength(userName,4,10)){
        errors.userName = "4-10";
    }
    if(!validator.isLength(password,4,10)){
        errors.password = "4-10";
    }
    if(confirm !=password)
    {
        errors.confirm = "consistent";
    }
    if(Object.keys(errors).length>0){
        console.log(errors);
        res.render('register',{Errors:errors});
    }else{
        user = new User({
            userName:userName,
            password:password
        });
        user.save(function(err){
            if(!err){
                res.redirect('/users/list');
            }else{
                res.redirect('/users/register');
            }
        });
    }
})

router.get('/list',function(req,res,next){
    User.find({}, function (err,data) {
        if (!err) {
            res.render('list', {Users: data});
        }
    })

})

router.get('/login', function (req,res,next) {
    res.render('login');
})
router.post('/login', function (req,res, next) {
    var userName = req.body.userName;
    var password = req.body.password;
    User.findOne({userName:userName,password:password}, function (err,data) {
        if(data) {
            req.session.user = data;
            res.redirect('/users');
        } else{
            res.render('login',{isPass:false})
        }
    })

})

router.get('/updatePWD', function (req, res, next) {
    if(req.session.user){
        res.render('updatePWD',{user:req.session.user,error:{}});
    }
    else{
        res.render('login');
    }

});
router.post('/updatePWD', function (req, res, next) {
    if(req.session.user){
        var oldPassword = req.body.oldPassword;
        var password = req.body.password;
        var confirm  =req.body.confirm;
        var error  ={};
        if(req.session.user.password === oldPassword)
        {
            if(!validator.isLength(password,4,10)){
                error = {password:"4-10"};
            }
            if(password !== confirm){
                error = {confirm:"consistent"};
            }
            if(Object.keys(error).length>0){
                res.render('updatePWD',{user:req.session.user,error:error});
            }else{
                User.findOne({_id:req.session.user._id}, function (err,data) {
                    if(!err && data){
                        data.password = password;
                        data.save(function (err) {
                            if(!err) {
                                res.redirect('/users');
                            }else{
                                res.render('updatePWD',{user:req.session.user,error:error});
                            }

                        })
                    }
                })
            }

        }
        else{
            error = {oldPassword:"密码不正确"};
            res.render('updatePWD',{user:req.session.user,error:error});
        }

    }else{
            res.render('login');
        }


})

module.exports = router;
