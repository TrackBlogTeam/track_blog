<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/18/2018
 * Time: 11:06 AM
 */

require_once("Actor.php");

class Administrator extends Actor
{
    public function __construct($username, $password)
    {
        parent::__construct($username, $password);
    }

    public function __destruct()
    {
        parent::__destruct();
    }

    public function signIn()
    {
        parent::signIn();
        $_SESSION["username"] = $this->username;
        $_SESSION["role"] = "administrator";
        $_SESSION["portraitUrl"] = "src/default-portrait.png";
    }
}