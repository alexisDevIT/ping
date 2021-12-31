const select = document.querySelectorAll('select')[0];
const address = document.querySelector('#address')
const contentping = document.querySelector('.content-ping')
const packages = document.querySelector('#packages')
const mantener = document.querySelector('#flexCheckIndeterminate')
const execute = document.querySelector('.execute')

document.addEventListener('DOMContentLoaded', () => { 
    console.log('Cargando datos...'); 
    addresses();
    contentping.textContent = 'Ping>_'
})

execute.addEventListener('click', e => { 
    e.preventDefault();    
    // execute.setAttribute('disabled','true');
    address.value == 0 ? alert('No puede ejecutar un ping de la forma que desea...') : console.log('Ejecutando...')
    if( packages.value !== '' && address.value !== '' ){
        contentping.textContent = 'Ping>ping -n ' + packages.value + ' ' + address.value
        for( var i = 1; i < packages.value; i++ ){
            fetch('../connectionData/ping/ping.php?address=' + address.value ).then( response => response.json() )
            .then( data => { contentping.innerHTML += `<p>${data}</p>` })        
        }
    }
    // else if( mantener.checked ){
    //     packages.value !== ''
    //     contentping.textContent = 'Ping>ping ' + address.value + ' -t'
    //     ping(address.value)
    //     setInterval(ping,1000)    
    // }
})

const addresses = async() => {
    try {
        const response = await fetch('../connectionData/address/addresses.php')
        const data = await response.json()
        var resp = data == 0 ? alert('No hay datos por mostrar') 
        : data.forEach( 
            element => { 
                select.innerHTML += `<option value="${element.address}" class="text-uppercase">${element.name}</option>`
            })
        return resp
    } catch (error) {
        console.log(error)
    }
}

const ping = async(address) => {
    try {
        contentping.innerHTML = ``
        const response = await fetch('../connectionData/ping/ping.php?address=' + address )
        const data = await response.json()
        console.log(data)
        contentping.innerHTML += `<p>${data}</p>`
    } catch (error) {
        console.log(error)
    }
}
