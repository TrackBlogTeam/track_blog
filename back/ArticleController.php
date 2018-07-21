<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/18/2018
 * Time: 6:59 PM
 */

require_once("Controller.php");

class ArticleController extends Controller
{
    const tableName = "article";

    public function __construct()
    {
        parent::__construct();
    }

    public function __destruct()
    {
        parent::__destruct();
    }

    public function getOwnTable()
    {
        return parent::getTable(self::tableName);
    }
}