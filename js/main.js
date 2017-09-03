console.log("loaded...")
// move constructor
function Move(name, damage, pp, type, color){
    this.name = name;
    this.damage = damage;
    this.pp = pp;
    this.type = type;
    this.color = color;
}
// test moves

var thunderbolt = new Move('thunderbolt', 30, 25, 'electric', 'yellow');
var slap = new Move('slap', 15, 40, 'nornmal', 'silver')
var shock = new Move('shock', 50, 5, 'electric', 'yellow')

// pokemon constructor

function Pokemon(name, HP, speed, type, move1, move2, move3){
    this.name = name;
    this.HP = HP;
    this.speed = speed;
    this.type = type;
    this.move1 = move1;
    this.move2 = move2;
    this.move3 = move3;
}

// test pokemon object

var pickacu = new Pokemon('picachu', 150, 9, 'electric', thunderbolt, shock, slap)