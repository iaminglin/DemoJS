var express = require('express');
var router = express.Router();
var validator = require('validator');
var uid = require('shortid');

var users = [];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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
        var id = uid();
        var user = {
            id:id,
            userName:userName,
            password:password
        }
        users.push(user);
        res.redirect('/users/list');
    }
})

router.get('/list',function(req,res,next){
    res.render('list',{Users:users});
})

module.exports = router;
