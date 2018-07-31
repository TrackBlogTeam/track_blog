<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/24/2018
 * Time: 11:31 PM
 */

require_once("../Util.php");
require_once("../ArticleController.php");
require_once("../AdministratorController.php");
require_once("../UserController.php");

session_start();

if (!isset($_SESSION["username"]) || $_SESSION["role"] !== "administrator") {
    Util::endWithCode(832);
}

$message = Util::getMessage();

if (!isset($message) || !isset($message->tableName) || !isset($message->pageNumber) || !isset($message->limit)) {
    Util::endWithCode(833);
}

$pageNumber = $message->pageNumber;
$limit = $message->limit;

switch ($message->tableName) {
    case "administrator":
        $administratorController = new AdministratorController();
        echo json_encode($administratorController->getOwnTable($pageNumber, $limit));
        break;
    case "user":
        $userController = new UserController();
        echo json_encode($userController->getOwnTable($pageNumber, $limit));
        break;
    case "article":
        $articleController = new ArticleController();
        echo json_encode($articleController->getOwnTable($pageNumber, $limit));
        break;
    default:
        Util::endWithCode(834);
}