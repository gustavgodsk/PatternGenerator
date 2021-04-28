
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const select = document.querySelector("select")
select.value = "cOne"
const select2 = document.getElementById("select2")
select2.value = "source-over"
const resetBtn = document.getElementById("resetBtn")
const blackBtn = document.getElementById("blackBtn")
const resetAllBtn = document.getElementById("resetAllBtn")
const noiseBtn = document.getElementById("noiseBtn")
const navShow = document.getElementById("navShow")
const navHide = document.getElementById("navHide")
const buttonDiv = document.getElementById("buttonDiv")
const helpDiv = document.querySelector(".helpDiv")
const textDiv = document.querySelector(".textDiv")
const radiusField = document.getElementById("radiusField")
const numberField = document.getElementById("numberField")
const widthField = document.getElementById("widthField")
const navShowImg = document.getElementById("navShowImg")
const navHideImg = document.getElementById("navHideImg")
const checkBox = document.getElementById("checkBox")
const slider = document.getElementById("myRange")
const refreshRate = document.getElementById("myInterval")

canvas.scrollIntoView()

const canvas2 = document.getElementById("canvas2")
const c2 = canvas2.getContext('2d')
canvas2.width = innerWidth
canvas2.height = innerHeight

canvas.width = innerWidth
canvas.height = innerHeight
const cData = c.getImageData(0, 0, canvas.width, canvas.height)

let dots = []
let firstrun = true;
let secondrun = false;
let firstF = true;
let radiusFirst = true;
let numberFirst = true;
let widthFirst = true;
let speedFirst = true;
let radiusFocused = false;
let numberFocused = false;
let dontConnect = false;
let popDots = false;
let drawDot = true;
let drawLine = true;

let velocity = {x: 0, y: 0}

//Dot properties
class Dot {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
}
let isDrawing = false
//Generate dots on mouse position
canvas.addEventListener("mousedown", (e) =>{
    this.mouseX = e.clientX
    this.mouseY = e.clientY
    GenerateDots(this.mouseX, this.mouseY)
    isDrawing = true
})

canvas.addEventListener("mousemove", (e) => {
    if (isDrawing === true){
        this.mouseX = e.clientX
        this.mouseY = e.clientY
        GenerateDots(this.mouseX, this.mouseY)
    }
})

canvas.addEventListener("mouseup", () => {
    isDrawing = false
})

canvas.addEventListener("mouseout", () => {
    isDrawing = false
})

//Pause Screen
let firstPause = true;
let time = 0
setInterval(function update() {
    document.onmousemove = document.onkeydown = document.onclick = () => {
        canvas.scrollIntoView()
        time = 0
        c2.fillStyle = "white";
        c2.fillRect(0, 0, innerWidth, innerHeight)
        firstPause = true;
        document.body.style.cursor = "default"
    }
    if (time == 300){
        document.body.style.cursor = "none"
        if (firstPause == true){
            c2.fillStyle = "rgba(0,0,0,1)";
            c2.fillRect(0, 0, innerWidth, innerHeight)
            firstPause = false;
        } else {
            canvas2.scrollIntoView()
            c2.fillStyle = "rgba(0,0,0,0.05)";
            c2.fillRect(0, 0, innerWidth, innerHeight)
            c2.beginPath()
            c2.arc(Math.random() * canvas2.width, Math.random() * canvas2.height, Math.random() * 50, 0, Math.PI * 2, false)
            c2.fillStyle = "rgba(" + Math.random() * 255 + "," + Math.random() * 255 + ",255," + Math.random() + ")";
            c2.fill() 
        }
    } else if (time < 300){
        time++
    }
}, 1000/15)

