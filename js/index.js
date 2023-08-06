//game constants & variabless
let inputDir = {x:0,y:0};
const foodsound = new Audio('../music/food.mp3');
const gameOverSound = new Audio('../music/gameover.mp3');
const movesound = new Audio('../music/move.mp3');
const music = new Audio('../music/music.mp3');
let speed = 25;
let lastPaintTime=0;
let snakearray = [
    {x:13,y:15}
] 
let food = {x:6,y:7};
let score = 0;
//Game functions


function main(ctime){
    window.requestAnimationFrame(main);
    if(((ctime-lastPaintTime)/10000)<1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
    // console.log(ctime);
}

function isCollide(snakearray){
    //if you bump into yourself
    for(let i =1;i<snakearray.length;i++){
        if(snakearray[i].x===snakearray[0].x && snakearray[i].y===snakearray[0].y)
        {
            return true;
        }
    }
    //if you bump into wall
    if(snakearray[0].x>=18 || snakearray[0].x <=0  || snakearray[0].y>=18 || snakearray[0].y <=0 ){
        return true;
    }
      
    
    return false;
}

function gameEngine(){
    music.play();
    //part 1: updating the snake array
    if(isCollide(snakearray)){
        gameOverSound.play();
        music.pause();
        alert("Game over!!!! please try again!!!");
        inputDir ={x:0,y:0};
        // alert("Game over!!!! please try again!!!");
        snakearray = [{x:13,y:15}];
        music.play();
        scorebox.innerHTML="Score: "+score;
    }
    //if you have eaten food incr score and regenerate food
    if(snakearray[0].y==food.y && snakearray[0].x==food.x){
        score+=1;
        foodsound.play();
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval)) ;
            highscorebox.innerHTML = "High Score : "+hiscoreval;
        }
        music.play();
        scorebox.innerHTML="Score: "+score;
        snakearray.unshift({x:snakearray[0].x+inputDir.x,y:snakearray[0].y+inputDir.y});
        let a = 2;
        let b = 16; 
        food = {x:Math.round(a+(b-a)*Math.random()) , y:Math.round(a+(b-a)*Math.random())};
    }
    //moving the snake
    for(let i= snakearray.length-2;i>=0;i--){
        // const element = snakearray[i];
        snakearray[i+1]={...snakearray[i]}

    }
    snakearray[0].x += inputDir.x;
    snakearray[0].y += inputDir.y;
    //part2: display render the snake and food
    //display the snake
    board.innerHTML = ""; 
    snakearray.forEach((e,index)=> {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index===0){
            snakeElement.classList.add('snake');
        }
        else
        {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //display the food
    snakearray.forEach((e,index)=> {
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
    });

}


//main logic starts here
let hiscore = localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval)) ;
}
else{
    hiscoreval = JSON.parse(hiscore);
    highscorebox.innerHTML = "High Score : "+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir = {x:0,y:1}
    movesound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y= 1;
            break;  
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y= 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y= 0;
            break;
        default:
            break;             
    }
});