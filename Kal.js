let w = 0, h = 0;
const image = new Image();
const opp = 174, adj = 420, hyp = 480;
const triangleCanvas = new OffscreenCanvas(opp, adj);
const hexagonCanvas = new OffscreenCanvas(2*hyp, 2*adj);

function fixSize() {
    w = window.innerWidth;
    h = window.innerHeight;
    const canvas = document.getElementById('rotateyCanvas');
    canvas.width = w;
    canvas.height = h;
}

function pageLoad() {

    window.addEventListener("resize", fixSize);
    fixSize();

    image.src = "Sbeve.jpg";
    image.onload = () => window.requestAnimationFrame(redraw);

}

let lastTimestamp = 0;
let angle = 0;

function redraw(timestamp) {

    if (lastTimestamp === 0) lastTimestamp = timestamp;
    const frameLength = (timestamp - lastTimestamp) / 800;
    lastTimestamp = timestamp;

    angle += frameLength/2;
    renderTriangle();
    renderHexagon();

    const canvas = document.getElementById('rotateyCanvas');
    const context = canvas.getContext('2d');


    context.drawImage(hexagonCanvas, 0, 0);
    renderKaleidoscope();
    window.requestAnimationFrame(redraw);

}

function renderTriangle() {

    const context = triangleCanvas.getContext('2d');

    context.clearRect(0,0,opp,adj);

    context.fillStyle = 'white';
    context.globalCompositeOperation="source-over";

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, adj);
    context.lineTo(opp, adj);
    context.lineTo(0, 0);
    context.fill();

    context.globalCompositeOperation="source-in";

    context.save();
    context.translate(opp/2, adj/2)
    context.rotate(angle);
    context.drawImage(image, -image.width/2, -image.height/2);
    context.restore();

}
function renderHexagon() {

    const context = hexagonCanvas.getContext('2d');

    context.save();

    context.translate(hyp,adj);

    for (let j = 0; j < 12; j ++) {

        context.drawImage(triangleCanvas,0,0);

        context.scale(-1,1);
        context.drawImage(triangleCanvas,0,0);
        context.scale(-1,1);

        context.rotate(Math.PI/4);

    }

    context.restore();

}

function renderKaleidoscope() {

    const canvas = document.getElementById('rotateyCanvas');
    const context = canvas.getContext('2d');

    context.fillStyle = '#CD97E5';
    context.fillRect(0,0,w,h);

    context.save();
    context.translate(w/2-hyp, h/2-adj);

    context.globalAlpha = 1;
    context.drawImage(hexagonCanvas, 0,0);

    context.globalAlpha = 0.5;
    for (let i = 0; i < 6; i++) {
        context.drawImage(hexagonCanvas, 2*adj*Math.sin(i*Math.PI/3),2*adj*Math.cos(i*Math.PI/3));
    }

    context.restore();

}