//Generate Dots
function GenerateDots(mouseX, mouseY, moving){

    if (moving !== true){
      radiusFirst = true;
      numberFirst = true;
      widthFirst = true;
      speedFirst = true;
    }
    c.globalCompositeOperation = select2.value

    if (/[a-z]/i.test(radiusField.value) === true){
        console.log("Invalid radius")
        return;
    }
    if (/[a-z]/i.test(widthField.value) === true){
        console.log("Invalid radius")
        return;
    }
    if (/[a-z]/i.test(numberField.value) === true){
      console.log("Invalid amount of dots to create")
      return; 
    }
    if (/[a-z]/i.test(speedField.value) === true){
      console.log("Invalid speed")
      return; 
    }

    if (numberField.value == ""){
        if (mouseX && mouseY){
            this.repetitions = 1
        } else {
            this.repetitions = (Math.random() * 19) + 1
        }
    } else if (/[a-z]/i.test(numberField.value) === false){
        if (mouseX && mouseY){
            this.repetitions = 1
        } else {
            if (numberField.value > 5000){
                alert("Cannot create more than 5000 dots at a time")
                return;
            } else if (numberField.value < 0){
                alert("Cannot create a negative amount of dots")
                return
            } else if (select.value == "cAll" && numberField.value > 100){
                alert("Cannot create more than 100 dots while 'Connect All' is selected")
                return
            } else if (select.value == "cTwo" && numberField.value > 2500){
                alert("Cannot create more than 2500 dots while 'Last Two' is selected")
                return
            }else {
                this.repetitions = numberField.value
            }
        }
    }

for (t = 0; t < repetitions; t++){
    
    if (mouseX && mouseY) {
        this.x = mouseX
        this.y = mouseY
    } else {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
    }

    if (radiusField.value === ""){
        this.radius = (Math.random() * 19) + 1
    } else if (/[a-z]/i.test(radiusField.value) === false && radiusField.value !== ""){
        this.radius = radiusField.value
    }

    //Opacity
    if (slider.value < 0){
        this.opacity = Math.random()
    } else {
        this.opacity = slider.value / 100
    }

    if (checkBox.checked){
        this.color = "rgba(" + Math.random() * 255 + ", "+ Math.random() * 255 + ", "+ Math.random() * 255 + ", " + this.opacity + ")"
    } else {
        this.color = "rgba(0, 0, 0, " + this.opacity + ")"
    }

    //Draw dot
    const dot = new Dot (x, y, radius, this.color)
    if (!popDots){
      dots.push(dot)
    }
    if (drawDot){
      dot.draw()
    }
    textDiv.style.display = "none"

    //Line width
    if (widthField.value == ""){
        this.linewidthval = radius * 2
    } else {
        this.linewidthval = widthField.value
    }

    //Draw line
    if (!dontConnect && drawLine){
    if (firstrun === true){
        firstrun = false;
        secondrun = true;
    } else if (firstrun === false){
        if (select.value == "cAll"){
            dots.forEach(dot => {
                c.beginPath()
                c.moveTo(x, y)
                c.lineTo(dot["x"], dot["y"])
                c.strokeStyle = color
                c.lineWidth = this.linewidthval
                c.stroke()
            });
        } else if (select.value == "cOne"){
            for (i = 1; i < 3; i++){
                const lastTwo = dots.length - i;
                c.beginPath()
                c.moveTo(x, y)
                c.lineTo(dots[lastTwo]["x"], dots[lastTwo]["y"])
                c.strokeStyle = color
                c.lineWidth = this.linewidthval
                c.stroke()
            }
        } else if (select.value == "cTwo"){
            if (secondrun === true) {
                for (i = 1; i < 3; i++){
                    const lastTwo = dots.length - i;
                    c.beginPath()
                    c.moveTo(x, y)
                    c.lineTo(dots[lastTwo]["x"], dots[lastTwo]["y"])
                    c.strokeStyle = color
                    c.lineWidth = this.linewidthval
                    c.stroke()
                    secondrun = false
                }
            } else {
                for (i = 1; i < 4; i++){
                    const lastTwo = dots.length - i;
                    c.beginPath()
                    c.moveTo(x, y)
                    c.lineTo(dots[lastTwo]["x"], dots[lastTwo]["y"])
                    c.strokeStyle = color
                    c.lineWidth = this.linewidthval
                    c.stroke()
            }
            }
        } else if (select.value == "cFifty"){
            const lastTwo = dots.length - 50;
            c.beginPath()
            c.moveTo(x, y)
            c.lineTo(dots[lastTwo]["x"], dots[lastTwo]["y"])
            c.strokeStyle = color
            c.lineWidth = this.linewidthval
            c.stroke()
        } else if (select.value == "cRand"){
            const lastTwo = Math.floor(dots.length * Math.random());
            c.beginPath()
            c.moveTo(x, y)
            c.lineTo(dots[lastTwo]["x"], dots[lastTwo]["y"])
            c.strokeStyle = color
            c.lineWidth = this.linewidthval
            c.stroke()
        } else if (select.value == "cTwenty"){
            const lastTwo = dots.length - 20;
            c.beginPath()
            c.moveTo(x, y)
            c.lineTo(dots[lastTwo]["x"], dots[lastTwo]["y"])
            c.strokeStyle = color
            c.lineWidth = this.linewidthval
            c.stroke()
        } else if (select.value == "cHunna"){
            const lastTwo = dots.length - 100;
            c.beginPath()
            c.moveTo(x, y)
            c.lineTo(dots[lastTwo]["x"], dots[lastTwo]["y"])
            c.strokeStyle = color
            c.lineWidth = this.linewidthval
            c.stroke()
        }
}
}
firstF = true;
drawLine = true;
}
const dotsGenerated = Math.floor(this.repetitions)
if (mouseX && mouseY){
    console.log(`You clicked at (X:${mouseX}, Y:${mouseY}): generated ${dotsGenerated} dot!`)
} else {
    console.log(`You pressed E: generated ${dotsGenerated} dots!`)
}
}


