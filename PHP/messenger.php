<?php
$ip = isset($_GET['address']) ? $_GET['address'] : '';
$name = isset($_GET['name']) ? $_GET['name'] : '';

// Send Telegram //
telegram($ip,$name);

function telegram($ip,$name)
{
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    $token = '1813492292:AAF5I0mXPrrYlyVw0iKWF5ZttuA9eLLQBxs';

    date_default_timezone_set("America/Mexico_city");

    $chats = array(
        0 => '784539869'//'784539869'//,
        //1 => '1730246506'
    );

    for( $i = 0; $i < count($chats); $i++ )
    {
        // $ip = $_GET['ip'];
        // $name = $_GET['name'];
        $datos = 
        [   'chat_id' => $chats[$i],
            'text' => $name .': '. $ip,
            'parse_mode' => 'html'
        ];
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://api.telegram.org/bot" . $token . "/sendMessage");
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $datos);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $r_array = json_decode(curl_exec($ch), true);
        curl_close($ch);    
    }

 }


?>
