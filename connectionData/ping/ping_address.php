<?php 

include_once('../config_sql.php');
$address = json_decode( file_get_contents('php://input'), true );
$ip = isset($address['address']) ? $address['address'] : '';
$tipo = isset($address['type']) ? $address['type'] : '';

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
            }
            else if($tipo == 'Normal')
            {
                $fecha_ping = date('Y-m-d:h:m:s');
                $UPDATE = " UPDATE addresses SET status = 4, ultimo_ping = '$fecha_ping' WHERE address = '$ip' ";
                $QUERY = mysqli_query($SQL, $UPDATE);
            }
        }
        else if($data === '50%')
        {
            if($tipo == 'Scan')
            {
                $fecha_ping = date('Y-m-d:h:m:s');
                $UPDATE = " UPDATE addresses SET status = 2, ultimo_ping = '$fecha_ping' WHERE address = '$ip' ";
                $QUERY = mysqli_query($SQL, $UPDATE);
            }
            else if($tipo == 'Normal')
            {
                echo json_encode('Ping estable');
                $fecha_ping = date('Y-m-d:h:m:s');
                $UPDATE = " UPDATE addresses SET status = 3, ultimo_ping = '$fecha_ping' WHERE address = '$ip' ";
                $QUERY = mysqli_query($SQL, $UPDATE);
            }            
        }
        else if( $data !== '50%' || $data !== '0%' )
        {
            if($tipo == 'Scan')
            {
                $fecha_ping = date('Y-m-d:h:m:s');
                $UPDATE = " UPDATE addresses SET status = 4, ultimo_ping = '$fecha_ping' WHERE address = '$ip' ";
                $QUERY = mysqli_query($SQL, $UPDATE);
            }
            else if($tipo == 'Normal')
            {
                $fecha_ping = date('Y-m-d:h:m:s');
                $UPDATE = " UPDATE addresses SET status = 2, ultimo_ping = '$fecha_ping' WHERE address = '$ip' ";
                $QUERY = mysqli_query($SQL, $UPDATE);
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

?>