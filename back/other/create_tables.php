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
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // creation of table user
    $sql = "CREATE TABLE user (" .
        "user_id INT(5) NOT NULL AUTO_INCREMENT," .
        "user_name VARCHAR(30) NOT NULL," .
        "user_password VARCHAR(30) NOT NULL," .
        "phone_number VARCHAR(30) NOT NULL," .
        "PRIMARY KEY(user_id)," .
        "UNIQUE(user_name)" .
        ");";
    $pdo->exec($sql);

    // creation of table administrator
    $sql = "CREATE TABLE administrator(" .
        "administrator_id TINYINT NOT NULL AUTO_INCREMENT," .
        "administrator_name VARCHAR(30) NOT NULL," .
        "administrator_password VARCHAR(30) NOT NULL," .
        "PRIMARY KEY(administrator_id)" .
        ");";
    $pdo->exec($sql);

    // creation of table article
    $sql = "CREATE TABLE article(" .
        "article_id INT(5) NOT NULL AUTO_INCREMENT," .
        "author_name VARCHAR(30) NOT NULL," .
        "article_key VARCHAR(8) NOT NULL," .
        "PRIMARY KEY(article_id)," .
        "FOREIGN KEY(author_name) REFERENCES user(user_name)" .
        ");";
    $pdo->exec($sql);

    // creation of table writes
    $sql = "CREATE TABLE writes(" .
        "article_id INT(5) NOT NULL, " .
        "author_id INT(5) NOT NULL, " .
        "FOREIGN KEY(article_id) REFERENCES article(article_id)," .
        "FOREIGN KEY(author_id) REFERENCES user(user_id)" .
        ");";
    $pdo->exec($sql);
}
catch (Exception $e) {
    echo $e->getMessage();
}
$pdo = null;