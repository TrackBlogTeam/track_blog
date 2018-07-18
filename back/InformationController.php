<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/18/2018
 * Time: 6:59 PM
 */

require_once("Controller.php");

class InformationController extends Controller
{
    // This information controller is controlling information about administrators and users
    public function __construct()
    {
        parent::__construct();
    }

    public function __destruct()
    {
        parent::__destruct();
    }


    // check if one administrator exists
    public function administratorExists($administrator)
    {
        $sql = "SELECT * FROM administrator WHERE administrator_name='$administrator->username' and administrator_password='$administrator->password';";
        $this->databaseManager->execute($sql);
        return (count($this->databaseManager->getResults()) > 0);
    }

    // check if one user exists
    public function userExists($user)
    {
        $sql = "SELECT * FROM user WHERE user_name='$user->username' and user_password='$user->password';";
        $this->databaseManager->execute($sql);
        return (count($this->databaseManager->getResults()) > 0);
    }

    // seize all users' information back to the front
    // This is only for administrators
    public function getAllUsers()
    {
    }
}