//Background & Noise
function GeneratePixels(noise){
  if (noise == "true"){
    helpDiv.style.color = "#e7e7e7"
    helpDiv.style.background = "rgb(77, 76, 76)"
  } else if (noise == "black" || !noise) {
    helpDiv.style.color = "#e7e7e7"
    helpDiv.style.background = "transparent"
  } else {
    helpDiv.style.color = "black"
    helpDiv.style.background = "transparent"
  }
    textDiv.style.display = "none"
    function DrawPixel(x, y, a){
        let index = (x + y * canvas.width) * 4;
        cData.data[index + 3] = a


    }
    function UpdateCanvas() {
        c.putImageData(cData, 0, 0)
    }

    let alphaY = 0

    for (ii = 0; ii < canvas.height; ii++){ //ii = y
        alphaY += 255 / canvas.height 
        let alphaX = 0
        for (i = 0; i < canvas.width; i++){ //i = x
            alphaX += 255 / canvas.width

            if (noise === "true"){
                const alpha = Math.random() * 255
                DrawPixel(i, ii, alpha)
            } else if (noise === "white"){
                const alpha = 0
                DrawPixel(i, ii, alpha)
            } else if (noise === "black"){
                const alpha = 255
                DrawPixel(i, ii, alpha)
            } else {
                const alpha = (alphaY + alphaX) / 2
                DrawPixel(i, ii, alpha)
                firstF = false;
            }
        }
    }
    UpdateCanvas()
    radiusFirst = true;
    numberFirst = true;
    widthFirst = true;
    speedFirst = true;
}

// Velocity
const speedField = document.getElementById("speedField")
let direction = ""
function applyVelocity(e){

  if (speedField.value == ""){
    speed = 10
  } else {speed = parseInt(speedField.value)}
  
  function getDotPos(){
    if(dots.length > 0){
    dotXpos = dots[dots.length - 1].x + velocity.x
    if (dotXpos > canvas.width){dotXpos -= canvas.width; drawLine = false}
    else if (dotXpos < 0){dotXpos += canvas.width; drawLine = false}
    dotYpos = dots[dots.length - 1].y + velocity.y
    if (dotYpos > canvas.height){dotYpos -= canvas.height; drawLine = false}
    else if (dotYpos < 0){dotYpos += canvas.height; drawLine = false}
    } else {dotXpos = canvas.width / 2; dotYpos = canvas.height / 2}
  }
  function changeDirection(dir){
    if (direction !== dir){
      velocity.x = 0
      velocity.y = 0
      direction = dir
    }
  }
  changeDirection(e.key)
  if (e.key === "w" || e.key === "W"){
    velocity.y = -speed
  } else if (e.key === "a" || e.key === "A"){
    velocity.x = -speed
  } else if (e.key === "s" || e.key === "S"){
    velocity.y = speed
  } else if (e.key === "d" || e.key === "D"){
    velocity.x = speed
  }
  getDotPos()
  GenerateDots(dotXpos, dotYpos, true)
}

let isMoving = false
let alreadyRunning = false
let interval;
let t = 1000;
f1();

function changeTimer (){
  t = 1000 / refreshRate.value
}
function f1 () {
  if (alreadyRunning) {clearInterval(interval)}

  alreadyRunning = true
  if (isMoving){
    applyVelocity(window.currentDir)
  }
  changeTimer()
  interval = setInterval(f1, t);
}



