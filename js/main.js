console.log("loaded...")
// last attack in display

var lastAttack = '';
var $display = $('.display');

// type constructor

function Type(name, strong1, strong2, weak1, weak2){
    this.name = name;
    this.strong = [strong1, strong2];
    this.weak = [weak1, weak2]
}

var electric = new Type('electric', 'water', 'flying', 'ground', 'rock');
var water = new Type('water', 'fire', 'rock', 'grass', 'electric')
var fire = new Type('fire', 'grass', 'bug', 'water', 'ground')
var ground = new Type('ground', 'electric', 'fire', 'grass', 'water')
var rock = new Type('rock', 'electric', 'grass', 'water', 'grass')
var flying = new Type('flying', 'grass', 'bug', 'electric', 'rock')
var bug = new Type('bug', 'grass', 'psychic', 'fire', 'rock')
var grass = new Type('grass', 'water', 'ground', 'fire', 'rock')

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

/*
function Pokemon(props){
    this.name = props.name;
    this.HP = props.HP;
    this.currentHP = props.currentHP
    this.speed = props.speed;
    this.type = props.type;
    this.moves = props.moves
    this.front = props.front;
    this.back = props.back;
}

new Pokemon({
    name: "Pikachu",
    // ...,
    // ... ,
})
*/

// trainer objects

Red = {
    player: 0,
    name: 'Red',
    koCount: 0,
    pickachu: new Pokemon('PICACHU', 150, 150, 9, electric,
    new Move('SLAP', 15, 40, 40, 9,'normal', 'silver'),
    new Move('SHOCK', 50, 5, 5, 7, electric, 'yellow'),
    new Move('THUNDERBOLT', 30, 25, 25, 8, electric, 'yellow'),
    'img/pikachu-front.gif', 'img/pikachu-back.gif'),

    blastoise: new Pokemon('BLASTOISE', 300, 300, 4, water,
    new Move('HEAD BUTT', 15, 40, 40, 9, 'normal', 'silver'),
    new Move('WATER GUN', 30, 25, 25, 8, water, 'dodgerblue'),
    new Move('HYDRO PUMP', 50, 5, 5, 7, water, 'dodgerblue'),
    'img/blastoise-front.gif', 'img/blastoise-back.gif'),

    charizard: new Pokemon('CHARIZARD', 250, 250, 5, fire, 
    new Move('PUNCH', 15, 40, 40, 9,'normal', 'silver'),
    new Move('EMBER', 30, 25, 25, 8, fire, 'tomato'),
    new Move('FIRE BLAST', 50, 5, 5, 7, fire, 'tomato'),
    'img/charizard-front.gif', 'img/charizard-back.gif'),

    venusaur: new Pokemon('VENUSAUR', 275, 275, 4, grass,
    new Move('SCRATCH', 15, 40, 40, 9, 'normal', 'silver'),
    new Move('RAZOR LEAF', 30, 25, 25, 8, grass, 'lightgreen'),
    new Move('SOLAR BEAM', 50, 5, 5, 7, grass, 'lightgreen'),
    'img/venusaur-front.gif', 'img/venusaur-back.gif'),

    sandslash: new Pokemon('SANDSLASH', 200, 200, 6, ground,
    new Move('SLASH', 15, 40, 40, 9, 'normal', 'silver'),
    new Move('DRILL RUN', 30, 25, 25, 8, ground, 'tan'),
    new Move('MAGNITUDE', 50, 5, 5, 7, ground, 'tan'),
    'img/sandslash-front.gif', 'img/sandslash-back.gif'),

    onix: new Pokemon('ONIX', 400, 400, 2, rock,
    new Move("POUND", 15, 40, 40, 9, 'normal', 'silver'),
    new Move("ROCK THROW", 30, 25, 25, 8, rock, 'slategray'),
    new Move("STONE EDGE", 50, 5, 5, 7, rock, 'slategray'),
    'img/onix-front.gif', 'img/onix-back.gif')
}
var redArray = [Red.pickachu, Red.charizard, Red.blastoise, Red.venusaur, Red.sandslash, Red.onix]
Blue = {
    player: 1,
    name: 'Blue',
    koCount: 0,
    marowak: new Pokemon('MAROWAK', 225, 225, 5, ground,
    new Move('KARATE CHOP', 15, 40, 40, 9, 'normal', 'silver'),
    new Move('BONE CLUB', 30, 25, 25, 8, ground, 'tan'),
    new Move('BULLDOZE', 50, 5, 5, 7, ground, 'tan'),
    'img/marowak-front.gif', 'img/marowak-back.gif'),

    gyarados: new Pokemon('GYARADOS', 250, 250, 7, water,
    new Move('ROAR', 15, 40, 40, 9, 'normal', 'silver'),
    new Move('AQUA JET', 30, 25, 25, 8, water, 'dodgerblue'),
    new Move('WATERFALL', 50, 5, 5, 7, water, 'dodgerblue'),
    'img/gyarados-front.gif', 'img/gyarados-back.gif'),

    zapdos: new Pokemon('ZAPDOS', 175, 175, 8, electric,
    new Move('PECK', 15, 40, 40, 9, 'normal', 'silver'),
    new Move('BOLT STRIKE', 30, 25, 25, 8, electric, 'yellow'),
    new Move('GIGAVOLT HAVOC', 50, 5, 5, 7, electric, 'yellow'),
    'img/zapdos-front.gif', 'img/zapdos-back.gif'),

    emboar: new Pokemon('EMBOAR', 250, 250, 4, fire,
    new Move('DROP KICK', 15, 40, 40, 9, 'normal', 'silver'),
    new Move('FIRE BLAST', 30, 25, 25, 8, fire, 'tomato'),
    new Move('FLAMETHROWER', 50, 5, 5, 7, fire, 'tomato'),
    'img/emboar-front.gif', 'img/emboar-back.gif'),

    meganium: new Pokemon('MEGANIUM', 300, 300, 3, grass,
    new Move('TAIL WHIP', 15, 40, 40, 9, 'normal', 'silver'),
    new Move('LEAF BLADE', 30, 25, 25, 8, grass, 'lightgreen'),
    new Move('BLOOM DOOM', 50, 5, 5, 7, grass, 'lightgreen'),
    'img/meganium-front.gif', 'img/meganium-back.gif'),

    golem: new Pokemon('GOLEM', 375, 375, 3, rock,
    new Move('POUND', 15, 40, 40, 9, 'normal', 'silver'),
    new Move('ROLLOUT', 30, 25, 25, 8, rock, 'slategray'),
    new Move('DIAMOND STORM', 50, 5, 5, 7, rock, 'slategray'),
    'img/golem-front.gif', 'img/golem-back.gif')
}
var blueArray = [Blue.marowak, Blue.gyarados, Blue.zapdos, Blue.emboar, Blue.meganium, Blue.golem]

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

