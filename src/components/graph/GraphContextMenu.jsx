import React from "react";

function GraphContextMenu({
  context,
  xyPosition,
  setContext,
  onDelete,
  onInsert,
  add,
  del,
}) {
  return (
    <div className="contextContainer">
      {context && (
        <div
          style={{ top: xyPosition.y, left: xyPosition.x }}
          className="rightClick"
        >
          {add && (
            <div
              className="menuElement"
              onClick={() => {
                setContext(false);
                onInsert();
              }}
            >
              Добавить вершину
            </div>
          )}
          {del && (
            <div
              className="menuElement"
              onClick={() => {
                setContext(false);
                onDelete();
              }}
            >
              Удалить вершину
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GraphContextMenu;
