/**********************************
Missile Command
All code is in vanilla jS
**********************************/
var canvas = document.querySelector('canvas');                      // variable for canvas element
var ctx = canvas.getContext('2d');                                  // variable for context
var startGame = document.querySelector('.start-game');              // variable for "insert quarter" button
var score = 0;                                                      // initialize score to 0 for each game played
var level = { levelNum: 1, enemyMissileCount: 8, speed: 0.5};       // object with properties for each round
var scoreDisplay = document.querySelector('.score span');           // variable for score display element
var citiesDisplay = document.querySelector('.cities span');         // variable for cities display element
var levelDisplay = document.querySelector('.level span');           // variable for level display element
var reqAnimFrame = window.requestAnimationFrame       ||            // varible to store the request animation frame object
                   window.mozRequestAnimationFrame    ||
                   window.webkitRequestAnimationFrame ||
                   window.msRequestAnimationFrame     ||
                   window.oRequestAnimationFrame;
//var playerShootMissileArr = { left: [], center: [], right: [] };  // each array holds missiles (js objects) fired by user
var enemyShootMissileArr = [];                                      // one array to hold enemy missiles (js objects)
var gameOn = false;                                                 // boolean flag to indicate if game has started or not
var missileColors = ['red', 'blue', 'green',                        // when a missile explodes, it'll flash random colors from this array
                     'yellow', 'orange', 'purple', 
                     'white', 'brown'];

// blueCities is an array containing parameters that will be passed to a ctx.Rect() method to draw the 6 blue cities on screen
// and also for collision detection if an enemy missile hits a blue city
var blueCities = [
        { p1: 92,  p2: 446, p3: 44, p4: 20, middleX: 114, middleY: 456},
        { p1: 148, p2: 446, p3: 44, p4: 20, middleX: 170, middleY: 456}, 
        { p1: 204, p2: 446, p3: 44, p4: 20, middleX: 226, middleY: 456}, 
        { p1: 352, p2: 446, p3: 44, p4: 20, middleX: 374, middleY: 456}, 
        { p1: 408, p2: 446, p3: 44, p4: 20, middleX: 430, middleY: 456}, 
        { p1: 464, p2: 446, p3: 44, p4: 20, middleX: 486, middleY: 456}];

// yellowMissileRect has an object of parameters for each of the 3 yellow missile bases.  
// the parameters will be used to detect if an enemy missile has hit a yellow missile base.
var yellowMissileRect = [
    { p1: 20,  p2: 446, p3: 40, p4: 20, middleX: 40,  middleY: 456}, // yellow 0
    { p1: 280, p2: 446, p3: 40, p4: 20, middleX: 300, middleY: 456}, // yellow 1
    { p1: 540, p2: 446, p3: 40, p4: 20, middleX: 560, middleY: 456}, // yellow 2
];

// player has a total of 30 missiles.  remMissileLoc is a 2D array, 3 arrays of 10 objects each.
// each object contains a starting coordinate of where each missile will be drawn on screen.
var remMissileLoc = [];                     // array holds coordinates for remaining missiles to draw
var playerShootMissileArr = {};             // array keeps track of # of missiles fired per round (max 30)

function refillMissiles() {         
    remMissileLoc = [
        // LEFT BASE
           [{ num: 10, x: 40, y: 447},
            
            { num: 9,  x: 31, y: 452},
            { num: 8,  x: 49, y: 452},
            
            { num: 7,  x: 22, y: 457},
            { num: 6,  x: 40, y: 457},
            { num: 5,  x: 58, y: 457},
            
            { num: 4,  x: 13, y: 462},
            { num: 3,  x: 31, y: 462},
            { num: 2,  x: 49, y: 462},
            { num: 1,  x: 67, y: 462}], 
        // CENTER BASE
           [{ num: 10, x: 300, y: 447},
            
            { num: 9,  x: 291, y: 452},
            { num: 8,  x: 309, y: 452},
            
            { num: 7,  x: 282, y: 457},
            { num: 6,  x: 300, y: 457},
            { num: 5,  x: 318, y: 457},
            
            { num: 4,  x: 273, y: 462},
            { num: 3,  x: 291, y: 462},
            { num: 2,  x: 309, y: 462},
            { num: 1,  x: 327, y: 462}],
        // RIGHT BASE
           [{ num: 10, x: 560, y: 447},
            
            { num: 9,  x: 551, y: 452},
            { num: 8,  x: 569, y: 452},
            
            { num: 7,  x: 542, y: 457},
            { num: 6,  x: 560, y: 457},
            { num: 5,  x: 578, y: 457},
            
            { num: 4,  x: 533, y: 462},
            { num: 3,  x: 551, y: 462},
            { num: 2,  x: 569, y: 462},
            { num: 1,  x: 587, y: 462}]
        ];
        
        playerShootMissileArr = { left: [], center: [], right: [] };        
}

