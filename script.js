let fields = [
    null, null, null,
    null, null, null,
    null, null, null
];

let currentPlayer = 'circle';

function init() {
    render();
    attachClickHandlers();
}

function cellClicked(event) {
    const cellIndex = event.target.dataset.index;

    if (fields[cellIndex] === null && !checkGameOver()) {
        fields[cellIndex] = currentPlayer;
        updateCell(cellIndex);

        if (!checkGameOver()) {
            currentPlayer = (currentPlayer === 'circle') ? 'cross' : 'circle';
        } else {
            disableClickHandlers();
        }
    }
}

function createCircle() {
    const svgNS = "http://www.w3.org/2000/svg";
    let svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "60px");
    svg.setAttribute("height", "60px");
    let circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", "30");
    circle.setAttribute("cy", "30");
    circle.setAttribute("r", "25");
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke", "#00B0EF");
    circle.setAttribute("stroke-width", "5");
    circle.setAttribute("stroke-dasharray", "157");
    circle.setAttribute("stroke-dashoffset", "157");
    circle.classList.add("circle-animation");
    svg.appendChild(circle);
    return svg.outerHTML;
}

function createCross() {
    const svgNS = "http://www.w3.org/2000/svg";
    let svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "60px");
    svg.setAttribute("height", "60px");
    let line1 = document.createElementNS(svgNS, "line");
    line1.setAttribute("x1", "5");
    line1.setAttribute("y1", "5");
    line1.setAttribute("x2", "55");
    line1.setAttribute("y2", "55");
    line1.setAttribute("stroke", "#ffc000");
    line1.setAttribute("stroke-width", "5");
    line1.classList.add("cross-animation");
    let line2 = document.createElementNS(svgNS, "line");
    line2.setAttribute("x1", "55");
    line2.setAttribute("y1", "5");
    line2.setAttribute("x2", "5");
    line2.setAttribute("y2", "55");
    line2.setAttribute("stroke", "#ffc000");
    line2.setAttribute("stroke-width", "5");
    line2.classList.add("cross-animation");
    svg.appendChild(line1);
    svg.appendChild(line2);
    return svg.outerHTML;
}

function updateCell(index) {
    const cell = document.querySelector(`td[data-index='${index}']`);
    if (fields[index] === 'circle') {
        cell.innerHTML = createCircle();
    } else if (fields[index] === 'cross') {
        cell.innerHTML = createCross();
    }
}

function checkGameOver() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            drawWinningLine(combination);
            return true;
        }
    }

    return false;
}

function disableClickHandlers() {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.onclick = null;
    });
}

function drawWinningLine(combination) {
    const content = document.getElementById('content');
    const firstCell = document.querySelector(`td[data-index='${combination[0]}']`);
    const lastCell = document.querySelector(`td[data-index='${combination[2]}']`);

    const firstCellRect = firstCell.getBoundingClientRect();
    const lastCellRect = lastCell.getBoundingClientRect();

    const line = document.createElement("div");
    line.id = "winning-line";
    
    // Anpassen der Linie je nach Orientierung (horizontal, vertikal, diagonal)
    if (combination[0] % 3 === 0 && combination[2] === combination[0] + 2) {
        // Horizontal
        line.style.width = `${lastCellRect.right - firstCellRect.left}px`;
        line.style.height = '5px';
        line.style.top = `${firstCellRect.top + firstCellRect.height / 2}px`;
        line.style.left = `${firstCellRect.left}px`;
    } else if (combination[0] < 3 && combination[2] > 5) {
        // Vertikal
        line.style.width = '5px';
        line.style.height = `${lastCellRect.bottom - firstCellRect.top}px`;
        line.style.top = `${firstCellRect.top}px`;
        line.style.left = `${firstCellRect.left + firstCellRect.width / 2}px`;
    } else {
        // Diagonal
        // Hier müssen Sie die Logik für diagonale Linien anpassen
    }

    document.body.appendChild(line); // Füge die Linie dem Body hinzu, nicht dem #content
}



function createLine() {
    const svgNS = "http://www.w3.org/2000/svg";
    let svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "winning-line");
    svg.setAttribute("width", "80");
    svg.setAttribute("height", "80");

    let line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", "0");
    line.setAttribute("y1", "0");
    line.setAttribute("x2", "80");
    line.setAttribute("y2", "80");
    line.setAttribute("stroke", "red");
    line.setAttribute("stroke-width", "5");

    svg.appendChild(line);
    return svg.outerHTML;
}

function render() {
    let content = document.getElementById('content');
    let tableHTML = '<table>';

    for (let i = 0; i < fields.length; i++) {
        if (i % 3 === 0) {
            tableHTML += '<tr>';
        }

        tableHTML += `<td data-index="${i}"></td>`;

        if (i % 3 === 2) {
            tableHTML += '</tr>';
        }
    }

    tableHTML += '</table>';
    content.innerHTML = tableHTML;
}

function attachClickHandlers() {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.onclick = cellClicked;
    });
}

init();
