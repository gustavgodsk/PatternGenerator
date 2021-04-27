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
        <button id="resetBtn" title="Press F to pay respects but also change background">Background</button>
        <button id="noiseBtn" title="Press N to generate noise">Noise</button>
        <button id="resetAllBtn" title="Press R to reset all">Reset</button>
        <div class="checkDiv">
            <input id="checkBox" title="Random colors" type="checkbox">
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