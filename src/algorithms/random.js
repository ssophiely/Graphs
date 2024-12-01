export function randomRouting(data, start, end) {
  data = data.map((r, i) => {
    return r.map((v, j) => {
      if (i === j) return 0;
      if (v === "" || v === 0) return 0;
      return parseInt(v);
    });
  });
  return findAllPaths(data, start, end);
}

function findAllPaths(matrix, start, end, path = [], paths = []) {
  path.push(start);

  // Если достигли конечной точки, сохраняем путь
  if (start === end) {
    paths.push([...path]);
  } else {
    for (let i = 0; i < matrix.length; i++) {
      if (
        matrix[start][i] !== 0 &&
        path.filter((item) => item === i).length <= 1
      ) {
        findAllPaths(matrix, i, end, path, paths);
      }
    }
  }

  // Удаляем текущий узел из пути для поиска других путей
  path.pop();
  return paths;
}
