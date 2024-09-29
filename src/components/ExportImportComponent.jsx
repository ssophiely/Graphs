import React, { useState } from "react";

export default function ExportImportComponent({
  headers,
  data,
  start,
  end,
  setHeaders,
  setData,
  setStart,
  setEnd,
}) {
  const [file, setFile] = useState(null);

  function handleExport() {
    var obj = new Object();
    obj.headers = headers;
    obj.data = data;
    obj.startVertex = start;
    obj.endVertex = end;

    var json = JSON.stringify(obj);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "data.graph";
    document.body.appendChild(link);
    link.click();

    // Очистка
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function handleImport() {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target.result);
          setHeaders(jsonData.headers);
          setData(jsonData.data);
          setStart(jsonData.startVertex);
          setEnd(jsonData.endVertex);
        } catch (error) {
          console.error("Ошибка при разборе JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className="button_group">
      <button
        className="create_matrix_btn exp "
        id="exp"
        onClick={handleExport}
      >
        Экспортировать
      </button>
      <div id="import">
        <input id="file" type="file" name="file" onChange={handleFileChange} />
        <button
          className="create_matrix_btn imp"
          id="exp"
          onClick={handleImport}
        >
          Импортировать
        </button>
      </div>
    </div>
  );
}
