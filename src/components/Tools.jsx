import React, { useState } from "react";
import MatrixComponent from "./graph_info/MatrixComponent.jsx";
import Output from "./graph_info/Output.jsx";

export default function Tools() {
  const [vertexCount, setVertexCount] = useState(5);
  const [rowHeaders, setRowHeaders] = useState(
    Array.from({ length: vertexCount }, () => "")
  );
  const [data, setData] = useState(
    [...Array(vertexCount)].map((e) => Array(vertexCount).fill(""))
  );

  return (
    <div className="right">
      <MatrixComponent
        rowHeaders={rowHeaders}
        data={data}
        setRowHeaders={setRowHeaders}
        setData={setData}
        vertexCount={vertexCount}
        setVertexCount={setVertexCount}
      />
      <hr className="hr" />
      <Output rowHeaders={rowHeaders} data={data} />
    </div>
  );
}
