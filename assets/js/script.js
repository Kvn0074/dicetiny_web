/*= 1 ==========================================================
=========  CLASS INIT  =========================================
==============================================================*/
class Joueur {
    constructor (name, currentPlayer){
      this.name          = name;
      this.round         = 0;
      this.global        = 0;
      this.currentPlayer = currentPlayer;
    }
    
    hold(autreJoueur){
      this.global += this.round;
      this.round = 0;
      this.currentPlayer = false;
      autreJoueur.currentPlayer = true;
      lightName();
    }

    checkVictory() {
    if(this.round + this.global >= score){
      return true;
    }
  }
}

/*= 2 ==========================================================
=========  VARIABLES INIT  =====================================
==============================================================*/

let roundDice;
let score = 100;
let joueur1 = new Joueur ("Player 1", true);
let joueur2 = new Joueur ("Player 2", false);
let currentClass = '';

/*= 3 ==========================================================
=========  DOM ELEMENTS INIT  ==================================
==============================================================*/

let hold_btn = document.getElementById('button');
let restart_btn = document.getElementById('restart');
let current = document.getElementById('current');
let global_one = document.getElementById('global_one');
let global_two = document.getElementById('global_two');
let cube = document.querySelector('.cube');

/*= 4 ==========================================================
=========  SECONDARY FUNCTIONS  ================================
==============================================================*/

function getRandomInt() {
    return Math.floor(Math.random() * 6) + 1;
  }

/*= 5 ==========================================================
=========  PRIMARY FUNCTIONS  ==================================
==============================================================*/

function rolldice(joueurA, joueurB){

    if(joueur1.currentPlayer){
      joueurA = joueur1; joueurB = joueur2; 
      lightName();
    } else {
      joueurA = joueur2;joueurB = joueur1; 
      lightName();
    }
     
    roundDice = getRandomInt();
     
    /* Mouvement du dé */
  
    let showClass = 'show-' + roundDice;
            
          if (currentClass) {
              cube.classList.remove( currentClass );
          }
  
    cube.classList.add( showClass );
    currentClass = showClass;
  
    /* ------------- */
  
          if(roundDice == 1){
              joueurA.round = 0;
              joueurA.currentPlayer = false;
              joueurB.currentPlayer = true;
              current.textContent = " ";
              lightName()
              opsy.play();
          } 
          else {
              joueurA.round += roundDice;
              current.textContent = joueurA.round
              if(joueurA.checkVictory()){
                    add_victory(joueurA);
                  }
          }
  }