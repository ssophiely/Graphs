import React, { useState, useRef } from "react";
import Matrix from "./Matrix.jsx";
import Header from "./Header.jsx";

export default function MatrixComponent({
  rowHeaders,
  setRowHeaders,
  data,
  setData,
  vertexCount,
  setVertexCount,
}) {
  const input = useRef();

  const [columnHeaders, setColumnHeaders] = useState(
    Array.from({ length: vertexCount }, () => "")
  );

  // Обработчик изменения значения в ячейке
  const handleChange = (rowIndex, colIndex, value) => {
    const newData = data.map((row, rIdx) => {
      if (rIdx === rowIndex) {
        const newRow = [...row];
        newRow[colIndex] = value;
        return newRow;
      }
      return row;
    });
    setData(newData);
  };

  function handleClick() {
    let value = input.current.value;
    value = value < 2 ? 2 : value;
    value = value > 10 ? 10 : value;

    setVertexCount(value);
    setColumnHeaders(Array.from({ length: value }, () => ""));
    setRowHeaders(Array.from({ length: value }, () => ""));
    setData(
      Array.from({ length: value }, () =>
        Array.from({ length: value }, () => "")
      )
    );

    input.current.value = value;
  }

  function handleDelete(i) {
    const newRows = rowHeaders.filter((v) => v !== rowHeaders[i]);
    setRowHeaders(newRows);

    const newCols = columnHeaders.filter((v) => v !== columnHeaders[i]);
    setColumnHeaders(newCols);

    let newData = data.map((innerArray) => innerArray.slice());
    newData.splice(i, 1);
    for (let j = 0; j < newData.length; j++) {
      newData[j].splice(i, 1);
    }
    setData(newData);
  }

  function handleInsert(i) {
    console.log(i);
  }

  function handleInput(value, index) {
    const newHeaders = rowHeaders.slice();
    newHeaders[index] = value;
    setRowHeaders(newHeaders);
    setColumnHeaders(newHeaders);
  }

  return (
    <>
      <Header
        input={input}
        vertexCount={vertexCount}
        onClickHandler={handleClick}
      />
      <hr className="hr" />
      <Matrix
        columnHeaders={columnHeaders}
        rowHeaders={rowHeaders}
        data={data}
        onChange={handleChange}
        onInput={handleInput}
        onDelete={handleDelete}
        onInsert={handleInsert}
      />
    </>
  );
}
