let direction={x:0,y:0};
let speed=10;
let score=0;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
];


food={ x:9, y:7};




//Functions
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((ctime-lastPaintTime)/1000  <  1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //if bump into yourself
    for(let i = 1;i<snakeArr.length;i++){
        if(snake[i].x && snake[0].x && snake[i].y==snake[0].y){
            return true;
        }
    }
    //wall
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
        return true;
    }
    return false;
}


function gameEngine(){
    //1  updating snake and food
    if(isCollide(snakeArr)){
        direction = {x:0 , y:0};
        alert("Game over. Please press any key to play again");
        snakeArr=[{ x:13,y:15}];
        score=0;
    
    }
    //Eaten food increase snake and regenarate food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        score+=1;
        if(score>hiscoreval){
            hiscoreval= score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: "+hiscoreval;
        }
        scoreBox.innerHTML="Score: "+ score;
        snakeArr.unshift({x:snakeArr[0].x + direction.x, y:snakeArr[0].y + direction.y});
        let a=2;
        let b=16;
        food = {x:Math.round(a + (b-a)* Math.random()),y:Math.round(a+ (b-a)*Math.random())}
    }
    //moving snake
    for(let  i =snakeArr.length - 2;i>=0;i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    
    snakeArr[0].x += direction.x;
    snakeArr[0].y +=direction.y;


    //snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}
 //main Logic
 let hiscore = localStorage.getItem("hiscore");
 if(hiscore===null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
 }
 //i changed Hiscore to High Score here
 else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: " + hiscore;
 }

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    direction = {x:0 , y:1}
    switch (e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            direction.x=0;
            direction.y=-1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            direction.x=0;
            direction.y=1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            direction.x=-1;
            direction.y=0;
            break;
        
        case "ArrowRight":
            console.log("ArrowRight");
            direction.x=1;
            direction.y=0;
            break;
        default:
            break;
        
    }
});