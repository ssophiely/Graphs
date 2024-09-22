import React, { useRef, useState } from "react";

export default function Output({ rowHeaders }) {
  const startSelectRef = useRef();
  const [length, setLength] = useState(null);
  const filteredItems = rowHeaders.filter((item) => item.trim() !== "");

  function handleClick() {}

  return (
    <div>
      <div className="dropdown">
        <label htmlFor="dropdown1">Начальная вершина:&emsp;</label>
        <select id="dropdown1" ref={startSelectRef}>
          {filteredItems.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="dropdown">
        <label htmlFor="dropdown2">Конечная вершина:&emsp;</label>
        <select id="dropdown2">
          {filteredItems
            .filter((val) => val !== startSelectRef.current.value)
            .map((item, index) => (
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
        Список вершин:&emsp;<span>{length}</span>
      </p>
    </div>
  );
}
