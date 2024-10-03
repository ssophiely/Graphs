import React, { useState } from "react";
import { dijkstra } from "../../algorithms/dijkstra.js";
import { floyd } from "../../algorithms/floyd.js";

export default function Output({ headers, data }) {
  const [dijTime, setDijTime] = useState(null);
  const [floydTime, setFloydTime] = useState(null);

  const [dijRes, setDijRes] = useState(null);
  const [floydRes, setFloydRes] = useState(null);

  function handleClick() {
    // Флойд
    const [fl_len, floyd_path, time2] = floyd(data);
    const result2 = getResult(fl_len, floyd_path, fl_len.length);
    setFloydRes(result2);
    setFloydTime(time2 + "  ms");

    // Джейкстра
    const [dij_len, dij_path, time1] = dijkstra(data);
    const result1 = getResult(dij_len, dij_path, dij_len.length);
    setDijRes(result1);
    setDijTime(time1 + "  ms");
  }

  function getResult(lens, paths, n) {
    const result = [];
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++) {
        if (![0, Infinity].includes(lens[i][j]))
          result.push(
            `${headers[i]}🠒${headers[j]}    [${
              paths.length > 0 &&
              paths[i][j]?.map((el) => headers[el]).join(", ")
            }]      ${lens[i][j]}`
          );
      }
    return result;
  }

  return (
    <div id="res">
      <button className="dijkstra_btn" id="btn" onClick={handleClick}>
        Сравнить алгоритмы
      </button>
      <table className="res_table">
        <thead>
          <tr>
            <th>Dijkstra's algorithm</th>
            <th>Floyd's algorithm</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{dijTime}</td>
            <td>{floydTime}</td>
          </tr>
          <tr>
            <td>
              <pre id="scrollable">
                {dijRes?.map((string, index) => (
                  <span key={index}>
                    {string}
                    {index < dijRes.length - 1 && <br />}
                  </span>
                ))}
              </pre>
            </td>
            <td>
              <pre id="scrollable">
                {floydRes?.map((string, index) => (
                  <span key={index}>
                    {string}
                    {index < floydRes.length - 1 && <br />}
                  </span>
                ))}
              </pre>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
