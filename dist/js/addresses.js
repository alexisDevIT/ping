document.addEventListener('DOMContentLoaded', () => {
    // address()
    console.log('Cargando datos')

    //addressReset()
    addIP()
    pingIP()
    searchIP()
    address()        
    setInterval(address,60000);
    

    //DESPUES DE CARGAR TODAS LLAS IP EJECUTAR EL PING
    // ping()
    // setInterval(ping,30000);
    // //PING SCAN
    // setInterval(pingScan, 10000)

})

function address(){

    fetch( 'queries/addresses.php?method=address',{
            method: 'GET'
    })
    .then( response => response.json())
    .then( response_data => {

        if( response_data === 'ER' ){

            document.getElementById('table').innerHTML = `<div class="bg-danger text-secondary px-4 py-5 text-center">
                <div class="py-5"><h1 class="text-center text-light"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-emoji-dizzy" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M9.146 5.146a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 1 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 0-.708zm-5 0a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 1 1 .708.708l-.647.646.647.646a.5.5 0 1 1-.708.708L5.5 7.207l-.646.647a.5.5 0 1 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 0-.708zM10 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/></svg></h1><h1 class="display-5 fw-bold text-white">Error de servidor de base de datos </h1><div class="col-lg-6 mx-auto"><p class="fs-5 mb-4 text-light">Posiblemente estemos teniendo complicciones para mostrar los datos que desea, porfavor intente màs tarde y si el problema continùa comuniquese con su administrador de sistema. </p><div class="d-grid gap-2 d-sm-flex justify-content-sm-center"><a href="./" type="button" class="btn btn-primary btn-lg px-4 me-sm-3 fw-bold"><i class="fa fa-refresh" aria-hidden="true"></i> Recargar</a></div></div></div></div>`

        }else{

            document.getElementById('resultados').innerHTML = `${response_data}`;                
            //EJECUTAR LAS BUSQUEDAS
            //addressPaused()
            addressError()
            addressReset()
            //addresSuccess()                      
            pingScan()
            ping()

        }
        
    
    
    })

}

function getDatos(id){

    var idIP = parseInt(id);
    document.getElementById('exampleModalToggleLabel').textContent = `Cargando...`
    document.getElementById('datosIP').innerHTML = '';
    fetch('queries/addresses.php?method=details&id='+idIP,{
        method: 'GET'
    })

    .then( response => response.json())
    .then( response_data => {

        if( response_data !== 'CL' ){

            document.getElementById('exampleModalToggleLabel').textContent = `Editar datos`
            document.getElementById('datosIP').innerHTML = `${response_data}`;

        }else{
            
            document.getElementById('contentModal').textContent = `DATOS NO ENCONTRADOS PARA ESTA IP`

        }

        

    })

    //ENVIANDO LOS DATOS DEL FORMULARIO
    editDatos()

}

function deleteIP(id){

    var idIP = parseInt(id);
    if( confirm('Esta seguro de eliminar esta IPv4') ){

        fetch('queries/addresses.php?method=delete&id='+idIP,{
            method: 'GET'
        })
    
        .then( response => response.json())
        .then( response_data => {
    
            if( response_data === 'OK' ){
    
                if(alert('Se ah eliminado la IP')){
                    address()
                }
    
            }else if( response_data === 'ER'){
                
                alert('No se pudo completar la operación...')
    
            }
    
            
    
        })

    }
    

    //ENVIANDO LOS DATOS DEL FORMULARIO
    editDatos()

}

