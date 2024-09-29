const attemptsLimit = 1000;
const radius = 20;

export function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

export function generateCoordinates(canvas, circles) {
  let attempts = 0;

  while (attempts < attemptsLimit) {
    attempts++;
    const x = Math.random() * (canvas.width - 2 * radius) + radius;
    const y = Math.random() * (canvas.height - 2 * radius) + radius;

    const newCircle = { x, y, radius };

    if (!isOverlapping(newCircle, circles)) {
      return [x, y];
    }
  }

  return [null, null];
}

function isOverlapping(newCircle, circles) {
  for (const circle of circles) {
    const dx = newCircle.x - circle.x;
    const dy = newCircle.y - circle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < newCircle.radius + circle.radius) {
      return true; // круги перекрываются
    }
  }
  return false; // круги не перекрываются
}
