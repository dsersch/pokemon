console.log("loaded...")
// move constructor
function Move(name, damage, pp, currentPP, accuracy, type, color){
    this.name = name;
    this.damage = damage;
    this.pp = pp;
    this.currentPP = currentPP
    this.accuracy = accuracy;
    this.type = type;
    this.color = color;
}

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

// trainer objects

Red = {
    player: 0,
    name: 'Red',
    koCount: 0,
    pickacu: new Pokemon('PICACHU', 150, 150, 9, 'electric',
    new Move('thunderbolt', 30, 25, 25, 8,'electric', 'yellow'),
    new Move('shock', 50, 5, 5, 7,'electric', 'yellow'),
    new Move('slap', 15, 40, 40, 9,'nornmal', 'silver'),
    'http://www.pokestadium.com/sprites/xy/pikachu-female.gif', 'http://www.pokestadium.com/sprites/xy/back/pikachu.gif'),

    geodude: new Pokemon('GEODUDE', 200, 200, 3, 'rock',
    new Move('pound', 15, 40, 40, 9, 'normal', 'silver'),
    new Move('rock throw', 30, 25, 25, 8, 'rock', 'slategray'),
    new Move('smash', 50, 5, 5, 7, 'rock', 'slategray'),
    'http://www.pokestadium.com/sprites/xy/geodude.gif', 'http://www.pokestadium.com/sprites/xy/back/geodude.gif'),

    charizard: new Pokemon('CHARIZARD', 250, 250, 5, 'fire', 
    new Move('punch', 15, 40, 40, 9,'normal', 'silver'),
    new Move('ember', 30, 25, 25, 8, 'fire', 'tomato'),
    new Move('fire blast', 50, 5, 5, 7, 'fire', 'tomato'),
    'http://www.pokestadium.com/sprites/xy/charizard.gif', 'http://www.pokestadium.com/sprites/xy/back/charizard.gif')
}
var redArray = [Red.pickacu, Red.geodude, Red.charizard]
Blue = {
    player: 1,
    name: 'Blue',
    koCount: 0,
    geodude: new Pokemon('GEODUDE', 200, 200, 3, 'rock',
    new Move('pound', 15, 40, 40, 9, 'normal', 'silver'),
    new Move('rock throw', 30, 25, 25, 8, 'rock', 'slategray'),
    new Move('smash', 50, 5, 5, 7, 'rock', 'slategray'),
    'http://www.pokestadium.com/sprites/xy/geodude.gif', 'http://www.pokestadium.com/sprites/xy/back/geodude.gif'),

    pickacu: new Pokemon('PICACHU', 150, 150, 9, 'electric',
    new Move('thunderbolt', 30, 25, 25, 8, 'electric', 'yellow'),
    new Move('shock', 50, 5, 5, 7, 'electric', 'yellow'),
    new Move('slap', 15, 40, 40, 9, 'nornmal', 'silver'), 
    'http://www.pokestadium.com/sprites/xy/pikachu-female.gif', 'http://www.pokestadium.com/sprites/xy/back/pikachu.gif'),

    blastoise: new Pokemon('BLASTOISE', 300, 300, 4, 'water',
    new Move('drop kick', 15, 40, 40, 9, 'normal', 'silver'),
    new Move('water gun', 30, 25, 25, 8, 'water', 'dodgerblue'),
    new Move('hydro pump', 50, 5, 5, 7, 'water', 'dodgerblue'),
    'http://www.pokestadium.com/sprites/xy/blastoise.gif', 'http://www.pokestadium.com/sprites/xy/back/blastoise.gif')

}
var blueArray = [Blue.geodude, Blue.pickacu, Blue.blastoise]

// info functions

// sets pokemon image

function setImage(trainer, poke) {
    var $imgs = $('.poke-img');
    if(trainer.player === 0) {
        $imgs[trainer.player].setAttribute('src', poke.back);
    } else {
        $imgs[trainer.player].setAttribute('src', poke.front);
    }
}

// sets name field

function setName(trainer, poke) {
    var $names = $('.name');
    $($names[trainer.player]).text(poke.name)
}

// sets health points

function setHealth(trainer, poke) {
    var maxHealth = poke.HP;
    var currentHealth = poke.currentHP;
    var $health = $('.health');
    $($health[trainer.player]).text('HP: ' + currentHealth + '/' + maxHealth)
}

// creates move buttons and attaches moves to them

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

// combination of all the info functions

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

// create pokeball buttons and attach pokemon to them

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
    if (currentPlayer === this.trainer) {
        switchPokemon(this.trainer, this.pokemon)
    } else {
        alert("Not Your Turn")
    }
})

// show pokemon in ball

// $('.ball').hover( function() {
//         $(this).html('<img src="' + this.pokemon.front + '">')
//     }, function() {  
//         $(this).html('<img src="https://s-media-cache-ak0.pinimg.com/236x/93/d9/10/93d910850bf76debe69a0ad7a5a76141--art-students-performing-arts.jpg">')
//     })
// $('body').on('mouseenter', '.ball', function() {
//     $(this).html('<img src="' + this.pokemon.front + '">')
// })
// $('body').on('mouseleave', '.ball', function() {  
//         $(this).html('<img src="' + this.pokemon.back + '">')
// })


// remove ko'd pokemon

function clearMoves() {
    var $moves = $('.moves');
    var oldMoves = $moves[enemy.player];
    $(oldMoves).children().remove();
}

function removepokemon() {
    var $lists = $('.pokeballs');
    var $poke = $($lists[enemy.player]).children();
	for (var i = 0; i < $poke.length; i += 1) {
		if ($poke[i].pokemon === enemyPokemon) {
            $($poke[i]).remove();
            clearMoves();
        }
    }
}

// display div

function display(text) {
    $('.display').text(text);
}
// type check

// accuracy check


// attack function

$('body').on('click', '.attack', function() {
    // var acc = Math.floor(Math.random() *10)
    // console.log(acc)
    if (Math.floor(Math.random() *10) < this.move.accuracy) {
        if (this.move.currentPP === 0) {
            display("Out of Power Points. Select another attack.")
        } else {
            enemyPokemon.currentHP -= this.move.damage;
            this.move.currentPP -= 1;
            $(this).children().text("PP: " + this.move.currentPP + '/' + this.move.pp)
            //damage alert
            display(currentPokemon.name + ' hit ' + enemyPokemon.name + ' for ' + this.move.damage + ' damage.')
            setHealth(enemy, enemyPokemon);
            // ko check
            if (enemyPokemon.currentHP <= 0) {
                display(enemyPokemon.name + ' has been knocked out! Choose another PokeMon')
                enemy.koCount += 1;
                removepokemon();
            }
            if (enemy.koCount === 3) {
                alert(currentPlayer.name + ' Wins!');
                display(currentPlayer.name + 'Wins!');
            } else {
                switchTurns();
            }
        }
    } else {
        display("The attack missed!");
        this.move.currentPP -= 1;
        $(this).children().text("PP: " + this.move.currentPP + '/' + this.move.pp)
        switchTurns();
    } 
})
