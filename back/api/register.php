<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/20/2018
 * Time: 1:20 AM
 */

// This is only for user
// There is not way for registry of an administrator

require_once("../Util.php");
require_once("../User.php");
require_once("../UserController.php");

$message = Util::ProcessMessage($_POST["message"]);

if (!isset($message->username) || !isset($message->password) || !isset($message->phoneNumber)) {
    Util::EndWithCode(837);
}

$user = new User($message->username, $message->password, $message->phoneNumber);

$userController = new UserController();

if ($userController->addUser($user)) {
    Util::EndWithCode(824);
}
else {
    Util::EndWithCode(825);
}

echo json_encode($messageBack);