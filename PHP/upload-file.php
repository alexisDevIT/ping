<?php

if ($_POST) {
  if ($_FILES) {

    $ruta = '../assets/respaldos/';
    $accept = array("application/pdf", "text/plain", "text/html", "application/xml","image/png","image/jpg","image/jpeg","image/gif");

    if (in_array($_FILES['configuration']['type'],$accept)) {
      echo json_encode(0);
    } else {
      if (file_exists($ruta . $_FILES['configuration']['name'])) {
        echo json_encode('OK');
      } else {
        if (move_uploaded_file($_FILES['configuration']['tmp_name'], $ruta . $_POST['address'] . '-' . $_FILES['configuration']['name'])) {
            echo json_encode('OK');
        } else {
            echo json_encode(1);
        }
      }
    }
  }
}

?>