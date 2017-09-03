console.log("loaded...")

function Pokemon(name, HP, speed, type, move1, move2, move3){
    this.name = name;
    this.HP = HP;
    this.speed = speed;
    this.type = type;
    this.move1 = move1;
    this.move2 = move2;
    this.move3 = move3;
}

var pikachu = new Pokemon("Pikachu", 150, 9, "electric")