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

    public function addArticle($user, $content)
    {
        //TODO: Optimize the efficiency of the query
        $sql = "SELECT * FROM article WHERE author_name='$user->username';";
        $this->databaseManager->execute($sql);
        $articlePersonalID = $this->count($this->databaseManager->getResult());
        $articleKey = $this->generateKey($articlePersonalID);
        $sql = "INSERT INTO article (author_name, article_key) VALUES('$user->username', '$articleKey');";
        $this->databaseManager->execute($sql);
        try {
            $path = "../articles/" . $user->username . "/" . $articleKey . ".html";
            $file = fopen($path, 'w');
            fwrite($file, $content);
        }
        catch (Exception $e) {
            echo $e->getMessage();
        }
        fclose($file);
        return $this->databaseManager->getResult();
    }

    private function generateKey($articlePersonalID)
    {
        $tempID = $articlePersonalID;
        $count = 1;
        while (intval($tempID / 10) > 0) {
            $tempID = intval($tempID / 10);
            ++$count;
        }
        return $articlePersonalID . rand(pow(10, 7 - $count), pow(10, 8 - $count) - 1);
    }
}