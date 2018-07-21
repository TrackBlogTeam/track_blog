<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/20/2018
 * Time: 1:16 PM
 */

require_once("../User.php");
require_once("../ArticleController.php");

$message = json_decode($_POST["message"]);

session_start();
if (!isset($message->username) || $message->username != $_SESSION["username"] || $_SESSION["role"] != "user") {
    endWithError(828);
}

$user = new User($message->username);

$articleController = new ArticleController();

if ($articleController->addArticle($user, $message->content)) {
    $messageBack = new stdClass();
    $messageBack->code = 830;
    echo json_encode($messageBack);
    exit(0);
}
else {
    endWithError(829);
}

function endWithError($code)
{
    $messageBack = new stdClass();
    $messageBack->code = $code;
    echo json_encode($messageBack);
    exit(1);
}