const express = require('express');
const router = express.Router();
const game = require('./games.json');
let resultat;
// On créer notre première route ('/')
router.get('/', (req, res) => {
    resultat = "cc";
  res.render('index',  {game : require('./games.json'), resultat: resultat});
  
});

router.get('/game/:name', (req, res, next) => {
    const result = req.params.name;
    resultat = game.find( nom => nom.jsFile === result);
    if (resultat === undefined){
      next()
     } else {
    res.render(resultat.name, {game : require('./games.json'), resultat: resultat,});
     }
});



module.exports = router;
