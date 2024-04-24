<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/variables.css">
    <link rel="stylesheet" href="./css/profile.css">
    <link rel="icon" type="image/png" href="./img/logo.ico">
    <title>Camera Pong</title>
</head>

<?php
    include_once("./php/connection.php");
    session_start();

    $username = $_SESSION["username"];
    $sql = "SELECT * FROM player WHERE username = ?;";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $dataRow = $result->fetch_assoc();

    $stmt->close();
    $conn->close();
?>

<body>
    <div class="wrapper">
        <div class="profile-wrapper">
            <h1>Profile</h1>

            <h2>Classic</h2>
            <div class="stats">
                <div class="stat">
                    <p class="value"><?php echo $dataRow["classicTimesPlayed"]; ?></p>
                    <p class="label">Times played</p>
                </div>
                <div class="stat">
                    <p class="value"><?php echo $dataRow["wins"]; ?></p>
                    <p class="label">Total wins</p>
                </div>
                <div class="stat">
                    <p class="value"><?php echo $dataRow["losses"]; ?></p>
                    <p class="label">Total losses</p>
                </div>
            </div>
            
            <h2>Endless</h2>
            <div class="stats">
                <div class="stat">
                    <p class="value"><?php echo $dataRow["endlessTimesPlayed"]; ?></p>
                    <p class="label">Times played</p>
                </div>
                <div class="stat">
                    <p class="value"><?php echo $dataRow["bestScore"]; ?></p>
                    <p class="label">Best score</p>
                </div>
                <div class="stat">
                    <p class="value"><?php echo $dataRow["fastestBall"]; ?></p>
                    <p class="label">Fastest ball</p>
                </div>
            </div>

            <div class="buttons">
                <a href="./php/logout.php" class="btnInactive">Logout</a>
                <a href="./index.php" class="btnBack">Back</a>
            </div>
        </div>
    </div>
</body>

</html>