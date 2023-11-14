let fields = [
    null,
    'cross',
    null,
    null,
    null,
    null,
    'circle',
    null,
    null,
];

function init() {
    render();
}

function createAnimatedCircle() {
    // Erstellen des SVG-Elements
    const svgNS = "http://www.w3.org/2000/svg";
    let svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "70px");
    svg.setAttribute("height", "70px");

    // Erstellen des Kreis-Elements
    let circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", "35");
    circle.setAttribute("cy", "35");
    circle.setAttribute("r", "30");
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke", "#00B0EF");
    circle.setAttribute("stroke-width", "5");
    circle.setAttribute("stroke-dasharray", "188.4"); // Umfang des Kreises
    circle.setAttribute("stroke-dashoffset", "188.4");

    // Hinzufügen der Animation
    circle.style.animation = "fillCircle 2s ease forwards";

    // Hinzufügen des Kreises zum SVG-Element
    svg.appendChild(circle);

    // Rückgabe des SVG-Elements als HTML-String
    return svg.outerHTML;
}

function render() {
    let content = document.getElementById('content');
    let tableHTML = '<table>';

    for (let i = 0; i < fields.length; i++) {
        if (i % 3 === 0) {
            tableHTML += '<tr>';
        }

        let cellContent = '';
        if (fields[i] === 'circle') {
            cellContent = createAnimatedCircle();
        } else if (fields[i] === 'cross') {
            cellContent = 'X';
        }

        tableHTML += `<td>${cellContent}</td>`;

        if (i % 3 === 2) {
            tableHTML += '</tr>';
        }
    }

    tableHTML += '</table>';
    content.innerHTML = tableHTML;
}

// Stellen Sie sicher, dass der CSS-Code für die Animation im Dokument vorhanden ist
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fillCircle {
        to {
            stroke-dashoffset: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialisierung des Spiels
init();
