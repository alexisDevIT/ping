/*
 * DEVELOPMENT FOR DEVIT V3.5 
 * Alexis Alfonso Sanchez Jimenez ......
 * 
*/

const itemsResultados = document.getElementById('itemsResultados')
const templateResultados  = document.getElementById('templateResultados').content
const itemSearch = document.getElementById('itemSearch')
const templateSearch  = document.getElementById('templateSearch').content
const fragment = document.createDocumentFragment()
const addIP = document.querySelector('#add_ip')
const editIP = document.getElementById('edit_ip')
const searchIP = document.getElementById('searchIP')
var myModal = document.getElementById('modalAdd')
let objAddress = {}

document.addEventListener('DOMContentLoaded', () => { console.log('Addresses load correct...'); addressFull(); setInterval(addressFull,40000); })

/** Buscar una ip **/
searchIP.addEventListener('submit', e => { 
    e.preventDefault(); 
    document.querySelector('.statuSearch').textContent = 'Buscando coincidencias, sea paciente...'; 
    document.querySelector('.statuSearch').classList.add('text-info'); 
    itemsResultados.setAttribute('style', 'display:none'); 
    itemSearch.removeAttribute('style', 'display:none'); 
    const formData = new FormData(searchIP); buscarIP(formData); 
})

/** Funcion que agrega una ip **/
addIP.addEventListener('submit', e => { 
    e.preventDefault(); 
    console.log('Agregando IP...'); 
    document.querySelector('.msjSuccess').setAttribute('style', 'display:none'); 
    document.querySelector('.msjError').setAttribute('style', 'display:none'); 
    document.querySelector('.msjStatus').removeAttribute('style', 'display:none'); 
    document.querySelector('.textStatus').textContent = 'Espere unos segundos...'; 
    const formData = new FormData(addIP); sendNewIP(formData); 
})

/** Funcion que edita una ip **/
editIP.addEventListener('submit', e => { 
    e.preventDefault(); console.log('Editando datos...'); 
    console.log('Agregando IP...'); 
    document.querySelectorAll('.msjSuccess')[1].setAttribute('style', 'display:none'); 
    document.querySelectorAll('.msjError')[1].setAttribute('style', 'display:none'); 
    document.querySelectorAll('.msjStatus')[1].removeAttribute('style', 'display:none'); 
    document.querySelectorAll('.textStatus')[1].textContent = 'Espere unos segundos...'; 
    const formData = new FormData(editIP); editaIP(formData); 
})

/** Eventos click de los botones **/
itemsResultados.addEventListener('click', (e) => { 
    var modalEdit = new bootstrap.Modal(document.getElementById('modalEdit'), { keyboard: true }); 
    if(e.target.classList.contains('bi-pencil-square')) { 
        document.querySelector('#edit_ip').reset(); 
        obtenerDatos(e.target.parentElement); modalEdit.show(); 
        document.querySelector('.modal-title-edit').textContent = 'Cargando datos...' 
    } else if(e.target.classList.contains('bi-pause-fill')) { 
        pausarIP(e.target.parentElement); 
    } else if(e.target.classList.contains('bi-trash')) { 
        eliminarIP(e.target.parentElement) 
    } e.stopPropagation(); 
})

/*** Para los clic de los items buscados */
itemSearch.addEventListener('click', (e) => { 
    var modalEdit = new bootstrap.Modal(document.getElementById('modalEdit'), { keyboard: true }); 
    if(e.target.classList.contains('bi-pencil-square')) { 
        document.querySelector('#edit_ip').reset(); 
        obtenerDatos(e.target.parentElement); modalEdit.show();
        document.querySelector('.modal-title-edit').textContent = 'Cargando datos...' 
    } else if(e.target.classList.contains('bi-pause-fill')) { 
        pausarIP(e.target.parentElement) 
    } else if(e.target.classList.contains('bi-trash')) { 
        eliminarIP(e.target.parentElement) 
    } e.stopPropagation();
 })

/** Obteniendo las direcciones ip **/
const addressFull = () => { 
    console.log('Mostrando IP´S'); 
    document.querySelector('.cerrar').classList.remove('bi-x-circle');
    document.querySelector('.statuSearch').textContent = '';
    fetch('connectionData/address/addresses.php').then( response => response.json()).then( data => { createObjectAddress(data); }) 
} 

