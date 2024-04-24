<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/variables.css">
    <link rel="stylesheet" href="./css/pong.css">
    <link rel="icon" type="image/png" href="./img/logo.ico">
    <script src="./js/classes.js"></script>
    <script src="./js/endless.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
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