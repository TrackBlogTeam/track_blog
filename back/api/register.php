<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/20/2018
 * Time: 1:20 AM
 */

// This is only for user
// There is not way for registry of an administrator

require_once("../User.php");
require_once("../UserController.php");

$message = json_decode($_POST["message"]);
$messageBack = new stdClass();

$user = new User($message->username, $message->password, $message->phoneNumber);

$userController = new UserController();

if ($userController->addUser($user)) {
    $messageBack->code = 824;
}
else {
    $messageBack->code = 825;
}

echo json_encode($messageBack);