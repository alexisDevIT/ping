<?php

include_once('../config_sql.php');
$id = isset($_GET['id']) ? $_GET['id'] : '';
$QUERY = "UPDATE addresses SET status = 4 WHERE id = $id ";
$REQUEST = mysqli_query($SQL,$QUERY);
if( $REQUEST == true ){
    echo json_encode('OK');
}else{
    echo json_encode('ER');
}
?>