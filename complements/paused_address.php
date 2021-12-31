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
                <li><a href="paused_address.php" class="nav-link px-2 text-white font2" title="Enliste las direcciones que ha pausado..."><i class="bi bi-play-circle"></i> Pausadas</a></li>                
                <li><a href="reset_address.php" class="nav-link px-2 text-white font2" title="Enliste los equipos que se han reseteado..."><i class="bi bi-arrow-clockwise me-1"></i>Reset</a></li>
                <li><a href="ping.php" class="nav-link px-2 text-white font2" title="Ejecute un ping a cualquier ip..."><i class="bi bi-shuffle me-1"></i>Ping</a></li>
                <li><a href="#" class="nav-link px-2 text-white font2"  title="Agregue una nueva direccion..." data-bs-toggle="modal" data-bs-target="#modalAdd" data-bs-whatever="@mdo"><i class="bi bi-plus-circle me-1"></i>Agregar</a></li>
            </ul>
        </div>
    </div>
</header>

<div class="container-fluid my-5 pt-5">    
    <form id="searchIP" class="mt-5">
        <div class="container-fluid input-group">
            <input type="search" name="busqueda" id="busqueda" class="form-control rounded-0 poppins-semibold" placeholder="Ingrese el nombre o la IPv4">
            <button type="submit" class="btn btn-primary"><i class="bi bi-search"></i></button>
        </div>
        <div class="ps-3 d-flex align-items-center justify-content-between"><i class="text-danger cerrar bi" role="button"></i><strong class="statuSearch poppins-bold small p-3"></strong></div>
    </form>
    <div class="table-responsive">           
        <div class="container-fluid mt-5">
            <table class="table align-middle table-hover" role="button" id="table">
                <thead class="table-dark">
                <tr class="">
                    <th class="poppins-bold">Nombre</th>
                    <th class="poppins-bold">IPv4</th>
                    <th class="poppins-bold">Tipo</th>
                    <th class="poppins-bold">Respaldo</th>
                    <th class="poppins-bold"></th>
                </tr>
                </thead>
                <tbody id="itemsResultados">
                    <!-- MOSTRAR TODAS LAS IP SEGUN CORRESPONDAN -->                    
                </tbody>
                <tbody id="itemSearch" style="display:none;">
                    <!-- MOSTRAR TODAS LAS IP SEGUN CORRESPONDAN -->                    
                </tbody>
                <template id="templateResultados">
                    <tr>
                        <td class="poppins-semibold name"></td>
                        <td class="poppins-semibold"><a class="address p-0 m-0" target="_blank"></a><br> <small class="ultimate_ping"></small></td>
                        <td class="poppins-semibold type">Tipo</td>
                        <td class="poppins-semibold"><a class="bi bi-file-earmark-arrow-up text-light conf_file ps-2" target="_blank" style="font-size:15px;"></a></td>
                        <td class="poppins-semibold">
                            <div class="btn-group">
                                <button class="my-1 btn text-light bi bi-pencil-square" title="Editar información..."></button>
                                <button class="my-1 btn text-light bi bi-play-fill" title="Pausar ping..."></button>
                                <button class="my-1 btn text-light bi bi-trash" title="Eliminar dirección ip..."></button>
                            </div>
                        </td>
                    </tr>
                </template>
                <template id="templateSearch">
                    <tr>
                        <td class="poppins-semibold name"></td>
                        <td class="poppins-semibold"><a class="address p-0 m-0" target="_blank"></a><br> <small class="ultimate_ping"></small></td>
                        <td class="poppins-semibold type">Tipo</td>
                        <td class="poppins-semibold"><a class="bi bi-file-earmark-arrow-up text-light conf_file ps-2" target="_blank" style="font-size:15px;"></a></td>
                        <td class="poppins-semibold">
                            <div class="btn-group">
                                <button class="my-1 btn text-light bi bi-pencil-square" title="Editar información..."></button>
                                <button class="my-1 btn text-light bi bi-play-fill" title="Volver a ping..."></button>
                                <button class="my-1 btn text-light bi bi-trash" title="Eliminar dirección ip..."></button>
                            </div>
                        </td>
                    </tr>
                </template>
            </table>
        </div>            
    </div>
</div>


