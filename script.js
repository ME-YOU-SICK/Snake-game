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

  function handleMouseMove(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const headX = snake[0].x;
    const headY = snake[0].y;

    if (mouseX > headX && dx !== -gridSize) {
      dx = gridSize;
      dy = 0;
    } else if (mouseX < headX && dx !== gridSize) {
      dx = -gridSize;
      dy = 0;
    }

    if (mouseY > headY && dy !== -gridSize) {
      dx = 0;
      dy = gridSize;
    } else if (mouseY < headY && dy !== gridSize) {
      dx = 0;
      dy = -gridSize;
    }
  }

  setInterval(update, 100);
  canvas.addEventListener('mousemove', handleMouseMove);
});
