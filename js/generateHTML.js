function createSvgElement(content) {
    const svgNS = "http://www.w3.org/2000/svg";
    let svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", content.clientWidth);
    svg.setAttribute("height", content.clientHeight);
    svg.style.position = "absolute";
    svg.style.top = content.offsetTop + "px";
    svg.style.left = content.offsetLeft + "px";
    return svg;
}

function createLineElement(svgNS) {
    let line = document.createElementNS(svgNS, "line");
    line.setAttribute("stroke", "red");
    line.setAttribute("stroke-width", "5");
    return line;
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

function loadImpressum() {
    let contentHomePage = document.getElementById('contenthomepage');
    contentHomePage.innerHTML = `
    <div class="impressum-container">
    <p class="impressum-text">
    Silvan Stuber<br />
    Bernstrasse 46<br />
    3267 Seedorf
  </p>
  <h2 class="second-headline-impressum">Contact</h2>
  <a class="link-impressum" href="mailto:silvan.stuber1@gmail.com"
    >E-Mail: silvan.stuber1@gmail.com</a
  >
  <p onclick="init()" class="link-impressum">Startseite</p>
  </div>
    `;
}

function renderhomePage() {
    let contentHomePage = document.getElementById('contenthomepage');
    contentHomePage.innerHTML = `
    <form
      class="player-registration"
      onsubmit="registerPlayers(); return false;">
      <input type="text" id="player1Name" placeholder="Name des Spielers 1" required/>
      <input type="text" id="player2Name" placeholder="Name des Spielers 2" required/>
      <button>Start Spiel</button>
    </form>
    <div class="footer-container">
        <footer>
           <p class="text-footer">© Silvan Stuber</p>
           <p onclick="loadImpressum()" class="link-footer">Impressum</p>
         </footer>
    </div>
    `;
}

function renderRestartButton() {
    let restartContainer = document.getElementById('restartcontainer');
    restartContainer.innerHTML = `
    <form  onsubmit="restartGame()" class="button-container">
    <button class="restart-button">
      Spiel neu starten
    </button>
    </form>
    `;
}

function showWinner(player) {
    let contentWinner = document.getElementById('updateplayers');
    contentWinner.innerHTML = `
      <div class="winner-display">
        <h2>Gewinner: ${player}</h2>
      </div>
    `;
}