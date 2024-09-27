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

  return (
    <div className="container">
      <GraphComponent headers={rowHeaders} inpData={data} />
      <Tools
        vertexCount={vertexCount}
        rowHeaders={rowHeaders}
        data={data}
        setRowHeaders={setRowHeaders}
        setVertexCount={setVertexCount}
        setData={setData}
      />
    </div>
  );
}

export default App;
