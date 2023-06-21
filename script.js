document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-canvas');
  const context = canvas.getContext('2d');

  const gridSize = 20;
  const width = 600;
  const height = 400;

  let snake = [{ x: 200, y: 200 }];
  let food = {};
  let dx = gridSize;
  let dy = 0;
  let score = 0;

  function createFood() {
    food = {
      x: Math.floor(Math.random() * (width / gridSize)) * gridSize,
      y: Math.floor(Math.random() * (height / gridSize)) * gridSize
    };
  }

  function drawSnake() {
    snake.forEach((segment, index) => {
      const gradient = context.createLinearGradient(segment.x, segment.y, segment.x + gridSize, segment.y + gridSize);
      gradient.addColorStop(0, index === 0 ? '#ffaa00' : '#ffd700');
      gradient.addColorStop(1, index === 0 ? '#ffdd55' : '#ffd700');

      context.fillStyle = gradient;
      context.fillRect(segment.x, segment.y, gridSize, gridSize);
      context.strokeStyle = '#000';
      context.strokeRect(segment.x, segment.y, gridSize, gridSize);
    });
  }

  function drawFood() {
    context.fillStyle = '#ff0000';
    context.fillRect(food.x, food.y, gridSize, gridSize);
    context.strokeStyle = '#000';
    context.strokeRect(food.x, food.y, gridSize, gridSize);
  }

  function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score++;
      createFood();
    } else {
      snake.pop();
    }
  }

  function clearCanvas() {
    context.clearRect(0, 0, width, height);
  }

  function drawScore() {
    context.fillStyle = '#fff';
    context.font = '20px Arial';
    context.fillText(`Score: ${score}`, 10, 20);
  }

  function gameOver() {
    clearInterval(gameLoop);
    context.fillStyle = '#fff';
    context.font = '40px Arial';
    context.fillText('Game Over', width / 2 - 100, height / 2);
  }

  function checkCollision() {
    const head = snake[0];
    if (
      head.x < 0 ||
      head.x >= width ||
      head.y < 0 ||
      head.y >= height ||
      snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
      gameOver();
    }
  }

  function update() {
    clearCanvas();
    drawSnake();
    drawFood();
    drawScore();
    moveSnake();
    checkCollision();
  }

  function handleKeyPress(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;

    if (keyPressed === LEFT_KEY && dx !== gridSize) {
      dx = -gridSize;
      dy = 0;
    }

    if (keyPressed === RIGHT_KEY && dx !== -gridSize) {
      dx = gridSize;
      dy = 0;
    }

    if (keyPressed === UP_KEY && dy !== gridSize) {
      dx = 0;
      dy = -gridSize;
    }

    if (keyPressed === DOWN_KEY && dy !== -gridSize) {
      dx = 0;
      dy = gridSize;
    }
  }

  createFood();
  const gameLoop = setInterval(update, 100);
  document.addEventListener('keydown', handleKeyPress);
});
