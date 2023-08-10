const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

var widthSelect = document.querySelector('#range');
var colorSelect = document.getElementById('color-picker');

var setW = widthSelect.value;
var color = colorSelect.value;


ctx.strokeStyle = `${color}`;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 3;


let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(e){
    ctx.lineWidth = widthSelect.value;
    color = colorSelect.value;

    if(!isDrawing){
        lastX = e.offsetX;
        lastY = e.offsetY;
        return;
    } 

    console.log(e);


    ctx.beginPath();
    ctx.strokeStyle = `${color}`;


    ctx.moveTo(lastX,lastY);
    lastX = e.offsetX;
    lastY = e.offsetY;
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();

}
canvas.addEventListener('mousemove',draw);
canvas.addEventListener('mousedown',()=> isDrawing = true);
canvas.addEventListener('mouseup',()=> isDrawing = false);
canvas.addEventListener('mouseout',()=> isDrawing = false);



widthSelect.addEventListener('change',()=>{
    ctx.lineWidth = widthSelect.value;
});

const eraser = document.getElementById('eraser');

eraser.addEventListener('click',()=>{
    if(eraser.classList.contains('active')){
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 20;
        eraser.classList.add('active');
    }
    else{
        ctx.strokeStyle = `${color}`;
        ctx.lineWidth = widthSelect.value;
        eraser.classList.remove('active');
    }
});

