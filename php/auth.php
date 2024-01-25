<?php
include("./connection.php");

if (isset($_POST["username"]) && isset($_POST["password"])) {
    // Login form
    $username = $_POST["username"];
    $password = $_POST["password"];

    $sql = "SELECT * FROM player WHERE username = '$username'";
    $result = $conn->query($sql);
    $dataRow = $result->fetch_assoc();

    if (password_verify($password, $dataRow["password"])) {
        header("Location: ../index.php");
    } else {
        echo "Login unsuccessful";
        header("Location: ../subpages/login.html");
    }
} elseif (isset($_POST["newUsername"]) && isset($_POST["newEmail"]) && isset($_POST["newPassword"])) {
    // Register form
    $email = $_POST["newEmail"];
    $password = password_hash($_POST["newPassword"], PASSWORD_DEFAULT);
    $username = $_POST["newUsername"];

    $checkForUser = "Select * from player WHERE email = '" . $conn->real_escape_string($email) . "'";
    $result = $conn->query($checkForUser);

    if ($result->num_rows == 0) {
        $add = "INSERT INTO player(email, password, username) VALUES ('$email', '$password', '$username')";
        echo "Registered new player";

        if ($conn->query($add) !== TRUE) {
            echo "Error: " . $add . "<br>" . $conn->error;
        }
        header("Location: ../index.php");
    } else {
        echo "Player already in db";
        header("Location: ../subpages/login.html");
    }
}
$conn->close();
