<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/20/2018
 * Time: 1:15 AM
 */

require_once("../Actor.php");
require_once("../Util.php");

session_start();

if (!isset($_SESSION["username"])) {   // not logged
    Util::endWithCode(821);
}
else {
    Actor::logout();
    Util::endWithCode(826);
}