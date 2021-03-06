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
        "user_password VARCHAR(64) NOT NULL," .
        "phone_number VARCHAR(30) NOT NULL," .
        "number_liked INT(6) DEFAULT 0," .
        "number_article INT(6) DEFAULT 0," .
        "number_comment INT(6) DEFAULT 0," .
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
        "article_id INT(6) NOT NULL AUTO_INCREMENT," .
        "author_name VARCHAR(30) NOT NULL," .
        "article_key VARCHAR(8) NOT NULL," .
        "article_title VARCHAR(128) NOT NULL," .
        "number_liked INT(6) DEFAULT 0," .
        "number_comment INT(6) DEFAULT 0," .
        "created_time TIMESTAMP NOT NULL," .
        "edited_time TIMESTAMP NOT NULL," .
        "PRIMARY KEY(article_id)," .
        "FOREIGN KEY(author_name) REFERENCES user(user_name)" .
        ");";
    $pdo->exec($sql);

    // creation of table writes
    $sql = "CREATE TABLE writes(" .
        "article_id INT(6) NOT NULL, " .
        "author_id INT(5) NOT NULL, " .
        "FOREIGN KEY(article_id) REFERENCES article(article_id)," .
        "FOREIGN KEY(author_id) REFERENCES user(user_id)" .
        ");";
    $pdo->exec($sql);

    // creation of table draft
    $sql = "CREATE TABLE draft(" .
        "draft_id INT(6) NOT NULL AUTO_INCREMENT," .
        "draft_key VARCHAR(8) NOT NULL," .
        "draft_title VARCHAR(128) NOT NULL," .
        "author_name VARCHAR(30) NOT NULL," .
        "article_id INT(6)," .
        "PRIMARY KEY(draft_id)," .
        "FOREIGN KEY(author_name) REFERENCES user(user_name)," .
        "FOREIGN KEY(article_id) REFERENCES article(article_id)" .
        ");";
    $pdo->exec($sql);

}
catch (Exception $e) {
    echo $e->getMessage();
}
$pdo = null;