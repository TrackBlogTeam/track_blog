<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/17/2018
 * Time: 1:58 PM
 */

require_once("DatabaseManager.php");

class Actor
{
    private $username;
    private $password;

    public function __construct($username, $password)
    {
        $this->username = $username;
        $this->password = $password;
    }

    public function __get($var)
    {
        return $this->$var;
    }

    public function __destruct()
    {
        $this->username = null;
        $this->password = null;
        //多此一举，根本不需要
    }

    public function login()
    {
        $databaseManager = new DatabaseManager();
        $username = addslashes($this->username);
        $password = addslashes($this->password);
        $databaseManager->execute("SELECT * FROM administrator WHERE administrator_name='$username' and administrator_password='$password';");
        if (count($databaseManager->getResults()) > 0) {
            return true;
        }
        return false;
    }
}