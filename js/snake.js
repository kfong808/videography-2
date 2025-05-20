const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const box = 20; // Size of one block (snake or food)
const canvasSize = canvas.width; // Canvas width and height
let speed = 100; // Snake speed (ms per frame)

// Initial snake and food
let snake = [{ x: box * 5, y: box * 5 }];
let food = { x: getRandomPosition(), y: getRandomPosition() };
let direction = 'RIGHT';
let score = 0;

// Event listener for keyboard input
document.addEventListener('keydown', changeDirection);

// Main game loop
let game = setInterval(draw, speed);

function draw() {
    // Clear the canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Draw the snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'green' : 'lime';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Move the snake
    let head = { ...snake[0] }; // Copy the head of the snake
    if (direction === 'UP') head.y -= box;
    if (direction === 'DOWN') head.y += box;
    if (direction === 'LEFT') head.x -= box;
    if (direction === 'RIGHT') head.x += box;

    // Check if the snake eats food
    if (head.x === food.x && head.y === food.y) {
        food = { x: getRandomPosition(), y: getRandomPosition() }; // Generate new food
        score++;
    } else {
        snake.pop(); // Remove the tail
    }

    // Add the new head
    snake.unshift(head);

    // Check for collisions (walls or self)
    if (head.x < 0 || head.y < 0 || head.x >= canvasSize || head.y >= canvasSize || isCollision(head, snake)) {
        clearInterval(game); // Stop the game
        alert(`Game Over! Your score: ${score}`);
    }
}

// Change direction based on arrow keys
function changeDirection(event) {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
}

// Get a random position for food
function getRandomPosition() {
    return Math.floor(Math.random() * (canvasSize / box)) * box;
}

// Check for collision with the snake itself
function isCollision(head, snake) {
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}