function editDatos(){

    //CARGAR LA FUNCION DE ENVIAR DATOS
    var editDatos = document.getElementById('editDatos');

    editDatos.addEventListener('submit', (e)=>{

        e.preventDefault()

        //CAMBIAR A CARGANDO EL BOTTOM DEL FORMULARIO
        document.getElementById('sendButton').innerHTML = `<button class="btn btn-primary" disabled><span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Cargando... </button>`

        console.log('Enviando datos...')
        
        var formData = new FormData(editDatos)
        //console.log(formData.get('name'))            

        fetch( 'queries/addresses.php?method=editAddress', {
            method: 'POST',
            body: formData
        })

        .then( response => response.json())
        .then( data_response => {

            console.log(data_response)

            if( data_response === 'OK' ){
                //MOSTRAR EL BOTON NORMAL
                sendButton.innerHTML = `<button type="submit" class="btn btn-outline-primary poppins-semibold"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save" viewBox="0 0 16 16"><path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/></svg> Guardar </button>`

                document.getElementById('messageEdit').innerHTML = `<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                <div id="liveToast" class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-header"><svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#43A047"></rect></svg><strong class="me-auto"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Realizado</font></font></strong><small><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Excelente</font></font></small><button type="button" id="btn-close" class="btn-close" data-bs-dismiss="toast" aria-label="Cerrar"></button></div><div class="toast-body text-success poppins"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">¡Datos guardados correctamente! </font><font style="vertical-align: inherit;">Puedes ver tus datos en la tabla.</font></font></div></div>
                </div>`

            }else if( data_response === 'ER' ){

                sendButton.innerHTML = `<button type="submit" class="btn btn-outline-primary poppins-semibold"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save" viewBox="0 0 16 16"><path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/></svg> Guardar</button>`

                document.getElementById('messageEdit').innerHTML = `<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                <div id="liveToast" class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-header"><svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#C62828"></rect></svg><strong class="me-auto"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">¡Oh no!</font></font></strong><small><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">No realizado</font></font></small><button type="button" id="btn-close" class="btn-close" data-bs-dismiss="toast" aria-label="Cerrar" onclick="document.getElementById('messageEdit').innerHTML=''></button></div><div class="toast-body"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">¡Error de servidor! </font><font style="vertical-align: inherit;">Ocurrió un error interno.</font></font></div></div>
                </div>`

            }else if( data_response === 'REP' ){

                sendButton.innerHTML = `<button type="submit" class="btn btn-outline-primary poppins-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save" viewBox="0 0 16 16">
                    <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                    </svg>
                    Guardar
                </button>`

                document.getElementById('messageEdit').innerHTML = `<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                <div id="liveToast" class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-header"><svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#43A047"></rect></svg><strong class="me-auto"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">¡Sin cambios!</font></font></strong><small><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Excelente</font></font></small><button type="button" id="btn-close" class="btn-close" data-bs-dismiss="toast" aria-label="Cerrar"></button></div><div class="toast-body text-success poppins"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">¡No se detectaron cambios! </font><font style="vertical-align: inherit;">El archivo y/o los datos ya existen.</font></font></div></div>
                </div>`

            }else if( data_response === 'OKIMG' ){

                sendButton.innerHTML = `<button type="submit" class="btn btn-outline-primary poppins-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save" viewBox="0 0 16 16">
                    <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                    </svg>
                    Guardar
                </button>`

                document.getElementById('messageEdit').innerHTML = `<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                <div id="liveToast" class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-header"><svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#43A047"></rect></svg><strong class="me-auto"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">¡Chispas!</font></font></strong><small><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Datos a medias</font></font></small><button type="button" id="btn-close" class="btn-close" data-bs-dismiss="toast" aria-label="Cerrar"></button></div><div class="toast-body text-success poppins"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">¡Detectamos un error al subir el archivo! </font><font style="vertical-align: inherit;">Los datos fueron agregados pero la configuracion de respaldo no, puede intentarlo más tarde.</font></font></div></div>
                </div>`

            }

            var closeToast = document.getElementById('btn-close');
            closeToast.addEventListener('click', ()=>{
                messageEdit.innerHTML = '';
            })

        })


    })

}

function pausarIP(id){
    var idIP = parseInt(id);
    fetch( 'queries/addresses.php?method=pausarIP&id='+idIP,{
        method: 'GET'
    })
    .then( response => response.json())
    .then( response =>{

        if( response === 'OK' ){

            document.getElementById('messagePlay').innerHTML = `<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
            <div id="liveToast" class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-header"><svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#43A047"></rect></svg><strong class="me-auto"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Realizado</font></font></strong><small><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Excelente</font></font></small><button type="button" id="close-pause" class="btn-close" data-bs-dismiss="toast" aria-label="Cerrar"></button></div><div class="toast-body text-success poppins"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">¡Datos guardados correctamente! </font><font style="vertical-align: inherit;">Puedes ver tus datos en la tabla.</font></font></div></div>
            </div>`

        }else if( response == 'ER' ){

            document.getElementById('messagePlay').innerHTML = `<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
            <div id="liveToast" class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-header"><svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#43A047"></rect></svg><strong class="me-auto"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Realizado</font></font></strong><small><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Excelente</font></font></small><button type="button" id="close-pause" class="btn-close" data-bs-dismiss="toast" aria-label="Cerrar"></button></div><div class="toast-body text-success poppins"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">¡Datos guardados correctamente! </font><font style="vertical-align: inherit;">Puedes ver tus datos en la tabla.</font></font></div></div>
            </div>`               

        }

        var closeToast = document.getElementById('close-pause');
        closeToast.addEventListener('click', ()=>{
            document.getElementById('messagePlay').innerHTML = '';
            address()
        })

        
    })
}

