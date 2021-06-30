const game ={
    values: ['Pierre', 'Feuille', 'Ciseau'],
    score: {
        player: 0,
        machine: 0
    },

    reset: () => {
        player = 0;
        machine = 0;
    },
    play:(playerValue)=> {
        const player = document.getElementById('player');
        const imgDiv = document.createElement("img");
            imgDiv.setAttribute("class", "choix_image");
            

            const h1 = document.createElement("h1"); 
            h1.textContent ="Votre choix";
            const h1Comp = document.createElement("h1");
            h1Comp.textContent ="Choix de l\'ordinateur ";
            const computer = document.getElementById('computer');
            const computerImg = document.createElement("img");
            computerImg.setAttribute("class", "choix_image");
            

        const newDiv = document.createElement("div");
        newDiv.setAttribute("id", "resultat");
           newDiv.textContent = "";
            document.body.appendChild(newDiv);



            
        document.querySelector("#btn_tag").addEventListener("click", function(event) {
            let choixUser = event.target.defaultValue;
            event.preventDefault();
            player.appendChild(h1);
            computer.appendChild(h1Comp);
            player.appendChild(imgDiv);
            computer.appendChild(computerImg);

            let letChoixMachine = Math.round(Math.random() * (3 - 1));
            let choixMachine = (game.values[letChoixMachine]);
            console.log (choixMachine);
            
            if (choixMachine === game.values[0] && choixUser === "Feuille" ||
            choixMachine === game.values[1] && choixUser === "Ciseau" || 
            choixMachine === game.values[2] && choixUser === "Pierre" )  {
                newDiv.textContent = `Vous avez choisi ${choixUser} et l'ordinateur a choisi : ${choixMachine} et vous avez donc gagné.`;
                imgDiv.setAttribute("src", `/images/${choixUser}.jpg`);
                computerImg.setAttribute("src", `/images/${choixMachine}.jpg`);
            } else if (choixMachine === game.values[1] && choixUser === "Feuille" ||
            choixMachine === game.values[0] && choixUser === "Pierre" ||
            choixMachine === game.values[2] && choixUser === "Ciseau" ) {
                newDiv.textContent = `Vous avez choisi ${choixUser} et l'ordinateur a choisi : ${choixMachine} et vous avez donc fait égalité.`;
                imgDiv.setAttribute("src", `/images/${choixUser}.jpg`);
                computerImg.setAttribute("src", `/images/${choixMachine}.jpg`);

            } else if (choixMachine === game.values[2] && choixUser === "Feuille" ||
            choixMachine === game.values[0] && choixUser === "Ciseau" ||
            choixMachine === game.values[1] && choixUser === "Pierre")
            {
               newDiv.textContent = `Vous avez choisi ${choixUser} et l'ordinateur a choisi : ${choixMachine} et vous avez donc perdu.`;
               imgDiv.setAttribute("src", `/images/${choixUser}.jpg`);
               computerImg.setAttribute("src", `/images/${choixMachine}.jpg`);
            } else {
               
            }  
          }); 
         } 
    }

    document.addEventListener("DOMContentLoaded", (event) => {
        game.play();
    })

