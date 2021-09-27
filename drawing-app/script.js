const drawingContainer = document.getElementById('drawing-container');
const canvas = document.getElementById('canvas');
const colourSelector = document.getElementById('head');
const brushThicknessSlider = document.getElementById('thickness-slider')
const brushSize = document.getElementById('brush-thick');
const colourNameToRGB = {
    'red' : '#ff0000',
    'orange' : '#FFA500',
    'yellow' : '#FFFF00',
    'green' : '#00ff00',
    'blue' : '#0000ff',
    'indigo' : '#4B0082',
    'violet' : '#8F00FF',
    'black' : '#000000'
}
var ctxColour = '#add8e6';
var colourStore = '';
var ctxLineWidth = 5;

/**** Event Listeners *****/
// canvas
window.addEventListener('resize', resize);
drawingContainer.addEventListener('mousemove', draw);
drawingContainer.addEventListener('mousedown', setPosition);
drawingContainer.addEventListener('mouseenter', setPosition);


/**** SELECTOR FUNCTIONALITY ****/
function changeColour()
{
    var colour = colourSelector.value;
    ctxColour = colour;
}

function eraser()
{
    var btn = document.getElementById('eraser-btn');
    console.log(btn.value);
    if (btn.value == 'Off')
    {
        btn.value = 'On';
        colourStore = ctxColour;
        ctxColour = 'white';
        btn.style.color = 'rgb(139, 132, 132)';
    }
    else 
    {
        btn.value = 'Off';
        btn.style.color = 'white';
        ctxColour = colourStore;
    }
}

function selectColour(colour)
{
    colourSelector.value = colourNameToRGB[colour];
    ctxColour = colour;
}

//BRUSH THICKNESS FUNCTIONALITY //
brushSize.innerHTML =  ctxLineWidth;
// initialise slider val
brushThicknessSlider.value = ctxLineWidth;

// dyanamically adjust slider val
brushThicknessSlider.oninput = function() {
    ctxLineWidth = brushThicknessSlider.value;
    brushSize.innerHTML = brushThicknessSlider.value;
}


/**** CANVAS FUNCTIONALITY ****/

// get canvas 2D context and set him correct size
var ctx = canvas.getContext('2d');
resize();

// last known position
var pos = { x: 0, y: 0 };

// new position from mouse event
function setPosition(e) 
{
    // offset for positioning in the centre
    pos.x = e.clientX - 360;
    pos.y = e.clientY - 192;
}

// resize canvas
function resize() 
{
    ctx.canvas.width = 1200;
    ctx.canvas.height = 700;
}

function draw(e) 
{
    // mouse left button must be pressed
    if (e.buttons !== 1) return;

    ctx.beginPath(); // begin

    ctx.lineWidth = ctxLineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = ctxColour;

    ctx.moveTo(pos.x, pos.y); // from
    setPosition(e);
    ctx.lineTo(pos.x, pos.y); // to

    ctx.stroke(); // draw it!
}