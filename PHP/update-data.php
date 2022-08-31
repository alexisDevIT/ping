<?php

include_once('sql.php');

$file = isset($_GET['file']) ? $_GET['file'] : 0;
$id = isset($_GET['id']) ? $_GET['id'] : 0;
$address = isset($_POST['address']) ? $_POST['address'] : '';
$name = isset($_POST['name']) ? $_POST['name'] : '';
$type = isset($_POST['type']) ? $_POST['type'] : '';
$conf_file = isset($_FILES['configuration']['name']) ? $_FILES['configuration']['name'] : '';

if ($file == 0) {
    $querySQL = " UPDATE `addresses` SET `name`='$name',`address`='$address',`type`='$type' WHERE id = '$id' ";
} 

if ($file == 1) {
    $querySQL = " UPDATE `addresses` SET `name`='$name',`address`='$address',`type`='$type',`conf_file`='$conf_file' WHERE id = '$id' ";
}

$runSQL = mysqli_query( $conexion, $querySQL );

if ($runSQL) {
    echo json_encode('OK');
} else {
    echo json_encode(0);
}

?>