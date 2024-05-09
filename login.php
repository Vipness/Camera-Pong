<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/variables.css">
    <link rel="stylesheet" href="./css/login.css">
    <link rel="icon" type="image/png" href="./img/logo.ico">
    <script src="./js/login.js" defer></script>
    <title>Camera Pong</title>
</head>

<?php
    include_once("./php/connection.php");
    session_start(); 

    $error = "";

    if (isset($_POST["username"]) && isset($_POST["password"])) {
        // Login form
        $username = $_POST["username"];
        $password = $_POST["password"];

        $sql = "SELECT * FROM player WHERE username = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $dataRow = $result->fetch_assoc();

        if ($dataRow !== null && password_verify($password, $dataRow["password"])) {
            $_SESSION['username'] = $username;
            header("Location: ./index.php");
        } 
        else { $error = "Invalid username or password!"; } 
    } 
    elseif (isset($_POST["newUsername"]) && isset($_POST["newEmail"]) && isset($_POST["newPassword"])) {
        // Register form
        $username = $_POST["newUsername"];
        $email = $_POST["newEmail"];
        $password = password_hash($_POST["newPassword"], PASSWORD_DEFAULT);

        $checkForUser = "SELECT * FROM player WHERE email = ? OR username = ?";
        $stmt = $conn->prepare($checkForUser);
        $stmt->bind_param("ss", $email, $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 0) {
            $add = "INSERT INTO player(email, password, username) VALUES (?, ?, ?)";
            $stmt = $conn->prepare($add);
            $stmt->bind_param("sss", $email, $password, $username);

            if ($stmt->execute()) {
                $_SESSION['username'] = $username;
                header("Location: ./index.php");
            } 
            else { echo "Error: " . $add . "<br>" . $conn->error; }
        } 
        else { $error = "User already exists!"; }
    }

    $conn->close();
?>


<body>
    <div class="wrapper">
        <div class="form-container login active">
            <div class="welcome-box">
                <h1 id="welcome">Login</h1>
                <p class="subtext">Sign in to your account</p>
            </div>

            <form method="post" id="login">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" class="username" autocomplete="username" required>

                <label for="password">Password</label>
                <input type="password" id="password" name="password" class="password" autocomplete="off" required>

                <span class="errorMessage"><?php echo "$error"; ?></span>
                <input type="submit" id="loginSubmit" class="submit" value="Sign in">
            </form>

            <p class="account">Don't have an account? <span>Register</span></p>
        </div>

        <div class="form-container register">
            <div class="welcome-box">
                <h1 id="welcome">Register</h1>
                <p class="subtext">Create an account</p>
            </div>

            <form method="post" id="register">
                <label for="newUsername">Username</label>
                <input type="text" id="newUsername" name="newUsername" class="username" required>

                <label for="email">Email</label>
                <input type="email" id="email" name="newEmail" autocomplete="off" required>

                <label for="newPassword">Password</label>
                <input type="password" id="newPassword" name="newPassword" class="password" autocomplete="off" required>

                <label for="repeatNewPassword">Confirm Password</label>
                <input type="password" id="repeatNewPassword" name="repeatNewPassword" class="password" autocomplete="off" required>
                <span id="passwordErrorMessage" class="errorMessage"></span>

                <input type="submit" id="registerSubmit" class="submit" value="Register">
            </form>

            <p class="account">Already have an account? <span>Login</span></p>
        </div>
    </div>
</body>

</html>