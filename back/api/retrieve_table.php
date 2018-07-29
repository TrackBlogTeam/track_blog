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
    Util::EndWithCode(832);
}

$message = $_POST["message"];
$message = Util::ProcessMessage($message);
if (!isset($message) || !isset($message->tableName) || !isset($message->pageNumber) || !isset($message->limit)) {
    Util::EndWithCode(833);
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
        Util::EndWithCode(834);
}