<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 8/31/2018
 * Time: 3:38 PM
 */

require_once("../Util.php");
require_once("../DraftController.php");
require_once("../User.php");

session_start();

if (!isset($_SESSION["username"])) {
    Util::endWithCode(849);
}

if(!isset($_SESSION["role"]) || $_SESSION["role"] === "administrator"){
    Util::endWithCode(850);
}

$draftController = new DraftController();
$user = new User($_SESSION["username"]);

echo json_encode($draftController->getDrafts($user));