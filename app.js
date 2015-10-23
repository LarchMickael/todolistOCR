var express = require('express');
var session = require('cookie-session');
var bodyparser = require('body-parser');
var urlencodedparser = bodyparser.urlencoded({extended: false});
var path = require('path');
var fs = require('fs');


var app = express();

var dicoFr;

//Paramêtrage du serveur
app.set('views', path.join(__dirname, 'public/views'));
app.use(express.static(path.join(__dirname, 'public')));

//Création d'une session
app.use(session({secret: 'todolistsecured'}));

//Initialisation de la session si nécessaire
app.use(function(req, res, next) {
    if (typeof(req.session.todolist) == 'undefined'){
        req.session.todolist = [];
    }
    next();
});

//Route principale /todo
app.get('/todo', function(req, res){
    dicoFr = JSON.parse(fs.readFileSync('public/Textes/texte.json', 'utf8'));
    res.render('todo.ejs', {todolist: req.session.todolist, dico: dicoFr});
});

/*Route pour l'ajout /todo/ajouter: on ajoute le contenu de newtodo (cf todo.ejs)
dans le tableau todolist si newtodo n'est pas vide*/
app.post('/todo/ajouter', urlencodedparser, function(req, res) {
    if (req.body.newtodo != ''){
        req.session.todolist.push(req.body.newtodo);
        res.redirect('/todo');
    }
});

/*Route pour la suppression d'une ligne de la todolist : /todo/supprimer/:id
selon l'index reçu dans l'adresse, on splice la ligne de la todolist[] correspondante*/
app.get('/todo/supprimer/:id', function(req, res){
    if (req.params.id != ''){
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
});

app.use(function(req, res, next){
    res.redirect('/todo');
});

app.listen(8080);