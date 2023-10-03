// Iteration 1: Declare variables required for this game
const body=document.getElementById("game-body")
const $lives=document.getElementById("lives")
var sec=document.getElementById("timer").textContent;
console.log(sec);
var zombieId=0;
const img=[
    "zombie-1.png",
    "zombie-2.png",
    "zombie-3.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png"
];
// Iteration 1.2: Add shotgun sound
const expaudio=new Audio("./assets/shotgun.wav");
expaudio.volume=0.2;
body.onclick=()=>{
    expaudio.pause()
    expaudio.currentTime=0;
    expaudio.play()
}

// Iteration 1.3: Add background sound
const backgroundaudio=new Audio("./assets/bgm.mp3")
backgroundaudio.pause()
backgroundaudio.loop=true;

// Iteration 1.4: Add lives
const maxlives=4;
var lives=4;
// Iteration 2: Write a function to make a zombie
function makezombie(){
    randomImage=img[getRandomInt(0,img.length)];
    body.innerHTML +=`<img src="./assets/${randomImage}" class="zombie-image" id="zombie${zombieId}"> `
    var zombie = document.getElementById("zombie" + zombieId);
    zombie.style.transform = `translateX(${getRandomInt(20, 80)}vw)`;
    zombie.style.animationDuration = `${getRandomInt(2, 6)}s`;
    zombie.onclick=()=>{
        zombieDistruct(zombie);
    }
}
// Iteration 3: Write a function to check if the player missed a zombie
// function checkCollision(zombie) {
//     if(zombie.getBoundingClientRect().top<=0){
//         lives--;
//         return true;
//     }
//     return false;
// }

function checkCollision(zombie) {
    if (zombie) {
        console.log("true");
        if(zombie.getBoundingClientRect().top<=0) {
            lives--;
            console.log(lives);
            
            return true;
        }
    }
    return false;
}





// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function zombieDistruct(zombie){
    zombie.remove();
    zombieId++;
    makezombie();
}
// Iteration 5: Creating timer
// ...

// Iteration 5: Creating timer
var timer = setInterval(function() {
    sec--;
    document.getElementById("timer").textContent = sec;

    // Get all zombie elements
    let zombies = document.querySelectorAll(".zombie-image");

    // Loop through each zombie and check for collisions
    zombies.forEach(zombie => {
        if (checkCollision(zombie)) {
            zombieDistruct(zombie);
            if (lives == 0) {
                console.log("over");
                clearInterval(timer);
                location.href = "./game-over.html";
            }
        }
    });

    if (sec == 0) {
        console.log("0");
        clearInterval(timer);
        location.href = "./win.html";
    }
}, 1000);

// ...

// var timer=setInterval(function() {
//     sec--;
//     document.getElementById("timer").textContent=sec;
//     let zombie=document.getElementById("zombie",zombieId)
//     if(checkCollision(zombie)==true){
//         zombieDistruct(zombie);
//         if (lives==0){
//             console.log("over")

//             clearInterval(timer);
//             location.href="./game-over.html"
//         }
//     }
//     if(sec==0){
//         console.log("0");
//         clearInterval(timer);
//         location.href="./win.html"
//     }
// },1000)

// Iteration 6: Write a code to start the game by calling the first zombie
makezombie()
// Iteration 7: Write the helper function to get random integer
function getRandomInt(min,max){
    min=Math.ceil(min);
    max=Math.floor(max);
    return Math.floor(Math.random()*(max-min))+min;
}