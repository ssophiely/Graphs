export default function VirtualChannel({
  virtualInfo,
  virtualOnClick,
  setVirtualInfo,
}) {
  return (
    <div id="res">
      <button className="btn" onClick={virtualOnClick}>
        Передать по виртуальному каналу
      </button>
      <button className="btn clear_btn" onClick={() => setVirtualInfo("")}>
        Очистить
      </button>
      <table className="res_table virt">
        <tbody>
          <tr>
            <td>
              <pre className="scrollable">{virtualInfo}</pre>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
