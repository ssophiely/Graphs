export function floyd(data) {
  console.log(data);
  data = data.map((r, i) => {
    return r.map((v, j) => {
      if (i == j) return 0;
      if (v == "" || v == 0) return Infinity;
      return parseInt(v);
    });
  });
  console.log(data);

  const n = data.length;
  let D = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => Infinity)
  );

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) D[i][j] = 0;
      else D[i][j] = data[i][j];
    }
  }

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (
          D[i][k] !== Infinity &&
          D[k][j] !== Infinity &&
          D[i][j] !== Infinity
        )
          D[i][j] = Math.min(D[i][j], D[i][k] + D[k][j]);
      }
    }
  }

  return D;
}

// 1 2 3 4
