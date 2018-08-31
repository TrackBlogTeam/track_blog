<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 8/31/2018
 * Time: 11:04 AM
 */

require_once("Controller.php");

class DraftController extends Controller
{
    const tableName = "draft";

    public function __construct()
    {
        parent::__construct();
    }

    public function __destruct()
    {
        parent::__destruct();
    }

    public function getOwnTable($pageNumber, $limit)
    {
        return parent::getTable(self::tableName, $pageNumber, $limit);
    }

    public function getDrafts($user)
    {
        $sql = "SELECT * FROM draft WHERE author_name='$user->username' ORDER BY draft_id DESC;";
        $this->databaseManager->execute($sql);
        return $this->databaseManager->getResult();
    }

}