function playIP(id){

    var idIP = parseInt(id);
    fetch( 'queries/addresses.php?method=playIP&id='+idIP,{
        method: 'GET'
    })
    .then( response => response.json())
    .then( response =>{
        if( response === 'OK' ){

            document.getElementById('messagePlay').innerHTML = `<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
            <div id="liveToast" class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-header"><svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#43A047"></rect></svg><strong class="me-auto"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Realizado</font></font></strong><small><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Excelente</font></font></small><button type="button" id="btnClose" class="btn-close" data-bs-dismiss="toast" aria-label="Cerrar"></button></div><div class="toast-body text-success poppins"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">¡Datos guardados correctamente! </font><font style="vertical-align: inherit;">Puedes ver tus datos en la tabla.</font></font></div></div>
            </div>`                                 

        }else if( response == 'ER' ){

            document.getElementById('messagePlay').innerHTML = `<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
            <div id="liveToast" class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-header"><svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#43A047"></rect></svg><strong class="me-auto"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Realizado</font></font></strong><small><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Excelente</font></font></small><button type="button" id="btnClose" class="btn-close" data-bs-dismiss="toast" aria-label="Cerrar"></button></div><div class="toast-body text-success poppins"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">¡Datos guardados correctamente! </font><font style="vertical-align: inherit;">Puedes ver tus datos en la tabla.</font></font></div></div>
            </div>`
        
        }

        var closeToast = document.getElementById('btnClose');
        closeToast.addEventListener('click', ()=>{
            document.getElementById('messagePlay').innerHTML = '';
            address()
        }) 

    })
}

function pingScan(){

    var scanIP = document.querySelectorAll('#Scan');
    for( var i = 0; i < scanIP.length; i++ ){
        //console.log(scanIP[i].textContent)
        fetch( 'queries/addresses.php?method=pingScan&address='+scanIP[i].textContent,{
            method: 'GET'
        })
    }

}

