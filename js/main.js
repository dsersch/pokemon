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

    geodude: new Pokemon('GEODUDE', 200, 200, 3, 'rock', pound, rockThrow, smash,
    'http://www.pokestadium.com/sprites/xy/geodude.gif', 'http://www.pokestadium.com/sprites/xy/back/geodude.gif')
}
var redArray = [Red.pickacu, Red.geodude]
Blue = {
    player: 1,
    geodude: new Pokemon('GEODUDE', 200, 200, 3, 'rock', pound, rockThrow, smash,
    'http://www.pokestadium.com/sprites/xy/geodude.gif', 'http://www.pokestadium.com/sprites/xy/back/geodude.gif'),

    pickacu: new Pokemon('PICACHU', 150, 150, 9, 'electric', thunderbolt, shock, slap, 
    'http://www.pokestadium.com/sprites/xy/pikachu-female.gif', 'http://www.pokestadium.com/sprites/xy/back/pikachu.gif')
}
var blueArray = [Blue.geodude, Blue.pickacu]
// info functions

function setImage(trainer, poke) {
    var $imgs = $('.poke-img');
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
        var $move = $('<li>').text(poke.moves[i].name).css("background", poke.moves[i].color).addClass('attack');
        $($move).prop('move', poke.moves[i]);
        var $pp = $('<span>').text('PP: ' + poke.moves[i].currentPP + '/' + poke.moves[i].pp);
        $($move).append($pp);
        var $movesLists = $('.moves');
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
var $start = $('.moves');
$($start[1]).css('display', 'none');

//swith turns function

function switchTurns() {
    if(currentPlayer === Red) {
        var lastPlayer = currentPlayer;
        var lastPoke = currentPokemon;
        currentPlayer = enemy;
        currentPokemon = enemyPokemon;
        enemy = lastPlayer;
        enemyPokemon = lastPoke;
        var $movelist = $('.moves');
        $($movelist[0]).slideToggle(400, function() {
            $($movelist[1]).slideToggle(400);
        });
    } else {
        lastPlayer = currentPlayer;
        lastPoke = currentPokemon;
        currentPlayer = enemy;
        currentPokemon = enemyPokemon;
        enemy = lastPlayer;
        enemyPokemon = lastPoke;
        var $movelist = $('.moves');
        $($movelist[1]).slideToggle(400, function() {
            $($movelist[0]).slideToggle(400);
        });
    }
}

// swith pokemon function

function switchMoves(trainer, poke) {
    var $moves = $('.moves');
    var oldMoves = $moves[trainer.player];
    $(oldMoves).children().remove();
    setMoves(trainer, poke);
}

function switchPokemon(trainer, poke) {
    setImage(trainer, poke);
    setHealth(trainer, poke);
    setName(trainer, poke);
    switchMoves(trainer, poke);
    currentPokemon = poke;
}

function setPokeballs(trainer, array) {
    for (var i = 0; i < array.length; i += 1) {
        var $ball = $('<li>').addClass('ball').html('<img src="https://s-media-cache-ak0.pinimg.com/236x/93/d9/10/93d910850bf76debe69a0ad7a5a76141--art-students-performing-arts.jpg">');
        $($ball).prop('pokemon', array[i]);
        $($ball).prop('trainer', trainer)
        var $list = $('.pokeballs');
        $($list[trainer.player]).append($ball);
    }
}

//initial pokeball setup

setPokeballs(Red, redArray);
setPokeballs(Blue, blueArray);

//on click to change pokemon

$('body').on('click', '.ball', function() {
    console.log(this.pokemon)
    console.log(this.trainer)
    switchPokemon(this.trainer, this.pokemon)
})


// attack function

$('body').on('click', '.attack', function() {
    enemyPokemon.currentHP -= this.move.damage;
    this.move.currentPP -= 1;
    $(this).children().text("PP: " + this.move.currentPP + '/' + this.move.pp)
    //console.log(this.move.currentPP);
    //console.log(enemyPokemon.currentHP);
    setHealth(enemy, enemyPokemon);
    switchTurns();
})