/** Pintar la tabla **/
const createObjectAddress = address => { 
    /** Vaciar el body para no repetir **/ 
    itemsResultados.innerHTML = ''; 
    /** Pintando datos en la tabla **/ 
    Object.values(address).forEach( element => { 
        const clone = templateResultados.cloneNode(true); 
        if( element.status == 2 ) { 
            clone.querySelector('tr').classList.add('bg-danger');
            clone.querySelector('tr').setAttribute('id','addr' + element.id); 
        } else if( element.status == 4 ) { 
            clone.querySelector('tr').classList.add('bg-success'); 
            clone.querySelector('tr').setAttribute('id','addr' + element.id); 
        } else if( element.status == 1 ){ 
            clone.querySelector('tr').classList.add('bg-secondary'); 
            clone.querySelector('tr').setAttribute('id','addr' + element.id); 
        } else if( element.status == 3 ) { 
            clone.querySelector('tr').classList.add('bg-dansucc'); 
            clone.querySelector('tr').setAttribute('id','addr' + element.id); 
        } 
        /** Mostrando datos **/ 
        clone.querySelector('.name').classList.add('text-light'); 
        clone.querySelector('.address').classList.add('text-light'); 
        clone.querySelector('.ultimate_ping').classList.add('text-light'); 
        clone.querySelector('.type').classList.add('text-light'); 
        clone.querySelector('.conf_file').classList.add('text-light'); 
        clone.querySelector('.name').textContent = element.name; 
        clone.querySelector('.name').title = element.name; 
        clone.querySelector('.address').textContent = element.address; 
        clone.querySelector('.address').dataset.id = element.address; 
        clone.querySelector('.address').title = element.address + ': ' + element.name; 
        clone.querySelector('.address').setAttribute('href', 'http://' + element.address); 
        clone.querySelector('.ultimate_ping').textContent = element.ultimo_ping; 
        clone.querySelector('.ultimate_ping').title = 'Ultimo ping: ' + element.ultimo_ping; 
        clone.querySelector('.type').textContent = element.type; 
        clone.querySelector('.conf_file').setAttribute('href','dist/conf_files/' + element.conf_file);
        clone.querySelector('.conf_file').setAttribute('download', element.conf_file); 
        clone.querySelector('.conf_file').textContent = 'Backup...'; 
        clone.querySelector('.bi-pencil-square').dataset.id = element.id; 
        clone.querySelector('.bi-pause-fill').dataset.id = element.id; 
        clone.querySelector('.bi-trash').dataset.id = element.id; 
        fragment.appendChild(clone); 
        /** Ejecuto el ping **/ 
        objAddress = { name: element.name, address: element.address, type: element.type };
        ping(objAddress); 
    }); itemsResultados.appendChild(fragment);
}

/** Pintar la tabla con la busqueda **/
const createObjectAddreSearch = (address,formData) => {
    /** Vaciar el body para no repetir **/
    itemSearch.innerHTML = ''; 
    /** Pintando datos en la tabla **/ 
    Object.values(address).forEach( element => { 
        const clone = templateSearch.cloneNode(true); 
        if( element.status == 2 ) { 
            clone.querySelector('tr').classList.add('bg-danger'); 
            clone.querySelector('tr').setAttribute('id','addr' + element.id); 
        } else if( element.status == 4 ) { 
            clone.querySelector('tr').classList.add('bg-success'); 
            clone.querySelector('tr').setAttribute('id','addr' + element.id); 
        } else if( element.status == 1 ){ 
            clone.querySelector('tr').classList.add('bg-secondary'); 
            clone.querySelector('tr').setAttribute('id','addr' + element.id); 
        } else if( element.status == 3 ) { 
            clone.querySelector('tr').classList.add('bg-dansucc'); 
            clone.querySelector('tr').setAttribute('id','addr' + element.id); 
        } 
        /** Mostrando datos **/ 
        clone.querySelector('.name').classList.add('text-light'); 
        clone.querySelector('.address').classList.add('text-light'); 
        clone.querySelector('.ultimate_ping').classList.add('text-light'); 
        clone.querySelector('.type').classList.add('text-light'); 
        clone.querySelector('.conf_file').classList.add('text-light'); 
        clone.querySelector('.name').textContent = element.name; 
        clone.querySelector('.name').title = element.name; 
        clone.querySelector('.address').textContent = element.address; 
        clone.querySelector('.address').dataset.id = element.address; 
        clone.querySelector('.address').title = element.address + ': ' + element.name; 
        clone.querySelector('.address').setAttribute('href', 'http://' + element.address); 
        clone.querySelector('.ultimate_ping').textContent = element.ultimo_ping; 
        clone.querySelector('.ultimate_ping').title = 'Ultimo ping: ' + element.ultimo_ping; 
        clone.querySelector('.type').textContent = element.type; 
        clone.querySelector('.conf_file').setAttribute('href','dist/conf_files/' + element.conf_file); 
        clone.querySelector('.conf_file').setAttribute('download', element.conf_file); 
        clone.querySelector('.conf_file').textContent = 'Backup...'; 
        clone.querySelector('.bi-pencil-square').dataset.id = element.id; 
        clone.querySelector('.bi-pause-fill').dataset.id = element.id; 
        clone.querySelector('.bi-trash').dataset.id = element.id; 
        fragment.appendChild(clone); 
        /** Ejecuto el ping **/ 
        objAddress = { name: element.name, address: element.address, type: element.type }; 
    }); itemSearch.appendChild(fragment); 
}

/** Haciendo el ping**/
const ping = async(objAddress) => {
    try {
        const response = await fetch('connectionData/ping/ping_address.php', 
        {method: 'POST', body: JSON.stringify(objAddress), headers: {'Content-type':'aplication/json'}})
        const data = await response.json()
        console.log(data)
    } catch (error) { console.log(error);  }
}

