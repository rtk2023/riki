/*
    Galvenais kanvass, uz šī tiek veidoti zīmējumi, attēli, u.t.l
*/
import pen from "./Tools/Pen.js";

const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let drawing = false;

canvas.width = 960;
canvas.height = 540;

ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0, 0, canvas.width, canvas.height);

window.currentTool = pen; // izmantojam window. lai varētu piekļūt no citām vietām

canvas.addEventListener("mousedown", (e) => {
    saveToHistory()
    drawing = true;

    ctx.beginPath()
    ctx.lineWidth = document.getElementById('lineWidth').value;

    currentTool.draw(ctx)
});

canvas.addEventListener("mousemove", (e) => {
    if(!drawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
})

canvas.addEventListener("mouseup", () => {
    drawing = false;
})

canvas.addEventListener("mouseleave", () => {
    drawing = false;
})

let buffers = []
let maxBufferSize = 64
function saveToHistory(){
    buffers.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    if (buffers.length > maxBufferSize) {
        buffers.shift();
    }
    console.log(buffers.length)
}
window.saveToHistory = saveToHistory

function undo(){
    console.log(buffers.length)
    if(buffers.length>0){
        let last = buffers.pop()
        ctx.putImageData(last, 0, 0)
    }
}
window.undo = undo

document.getElementById('undo').addEventListener('click', () => {
    undo()
    console.log(buffers.length)
})

function setCanvasScale(width,height){
    canvas.width = width
    canvas.height = height
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    document.getElementById('canvas').style.width = width + 'px'
    document.getElementById('canvas').style.height = height + 'px'
}

window.setCanvasScale = setCanvasScale

document.getElementById("canvasWidth") .addEventListener("change", function() {
    let width = parseInt(this.value)
    let height = parseInt(document.getElementById("canvasHeight").value)
    setCanvasScale(width,height)

    document.getElementById("canvasHeight").value = height
    document.getElementById("canvasWidth").value = width
})

document.getElementById("canvasHeight") .addEventListener("change", function() {
    let width = parseInt(document.getElementById("canvasWidth").value)
    let height = parseInt(this.value)
    setCanvasScale(width,height)

    document.getElementById("canvasHeight").value = height
    document.getElementById("canvasWidth").value = width
})

export default {currentTool}
