document.addEventListener('DOMContentLoaded', ()=>{
    console.log('Esperando add_ip');

    var add_ip = document.getElementById('add_ip');
    var message = document.getElementById('message');
    add_ip.addEventListener('submit', (e)=>{
        e.preventDefault();        
        var data = new FormData(add_ip)
        fetch('add_ip.php', {
            method: 'POST',
            body: data
        })


        .then( response => response.json())
        .then( data_response => {
            if( data_response === 'RE' ){
                console.log(data_response)
                message.innerHTML = `<div class="alert alert-warning" role="alert">
                <h4 class="alert-heading">Error!</h4>
                <p>La ip que esta intentando registrar ya se encuentra en la base de datos intente con otra IP.</p>
                <hr>
                <p class="mb-0">Si el error persiste comuniquese con soporte tecnico.</p>
              </div>`
            }else if( data_response === 'OK' ){
                console.log(data_response)
                message.innerHTML = `<div class="alert alert-success" role="alert">
                <h4 class="alert-heading">Correcto!</h4>
                <p>Se ha ingresado la información correctamente.</p>
                <hr>
                <p class="mb-0">Para verificar los cambios presione <a href="./" class="text-decoration-none text-danger">aquí</a>.</p>
              </div>`
            }else if( data_response === 'ER' ){
                console.log(data_response)
                message.innerHTML = `<div class="alert alert-success" role="alert">
                <h4 class="alert-heading">Well done!</h4>
                <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
                <hr>
                <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
              </div>`
            }
        })
    })
})