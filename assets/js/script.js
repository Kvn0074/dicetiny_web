/*==============================================================
=========  INDEX  ==============================================
================================================================

    1 - Class initialization
    2 - Variables initialization
    3 - DOM elements recuperations
    4 - Secundary functions
    5 - Prymary function
    6 - DOM events
    
================================================================
================================================================
==============================================================*/


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
let fly_spec = document.getElementById('flying_spec');
let fly_victory = document.getElementById('flying_victory');
let winner_is = document.getElementById('the_winner_is');
let victory_sound = document.getElementById('victory_sound');
let music = document.getElementById('music');
let speak_img = document.getElementById('speaker');
let playerOne = document.getElementById('player_one_name');
let playerTwo = document.getElementById('player_two_name');
let opsy = document.getElementById('opsy_daisy');

/*= 4 ==========================================================
=========  SECONDARY FUNCTIONS  ================================
==============================================================*/

function getRandomInt() {
    return Math.floor(Math.random() * 6) + 1;
  }

function score_max() { 
    let goal = Number(prompt('entrer le score a atteindre'));

    if(isNaN(goal)){
        alert('vous devez entrez un nombres')
    } 
    else {
    score = goal;
    console.log(score);
    newgame();
    }
}

function newgame(){
    joueur1.round  = 0;
    joueur1.global = 0;
    joueur1.currentPlayer = true;
    joueur2.round  = 0;
    joueur2.global = 0;
    joueur2.currentPlayer = false;
    current.textContent = " ";
    global_one.textContent  = " ";
    global_two.textContent  = " ";

    if (currentClass) {
        cube.classList.remove( currentClass );
    }

    cube.classList.add('show-1');
    fly_victory.className = 'disappear';
    lightName();
}

function add_spec(){
    fly_spec.className = 'appear';
}

function none_spec(){
    fly_spec.className = 'disappear';
}

function add_victory(joueur){
    fly_victory.className = 'appear';
    winner_is.textContent = joueur.name;
    victory_sound.play();
}

function add_music(){
    if(music.paused){
        speak_img.src = "assets/pics/Speaker_ok.png";
        music.play();
    } else {
        speak_img.src = "assets/pics/speaker_none.png";
        music.pause();
    }
}

function lightName(){
    if(joueur1.currentPlayer){
        playerOne.className = "neon";
        playerTwo.className  = "";
    }
    else{
        playerTwo.className  = "neon";
        playerOne.className = "";
    };
};

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

/*= 6 ==========================================================
=========  DOM EVENTS  =========================================
==============================================================*/
    
hold_btn.addEventListener('click', function(){
    if(joueur1.currentPlayer){
      joueur1.hold(joueur2);
      current.textContent = " ";
      global_one.textContent = joueur1.global;
    } 
    else {
      joueur2.hold(joueur1);
      current.textContent = " ";
      global_two.textContent = joueur2.global;
    }
  });

  restart_btn.addEventListener('click', newgame);

/*==============================================================
================================================================
==============================================================*/