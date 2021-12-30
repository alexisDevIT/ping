document.addEventListener('DOMContentLoaded', ()=>{

    query_address();

    setInterval(query_address, 20000);
   
})

document.addEventListener('keyup', ()=> { //busqueda en tiempo real de antenas

    var search = document.getElementById('search').value;
    var search_result = document.getElementById('search_result');
    var ping_results = document.getElementById('ping_results');

    if( search == '' ){ // si el campo de busqueda esta vacio no mostrar nada
        
        search_result.innerHTML = ``
        query_address();

    }else{

        //console.log(search);
        fetch('buscar.php?parametro='+search,{
            method: 'GET'
        })

        .then( respon => respon.json() )
        .then( date =>{

            console.log(date);
            ping_results.innerHTML = `${date}`
            var close = document.getElementById('close');

            close.addEventListener('click', ()=>{
                search_result.innerHTML = ``
            })
        })

    }
    

})


function query_address(){

    var ping_results = document.getElementById('ping_results');

    fetch('query_address.php', {
        method: 'GET'
    })

    .then( response => response.json() )
    .then( data => {

        ping_results.innerHTML = ``;

        if( data != 0 ){
            for( let i = 0; i < data.length; i++ ){

                //console.log(data[i].name)

                var color = '';
                var download = '';

                if( data[i].status == 'Incorrecto' ){
                    color = 'bg-danger';
                    
                    fetch('messenger.php?ip='+data[i].address+'&name='+data[i].name, { //ENVIAR TELEGRAM
                        method: 'GET'
                    })

                }else if( data[i].status == 'Correcto' ){
                    color = 'bg-success';
                }

                

                if( data[i].conf_file === '' ){

                    download = '<a href="edit_ip.php?id='+data[i].id+'" target="_blank" class="text-white"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-file-earmark-arrow-up" viewBox="0 0 16 16"><path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z"/><path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/></svg></a>';

                }else if( data[i].conf_file != '' ){

                    download = '<a href="conf_files/'+data[i].conf_file+'" download="'+data[i].conf_file+'" class="text-white"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/></svg></a>'
                    
                }

                ping_results.innerHTML += `<tr class="text-light text-center `+color+`"><td class="text-center"><a class="text-decoration-none text-light" target="_blank" href="diagrama.php?ip=${data[i].address}">${data[i].name}</a></td><td><input type="hidden" id="ip" value="${data[i].address}"><a class="text-light" target="_blank" href="http://${data[i].address}">${data[i].address}</a></td><td>${data[i].status}</td><td class="text-center respaldo">`+download+`</a></td><td class="text-center"><div class="btn-group"><a class="btn" href="edit_ip.php?id=${data[i].id}" target="_blank" value="${data[i].id}"><i class="fa fa-edit text-light fa-2x"></i></a><a href="edit_ip.php?address=${data[i].address}" class="btn" target="_blank"><i class="fa fa-pause-circle text-light fa-2x"></i></a><a href="delete_ip.php?id=${data[i].id}" target="_blank" class="btn"><i class="fa fa-trash text-light fa-2x"></i></a></div></td></tr>`;

                             

                fetch('ping_execute.php?ip='+data[i].address+'&type='+data[i].type, {
                    method: 'GET'
                })

                .then( response => response.json())
                .then( data => {
                    if( data ){
                        console.log('DATOS ENVIADOS');
                    }
                })

            }
        }
    })


}