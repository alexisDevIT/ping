<?php
$ip = isset($_GET['address']) ? $_GET['address'] : '';
if($ip == 0){
    echo json_encode('IPv4 incorrecta...');
}
else{
    exec("ping -n 2 -w 10 $ip", $output, $status);
    //echo var_dump($output[6]);
    echo json_encode($output[6]);
    //echo json_encode($output[2] . ' => ' . $output[7] . ' => ' . $output[9]);
}

?>