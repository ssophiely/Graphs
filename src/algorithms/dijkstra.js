export function findMinPath(data, start, end) {
  const distance = Array(data.length).fill(Infinity);
  const visited = Array(data.length).fill(false);
  const previous = Array(data.length).fill(null);

  distance[start] = 0;

  for (let i = 0; i < data.length; i++) {
    let minDistance = Infinity;
    let minIndex = -1;

    for (let j = 0; j < data.length; j++) {
      if (!visited[j] && distance[j] < minDistance) {
        minDistance = distance[j];
        minIndex = j;
      }
    }

    if (minIndex === -1) break;

    visited[minIndex] = true;

    for (let k = 0; k < data.length; k++) {
      if (data[minIndex][k] !== 0 && !visited[k]) {
        const newDistance = distance[minIndex] + data[minIndex][k];
        if (newDistance < distance[k]) {
          distance[k] = newDistance;
          previous[k] = minIndex;
        }
      }
    }
  }

  const path = [];

  for (let at = end; at !== null; at = previous[at]) {
    path.push(at);
  }

  path.reverse();

  return [distance[end], path];
}
