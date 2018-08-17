<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/20/2018
 * Time: 12:45 AM
 */

require_once("../Util.php");
require_once("../Administrator.php");
require_once("../AdministratorController.php");
require_once("../User.php");
require_once("../UserController.php");

$message = Util::getMessage();

session_start();

if (!isset($message->username) || !isset($message->password)) { // username or password is in lack
    Util::endWithCode(813);
}

if (isset($_SESSION["username"])) {   // already logged
    Util::endWithCode(814);
}

if (isset($_SESSION["username"]) && $_SESSION["username"] != $message->username) {  // force to login
    Actor::logout();
}

if ($message->role == "administrator") {   // an administrator logs in
    $administrator = new Administrator($message->username, $message->password);
    $administratorController = new AdministratorController();
    Util::endWithCode($administratorController->administratorLogin($administrator));
}

else if ($message->role == "user") {       // a user logs in
    $user = new User($message->username, $message->password);
    $userController = new UserController();
    if ($userController->userExists($user)) {  // // Success to login for user
        $user->login();
        // TODO: Why user->login() here??? Not userController->login() ????
        Util::endWithCode(816);
    }
    else {  // User's login fails for unmatched username and password
        Util::endWithCode(818);
    }
}

else {    // unknown role of sender of the message
    Util::endWithCode(815);
}