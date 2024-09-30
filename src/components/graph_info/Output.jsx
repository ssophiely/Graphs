import React, { useEffect, useRef, useState } from "react";
import { findMinPath } from "../../algorithms/dijkstra.js";
import { floyd } from "../../algorithms/floyd.js";

export default function Output({
  rowHeaders,
  data,
  start,
  end,
  startOnChange,
  endOnChange,
  setResultPath,
}) {
  const startSelectRef = useRef();
  const endSelectRef = useRef();

  // const [length, setLength] = useState(null);
  // const [path, setPath] = useState("");

  const filteredItems = rowHeaders.filter((item) => item.trim() !== "");

  function handleClick() {
    // const numData = data.map((v) =>
    //   v.map((x) => (parseInt(x) ? parseInt(x) : 0))
    // );

    // let [len, path] = findMinPath(
    //   numData,
    //   rowHeaders.indexOf(startSelectRef.current.value),
    //   rowHeaders.indexOf(endSelectRef.current.value)
    // );

    // if (len === undefined || len === Infinity || len === 0) {
    //   setLength(0);
    //   setPath("пути между вершинами не существует");
    //   setResultPath(null);
    // } else {
    //   setLength(len);
    //   setPath(path.map((v) => rowHeaders[v]).join("🠒"));
    //   setResultPath(path);
    // }
    floyd(data);
  }

  return (
    <div>
      <button className="dijkstra_btn" id="btn" onClick={handleClick}>
        Рассчитать расстояния
      </button>
      <hr className="hr" />

      <table className="res_table">
        <thead>
          <tr>
            <th>Dijkstra's algorithm</th>
            <th>Floyd's algorithm</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gloria</td>
            <td>Reeves</td>
          </tr>
          <tr>
            <td>Gloria</td>
            <td>Reeves</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
