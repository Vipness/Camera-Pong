<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/variables.css">
    <link rel="stylesheet" href="./css/calibrator.css">
    <link rel="icon" type="image/png" href="./img/logo.ico">
    <script src="./js/calibrator.js" defer></script>
    <title>Camera Pong</title>
</head>

<body>
    <header>
        <h1>Color calibrator</h1>
        <p class="instruction">Place your desired color in the top right corner marked with yellow</p>
        <p class="subtitle">Remain still for <span id="timerNum">3</span></p>
    </header>
    <div class="wrapper">
        <canvas id="canvas"></canvas>
    </div>
</body>

</html>