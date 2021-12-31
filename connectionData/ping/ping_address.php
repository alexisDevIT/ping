<?php 

include_once('../config_sql.php');
$address = json_decode( file_get_contents('php://input'), true );
$ip = isset($address['address']) ? $address['address'] : '';
$name = isset($address['name']) ? $address['name'] : '';
$tipo = isset($address['type']) ? $address['type'] : '';
/** Ping linux **/
// exec("ping $ip -c 2 -W 10", $output, $status);
if($ip)
{
    if(exec("ping -n 2 -w 10 $ip", $output, $status))
    {
        //$data = intval(substr($output[7],40, -14));
        $data = substr($output[7],5,-11);
        if($data === '0%')
        {
            if($tipo == 'Scan')
            {
                $fecha_ping = date('Y-m-d:h:m:s');
                $UPDATE = " UPDATE addresses SET status = 2, ultimo_ping = '$fecha_ping' WHERE address = '$ip' ";
                $QUERY = mysqli_query($SQL, $UPDATE);
                echo json_encode('Reset');                
            }
            else if($tipo == 'Normal')
            {
                $fecha_ping = date('Y-m-d:h:m:s');
                $UPDATE = " UPDATE addresses SET status = 4, ultimo_ping = '$fecha_ping' WHERE address = '$ip' ";
                $QUERY = mysqli_query($SQL, $UPDATE);
                echo json_encode('Correcto'); 
            }
        }
        else if($data === '50%')
        {
            if($tipo == 'Scan')
            {
                $fecha_ping = date('Y-m-d:h:m:s');
                $UPDATE = " UPDATE addresses SET status = 2, ultimo_ping = '$fecha_ping' WHERE address = '$ip' ";
                $QUERY = mysqli_query($SQL, $UPDATE);
                echo json_encode('Reset');
            }
            else if($tipo == 'Normal')
            {
                echo json_encode('Ping estable');
                $fecha_ping = date('Y-m-d:h:m:s');
                $UPDATE = " UPDATE addresses SET status = 3, ultimo_ping = '$fecha_ping' WHERE address = '$ip' ";
                $QUERY = mysqli_query($SQL, $UPDATE);
                echo json_encode('Estable');
            }            
        }
        else if( $data !== '50%' || $data !== '0%' )
        {
            if($tipo == 'Scan')
            {
                $fecha_ping = date('Y-m-d:h:m:s');
                $UPDATE = " UPDATE addresses SET status = 4, ultimo_ping = '$fecha_ping' WHERE address = '$ip' ";
                $QUERY = mysqli_query($SQL, $UPDATE);
                echo json_encode('No reset');
            }
            else if($tipo == 'Normal')
            {
                $fecha_ping = date('Y-m-d:h:m:s');
                $UPDATE = " UPDATE addresses SET status = 2, ultimo_ping = '$fecha_ping' WHERE address = '$ip' ";
                $QUERY = mysqli_query($SQL, $UPDATE);
                echo json_encode('Incorrecto');
            }
        }
    }
    else
    {
        $fecha_ping = date('Y-m-d:h:m:s');
        $UPDATE = " UPDATE addresses SET status = 2, ultimo_ping = '$fecha_ping' WHERE address = '$ip' ";
        $QUERY = mysqli_query($SQL, $UPDATE);
    }
}
else
{
    echo json_encode('ERROR');
}

// function telegram($ip,$name)
// {
//     ini_set('display_errors', 1);
//     ini_set('display_startup_errors', 1);
//     error_reporting(E_ALL);

//     $token = '1813492292:AAF5I0mXPrrYlyVw0iKWF5ZttuA9eLLQBxs';

//     date_default_timezone_set("America/Mexico_city");

//     $chats = array(
//         0 => '1730246506'//'784539869'//,
//         //1 => '1730246506'
//     );

//     for( $i = 0; $i < count($chats); $i++ )
//     {
//         // $ip = $_GET['ip'];
//         // $name = $_GET['name'];
//         $datos = 
//         [   'chat_id' => $chats[$i],
//             'text' => $name .': '. $ip . ' ' $msj,
//             'parse_mode' => 'html'
//         ];
//         $ch = curl_init();
//         curl_setopt($ch, CURLOPT_URL, "https://api.telegram.org/bot" . $token . "/sendMessage");
//         curl_setopt($ch, CURLOPT_HEADER, false);
//         curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//         curl_setopt($ch, CURLOPT_POST, TRUE);
//         curl_setopt($ch, CURLOPT_POSTFIELDS, $datos);
//         curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
//         curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//         $r_array = json_decode(curl_exec($ch), true);
//         curl_close($ch);    
//     }

// }

?>