refillMissiles();                                       // draw all 30 missiles + set fired counter to 0 at start of game

// every 33.33 milliseconds, these functions will run
setInterval( function () {
    ctx.fillStyle = 'black';                            // redraw the black background of the canvas
    ctx.fillRect(0,0, canvas.width, canvas.height);
    drawHills();                                        // draw the 3 yellow missile bases
    drawCities();                                       // draw the 6 blue cities
    drawMissileInv();                                   // draw the your remaining missiles, starting with the initial 30

    ctx.beginPath();                                    // "out of bounds" line.  An enemy missile that has passed this line can't be fired at
    ctx.moveTo(0,  400);
    ctx.lineTo(600, 400);
    ctx.strokeStyle = 'white';
    ctx.stroke();
}, 1000/30);

// every second, check game status, sees if ready to move to next round -or- call game over
setInterval( function() {
    checkGameStatus();
}, 1000);

// event handler for when player clicks on "insert quarter" button
startGame.addEventListener('click', function() {
    if (startGame.classList.contains('game-on')) {              // if the button already has the CSS class, don't do anything
        // do nothing
    }
    else {                                                      // else, need to start the game
        levelDisplay.textContent = level.levelNum;              // display level #, starts at 1
        gameOn = true;                                          // set gameOn boolean flag variable to true
        gameOn = true;                                          // set gameOn boolean flag variable to true

        for (var k = 0; k < level.enemyMissileCount; k++) {     // draw the 8 enemy missiles
            drawEnemyMissile( level.speed );    
        }

        startGame.classList.add('game-on');                     // add the CSS class to start game button
    }   
})

// random number function, used to generate the start/end coordinates of enemy missiles
function randNum (min, max) {                           
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function checks if game can move on to next round -or- if game is over.  Function is called each time an enemy missile explodes.
function checkGameStatus () {   
    // if blue cities still remain...keep going to next level
    if (blueCities.length > 0 && gameOn && enemyShootMissileArr.length === 0) {     
        level.speed += 0.1;                                 // increase enemy missile speed for next level

        level.levelNum++;                                   // increment level # and update the display
        levelDisplay.textContent = level.levelNum;

        score = score + (blueCities.length * 20)            // calculate score of remaining blue cities and update display
        scoreDisplay.textContent = score;

        // alert user next round is ready to begin
        // when user clicks OK, next rounds starts with 8 new enemy missiles
        alert("All enemy missiles exploded!\nPress OK to continue to next round");
        refillMissiles();                                   // draw all 30 missiles + set fired counter to 0 at start of next round
        for (var k = 0; k < level.enemyMissileCount; k++) {
            drawEnemyMissile( level.speed );    
        }
    } 
    // if all blue cities have been destroyed, the game is over...
    else if (blueCities.length === 0 && gameOn && enemyShootMissileArr.length === 0) {
            alert("All cities destroyed!\nGame Over !!\nPress OK to start new game");       // show game over alert box
            window.location.reload();
    }
}

// this function cycles through the 6 objects in blueCities and draws 6 blue rectangles to represent cities
function drawCities () {
    for (var j = 0; j < blueCities.length; j++) {
        ctx.beginPath();
        ctx.rect(blueCities[j].p1, blueCities[j].p2, blueCities[j].p3, blueCities[j].p4);
        ctx.fillStyle = '#24FFE5';
        ctx.fill();     
    }
}

// this function draws the 3 yellow missiles bases 
function drawHills () {
    ctx.beginPath();
    ctx.moveTo(0,  466);
    ctx.lineTo(20, 446);
    ctx.lineTo(60, 446);
    ctx.lineTo(80, 466);
    ctx.lineTo(260, 466);
    ctx.lineTo(280, 446);
    ctx.lineTo(320, 446);
    ctx.lineTo(340, 466);
    ctx.lineTo(520, 466);
    ctx.lineTo(540, 446);
    ctx.lineTo(580, 446);
    ctx.lineTo(600, 466);
    ctx.closePath();
    ctx.fillStyle = "yellow";
    ctx.fill();

    ctx.beginPath();
    ctx.rect(0, 466, 600, 20);
    ctx.fillStyle = "yellow";
    ctx.fill(); 
}

// this function is given a (x,y) coordinate and draws all missiles remaining in player's inventory.
function drawRemMissile(x, y, color) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y+5);
    ctx.lineTo(x+3,y+5);
    ctx.lineTo(x+3,y+10);
    ctx.strokeStyle = color;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x,y+5);
    ctx.lineTo(x-3,y+5);
    ctx.lineTo(x-3,y+10);
    ctx.strokeStyle = color;
    ctx.stroke();   
}

