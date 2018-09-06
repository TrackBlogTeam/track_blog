<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/28/2018
 * Time: 11:29 PM
 */

require_once("../Util.php");
require_once("../ArticleController.php");
require_once("../User.php");

session_start();

$message = Util::getMessage();

if (!isset($message->username)) {
    Util::endWithCode(836);
}

$articleController = new ArticleController();
$user = new User($message->username);
echo json_encode($articleController->getArticles($user));

