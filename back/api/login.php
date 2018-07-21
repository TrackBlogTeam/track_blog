<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/20/2018
 * Time: 12:45 AM
 */

require_once("../Administrator.php");
require_once("../AdministratorController.php");
require_once("../User.php");
require_once("../UserController.php");

$message = json_decode($_POST["message"]);
$messageBack = new stdClass();

session_start();

if (!isset($message->username) || !isset($message->password)) { // username or password is in lack
    endWithError(813);
}

if (isset($_SESSION["username"])) {   // already logged
    endWithError(814);
}

if ($message->role == "administrator") {
    $administrator = new Administrator($message->username, $message->password);
    $administratorController = new AdministratorController();
    if ($administratorController->administratorExists($administrator)) {
        $administrator->login();
        $messageBack->code = 812;
        echo json_encode($messageBack);
    }
    else {
        endWithError(817);
    }
}

else if ($message->role == "user") {
    $user = new User($message->username, $message->password);
    $userController = new UserController();
    if ($userController->userExists($user)) {  // // Success to login for user
        $user->login();
        $messageBack->code = 816;
        echo json_encode($messageBack);
        // TODO: Unknown to what to send back to front
    }
    else {  // User's login fails for unmatched username and password
        endWithError(818);
    }
}

else {    // unknown role of sender of the message
    endWithError(815);
}


function endWithError($code)
{
    $messageBack = new stdClass();
    $messageBack->code = $code;
    echo json_encode($messageBack);
    exit(1);
}