// this function iterates through the remMissileLoc array and calls drawRemMissile to canvas draw missiles left for the player
function drawMissileInv(arg_location, arg_numMissile) {
    if (typeof arg_location === 'undefined') {                                              // if no location argument is providing at function call...
        for (var h = 0; h < remMissileLoc.length; h++) {                                    // this is done by the setInterval function way above...
            for (var i = 0; i < remMissileLoc[h].length; i++) {                             // this basically draws all 30 missiles at beginning of game & 
                drawRemMissile(remMissileLoc[h][i].x, remMissileLoc[h][i].y, 'red');        // remaining missiles as the game progresses
            }
        }
    }
    else {
        switch (arg_location) {                                                             // else when a location is provided, this happens when player fires a missile
            case 'left':                                                                    // if the missile was fired from the left base...
                for (var g = 0; g < remMissileLoc[0].length; g++) {                         // iterate through remMissileLoc
                    if (remMissileLoc[0][g].num === arg_numMissile) {                       // 1st missile fired = remMissileLoc[9] (10th element); 2nd missile fired = remMissileLoc[8] (9th element)
                        remMissileLoc[0].splice(10 - arg_numMissile, 1);                    // remove that element from remMissileLoc since user fired it.  Once removed, it won't be re-drawn.
                    }
                }
                break;
            case 'center':                                                                  // if missile fired from center, same as what was done for left
                for (var g = 0; g < remMissileLoc[1].length; g++) {
                    if (remMissileLoc[1][g].num === arg_numMissile) {
                        remMissileLoc[1].splice(10 - arg_numMissile, 1);
                    }
                }
                break;
            case 'right':                                                                   // if missile fired from right, same as what was done for left
                for (var g = 0; g < remMissileLoc[2].length; g++) {
                    if (remMissileLoc[2][g].num === arg_numMissile) {
                        remMissileLoc[2].splice(10 - arg_numMissile, 1);
                    }
                }
                break;
        }
    }
}

// at each level start, this function is called to draw each individual enemy missile
function drawEnemyMissile (arg_speed) {             // speed increases each level, so it's needed in function.
    var enemyOriginX = randNum(0, 600);             // origin X
    var enemyOriginY = 0;                           // origin Y will always start at 0
    var enemyDestX = randNum(0, 600);               // destination X is from our random number generator
    var enemyDestY = 446;                           // destination Y is 446, this is the top of the yellow missile bases
    
    // getMissileParams function will return object filled with missile trajectory parameters
    // arguments are origin & destination coordinates, false to indicate this is an enemy missile, and the speed needed
    var enemyMissileParam = getMissileParams(enemyDestX, enemyDestY, enemyOriginX, enemyOriginY, false, arg_speed);  
    
    // create a new missile using the Missile constructor
    // arguments are destination (x,y); step(x,y) which is an amount to draw from origin(x,y) by incrementally;
    // origin (x,y);  and a false to indicate this is an enemy missile
    var enemyShootMissile = new Missile(enemyDestX, enemyDestY, enemyMissileParam.xStep, enemyMissileParam.yStep, enemyOriginX, enemyOriginY, false);
    
    // push the new enemy missile object into the array.  Array lets us know how many enemy missiles remain on screen.  
    // once enemy missile array is empty, we can move on to the next round
    enemyShootMissileArr.push(enemyShootMissile);
    
    // call the animate method of the newest enemy missile generated.  The animate method is what draws the green enemy missiles on screen
    enemyShootMissileArr[enemyShootMissileArr.length - 1].animate();
}

