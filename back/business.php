<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/17/2018
 * Time: 2:02 PM
 */

require_once("Actor.php");

$username = null;

$messageBack = new stdClass();
session_start();

if (isset($_SESSION["username"])) {
    $username = $_SESSION["username"];
    $messageBack->text = "Success. The username is: " . $username;
}
else {
    $message = $_POST["message"];
    $message = json_decode($message);

    $username = $message->username;
    $password = $message->password;
    $actor = new Actor($username, $password);
    if ($actor->login()) {
        $_SESSION["username"] = $username;
        $messageBack->text = "Success. The username is: " . $username;
    }
    else {
        $messageBack->text = "Fail";
    }
}

echo json_encode($messageBack);

?>