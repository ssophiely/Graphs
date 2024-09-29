import React, { useEffect, useRef, useState } from "react";
import MatrixComponent from "./graph_info/MatrixComponent.jsx";
import Output from "./graph_info/Output.jsx";

export default function Tools({
  vertexCount,
  rowHeaders,
  data,
  setRowHeaders,
  setVertexCount,
  setData,
  start,
  end,
  startOnChange,
  endOnChange,
  inserted,
  deleted,
  setPath
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
        deleted={deleted}
        inserted={inserted}
      />
      <hr className="hr" />
      <Output
        rowHeaders={rowHeaders}
        data={data}
        start={start}
        end={end}
        startOnChange={startOnChange}
        endOnChange={endOnChange}
        setResultPath={setPath}
      />
    </div>
  );
}
