<?php

include_once('../config_sql.php');
$id = isset($_GET['id']) ? $_GET['id'] : '';
$fecha_ping = date('Y-m-d:h:m:s');
$UPDATE = " SELECT * FROM addresses WHERE id = '$id' ";
$QUERY = mysqli_query($SQL, $UPDATE);
if($QUERY == TRUE)
{
    while($ROWS = mysqli_fetch_array($QUERY))
    {
        $ARRAY[] = $ROWS;
    }
    echo json_encode($ARRAY);
}
else
{
    echo json_encode(0);
}

?>