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

    public function getOwnTable($pageNumber, $limit)
    {
        return parent::getTable(self::tableName, $pageNumber, $limit);
    }

    public function getMyArticles($user)
    {
        // TODO: Optimize the efficiency of the query
        $sql = "SELECT * FROM article WHERE autho_name='$user->username';";
        $this->databaseManager->execute($sql);
        return $this->databaseManager->getResult();
    }

    public function addArticle($user, $title, $content, $articleType)
    {
        //TODO: Optimize the efficiency of the query
        $sql = "SELECT * FROM article WHERE author_name='$user->username';";
        $this->databaseManager->execute($sql);
        $articlePersonalID = count($this->databaseManager->getResult());
        $articleKey = $this->generateKey($articlePersonalID);

        try {
            $templatePath = null;
            if ($articleType === "markdown") {
                $templatePath = dirname(__DIR__) . "/static/template/" . "template_markdown.html";
            }
            else if ($articleType === "richText") {
                $templatePath = dirname(__DIR__) . "/static/template/" . "template_richText.html";
            }
            else {
                return false;
            }

            // todo: to chmod 777 each time
            $templateFile = fopen($templatePath, 'r');
            $templateFileSize = filesize($templatePath);
            $templateString = fread($templateFile, $templateFileSize);

            $templateString = str_replace("<articleTitle></articleTitle>", $title . " - 轨迹博客", $templateString);
            $articleString = str_replace("<content></content>", $content, $templateString);

            $articleFilePath = dirname(__DIR__) . "/users/" . $user->username . "/articles/" . $articleKey . ".html";
            $articleFile = fopen($articleFilePath, 'w');
            fwrite($articleFile, $articleString);
        }
        catch (Exception $e) {
            echo $e->getMessage();
        }

        $sql = "INSERT INTO article (author_name, article_key) VALUES('$user->username', '$articleKey');";
        $this->databaseManager->execute($sql);
        fclose($templateFile);
        fclose($articleFile);
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
        return $articlePersonalID . "-" . rand(pow(10, 6 - $count), pow(10, 7 - $count) - 1);
    }
}