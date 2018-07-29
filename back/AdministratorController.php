<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/19/2018
 * Time: 5:54 PM
 */

require_once("Controller.php");

class AdministratorController extends Controller
{
    const tableName = "administrator";

    public function __construct()
    {
        parent::__construct();
    }

    public function __destruct()
    {
        parent::__destruct();
    }

    public function administratorLogin($administrator)
    {
        if ($this->administratorExists($administrator)) {
            $administrator->login();
            return 812;
        }
        else {
            return 817;
        }
    }

    // check whether one administrator exists
    public function administratorExists($administrator)
    {
        $sql = "SELECT * FROM administrator WHERE administrator_name='$administrator->username' and administrator_password='$administrator->password';";
        $this->databaseManager->execute($sql);
        return (count($this->databaseManager->getResult()) > 0);
    }

    // register a new administrator
    public function addAdministrator($administrator)
    {
        $sql = "INSERT INTO administrator (administrator_name, administrator_password) VALUES ('$administrator->username', '$administrator->password');";
        $this->databaseManager->execute($sql);
        return $this->databaseManager->getResult();
    }

    public function deleteAdministrator($administrator)
    {
        $sql = "DELETE FROM administrator WHERE administrator_name='$administrator->username' AND administrator_password='$administrator->password');";
        $this->databaseManager->execute($sql);
        return $this->databaseManager->getResult();
    }

    public function getOwnTable($pageNumber, $limit)
    {
        return parent::getTable(self::tableName, $pageNumber, $limit);
    }
}