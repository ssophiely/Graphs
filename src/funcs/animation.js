import { drawPacket } from "./drawing";

// export default async function animatePackets(
//   packets,
//   ctx,
//   drawAll,
//   drawShadow
// ) {
//   const animationPromises = packets.map((packet) => {
//     const { c1, c2, distance } = packet;
//     console.log(c1, c2);
//     return animatePacket(ctx, c1, c2, drawAll, drawShadow, distance);
//   });

//   // Ждем, пока все анимации завершатся
//   await Promise.all(animationPromises);
// }

function animatePacket(packets, ctx, drawAll, drawShadow, packs) {
  return new Promise((resolve) => {
    let startTime;
    let animationDuration = 1800;
    // if (distance > 1) animationDuration += 300 * (distance - 1);

    let ts = Array.from({ length: packs }, () => 1);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      drawAll();
      drawShadow();

      for (let i = 0; i < packs; i++) {
        ts[i] = Math.min(elapsed / animationDuration, 1 + i * 0.07) - i * 0.07;
        if (ts[i] < 1 && ts[i] > 0)
          packets.forEach((p) => {
            const { c1, c2, distance } = p;
            drawPacket(ctx, c1, c2, ts[i], i + 1); // рисуем кадр
          });
      }

      if (isAnimating(ts)) {
        requestAnimationFrame(animate); // продолжаем анимацию, пока t < 1
      } else {
        drawAll();
        resolve();
      }
    };

    requestAnimationFrame(animate);
  });
}

function animatePacketRand(packets, ctx, drawAll, drawShadow) {
  return new Promise((resolve) => {
    let startTime;
    let animationDuration = 1800;

    let ts = Array.from({ length: packets.length }, () => 1);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      drawAll();
      drawShadow();

      packets.forEach((p, ind) => {
        ts[ind] =
          Math.min(elapsed / animationDuration, 1 + ind * 0.08) - ind * 0.07;
        if (ts[ind] < 1 && ts[ind] > 0) {
          const { c1, c2, number } = p;
          drawPacket(ctx, c1, c2, ts[ind], number); // рисуем кадр
        }
      });

      if (isAnimating(ts)) {
        requestAnimationFrame(animate); // продолжаем анимацию, пока t < 1
      } else {
        resolve();
      }
    };

    requestAnimationFrame(animate);
  });
}

function isAnimating(ts) {
  let f = false;
  ts.forEach((t) => {
    if (t.toFixed(10) < 1) f = true;
  });
  return f;
}

export { animatePacket, animatePacketRand };
