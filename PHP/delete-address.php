<?php

    include_once('sql.php');

    $id = isset($_GET['id']) ? $_GET['id'] : 0;

    $querySQL = " DELETE FROM addresses WHERE id = $id ";
    $runSQL = mysqli_query($conexion, $querySQL);

    if ($runSQL) { echo json_encode('OK'); } 

    else { echo json_encode('ER'); }


?>