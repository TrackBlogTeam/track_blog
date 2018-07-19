<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/18/2018
 * Time: 7:14 PM
 */

require_once("DatabaseManager.php");

class Controller
{
    protected $databaseManager;

    public function __construct()
    {
        $this->databaseManager = DatabaseManager::getDatabaseManger();
    }

    public function __destruct()
    {
    }

    public function getDatabaseManager()
    {
        return $this->databaseManager;
    }
}