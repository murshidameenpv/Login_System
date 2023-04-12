var express = require('express');
var router = express.Router();


const credential = {
    email: "admin@gmail.com",
    password:"admin123"
}

CheckLoggedIn=(req, res, next)=> {
    if (req.session.user) {
        next()
    } else { 
        res.redirect('/')
    }
    //jkg
}

//login user
router.post('/login', (req, res) => {
    if (req.body.email == credential.email && req.body.password == credential.password) {
        req.session.user = req.body.email// creating new session with variable name user,and to that session specify the email
        res.redirect('/route/dashboard')
    } else {
        // res.end("Invalid Username")
        res.render('base',{errMsg:'Invalid user'})
    }
});
//route for dashboard
router.get('/dashboard', CheckLoggedIn,(req, res) => {
        res.render('dashboard',{user:req.session.user})
})
//route for logout
router.get('/logout', (req, res) => {
    req.session.destroy(function (err) {//if we logout we should destroy the session
        if (err) {
            console.log(err);
            res.send("Error")
        } else {
            res.render('base',{title:'Express',logout:"Logout Successfully...!"})
        }
    })
})


module.exports = router;