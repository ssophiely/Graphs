import React, { useEffect, useRef, useState } from "react";
import { generateCoordinates, getMousePos } from "../../funcs/generateCoords";
import VertexContextMenu from "./VertexContextMenu.jsx";
import CanvasContextMenu from "./CanvasContextMenu.jsx";
import {
  drawArrow,
  drawCircle,
  drawArrowWithShadow,
} from "../../funcs/drawing.js";

export default function GraphComponent({
  headers,
  setHeaders,
  inpData,
  setInpData,
  start,
  end,
  setStart,
  setEnd,
  setDeleted,
  setInserted,
  path,
  setPath,
  flag
}) {
  const canvasRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedVertex, setSelectedVertex] = useState(null);
  const [vertexes, setVertexes] = useState([]);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [names, setNames] = useState(headers);

  const [context, setContext] = React.useState(false);
  const [xyPosition, setxyPosition] = React.useState({ x: 0, y: 0 });
  const [clickedVertex, setClickedVertex] = useState(null);
  const [menuOn, setMenuOn] = useState(true);

  const [canvasContext, setCanvasContext] = React.useState(false);
  const [canvasXYPosition, setCanvasXYPosition] = React.useState({
    x: 0,
    y: 0,
  });

  const [clickedCoords, setClickedCoords] = useState(null);

  // контекстные меню по клику
  const showContext = (event, contextFunc, xyFunc) => {
    contextFunc(false);
    const positionChange = {
      x: event.pageX,
      y: event.pageY,
    };
    xyFunc(positionChange);
    contextFunc(true);
  };

  function handleClick(e) {
    e.preventDefault();
    const mousePos = getMousePos(canvasRef.current, e);
    const clickedCircle = vertexes.find((circle) => {
      return (
        (mousePos.x - circle.x) ** 2 + (mousePos.y - circle.y) ** 2 <=
        circle.radius ** 2
      );
    });
    if (clickedCircle) {
      if (!menuOn) {
        setContext(false);
        setMenuOn(true);
        return;
      }
      setCanvasContext(false);
      setClickedVertex(clickedCircle);
      showContext(e, setContext, setxyPosition);
    } else {
      showContext(e, setCanvasContext, setCanvasXYPosition);
      setContext(false);
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
          return { ...v, fillStyle: "LightCyan" };
        }
        if (v.label === end) {
          return { ...v, fillStyle: "MediumTurquoise" };
        }
        return { ...v, fillStyle: "PaleTurquoise" };
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
          return { ...v, fillStyle: "MediumTurquoise" };
        }
        if (v.label === start) {
          return { ...v, fillStyle: "LightCyan" };
        }
        return { ...v, fillStyle: "PaleTurquoise" };
      })
    );
  };

  // удаление вершины
  const removeVertex = () => {
    setDeleted(clickedVertex.id);
    setTimeout(() => {
      setDeleted(null);
    }, 500);
    if (clickedVertex.label === start) setStart("");
    if (clickedVertex.label === end) setEnd("");
  };

  // добавление вершины
  const addVertex = (label) => {
    const newHeaders = headers.slice();
    if (headers.includes("")) {
      const ind = headers.indexOf("");
      newHeaders[ind] = label;
      setHeaders((prev) => {
        setClickedCoords({
          x: canvasXYPosition.x,
          y: canvasXYPosition.y,
          headers: newHeaders,
        });
        return newHeaders;
      });
    } else {
      setClickedCoords({
        x: canvasXYPosition.x,
        y: canvasXYPosition.y,
        headers: newHeaders,
      });
      setTimeout(() => {
        setInserted({ ind: names.length - 1, val: label });
      }, 200);
      setTimeout(() => {
        setInserted(null);
      }, 100);
    }
  };

  // операции с ребрами -----------------------------------------------------
  // изменение веса ребра
  function handleChangeArc(label, value) {
    const newData = inpData.map((row, rIdx) => {
      if (rIdx === clickedVertex.id) {
        const newRow = [...row];
        const colIndex = headers.indexOf(label);
        newRow[colIndex] = value;
        return newRow;
      }
      return row;
    });
    setInpData(newData);
  }

  // отслеживание изменений ----------------------------------------------------
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    if (path !== null) {
      const func = async () => {
        for (let i = 0; i < path.length - 1; i++) {
          const c1 = vertexes.find((v) => v.id === path[i]);
          const c2 = vertexes.find((v) => v.id === path[i + 1]);
          drawArrowWithShadow(c1, c2, inpData[i][i + 1], ctx);
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
        setPath(null);
      };
      func();
    } else {
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
          drawArrow(
            circle1,
            circle2,
            weight,
            canvasRef.current.getContext("2d")
          );
        }
      }
    }
  }, [flag]);

  useEffect(() => {
    console.log(start, end);
    if (headers.length !== names.length) {
      let newVertexes = headers.map((h, ind) => {
        if (h !== "") {
          const color =
            h === start
              ? "LightCyan"
              : h === end
              ? "MediumTurquoise"
              : "PaleTurquoise";
          const vertex = vertexes.find((v) => v.label === h);
          if (vertex) {
            vertex.id = ind;
            vertex.fillStyle = color;
            return vertex;
          }
          if (!names.includes(h)) {
            let [xc, yc] =
              clickedCoords === null
                ? generateCoordinates(canvasRef.current, vertexes)
                : [clickedCoords.x, clickedCoords.y];
            setClickedCoords(null);
            return {
              label: h,
              x: xc,
              y: yc,
              radius: 20,
              id: ind,
              fillStyle: color,
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
        const color =
          h === start
            ? "LightCyan"
            : h === end
            ? "MediumTurquoise"
            : "PaleTurquoise";
        const vertex = vertexes.find((v) => v.id === ind);
        if (vertex) {
          vertex.label = h;
          vertex.fillStyle = color;
          return vertex;
        }
        let [xc, yc] =
          clickedCoords === null
            ? generateCoordinates(canvasRef.current, vertexes)
            : [clickedCoords.x, clickedCoords.y];
        setClickedCoords(null);
        return {
          label: h,
          x: xc,
          y: yc,
          radius: 20,
          id: ind,
          fillStyle: color,
        };
      }
      return null;
    });
    setVertexes(newVertexes.filter((el) => el !== null));
    setNames(headers);
  }, [headers, start, end]);

  // поменяли веса в таблице
  useEffect(() => {
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
    for (let i = 0; i < inpData?.length; i++) {
      for (let j = 0; j < inpData[i]?.length; j++) {
        const circle1 = vertexes.find((v) => v.id === i);
        const circle2 = vertexes.find((v) => v.id === j);
        const weight = parseInt(inpData[i][j]) ? parseInt(inpData[i][j]) : 0;
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

  return (
    <div id="left">
      <canvas
        ref={canvasRef}
        width="880"
        height="550"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onContextMenu={(e) => handleClick(e)}
        onClick={(e) => {
          setContext(false);
          setCanvasContext(false);
        }}
      />
      <VertexContextMenu
        context={context}
        xyPosition={xyPosition}
        setContext={setContext}
        del={vertexes.length > 2}
        addArc={inpData[clickedVertex?.id]?.some((el, ind) => {
          return (
            ["", "0"].includes(el) &&
            headers[ind] != "" &&
            headers[ind] != clickedVertex?.label
          );
        })}
        changeArc={inpData[clickedVertex?.id]?.some(
          (el) => !["", "0"].includes(el)
        )}
        onStart={handleStart}
        onEnd={handleEnd}
        onDelete={removeVertex}
        onChangeArc={handleChangeArc}
        names={headers.filter((h, ind) => {
          if (!clickedVertex) return false;
          return !["", "0"].includes(inpData[clickedVertex?.id][ind]);
        })}
        notReachedNames={headers.filter((h, ind) => {
          if (!clickedVertex) return false;
          return (
            ["", "0"].includes(inpData[clickedVertex?.id][ind]) &&
            !["", clickedVertex.label].includes(headers[ind])
          );
        })}
      />
      <CanvasContextMenu
        context={canvasContext}
        xyPosition={canvasXYPosition}
        setContext={setCanvasContext}
        insert={vertexes.length < 10}
        onInsert={addVertex}
      />
    </div>
  );
}
