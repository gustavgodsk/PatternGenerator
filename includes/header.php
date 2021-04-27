<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="includes/styles.css">
    <title>Pattern Generator</title>
    <link rel="icon" href="includes/images/patternIcon.png">
</head>
<body>
    <div id="navShow">
        <button title="Show options"><img src="includes/images/downArrow.png" id="navShowImg"></button>
    </div>

    <div id="buttonDiv">
        <input name="textField" type="text" id="widthField" placeholder="Width" title="Width of connecting line

        Default: 1px
        Leave empty for same width as dot" value="1">
        <input name="textField" type="text" id="radiusField" placeholder="Radius" title=
        "Radius of the dot
        
        Default: random value between 1 and 20" value="">
        <input name="textField" type="text" id="numberField" placeholder="Dots" title=  
        "Number of dots to create
        
        Default: random value between 1 and 20" value="">

        <select title="Previous dots to connect to" value="cOne">
            <option value="cZero" title="Don't connect to any dots">Connect 0</option>
            <option value="cOne" title="Connect to last dot">Last</option>
            <option value="cTwo" title="Connect to last two dots">Last two</option>
            <option value="cTwenty" title="Connect to 20th previous dot">20th before</option>
            <option value="cFifty" title="Connect to 50th previous dot">50th before</option>
            <option value="cHunna" title="Connect to 100th previous dot">100th before</option>
            <option value="cAll" title="Connect to all previous dots">Connect all</option>
            <option value="cRand" title="Connect to dot of random position">/b/</option>
        </select>

        <select id="select2" title="How overlapping colors should behave">
          <option value="source-over">Source-over</option>
          <option value="source-atop">Source-atop</option>
          <option value="source-in">Source-in</option>
          <option value="source-out">Source-out</option>
          <option value="destination-over">Destination-over</option>
          <option value="destination-atop">Destination-atop</option>
          <option value="destination-in">Destination-in</option>
          <option value="destination-out">Destination-out</option>
          <option value="lighter">Lighter</option>
          <option value="copy">Copy</option>
          <option value="multiply">Multiply</option>
          <option value="screen">Screen</option>
          <option value="overlay">Overlay</option>
          <option value="darken">Darken</option>
          <option value="lighten">Lighten</option>
          <option value="color-dodge">Color-dodge</option>
          <option value="color-burn">Color-burn</option>
          <option value="hard-light">Hard-light</option>
          <option value="soft-light">Difference</option>
          <option value="exclusion">Exclusion</option>
          <option value="hue">Hue</option>
          <option value="saturation">Saturation</option>
          <option value="color">Color</option>
          <option value="luminosity">Luminosity</option>
        </select>

        <button id="resetBtn" title="Press F to pay respects but also change background">Background</button>
        <button id="blackBtn" title="Press B to paint background black">Black</button>
        <button id="noiseBtn" title="Press N to generate noise">Noise</button>
        <button id="resetAllBtn" title="Press R to reset all">Reset</button>
        <div class="checkDiv">
            <input id="checkBox" title="Colors" type="checkbox">
        </div>
        <div class="slidecontainer">
            <input type="range" min="-1" max="100" value="-1" class="slider" id="myRange" title="Opacity">
        </div>
    </div>

    <div id="navHide" style="visibility: hidden;">
        <button title="Hide options"><img src="includes/images/downArrow.png" id="navHideImg"></button>
    </div>

    <div class="textDiv">
        <h1>Press E or Click Somewhere to Draw</h1>
    </div>
    <canvas></canvas>
    <canvas id="canvas2"></canvas>

</body>
</html>