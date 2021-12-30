<?php 

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'ping');

date_default_timezone_set("America/Mexico_city");
                    
$date = date("Y-m-d H:i:s");

$SQL = mysqli_connect(DB_HOST,DB_USER,DB_PASS,DB_NAME);

if( $SQL ){

    //NO HACER NADA MAS 

}else{

    echo "Error de conexion";

}


?>