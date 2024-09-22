import React from "react";

export default function Header({ input, vertexCount, onClickHandler }) {
  return (
    <>
      <div className="text-field">
        <label className="text-field__label">
          Количество вершин графа:&emsp;
          <input
            className="text-field__unput"
            id="vertex_cont"
            ref={input}
            type="number"
            min="2"
            max="10"
            defaultValue={vertexCount}
          />
        </label>
      </div>
      <button className="create_matrix_btn" id="btn" onClick={onClickHandler}>
        Создать матрицу весов
      </button>
    </>
  );
}
