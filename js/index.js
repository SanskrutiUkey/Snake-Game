// Game Constants nad Variables
let inputDir = { x: 0, y: 0 }
const foodSound = new Audio("Food_Music.mp3")
const gameOverSound = new Audio("Game_Over_Music.mp3")
const bgSound = new Audio("Bg_Music.mp3")
const moveSound = new Audio("Move_Music.mp3")
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }]
let food = { x: 6, y: 7 }
// GameLoop -----> Screen ko baar baar paint kiya jata hai
// if u r rendering anuimation so plz use request animation

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(sArr) {
    // If u bump into urself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
            return true;
        }
    }
    // If u bump into wall
    if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    // Part 1: Updating the snake array and food
    // x ---> column & y ----> row

    if (isCollide(snakeArr)) {
        gameOverSound.play();
        bgSound.pause();
        inputDir = { x: 0, y: 0 }
        alert("Game Over. Press any key to play again!")
        snakeArr = [{ x: 13, y: 15 }]
        bgSound.play()
        score = 0;
    }

    // If u have eaten food, inscrease score and regenrate food
    if (food.x === snakeArr[0].x && food.y === snakeArr[0].y) {
        foodSound.play()
        score += 1
        if (score > highscoreval) {
            highscoreval = score
            localStorage.setItem("highscore", JSON.stringify(highscoreval))
            highscoreBox.innerHTML = "High Score : " + highscoreval
        }
        scoreBox.innerHTML = "Score : " + score
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2, b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        // {...snakeArr[i]}  yeh pura ek new object hai jisko snakeArr[i+1] point kr rha hai
        snakeArr[i + 1] = { ...snakeArr[i] }
    }

    // This for the head --> puri body ek ek segment samne aayegi pr head kaha jayega?? To vo yaha jayega
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake array and food

    // Display the snake
    // const board = document.getElementById("board")
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if (index === 0) {
            snakeElement.classList.add('head')
        } else {
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);
    })

    // Display the food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}

// Main Logic starts here 
bgSound.play()
let highscore = localStorage.getItem("highscore");
let highscoreval;
if (highscore === null) {
    highscoreval = 0
    localStorage.setItem("highscore", JSON.stringify(highscoreval))
}
else {
    highscoreval = JSON.parse(highscore)
    highscoreBox.innerHTML = "High Score : " + highscoreval
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    moveSound.play();
    switch (e.key) {
        case 'ArrowUp':
            inputDir.x = 0
            inputDir.y = -1
            // console.log('ArrowUp');
            break;
        case 'ArrowDown':
            inputDir.x = 0
            inputDir.y = 1
            // console.log('ArrowDown');
            break;
        case 'ArrowLeft':
            inputDir.x = -1
            inputDir.y = 0
            // console.log('ArrowLeft');
            break;
        case 'ArrowRight':
            inputDir.x = 1
            inputDir.y = 0
            // console.log('ArrowRight');
            break;

    }
})