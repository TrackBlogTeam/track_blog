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
    if ($_SESSION["username"] != $message->username) {
        Actor::logout();
    }
    else {
        Util::endWithCode(814);
    }
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
        if ($userController->userSignIn($user)) {
            Util::endWithCode(816);
        }else{
            Util::endWithCode(861);
        }
    }
    else {  // User's login fails for unmatched username and password
        Util::endWithCode(818);
    }
}
else {    // unknown role of sender of the message
    Util::endWithCode(815);
}