function searchIP(){

    var table = document.getElementById('table')
    var resultados = document.getElementById('resultados');        
    var tableB = document.getElementById('tableB')
    var resultadosB = document.getElementById('resultadosB');
    var searchIP = document.getElementById('searchIP');
    var busqueda = document.getElementById('busqueda');
    var btnSendB = document.getElementById('btnSendB');

    tableB.style.display = 'none';

    searchIP.addEventListener('submit', (e)=>{

        //MOSTRAR LOS RESULTADOS DE LA BUSQUEDA
        table.setAttribute('style', 'display:none');
        tableB.removeAttribute('style', 'display:none');

        btnSendB.innerHTML = `<button type="button" class="btn btn-secondary rounded-0 border border-secondary"><div class="spinner-border text-light spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div></button>`

        e.preventDefault();
        fetch('queries/addresses.php?method=search&address='+busqueda.value,{
            method: 'GET',
        })
        .then( response => response.json())
        .then( response_data => {

            if( response_data === 'ER' ){
                btnSendB.innerHTML = `<button type="button" class="btn btn-secondary rounded-0 border border-secondary cerrar"><i class="fa fa-times-circle" aria-hidden="true"></i></button>`
                var cerrar = document.querySelector('.cerrar');
                cerrar.addEventListener('click', ()=>{
                    //MOSTRAR LOS RESULTADOS DE LA BUSQUEDA
                    tableB.style.display = 'none'; 
                    table.removeAttribute('style', 'display:none');
                    tableB.innerHTML = `<table class="table align-middle" id="tableB"><thead class="table-dark"><tr><th class="poppins-bold">Nombre</th><th class="poppins-bold">IPv4</th><th class="poppins-bold">Tipo</th><th class="poppins-bold">Respaldo</th><th class="poppins-bold"></th></tr></thead><tbody id="resultadosB"></tbody></table>`                
                    btnSendB.innerHTML = `<button type="submit" class="btn btn-secondary rounded-0 border border-secondary"><i class="fa fa-search fa-1x" aria-hidden="true"></i></button>`
                })
            }else{
                
                btnSendB.innerHTML = `<button type="button" class="btn btn-secondary rounded-0 border border-secondary cerrar"><i class="fa fa-times-circle" aria-hidden="true"></i></button>`
                tableB.innerHTML += `${response_data}`

                var cerrar = document.querySelector('.cerrar');
                cerrar.addEventListener('click', ()=>{
                    //MOSTRAR LOS RESULTADOS DE LA BUSQUEDA
                    tableB.style.display = 'none'; 
                    table.removeAttribute('style', 'display:none');
                    tableB.innerHTML = `<table class="table align-middle" id="tableB"><thead class="table-dark"><tr><th class="poppins-bold">Nombre</th><th class="poppins-bold">IPv4</th><th class="poppins-bold">Tipo</th><th class="poppins-bold">Respaldo</th><th class="poppins-bold"></th></tr></thead><tbody id="resultadosB"></tbody></table>`                
                    btnSendB.innerHTML = `<button type="submit" class="btn btn-secondary rounded-0 border border-secondary"><i class="fa fa-search fa-1x" aria-hidden="true"></i></button>`
                })
            }
            
        })
    })

    // searchIP.addEventListener('submit', (e)=>{

    //     e.preventDefault();
    //     table.style.display = 'none';            

    //     btnSendB.innerHTML = `<div class="spinner-border text-light spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div>`

    //     fetch('queries/addresses.php?method=address&query=search&address='+busqueda.value,{
    //         method: 'GET',
    //     })

    //     .then( response => response.json())
    //     .then( response_data => {

    //         if( response_data === 'ER' ){
            
    //         }else{

    //             tableB.removeAttribute('style', 'display:none');
    //             resultadosB.innerHTML = `${response_data}`

    //             btnSendB.setAttribute('type', 'button');
    //             btnSendB.innerHTML = `<i class="fa fa-times-circle" aria-hidden="true"></i>`
                
    //             btnSendB.addEventListener('click', ()=>{
    //                 //MOSTRAR LOS RESULTADOS DE LA BUSQUEDA
    //                 tableB.style.display = 'none';
    //                 table.removeAttribute('style', 'display:none');                     
    //                 btnSendB.innerHTML = `<i class="fa fa-search" aria-hidden="true"></i>`
    //             })

    //         }
                
    //     })

    // })

           
}

function pingIP(){
    var address = document.getElementById('address');
    var paquetes = document.getElementById('paquetes');
    var pingExecute = document.getElementById('pingExecute');
    pingExecute.addEventListener('click', ()=>{
        console.log(paquetes.value)

        document.getElementById('pingR').innerHTML = `<p class="raleway-bold alert alert-danger"><code>Esperando respuesta...</code><br><br></p>`
        document.getElementById('pingExecute').setAttribute('style', 'display:none');

        fetch( 'queries/addresses.php?method=pingIP&address='+address.value+'&packets='+paquetes.value,{
                method: 'GET'
        })

        .then(response => response.json())
        .then( dataPing =>{

                console.log(dataPing)
                document.getElementById('pingExecute').removeAttribute('style', 'display:none');
                document.getElementById('pingR').innerHTML = `<div class="raleway-bold p-3 pb-0 bg-dark text-light "><code class="text-light">${dataPing}</code><br><br></div>`
           
        })
        
    })        
}

function ping(){

    var address = document.querySelectorAll('#Normal');
    for( var i = 0; i < address.length; i++ ){
        fetch( 'queries/addresses.php?method=ping&address='+address[i].textContent,{
            method: 'GET'
        })
    }
}

function addressReset(){
    
    var resultReset = document.getElementById('resultReset');
    resultReset.innerHTML = '';
    fetch( 'queries/addresses.php?method=reset',{
        method: 'GET'
    })
    .then( response => response.json())
    .then( response_data => {
        resultReset.innerHTML = `${response_data}`
    })
}

function addressPaused(){

    var resultPaused = document.getElementById('resultPaused');
    resultPaused.innerHTML = '';
    fetch( 'queries/addresses.php?method=paused',{
        method: 'GET'
    })
    .then( response => response.json())
    .then( response_data => {
        resultPaused.innerHTML = `${response_data}`
        getDatos(id)
        playIP(id)
    })
    

}

function addressError(){

    var resultError = document.getElementById('resultError');
    resultError.innerHTML = '';
    fetch( 'queries/addresses.php?method=errorIP',{
        method: 'GET'
    })
    .then( response => response.json())
    .then( response_data => {
        resultError.innerHTML = `${response_data}`
        getDatos(id)
        pausarIP(id)
        playIP(id)
    })


}

