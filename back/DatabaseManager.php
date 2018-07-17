<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/17/2018
 * Time: 1:04 PM
 */

class DatabaseManager
{
    private $server;
    private $username;
    private $password;
    private $dbname;
    private $pdo;
    private $result;

    public function __construct()
    {
        require_once("secret.php");
        $this->server = $server;
        $this->username = $username;
        $this->password = $password;
        $this->dbname = $dbname;
        $this->pdo = null;
    }

    public function execute($sql)
    {
        $this->result = false;
        try {
            if (!isset($this->pdo)) {
                $this->pdo = new PDO("mysql:host=$this->server;dbname=$this->dbname", $this->username, $this->password);
                $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }
            $sql = strtoupper($sql);
            $crud = preg_split("/\s/", $sql)[0];
            $statement = $this->pdo->prepare($sql);
            switch ($crud) {
                case "INSERT":
                case "UPDATE":
                case "DELETE":
                    $statement->execute();
                    $this->result = true;
                    break;
                case "SELECT":
                    $statement->setFetchMode(PDO::FETCH_ASSOC);
                    $statement->execute();
                    $this->result = $statement->fetchAll();
                    break;
            }
        }
        catch (Exception $e) {
            echo "Messages from DatabaseManager: " . $e->getMessage();
        }
    }

    public function __destruct()
    {
        $this->pdo = null;
    }
}