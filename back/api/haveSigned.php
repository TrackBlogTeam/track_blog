<?php
/**
 * Created by PhpStorm.
 * User: lby
 * Date: 2018/8/27
 * Time: 19:50
 */

session_start();

$messageBack = new stdClass();

if (isset($_SESSION["username"])) {
    $messageBack->signed = true;
    $messageBack->username = $_SESSION["username"];
    $messageBack->role = $_SESSION["role"];
} else {
    $messageBack->signed = false;
}
// TODO: Modify the API document
echo json_decode($messageBack);