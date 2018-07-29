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

$message = Util::ProcessMessage($_POST["message"]);
// TODO: To filter and process data
session_start();

if (isset($_SESSION["username"])) {   // already logged
    Util::EndWithCode(814);
}

// TODO: Force to login

if (!isset($message->username) || !isset($message->password)) { // username or password is in lack
    Util::EndWithCode(813);
}

if ($message->role == "administrator") {   // an administrator logs in
    $administrator = new Administrator($message->username, $message->password);
    $administratorController = new AdministratorController();
    Util::EndWithCode($administratorController->administratorLogin($administrator));
}

else if ($message->role == "user") {       // a user logs in
    $user = new User($message->username, $message->password);
    $userController = new UserController();
    if ($userController->userExists($user)) {  // // Success to login for user
        $user->login();
        Util::EndWithCode(816);
        // TODO: Unknown to what to send back to front
    }
    else {  // User's login fails for unmatched username and password
        Util::EndWithCode(818);
    }
}

else {    // unknown role of sender of the message
    Util::EndWithCode(815);
}