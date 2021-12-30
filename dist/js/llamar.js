document.addEventListener('DOMContentLoaded', ()=>{

    console.log('Ingresa tu numero telefonico...');
    var llamar  = document.getElementById('llamar');
    var message = document.querySelector('.modal-body');
    llamar.addEventListener('submit', (e)=>{
        e.preventDefault();
        console.log('Procesando informacion...');
        var data = new FormData(llamar)
        fetch('messenger.php', {
            method: 'POST',
            body: data
        })

        message.innerHTML = `<div class="alert alert-primary"><strong class="poppins-bold">Excelente!!!</strong><p class="poppins">Hemos enviado correctamente la informacion, en unos momentos un asesor se comunicará con usted sea paciente.</p></div>`

    })

})