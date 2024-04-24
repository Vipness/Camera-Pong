<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/variables.css">
    <link rel="stylesheet" href="./css/index.css">
    <link rel="icon" type="image/png" href="./img/logo.ico">
    <script src="./js/index.js" defer></script>
    <title>Camera Pong</title>
</head>

<body>
    <div class="page">
        <div class="menu">
            <div class="buttons">
                <a href="#settings" class="btnPlay">Play camera pong</a>
                <a href="./calibrator.php" class="btnInactive">Calibrate color</a>
            </div>

            <?php
                session_start();
                if(!isset($_SESSION['username'])){
                    echo "<p class='login'>Want to save your score? <a href='./login.php'>Login</a></p>";
                }
                else{
                    $user = $_SESSION['username'];
                    echo "<p class='userWelcome'>Welcome, <a href='./profile.php' class='profile'>$user!</a>";
                }
            ?>
        </div>
    </div>

    <div class="page">
        <div class="settings-wrapper" id="settings">
            <h2>Settings</h2>

            <div class="settings">
                <div class="roundsSetting">
                    <label for="rounds">Number of rounds</label>
                    <div>
                        <input type="range" min="2" max="6" value="3" id="rounds">
                        <span id="roundsText"></span>
                    </div>
                </div>

                <p id="difficulty">Difficulty</p>
                <div class="difficulty">
                    <input type="radio" id="easy" name="difficulty" value="3" checked>
                    <label for="easy">Easy</label>

                    <input type="radio" id="medium" name="difficulty" value="5">
                    <label for="medium">Medium</label>

                    <input type="radio" id="hard" name="difficulty" value="7">
                    <label for="hard">Hard</label>
                </div>    
            </div>

            <div class="settings-buttons">
                <a href="#" class="btnInactive">Back</a>
                <a href="./classic.php" class="btnPlay">Start game</a>
                <a href="./endless.php" class="btnInactive">Endless</a>
            </div>
        </div>
    </div>
</body>

</html>