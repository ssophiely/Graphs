export default function Datagram({
  info1,
  info2,
  info3,
  dg1OnClick,
  dg2OnClick,
  dg3OnClick,
}) {
  return (
    <div id="res">
      <table className="res_table dg_table">
        <tbody>
          <tr className="dg_type">
            <td>Случайная маршрутизация</td>
            <td>Лавинная маршрутизация</td>
            <td>Маршрутизация по предыдущему опыту </td>
          </tr>
          <tr>
            <td>
              <button className="btn res_btn" onClick={dg1OnClick}>
                Дейтаграммная передача
              </button>
            </td>
            <td>
              <button className="btn res_btn" onClick={dg2OnClick}>
                Дейтаграммная передача
              </button>
            </td>
            <td>
              <button className="btn res_btn" onClick={dg3OnClick}>
                Дейтаграммная передача
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <pre className="scrollable dg_info">{info1}</pre>
            </td>
            <td>
              <pre className="scrollable dg_info">{info2}</pre>
            </td>
            <td>
              <pre className="scrollable dg_info">{info3}</pre>
            </td>
          </tr>
          <tr>
            <td>
              <button className="btn clear_btn" onClick={dg1OnClick}>
                Очистить
              </button>
            </td>
            <td>
              <button className="btn clear_btn" onClick={dg2OnClick}>
                Очистить
              </button>
            </td>
            <td>
              <button className="btn clear_btn" onClick={dg3OnClick}>
                Очистить
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