addEventListener("keyup", function checkForInvalidValue(e){
  if (!isNaN(radiusField.value)){
    radiusField.style.background = "#e7e7e7"
  } else if (isNaN(radiusField.value)){
    radiusField.style.background = "rgb(243, 81, 81)"
  }

  if (!isNaN(numberField.value)){
    numberField.style.background = "#e7e7e7"
  } else if (isNaN(numberField.value)){
    numberField.style.background = "rgb(243, 81, 81)"
  }

  if (!isNaN(widthField.value)){
    widthField.style.background = "#e7e7e7"
  } else if (isNaN(widthField.value)){
    widthField.style.background = "rgb(243, 81, 81)"
  } 

  if (!isNaN(speedField.value)){
    speedField.style.background = "#e7e7e7"
  } else if (isNaN(speedField.value)){
    speedField.style.background = "rgb(243, 81, 81)"
  }

  if (e.key === "c" || e.key === "C"){
    dontConnect = false
  } 
  if (e.key === "z" || e.key === "Z"){
    popDots = false
  } 
  if (e.key === "x" || e.key === "X"){
    drawDot = true
  }
})

addEventListener("focusin", () =>{
    if (document.activeElement !== radiusField){
        radiusFirst = true;
    }
    if (document.activeElement !== numberField){
        numberFirst = true;
    }
    if (document.activeElement !== widthField){
        widthFirst = true;
    }
    if (document.activeElement !== speedField){
        speedFirst = true;
    }
})

addEventListener("keydown", function(e) {

    if (document.activeElement == radiusField){
        if (radiusFirst === true){
            radiusField.value = ""
            radiusFirst = false
        }
        return
    } else if (document.activeElement == numberField){
        if (numberFirst === true){
            numberField.value = ""
            numberFirst = false
        }
        return
    } else if (document.activeElement == widthField){
        if (widthFirst === true){
            widthField.value = ""
            widthFirst = false
        }
        return
    } else if (document.activeElement == speedField){
      if (speedFirst === true){
          speedField.value = ""
          speedFirst = false
        }
        return
    } else if (document.activeElement !== radiusField ||
                document.activeElement !== numberField ||
                document.activeElement !== widthField ||
                document.activeElement !== speedField){
        if (e.key === "f" || e.key === "F"){
            if (firstF === true){
                console.log("You pressed F: generated background!")
                GeneratePixels()
            } 
        } else if (e.key === "r" || e.key === "R"){
            resetAll()
        } else if (e.key === "e" ||e.key === "E"){
            GenerateDots()
        } else if (e.key === "n" || e.key === "N"){
            GeneratePixels("true")
            firstF = true
        } else if (e.key === "b" || e.key === "B"){
            GeneratePixels("black")
            firstF = true
        }  else if (e.key === "c" || e.key === "C"){
            dontConnect = true
            drawLine = false
        }  else if (e.key === "z" || e.key === "Z"){
            popDots = true
        }  else if (e.key === "x" || e.key === "X"){
            drawDot = false
        } else if (e.key === "q" || e.key === "Q"){
            if (isMoving) {isMoving = false} else {isMoving = true}
        } else if (e.key === "p" || e.key === "P"){
          if (buttonDiv.style.visibility == "visible") {hideNav()} else {showNav()}
      } 

        if (e.key === "w" || e.key === "W" || 
            e.key === "a" || e.key === "A" || 
            e.key === "s" || e.key === "S" || 
            e.key === "d" || e.key === "D"){
            isMoving = true
            window.currentDir = e
        } 
    }
})

function resetAll (){
    console.log("Reset all dots!")
    GeneratePixels("white")
    textDiv.style.display = "flex"
    dots = []
    firstrun = true;
    secondrun = false;
    firstF = true;
    canvas.width = innerWidth
    canvas.height = innerHeight
    velocity = {x: 0, y: 0}
    isMoving = false
}

resetBtn.addEventListener("click", () => {
    console.log("Generated background!")
    GeneratePixels()
})

blackBtn.addEventListener("click", () => {
    GeneratePixels("black")
})

resetAllBtn.addEventListener("click", () => {
    resetAll();
})

noiseBtn.addEventListener("click", () => {
    console.log("Generated noise!")
    GeneratePixels("true")
    firstrun = true;
})

function showNav(){
  buttonDiv.style.visibility = "visible";
  helpDiv.style.visibility = "visible";
  navShow.style.visibility = "hidden";
  navHide.style.visibility = "visible";
}

function hideNav(){
  buttonDiv.style.visibility = "hidden";
  helpDiv.style.visibility = "hidden";
  navHide.style.visibility = "hidden";
  navShow.style.visibility = "visible";
}

navShowImg.addEventListener("click", () => {
  showNav()
})

navHideImg.addEventListener("click", () => {
  hideNav()
})