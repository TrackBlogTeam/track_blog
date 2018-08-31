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

    public function getArticles($user)
    {
        // TODO: Optimize the efficiency of the query
        $sql = "SELECT * FROM article WHERE author_name='$user->username' ORDER BY article_id DESC;";
        $this->databaseManager->execute($sql);
        return $this->databaseManager->getResult();
    }

    public function addArticle($user, $title, $content, $articleType)
    {
        // TODO: Check the length of the $title
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

            $templateFile = fopen($templatePath, 'r');
            $templateFileSize = filesize($templatePath);
            $templateString = fread($templateFile, $templateFileSize);

            $templateString = str_replace("<articleTitle></articleTitle>", $title . " - 轨迹博客", $templateString);
            $articleString = str_replace("<content></content>", $content, $templateString);

            $articleFilePath = dirname(__DIR__) . "/users/" . $user->username . "/articles/" . $articleKey . ".html";
            $articleFile = fopen($articleFilePath, 'w');
            fwrite($articleFile, $articleString);

            $originFilePath = dirname(__DIR__) . "/users/" . $user->username . "/articles/" . $articleKey . ".txt";
            $originFile = fopen($originFilePath, 'w');
            fwrite($originFile, $content);
        }
        catch (Exception $e) {
            echo $e->getMessage();
        }

        $sql = "INSERT INTO article (author_name, article_key, article_title, created_time, edited_time) VALUES('$user->username', '$articleKey', '$title', NOW(), NOW());";
        $this->databaseManager->execute($sql);
        fclose($templateFile);
        fclose($articleFile);
        fclose($originFile);
        return $this->databaseManager->getResult();
    }

    public function updateArticle($user, $title, $content, $articleType, $articleID)
    {
        $sql = "SELECT * FROM article WHERE author_name='$user->username' AND article_id=$articleID;";
        $this->databaseManager->execute($sql);
        if (count($this->databaseManager->getResult()) === 1) {
            $articleKey = ($this->databaseManager->getResult())[0]["article_key"];
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

                $templateFile = fopen($templatePath, 'r');
                $templateFileSize = filesize($templatePath);
                $templateString = fread($templateFile, $templateFileSize);

                $templateString = str_replace("<articleTitle></articleTitle>", $title . " - 轨迹博客", $templateString);
                $articleString = str_replace("<content></content>", $content, $templateString);

                $articleFilePath = dirname(__DIR__) . "/users/" . $user->username . "/articles/" . $articleKey . ".html";
                $articleFile = fopen($articleFilePath, 'w');
                fwrite($articleFile, $articleString);

                $originFilePath = dirname(__DIR__) . "/users/" . $user->username . "/articles/" . $articleKey . ".txt";
                $originFile = fopen($originFilePath, 'w');
                fwrite($originFile, $content);
            }
            catch (Exception $e) {
                echo $e->getMessage();
            }
        }
        else {
            return false;
        }
    }

    public function retrieveArticle($user, $articleID)
    {
        $sql = "SELECT article_title, article_key FROM article WHERE article_id=$articleID and author_name='$user->username';";
        $this->databaseManager->execute($sql);
        if (count($this->databaseManager->getResult()) === 1) {
            $result = $this->databaseManager->getResult();
            $messageBack = new stdClass();
            $messageBack->title = $result[0]["article_title"];
            try {
                $originFilePath = dirname(__DIR__) . "/users/" . $user->username . "/articles/" . $result[0]["article_key"] . ".txt";
                $originFile = fopen($originFilePath, 'r');
                $originFileSize = filesize($originFilePath);
                $originContent = fread($originFile, $originFileSize);
                $messageBack->content = $originContent;
                fclose($originFile);
            }
            catch (Exception $e) {
                echo $e->getMessage();
            }
            return $messageBack;
        }
        else {
            return false;
        }
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