// getMissileParams calculates math variables needed to help make the traveling missile appear smoothly on screen
function getMissileParams (arg_xDest, arg_yDest, arg_xOrig, arg_yOrig, arg_playerFlag, arg_speed) {
    var params = {};    // start with empty object to store our props

    // pythagorean theorm to find distance between origin and destination
    params.distance = Math.sqrt( Math.pow( (arg_xDest - arg_xOrig), 2) + Math.pow( (arg_yDest - arg_yOrig), 2));
    
    // variable to store the x distance from origin to destination
    params.xDist    = Math.abs(arg_xDest - arg_xOrig);

    // variable to store the y distance from origin to destination
    params.yDist    = Math.abs(arg_yDest - arg_yOrig);  

    // ternary statement.  If it's a player missile, step is calculated by dividing by 10, player missiles always move at same speed throughout the game.
    // If it's an enemy missile, step is calculated using whatever speed is needed for the current level.
    // step is the amount to further draw a missile line.  We'll draw on canvas starting at origin to point 1, then origin to point 2, then origin to point 3,etc....
    // each time incrementing by the value of step and continue drawing until destination (x,y) is reached.
    arg_playerFlag ? params.step = params.distance / 10 : params.step = params.distance / arg_speed;
    
    // set x-direction step based on the ternary above
    params.xStep    = params.xDist / params.step;
    
    // set y-direction step based on the ternary above
    params.yStep    = params.yDist / params.step;

    // return this object of parameters so they can be used to draw on canvas
    return params;
}

// this function checks if a player missile has hit an enemy missile.
// this function is called as the player missile is in the exploding phase. (this means as the radius increasing from 0->30)
// argument is the canvas context of the exploding player missile
function checkPlayerHitEnemy(arg_ctx) {
    for (var b = 0; b < enemyShootMissileArr.length; b++) {                                                 // iterate through the array of enemy missile objects
        if( arg_ctx.isPointInPath(enemyShootMissileArr[b].scaleX, enemyShootMissileArr[b].scaleY) ) {       // if the current (x,y) of that enemy missile is within our exploding circle
            enemyShootMissileArr[b].scaleX = 'OFF';                                                         // set the scaleX & Y (this would be stepX & Y) to string 'off'
            enemyShootMissileArr[b].scaleY = 'OFF';                                                         // 'off' will cause the drawing of enemy missile to stop           

            if (enemyShootMissileArr.length === 1) {                    // if one missile remains...
                setTimeout((function(b) {
                    return function() {
                        enemyShootMissileArr.splice(b,1);               // remove that missile element, but delay it -- fix for Firefox timing problem
                    }                    
                })(b), 500);
            }
            else {
                enemyShootMissileArr.splice(b,1);                       // otherwise remove that array element right away
            }            

            score += 10;                                                // update score (player gets 10 pts / enemy missile)
            scoreDisplay.textContent = score;
        }
    }
}

