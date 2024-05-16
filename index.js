var tableRows = [
    ['Time / Date', '', '', ''],
    ['', '', '', '']
]
var table = document.getElementById('table');
const thead = table.getElementsByTagName('thead')[0];
const tbody = table.getElementsByTagName('tbody')[0];

function remapTable() {
    // console.log(tableRows);
    tbody.innerHTML = '';
    tableRows.forEach((row, ri) => {
        if (ri === 0) {
            let jsx = '<tr>'
            row.forEach((column, ci) => {
                jsx += `<th ondrop="drop(event)" ondragover="allowDrop(event)"><input value="${column}" onChange="handleInp(event)" id="inp-${ri}-${ci}" draggable="true" ondragstart="drag(event)" /></th>`
            })
            // jsx += `<th class="addColumn"><button type="button" onclick="addColumn()">Add Column</button></th>`
            jsx += '</tr>'
            thead.innerHTML = jsx;
        } else {
            let jsx = '<tr>'
            row.forEach((column, ci) => {
                jsx += `<td ondrop="drop(event)" ondragover="allowDrop(event)"><input value="${column}" onChange="handleInp(event)" id="inp-${ri}-${ci}" draggable="true" ondragstart="drag(event)" /></td>`
            })
            jsx += '</tr>'
            tbody.innerHTML += jsx;
        }

    })
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    const to = ev.target.id.split('-')
    const from = ev.dataTransfer.getData("text").split('-');


    tableRows[to[1]][to[2]] = tableRows[from[1]][from[2]];
    remapTable()

}

function handleInp(ev) {
    const target = ev.target.id.split('-');
    tableRows[target[1]][target[2]] = ev.target.value
}

function addColumn() {
    tableRows.forEach(row => row.push(''));
    remapTable();

}
function addRow() {
    tableRows.push(tableRows[0].map(() => ''));
    remapTable();
}

remapTable();
