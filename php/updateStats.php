<?php
    require_once("./connection.php");
    session_start();
    
    $username = $_SESSION["username"];
    $result = $_POST["result"];
    $win = ($result == "win") ? 1 : 0;
    $lose = ($result == "lose") ? 1 : 0;
    
    $update = "UPDATE player SET timesPlayed = timesPlayed + 1, wins = wins + ?, losses = losses + ? WHERE username = ?";
    $stmt = $conn->prepare($update);
    $stmt->bind_param("iis", $win, $lose, $username);
    
    if ($stmt->execute()) {
        $response = array('success' => true, 'message' => 'Data inserted successfully');
    } else {
        $response = array('success' => false, 'message' => 'Failed to insert data');
    }
    
    // Send JSON response back to the client
    header('Content-Type: application/json');
    echo json_encode($response);
    
    $stmt->close();
    $conn->close();
?>