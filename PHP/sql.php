<?php

  $conexion=mysqli_connect("localhost", "root", "") or die("Error!, El servicio no se pudo conectar al servidor.");
	$db=mysqli_select_db($conexion, "ping") or die ("Error!, No se pudo encontrar la Base de Datos que corresponde a la solicitud.");
	mysqli_query($conexion, "SET NAMES UTF8");

	date_default_timezone_set("America/Mexico_city");

	//declare data variables
	$curDate = date('Y-m-d');
	$curFullDate = date('Y-m-d G:i:s');

?>