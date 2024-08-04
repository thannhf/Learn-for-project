const cvs = document.getElementById('canvas');
const ctx = cvs.getContext("2d");

// images to be drawn
const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();
const score = new Image();
const gameover = new Image();

// the bird x, y
let birdX = 10;
let birdY = 150;

// the score
let scoreText = 0;
const getScore = (score) => {
    if(score < 10) {
        scoreMusic.play();
        return score;
    } else {
        switch(score) {
            case 10:
                return 0
            default:
                return 1;
        }
    }
}

// effects
const flyMusic = new Audio();
const scoreMusic = new Audio();
const hurt = new Audio();

flyMusic.src="effects/fly.mp3";
scoreMusic.src="effects/score.mp3";
hurt.src="effects/falling.wav";

// resources
bird.src = "img/bluebird-upflap.png";
bg.src="img/background.png";
fg.src="img/fg.png";
pipeNorth.src="img/pipeNorth.png";
pipeSouth.src = "img/pipeSouth.png";
score.src="img/score/" + scoreText + ".png";
gameover.src="img/gameover.png";

// the game state
let finish = false;

// the event action to be executed
const mvUp = (e) => {
    birdY -= 25;
    flyMusic.play();
}

// drawing images
ctx.drawImage(bg, 0, 0);
ctx.drawImage(pipeNorth, 130, 0);
ctx.drawImage(pipeSouth, 130, 330);
ctx.drawImage(bird, birdX, birdY);

// pipes
let pipe = [
    {
        x:cvs.width,
        y:0
    }
];
let ground = [
    {
        x:0,
        y:cvs.height - fg.height
    }
]

// the flap
const moveBird = () => {
    setTimeout(()=>{bird.src="img/bluebird-midflap.png"},200)
    setTimeout(()=>{bird.src="img/bluebird-downflap.png"},300)
    setTimeout(()=>{bird.src="img/bluebird-upflap.png"},400)
}
moveBird();
const MB=setInterval(moveBird,600);
//
const startGame = () => {
    // the jump eventListener
    document.addEventListener("keyup", mvUp);
    if(!finish) {
        // drawing the background image
        ctx.save();
        ctx.drawImage(bg, 0, -290);
        // adding pipes
        for(let i in pipe) {
            ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
            ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + pipeNorth.height + 85);
            pipe[i].x -= 1.2;
            if(Math.floor(pipe[i].x) == 344) {
                pipe.push(
                    {
                        x:cvs.width,
                        y:Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
                    }
                )
            }

            if (birdX + bird.width >= pipe[i].x && birdX <= pipe[i].x + pipeNorth.width && (birdY <= pipe[i].y + pipeNorth.height || birdY + bird.height >= pipe[i].y + pipeNorth.height + 85) || birdY + bird.height >= cvs.height - fg.height) {
                finish = true;
            }

            if(Math.floor(pipe[i].x) == birdX-bird.width) {
                scoreText++;
                score.src="img/score/"+getScore(scoreText)+".png";
            }
        }

        // ground
        for(let i in ground) {
            ctx.drawImage(fg,ground[i].x, cvs.height - fg.height);
            ctx.drawImage(fg, ground[i].x + fg.width, cvs.height - fg.height);

            ground[i].x--;
            if(ground[i].x == -100) {
                ground.push(
                    {
                        x:0,
                        y:cvs.height-fg.height
                    }
                )
            }
        }

        // the movement of the bird
        birdY++;
        // drawing the images
        ctx.rotate(0)
        ctx.drawImage(bird, birdX,birdY);
        ctx.restore()
        ctx.drawImage(score, 240, 120);
        requestAnimationFrame(startGame);
    } else {
        // in case of "game over"
        hurt.play();
        ctx.drawImage(gameover, 150, 150);
        clearInterval(MB);
        //to restart the game
        document.addEventListener("keyup",()=> {
            location.reload();
        })
    }
}
// to start the game
startGame();