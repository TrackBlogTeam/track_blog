<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/26/2018
 * Time: 1:08 AM
 */

class Util
{
    public function __construct()
    {
    }

    public function __destruct()
    {
    }

    public static function EndWithCode($code)
    {
        $messageBack = new stdClass();
        $messageBack->code = $code;
        echo json_encode($messageBack);
        exit(1);
        // As a matter of fact, one request may exit(0) with the situation that doesn't occur any error.
    }

    public static function ProcessMessage($message)
    {
        // TODO: Make sure this could process the message to a json object
        return json_decode($message);
    }
}