/** Informacion de la direccion seleccionada **/
const obtenerDatos = dataid => { 
    const id = dataid.querySelector('.bi-pencil-square').dataset.id; 
    fetch('connectionData/address/address.php?id=' + id).then(response => response.json()).then(data => { paintValues(data,id)}) 
}

/** Pintando valores para editar la ip **/
const paintValues = (data,id) => {
    document.querySelector('#id').value = id; 
    const select = document.querySelectorAll('#type')[1]; 
    data.forEach( element => { 
        document.querySelector('.modal-title-edit').textContent = element.name; 
        document.querySelectorAll('#name')[1].value = element.name; 
        document.querySelectorAll('#address')[1].value = element.address; 
        var type = ( element.type === 'Scan') ? '<option value="">--Seleccione--</option><option value="'+ element.type +'" selected="">'+ element.type +'</option><option value="Reset">Reset</option>' : 
        '<option value="">--Seleccione--</option><option value="'+ element.type +'" selected="">'+ element.type +'</option><option value="Reset">Reset</option>'; 
        select.innerHTML = type 
    })
}

/** Buscar una ip ingresada **/
const buscarIP = formData => { 
    fetch('connectionData/address/search_address.php', { method: 'POST', body: formData }).then( response => response.json())
    .then( data => { 
        if( data !== 0 ) { 
            const cerrar = document.querySelector('.cerrar'); 
            cerrar.addEventListener('click', () => { 
                document.querySelector('.statuSearch').textContent = ''; 
                cerrar.classList.remove('bi-x-circle'); 
                document.querySelector('#itemsResultados').removeAttribute('style', 'display:none'); 
                document.querySelector('#itemSearch').setAttribute('style', 'display:none'); 
            }); 
            document.querySelector('.statuSearch').classList.replace('text-info','text-success'); 
            document.querySelector('.cerrar').classList.add('bi-x-circle'); 
            document.querySelector('.statuSearch').textContent = data.length + ' Resultados encontrados para su busqueda...'; createObjectAddreSearch(data,formData); 
        } else { 
            document.querySelector('.statuSearch').classList.replace('text-info','text-danger'); 
            document.querySelector('.statuSearch').textContent = 'No encontramos resultados para su busqueda...'; 
        } 
    }) 
}

/** Enviar los datos de la ip y validar si no existen ya en la bd **/
const sendNewIP = async(formData) => { 
    try { 
        const response = await fetch('connectionData/address/validates.php', 
        { method: 'POST', body: formData }); 
        const data = await response.json(); 
        if( data === 'OK') { 
            continueSend(formData); 
            document.querySelector('.textStatus').textContent = 'Insertando datos...'; 
        } else { 
            document.querySelector('.msjStatus').setAttribute('style', 'display:none'); 
            document.querySelector('.msjError').removeAttribute('style', 'display:none') ; 
        }
    } catch (error) { console.log(error) } 
}

/** Si no existen los datos en la base de datos entonces insertar en la misma **/
const continueSend = async(formData) => { const response = await fetch('connectionData/address/add_address.php', { method: 'POST', body: formData }); const data = await response.json(); if( data === 'OK' ) { document.querySelector('#add_ip').reset(); document.querySelector('.msjStatus').setAttribute('style', 'display:none'); document.querySelector('.msjSuccess').removeAttribute('style', 'display:none'); } else if( data === 'ER' ) { swal('¡Error!','No pudimos insertar los datos','error') } else if(!data) { swal('¡Error!','No pudimos insertar los datos','error') } }

/** Editar una IP **/
const editaIP = async(formData) => { const response = await fetch('connectionData/address/edit_address.php', { method: 'POST', body: formData }); const data = await response.json(); if( data == 'OK' ) { document.querySelectorAll('.msjStatus')[1].setAttribute('style', 'display:none'); document.querySelectorAll('.msjSuccess')[1].removeAttribute('style', 'display:none'); document.querySelector('#edit_ip').reset(); } else { alert('Tenemos problemas para realizar esta tarea, intente más tarde...'); } }

/** pausar una ip **/
const pausarIP = async(element) => { try { const id = element.querySelector('.bi-pause-fill').dataset.id; const response = await fetch('connectionData/address/pause_address.php?id=' + id); const data = await response.json(); if(data === 'OK'){ swal('Hecho!','Se ha pausado la direccion' ,'success'); }else{ swal('Error!','Ocurrio un error intente mas tarde' ,'error') } } catch (error) { console.log(error); } }

/** eliminar una ip **/
const eliminarIP = async(element) => { try { const id = element.querySelector('.bi-trash').dataset.id; const response = await fetch('connectionData/address/delete_address.php?id=' + id); const data = await response.json(); if(data === 'OK'){ swal('Hecho!','Se ha eliminado la direccion' ,'success'); }else{ swal('Error!','Ocurrio un error intente mas tarde' ,'error') } } catch (error) { console.log(error); } }