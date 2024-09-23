import React, { useRef } from "react";
import ContextMenu from "./ContextMenu";

const Matrix = ({
  columnHeaders,
  rowHeaders,
  data,
  onChange,
  onInput,
  onDelete,
  onInsert,
}) => {
  const rowRef = useRef(null);

  // Контекстное меню
  const [index, setIndex] = React.useState(null);
  const [context, setContext] = React.useState(false);
  const [xyPosition, setxyPosition] = React.useState({ x: 0, y: 0 });

  //event handler for showing the context menu
  const showContext = (event, ind) => {
    event.preventDefault();
    setContext(false);
    const positionChange = {
      x: event.pageX,
      y: event.pageY,
    };
    setxyPosition(positionChange);
    setContext(true);
    setIndex(ind);
  };

  //event handler for hiding the context menu
  const hideContext = (event) => {
    setContext(false);
    setIndex(null);
  };

  // Курсор переводим в конец
  function cursorToEnd(e) {
    let range = document.createRange();
    range.selectNodeContents(e.target);
    range.collapse(false);
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  return (
    <>
      <table
        className="table"
        onClick={hideContext}
        onContextMenu={(e) => e.preventDefault()}
      >
        <thead>
          <tr>
            <th></th>
            {columnHeaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td
                onContextMenu={(e) => showContext(e, rowIndex)}
                id="row_header"
                ref={rowRef}
                contentEditable="true"
                suppressContentEditableWarning={true}
                onInput={(e) => {
                  onInput(e.target.innerText, rowIndex);
                  cursorToEnd(e);
                }}
              >
                {rowHeaders[rowIndex]}
              </td>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    value={cell}
                    min="0"
                    disabled={
                      rowHeaders[rowIndex] === columnHeaders[colIndex]
                        ? true
                        : false
                    }
                    style={
                      rowHeaders[rowIndex] === columnHeaders[colIndex]
                        ? { caretColor: "transparent" }
                        : null
                    }
                    onChange={(e) =>
                      onChange(rowIndex, colIndex, e.target.value)
                    }
                    onInput={(e) => {        if (parseInt(e.target.value) < 0) {
                      e.target.value = ''}}}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <ContextMenu
        context={context}
        xyPosition={xyPosition}
        setContext={setContext}
        onDelete={() => onDelete(index)}
        onInsert={() => onInsert(index)}
        add={rowHeaders.length < 10}
        del={rowHeaders.length > 2}
      />
    </>
  );
};

export default Matrix;
