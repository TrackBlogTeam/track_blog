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
}

//    private $username;
//    private $password;
//
//    public function __construct($username, $password)
//    {
//        $this->username = $username;
//        $this->password = $password;
//    }
//
//    public function __get($var)
//    {
//        return $this->$var;
//    }
//
//    public function __destruct()
//    {
//    }
//
//    public function login()
//    {
//        $databaseManager = new DatabaseManager();
//        $username = addslashes($this->username);
//        $password = addslashes($this->password);
//        $databaseManager->execute("SELECT * FROM administrator WHERE administrator_name='$username' and administrator_password='$password';");
//        if (count($databaseManager->getResults()) > 0) {
//            return true;
//        }
//        return false;
//    }
//
//    public function retrieveUser()   // for administrators, retrieve the "user" table
//    {
//        $databaseManager = new DatabaseManager();
//        $databaseManager->execute("SELECT * FROM user LIMIT 10;");
//        if (count($databaseManager->getResults()) > 0) {
//            $results = array();
//            foreach ($databaseManager->getResults() as $result) {
//                $resultObject = new stdClass();
//                $resultObject->user_id = $result["user_id"];
//                $resultObject->user_name = $result["user_name"];
//                $resultObject->user_password = $result["user_password"];
//                $resultObject->phone_number = $result["phone_number"];
//                array_push($results, $resultObject);
//            }
//            return $results;
//        }
//        else {
//            return false;
//        }
//    }
//
//    public function retrieveAdministrator()  // for administrators, retrieve the "administrator" table
//    {
//
//    }