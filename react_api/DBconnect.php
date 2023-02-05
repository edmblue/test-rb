<?php 
class Connection{

    public $connection;
    private $server="localhost";
    private $user="root";
    private $password="";
    private $bd="products";

    function __construct() {
        try{
            $this->connection = new PDO("mysql:host=$this->server;dbname=$this->bd", $this->user, $this->password);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        } catch(PDOException $error){

            echo "connection erronea".$error;
        }
    }
}
?>