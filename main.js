// Get canvas HTML element
var canvas = document.getElementById('canvas');
// Get canvas 2D context
var ctx = canvas.getContext('2d');

// Make sure canvas is full width of the window
canvas.width = window.innerWidth;

// Get canvas width and height
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
// Get canvas center
var canvasCenterX = canvasWidth / 2;
var canvasCenterY = canvasHeight / 2;


// On window resize, update canvas width
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvasWidth = canvas.width;
    // log canvas width in the console
    // console.log('Canvas width: ' + canvasWidth);
    ctx.font = '100px Arial';
});

// Set text font and size
ctx.font = '100px Arial';

// Global image position coordinates as a vector [x, y]
var x = canvasCenterX;
var y = canvasCenterY;
var imagePosition = [x, y];


//Choose a random unit vector
function randomUnitVector() {
    var angle = Math.random() * 2 * Math.PI;
    return [Math.cos(angle), Math.sin(angle)];
}

// Get unit vector from non-unit vector
function getUnitVector(vector) {
    var length = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
    return [vector[0] / length, vector[1] / length];
}

// Global speed
var speed = 10;

// Global velocity vector [x, y]
var velocity = randomUnitVector();
// // Log velocity vector in the console
// console.log('Velocity: ' + velocity);
// Multiply each element of velocity by speed
velocity = velocity.map(function(element) {
    return element * speed;
});

// Change speed from input range in html
function changeSpeed() {
    speed = document.getElementById('speed').value;
    unitVelocity = getUnitVector(velocity);
    velocity = unitVelocity.map(function(element) {
        return element * speed;
    });
    // // Log speed in the console
    // console.log('Speed: ' + speed);
}

// // Log velocity vector in the console
// console.log('Velocity: ' + velocity);

// Reflect vector v on vector n
function reflect(v, n) {
    return [v[0] - 2 * v[0] * n[0] * n[0] / (n[0] * n[0] + n[1] * n[1]), v[1] - 2 * v[1] * n[1] * n[1] / (n[0] * n[0] + n[1] * n[1])];
}

// Global Emoji
var text = '💩';

// List of links to fart sounds
var fartSounds = [
    'https://www.soundjay.com/human/fart-01.mp3',
    'https://www.soundjay.com/human/fart-02.mp3',
    'https://www.soundjay.com/human/fart-03.mp3',
    'https://www.soundjay.com/human/fart-04.mp3',
    'https://www.soundjay.com/human/fart-05.mp3',
    'https://www.soundjay.com/human/fart-06.mp3',
    'https://www.soundjay.com/human/fart-07.mp3',
    'https://www.soundjay.com/human/fart-08.mp3',
]

//Game loop
function gameLoop() {  
    // // Log image position and velocity in the console
    // console.log('Image position: ' + imagePosition);
    // console.log('Velocity: ' + velocity);
    // return if image position is NaN or undefined
    if (isNaN(imagePosition[0]) || isNaN(imagePosition[1])) {
        return;
    }
    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // Update image position
    x += velocity[0];
    y += velocity[1];

    var bounce = false;

    // Check if the image is outside the canvas horizontally
    if (x > canvasWidth || x < 0) {
        // Undo x position change
        x -= velocity[0];
        // Reflect the velocity vector horizontally
        velocity = reflect(velocity, [1, 0]);
        // Update x position
        x += velocity[0];
        // Set bounce to true
        bounce = true;
    }
    // Check if the image is outside the canvas vertically
    if (y > canvasHeight || y < 0) {
        // Undo y position change
        y -= velocity[1];
        // Reflect the velocity vector vertically
        velocity = reflect(velocity, [0, 1]);
        // Update y position
        y += velocity[1];
        // Set bounce to true
        bounce = true;
    }
    // Check if the image bounced
    if (bounce) {
        // Make fart sound
        var fart = new Audio(fartSounds[Math.floor(Math.random() * fartSounds.length)]);
        fart.play();
    }
    // Update image position vector
    imagePosition = [x, y];
    // Draw text
    ctx.fillText(text, x, y);
    // Request new frame
    requestAnimationFrame(gameLoop);
}

// Start game loop when emoji is clicked
document.getElementById('emoji').addEventListener('click', function() {
    // Hide emoji
    document.getElementById('emoji').style.display = 'none';
    // Show canvas
    // document.getElementById('canvasContainer').style.display = 'block';
    document.getElementById('canvas').style.display = 'block';
    // Start game loop
    gameLoop();
});