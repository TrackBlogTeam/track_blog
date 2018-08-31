<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/20/2018
 * Time: 1:16 PM
 */

require_once("../Util.php");
require_once("../User.php");
require_once("../ArticleController.php");

$message = Util::getMessage();

session_start();

if (!isset($_SESSION["username"]) || $_SESSION["role"] == "administrator") {
    Util::endWithCode(828);
}
if (!isset($message->title) || !isset($message->content) || !isset($message->articleType)) {
    Util::endWithCode(831);
}

$username = $_SESSION["username"];
$title = $message->title;
$content = $message->content;
$articleType = $message->articleType;

$user = new User($username);

$articleController = new ArticleController();

if (isset($message->articleID)) {
    $articleID = $message->articleID;
    if ($articleController->updateArticle($user, $title, $content, $articleType, $articleID)) {
        Util::endWithCode(857);
    }
    else {
        Util::endWithCode(858);
    }
}

if ($articleController->addArticle($user, $title, $content, $articleType)) {
    Util::endWithCode(830);
}
else {
    Util::endWithCode(829);
}