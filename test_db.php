<?php
/**
 * Created by PhpStorm.
 * User: LBY
 * Date: 7/14/2018
 * Time: 1:00 PM
 */

require_once("secret.php");

try {
    $pdo = new PDO("mysql:host=$server;dbname=$dbname", $username, $password);
}
catch (Exception $e) {
    echo $e->getMessage();
}
$pdo = null;
?>