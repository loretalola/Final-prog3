var LivingCreature = require("./Livingcreature");
var random = require("./random");

module.exports = class Hunter extends LivingCreature{
    constructor(x, y) {
        super(x, y);
        this.energy = 10;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    move() {

        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;


            this.y = newY;
            this.x = newX;
            this.energy--;

        }

    }
    kill() {

        var newCell = random(this.chooseCell(3));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in PredatorArr) {
                if (newX == PredatorArr[i].x && newY == PredatorArr[i].y) {
                    PredatorArr.splice(i, 1);
                    break;
                    
                }
            }
            
            this.y = newY;
            this.x = newX;
            this.energy += 4;    
        }
    }
    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 20 && newCell) {
            var newHunter = new Hunter(newCell[0], newCell[1], this.index);
            HunterArr.push(newHunter);
            matrix[newCell[1]][newCell[0]] = 4;
            this.energy = 5;
            hunterHashiv++;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;

            for (var i in HunterArr) {
                if (this.x == HunterArr[i].x && this.y == HunterArr[i].y) {
                    HunterArr.splice(i, 1);
                }
            }
        }
    }
}