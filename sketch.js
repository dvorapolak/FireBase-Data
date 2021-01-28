var ball;
var database;
var positions;


function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    database = firebase.database();
    var ballref = database.ref("ball/position");
    ballref.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref('ball/position') .set({
    "x": positions.x+x,
    "y": positions.y+y
})
}

function readPosition(data){
    positions = data.val();
    ball.x = positions.x;
    ball.y = positions.y;
}

function showError(){
    console.log("Error while connection to database")
}


