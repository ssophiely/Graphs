import React, { useState, useRef, useEffect } from "react";
import ChangeWeightWindow from "./ChangeWeightWindow.jsx";

function VertexContextMenu({
  context,
  xyPosition,
  setContext,
  onDelete,
  onStart,
  onEnd,
  addArc,
  changeArc,
  onChangeArc,
  del,
  names,
  notReachedNames
}) {
  const [y, setY] = useState(null);
  const outerRef = useRef();
  const changeWeightSelect = useRef();
  const changeWeightInput = useRef();

  const [subDelete, setSubDelete] = useState(false);
  const [isHoveredOnDelete, setIsHoveredOnDelete] = useState(false);

  const [subChange, setSubChange] = useState(false);
  const [isHoveredOnChange, setIsHoveredOnChange] = useState(false);

  const [subAdd, setSubAdd] = useState(false);
  const [isHoveredOnAdd, setIsHoveredOnAdd] = useState(false);

  return (
    <div className="contextContainer">
      {context && (
        <div
          ref={outerRef}
          style={{ top: xyPosition.y, left: xyPosition.x }}
          className="rightClick"
        >
          <div
            className="menuElement"
            onClick={() => {
              setContext(false);
              onStart();
            }}
          >
            Выбрать начальной
          </div>

          <div
            className="menuElement"
            onClick={() => {
              setContext(false);
              onEnd();
            }}
          >
            Выбрать конечной
          </div>
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
          {addArc && (
            <div
              className="menuElement"
              onMouseEnter={(e) => {
                setSubAdd((prev) => {
                  const inner = e.target.getBoundingClientRect();
                  const outer = outerRef.current.getBoundingClientRect();
                  setY(inner.top - outer.top);
                  return true;
                });
              }}
              onMouseLeave={() => {
                if (!isHoveredOnAdd) {
                  setSubAdd(false);
                }
              }}
            >
              Добавить ребро
              {subAdd && (
                <ChangeWeightWindow
                  y={y}
                  setIsHoveredOnChange={setIsHoveredOnAdd}
                  setSubChange={setSubAdd}
                  vertexes={notReachedNames}
                  setContext={setContext}
                  onChangeArc={onChangeArc}
                  changeWeightInput={changeWeightInput}
                  changeWeightSelect={changeWeightSelect}
                />
              )}
            </div>
          )}
          {changeArc && (
            <div
              className="menuElement"
              onMouseEnter={(e) => {
                setSubDelete((prev) => {
                  const inner = e.target.getBoundingClientRect();
                  const outer = outerRef.current.getBoundingClientRect();
                  setY(inner.top - outer.top);
                  return true;
                });
              }}
              onMouseLeave={() => {
                if (!isHoveredOnDelete) {
                  setSubDelete(false);
                }
              }}
            >
              Удалить ребро
              {subDelete && (
                <div
                  className="rightClick"
                  style={{ position: "absolute", left: "97%", top: y }}
                  onMouseEnter={() => setIsHoveredOnDelete(true)}
                  onMouseLeave={() => {
                    setIsHoveredOnDelete(false);
                    setSubDelete(false);
                  }}
                >
                  {names.map((n, ind) => (
                    <div
                      key={ind}
                      className="menuElement"
                      onClick={() => {
                        setSubDelete(false);
                        setContext(false);
                        onChangeArc(n, "");
                      }}
                    >
                      {n}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {changeArc && (
            <div
              className="menuElement"
              onMouseEnter={(e) => {
                setSubChange((prev) => {
                  const inner = e.target.getBoundingClientRect();
                  const outer = outerRef.current.getBoundingClientRect();
                  setY(inner.top - outer.top);
                  return true;
                });
              }}
              onMouseLeave={() => {
                if (!isHoveredOnChange) {
                  setSubChange(false);
                }
              }}
            >
              Изменить вес ребра
              {subChange && (
                <ChangeWeightWindow
                  y={y}
                  setIsHoveredOnChange={setIsHoveredOnChange}
                  setSubChange={setSubChange}
                  vertexes={names}
                  setContext={setContext}
                  onChangeArc={onChangeArc}
                  changeWeightInput={changeWeightInput}
                  changeWeightSelect={changeWeightSelect}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default VertexContextMenu;
