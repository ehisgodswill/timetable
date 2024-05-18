import { array } from 'prop-types';
import { useState } from 'react'

function App() {
  const cell = {
    value: '',
    selected: false,
    disabled: false
  }
  const [tableData, settableData] = useState({
    head: [{ ...cell, value: 'Time / Date', disabled: true }, { ...cell }, { ...cell }, { ...cell }],
    body: [
      [{ ...cell }, { ...cell }, { ...cell }, { ...cell }],
      [{ ...cell }, { ...cell }, { ...cell }, { ...cell }],
    ]
  })
  const handleInput = (event, index, rowIndex) => {
    const value = event.target.value;
    let data = { ...tableData };

    if (rowIndex === -1) {
      data.head[index].value = value;
    } else {
      data.body[rowIndex][index].value = value;
    }
    settableData(data);
  }

  const addRow = (row) => {
    let data = { ...tableData };
    let newArr = []
    for (let i = 0; i < data.body[row].length; i++) {
      newArr[i] = { ...cell }
    }

    data.body = [
      ...data.body.slice(0, row + 1),
      newArr,
      ...data.body.slice(row + 1),
    ]
    settableData(data)
  }
  const selectRow = (row) => {
    let data = { ...tableData }
    if (data.body[row].every(cell => cell.selected)) {
      data.body[row].forEach(cell => cell.selected = false);
    } else {
      data.body[row].forEach(cell => cell.selected = true);
    }
    settableData(data);
  }

  const addColumn = (col) => {
    let data = { ...tableData };

    data.head = [
      ...data.head.slice(0, col + 1), { ...cell }, ...data.head.slice(col + 1)
    ];
    data.body = data.body.map(row => [
      ...row.slice(0, col + 1), { ...cell }, ...row.slice(col + 1)
    ])
    console.log(data.body);
    settableData(data)
  }

  const selectColumn = (col) => {
    let data = { ...tableData }
    const bool = data.body.every(row => row[col].selected)

    data.body.forEach(row => {
      row[col].selected = !bool;
    })
    settableData(data);
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(row, ev) {
    ev.dataTransfer.setData("text", row);
  }

  function drop(row, ev) {
    ev.preventDefault();
    const from = parseInt(ev.dataTransfer.getData("text"));
    let body = [...tableData.body].filter((row, ri) => ri !== from)

    body = [...body.slice(0, row), [...tableData.body[from]], ...body.slice(row) ]

    settableData({...tableData, body})
  }

  return (
    <div className='container'>
      <table>
        <thead><tr>
          {tableData.head.map((cell, ci) => <th key={ci} selected={cell.selected}>
            {ci > 0 && <div className='clmbtn'>
              {/* <button title='select row' className='button' onClick={() => selectColumn(ci)}>&#9783;</button> */}
              <button title='Add column' className='button' onClick={() => addColumn(ci)}>&#10010;</button>
            </div>}
            <input value={cell.value} onChange={(e) => handleInput(e, ci, -1)} disabled={cell.disabled} /></th>)}
        </tr></thead>
        <tbody>{tableData.body.map((row, ri) =>
          <tr key={ri} >
            {row.map((cell, ci) => <td key={ci} onDrop={(ev) => drop(ri, ev)} onDragOver={allowDrop}>
              {ci === 0 && <div className='optdiv' draggable onDragStart={(ev) => drag(ri, ev)} >
                <div className='optbtn'>
                  <button title='select row' className='button' onClick={() => selectRow(ri)}>&#9783;</button>
                  <button title='Add row' className='button' onClick={() => addRow(ri)}>&#10010;</button>
                </div>
                <div></div>
              </div>}
              <input value={cell.value} className={cell.selected ? 'selected' : ''} onChange={(e) => handleInput(e, ci, ri)} disabled={cell.disabled} />
            </td>)}
          </tr>
        )}</tbody>
      </table>

    </div>
  )
}

export default App