function addresSuccess(){

    var resultSuccess = document.getElementById('resultSuccess');
    resultSuccess.innerHTML = '';
    fetch( 'queries/addresses.php?method=success',{
        method: 'GET'
    })
    .then( response => response.json())
    .then( response_data => {
        resultSuccess.innerHTML = `${response_data}`
        getDatos(id)
        pausarIP(id)
        playIP(id)
    })


}

function addIP(){
    var add_ip = document.getElementById('add_ip');
    var message = document.getElementById('message');
    add_ip.addEventListener('submit', (e)=>{
        e.preventDefault();        
        var data = new FormData(add_ip)

        fetch('queries/addresses.php?method=add', {
            method: 'POST',
            body: data
        })

        .then( response => response.json())
        .then( response =>{

            console.log(response)

            if( response === 'OK' ){

                message.innerHTML = `<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                <div id="liveToast" class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-header"><svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#388E3C"></rect></svg><strong class="me-auto"><font style="vertical-align: inherit;"><font style="vertical-align: inherit; color:#388E3C;">¡Excelente!</font></font></strong><small><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Los datos fueron guardados</font></font></small><button type="button" id="btn-close" class="btn-close" data-bs-dismiss="toast" aria-label="Cerrar" ></button></div><div class="toast-body text-success poppins"><font style="vertical-align: inherit;"><font style="vertical-align: inherit; color:#388E3C; ">Hemos cargado sus datos de manera correcta</font><font style="vertical-align: inherit; color:#388E3C;"> el ping comenzara a ejecutarse.</font></font></div></div></div>`
                
                limpiar()

            }else if( response === 'ER' ){

                message.innerHTML = `<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                <div id="liveToast" class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-header"><svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#C62828"></rect></svg><strong class="me-auto"><font style="vertical-align: inherit;"><font style="vertical-align: inherit; color:#C62828;">¡Error!</font></font></strong><small><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Datos no ingresados</font></font></small><button type="button" id="btn-close" class="btn-close" data-bs-dismiss="toast" aria-label="Cerrar"></button></div><div class="toast-body text-success poppins"><font style="vertical-align: inherit;"><font style="vertical-align: inherit; color:#C62828; ">No se pueden ingresar los datos </font><font style="vertical-align: inherit; color:#C62828;">Tenemos errores internos intenta más tarde.</font></font></div></div></div>`

            }else if( response === 'REP' ){

                message.innerHTML = `<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                <div id="liveToast" class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-header"><svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#C62828"></rect></svg><strong class="me-auto"><font style="vertical-align: inherit;"><font style="vertical-align: inherit; color:#C62828;">¡Error!</font></font></strong><small><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Datos repetidos</font></font></small><button type="button" id="btn-close" class="btn-close" data-bs-dismiss="toast" aria-label="Cerrar"></button></div><div class="toast-body text-success poppins"><font style="vertical-align: inherit;"><font style="vertical-align: inherit; color:#C62828; ">No se pueden ingresar los datos </font><font style="vertical-align: inherit; color:#C62828;">El archivo y/o los datos ya existen.</font></font></div></div></div>`

            }else if( response === 'OKIMG' ){

                message.innerHTML = `<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                <div id="liveToast" class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-header"><svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#388E3C"></rect></svg><strong class="me-auto"><font style="vertical-align: inherit;"><font style="vertical-align: inherit; color:#388E3C;">¡Datos guardados!</font></font></strong><small><font style="vertical-align: inherit;"><font style="vertical-align: inherit; color: #C62828;">Imagen no cargada</font></font></small><button type="button" id="btn-close" class="btn-close" data-bs-dismiss="toast" aria-label="Cerrar"></button></div><div class="toast-body text-success poppins"><font style="vertical-align: inherit;"><font style="vertical-align: inherit; color:#388E3C; ">No se logró cargar la imagen</font><font style="vertical-align: inherit; color:#388E3C;">puede ingresar este dato despues.</font></font></div></div></div>`
                
            }

            var close = document.getElementById('btn-close');
            close.addEventListener('click', ()=>{
                document.getElementById('message').innerHTML=''
            })
            

        })

    })
}

function limpiar() {
    document.getElementById("name").value = "";
    document.getElementById("ip").value = "";
    document.getElementById("config").value = "";
    document.getElementById("type").value = "";
}