function setup() {

    var socket = io();

    var side = 30;

    var matrix = [];

    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let hunterCountElement = document.getElementById('hunterCount');
    let werewolfCountElement = document.getElementById('werewolfCount');

    var countCountElement = document.getElementById('season');

    
    socket.on("data", drawCreatures);

    function drawCreatures(data) {
    
        
        matrix = data.matrix;
        grassEaterCountElement.innerText = data.grassCounter;
        grassCountElement.innerText = data.grassEaterCount;
        predatorCountElement.innerText = data.predatorCount;
        hunterCountElement.innerText = data.hunterCount;
        werewolfCountElement.innerText = data.werewolfCount;
        countCountElement.innerText = data.countCounter;

        createCanvas(matrix[0].length * side, matrix.length * side)
        
        background('#acacac');
        
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    fill("green");
                } else if (matrix[i][j] == 2) {
                    fill("yellow");
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                } else if (matrix[i][j] == 3) {
                    if(data.countCounter == "Winter"){
                        fill("white");
                    }
                    else if(data.countCounter == "Summer"){
                        fill("orange");
                    }
                    fill('red');
                } else if (matrix[i][j] == 4) {
                    fill('black');
                } else if (matrix[i][j] == 5) {
                     if (data.countCounter == "Autumn"){
                        fill("white");
                    }
                    else if (data.countCounter == "Spring"){
                        fill("pink");
                    }
                    else{
                        fill('purple');
                    }
                    
                }
                rect(j * side, i * side, side, side);
            }
        }
    }
}