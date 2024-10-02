// отрисовка элементов ------------------------------------------------------------------------
// рисуем круг
const drawCircle = (vert, ctx) => {
  ctx.beginPath();
  ctx.arc(vert.x, vert.y, 20, 0, Math.PI * 2);
  ctx.fillStyle = vert.fillStyle;
  ctx.lineWidth = 2;
  ctx.fill();

  ctx.fillStyle = "black";
  ctx.font = "bold 16px Serif";
  ctx.fillText(vert.label, vert.x - 10, vert.y);
  ctx.closePath();
};

// рисуем стрелку
const drawArrow = (circle1, circle2, weight, ctx) => {
  if (weight === 0) {
    return;
  }
  if (circle1 && circle2) {
    const dx = circle2.x - circle1.x;
    const dy = circle2.y - circle1.y;
    const angle = Math.atan2(dy, dx);

    // Позиции конечных точек стрелки
    const startX = circle1.x + Math.cos(angle) * circle1.radius;
    const startY = circle1.y + Math.sin(angle) * circle1.radius;
    const endX = circle2.x - Math.cos(angle) * circle2.radius;
    const endY = circle2.y - Math.sin(angle) * circle2.radius;

    // Рисуем дугу
    ctx.beginPath();
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 1;
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo((startX + endX) / 2, startY, endX, endY); // искажение для формирования дуги
    ctx.stroke();

    // Рисуем стрелку
    const arrowSize = 12;
    ctx.save();
    ctx.translate(endX, endY);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(-arrowSize, -arrowSize / 2);
    ctx.lineTo(0, 0);
    ctx.lineTo(-arrowSize, arrowSize / 2);
    ctx.fillStyle = "grey";
    ctx.fill();
    ctx.restore();

    // текст
    ctx.font = "bold 22px Serif";
    ctx.fillStyle = "grey";

    const controlX = (startX + endX) / 2;
    const controlY = startY;
    const offset = 40;
    const textX =
      endX -
      (offset * (endX - controlX)) /
        Math.hypot(endX - controlX, endY - controlY);
    const textY =
      endY -
      (offset * (endY - controlY)) /
        Math.hypot(endX - controlX, endY - controlY);
    ctx.fillText(weight, textX, textY);
  }
};

// рисуем свечение для стрелки
const drawArrowWithShadow = (circle1, circle2, weight, ctx) => {
  if (weight === 0) {
    return;
  }
  if (circle1 && circle2) {
    const dx = circle2.x - circle1.x;
    const dy = circle2.y - circle1.y;
    const angle = Math.atan2(dy, dx);

    // Позиции конечных точек стрелки
    const startX = circle1.x + Math.cos(angle) * circle1.radius;
    const startY = circle1.y + Math.sin(angle) * circle1.radius;
    const endX = circle2.x - Math.cos(angle) * circle2.radius;
    const endY = circle2.y - Math.sin(angle) * circle2.radius;

    // Рисуем дугу
    ctx.beginPath();
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 0;
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo((startX + endX) / 2, startY, endX, endY); // искажение для формирования дуги

    // Настройка стиля для свечения
    ctx.shadowColor = "rgba(139, 0, 0, 1)"; // Цвет свечения (например, золотистый)
    ctx.shadowBlur = 13; // Размытие
    ctx.shadowOffsetX = 0; // Смещение по X
    ctx.shadowOffsetY = 0; // Смещение по Y
    ctx.stroke();

    ctx.shadowColor = "transparent";
  }
};

export { drawArrow, drawCircle, drawArrowWithShadow };
