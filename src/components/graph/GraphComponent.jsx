import React, { useEffect, useRef, useState } from "react";
import { generateCoordinates } from "../../funcs/generateCoords";
import VertexContextMenu from "./VertexContextMenu.jsx";

export default function GraphComponent({
  headers,
  setHeaders,
  inpData,
  start,
  end,
  setStart,
  setEnd,
}) {
  const canvasRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedVertex, setSelectedVertex] = useState(null);
  const [vertexes, setVertexes] = useState([]);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [names, setNames] = useState(headers);
  const [data, setData] = useState(inpData);

  const [context, setContext] = React.useState(false);
  const [xyPosition, setxyPosition] = React.useState({ x: 0, y: 0 });
  const [clickedVertex, setClickedVertex] = useState(null);
  const [menuOn, setMenuOn] = useState(true);

  // контекстное меню
  const showContext = (event, y) => {
    setContext(false);
    const positionChange = {
      x: event.pageX,
      y: event.pageY,
    };
    setxyPosition(positionChange);
    setContext(true);
  };

  const hideContext = (event) => {
    setContext(false);
  };

  function handleClick(e) {
    const mousePos = getMousePos(canvasRef.current, e);
    const clickedCircle = vertexes.find((circle) => {
      return (
        (mousePos.x - circle.x) ** 2 + (mousePos.y - circle.y) ** 2 <=
        circle.radius ** 2
      );
    });
    if (clickedCircle) {
      if (!menuOn) {
        hideContext(e);
        setMenuOn(true);
        return;
      }
      setClickedVertex(clickedCircle);
      showContext(e);
    } else {
      hideContext(e);
      setMenuOn(true);
    }
  }

  // выбор вершины начальной
  const handleStart = () => {
    setVertexes(
      vertexes.map((v) => {
        if (v.label === clickedVertex.label) {
          if (v.label === end) {
            setEnd("");
          }
          setStart(v.label);
          return { ...v, fillStyle: "green" };
        }
        if (v.label === end) {
          return { ...v, fillStyle: "red" };
        }
        return { ...v, fillStyle: "blue" };
      })
    );
  };

  // выбор вершины конечной
  const handleEnd = () => {
    setVertexes(
      vertexes.map((v) => {
        if (v.label === clickedVertex.label) {
          if (v.label === start) {
            setStart("");
          }
          setEnd(v.label);
          return { ...v, fillStyle: "red" };
        }
        if (v.label === start) {
          return { ...v, fillStyle: "green" };
        }
        return { ...v, fillStyle: "blue" };
      })
    );
  };

  // удаление вершины
  const removeVertex = () => {
    const h = headers.map((x) => {
      if (x === clickedVertex.label) return "";
      else return x;
    });
    setHeaders(h);
  };

  // рисуем круг
  const drawCircle = (vert, ctx) => {
    ctx.beginPath();
    ctx.arc(vert.x, vert.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = vert.fillStyle;
    ctx.lineWidth = 2;
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.font = "13px Serif";
    ctx.fillText(vert.label, vert.x - 25, vert.y - vert.radius - 4);
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
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo((startX + endX) / 2, startY, endX, endY); // искажение для формирования дуги
      ctx.stroke();

      // Рисуем стрелку
      const arrowSize = 15;
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

      ctx.font = "bold 25px Serif";
      ctx.fillStyle = "#FF8C00";

      const toX = circle2.x + 100 * Math.cos(angle);
      const toY = circle2.y + 100 * Math.sin(angle);
      const midWeightX = (circle1.x + toX) / 2 + (circle1.y - circle2.y) / 10;
      const midWeightY = (circle1.y + toY) / 2 + (circle2.x - circle1.x) / 10;
      ctx.fillText(weight, midWeightX, midWeightY);
    }
  };

  useEffect(() => {
    if (headers.length !== names.length) {
      let newVertexes = headers.map((h, ind) => {
        if (h !== "") {
          const vertex = vertexes.find((v) => v.label === h);
          if (vertex) {
            vertex.id = ind;
            return vertex;
          }
          console.log(names, h)
          if (!names.includes(h)) {
            let [xc, yc] = generateCoordinates(canvasRef.current, vertexes);
            return {
              label: h,
              x: xc,
              y: yc,
              radius: 20,
              id: ind,
              fillStyle: "blue",
            };
          }
        }
        return null;
      });
      setNames(headers);
      setVertexes(newVertexes.filter((el) => el !== null));
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
          fillStyle: "blue",
        };
      }
      return null;
    });
    setVertexes(newVertexes.filter((el) => el !== null));
    setNames(headers);
  }, [headers]);

  // поменяли веса в таблице
  useEffect(() => {
    setData(inpData);

    canvasRef.current
      .getContext("2d")
      .clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    vertexes.forEach((item) => {
      drawCircle(item, canvasRef.current.getContext("2d"));
    });

    for (let i = 0; i < inpData.length; i++) {
      for (let j = 0; j < inpData[i].length; j++) {
        const circle1 = vertexes.find((v) => v.id === i);
        const circle2 = vertexes.find((v) => v.id === j);
        const weight = parseInt(inpData[i][j]) ? parseInt(inpData[i][j]) : 0;
        drawArrow(circle1, circle2, weight, canvasRef.current.getContext("2d"));
      }
    }
  }, [inpData]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    vertexes.forEach((item) => {
      drawCircle(item, ctx);
    });
    for (let i = 0; i < data?.length; i++) {
      for (let j = 0; j < data[i]?.length; j++) {
        const circle1 = vertexes.find((v) => v.id === i);
        const circle2 = vertexes.find((v) => v.id === j);
        const weight = parseInt(data[i][j]) ? parseInt(data[i][j]) : 0;
        drawArrow(circle1, circle2, weight, canvasRef.current.getContext("2d"));
      }
    }
  }, [vertexes]);

  const handleMouseUp = () => {
    setIsDragging(false);
    setSelectedVertex(null);
  };

  const handleMouseDown = (e) => {
    const mousePos = getMousePos(canvasRef.current, e);
    const clickedCircle = vertexes.find((circle) => {
      return (
        (mousePos.x - circle.x) ** 2 + (mousePos.y - circle.y) ** 2 <=
        circle.radius ** 2
      );
    });
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
      setMenuOn(false);
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
    <div>
      <canvas
        ref={canvasRef}
        width="880"
        height="600"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={(e) => handleClick(e)}
      />
      <VertexContextMenu
        context={context}
        xyPosition={xyPosition}
        setContext={setContext}
        del={vertexes.length > 2}
        addArc={false}
        onStart={handleStart}
        onEnd={handleEnd}
        onDelete={removeVertex}
      />
    </div>
  );
}
