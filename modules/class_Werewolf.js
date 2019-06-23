var LivingCreature = require("./Livingcreature");
var random = require("./random");

module.exports = class Werewolf extends LivingCreature{
    constructor(x, y) {
       super(x,y);
        this.energy = 5;
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
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
 ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    move() {

        var newCell1 = this.chooseCell(0);
        var newCell2 = this.chooseCell(1);
        newCell1.concat(newCell2);
        var newCell = random(newCell1);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            
            for (var i in this.chooseCell(1)){
                if (newCell){
                matrix[this.y][this.x] = 1;
            }
            
            }
            matrix[newY][newX] = 5;


            this.y = newY;
            this.x = newX;
            this.energy--;

        }
    }
    kill() {
        var newCells1 = this.chooseCell(4);
        var newCells2 = this.chooseCell(3);
        var newCells = newCells1.concat(newCells2);
        var newCell = random(newCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in HunterArr) {
                if (newX == HunterArr[i].x && newY == HunterArr[i].y) {
                    HunterArr.splice(i, 1);
                    break;
                }
            }
            for (var i in PredatorArr) {
                if (newX == PredatorArr[i].x && newY == PredatorArr[i].y) {
                    PredatorArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            this.energy += 10;   
        }
        
    }
    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 8 && newCell) {
            var newWerewolf = new Werewolf(newCell[0], newCell[1], this.index);
            WerewolfArr.push(newWerewolf);
            matrix[newCell[1]][newCell[0]] = 5;
            this.energy = 5;
            werewolfHashiv++;
        }
    
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;

            for (var i in WerewolfArr) {
                if (this.x == WerewolfArr[i].x && this.y == WerewolfArr[i].y) {
                    WerewolfArr.splice(i, 1);
                }
            }
        }
    }
}