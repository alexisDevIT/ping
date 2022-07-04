<?php

  header('Content-Type: application/json');
  if (file_exists('../pausedAddress.json')) {
    if (unlink('../pausedAddress.json')) {
      $data = json_decode(file_get_contents('php://input'), true);
      $array = json_encode($data);
      if (file_put_contents('../pausedAddress.json', $array)) {
        echo json_encode('OK');
      } else { echo json_encode('ER'); }
    } else { echo json_encode('ER'); }    
  } else {
    $data = json_decode(file_get_contents('php://input'), true);
    $array = json_encode($data);
    if (file_put_contents('../pausedAddress.json', $array)) {
      echo json_encode('OK');
    } else { echo json_encode('ER'); }
  }
  /* 
  if (file_get_contents('../addresses.json'))
   */

?>