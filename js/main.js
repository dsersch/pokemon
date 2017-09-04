console.log("loaded...")
// move constructor
function Move(name, damage, pp, currentPP, type, color){
    this.name = name;
    this.damage = damage;
    this.pp = pp;
    this.currentPP = currentPP
    this.type = type;
    this.color = color;
}
// test moves

var thunderbolt = new Move('thunderbolt', 30, 25, 25, 'electric', 'yellow');
var slap = new Move('slap', 15, 40, 40, 'nornmal', 'silver')
var shock = new Move('shock', 50, 5, 5, 'electric', 'yellow')
var pound = new Move('pound', 15, 40, 40, 'normal', 'silver')
var rockThrow = new Move('rock throw', 30, 25, 25, 'rock', 'slategray')
var smash = new Move('smash', 50, 5, 5, 'rock', 'slategray')

// pokemon constructor

function Pokemon(name, HP, currentHP, speed, type, move1, move2, move3, front, back){
    this.name = name;
    this.HP = HP;
    this.currentHP = currentHP
    this.speed = speed;
    this.type = type;
    this.moves = [move1, move2, move3]
    this.front = front;
    this.back =back;
}

// test trainer objects

Red = {
    player: 0,
    pickacu: new Pokemon('PICACHU', 150, 150, 9, 'electric', thunderbolt, shock, slap, 
    'http://www.pokestadium.com/sprites/xy/pikachu-female.gif', 'http://www.pokestadium.com/sprites/xy/back/pikachu.gif'),

    geodude: new Pokemon('GEODUDE', 200, 200, 'rock', pound, rockThrow, smash,
    'http://www.pokestadium.com/sprites/xy/geodude.gif', 'http://www.pokestadium.com/sprites/xy/back/geodude.gif')
    
}
Blue = {
    player: 1,
    geodude: new Pokemon('GEODUDE', 200, 200, 3, 'rock', pound, rockThrow, smash,
    'http://www.pokestadium.com/sprites/xy/geodude.gif', 'http://www.pokestadium.com/sprites/xy/back/geodude.gif'),

    pickacu: new Pokemon('PICACHU', 150, 150, 9, 'electric', thunderbolt, shock, slap, 
    'http://www.pokestadium.com/sprites/xy/pikachu-female.gif', 'http://www.pokestadium.com/sprites/xy/back/pikachu.gif')
}

// info functions

function setImage(trainer, poke) {
    var $imgs = $('img');
    if(trainer.player === 0) {
        $imgs[trainer.player].setAttribute('src', poke.back);
    } else {
        $imgs[trainer.player].setAttribute('src', poke.front);
    }
}

function setName(trainer, poke) {
    var $names = $('.name');
    $($names[trainer.player]).text(poke.name)
}

function setHealth(trainer, poke) {
    var maxHealth = poke.HP;
    var currentHealth = poke.currentHP;
    var $health = $('.health');
    $($health[trainer.player]).text('HP: ' + currentHealth + '/' + maxHealth)
}

function setMoves(trainer, poke) {
    for(var i = 0; i < 3; i += 1) {
        var $move = $('<li>').text(poke.moves[i].name).css("background", poke.moves[i].color);
        $($move).prop('move', poke.moves[i]);
        var $pp = $('<span>').text('PP: ' + poke.moves[i].currentPP + '/' + poke.moves[i].pp);
        $($move).append($pp);
        var $movesLists = $('ul');
        $($movesLists[trainer.player]).append($move);
    }
}

function setPlayerInfo(trainer, poke) {
    setImage(trainer, poke);
    setHealth(trainer, poke);
    setMoves(trainer, poke);
    setName(trainer, poke);
}

setPlayerInfo(Red, Red.pickacu);
setPlayerInfo(Blue, Blue.geodude);

//test player set up

var currentPlayer = Red;
var enemy = Blue;
var currentPokemon = Red.pickacu;
var enemyPokemon = Blue.geodude;

// attack function

$('li').on('click', function() {
    enemyPokemon.currentHP -= this.move.damage;
    this.move.currentPP -= 1;
    $(this).children().text("PP: " + this.move.currentPP + '/' + this.move.pp)
    //console.log(this.move.currentPP);
    //console.log(enemyPokemon.currentHP);
    setHealth(enemy, enemyPokemon);
})