// this function checks if an enemy missile has hit either a blue city / yellow missile base
// arguments are: the array to check (blueCities / yellowMissileRect)
// destination (x,y) of the enemy missile
// radius of the explosion of the enemy missile
function checkEnemyHitBase(arg_Arr, arg_destX, arg_destY, arg_radius) { 
    for (var c = 0; c < arg_Arr.length; c++) {                      // iterate through the given array
        var xDist = Math.abs(arg_destX - arg_Arr[c].middleX);       // calculate these variables, they're used to check if collision occurs
        var yDist = Math.abs(arg_destY - arg_Arr[c].middleY);
        var deltaX = xDist - arg_Arr[c].p3/2;
        var deltaY = yDist - arg_Arr[c].p4/2;

        if ( (xDist > arg_radius + (arg_Arr[c].p3/2)) && (yDist > arg_radius + (arg_Arr[c].p4/2)) ) {  // if this, do nothing
            // do nothing
        }
        else if (xDist <= (arg_Arr[c].p3/2) && yDist <= (arg_Arr[c].p4/2)) {                            // else if this...
            if ( Math.pow(deltaX, 2) + Math.pow(deltaY, 2) <= Math.pow(arg_radius, 2) ) {               // and this... a collision occured
                if ( arg_Arr === blueCities) {                                                          // if enemy missile hit blue city
                    blueCities.splice(c, 1);                                                            // remove city from array so it won't be re-drawn
                    citiesDisplay.textContent = blueCities.length;                                      // update display of cities left on screen
                }
                else if ( arg_Arr === yellowMissileRect) {                                              // if enemy missile hit yellow missile base
                    yellowMissileRect.splice(c, 1);                                                     // remove that yellow missile base, this doesn't do anything but left for consistency
                    remMissileLoc[c] = [];                                                              // remove that yellow missile base, here the base won't be re-drawn
                    
                    switch(c) {                                                                         // once the yellow missile base is gone, player can't shoot from there anymore
                        case 0:
                            playerShootMissileArr.left.length = 20;                                     // set player's shot missile array length to something large (bigger than 10).
                            break;                                                                      // player won't be able to shoot from that base once this is set.
                        case 1:
                            playerShootMissileArr.center.length = 20;
                            break;
                        case 2:
                            playerShootMissileArr.right.length = 20;
                            break;
                    }
                }               
            }                                       
        }
    }
}