setPlayerInfo(Red, Red.pickachu);
setPlayerInfo(Blue, Blue.marowak);

//player set up

var currentPlayer = Red;
var enemy = Blue;
var currentPokemon = Red.pickachu;
var enemyPokemon = Blue.marowak;
var $start = $('.moves');
$($start[1]).css('display', 'none');

//swith turns function

function switchTurns() {
    var lastPlayer = currentPlayer;
    var lastPoke = currentPokemon;
    currentPlayer = enemy;
    currentPokemon = enemyPokemon;
    enemy = lastPlayer;
    enemyPokemon = lastPoke;
    var $movelist = $('.moves');

    if(currentPlayer === Red) {
        $($movelist[0]).slideToggle(400, function() {
            $($movelist[1]).slideToggle(400);
        });
    } else {
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
        var $ball = $('<li>')
        $ball
            .addClass('ball')
            .prop('pokemon', array[i])
            .prop('trainer', trainer)
            .append('<div class="default"><img src="img/pokeball.jpg"></div>')
        $ball.append('<div class="avatar"><img src="' + $ball.prop('pokemon').front + '"></div>')
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
        display("Not Your Turn");
    }
})

// show pokemon in ball

// $('.ball').hover(function() {
//     display('<img src="' + this.pokemon.front + '">');
// }, function() {
//     display(lastAttack);
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
    $('.display').html(text);
}

// move check

$('.moves').on('mouseenter', '.attack', function() {
    display(this.move.name + '<br>' + 'Damage: ' + this.move.damage + '<br>' + 'Accuracy: ' + this.move.accuracy + '/10')
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
    $($hltBars[enemy.player]).animate({width: coverage + '%'}, 1000);
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

// attack animation variable

var pokeToAnimate = $('.poke-img');

// hit sound effect

var hitSound = new Audio('hit-sound.mp3');
var missSound = new Audio('miss-sound.mp3')

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

            var thisAttack = this
            var enemyHasWeakness = enemyPokemon.type.weak.find(function(weakness) {
                return thisAttack.move.type.name === weakness
            })

            console.log("Does enemy have a weakness?", !!enemyHasWeakness)


            if (enemyHasWeakness) {
                console.log('move strong against type');
                display("It's super effective")
                moveBonus = Math.floor(this.move.damage * .5);
                console.log(moveBonus)
            }
            var typeReduction = 1;
            if(this.move.type.name === enemyPokemon.type.strong[0] || enemyPokemon.type.strong[1] === this.move.type.name) {
                typeReduction = .1
            }

            // animate pokemon

            $(pokeToAnimate[currentPlayer.player]).effect('shake', {times: 2}, 400, function() {
                $(pokeToAnimate[currentPlayer.player]).effect('bounce', {times: 3}, 400);
                hitSound.play()
            });
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
                display(currentPokemon.name + ' used ' + this.move.name + '<br>' +
                            ' and hit ' + enemyPokemon.name + ' for ' + totalDamage + ' damage.' + '<br>' +
                            "It's super effective");
                lastAttack = $display.html();
            } else if (typeReduction === .1) {
                display(currentPokemon.name + ' used ' + this.move.name + '<br>' +
                            ' and hit ' + enemyPokemon.name + ' for ' + totalDamage + ' damage.' + '<br>' +
                            "It's not very effective");
                lastAttack = $display.html();
            } else {
                display(currentPokemon.name + ' used ' + this.move.name + '<br>' +
                        ' and hit ' + enemyPokemon.name + ' for ' + totalDamage + ' damage.');
                lastAttack = $display.html();
            }
            
            setHealth(enemy, enemyPokemon);
            // ko check
            if (enemyPokemon.currentHP <= 0) {
                display(enemyPokemon.name + ' has been knocked out! Choose another PokeMon')
                lastAttack = $display.html()
                enemy.koCount += 1;
                removepokemon();
            }
            if (enemy.koCount === 6) {
                alert(currentPlayer.name + ' Wins!');
                display(currentPlayer.name + 'Wins!');
                lastAttack = $display.html();
            } else {
                switchTurns();
            }
        }
    } else {
        $(pokeToAnimate[currentPlayer.player]).effect('shake', {times: 2}, 400)
        missSound.play();
        display(currentPokemon.name + "'s attack missed!");
        lastAttack = $display.html();
        this.move.currentPP -= 1;
        $(this).children().text("PP: " + this.move.currentPP + '/' + this.move.pp)
        switchTurns();
    } 
})