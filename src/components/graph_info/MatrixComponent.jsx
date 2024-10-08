import React, { useState, useRef, useEffect } from "react";
import Matrix from "./Matrix.jsx";
import Header from "./Header.jsx";

export default function MatrixComponent({
  rowHeaders,
  setRowHeaders,
  data,
  setData,
  vertexCount,
  setVertexCount,
  inserted,
  deleted,
}) {
  const input = useRef();

  const [columnHeaders, setColumnHeaders] = useState(
    Array.from({ length: vertexCount }, () => "")
  );

  useEffect(() => {
    setColumnHeaders(rowHeaders);
  }, [rowHeaders]);

  useEffect(() => {
    if (deleted !== null) handleDelete(deleted);
  }, [deleted]);

  useEffect(() => {
    if (inserted) handleInsert(inserted.ind, inserted.val);
  }, [inserted]);

  function handleBlur() {
    const set = new Set();
    let newHeaders = rowHeaders.map((item) => {
      if (set.has(item)) {
        return "";
      } else {
        set.add(item);
        return item;
      }
    });
    setRowHeaders(newHeaders);
    setColumnHeaders(newHeaders);
  }

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

  function handleInsert(i, h) {
    h = h == null ? "" : h;
    if (rowHeaders.includes(h)) {
      alert(`Вершина с названием ${h} уже существует!`);
      return;
    }

    const newRows = rowHeaders.slice();
    newRows.splice(i + 1, 0, h);
    setRowHeaders(newRows);

    const newCols = [...columnHeaders];
    newCols.splice(i + 1, 0, h);
    setColumnHeaders(newCols);

    let newData = [...data];
    newData.splice(
      i + 1,
      0,
      Array.from({ length: columnHeaders.length }, () => "")
    );

    for (let j = 0; j < newData.length; j++) {
      newData[j].splice(i + 1, 0, "");
    }
    setData(newData);
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
        onBlurFunc={handleBlur}
      />
    </>
  );
}
