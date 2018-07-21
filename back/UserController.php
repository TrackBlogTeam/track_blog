<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/19/2018
 * Time: 5:51 PM
 */

require_once("Controller.php");

class UserController extends Controller
{
    const tableName = "user";

    public function __construct()
    {
        parent::__construct();
    }

    public function __destruct()
    {
        parent::__destruct();
    }

    // check whether a user exists
    public function userExists($user)
    {
        $sql = "SELECT * FROM user WHERE user_name='$user->username' and user_password='$user->password';";
        $this->databaseManager->execute($sql);
        return (count($this->databaseManager->getResult()) > 0);
    }

    // register a new user
    public function addUser($user)
    {
        // TODO: Verify feasibility
        // TODO: Verify phone number    DONE
        // TODO: Verify username
        // TODO: Verify password
        // TODO: Create a directory for each user
        if ($this->userExists($user)) {
            return false;
        }

        $match = null;
        preg_match("/13[123569]{1}\d{8}|15[1235689]\d{8}|188\d{8}/", $user->phoneNumber, $match);
        if (count($match) == 0) {   // illegal phone number
            return false;
        }

        $sql = "INSERT INTO user (user_name, user_password, phone_number) VALUES ('$user->username', '$user->password', '$user->phone_number');";
        $this->databaseManager->execute($sql);
        if ($this->databaseManager->getResult()) {
            $path = __DIR__ . "../articles/" . $user->username;
            mkdir($path);
        }
        return $this->databaseManager->getResult();
    }

    public function deleteUser($user)
    {
        // TODO: Delete the articles of this user recursively
    }

    public function getOwnTable()
    {
        return parent::getTable(self::tableName);
    }

}