// giant missile constructor, this instantiates an object for both player & enemy missiles
// arguments: destination(x,y), step amount for (x,y), origin (x,y), and a flag indicating whether this is a player/enemy missile
function Missile (arg_xDest, arg_yDest, arg_xStep, arg_yStep, arg_xOrig, arg_yOrig, arg_playerFlag) {
    this.originX = arg_xOrig,               // set missile properties to the arguments.  step is referred to as scale in the missile object.
    this.originY = arg_yOrig,
    this.scaleX = this.originX,
    this.scaleY = this.originY,
    this.destX = arg_xDest,
    this.destY = arg_yDest,
    this.radius = 0,                                                                                // radius starts at 0 for the missile explosion
    this.deplode = function () {                                                                    // this function starts the missile's deplosion animation                   
                        if ( this.radius > 0) {                                                     // if radius hasn't reached 0, keep de-ploding...
                            ctx.beginPath();                                                        // draw the de-plosion animation with current radius
                            ctx.arc( this.destX, this.destY, this.radius, 0, 2*Math.PI, false);
                            ctx.fillStyle = missileColors[randNum(0, missileColors.length)];
                            ctx.fill();
                            this.radius -= 2;                                                       // decrement radius
                            reqAnimFrame(this.deplode.bind(this));                                  // draw next de-plosion circle at next browser frame
                        }                        
                        else if (this.radius === 0) {
                            if (!arg_playerFlag) {                                                  // enemy missiles with radius 0...
                                for (var d = 0; d < enemyShootMissileArr.length; d++ ) {            // iterate through the enemy missile array
                                    if (enemyShootMissileArr[d].originX === this.originX &&         // do a bunch of checks to make sure you match the right array element
                                        enemyShootMissileArr[d].originY === this.originY &&
                                        enemyShootMissileArr[d].destX === this.destX &&
                                        enemyShootMissileArr[d].destY === this.destY ) {
                                        
                                        if (enemyShootMissileArr.length === 1) {                    // if one missile remains...
                                            setTimeout((function(d) {
                                                return function() {
                                                    enemyShootMissileArr.splice(d,1);               // remove that missile element, but delay it -- fix for Firefox timing problem
                                                }                    
                                            })(d), 500);
                                        }
                                        else {
                                            enemyShootMissileArr.splice(d,1);                       // otherwise remove that array element right away
                                        }          
                                    }
                                }
                            } 
                        }
                    },
    this.explode = function () {                                                                        // this function starts a missile's explosion animation
                        if ( this.radius === 30) {                                                      // max radius is 30, once it's reach start the deplode animation
                            this.deplode();
                        }
                        else {                                                                          // else branch means radius is still increasing from 0 --> 30
                            ctx.beginPath();
                            ctx.arc( this.destX, this.destY, this.radius, 0, 2*Math.PI, false);         // explosion circle is drawing w/ destination(x,y) as center
                            ctx.fillStyle = missileColors[randNum(0, missileColors.length)];            // draw with a random color
                            ctx.fill();

                            if (arg_playerFlag) {                                                       // if this is a player missile...
                                checkPlayerHitEnemy(ctx);                                               // check if an exploding player missile hits any enemy missiles.
                            }
                            else if (!arg_playerFlag) {                                                     // if this is an enemy missile...
                                checkEnemyHitBase(blueCities, this.destX, this.destY, this.radius);         // check if a blue city was hit
                                checkEnemyHitBase(yellowMissileRect, this.destX, this.destY, this.radius);  // check if a yellow missile base was hit
                            }
                            this.radius += 2;                                                               // increment radius by 2
                            reqAnimFrame(this.explode.bind(this));                                          // re-draw next explosion circle with bigger radius at next browser frame
                        }
                    },
    this.animate = function () {                                                                                // animate method draws the path of the missile
                        if ( this.destX > this.originX ) {                  // if destination is to the right of the origin...
                            if (this.scaleX < this.destX) {                 // keep checking that scale < destination (means drawn missile hasn't reached destination)
                                ctx.beginPath();                            // draw the line
                                ctx.moveTo(this.originX, this.originY );
                                ctx.lineTo(this.scaleX, this.scaleY);
                                ctx.lineWidth = 2;
                                arg_playerFlag ? ctx.strokeStyle = 'red' : ctx.strokeStyle = '#25F53D';     // red for player, bright green for enemy
                                ctx.stroke();   
                                this.scaleX += arg_xStep;                                                   // increment scaleX, so next iteration we'll draw a longer line
                                arg_playerFlag ? this.scaleY -= arg_yStep : this.scaleY += arg_yStep;       // player missile needs to decrease Y, enemy missile needs to increase Y
                                reqAnimFrame(this.animate.bind(this));                                      // drawn next line on next browser frame
                            }
                            else if (this.scaleX === 'OFF') {                                               // "OFF" means enemy missile hit by player, stop drawing by doing nothing
                            }
                            else {                                                                          // else the scaleX has exceeded destinationX, so we're ready to drawn the last line that reaches destination
                                this.scaleX -= arg_xStep;                                                   // we moved too far, so need to decrease scale X by one iteration
                                arg_playerFlag ? this.scaleY += arg_yStep : this.scaleY -= arg_yStep;       // to go back; player increases Y; enemy decreases Y
                                ctx.beginPath();                                            
                                ctx.moveTo(this.scaleX, this.scaleY);                                       // drawn final line to destination
                                ctx.lineTo(this.destX, this.destY);
                                ctx.lineWidth = 2;
                                arg_playerFlag ? ctx.strokeStyle = 'red' : ctx.strokeStyle = '#25F53D';
                                ctx.stroke();
                                this.explode();                                                             // call explode to start explosion animation
                            }                           
                        }
                        else if ( this.destX < this.originX ) {     // this else if branch is same as above, except for when destination is left of the origin                  
                                if (this.scaleX > this.destX) {
                                    ctx.beginPath();
                                    ctx.moveTo(this.originX, this.originY );
                                    ctx.lineTo(this.scaleX, this.scaleY);
                                    ctx.lineWidth = 2;
                                    arg_playerFlag ? ctx.strokeStyle = 'red' : ctx.strokeStyle = '#25F53D';
                                    ctx.stroke();
                                    this.scaleX -= arg_xStep;
                                    arg_playerFlag ? this.scaleY -= arg_yStep : this.scaleY += arg_yStep;   
                                    reqAnimFrame(this.animate.bind(this));  
                                }
                                else if (this.scaleX === 'OFF') {
                                }
                                else {                                  
                                    this.scaleX += arg_xStep;
                                    arg_playerFlag ? this.scaleY += arg_yStep : this.scaleY -= arg_yStep;   
                                    ctx.beginPath();
                                    ctx.moveTo(this.scaleX, this.scaleY);
                                    ctx.lineTo(this.destX, this.destY);
                                    ctx.lineWidth = 2;
                                    arg_playerFlag ? ctx.strokeStyle = 'red' : ctx.strokeStyle = '#25F53D';
                                    ctx.stroke();
                                    this.explode();
                                }
                        }
                        else if ( this.destX === this.originX ) {                           // in the rare event a destination x = origin x
                                if (this.scaleY > this.destY) {
                                    ctx.beginPath();
                                    ctx.moveTo(this.originX, this.originY );
                                    ctx.lineTo(this.originX, this.scaleY);                  // only care about incrementing in Y direction
                                    ctx.lineWidth = 2;
                                    arg_playerFlag ? ctx.strokeStyle = 'red' : ctx.strokeStyle = '#25F53D';
                                    ctx.stroke();
                                    arg_playerFlag ? this.scaleY -= arg_yStep : this.scaleY += arg_yStep;   
                                    reqAnimFrame(this.animate.bind(this));  
                                }
                                else if (this.scaleY === 'OFF') {
                                }
                                else {                                  
                                    arg_playerFlag ? this.scaleY += arg_yStep : this.scaleY -= arg_yStep;   // go back one iteration
                                    ctx.beginPath();
                                    ctx.moveTo(this.originX, this.scaleY);
                                    ctx.lineTo(this.destX, this.destY);
                                    ctx.lineWidth = 2;
                                    arg_playerFlag ? ctx.strokeStyle = 'red' : ctx.strokeStyle = '#25F53D';
                                    ctx.stroke();
                                    this.explode();
                                }
                        }
                    }
}

