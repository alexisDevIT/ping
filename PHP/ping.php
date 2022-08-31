<?php

  $ip = isset($_GET['address']) ? $_GET['address'] : '';
  $server = isset($_GET['server']) ? $_GET['server'] : 'windows';

  if ( !$ip ) {

    echo json_encode('IPv4 incorrecta...');

  } else {

      if ( $server == 'windows' ) {

        if ( exec( "ping $ip -n 2" , $output, $status ) ) {

          echo json_encode($output[7]);

        } else { 

          echo json_encode(0);

        }

      }

      if ($server == 'linux') {
        
        if ( exec("ping $ip -c 2 -W 10", $output, $status) ) {

            echo json_encode($output[5]);

        } else { 

            echo json_encode(0);

        }

      }
    
      //echo json_encode($output[2] . ' => ' . $output[7] . ' => ' . $output[9]);
  }

// Linux "ping $ip -c 2 -W 10", $output, $status)
// Windows " ping -n 2  192.168.16.220"





/*$ip = isset($_GET['address']) ? $_GET['address'] : '';
if($ip == 0){
    echo json_encode('IPv4 incorrecta...');
}
else{
    exec("ping $ip -c 2 -W 10", $output, $status);
    echo json_encode($output[5]);
    //echo json_encode($output[2] . ' => ' . $output[7] . ' => ' . $output[9]);
}*/

?>