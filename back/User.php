<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/19/2018
 * Time: 6:08 PM
 */

require_once("Actor.php");

class User extends Actor
{
    private $phoneNumber;

    public function __construct($username, $password)
    {
        parent::__construct($username, $password);
    }

    public function __construct1($username, $password, $phoneNumber)
    {
        parent::__construct($username, $password);
        $this->phoneNumber = $phoneNumber;
    }

    public function __destruct()
    {
        parent::__destruct();
    }

    public function login()
    {
        parent::login();
        $_SESSION["username"] = $this->username;
        $_SESSION["role"] = "user";
    }

    public function __get($variable)
    {
        return $this->$variable;
    }
}