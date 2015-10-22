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

//Route principale /todo
.get('/todo', function(req, res){
    res.render('public/views/todo.ejs', {todolist: req.session.todolist});
})

/*Route pour l'ajout /todo/add: on ajoute le contenu de newtodo (cf todo.ejs)
dans le tableau todolist si newtodo n'est pas vide*/
.post('/todo/ajouter', urlencodedparser, function(req, res) {
    if (req.body.newtodo != ''){
        req.session.todolist.push(req.body.newtodo);
        res.redirect('/todo');
    }
})
;