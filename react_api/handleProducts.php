<?php

include "products.php";

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "POST") {
    class ProductFactory {

        protected $data;
        protected $productType;
    
        public function __construct()
        {
            $this->data = json_decode(file_get_contents("php://input"));
            $this->productType = $this->data->type->productType;
        }
    
        public function createProduct(){
            $types = [
                "dvd" => Dvd::class,
                "furniture" => Furniture::class,
                "book" => Book::class,
            ];
            
            if (!array_key_exists($this->productType, $types)) {
                echo "Please Select a Valid Type";
                exit();
            }

    
            $class = $types[$this->productType];
            $product = new $class();
    
            $product->setSku($this->data);
            $product->setName($this->data);
            $product->setPrice($this->data);
            $product->setType($this->data);
            $product->setAdditional($this->data);
            $product->saveData();

            echo "success";
        }
    }
    
    $productFactory = new ProductFactory;
    $productFactory->createProduct();
   
} else if ($method == "GET") {

    $products = new handleData;
    $products->getAllData();
}

?>