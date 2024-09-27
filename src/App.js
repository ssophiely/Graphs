import React, { useState } from "react";
import GraphComponent from "./components/graph/GraphComponent.jsx";
import Tools from "./components/Tools.jsx";

function App() {
  const [vertexCount, setVertexCount] = useState(5);
  const [rowHeaders, setRowHeaders] = useState(
    Array.from({ length: vertexCount }, () => "")
  );
  const [data, setData] = useState(
    [...Array(vertexCount)].map((e) => Array(vertexCount).fill(""))
  );

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  function handleStartChange(e) {
    setStart(e.target.value);
  }
  function handleEndChange(e) {
    setEnd(e.target.value);
  }

  return (
    <div className="container">
      <GraphComponent
        headers={rowHeaders}
        setHeaders={setRowHeaders}
        inpData={data}
        start={start}
        end={end}
        setStart={setStart}
        setEnd={setEnd}
      />
      <Tools
        vertexCount={vertexCount}
        rowHeaders={rowHeaders}
        data={data}
        setRowHeaders={setRowHeaders}
        setVertexCount={setVertexCount}
        setData={setData}
        start={start}
        end={end}
        startOnChange={handleStartChange}
        endOnChange={handleEndChange}
      />
    </div>
  );
}

export default App;
