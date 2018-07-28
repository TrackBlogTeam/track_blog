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

if (!isset($_SESSION["username"]) || !isset($_SESSION["role"]) || $_SESSION["role"] != "user") {
    Util::EndWithCode(836);
}

$articleController = new ArticleController();
$user = new User($_SESSION["username"]);
echo json_encode($articleController->getMyArticles($user));



