import React from "react";

function VertexContextMenu({
  context,
  xyPosition,
  setContext,
  onDelete,
  onStart,
  onEnd,
  addArc,
  del,
}) {
  return (
    <div className="contextContainer">
      {context && (
        <div
          style={{ top: xyPosition.y, left: xyPosition.x }}
          className="rightClick"
        >
          {addArc && (
            <div
              className="menuElement"
              //   onClick={() => {
              //     setContext(false);
              //     onInsert();
              //   }}
            >
              Добавить ребро
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
          <div
            className="menuElement"
            onClick={() => {
              setContext(false);
              onStart();
            }}
          >
            Выбрать начальной вершиной
          </div>

          <div
            className="menuElement"
            onClick={() => {
              setContext(false);
              onEnd();
            }}
          >
            Выбрать конечной вершиной
          </div>
        </div>
      )}
    </div>
  );
}

export default VertexContextMenu;
