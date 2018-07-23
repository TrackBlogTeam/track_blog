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

//session_start();
//
//if (!isset($_SESSION["username"]) || $_SESSION["role"] == "administrator") {
//    endWithError(828);
//}

//$username = $_SESSION["username"];
var_dump($message);
$username = "yangjianwei";
$title = $message->title;
$content = $message->content;
$articleType = $message->articleType;

$user = new User($username);

$articleController = new ArticleController();

if ($articleController->addArticle($user, $title, $content, $articleType)) {
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