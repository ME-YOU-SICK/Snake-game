document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-canvas');
  const context = canvas.getContext('2d');

  const gridSize = 20;
  const width = canvas.width;
  const height = canvas.height;

  let snake = [{ x: 200, y: 200 }];
  let dx = gridSize;
  let dy = 0;

  function drawRect(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x, y, gridSize, gridSize);
    context.strokeStyle = '#000';
    context.strokeRect(x, y, gridSize, gridSize);
  }

  function drawSnake() {
    snake.forEach(segment => {
      drawRect(segment.x, segment.y, '#00ff00');
    });
  }

  function clearCanvas() {
    context.clearRect(0, 0, width, height);
  }

  function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    snake.pop();
  }

  function update() {
    clearCanvas();
    drawSnake();
    moveSnake();
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

  setInterval(update, 100);
  document.addEventListener('keydown', handleKeyPress);
});
