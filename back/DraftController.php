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

    public function addDraft($user, $title, $content)
    {
        $sql = "SELECT * FROM draft WHERE author_name='$user->username';";
        $this->databaseManager->execute($sql);
        $draftPersonalID = count($this->databaseManager->getResult());
        $draftKey = $this->generateKey($draftPersonalID);

        try {
            $draftFilePath = dirname(__DIR__) . "/users/" . $user->username . "/drafts/" . $draftKey . ".txt";
            $draftFile = fopen($draftFilePath, 'w');
            fwrite($draftFile, $content);
        }
        catch (Exception $e) {
            echo $e->getMessage();
        }

        $sql = "INSERT INTO draft (draft_key, draft_title, author_name) VALUES ('$draftKey', '$title', '$user->username');";
        $this->databaseManager->execute($sql);
        fclose($draftFile);
        return $this->databaseManager->getResult();
    }

    public function retrieveDraft($user, $draftID)
    {
        $sql = "SELECT draft_title, draft_key, article_id FROM draft WHERE draft_id=$draftID and author_name='$user->username';";
        $this->databaseManager->execute($sql);
        if (count($this->databaseManager->getResult()) === 1) {
            $result = $this->databaseManager->getResult();
            $messageBack = new stdClass();
            $messageBack->title = $result[0]["draft_title"];
            try {
                $draftFilePath = dirname(__DIR__) . "/users/" . $user->username . "/drafts/" . $result[0]["draft_key"] . ".txt";
                $draftFile = fopen($draftFilePath, 'r');
                $draftFileSize = filesize($draftFilePath);
                $draftContent = fread($draftFile, $draftFileSize);
                $messageBack->content = $draftContent;
                fclose($draftFile);
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

    private function generateKey($draftPersonalID)
    {
        $tempID = $draftPersonalID;
        $count = 1;
        while (intval($tempID / 10) > 0) {
            $tempID = intval($tempID / 10);
            ++$count;
        }
        return $draftPersonalID . "-" . rand(pow(10, 6 - $count), pow(10, 7 - $count) - 1);
    }
}