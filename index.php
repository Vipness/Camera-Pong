<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/variables.css">
    <link rel="stylesheet" href="./css/style.css">
    <script src="./js/index.js" defer></script>
    <title>Camera Pong</title>
</head>

<body>
    <div class="page">
        <!-- <h1>Camera Pong</h1> -->
        
        <div class="menu">
            <div class="buttons">
                    <button class="btnPlay"><a href="#settings">Play</a></button>
                    <button class="btnInactive"><a href="./subpages/calibrator.html">Calibrate Color</a></button>
            </div>

            <?php
                session_start();
                if(!isset($_SESSION['username'])){
                    echo "<p class='login'>Want to save your score? <a href='./subpages/login.php'>Login</a></p>";
                }
                else{
                    $user = $_SESSION['username'];
                    echo "<p class='userWelcome'>Welcome, $user! <a href='./php/logout.php' class='logout'>Logout</a></p>";
                }
            ?>
        </div>
    </div>

    <div class="page">
        <div class="settings-wrapper" id="settings">
            <h2>Settings</h2>

            <div class="settings">
                <label for="rounds">Number of rounds</label>
                <div class="setting">
                    <input type="range" min="2" max="6" value="3" id="rounds">
                    <span id="roundsText"></span>
                </div>

                <label for="speed">Difficulty</label>
                <div class="setting">
                    <input type="range" min="2" max="8" value="4" id="speed">
                    <span id="speedText"></span>
                </div>
            </div>

            <div class="settings-buttons">
                <button class="btnInactive"><a href="#">Back</a></button>
                <button class="btnPlay"><a href="./subpages/pong.html">Start Game</a></button>
            </div>  
        </div>
    </div>
</body>

</html>