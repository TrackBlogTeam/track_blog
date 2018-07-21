<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/17/2018
 * Time: 2:02 PM
 */

// TODO: Delete all unnecessary "break" statements
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
// 824: User registered successfully
// 825: User registered unsuccessfully
// 826: Successfully logged out
// 827: Wrong type of message
// 828: Fail to publish for not logged
// 829: Fail to publish for unknown reasons

require_once("User.php");
require_once("Administrator.php");
require_once("ArticleController.php");
require_once("AdministratorController.php");
require_once("UserController.php");

$message = json_decode($_POST["message"]);    // Decode the json string
$messageBack = new stdClass();                       // Establish the object to be sent back

session_start();

switch ($message->type) {
    case "register":
        $user = new User($message->username, $message->password, $message->phoneNumber);
        $userController = new UserController();
        if ($userController->addUser($user)) {
            $messageBack->code = 824;
            break;
        }
        else {
            $messageBack->code = 825;
            break;
        }
        break;

    case "logout":
        if (!isset($_SESSION["username"])) {   // not logged
            $messageBack->code = 821;
            break;
        }
        else {
            Actor::logout();
            $messageBack->code = 826;
            break;
        }
        break;

    case "login":
        if (!isset($message->username) || !isset($message->password)) { // username or password is in lack
            $messageBack->code = 813;
            break;
        }

        if (isset($_SESSION["username"])) {   // already logged
            $messageBack->code = 814;
            break;
        }

        if ($message->role == "administrator") {
            $administrator = new Administrator($message->username, $message->password);
            $administratorController = new AdministratorController();
            if ($administratorController->administratorExists($administrator)) {
                $administrator->login();
                $messageBack->code = 812;
                break;
            }
            else {
                $messageBack->code = 817;
                break;
            }
        }

        else if ($message->role == "user") {
            $user = new User($message->username, $message->password);
            $userController = new UserController();
            if ($userController->userExists($user)) {
                $user->login();
                $messageBack->code = 816;
                break;
            }
            else {
                $messageBack->code = 818;
                break;
            }
        }

        else {    // unknown role of sender of the message
            $messageBack->code = 815;
            break;
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
                        $table = null;
                        switch ($message->tableName) {
                            case "user":
                                $userController = new UserController();
                                $table = $userController->getOwnTable();
                                break;
                            case "administrator":
                                $administratorController = new AdministratorController();
                                $table = $administratorController->getOwnTable();
                                break;
                            case "article":
                                $articleController = new ArticleController();
                                $table = $articleController->getOwnTable();
                                break;
//                            case "comment":
//                                $commentController = new CommentController();
//                                $table = $commentController->getTable();
//                                break;
                        }
                        if (isset($table)) {
                            $messageBack->code = 822;
                            $messageBack->table = $table;
                            break;
                        }
                        else {
                            $messageBack->code = 823;
                            break;
                        }
                }
            }
        }
}

echo json_encode($messageBack);
exit(0);
