<?php

  include_once('sql.php');

  // 0 => Ping incorrecto
  // 1 => Ping correcto
  // 2 => Ping pausado

  $order = isset($_GET['order']) ? $_GET['order'] : 0;

  if ( $order == 0 ) {
    $querySQL = " SELECT * FROM addresses WHERE status !=  2 ORDER BY status ASC";
  }

  if ( $order == 1 ) {
    $querySQL = " SELECT * FROM addresses WHERE status !=  2 ORDER BY status DESC";
  }

  
  $runSQL = mysqli_query( $conexion, $querySQL );

  if ( $runSQL->num_rows ) {

    while ( $rows = mysqli_fetch_assoc( $runSQL ) ) {

      $addresses[] = $rows;

    }

    echo json_encode ( $addresses );

  } else {

    echo json_encode ( 0 );

  }

?>