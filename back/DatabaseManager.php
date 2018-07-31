<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/17/2018
 * Time: 1:04 PM
 */

class DatabaseManager
{
    static private $databaseManger;

    private $server;
    private $username;
    private $password;
    private $dbname;

    private $pdo;
    private $result;

    // 防止直接创建对象
    // Prevent directly creating an object
    private function __construct()
    {
        require_once("other/secret.php");
        $this->server = $server;
        $this->username = $username;
        $this->password = $password;
        $this->dbname = $dbname;
        $this->pdo = null;
    }

    // 防止克隆对象
    // Prevent cloning of this object
    private function __clone()
    {
    }

    // 这个必须是静态函数，否则获取必须外部先new一个DatabaseManager，
    // 如果外部new出来的话，那这个就不是单例模式了
    // This function must be a static function, otherwise
    static public function getDatabaseManger()
    {
        // self是指向该类的指针，而this是指向该对象的指针
        // "self" is the pointer pointing to this class, while "this" is the pointer pointing to this object
        if (!self::$databaseManger instanceof self) {
            self::$databaseManger = new self();
        }
        return self::$databaseManger;
        // 现在是在该类的作用域内，访问什么数据都是可取的
        // Now it is in the domain of this class. Access is available to whichever data.
    }

    public function execute($sql)
    {
        $this->resetResult();
        try {
            if (!isset($this->pdo)) {
                $this->pdo = new PDO("mysql:host=$this->server;dbname=$this->dbname", $this->username, $this->password);
                $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }
            $sql = strtolower($sql);
            $crud = preg_split("/\s/", $sql)[0];
            $statement = $this->pdo->prepare($sql);
            switch ($crud) {
                case "insert":
                case "update":
                case "delete":
                    $statement->execute();
                    $this->result = true;
                    break;
                case "select":
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

    public function getResult()
    {
        return $this->result;
    }

    public function resetResult()
    {
        $this->result = false;
    }
}