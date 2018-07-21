<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/20/2018
 * Time: 1:15 AM
 */

require_once("../Actor.php");

session_start();

$messageBack = new stdClass();

if (!isset($_SESSION["username"])) {   // not logged
    $messageBack->code = 821;
}
else {
    Actor::logout();
    $messageBack->code = 826;
}

echo json_encode($messageBack);