<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 8/31/2018
 * Time: 3:52 PM
 */

require_once("../Util.php");
require_once("../User.php");
require_once("../DraftController.php");

$message = Util::getMessage();

session_start();

if (!isset($_SESSION["username"])) {
    Util::endWithCode(851);
}

if (!isset($_SESSION["role"]) || $_SESSION["role"] === "administrator") {
    Util::endWithCode(852);
}

if (!isset($message->draftID)) {
    Util::endWithCode(853);
}

$draftController = new DraftController();
$user = new User($_SESSION["username"]);
$draft = $draftController->retrieveDraft($user, $message->draftID);
if ($draft) {
    echo json_encode($draft);
}