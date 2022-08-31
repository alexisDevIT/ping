<?php

include('sql.php');

$id = isset($_GET['id']) ? $_GET['id'] : 0;
$status = isset($_GET['status']) ? $_GET['status'] : 0;
$date = date('Y-m-d:h:m:s');

if ($status == 0) {
    $querySQL = " UPDATE addresses SET status = 0 WHERE id = '$id' ";
}

if ($status == 1) {
    $querySQL = " UPDATE addresses SET status = 1, ultimo_ping = '$date' WHERE id = '$id' ";
}

if ($status == 2) {
    $querySQL = " UPDATE addresses SET status = 2 WHERE id = '$id' ";
}

$runSQL = mysqli_query( $conexion, $querySQL );
if ( $runSQL ) {
    echo json_encode('OK');
} else {
    echo json_encode(0);
}

?>