<?php
/**
 * Created by PhpStorm.
 * User: lby
 * Date: 2018/8/13
 * Time: 21:07
 */

require('../User.php');

session_start();
$user = new User('root', 'yangjianwei');
$user->login();