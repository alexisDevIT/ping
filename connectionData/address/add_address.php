<?php

include_once('../config_sql.php');
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
        $QUERY = "INSERT INTO addresses(name, address, type, conf_file, alternate, date, status) VALUES ('$name', '$address', '$type', '$fName', 1, '$date', 3 )";
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
    $QUERY = "INSERT INTO addresses(name, address, type, conf_file, alternate, date, status) VALUES ('$name', '$address', '$type', '', 1, '$date', 3 )";
    $REQUEST = mysqli_query($SQL,$QUERY);
    if( $REQUEST == true ){
        echo json_encode('OK');
    }else{
        echo json_encode('ER');
    }
}

?>