<?php
    require_once("./connection.php");
    session_start();
    
    $username = $_SESSION["username"];
    $score = $_POST["score"];
    $ballSpeed = $_POST["ballSpeed"];

    $check = "SELECT bestScore, fastestBall FROM player WHERE username = ?";
    $stmt = $conn->prepare($check);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $dataRow = $result->fetch_assoc();
    
    if((int) $dataRow["bestScore"] > $score){ $score = $dataRow["bestScore"]; }
    if($dataRow["fastestBall"] > $ballSpeed) { $ballSpeed = $dataRow["fastestBall"]; }
    
    $stmt->close();

    $update = "UPDATE player SET endlessTimesPlayed = endlessTimesPlayed + 1, bestScore = ?, fastestBall = ? WHERE username = ?";
    $stmt = $conn->prepare($update);
    $stmt->bind_param("ids", $score, $ballSpeed, $username);
    
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