<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/17/2018
 * Time: 2:02 PM
 */

// code:
// 812: Administrator logs in successfully
// 813: Lack of parameters for logging in
// 814: Session already exists the logged state of current actor
// 815: Unknown role of the sender of the message
// 816: User logs in successfully
// 817: Administrator's login fails for unmatched username and password
// 818: User's login fails for unmatched username and password
// 819: Not enough authentication for administrator/user
// 820: Success to retrieve profile of an administrator
// 821: Fail to logout for non-existent login status
// 822: Success to retrieve table  from database
// 823: No data in this table or this table doesn't exist

require_once("Administrator.php");
require_once("ArticleController.php");
require_once("InformationController.php");

$message = json_decode($_POST["message"]);    // Decode the json string
$messageBack = new stdClass();                       // Establish the object to be sent back

session_start();

switch ($message->type) {
    case "logout":
        if (!isset($_SESSION["username"])) {   // not logged
            $messageBack->code = 821;
        }
        else {
            Actor::logout();
        }

        break;
    case "login":
        if (!isset($message->username) || !isset($message->password)) {
            $messageBack->code = 813;
        }
        if (isset($_SESSION["username"])) {   // already logged
            $messageBack->code = 814;
        }
        else {
            if ($message->role == "administrator") {
                $administrator = new Administrator($message->username, $message->password);
                $informationController = new InformationController();
                if ($informationController->administratorExists($administrator)) {
                    $administrator->login();
                    $messageBack->code = 812;
                }
                else {
                    $messageBack->code = 817;
                }
            }
            else
                if ($message->role == "user") {
                }
                else {
                    $messageBack->code = 815;
                }
        }
        break;

    case "retrieve":
        if (!isset($_SESSION["role"]) || $_SESSION["role"] != $message->role) {
            $messageBack->code = 819;
        }
        else {
            if ($_SESSION["role"] == "administrator") {   // only for administrators
                switch ($message->content) {
                    case "profile":
                        $messageBack->code = 820;
                        $messageBack->username = $_SESSION["username"];
                        $messageBack->portraitUrl = $_SESSION["portraitUrl"];
                        break;
                    case "table":
                        $informationController = new InformationController();
                        $table = $informationController->getTable($message->tableName);
                        if (isset($table)) {
                            $messageBack->code = 822;
                            $messageBack->table = $table;
                        }
                        else {
                            $messageBack->code = 823;
                        }
                        break;
                }
            }
        }
}

echo json_encode($messageBack);
exit(0);

?>