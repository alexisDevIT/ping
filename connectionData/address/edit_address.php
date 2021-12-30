<?php

include_once('../config_sql.php');
$id = isset($_POST['id']) ? $_POST['id'] : '';
$name = isset($_POST['name']) ? $_POST['name'] : '';
$address = isset($_POST['address']) ? $_POST['address'] : '';
$type = isset($_POST['type']) ? $_POST['type'] : '';
$date = date('Y-m-d G:i:s');

if( $_FILES['conf_file']['name'] != '' )
{
    $fName = $_FILES['conf_file']['name'];
    $fPath = $_FILES['conf_file']['tmp_name'];
    if( move_uploaded_file( $fPath, '../../dist/conf_files/' . $_FILES['conf_file']['name'] ) )
    {
        $QUERY = "UPDATE addresses SET name = '$name', address = '$address', type = '$type', conf_file = '$fName' WHERE id = $id ";
        $REQUEST = mysqli_query($SQL,$QUERY);
        if( $REQUEST == true ){
            echo json_encode('OK');
        }else{
            echo json_encode('ER');
        }
    }
    else
    {
        echo json_encode('ER');
    }
}
else
{
    $QUERY = "UPDATE addresses SET name = '$name', address = '$address', type = '$type' WHERE id = $id ";
    $REQUEST = mysqli_query($SQL,$QUERY);
    if( $REQUEST == true ){
        echo json_encode('OK');
    }else{
        echo json_encode('ER');
    }
}

?>