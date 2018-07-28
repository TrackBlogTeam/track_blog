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

session_start();

if (!isset($_SESSION["username"]) || $_SESSION["role"] !== "administrator") {
    Util::EndWithCode(832);
}

$message = $_POST["message"];
$message = Util::ProcessMessage($message);

if (!isset($message) || !isset($message->tableName) || !isset($message->pageNumber)) {
    Util::EndWithCode(833);
}

switch ($message->tableName) {
    case "administrator":
        $administratorController = new AdministratorController();
        return $administratorController->getOwnTable();
        break;
    case "article":
        $articleController = new ArticleController();
        return $articleController->getOwnTable();
        break;
    default:
        Util::EndWithCode(834);
}