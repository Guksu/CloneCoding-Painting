const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const color = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const fill = document.getElementById("jsFill");
const defalutColor = "black"; //그림 그를시 기본색은 검은색으로 디폴트
const saveBtn = document.getElementById("jsSave");

//css와 js의 캔버스 영역이 따로 설정되어있으므로 둘의 크기를 같게 해줘야함
canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 700);
//위의 2코드는 이미지를 저장시 배경화면색 기본값을 white로 설정한것
ctx.strokeStyle = defalutColor; //그림 그를시 기본색은 검은색으로 디폴트
ctx.fillStyle = defalutColor;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function clickChangeColor(event) {
  const bgColor = event.target.style.backgroundColor;
  ctx.strokeStyle = bgColor;
  ctx.fillStyle = bgColor;
}

function changeRange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}
//기본 defalut값은 Paint(화면상으론 Paint상태이므로 Fill로 보임)
function fillTheCanvas() {
  if (filling === true) {
    filling = false;
    fill.innerText = "Fill";
  } else {
    filling = true;
    fill.innerText = "Paint";
  }
}
function canvasClick() {
  //"Paint" 상태에선 실행이 되지 않아야 하므로 if문을 사용
  if (filling) {
    ctx.fillRect(0, 0, 700, 700); //x , y ,width, height   //x,y좌표에서 시작하여 width와height크기의  사각형을 만드는 코드
  }
}

function rightClick(event) {
  event.preventDefault();
}

function saveImg() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "Painting🎨";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", canvasClick);
  canvas.addEventListener("contextmenu", rightClick);
}

//color변수를 array형태로 변환하고 그 각각의 요소의 컬러를 클릭시 변환하는 코드 // forEach안의 color는 그냥 array의 item을 대표하는 변수명으로 다른 이름으로 바꿔도 상관없다.
Array.from(color).forEach((color) =>
  color.addEventListener("click", clickChangeColor)
);

//if문을 사용하는 이유는 range가 존재할 경우 발생하는 일종의 더블체크
if (range) {
  range.addEventListener("input", changeRange);
}

if (fill) {
  fill.addEventListener("click", fillTheCanvas);
}

if (saveBtn) {
  saveBtn.addEventListener("click", saveImg);
}
