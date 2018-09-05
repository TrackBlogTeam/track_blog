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

    public function __construct()  // login
    {
        $argumentsCount = func_num_args();
        switch ($argumentsCount) {
            case 1:
                $this->__construct2(func_get_arg(0));
                break;
            case 2:
                parent::__construct(func_get_arg(0), func_get_arg(1));
                break;
            case 3:
                $this->__construct1(func_get_arg(0), func_get_arg(1), func_get_arg(2));
                break;
        }
    }

    public function __construct1($username, $password, $phoneNumber)  // register
    {
        parent::__construct($username, $password);
        $this->phoneNumber = $phoneNumber;
    }

    public function __construct2($username)   // already logged
    {
        $this->username = $username;
    }

    public function __destruct()
    {
        parent::__destruct();
    }

    public function signIn()
    {
        parent::signIn();
        $_SESSION["username"] = $this->username;
        $_SESSION["role"] = "user";
    }

    public function __get($variable)
    {
        return $this->$variable;
    }
}