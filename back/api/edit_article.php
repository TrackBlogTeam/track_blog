<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 8/31/2018
 * Time: 4:12 PM
 */

require_once("../Util.php");
require_once("../User.php");
require_once("../ArticleController.php");

$message = Util::getMessage();

session_start();

if (!isset($_SESSION["username"])) {
    Util::endWithCode(854);
}

if (!isset($_SESSION["role"]) || $_SESSION["role"] === "administrator") {
    Util::endWithCode(855);
}

if (!isset($message->articleID)) {
    Util::endWithCode(856);
}

$articleController = new ArticleController();
$user = new User($_SESSION["username"]);
$article = $articleController->retrieveArticle($user, $message->articleID);
if ($article) {
    echo json_encode($article);
}