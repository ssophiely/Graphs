import React, { useEffect, useRef, useState } from "react";
import { generateCoordinates } from "../../funcs/generateCoords";

export default function GraphComponent({ headers, data }) {
  const canvasRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedVertex, setSelectedVertex] = useState(null);
  const [vertexes, setVertexes] = useState([]);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [names, setNames] = useState(headers);

  const drawCircle = (vert, ctx) => {
    ctx.beginPath();
    ctx.arc(vert.x, vert.y, 20, 0, Math.PI * 2); // придумать расположение
    ctx.fillStyle = "blue";
    ctx.lineWidth = 2;
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.font = "13px Serif";
    ctx.fillText(vert.label, vert.x, vert.y - vert.radius - 4);
    ctx.closePath();
  };

  useEffect(() => {
    // из таблицы удалили строку
    if (headers.length < names.length) {
      let newVertexes = headers.map((h, ind) => {
        if (h !== "") {
          const vertex = vertexes.find((v) => v.label === h);
          if (vertex) {
            vertex.id = ind;
            return vertex;
          }
          console.log("error!");
        }
        return null;
      });
      setNames(headers);
      setVertexes(newVertexes.filter((el) => el !== null));
      console.log(newVertexes)
      return;
    }

    let newVertexes = headers.map((h, ind) => {
      if (h !== "") {
        const vertex = vertexes.find((v) => v.id === ind);
        if (vertex) {
          vertex.label = h;
          return vertex;
        }
        let [xc, yc] = generateCoordinates(canvasRef.current, vertexes);
        return {
          label: h,
          x: xc,
          y: yc,
          radius: 20,
          id: ind,
        };
      }
      return null;
    });
    setVertexes(newVertexes.filter((el) => el !== null));
    setNames(headers);
  }, [headers, data]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    vertexes.forEach((item) => {
      drawCircle(item, ctx);
    });
  }, [vertexes]);

  const handleMouseUp = () => {
    setIsDragging(false);
    setSelectedVertex(null);
  };

  const handleMouseDown = (e) => {
    const mousePos = getMousePos(canvasRef.current, e);
    console.log(mousePos, vertexes);
    const clickedCircle = vertexes.find((circle) => {
      return (
        (mousePos.x - circle.x) ** 2 + (mousePos.y - circle.y) ** 2 <=
        circle.radius ** 2
      );
    });
    console.log(clickedCircle);
    if (clickedCircle) {
      setIsDragging(true);
      setSelectedVertex(clickedCircle);
      setOffset({
        x: mousePos.x - clickedCircle.x,
        y: mousePos.y - clickedCircle.y,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && selectedVertex) {
      const mousePos = getMousePos(canvasRef.current, e);
      const newCircles = vertexes.map((circle) => {
        if (circle.label === selectedVertex.label) {
          const newX = mousePos.x - offset.x;
          const newY = mousePos.y - offset.y;
          // Проверка границ
          const radius = circle.radius;
          if (newX - radius < 0) return { ...circle, x: radius };
          if (newY - radius < 0) return { ...circle, y: radius };
          if (newX + radius > canvasRef.current.width)
            return { ...circle, x: canvasRef.current.width - radius };
          if (newY + radius > canvasRef.current.height)
            return { ...circle, y: canvasRef.current.height - radius };

          return { ...circle, x: newX, y: newY };
        }
        return circle;
      });

      setVertexes(newCircles);
    }
  };

  const getMousePos = (canvas, evt) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  };

  return (
    <canvas
      ref={canvasRef}
      width="880"
      height="600"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
}
