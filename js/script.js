
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
const textDiv = document.querySelector(".textDiv")
const radiusField = document.getElementById("radiusField")
const numberField = document.getElementById("numberField")
const widthField = document.getElementById("widthField")
const navShowImg = document.getElementById("navShowImg")
const navHideImg = document.getElementById("navHideImg")
const checkBox = document.getElementById("checkBox")
const slider = document.getElementById("myRange")

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
let radiusFocused = false;
let numberFocused = false;

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

canvas.addEventListener("mouseup", (e) => {
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
    if (time == 100){
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
    } else if (time < 100){
        time++
    }
}, 1000/15)

//Generate Dots
function GenerateDots(mouseX, mouseY){

    c.globalCompositeOperation = select2.value
    radiusFirst = true;
    numberFirst = true;
    widthFirst = true;

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
            } else if (select.value == "cAll" && numberField.value > 500){
                alert("Cannot create more than 500 dots while 'Connect All' is selected")
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
    dots.push(dot)
    textDiv.style.display = "none"
    dot.draw()

    //Line width
    if (widthField.value == ""){
        this.linewidthval = radius * 2
    } else {
        this.linewidthval = widthField.value
    }

    //Draw line
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
firstF = true;
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
}

function checkForInvalidValue(){

}

addEventListener("keyup", function checkForInvalidValue(){
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
})

addEventListener("focusin", () =>{
    if (document.activeElement !== radiusField){
        radiusFirst = true;
        radiusField.value = radiusField.value.trim()
    }
    if (document.activeElement !== numberField){
        numberFirst = true;
        numberField.value = numberField.value.trim()
    }
    if (document.activeElement !== widthField){
        widthFirst = true;
        widthField.value = widthField.value.trim()
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
    } else if (document.activeElement !== radiusField ||
                document.activeElement !== numberField ||
                document.activeElement !== widthField){
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
}

resetBtn.addEventListener("click", () => {
    console.log("Generated background!")
    GeneratePixels()
})

blackBtn.addEventListener("click", () => {
  c.globalCompositeOperation = "source-over"
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
})

resetAllBtn.addEventListener("click", () => {
    resetAll();
})

noiseBtn.addEventListener("click", () => {
    console.log("Generated noise!")
    GeneratePixels("true")
    firstrun = true;
})

navShowImg.addEventListener("click", () => {
    buttonDiv.style.visibility = "visible";
    navShow.style.visibility = "hidden";
    navHide.style.visibility = "visible";
})

navHideImg.addEventListener("click", () => {
    buttonDiv.style.visibility = "hidden";
    navHide.style.visibility = "hidden";
    navShow.style.visibility = "visible";
})