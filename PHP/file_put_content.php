<?php

  header('Content-Type: application/json');
  if (file_exists('../addresses.json')) {
    if (unlink('../addresses.json')) {
      $data = json_decode(file_get_contents('php://input'), true);
      $array = json_encode($data);
      if (file_put_contents('../addresses.json', $array)) {
        echo json_encode('OK');
      } else { echo json_encode('ER'); }
    } else { echo json_encode('ER'); }    
  } else {
    $data = json_decode(file_get_contents('php://input'), true);
    $array = json_encode($data);
    if (file_put_contents('../addresses.json', $array)) {
      echo json_encode('OK');
    } else { echo json_encode('ER'); }
  }
  /* 
  if (file_get_contents('../addresses.json'))
   */

?>