// event handler for when player clicks on canvas & fired a missile
canvas.addEventListener('click', function(e) {
    var playerDestX = e.pageX - this.offsetLeft;        // calculate destination (x,y) based on where user clicks their mouse
    var playerDestY = e.pageY - this.offsetTop;
    var playerOriginX;                                  // player origin X is to be determined below...
    var playerOriginY = 446;                            // player origin Y is always 446

    if ( playerDestX >= 0 && playerDestX < 200 && playerDestY < 400) {                                                  // if user clicks on left 3rd of canvas...
        playerOriginX = 40;                                                                                             // set origin x to 40
        var playerShootMissileParam = getMissileParams(playerDestX, playerDestY, playerOriginX, playerOriginY, true);   // get parameters for player's missile

        if (playerShootMissileArr.left.length < 10 && gameOn) {                                                         // <10 means player still has remaining missiles to be fired
            var playerShootMissile = new Missile(playerDestX, playerDestY,                                              // construct new missile object 
                                             playerShootMissileParam.xStep, playerShootMissileParam.yStep, 
                                             playerOriginX, playerOriginY, true);
            playerShootMissileArr.left.push(playerShootMissile);                                                        // push into player's shot missile array
            drawMissileInv('left', playerShootMissileArr.left.length);                                                  // update the drawing of remaining missile inventory
            playerShootMissileArr.left[playerShootMissileArr.left.length-1].animate();                                  // call animate method
        }
    }
    else if ( playerDestX >= 200 && playerDestX < 400  && playerDestY < 400) {                                          // same as above except case of middle 3rd of canvas
        playerOriginX = 300;
        var playerShootMissileParam = getMissileParams(playerDestX, playerDestY, playerOriginX, playerOriginY, true);

        if (playerShootMissileArr.center.length < 10 && gameOn) {
            var playerShootMissile = new Missile(playerDestX, playerDestY, 
                                             playerShootMissileParam.xStep, playerShootMissileParam.yStep, 
                                             playerOriginX, playerOriginY, true);
            playerShootMissileArr.center.push(playerShootMissile);
            drawMissileInv('center', playerShootMissileArr.center.length);
            playerShootMissileArr.center[playerShootMissileArr.center.length-1].animate();  
        }
    }
    else if ( playerDestX >= 400 && playerDestX <= 600  && playerDestY < 400) {                                         // same as above except case of right 3rd of canvas
        playerOriginX = 560;
        var playerShootMissileParam = getMissileParams(playerDestX, playerDestY, playerOriginX, playerOriginY, true);

        if (playerShootMissileArr.right.length < 10 && gameOn) {
            var playerShootMissile = new Missile(playerDestX, playerDestY, 
                                             playerShootMissileParam.xStep, playerShootMissileParam.yStep, 
                                             playerOriginX, playerOriginY, true);
            playerShootMissileArr.right.push(playerShootMissile);
            drawMissileInv('right', playerShootMissileArr.right.length);
            playerShootMissileArr.right[playerShootMissileArr.right.length-1].animate();    
        }
    }  

    //console.log(remMissileLoc[0].length + ' ' + remMissileLoc[1].length + ' ' + remMissileLoc[2].length);
    //console.log(playerShootMissileArr);
})