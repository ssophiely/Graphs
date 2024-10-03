export function floyd(data) {
  console.log(2)
  data = data.map((r, i) => {
    return r.map((v, j) => {
      if (i === j) return 0;
      if (v === "" || v === 0) return Infinity;
      return parseInt(v);
    });
  });

  const n = data.length;
  let D = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => Infinity)
  );
  let next = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => null)
  );

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) D[i][j] = 0;
      else if (data[i][j] !== Infinity) {
        D[i][j] = data[i][j];
        next[i][j] = i;
      }
    }
  }

  let pathMatrix = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => null)
  );

  const start = performance.now();
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (D[i][k] + D[k][j] < D[i][j]) {
          D[i][j] = D[i][k] + D[k][j];
          next[i][j] = next[k][j];
        }
      }
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (D[i][j] !== Infinity && D[i][j] !== 0)
        pathMatrix[i][j] = getPath(i, j, next);
    }
  }
  const end = performance.now();

  return [D, pathMatrix, end - start];
}

function getPath(i, j, next) {
  const path = [];
  for (let at = j; at !== null; at = next[i][at]) {
    path.push(at);
  }
  path.reverse();
  return path;
}
