import React, { useEffect, useRef, useState } from "react";

export default function ChangeWeightWindow({
  y,
  setIsHoveredOnChange,
  setSubChange,
  vertexes,
  setContext,
  onChangeArc,
  changeWeightInput,
  changeWeightSelect,
}) {
  return (
    <div
      className="rightClick"
      id="change_box"
      style={{ position: "absolute", left: "97%", top: y }}
      onMouseEnter={() => setIsHoveredOnChange(true)}
      onMouseLeave={() => {
        setIsHoveredOnChange(false);
        setSubChange(false);
      }}
    >
      <div className="changeBox">
        <label id="changeWeightL">Вершина:&emsp;</label>
        <select id="changeWeight" ref={changeWeightSelect}>
          {vertexes.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <input
        className="numfield_input"
        ref={changeWeightInput}
        type="number"
        min="0"
        placeholder="Введите вес ребра"
        onInput={(e) => {
          if (parseInt(e.target.value) < 0) {
            e.target.value = "";
          }
        }}
      />
      <br />
      <button
        onClick={(e) => {
          setSubChange(false);
          setContext(false);
          onChangeArc(
            changeWeightSelect.current.value,
            changeWeightInput.current.value
          );
        }}
        id="add_btn"
      >
        Сохранить
      </button>
    </div>
  );
}
