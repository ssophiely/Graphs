import React, { useState, useRef, useEffect } from "react";
import { randomRouting } from "../../../algorithms/random.js";

export default function Output({
  headers,
  data,
  start,
  end,
  setPath,
  setPackets,
}) {
  const [info, setInfo] = useState("");
  const [type, setType] = useState(null);
  const [method, setMethod] = useState(null);

  const [timeToLeave, setTimeToLeave] = useState(5);

  const [routing, setRouting] = useState(null);

  const avalancheRef = useRef();
  const packsRef = useRef();

  const virt = "virt";
  const datagram = "dg";
  const avalanche = "avalanche";
  const rnd = "random";
  const exp = "experience";

  const time = 10;

  useEffect(() => {
    if (data !== null || data !== undefined) {
      setRouting(getRouting());
    }
  }, [data]);

  function getRouting() {
    return data.map((row, rowInd) => {
      return row.map((cell, colInd) => {
        return null;
      });
    });
  }

  // Смена radiobuttons
  function handleTypeChange(e) {
    setType(e.target.value);
    if (e.target.value === virt) avalancheRef.current.disabled = true;
    else avalancheRef.current.disabled = false;
  }
  function handleMethodChange(e) {
    setMethod(e.target.value);
  }

  // Отправка пакетов
  async function handleSendClick(e) {
    if (type === null || method === null) return;
    setPackets(packsRef.current.value);
    switch (type) {
      case virt:
        switch (method) {
          case rnd:
            return handleVirtual();
          case exp:
            return await handleVirtualExp();
          default:
            return;
        }
      case datagram:
        switch (method) {
          case rnd:
            return await handleDatagramRand();
          case avalanche:
            return await handleDatagramAvalanche();
          case exp:
            return await handleDatagramExp();
          default:
            return;
        }
      default:
        return;
    }
  }

  // Виртуальный канал
  function handleVirtual() {
    if (start === "" || end === "") return;

    setInfo((prev) => {
      return prev + "Виртуальный канал. Случайная маршрутизация\n";
    });

    const numData = data.map((v) =>
      v.map((x) => (parseInt(x) ? parseInt(x) : 0))
    );

    // Случайная маршрутизация
    const paths = randomRouting(
      numData,
      headers.indexOf(start),
      headers.indexOf(end)
    );
    console.log(paths);

    const path = paths[Math.floor(Math.random() * (paths.length - 0)) + 0];

    let [animate, info] = buildVirtualInfo(findDistance(path), path);

    if (animate) {
      setPath(path);
    }

    setInfo((prev) => {
      return prev + info;
    });
  }

  // Виртуальный канал. Предыдущий опыт
  async function handleVirtualExp() {
    if (start === "" || end === "") return;

    setInfo((prev) => {
      return prev + "Виртуальный канал. Предыдущий опыт\n";
    });

    const numData = data.map((v) =>
      v.map((x) => (parseInt(x) ? parseInt(x) : 0))
    );

    let paths = randomRouting(
      numData,
      headers.indexOf(start),
      headers.indexOf(end)
    );

    // const maxLen = Math.max(...paths.map((arr) => arr.length));
    // let values = Array.from({ length: paths.length }, (_, index) => index);

    // for (let j = 0; j < maxLen - 1; j++) {
    //   paths = paths.filter((p, i) => values.includes(i));
    //   console.log(paths);

    //   if (paths.length === 1) break;

    //   let min = 1000;

    //   paths.forEach((p, ind) => {
    //     let start = p.at(j);
    //     let end = p.at(j + 1);
    //     if (start === undefined || end === undefined) values.push(ind);
    //     else {
    //       let val = routing[p[j]][p[j + 1]];
    //       if (val < min) {
    //         values = [ind];
    //         min = val;
    //       } else if (val === min) values.push(ind);
    //     }
    //   });
    // }

    const path = paths[Math.floor(Math.random() * (paths.length - 0)) + 0];
    let vertexes = [];

    for (let i = 0; i < path.length - 1; i++) {
      const vA = path[i];
      const vB = path[i + 1];
      setPath([vA, vB]);
      await new Promise((resolve) => setTimeout(resolve, 1810));

      // Пересчитываем таблицу
      setRouting((prevRouting) => {
        let array = prevRouting.map((row) => [...row]);
        array[vA][vB] = 1;

        vertexes.forEach((v) => {
          if (array[v][vA] + 1 < array[v][vB] || array[v][vB] === null)
            array[v][vB] = array[v][vA] + 1;
        });

        return array;
      });

      vertexes.push(vA);
    }

    let [animate, info] = buildVirtualInfo(findDistance(path), path);
    setInfo((prev) => {
      return prev + info;
    });

    // // Меняем таблицу
    // setRouting((prevRouting) => {
    //   // Пересчитываем таблицу
    //   let array = prevRouting.map((row) => [...row]);

    //   for (let k = path.length - 3; k >= 0; k--) {
    //     let row = array[path[k + 1]].filter((x) => x !== 0);
    //     array[path[k]][path[k + 1]] = 1 + Math.min(...row);

    //     row = array[path[k]].filter((x) => x !== 0);
    //     for (let i = 0; i < array.length; i++) {
    //       if (
    //         array[i][path[k]] !== 0 &&
    //         i !== k &&
    //         i !== headers.indexOf(end)
    //       ) {
    //         array[i][path[k]] = 1 + Math.min(...row); // заменяем значение в столбце k
    //       }
    //     }
    //   }
    //   return array;
    // });
  }

  // Дейтаграммная передача случайным методом
  async function handleDatagramRand() {
    if (start === "" || end === "") return;

    setInfo((prev) => {
      return prev + "Дейтаграммная передача. Случайный метод\n";
    });

    const numData = data.map((v) =>
      v.map((x) => (parseInt(x) ? parseInt(x) : 0))
    );

    let ttl = timeToLeave;
    var count = packsRef.current.value;

    let current = Array.from({ length: count }, () => headers.indexOf(start));
    let result = Array.from({ length: count }, () => ({
      path: [headers.indexOf(start)],
      reason: null,
    }));

    setPackets(1);

    while (true) {
      let paths = [];
      for (let i = 0; i < current.length; i++) {
        if (current[i] === null) {
          continue;
        }

        // Если пакет достиг назначения
        if (current[i] === headers.indexOf(end)) {
          current[i] = null;
          continue;
        }

        // Если истекло время жизни
        if (ttl === 0) {
          current[i] = null;
          result[i].reason = "ttl";
          continue;
        }

        let neighbors = numData[current[i]].map((val, ind) => {
          if (val !== 0) return ind;
          return null;
        });
        neighbors = neighbors.filter((n) => n !== null);

        // Если нет соседей
        if (neighbors.length === 0) {
          current[i] = null;
          result[i].reason = "neighb";
          continue;
        }

        const ind =
          neighbors[Math.floor(Math.random() * (neighbors.length - 0)) + 0];

        paths.push({ path: [current[i], ind], num: i + 1 });

        result[i].path.push(ind);
        current[i] = ind;
      }

      if (paths.every((el) => el === null)) break;

      setPath(paths);
      await new Promise((resolve) => setTimeout(resolve, 1810));
      ttl -= 1;
      paths = [];
    }

    let info = "";

    // Выводим информацию о перемещении
    result.forEach((r, i) => {
      if (r.reason == null)
        info += buildDgInfo(findDistance(r.path), r.path, i + 1);
      else if (r.reason === "ttl")
        info += buildDgInfo(undefined, r.path, i + 1);
      else info += buildDgInfo(null, r.path, i + 1);
    });

    setInfo((prev) => {
      return prev + info;
    });
  }

  // Дейтаграммная передача лавинным методом
  async function handleDatagramAvalanche() {
    if (start === "" || end === "") return;

    const numData = data.map((v) =>
      v.map((x) => (parseInt(x) ? parseInt(x) : 0))
    );

    let startV = [
      {
        ind: headers.indexOf(start),
        prev: headers.indexOf(start),
        next: [],
      },
    ];

    while (true) {
      // Проверка на конечный узел
      startV = startV.filter((s) => s.ind !== headers.indexOf(end));

      startV.forEach((c) => {
        numData[c.ind].map((val, ind) => {
          if (val !== 0 && ind !== c.prev) c.next.push(ind);
        });
      });

      let paths = [];
      startV.forEach((s) => s.next.forEach((n) => paths.push([s.ind, n])));
      if (paths.length === 0) break;

      setPath(paths);
      await new Promise((resolve) => setTimeout(resolve, 1830));

      startV = startV.map((s) =>
        s.next.map((n) => {
          return { ind: n, prev: s.ind, next: [] };
        })
      );

      startV = startV.flat();
    }
  }

  // Дейтаграммная передача по предыдущему опыту
  async function handleDatagramExp() {
    if (start === "" || end === "") return;

    setInfo((prev) => {
      return prev + "Дейтаграммная передача. Предыдущий опыт\n";
    });

    var count = packsRef.current.value;
    let ttl = Array.from({ length: count }, () => timeToLeave);

    let current = Array.from({ length: count }, () => headers.indexOf(start));
    let result = Array.from({ length: count }, () => ({
      path: [headers.indexOf(start)],
      reason: null,
    }));
    let vertexes = Array.from({ length: count }, () => []);

    setPackets(1);

    const findNeighbours = (i) => {
      const numData = data.map((v) =>
        v.map((x) => (parseInt(x) ? parseInt(x) : 0))
      );

      let neighbors = numData[i]
        .map((val, ind) => {
          if (val === 0) return null;
          return ind;
        })
        .filter((n) => n !== null);

      return neighbors;
      // var row = [...routing[i]];

      // row = row.map((x) => {
      //   if (x === 0) return 1000;
      //   return x;
      // });
      // const minElement = Math.min(...row);

      // if (minElement === 1000) return [];

      // var neighbInds = [];
      // row.forEach((value, index) => {
      //   if (value === minElement) {
      //     neighbInds.push(index);
      //   }
      // });
      // return neighbInds;
    };

    const findPaths = (n) => {
      let paths = [];
      for (let i = 0; i < n; i++) {
        if (current[i] === null) {
          continue;
        }

        // Если пакет достиг назначения
        if (current[i] === headers.indexOf(end)) {
          // setRouting((prevRouting) => {
          //   // Пересчитываем таблицу
          //   let array = prevRouting.map((row) => [...row]);
          //   let path = result[i].path;

          //   for (let k = path.length - 3; k >= 0; k--) {
          //     let row = array[path[k + 1]].filter((x) => x !== 0);
          //     array[path[k]][path[k + 1]] = 1 + Math.min(...row);
          //   }

          //   return array;
          // });
          current[i] = null;
          continue;
        }

        // Если истекло время жизни
        if (ttl[i] === 0) {
          current[i] = null;
          result[i].reason = "ttl";
          continue;
        }

        let neighbors = findNeighbours(current[i]);

        // Если нет соседей
        if (neighbors.length === 0) {
          current[i] = null;
          result[i].reason = "neighb";
          continue;
        }

        const ind =
          neighbors[Math.floor(Math.random() * (neighbors.length - 0)) + 0];

        paths.push({ path: [current[i], ind], num: i + 1 });

        const vA = current[i];
        const vB = ind;

        setRouting((prevRouting) => {
          // Пересчитываем таблицу
          // let array = prevRouting.map((row) => [...row]);
          // let path = result[i].path;

          // for (let k = path.length - 3; k >= 0; k--) {
          //   let row = array[path[k + 1]].filter((x) => x !== 0);
          //   array[path[k]][path[k + 1]] = 1 + Math.min(...row);
          // }

          // return array;
          let array = prevRouting.map((row) => [...row]);
          array[vA][vB] = 1;

          vertexes[i].forEach((v) => {
            if (array[v][vA] + 1 < array[v][vB] || array[v][vB] === null)
              array[v][vB] = array[v][vA] + 1;
          });
          return array;
        });

        vertexes[i].push(current[i]);

        result[i].path.push(ind);
        current[i] = ind;
        ttl[i] -= 1;
      }
      return paths;
    };

    for (let j = 1; j <= count; j++) {
      let paths = findPaths(j);
      setPath(paths);
      await new Promise((resolve) => setTimeout(resolve, 1850));
    }

    while (true) {
      let paths = findPaths(current.length);

      if (paths.every((el) => el === null)) break;

      setPath(paths);
      await new Promise((resolve) => setTimeout(resolve, 1850));
    }

    let info = "";

    // Выводим информацию о перемещении
    result.forEach((r, i) => {
      if (r.reason == null)
        info += buildDgInfo(findDistance(r.path), r.path, i + 1);
      else if (r.reason === "ttl")
        info += buildDgInfo(undefined, r.path, i + 1);
      else info += buildDgInfo(null, r.path, i + 1);
    });

    setInfo((prev) => {
      return prev + info;
    });
  }

  function buildVirtualInfo(distance, path) {
    let str;
    let animate = true;
    if (distance === undefined || distance === Infinity || distance === 0) {
      str = `Пакеты: ${Array.from(
        { length: packsRef.current.value },
        (_, i) => i + 1
      ).join(
        ", "
      )} \nАдрес отправления: ${start} \nАдрес назначения: ${end} \nМаршрута между указанными узлами не существует \n\n`;
      animate = false;
    } else {
      str = `Пакеты: ${Array.from(
        { length: packsRef.current.value },
        (_, i) => i + 1
      ).join(
        ", "
      )} \nАдрес отправления: ${start} \nАдрес назначения: ${end} \nМаршрут: ${path
        .map((v) => headers[v])
        .join("🠒")} \nВремя перемещения пакетов: ${time * distance} ms \n\n`;
    }
    return [animate, str];
  }

  function buildDgInfo(distance, path, num) {
    let str;
    if (distance === undefined) {
      str = `Пакет: ${num} \nАдрес отправления: ${start} \nАдрес назначения: ${end} \nМаршрут: ${path
        .map((v) => headers[v])
        .join("🠒")} \nВремя жизни пакета закончилось\n\n`;
    } else if (distance === null) {
      str = `Пакет: ${num} \nАдрес отправления: ${start} \nАдрес назначения: ${end} \nМаршрут: ${path
        .map((v) => headers[v])
        .join("🠒")} \nПакет потерян\n\n`;
    } else {
      str = `Пакет: ${num} \nАдрес отправления: ${start} \nАдрес назначения: ${end} \nМаршрут: ${path
        .map((v) => headers[v])
        .join("🠒")} \nВремя перемещения пакета: ${time * distance} ms \n\n`;
    }
    return str;
  }

  function findDistance(path) {
    let distance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      distance += parseInt(data[path[i]][path[i + 1]]);
    }
    return distance;
  }

  return (
    <>
      <div className="text-field pack_settings">
        <label className="text-field__label">
          Количество пакетов:&nbsp;
          <input
            className="text-field__unput "
            id="pack_cont"
            type="number"
            min="1"
            max="20"
            ref={packsRef}
            defaultValue={5}
            onBlur={(e) => {
              let val = e.target.value;
              if (val < 1) val = 1;
              if (val > 20) val = 20;
              e.target.value = val;
              setPackets(val);
            }}
          />
        </label>

        <label className="text-field__label">
          Время жизни пакета:&nbsp;
          <input
            className="text-field__unput "
            id="lifetime"
            type="number"
            min="5"
            max="100"
            defaultValue={5}
            onBlur={(e) => {
              let val = e.target.value;
              if (val < 5) val = 5;
              if (val > 100) val = 100;
              e.target.value = val;
              setTimeToLeave(val);
            }}
          />
        </label>
      </div>

      <div className="radio-container">
        <div className="column" onChange={handleTypeChange}>
          <label>
            <input type="radio" name="option1" value={virt} />
            Виртуальный канал
          </label>
          <label>
            <input type="radio" name="option1" value={datagram} />
            Дейтаграммный метод
          </label>
        </div>
        <div className="column" onChange={handleMethodChange}>
          <label>
            <input type="radio" name="option2" value={rnd} />
            Случайная маршрутизация
          </label>
          <label>
            <input
              type="radio"
              ref={avalancheRef}
              name="option2"
              value={avalanche}
            />
            Лавинная маршрутизация
          </label>
          <label>
            <input type="radio" name="option2" value={exp} />
            Маршрутизация по предыдущему опыту
          </label>
        </div>
      </div>
      <button className="btn" onClick={handleSendClick}>
        Отправить пакеты
      </button>
      <button className="btn clear_btn" onClick={() => setInfo("")}>
        Очистить
      </button>
      <button
        className="btn clear_btn routing"
        onClick={() => setRouting(getRouting())}
      >
        Очистить
      </button>
      <div className="result_container">
        <pre className="scrollable-text-block">{info}</pre>
        {routing && (
          <table className="table result_table">
            <thead>
              <tr>
                <th></th>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {routing.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{headers[rowIndex]}</td>
                  {row.map((cell, colIndex) => {
                    if (colIndex === rowIndex)
                      return <td key={colIndex} className="diagonal"></td>;
                    if (cell === null) return <td key={colIndex}></td>;
                    return <td key={colIndex}>{cell}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
