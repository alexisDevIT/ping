<?php

include_once('../config_sql.php');

$QUERY = " SELECT id,name,address,type,conf_file,ultimo_ping,status FROM addresses WHERE status != 1 ORDER BY status ASC ";
$REQUEST = mysqli_query($SQL,$QUERY);
if($REQUEST->num_rows)
{
    while($ROWS = mysqli_fetch_array($REQUEST))
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