<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/21/2018
 * Time: 2:34 PM
 */

require_once("../Util.php");
require_once("../AdministratorController.php");
require_once("../UserController.php");

session_start();

if (!isset($_SESSION["username"]) || !isset($_SESSION["role"])) {
    Util::EndWithCode(835);
}

// administrator's profile
if ($_SESSION["role"] == "administrator") {
    $administratorController = new AdministratorController();
    // TODO: Improve the table of administrator to contain more information
    $messageBack = new stdClass();
    $messageBack->username = $_SESSION["username"];
    $messageBack->portraitUrl = $_SESSION["portraitUrl"];
    echo json_encode($messageBack);
}

// user's profile
else if ($_SESSION["role"] == "user") {
    $userController = new UserController();
    // TODO: Improve the table of administrator to contain more information
    $messageBack = new stdClass();
    $messageBack->username = $_SESSION["username"];
    echo json_encode($messageBack);
}

// unknown role
else {
    Util::EndWithCode(836);
}