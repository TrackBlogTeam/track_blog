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
        // TODO: Verify username
        // TODO: Verify password
        if ($this->userExists($user)) {
            return false;
        }
        $match = null;
        preg_match("/1[356789]{1}\d{9}/", $user->phoneNumber, $match);
        if (count($match) == 0) {   // illegal phone number
            return false;
        }
        $sql = "INSERT INTO user (user_name, user_password, phone_number) VALUES ('$user->username', '$user->password', '$user->phoneNumber');";
        $this->databaseManager->execute($sql);
        if ($this->databaseManager->getResult()) {
            $path = dirname(__DIR__) . "/users/" . $user->username;
            var_dump($path);
//            mkdir($path, 0777);
            mkdir($path);
//            umask($path, 0777);
            $path = dirname(__DIR__) . "/users/" . $user->username . "/articles";
//            mkdir($path, 0777);
            var_dump($path);
            mkdir($path);
//            umask($path, 0777);
            $path = dirname(__DIR__) . "/users/" . $user->username . "/drafts";
//            mkdir($path, 0777);
            var_dump($path);
            mkdir($path);
//            umask($path, 0777);

            try {
                $templatePath = dirname(__DIR__) . "/static/template/template_homepage.html";
                $templateFile = fopen($templatePath, 'r');
                $templateFileSize = filesize($templatePath);
                $templateString = fread($templateFile, $templateFileSize);

                $homepageString = str_replace("<username></username>", $user->username, $templateString);
                $homepagePath = dirname(__DIR__) . "/users/" . $user->username . "/index.html";

                $homepageFile = fopen($homepagePath, 'w');
                fwrite($homepageFile, $homepageString);
            }
            catch (Exception $e) {
                echo $e->getMessage();
            }
            fclose($templateFile);
            fclose($homepageFile);
        }
        return $this->databaseManager->getResult();
    }

    public function deleteUser($user)
    {
        // TODO: Delete the articles of this user recursively
    }

    public function getOwnTable($pageNumber, $limit)
    {
        return parent::getTable(self::tableName, $pageNumber, $limit);
    }

}