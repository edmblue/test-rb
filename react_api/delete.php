<?php

include "products.php";

$products = new handleData;
$products->setData();
$products->deleteData();

echo "success";


?>