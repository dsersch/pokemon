console.log("loaded...")
// last attack in display
var lastAttack = '';

// type constructor
function Type(name, strong1, strong2, weak1, weak2){
    this.name = name;
    this.strong = [strong1, strong2];
    this.weak = [weak1, weak2]
}

var electric = new Type('electric', 'water', 'flying', 'ground', 'none');
var water = new Type('water', 'fire', 'rock', 'electric', 'grass')
var fire = new Type('fire', 'grass', 'bug', 'water', 'ground')
var grass = new Type('grass', 'water', 'ground', 'fire', 'flying')
var ground = new Type('ground', 'electric', 'fire', 'water', 'grass')
var rock = new Type('rock', 'fire', 'electric', 'water', 'grass')
var flying = new Type('flying', 'grass', 'bug', 'electric', 'rock')
var bug = new Type('bug', 'grass', 'psychic', 'fire', 'rock')

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
    pickacu: new Pokemon('PICACHU', 150, 150, 9, electric,
    new Move('thunderbolt', 30, 25, 25, 8, electric, 'yellow'),
    new Move('shock', 50, 5, 5, 7, electric, 'yellow'),
    new Move('slap', 15, 40, 40, 9,'nornmal', 'silver'),
    'http://www.pokestadium.com/sprites/xy/pikachu-female.gif', 'http://www.pokestadium.com/sprites/xy/back/pikachu.gif'),

    geodude: new Pokemon('GEODUDE', 200, 200, 3, rock,
    new Move('pound', 15, 40, 40, 9, 'normal', 'silver'),
    new Move('rock throw', 30, 25, 25, 8, rock, 'slategray'),
    new Move('smash', 50, 5, 5, 7, rock, 'slategray'),
    'http://www.pokestadium.com/sprites/xy/geodude.gif', 'http://www.pokestadium.com/sprites/xy/back/geodude.gif'),

    charizard: new Pokemon('CHARIZARD', 250, 250, 5, fire, 
    new Move('punch', 15, 40, 40, 9,'normal', 'silver'),
    new Move('ember', 30, 25, 25, 8, fire, 'tomato'),
    new Move('fire blast', 50, 5, 5, 7, fire, 'tomato'),
    'http://www.pokestadium.com/sprites/xy/charizard.gif', 'http://www.pokestadium.com/sprites/xy/back/charizard.gif')
}
var redArray = [Red.pickacu, Red.geodude, Red.charizard]
Blue = {
    player: 1,
    name: 'Blue',
    koCount: 0,
    geodude: new Pokemon('GEODUDE', 200, 200, 3, rock,
    new Move('pound', 15, 40, 40, 9, 'normal', 'silver'),
    new Move('rock throw', 30, 25, 25, 8, rock, 'slategray'),
    new Move('smash', 50, 5, 5, 7, rock, 'slategray'),
    'http://www.pokestadium.com/sprites/xy/geodude.gif', 'http://www.pokestadium.com/sprites/xy/back/geodude.gif'),

    pickacu: new Pokemon('PICACHU', 150, 150, 9, electric,
    new Move('thunderbolt', 30, 25, 25, 8, electric, 'yellow'),
    new Move('shock', 50, 5, 5, 7, electric, 'yellow'),
    new Move('slap', 15, 40, 40, 9, 'nornmal', 'silver'), 
    'http://www.pokestadium.com/sprites/xy/pikachu-female.gif', 'http://www.pokestadium.com/sprites/xy/back/pikachu.gif'),

    blastoise: new Pokemon('BLASTOISE', 300, 300, 4, water,
    new Move('drop kick', 15, 40, 40, 9, 'normal', 'silver'),
    new Move('water gun', 30, 25, 25, 8, water, 'dodgerblue'),
    new Move('hydro pump', 50, 5, 5, 7, water, 'dodgerblue'),
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
    currentPokemon = poke;
    setImage(trainer, poke);
    setHealth(trainer, poke);
    setName(trainer, poke);
    switchMoves(trainer, poke);
    switchHealthBar();   
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

$('.ball').hover(function() {
    display(this.pokemon.name);
}, function() {
    display(lastAttack);
})

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
    $('.display').html(text);
}

// move check

$('.moves').on('mouseenter', '.attack', function() {
    display(this.move.name + '<br>' + 'Damage: ' + this.move.damage + '<br>' + 'Accuracy: ' + this.move.accuracy)
    // display(lastAttack)
})
$('.moves').on('mouseleave', '.attack', function() {
    display(lastAttack)
})

// health bars

// health bar attack update

function healthBar() {
    var $hb = $('.healthbar');
    var $hltBars = $('.cover');
    var coverage = 100 - ((enemyPokemon.currentHP / enemyPokemon.HP) * 100);
    var background = "";
    if (coverage > 50) {
        $($hb[enemy.player]).css('background', 'yellow');
    }
    if (coverage > 85) {
        $($hb[enemy.player]).css('background', 'red');
    }
    $($hltBars[enemy.player]).css('width', coverage +"%");
}

// health bar switch update

function switchHealthBar() {
    var $hb = $('.healthbar');
    var $hltBars = $('.cover');
    var coverage = 100 - ((currentPokemon.currentHP / currentPokemon.HP) * 100);
    var background = "";
    if (coverage <= 50) {
        $($hb[currentPlayer.player]).css('background', 'yellowgreen');
    }
    if (coverage > 50) {
        $($hb[currentPlayer.player]).css('background', 'yellow');
    }
    if (coverage > 85) {
        $($hb[currentPlayer.player]).css('background', 'red');
    }
    $($hltBars[currentPlayer.player]).css('width', coverage +"%");
}



// attack function

$('body').on('click', '.attack', function() {
    if (Math.floor(Math.random() *10) < this.move.accuracy) {
        if (this.move.currentPP === 0) {
            display("Out of Power Points. Select another attack.")
        } else {
            // set damage based on type
            var pokeBonus = 0;
            if (this.move.type === currentPokemon.type) {
                console.log('move matches');
                pokeBonus = Math.floor(this.move.damage * .25);
                console.log(pokeBonus)
            }
            var moveBonus = 0
            if (this.move.type.name === enemyPokemon.type.weak[0] || this.move.type === enemyPokemon.type.weak[1]) {
                console.log('move strong against type');
                display("It's super effective")
                moveBonus = Math.floor(this.move.damage * .5);
                console.log(moveBonus)
            }
            var typeReduction = 1;
            if(this.move.type.name === enemyPokemon.type.strong[0] || this.move.type.name === enemyPokemon.type.strong[1]) {
                typeReduction = .1
            }
            // damage the enemy
            
            var totalDamage = Math.floor((this.move.damage + pokeBonus + moveBonus) * typeReduction);
            enemyPokemon.currentHP -= totalDamage;
            if (enemyPokemon.currentHP < 0) {
                enemyPokemon.currentHP = 0;
            }
            this.move.currentPP -= 1;
            $(this).children().text("PP: " + this.move.currentPP + '/' + this.move.pp)

            // update healthbars

            healthBar()
            
            //damage alert
            
            if (moveBonus > 0) {
                display(currentPokemon.name + ' hit ' + enemyPokemon.name + ' for ' + totalDamage + ' damage.' + '<br>' +
                            "It's super effective");
                lastAttack = $('.display').html();
            } else if (typeReduction === .1) {
                display(currentPokemon.name + ' hit ' + enemyPokemon.name + ' for ' + totalDamage + ' damage.' + '<br>' +
                            "It's not very effective");
                lastAttack = $('.display').html();
            } else {
                display(currentPokemon.name + ' hit ' + enemyPokemon.name + ' for ' + totalDamage + ' damage.');
                lastAttack = $('.display').html();
            }
            
            setHealth(enemy, enemyPokemon);
            // ko check
            if (enemyPokemon.currentHP <= 0) {
                display(enemyPokemon.name + ' has been knocked out! Choose another PokeMon')
                lastAttack = $('.display').html()
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
        display(currentPokemon.name + "'s attack missed!");
        lastAttack = $('.display').html();
        this.move.currentPP -= 1;
        $(this).children().text("PP: " + this.move.currentPP + '/' + this.move.pp)
        switchTurns();
    } 
})