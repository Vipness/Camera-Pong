<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/variables.css">
    <link rel="stylesheet" href="./css/pong.css">
    <link rel="icon" type="image/png" href="./img/logo.ico">
    <script src="./js/classes.js"></script>
    <script src="./js/game.js" defer></script>
    <title>Camera Pong</title>
</head>

<body>
    <div class="score">
        <div id="computer-score">0</div>
        <div id="player-score">0</div>
    </div>

    <div class="wrapper">
        <canvas id="canvas"></canvas>
    </div>

    <div class="resultsBox">
        <h1 id="result">GAME OVER!</h1>
        <span id="winner"></span>
        <span id="timer"></span>
    </div>
</body>

</html>