document.addEventListener('DOMContentLoaded',()=>{
    console.log('ESPERDANDO ENVIO...');

    var add_diagrama = document.getElementById('add_diagrama');
    var message = document.getElementById('message');

    add_diagrama.addEventListener('submit',(e)=>{
        e.preventDefault();
        var data = new FormData(add_diagrama)
        console.log('Procesando datos');
        fetch('add_ip.php',{
            method: 'POST',
            body: data
        })

        .then( response => response.json())
        .then( data_response => {
            console.log(data_response);
            if( data_response === 'OK' ){
                message.innerHTML = `<div class="alert alert-success alert-dismissible fade show raleway" role="alert">
                    <strong class="raleway-bold">Consulta correcta!</strong> Se ha agregado un nuevo diagrama.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`
            }else if( data_response === 'ER' ){
                message.innerHTML = `<div class="alert alert-danger alert-dismissible fade show raleway" role="alert">
                    <strong class="raleway-bold">Consulta incorrecta!</strong> No se ha podido agregar el diagrama intente más tarde.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`
            }
        })
    })
})