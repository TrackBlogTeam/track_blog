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

// markdown直接json_decode即可
$message = json_decode($_POST["message"]);

session_start();

if (!isset($_SESSION["username"]) || $_SESSION["role"] == "administrator") {
    Util::EndWithCode(828);
}
if (!isset($message->title) || !isset($message->content) || !isset($message->articleType)) {
    Util::EndWithCode(831);
}

$username = $_SESSION["username"];
$title = $message->title;
$content = $message->content;
$articleType = $message->articleType;

$user = new User($username);

$articleController = new ArticleController();

if ($articleController->addArticle($user, $title, $content, $articleType)) {
    Util::EndWithCode(830);
}
else {
    Util::EndWithCode(829);
}