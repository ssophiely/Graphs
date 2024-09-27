import React, { useRef, useState } from "react";
import { findMinPath } from "../../algorithms/dijkstra.js";

export default function Output({
  rowHeaders,
  data,
  start,
  end,
  startOnChange,
  endOnChange,
}) {
  const startSelectRef = useRef();
  const endSelectRef = useRef();

  const [length, setLength] = useState(null);
  const [path, setPath] = useState("");

  const filteredItems = rowHeaders.filter((item) => item.trim() !== "");

  function handleClick() {
    const numData = data.map((v) =>
      v.map((x) => (parseInt(x) ? parseInt(x) : 0))
    );

    let [len, path] = findMinPath(
      numData,
      rowHeaders.indexOf(startSelectRef.current.value),
      rowHeaders.indexOf(endSelectRef.current.value)
    );

    setLength(len);
    setPath(path.map((v) => rowHeaders[v]).join("🠒"));
  }

  return (
    <div>
      <div className="dropdown">
        <label htmlFor="dropdown1">Начальная вершина:&emsp;</label>
        <select
          id="dropdown1"
          ref={startSelectRef}
          value={start}
          onChange={(e) => startOnChange(e)}
        >
          <option key={-1} value=""></option>
          {filteredItems.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="dropdown">
        <label htmlFor="dropdown2">Конечная вершина:&emsp;</label>
        <select
          id="dropdown2"
          ref={endSelectRef}
          value={end}
          onChange={(e) => endOnChange(e)}
        >
          <option key={-1} value=""></option>
          {filteredItems.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <br />
      <button className="dijkstra_btn" id="btn" onClick={handleClick}>
        Найти кратчайший путь
      </button>
      <hr className="hr" />
      <p id="result">
        Длина пути:&emsp;<span>{length}</span>
      </p>
      <p id="result">
        Список вершин:&emsp;<span>{path}</span>
      </p>
    </div>
  );
}
