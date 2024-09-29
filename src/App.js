import React, { useState } from "react";
import GraphComponent from "./components/graph/GraphComponent.jsx";
import Tools from "./components/Tools.jsx";
import ExportImportComponent from "./components/ExportImportComponent.jsx";

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
    console.log(5, e.target.value)
    setStart(e.target.value);
  }
  function handleEndChange(e) {
    setEnd(e.target.value);
  }

  const [deleted, setDeleted] = useState(null);
  const [inserted, setInserted] = useState(null);

  const [path, setPath] = useState(null);

  return (
    <>
      <ExportImportComponent
        headers={rowHeaders}
        data={data}
        start={start}
        end={end}
        setHeaders={setRowHeaders}
        setData={setData}
        setStart={setStart}
        setEnd={setEnd}
      />
      <div className="container">
        <GraphComponent
          headers={rowHeaders}
          setHeaders={setRowHeaders}
          inpData={data}
          setInpData={setData}
          start={start}
          end={end}
          setStart={setStart}
          setEnd={setEnd}
          setDeleted={setDeleted}
          setInserted={setInserted}
          path={path}
          setPath={setPath}
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
          deleted={deleted}
          inserted={inserted}
          setPath={setPath}
        />
      </div>
    </>
  );
}

export default App;
