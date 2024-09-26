import React from "react";
import MatrixComponent from "./graph_info/MatrixComponent.jsx";
import Output from "./graph_info/Output.jsx";

export default function Tools({
  vertexCount,
  rowHeaders,
  data,
  setRowHeaders,
  setVertexCount,
  setData,
}) {
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
