const app = {
  board: document.getElementById('board'),
  player: {
    x: 0,
    y: 0,
    direction: 'right'
  },
  targetCell: {
    x: 5,
    y: 3
  },
  // on crée un sous object maison dans le quel on va indiquer :
  //- en nom de propriété, la direction courante de notre joueur
  //- en valeur de propriété, la nouvelle direction quand le joueur aura tourné à guache
  toTheLeft: {
    right: 'up',
    up: 'left',
    left: 'down',
    down: 'right'
  },
  toTheRight: {
    right: 'down',
    down: 'left',
    left: 'up',
    up: 'right'  
  },
  gameOver: false,
  nbMoves: 0,
  redrawBoard: () => {
    //on vide la div#board
    app.clearBoard();
    //on redessine la grille à l'intérieur
    app.drawBoard();
  },
  clearBoard: () => {
    //on vide la div#board de son contenu
    board.innerHTML = '';
  },
  drawBoard: () => {
    //on ajoute les 4 div de class row à la board
    for (let y=0; y<4; y++) {
      const line = document.createElement('div');
      line.className = 'row';
      app.board.appendChild(line);

      for (let x=0; x<6; x++) {
        const cell = document.createElement('div');
        cell.className = 'cell';

        /*
          à cet endroit du code, les valeurs contenues dans x et y vont pouvoir servir de coordonnées à chaque cellule en horizontal(x) et en vertival (y)
          1ère cellule : x=0, y=0, 1ère colonne de la la 1ère ligne
          2ème cellule : x=1, y=0, 2ème colonne de la 1ère ligne
          ...
          on peut utiliser ces compteurs de boucle comme coordonnées afin de faire les comparaisons avec les coordonnées de la targetCell (x=5, y=3, 5ème colonne de la 3ème ligne) et du joueur au lancement de l'appli (x=0, y=0, 1ère colonne de la 1ère ligne)

          quand on va modifier les coordonnées du joueur en x ou en y, ce système permettra de simuler le déplacement du joueur dans la grille
        
        */

        //SI mon compteur x est égal à la propriété x de targetCell ET
        //mon compteur y est égal à la propriété y de targetCell
        //ALORS, j'ajoute la class targetCell à ma div cell
        if (x === app.targetCell.x && y === app.targetCell.y) {
          cell.classList.add('targetCell');
        }

        if (x === app.player.x && y === app.player.y) {
          //traitement différent ici, il s'agit de rajouter une div à la cellule en cours
          //on a la ref de cette cellule courante dans la variable cell, c'est celle qu'on vient de fabriquer
          const player = document.createElement('div');
          player.classList.add('player', `player--${app.player.direction}`);
          cell.appendChild(player);
        }


        line.appendChild(cell);
      }
    }
    app.isGameOver();
  },
  turnLeft: () => {

    /*
    à la base, mon player à la direction 'right'
    quand il tourne à gauche, je veux que la direction devienne up
    dans mon object toTheLeft, j'ai une propriété right qui a pour valeur 'up'
    je peux ici me servir de la notation à crochet pour accéder à une propriété de mon object toTheLeft même si je ne connais pas son nom
    En effet, moi humain, j'ai pas l'info MAIS cette info est contenue dans la propriété direction de mon joueur

      nouvelle direction = 'up'
      nouvelle direction = app.toTheLeft.right

      en fait, le right c'est la position courante de mon joueur, la string 'right' est donc dispo en tant que valeur de la propriété app.player.direction

    nouvelle direction = app.toTheLeft['right']
    nouvelle direction app.toTheLeft[app.player.direction]

    */

    //SI gameOver vaut true, je sors de ma méthode
    //SINON j'exécute mon action

    if (app.gameOver === true) { // équivalent à if (app.gameOver)
      return; //return undefined
    }

    //on incrémente le nombre de mouvement
    app.nbMoves++;

    app.player.direction = app.toTheLeft[app.player.direction];

    //on redessine la grille pour obtenir un effet visuel directement en appelant cette méthode
    app.redrawBoard();

    //étudier la direction courante du joueur
    //SI direction vaut right ALORS direction devient up
    // if (app.player.direction === 'right') {
    //   app.player.direction = 'up';
    // }
    // //SINON SI direction vaut up ALORS direction devient left
    // else if (app.player.direction === 'up') {
    //   app.player.direction = 'left';
    // }
    // //SINON SI direction vaut left ALORS direction devient down
    // else if (app.player.direction === 'left') {
    //   app.player.direction = 'down';
    // }
    // //SINON SI direction vaut down ALORS direction devient right
    // else if (app.player.direction === 'down') {
    //   app.player.direction = 'right';
    // }

    // //SELON la valeur de direction
    // switch(app.player.direction) {
    //   //dans le cas où direction vaut right, direction devient up
    //   case 'right': 
    //     app.player.direction = 'up'; 
    //     //on sort du selon
    //     break;
    //   //dans le cas où direction vaut up, direction devient left
    //   case 'up': 
    //     app.player.direction = 'left'; 
    //     //on sort du selon
    //     break;

    //   //dans le cas où direction vaut left, direction devient down
    //   case 'left': 
    //     app.player.direction = 'down'; 
    //     //on sort du selon
    //     break;

    //   //dans le cas où direction vaut down, direction devient right
    //   case 'down': 
    //     app.player.direction = 'right'; 
    //     //on sort du selon
    //     break;
    //   default: break;
    // }
      
  },
  turnRight: () => {
    if (app.gameOver === true) {
      //on utilise return ici non pas pour renvoyer une vraie information au programme, simplement pour sortir de la fonction
      return;
    }

    //on incrémente le nombre de mouvement
    app.nbMoves++;

    app.player.direction = app.toTheRight[app.player.direction];
    app.redrawBoard();

  },

  moveForward: () => {

    if (app.gameOver) { //équivalent à if (app.gameOver === true)
      return;
    }

    //on incrémente le nombre de mouvement
    app.nbMoves++;

    //SELON la direction courante du joueur
      //au cas où elle vaut right
        //on étudie la valeur courante de la coordonnée à changer (x) 
        //SI cette valeur est inférieure au maximum de x (5)
        //ALORS on applique la transformation
        //SINON on interdit le mouvement

    switch(app.player.direction) {
      case 'right':
        if (app.player.x < 5) {
          app.player.x += 1;
        } else {
          console.log('Player au bord du vide, mouvement impossible');
        }
        break;

        case 'left':
          if (app.player.x > 0) {
            app.player.x -= 1;
          } else {
            console.log('Player au bord du vide, mouvement impossible');
          }
          break;

        case 'up':
          if (app.player.y > 0) {
            app.player.y -= 1;
          } else {
            console.log('Player au bord du vide, mouvement impossible');
          }
          break;

        case 'down':
          if (app.player.y < 3) {
            app.player.y += 1;
          } else {
            console.log('Player au bord du vide, mouvement impossible');
          }
          break;
        default: break;
    }

    app.redrawBoard();
  },

  listenKeyboardEvents: () => {
    document.addEventListener('keyup', function(event) {
      //étudier la valeur de la propriété code de l'event
      switch(event.code) {
        // 'ArrowLeft', 'ArrowRight', 'ArrowUp'
        case 'ArrowLeft': 
          app.turnLeft();
          break;
        case 'ArrowRight':
          app.turnRight();
          break;
        case 'ArrowUp':
          app.moveForward();
          break;
        default: break;
      }
    });
  },
  isGameOver: () => {
    //on checke si les coordonnées du player sont égales à celles de la target
    //SI oui, on passe notre gameOver à true et on affiche un message de victoire
    if (app.player.x === app.targetCell.x && app.player.y === app.targetCell.y) {
      app.gameOver = true;
      console.log(`Ayé, j\'ai gagné en ${app.nbMoves} coups !!!`);
    }
  },
  init: () => {
    console.log('init !');
    app.drawBoard();
    app.listenKeyboardEvents();
  }
};

document.addEventListener('DOMContentLoaded', app.init);