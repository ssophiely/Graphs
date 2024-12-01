import MatrixComponent from "./graph_info/MatrixComponent.jsx";
import Output from "./graph_info/output/Output.jsx";

export default function Tools({
  vertexCount,
  rowHeaders,
  data,
  setRowHeaders,
  setVertexCount,
  setData,
  start,
  end,
  inserted,
  deleted,
  setPath,
  setPackets,
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
        headers={rowHeaders}
        data={data}
        start={start}
        end={end}
        setPath={setPath}
        setPackets={setPackets}
      />
    </div>
  );
}
