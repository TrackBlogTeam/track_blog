<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/18/2018
 * Time: 7:14 PM
 */

require_once("DatabaseManager.php");

abstract class Controller
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

    abstract public function getOwnTable();

    public function getTable($tableName)
    {
        if ($_SESSION["role"] != "administrator") {
            return null;
        }
        $sql = "SELECT * FROM $tableName;";
        $this->databaseManager->execute($sql);
        $databaseResults = $this->databaseManager->getResult();
        if (count($databaseResults) > 0) {
            $tableHead = [];
            $tableData = [];
            foreach ($databaseResults[0] as $key => $value) {
                array_push($tableHead, $key);
            }
            foreach ($databaseResults as $record) {
                $singleData = [];
                foreach ($record as $key => $value) {
                    array_push($singleData, $value);
                }
                array_push($tableData, $singleData);
            }
            $table = new stdClass();
            $table->head = $tableHead;
            $table->data = $tableData;
            return $table;
        }
        return null;
    }
}