<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/16/2018
 * Time: 11:28 AM
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