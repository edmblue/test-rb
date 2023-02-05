<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "DBconnect.php";

abstract class Product extends Connection{

    protected $sku;
    protected $name;
    protected $price;
    protected $type;

    public function setSku($objInfo){

        if(!isset($objInfo->sku) || $objInfo->sku == "") {
            echo "SKU can't be blank";
            exit();
        }

        $sql = "SELECT `sku` FROM `products_list` WHERE `sku` = '$objInfo->sku'";
        $stmt = $this->connection->prepare($sql);
        $stmt -> execute();

        if($stmt->rowCount() > 0) {
            echo "This SKU it's already in use";
            exit();
        }

        $this->sku = $objInfo->sku;
    }


    public function setName($objInfo){

        if(!isset($objInfo->name) || $objInfo->name == "") {
            echo "Please submit required Name";
            exit();
        }
        $this->name = $objInfo->name;
    }

    public function setPrice($objInfo){
        if(!isset($objInfo->price) || $objInfo->price == "") {
            echo "Please submit required Price";
            exit();
        }
        if(is_numeric($objInfo->price) < 1) {
            echo "Invalid Price. Please, provide the data of indicated type";
            exit();
        }

        $this->price = $objInfo->price;
    }

    public function setType($objInfo){
        
        $this->type = $objInfo->type->productType;
    }

    abstract public function setAdditional($objInfo);

    abstract public function saveData();

}

class handleData extends Connection{

    private $data;

    public function setData() {
        $this->data = json_decode(file_get_contents("php://input"));
    }

    public function deleteData() {
        foreach($this->data as $deleteItem) {
            $sql = "DELETE FROM `products_list` WHERE `sku` = '$deleteItem'";
            $stmt = $this->connection->prepare($sql);
            $stmt->execute();
        }
    }

    public function getAllData(){
        $sql = "SELECT * FROM products_list";
        $stmt = $this->connection->prepare($sql);
        $stmt -> execute();
        $products = $stmt->fetchAll(PDO::FETCH_CLASS);

        echo json_encode($products);
    }

}


class Dvd extends Product {

    private $size;

    public function setAdditional($objInfo){
        if(!isset($objInfo->size) || $objInfo->size == "") {
            echo "Please submit required size";
            exit();
        }
        if(is_numeric($objInfo->size) < 1) {
            echo "Invalid Size. Please, provide the data of indicated type";
            exit();
        }
        $this->size = $objInfo->size;
    }

    public function saveData() {

        $sql = "INSERT INTO `products_list` (`id`, `sku`, `name`, `size`, `price`, `type`) VALUES (NULL, '$this->sku', '$this->name', '$this->size', '$this->price', '$this->type');";
        
        $this->connection->exec($sql);

        return $this->connection->lastInsertId();
    
    }
}

class Furniture extends Product {

    private $height;
    private $width;
    private $length;

    public function setAdditional($objInfo){

        if(!isset($objInfo->height) || $objInfo->height == "") {
            echo "Please submit required height";
            exit();
        }  
        
        if(is_numeric($objInfo->height) < 1) {
            echo "Invalid Height. Please, provide the data of indicated type";
            exit();
        }

        if(!isset($objInfo->width) || $objInfo->width == "") {
            echo "Please submit required width";
            exit();
        }

        if(is_numeric($objInfo->width) < 1) {
            echo "Invalid Width. Please, provide the data of indicated type";
            exit();
        }

        if(!isset($objInfo->length) || $objInfo->length == "") {
            echo "Please submit required length";
            exit();
        }
       
        if(is_numeric($objInfo->length) < 1) {
            echo "Invalid length. Please, provide the data of indicated type";
            exit();
        }
        
        $this->height = $objInfo->height;
        $this->width = $objInfo->width;
        $this->length = $objInfo->length;
    }
    
    public  function saveData() {

     $sql = "INSERT INTO `products_list` (`id`, `sku`, `name`, `price`, `type`, `height`, `width`, `length`) VALUES (NULL, '$this->sku', '$this->name', '$this->price', '$this->type', '$this->height', '$this->width', '$this->length');";   

     $this->connection->exec($sql);

     return $this->connection->lastInsertId();
        
    }
}

class Book extends Product {

    private $weight;

    public  function setAdditional($objInfo){

        if(!isset($objInfo->weight) || $objInfo->weight == "") {
            echo "Please submit required weight";
            exit();
        }
        if(is_numeric($objInfo->weight) < 1) {
            echo "Invalid Weight. Please, provide the data of indicated type";
            exit();
        }
        $this->weight = $objInfo->weight;
    }

    public  function saveData() {
    
    $sql = "INSERT INTO `products_list` (`id`, `sku`, `name`, `price`, `type`, `weight`) VALUES (NULL, '$this->sku', '$this->name', '$this->price', '$this->type', '$this->weight');";

     $this->connection->exec($sql);

     return $this->connection->lastInsertId();
    }
}

?>