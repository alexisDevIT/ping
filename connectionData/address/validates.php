<?php

include_once('../config_sql.php');

$address = isset($_POST['address']) ? $_POST['address'] : '';
$name = isset($_POST['name']) ? $_POST['name'] : '';

$QUERY = " SELECT * FROM addresses WHERE address = '$address' OR name = '$name' ";
$REQUEST = mysqli_query($SQL,$QUERY);
if( $REQUEST->num_rows ){                    
    echo json_encode('ER');
}
else
{
    echo json_encode('OK');
}

?>