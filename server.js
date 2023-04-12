const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const session = require("express-session");
const { v4:uuidv4 } = require("uuid");//to create random hash code for session id
const router = require('./router')
const nocache = require('nocache');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(nocache());
app.use(bodyParser.json());//body parser is a middleware responsible for parsing incoming request bodies
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
    secret: uuidv4(),//eg: dhfd-73fd fdff33-fd djdfj4-7d 
    resave: false,
    saveUninitialized: true
}));
app.use('/route', router);


//load static assets
app.use('/static', express.static(path.join(__dirname, 'public')));

//home route
app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/route/dashboard')
    } else {
        res.render('base',{title:"Login System"})
    }
})


app.listen(port, () => { console.log("Listening to the server on http://localhost:3000"); });       