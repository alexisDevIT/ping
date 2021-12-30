<?php

include_once('../config_sql.php');
$id = isset($_GET['id']) ? $_GET['id'] : '';
$QUERY = "DELETE FROM addresses WHERE id = $id ";
$REQUEST = mysqli_query($SQL,$QUERY);
if( $REQUEST == true ){
    echo json_encode('OK');
}else{
    echo json_encode('ER');
}
?>