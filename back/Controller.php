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

    abstract public function getOwnTable($pageNumber, $limit);

    public function getTable($tableName, $pageNumber = 1, $limit = 10)
    {
        if ($pageNumber < 1 || $limit < 1) {
            return null;
        }
        $offset = ($pageNumber - 1) * $limit;
        $sql = "SELECT * FROM $tableName LIMIT $offset, $limit;";
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