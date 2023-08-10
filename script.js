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
    ctx.strokeStyle = colorSelect.value;

    if(eraser.classList.contains('active')){
        ctx.strokeStyle = '#FFFFFF';
    }

    if(!isDrawing){
        lastX = e.offsetX;
        lastY = e.offsetY;
        return;
    } 

    console.log(e);


    ctx.beginPath();


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



const toolbox = document.getElementById('tool-box');
const parent = document.getElementsByClassName('parent');


widthSelect.addEventListener('change',()=>{
    ctx.lineWidth = widthSelect.value;
});




const eraser = document.getElementById('eraser');

eraser.addEventListener('click',()=>{
    if(eraser.classList.contains('active')){
        ctx.strokeStyle = `${color}`;
        ctx.lineWidth = widthSelect.value;
        eraser.classList.remove('active');
        console.log('eraser deslected');
    }
    else{
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 20;
        eraser.classList.add('active');
        console.log('eraser selected');
    }
});






let isDragging = false;
let dragStartX, dragStartY;

const move = document.getElementById('move');

move.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStartX = e.clientX - toolbox.getBoundingClientRect().left;
    dragStartY = e.clientY - toolbox.getBoundingClientRect().top;

    toolbox.classList.add('dragging');
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const x = e.clientX - dragStartX;
    const y = e.clientY - dragStartY;

    toolbox.style.left = `${x}px`;
    toolbox.style.top = `${y}px`;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    toolbox.classList.remove('dragging');
});
