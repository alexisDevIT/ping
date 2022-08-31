<?php

include_once('sql.php');

$address = isset($_POST['address']) ? $_POST['address'] : '';
$name = isset($_POST['name']) ? $_POST['name'] : '';
$type = isset($_POST['type']) ? $_POST['type'] : '';
$conf_file = isset($_FILES['configuration']['name']) ? $_FILES['configuration']['name'] : '';
$date = date('Y-m-d H:i:s');

$querySQL = " INSERT INTO `addresses`(`name`, `address`, `type`, `conf_file`, `date`, `ultimo_ping`, `status`) VALUES ('$name','$address','$type','$conf_file','$date','$date',1)";
$runSQL = mysqli_query( $conexion, $querySQL );

if ($runSQL) {
    echo json_encode('OK');
} else {
    echo json_encode(0);
}

?>