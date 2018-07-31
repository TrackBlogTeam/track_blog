<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/17/2018
 * Time: 1:58 PM
 */

class Actor
{
    protected $username;
    protected $password;
    protected $logged;

    public function __construct($username, $password)
    {
        $this->username = addslashes($username);
        $this->password = addslashes($password);
        $this->logged = false;
    }

    public function __destruct()
    {
    }

    public function __get($variable)
    {
        return $this->$variable;
    }

    public function login()
    {
        $this->logged = true;
    }

    static public function logout()
    {
        session_start();
        session_unset();
        session_destroy();
    }
}