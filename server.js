var Grass = require("./modules/class_Grass.js");
var GrassEater = require("./modules/class_GrassEater.js");
var Predator = require("./modules/class_Predator.js");
var Hunter = require("./modules/class_Hunter.js");
var Werewolf = require("./modules/class_Werewolf.js");
var random = require('./modules/random');

grassArr = [];
grassEaterArr = [];
PredatorArr = [];
HunterArr = [];
WerewolfArr = [];
matrix = [];

grassHashiv = 0;
grassEaterHashiv = 0;
predatorHashiv = 0;
hunterHashiv = 0;
werewolfHashiv = 0;
season = '';
count = 0;

const EMPTY_VALUE = 0;
const GRASS_VALUE = 1;
const GRASS_EATER_VALUE = 2;
const PREDATOR_VALUE = 3;
const HUNTER_VALUE = 4;
const WEREWOLF_VALUE = 5;




function matrixGenerator(matrixSize, grass, grassEater, predator, hunter, werewolf) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = EMPTY_VALUE;
        }
    }

    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = GRASS_VALUE;
    }

    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = GRASS_EATER_VALUE;
    }

    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = PREDATOR_VALUE;
    }

    for (let i = 0; i < hunter; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = HUNTER_VALUE;
    }

    for (let i = 0; i < werewolf; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = WEREWOLF_VALUE;
    }
}
matrixGenerator(20, 10, 30, 15, 10, 8);


var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3001);

function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] === GRASS_VALUE) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
                
            } else if (matrix[y][x] == GRASS_EATER_VALUE) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++;
                
            } else if (matrix[y][x] == PREDATOR_VALUE) {
                var predator = new Predator(x, y);
                PredatorArr.push(predator);
                predatorHashiv++;
                
            } else if (matrix[y][x] == HUNTER_VALUE) {
                var hunter = new Hunter(x, y);
                HunterArr.push(hunter);
                hunterHashiv++;
                
            } else if (matrix[y][x] == WEREWOLF_VALUE) {
                var werewolf = new Werewolf(x, y);
                WerewolfArr.push(werewolf);
                werewolfHashiv++;
                
            }
        }
    }
}
creatingObjects();


function game() {

    if (count == 40) {
        season = "";
    } else if (count <= 10) {
        season = "Գարուն";
    } else if (count > 10 && count <= 20) {
        season = "Ամառ";
    } else if (count > 20 && count <= 30) {
        season = "Աշուն";
    } else if (count > 30 && count <= 40) {
        season = "Ձմեռ";
    }

    count++;


    
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }

    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].move();
            grassEaterArr[i].eat();
            grassEaterArr[i].mul();
            grassEaterArr[i].die();
        }
    }

    
    if (PredatorArr[0] !== undefined) {
        for (var i in PredatorArr) {
            PredatorArr[i].move();
            PredatorArr[i].eat();
            PredatorArr[i].mul();
            PredatorArr[i].die();
        }
    }

    if (HunterArr[0] !== undefined) {
        for (var i in HunterArr) {
             HunterArr[i].move();
             HunterArr[i].kill();
             HunterArr[i].mul();
             HunterArr[i].die();
        }
     }

    if (WerewolfArr[0] !== undefined) {
        for (var i in WerewolfArr) {
            WerewolfArr[i].move();
            WerewolfArr[i].kill();
            WerewolfArr[i].mul();
            WerewolfArr[i].die();
        }
    }

    const sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCount: grassEaterHashiv,
        predatorCount: predatorHashiv,
        hunterCount: hunterHashiv,
        werewolfCount: werewolfHashiv,
        countCounter: season
    };

    io.sockets.emit("data", sendData);
}

setInterval(game, 1000)