<!-- Modal add ip -->
<div class="modal fade" id="modalAdd" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <form class="modal-content" id="add_ip" enctype="multipart/form-data">
        <div class="modal-header">
            <h5 class="modal-title text-success h4 poppins-bold" id="exampleModalLabel">Nueva dirección IPv4</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="container-fluid pt-0">
                <div class="row">                  
                    <div class="col-md-12 col-12 my-2">
                        <strong for="name" class="text-muted small font-weight-bold poppins-bold">NOMBRE:</strong>
                        <input  required="" type="text" name="name" id="name" class="form-control rounded-0 p-2 poppins" placeholder="Estación AP">                        
                    </div>
                    <div class="col-md-12 col-12 my-2">
                    <strong for="name" class="text-muted small font-weight-bold poppins-bold">DIRECCION IP:</strong>
                        <input  required="" type="text" name="address" id="address" class="form-control rounded-0 poppins" placeholder="0.0.0.0">
                    </div>
                    <div class="col-md-12 col-12 my-2">
                        <strong for="name" class="text-muted small font-weight-bold poppins-bold">TIPO:</strong>
                        <select name="type" id="type" class="form-select p-2 poppins rounded-0" required="">
                            <option value="0">--Seleccione--</option>
                            <option value="Normal">Normal</option>
                            <option value="Scan">Reset</option>
                        </select>
                    </div>
                    <div class="col-md-12 col-12 my-2">
                        <strong for="name" class="text-muted small font-weight-bold poppins-bold">CONFIGURACION:</strong><br>
                        <input type="file" name="conf_file" id="config" class="form-control rounded-0 poppins">
                    </div>
                    <div class="col-md-12 col-12 my-2 msjStatus" style="display:none;">
                        <div class="d-flex align-items-center my-2">
                            <strong class="textStatus poppins-semibold">Cargando...</strong>
                            <div class="bi spinner-border ms-auto" role="status" aria-hidden="true"></div>
                        </div>
                    </div>
                    <div class="col-md-12 col-12 my-2 msjSuccess" style="display:none;">
                        <div class="d-flex align-items-center text-success">
                            <i class="bi bi-check-circle me-2 h4"></i>
                            <strong class="poppins-bold textSuccess">Datos cargados correctamente</strong>
                        </div>
                    </div>
                    <div class="col-md-12 col-12 my-2 msjError" style="display:none;">
                        <div class="d-flex align-items-center text-danger">
                            <i class="bi bi-check-circle me-2 h4"></i>
                            <strong class="poppins-bold textError">Ya existe esta información</strong>
                        </div>
                    </div>                   
                </div>                   
            </div>
        </div>
        <div class="modal-footer">
            <button type="submit" class="btn btn-primary poppins-semibold">
                <i class="fa fa-save"></i> Guardar
            </button>
        </div>
    </form>
  </div>
</div>

<div class="modal fade" id="modalEdit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <form class="modal-content" id="edit_ip" enctype="multipart/form-data">
        <div class="modal-header">
            <h5 class="modal-title-edit text-success h4 poppins-bold" id="exampleModalLabel">Nueva dirección IPv4</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="container-fluid pt-0">
                <div class="row">                  
                    <div class="col-md-12 col-12 my-2">
                        <strong for="name" class="text-muted small font-weight-bold poppins-bold">NOMBRE:</strong>
                        <input type="hidden" name="id" id="id">
                        <input  required="" type="text" name="name" id="name" class="form-control rounded-0 p-2 poppins" placeholder="Estación AP">                        
                    </div>
                    <div class="col-md-12 col-12 my-2">
                    <strong for="name" class="text-muted small font-weight-bold poppins-bold">DIRECCION IP:</strong>
                        <input  required="" type="text" name="address" id="address" class="form-control rounded-0 poppins" placeholder="0.0.0.0">
                    </div>
                    <div class="col-md-12 col-12 my-2">
                        <strong for="name" class="text-muted small font-weight-bold poppins-bold">TIPO:</strong>
                        <select name="type" id="type" class="form-select p-2 poppins rounded-0" required="">
                            <option value="0">--Seleccione--</option>
                            <option value="Normal">Normal</option>
                            <option value="Scan">Reset</option>
                        </select>
                    </div>
                    <div class="col-md-12 col-12 my-2">
                        <strong for="name" class="text-muted small font-weight-bold poppins-bold">CONFIGURACION:</strong><br>
                        <input type="file" name="conf_file" id="config" class="form-control rounded-0 poppins">
                    </div>
                    <div class="col-md-12 col-12 my-2 msjStatus" style="display:none;">
                        <div class="d-flex align-items-center my-2">
                            <strong class="textStatus poppins-semibold">Cargando...</strong>
                            <div class="bi spinner-border ms-auto" role="status" aria-hidden="true"></div>
                        </div>
                    </div>
                    <div class="col-md-12 col-12 my-2 msjSuccess" style="display:none;">
                        <div class="d-flex align-items-center text-success">
                            <i class="bi bi-check-circle me-2 h4"></i>
                            <strong class="poppins-bold textSuccess">Datos editados correctamente</strong>
                        </div>
                    </div>
                    <div class="col-md-12 col-12 my-2 msjError" style="display:none;">
                        <div class="d-flex align-items-center text-danger">
                            <i class="bi bi-check-circle me-2 h4"></i>
                            <strong class="poppins-bold textError">Ya existe esta información</strong>
                        </div>
                    </div>                   
                </div>                   
            </div>
        </div>
        <div class="modal-footer">
            <button type="submit" class="btn btn-primary poppins-semibold">
                <i class="fa fa-save"></i> Guardar
            </button>
        </div>
    </form>
  </div>
</div>

</body>
</html>
<script src="../dist/js/bootstrap.bundle.min.js"></script>
<script src="../dist/js/paused_address.js"></script>