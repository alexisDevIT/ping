<?php
$ip = isset($_GET['address']) ? $_GET['address'] : '';
if($ip == 0){
    echo json_encode('IPv4 incorrecta...');
}
else{
    exec("ping $ip -c 2 -W 10", $output, $status);
    echo json_encode($output[5]);
    //echo json_encode($output[2] . ' => ' . $output[7] . ' => ' . $output[9]);
}