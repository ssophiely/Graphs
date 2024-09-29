import React, { useRef } from "react";

function CanvasContextMenu({
  context,
  xyPosition,
  setContext,
  onInsert,
  insert,
}) {
  const inputRef = useRef();

  return (
    <div className="contextContainer">
      {context && insert && (
        <div
          style={{ top: xyPosition.y, left: xyPosition.x }}
          className="rightClick"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Введите название вершины"
            id="v_label"
          />
          <br />
          <button
            onClick={(e) => {
              setContext(false);
              onInsert(inputRef.current.value);
            }}
            id="add_btn"
          >
            Добавить
          </button>
        </div>
      )}
    </div>
  );
}

export default CanvasContextMenu;
