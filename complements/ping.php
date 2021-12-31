<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ping</title>
    <link rel="shortcut icon" href="../dist/images/isis0.png" type="image/x-icon">
    <link rel="stylesheet" href="../dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="../dist/css/fonts/font.css">
    <link rel="stylesheet" href="../dist/css/offcanvas.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">
    <!-- <meta http-equiv="refresh" content="20"> -->
    
    <!-- Sweet Alert -->
    <script src = " https://unpkg.com/sweetalert/dist/sweetalert.min.js "></script>
    <style>

        * {
        scrollbar-width: thin;
        scrollbar-color: #6610f2  white;
        }

        .text-gray{
            color: #607D8B;
        }
        .bg-gray{
            background: #607D8B;
        }

        .ocultar{
            display: none;
        }

        .bg-dansucc{
            background: linear-gradient(-150deg,#B22222,#CD5C5C);
        }

        #contentWish {
            max-height: 300px;
            min-height: 300px;
            overflow:auto;
            box-sizing: border-box;
        }

        /* Estilos para motores Webkit y blink (Chrome, Safari, Opera... )*/

        #contentWish::-webkit-scrollbar {
            -webkit-appearance: none;
        }

        #contentWish::-webkit-scrollbar:vertical {
            width:10px;
        }

        #contentWish::-webkit-scrollbar-button:increment,#contentWish::-webkit-scrollbar-button {
            display: none;
        } 

        #contentWish::-webkit-scrollbar:horizontal {
            height: 10px;
        }

        #contentWish::-webkit-scrollbar-thumb {
            background-color: #797979;
            border-radius: 20px;
            border: 2px solid #f1f2f3;
        }

        #contentWish::-webkit-scrollbar-track {
            border-radius: 10px;  
        }

        

    </style>
    
</head>
<body>

<header class="p-3 bg-dark text-white fixed-top">
    <div class="container-fluid">

        <div class="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-start">

            <a href="../" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                <h5 class="poppins-bold">
                    <i class="bi bi-cone-striped me-1"></i>
                    Aplicacion Ping
                </h5>
            </a>

            <ul class="nav col-12 col-lg-auto ms-lg-auto mb-2 justify-content-center mb-md-0">  
                <li>
                    <a href="paused_address.php" class="nav-link px-2 text-white font2" title="Enliste las direcciones que ha pausado...">
                        <i class="bi bi-play-circle"></i> Pausadas
                    </a>
                </li>                
                <li>
                    <a href="reset_address.php" class="nav-link px-2 text-white font2" title="Enliste los equipos que se han reseteado...">
                        <i class="bi bi-arrow-clockwise me-1"></i>Reset
                    </a>
                </li>
                <li>
                    <a href="ping.php" class="nav-link px-2 text-white font2" title="Ejecute un ping a cualquier ip...">
                        <i class="bi bi-shuffle me-1"></i>Ping
                    </a>
                </li>
                <li>
                    <a href="#" class="nav-link px-2 text-white font2"  title="Agregue una nueva direccion..." data-bs-toggle="modal" data-bs-target="#modalAdd" data-bs-whatever="@mdo">
                        <i class="bi bi-plus-circle me-1"></i>Agregar
                    </a>
                </li>
            </ul>

        </div>

    </div>
</header>
<div class="container pt-5 mt-5">
    
    <h2 class="raleway-bold">Ejecutar Ping</h2>

    <div class="d-flex mt-5">

        <div class="content1">

            <div class="content me-2">
                <h5 class="mt-4 poppins-bold">Dirección IPv4:</h5>
                <select name="address" id="address" class="form-select poppins"><option value="0">-- Seleccione --</option></select>
            </div>

            <div class="content me-2">
                <h5 class="mt-5 poppins-bold">Paquetes:</h5>
                <input type="text" name="packages" id="packages" class="form-control poppins" placeholder="No > 50">
            </div>

            <div class="content me-2">
                <button class="w-50 btn btn-outline-success poppins-bold execute my-3"><i class="bi bi-play-fill me-1"></i>Ejecutar</button>
            </div>

        </div>
        
        <div class="rounded mt-3 ms-5 w-100 text-light" >
            <h5 class="mt-1 poppins-bold text-light border-bottom bg-dark p-2">Resultados</h5>
            <div id="contentWish" class="border p-2 m-0">
                <code class="content-ping " id="contentWish"></code>
            </div>
        </div>

    </div>

</div>

</body>
</html>
<script src="../dist/js/bootstrap.bundle.min.js"></script>
<script src="../dist/js/addresses.js"></script>