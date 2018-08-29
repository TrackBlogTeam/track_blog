<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 8/29/2018
 * Time: 6:58 PM
 */

require_once("../Util.php");

session_start();
if (!isset($_SESSION["username"]) || $_SESSION["role"] != "user") {
    var_dump(isset($_SESSION["username"]));
    var_dump($_SESSION["role"] != "user");
    Util::endWithCode(842);
}

if (count($_FILES) > 1) {
    Util::endWithCode(838);
}

if (!isset($_FILES["portrait"]) || !isset($_FILES["portrait"]["size"])) {
    Util::endWithCode(839);
}

if (is_int($_FILES["portrait"]["size"]) && $_FILES["portrait"]["size"] / 1024 > 100) {
    Util::endWithCode(840);
}

//代码来源：https://blog.csdn.net/qq_34827048/article/details/70238464
$uploadedFile = fopen($_FILES["portrait"]["tmp_name"], 'rb');
$bin = fread($uploadedFile, 2); //只读2字节
fclose($uploadedFile);
$strInfo = @unpack('C2chars', $bin);
$typeCode = intval($strInfo['chars1'] . $strInfo['chars2']);

switch ($typeCode) {
    case 255216:
    case 7173:
    case 6677:
    case 13780:
        break;
    default:
        Util::endWithCode(843);
}

$path = dirname(dirname(__DIR__)) . '/users/' . $_SESSION["username"] . "/index.png";

if (move_uploaded_file($_FILES["portrait"]["tmp_name"], $path)) {
    Util::endWithCode(841);
}
else {
    Util::endWithCode(844);
}



