<?php

use Conf\Config;

include_once 'config.php';
class Database
{
    public $conn;

    public function __construct()
    {
        //ostvarivanje konekcije s podacima iz config.php
        $this->conn = mysqli_connect(Config::$host, Config::$user, Config::$pass, Config::$db, Config::$port);
        if (!$this->conn) {
            echo "Connection error";
        }
    }

    //umetanje podataka u bazu
    public function insert($table_name, $data)
    {
        $string = "INSERT INTO " . $table_name . " (";
        $string .= implode(",", array_keys($data)) . ') VALUES (';
        $string .= "'" . implode("','", array_values($data)) . "')";
        if (mysqli_query($this->conn, $string)) {
            return true;
        }
    }

    //ostvarivanje select upita
    public function query($query)
    {
        $quer = mysqli_query($this->conn, $query);
        if (!$quer) {
            echo "Error";
        } else return $quer;
    }

    //update u bazi $query upitom
    public function update($query)
    {
        $quer = mysqli_query($this->conn, $query);
        if (!$quer) {
            echo "Error";
        }
    }
}
