
const express = require('express');
const routes = require('./routes');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.set ("views" , './views')

const game = require('./games.json');


// METTRE LE STATIC AVANT LES ROUTES
app.use(function(req, res, next) {
  console.log(new Date().toISOString());
  console.log (req.ip);
  console.log(req.url)
  next()
});

app.use(express.static('public'));

app.use(routes);

app.use(function(req, res, next) {
  console.log(new Date().toISOString());
  console.log (req.ip);
  const result = req.params.name;
    let resultat = game.find( nom => nom.jsFile === result);
    if (resultat === undefined){
        res.status(404).render('perdu',  {game : require('./games.json'), resultat: resultat});
  
}});

// On lance notre serveur sur le port défini plus haut
app.listen(port, () => {
  console.log(`${port}`)
})
