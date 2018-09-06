<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 8/31/2018
 * Time: 3:12 PM
 */

require_once("../Util.php");
require_once("../DraftController.php");
require_once("../User.php");

$message = Util::getMessage();

session_start();

if (!isset($_SESSION["username"]) || $_SESSION["role"] == "administrator") {
    Util::endWithCode(845);
}
if (!isset($message->title) || !isset($message->content)) {
    Util::endWithCode(846);
}

$draftController = new DraftController();

$username = $_SESSION["username"];
$content = $message->content;
$title = $message->title;

$user = new User($username);

if (isset($message->draftID)) {
    $draftID = $message->draftID;

}

if ($draftController->addDraft($user, $title, $content)) {
    Util::endWithCode(847);
}
else {
    Util:: endWithCode(848);
}