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
    $sql = "SELECT timesPlayed, wins, losses FROM player WHERE username = ?;";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $dataRow = $result->fetch_assoc();

    $conn->close();
?>

<body>
    <div class="wrapper">
        <div class="profile-wrapper">
            <h1>Profile</h1>

            <div class="stats">
                <div class="stat">
                    <p class="value"><?php echo $dataRow["timesPlayed"]; ?></p>
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

            <div class="buttons">
                <a href="./php/logout.php" class="btnInactive">Logout</a>
                <a href="./index.php" class="btnBack">Back</a>
            </div>
        </div>
    </div>
</body>

</html>