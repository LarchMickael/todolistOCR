var express = require('express');
var ejs = require('ejs');
var session = require('cookie-session');
var bodyparser = require('body-parser');
var urlencodedparser = bodyparser.urlencoded({extended: false});

var app = express();

//Création d'une session
app.use(session({secret: 'todolistsecured'}))

//Initialisation de la session si nécessaire
.use(function(req, res, next) {
    if (typeof(req.session.todolist) == undefined){
        req.session.todolist = [];
    }
    next();
})
