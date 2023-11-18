let fields = [
    null, null, null,
    null, null, null,
    null, null, null
];

let currentPlayer = 'circle';
let playerNames = { circle: "", cross: "" };

function init() {
    restartGame();
    renderhomePage();
}

function registerPlayers() {
    playerNames.circle = document.getElementById('player1Name').value;
    playerNames.cross = document.getElementById('player2Name').value;
    let whichPlayerIsToBe = playerNames.circle;
    document.getElementById('players').innerHTML = `<b class="color-player-circle">Spieler 1: ${playerNames.circle}</b> <b class="color-player-cross">Spieler 2: ${playerNames.cross}</b>`;
    document.getElementById('updateplayers').innerHTML = `<h2 class="color-player-circle"> ${whichPlayerIsToBe} ist am Zug </h2>`;
    renderGame();
    attachClickHandlers();
    generateGame();
    renderRestartButton();
    document.addEventListener('DOMContentLoaded', (event) => {
    });
    document.getElementById('contenthomepage').innerHTML = ``;
}

function generateGame() {
    loadGame();
    if (checkGameOver()) {
        disableClickHandlers();
    }
    attachClickHandlers();
}

function renderGame() {
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

function restartGame() {
    fields = fields.map(() => null);
    currentPlayer = 'circle';
    playerNames = { circle: "", cross: "" };
    localStorage.removeItem('ticTacToeGame');
    fields = fields.map(() => null);
    currentPlayer = 'circle';
    const winLines = document.querySelectorAll('svg');
    winLines.forEach(line => line.remove());
    document.getElementById('players').innerHTML = '';

    document.getElementById('content').innerHTML = ``;
    document.getElementById('updateplayers').innerHTML = ``;
}

function cellClicked(event) {
    const cellIndex = event.target.dataset.index;
    if (fields[cellIndex] === null && !checkGameOver()) {
        fields[cellIndex] = currentPlayer;
        updateCell(cellIndex);
        if (!checkGameOver()) {
            currentPlayer = (currentPlayer === 'circle') ? 'cross' : 'circle';
            updatePlayer();
        } else {
            disableClickHandlers();
        }
    }
    saveGame();
}

function updateCell(index) {
    const cell = document.querySelector(`td[data-index='${index}']`);
    if (fields[index] === 'circle') {
        cell.innerHTML = createCircle();
    } else if (fields[index] === 'cross') {
        cell.innerHTML = createCross();
    }
}

function updatePlayer() {
    if (currentPlayer === 'cross') {
        nextPlayer = playerNames.cross
        colorNextPlayer = `color-player-cross`
    } else {
        nextPlayer = playerNames.circle
        colorNextPlayer = `color-player-circle`
    }
    document.getElementById('players').innerHTML = `<b class="color-player-circle">Spieler 1: ${playerNames.circle}</b> <b class="color-player-cross">Spieler 2: ${playerNames.cross}</b>`;
    document.getElementById('updateplayers').innerHTML = `<h2 class="${colorNextPlayer}"> ${nextPlayer} ist am Zug </h2>`;
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
            showWinner(playerNames[fields[a]]);
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

function calculateLinePositions(combination) {
    const firstCell = document.querySelector(`td[data-index='${combination[0]}']`);
    const lastCell = document.querySelector(`td[data-index='${combination[2]}']`);
    const firstCellRect = firstCell.getBoundingClientRect();
    const lastCellRect = lastCell.getBoundingClientRect();
    let positions = { x1: 0, y1: 0, x2: 0, y2: 0 };
    if (combination[0] === 0 && combination[2] === 6) {
        positions = generatePositionOfLineFirstColumn(firstCellRect, lastCellRect);
    } else if (combination.includes(0) && combination.includes(8)) {
        positions = generateDiagonalPositionFromTopLeftToBottomRight(firstCellRect, lastCellRect);
    } else if (combination.includes(2) && combination.includes(6)) {
        positions = generateDiagonalPositionFromTopRightToBottomLeft(firstCellRect, lastCellRect);
    } else if (combination[0] % 3 === 0) {
        positions = generateHorizontalPosition(firstCellRect, lastCellRect);
    } else {
        positions = generateVerticalPosition(firstCellRect, lastCellRect);
    };
    return positions;
}

function generatePositionOfLineFirstColumn(firstCellRect, lastCellRect) {
    return positions = {
        x1: firstCellRect.left - content.offsetLeft + firstCellRect.width / 2,
        y1: firstCellRect.top - content.offsetTop + firstCellRect.height / 2,
        x2: firstCellRect.left - content.offsetLeft + firstCellRect.width / 2,
        y2: lastCellRect.bottom - content.offsetTop - lastCellRect.height / 2
    };
}

function generateDiagonalPositionFromTopLeftToBottomRight(firstCellRect, lastCellRect) {
    return position = {
        x1: firstCellRect.left - content.offsetLeft + firstCellRect.width / 2,
        y1: firstCellRect.top - content.offsetTop + firstCellRect.height / 2,
        x2: lastCellRect.right - content.offsetLeft - lastCellRect.width / 2,
        y2: lastCellRect.bottom - content.offsetTop - lastCellRect.height / 2
    };
}

function generateDiagonalPositionFromTopRightToBottomLeft(firstCellRect, lastCellRect) {
    return position = {
        x1: lastCellRect.right - content.offsetLeft - lastCellRect.width / 2,
        y1: lastCellRect.top - content.offsetTop + lastCellRect.height / 2,
        x2: firstCellRect.left - content.offsetLeft + firstCellRect.width / 2,
        y2: firstCellRect.bottom - content.offsetTop - firstCellRect.height / 2
    };
}

function generateHorizontalPosition(firstCellRect, lastCellRect) {
    return position = {
        x1: firstCellRect.left - content.offsetLeft + firstCellRect.width / 2,
        y1: firstCellRect.top - content.offsetTop + firstCellRect.height / 2,
        x2: lastCellRect.right - content.offsetLeft - lastCellRect.width / 2,
        y2: firstCellRect.top - content.offsetTop + firstCellRect.height / 2
    };
}

function generateVerticalPosition(firstCellRect, lastCellRect) {
    return position = {
        x1: firstCellRect.left - content.offsetLeft + firstCellRect.width / 2,
        y1: firstCellRect.top - content.offsetTop + firstCellRect.height / 2,
        x2: firstCellRect.left - content.offsetLeft + firstCellRect.width / 2,
        y2: lastCellRect.bottom - content.offsetTop - lastCellRect.height / 2
    };
}

function setLineAttributes(line, positions) {
    line.setAttribute("x1", positions.x1);
    line.setAttribute("y1", positions.y1);
    line.setAttribute("x2", positions.x2);
    line.setAttribute("y2", positions.y2);
}

function drawWinningLine(combination) {
    const content = document.getElementById('content');
    const svgNS = "http://www.w3.org/2000/svg";
    let svg = createSvgElement(content);
    let line = createLineElement(svgNS);
    let positions = calculateLinePositions(combination, content);
    setLineAttributes(line, positions);
    svg.appendChild(line);
    content.appendChild(svg);
}

function attachClickHandlers() {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.onclick = cellClicked;
    });
}

function saveGame() {
    const gameData = {
        fields: fields,
        currentPlayer: currentPlayer,
        playerNames: playerNames
    };
    localStorage.setItem('ticTacToeGame', JSON.stringify(gameData));
}

function loadGame() {
    const savedGame = localStorage.getItem('ticTacToeGame');
    if (savedGame) {
        const gameData = JSON.parse(savedGame);
        fields = gameData.fields;
        currentPlayer = gameData.currentPlayer;
        playerNames = gameData.playerNames;
        renderGame();
    }
}
