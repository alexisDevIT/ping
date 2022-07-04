const status_address = {
  1 : { id: 0, value: 1, name: 'Online', color: 'success' },
  2 : { id: 1, value: 2, name: 'Offline', color: 'danger' }
}


let antenas = {}, date = new Date(), order = 2;

document.addEventListener('DOMContentLoaded', () => {
  getDataJSON();
});

// Obtener datos del archivo json //
async function getDataJSON() {
  try {
    const peticion = await fetch('addresses.json');
    const address = await peticion.json();
    if (address) {
      // Object recorrer //
      Object.values(address).forEach( address => {
        // Existe la key en el objeto ? //

        antenas[address.address] ??= {...address};
        fetch(`PHP/ping.php?address=${address.address}&type=${address.type}`)
        .then( response => response.json())
        .then( data => {
          // Obtener la fecha //
          fetch(`PHP/date.php`).then( response => response.json())
          .then( date => {
            // Editando el objeto antenas //
            if (data && data.split(' ')[3] >= 2) {
              antenas[address.address].status = 1;
              antenas[address.address].last_ping = date;
            } else { 
              antenas[address.address].status = 2;
              // Send Message error //
              fetch(`PHP/messenger.php?address=${address.address}&name=${address.name}`);
            }
          });
        });        
      });

      // Ordenar por status las addresses //
      let orderAntenas = {};

      order === 1 // Ordenar por status las address
      ? orderAntenas = Object.values(antenas).sort((a,b) => a.status - b.status)
      : orderAntenas = Object.values(antenas).sort((a,b) => b.status - a.status);
      
      paintAddress(orderAntenas);
      

    }
  } catch (error) {
    console.log(error)
  }
}

// Espera 10 segundos y ejecutalo cada diez segundos apartir de ese tiempo //
setInterval(getDataJSON, 30000);

const options = Object.values(status_address).map(element => `<option value="${element.value}">${element.name}</option>`);
const selectStatus = document.querySelector('#select-status');
selectStatus.innerHTML = `<option>--Status--</option>${options}`;
selectStatus.addEventListener('change', () => {
  order = Number(selectStatus.value);
  getDataJSON();
});


// Table items Addresses //
const fragment = document.createDocumentFragment();
const itemsAddress = document.querySelector('.itemsAddress');
const templateAddress = document.querySelector('#templateAddress').content;
const paintAddress = (antenas) => {

  // Pintame los datos en la tabla //
  Object.values(antenas).forEach( address => {

    itemsAddress.innerHTML = '';
    // Paint data tr //
    const cloneTMP = templateAddress.cloneNode(true);
    cloneTMP.querySelector('.name').textContent = address.name.toUpperCase();
    cloneTMP.querySelector('.last-ping').textContent = 'Last Ping: ' + address.last_ping;
    cloneTMP.querySelector('.address').textContent = address.address;
    cloneTMP.querySelector('.address').href = `http://${address.address}`;
    cloneTMP.querySelector('.status').textContent = status_address[address.status].name;
    cloneTMP.querySelector('.color').classList.add(`bg-${status_address[address.status].color}`);
    cloneTMP.querySelector('.content-template').classList.add(`border-start-${status_address[address.status].color}`)

    if (address.status == 1 || address.status == 2) {
      cloneTMP.querySelector('.bi-play').classList.add('d-none');
      cloneTMP.querySelector('.bi-pause').dataset.id = address.address;
      cloneTMP.querySelector('.bi-trash').dataset.id = address.address;
      cloneTMP.querySelector('.bi-pencil-square').dataset.id = address.address;
    } else if (address.status == 3) {
      cloneTMP.querySelector('.bi-play').dataset.id = address.address;
      cloneTMP.querySelector('.bi-pause').classList.add('d-none');
      cloneTMP.querySelector('.bi-trash').dataset.id = address.address;
      cloneTMP.querySelector('.bi-pencil-square').dataset.id = address.address;
    }

    if (address.configuration === "") {
      cloneTMP.querySelector('.bi-download').classList.add('d-none');
    } else {
      cloneTMP.querySelector('.bi-download').href = address.configuration;
      cloneTMP.querySelector('.bi-download').download = address.configuration;
    }

    fragment.appendChild(cloneTMP);

  });

  itemsAddress.appendChild(fragment);

  // Modifica el archivo json //
  fetch(`PHP/file_put_content.php`, {
    method: 'POST',
    body: JSON.stringify(antenas),
    headers: { "Content-Type" : "Aplication/json" } 
  }).then( response => response.json())
  .then( data => {
    if (data === 'OK') {
      localStorage.setItem('antenas', JSON.stringify(antenas));
    } else {
      localStorage.setItem('antenas', JSON.stringify(antenas));
    }
  });

}

// Buscar por parametros //
const searchName = document.querySelector('#searchName');
searchName.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(searchName);
  const results = Object.values(antenas).filter( element => 
    element.name.toLowerCase().includes(formData.get('searchIP').toLowerCase())
  );

  // Ordenar por status las addresses //
  let orderAntenas = {};
  order === 1 // Ordenar por status las address
  ? orderAntenas = Object.values(results).sort((a,b) => a.status - b.status)
  : orderAntenas = Object.values(results).sort((a,b) => b.status - a.status);
  paintSearchResults(orderAntenas);

});


// Pintar los resultados //
const itemsSearch = document.querySelector('.itemsSearch');
function paintSearchResults(results) {
  itemsAddress.classList.add('d-none');
  itemsSearch.classList.remove('d-none');
  // Pintame los datos en la tabla //
  Object.values(results).forEach( address => {

    itemsSearch.innerHTML = '';
    // Paint data tr //
    const cloneTMP = templateAddress.cloneNode(true);
    cloneTMP.querySelector('.name').textContent = address.name.toUpperCase();
    cloneTMP.querySelector('.last-ping').textContent = 'Last Ping: ' + address.last_ping;
    cloneTMP.querySelector('.address').textContent = address.address;
    cloneTMP.querySelector('.address').href = `http://${address.address}`;
    cloneTMP.querySelector('.status').textContent = status_address[address.status].name;
    cloneTMP.querySelector('.color').classList.add(`bg-${status_address[address.status].color}`);
    cloneTMP.querySelector('.content-template').classList.add(`border-start-${status_address[address.status].color}`)

    if (address.status == 1 || address.status == 2) {
      cloneTMP.querySelector('.bi-play').classList.add('d-none');
      cloneTMP.querySelector('.bi-pause').dataset.id = address.address;
      cloneTMP.querySelector('.bi-trash').dataset.id = address.address;
      cloneTMP.querySelector('.bi-pencil-square').dataset.id = address.address;
    } else if (address.status == 3) {
      cloneTMP.querySelector('.bi-play').dataset.id = address.address;
      cloneTMP.querySelector('.bi-pause').classList.add('d-none');
      cloneTMP.querySelector('.bi-trash').dataset.id = address.address;
      cloneTMP.querySelector('.bi-pencil-square').dataset.id = address.address;
    }

    if (address.configuration === "") {
      cloneTMP.querySelector('.bi-download').classList.add('d-none');
    } else {
      cloneTMP.querySelector('.bi-download').href = address.configuration;
      cloneTMP.querySelector('.bi-download').download = address.configuration;
    }

    fragment.appendChild(cloneTMP);

  });

  itemsSearch.appendChild(fragment);

}

const searchIP = document.querySelector('#searchIP');
searchIP.addEventListener('keyup', () => {
  if (searchIP.value === '') {
    itemsAddress.classList.remove('d-none');
    itemsSearch.classList.add('d-none');
  } else {
    const results = Object.values(antenas).filter( element => 
      element.name.toLowerCase().includes(searchIP.value.toLowerCase())
    );
    
    // Ordenar por status las addresses //
    let orderAntenas = {};
    order === 1 // Ordenar por status las address
    ? orderAntenas = Object.values(results).sort((a,b) => a.status - b.status)
    : orderAntenas = Object.values(results).sort((a,b) => b.status - a.status);
    paintSearchResults(orderAntenas);

  }
})


// Controls event click //
const editPing = document.getElementById('editPing');
let IPv4Changed;
itemsAddress.addEventListener('click', e => {
  if (e.target.classList.contains('bi-pause')) {
    Swal.fire({
      icon: 'question',
      title: '¿Esta seguro?',
      text: `Esta por pausar la IPv4: ${e.target.dataset.id}`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar!',
      confirmButtonText: 'Pausar!',
    }).then( promise => {
      if (promise.isConfirmed) {
        getAddressPaused()
        .then( pausadas => {

          if (pausadas) {
            pausadas[e.target.dataset.id] ??= antenas[e.target.dataset.id];
            addPaused(pausadas);
            delete antenas[e.target.dataset.id];
            file_put_content(antenas);
          } else {
            // Solo agregar el nuevo pausado //
            addPaused(antenas[e.target.dataset.id]);
            delete antenas[e.target.dataset.id];
            file_put_content(antenas);

          }

        });
      }
    });
  }

  if (e.target.classList.contains('bi-trash')) {
    Swal.fire({
      icon: 'warning',
      title: '¿Esta seguro?',
      text: `Esta por eliminar la IPv4: ${e.target.dataset.id}`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar!',
      confirmButtonText: 'Eliminar!',
    }).then( promise => {

      if (promise.isConfirmed) {
        delete antenas[e.target.dataset.id];
        file_put_content(antenas); 
      }

    });
  }

  if (e.target.classList.contains('bi-pencil-square')) {
    editPing.querySelector('.modal-title').textContent = antenas[e.target.dataset.id].name;
    editPing.querySelector('#address').value = antenas[e.target.dataset.id].address;
    editPing.querySelector('#name').value = antenas[e.target.dataset.id].name;
    editPing.querySelector('#type').selectedIndex = antenas[e.target.dataset.id].type;
    IPv4Changed = e.target.dataset.id;
  }

});

// Editando la IP //
editPing.addEventListener('submit', e => {

  e.preventDefault();
  const formData = new FormData(editPing);

  // Cambió la IP //
  if (formData.get('address') != IPv4Changed) { // Puede cambiar los demas datos //
    
    delete antenas[IPv4Changed];

    antenas[formData.get('address')] = {
      name: formData.get('name'),
      address: formData.get('address'),
      status: 1,
      last_ping: date.toLocaleDateString(),
      configuration: "",
      type: formData.get('type'),
    }

    if (formData.get('configuration').size > 0) { // Esta enviando archivos //

      antenas[formData.get('address')].configuration = `assets/respaldos/${formData.get('address')}-${formData.get('configuration').name}`;
      localStorage.setItem('antenas', JSON.stringify(antenas));
      file_put_content(antenas);

    } else { // No esta enviando archivos //
      
      // Enviar // 
      localStorage.setItem('antenas', JSON.stringify(antenas));
      file_put_content(antenas);

    }
    
  } else {
    
    // El id del objeto es la misma solo cambian los demas valores //
    antenas[formData.get('address')].name !== formData.get('name')
    ? antenas[formData.get('address')].name = formData.get('name')
    : antenas[formData.get('address')].name = antenas[formData.get('address')].name;

    antenas[formData.get('address')].type !== formData.get('type')
    ? antenas[formData.get('address')].type = formData.get('type')
    : antenas[formData.get('address')].type = antenas[formData.get('address')].type;

    if (formData.get('configuration').size > 0) { // Esta enviando archivos //

      antenas[formData.get('address')].configuration = `assets/respaldos/${formData.get('address')}-${formData.get('configuration').name}`;
      localStorage.setItem('antenas', JSON.stringify(antenas));
      file_put_content(antenas);

    } else { // No esta enviando archivos //
      
      // Enviar // 
      localStorage.setItem('antenas', JSON.stringify(antenas));
      file_put_content(antenas);

    }
    
  }

});


// Obtener IP pausadas //
async function addPaused(datos) {
  try {
    fetch(`PHP/addPaused.php`, {
      method: 'POST',
      body: JSON.stringify(datos)
    }).then( response => response.json())
    .then( data => {
      if (data === 'OK') {
        getDataJSON(); // Volver a cargar los datos //
        localStorage.setItem('antenas', JSON.stringify(antenas));
        Swal.fire({
          icon: 'success',
          title: 'Correcto!',
          text: `Hemos pausado la IPv4 correctamente!`,
          confirmButtonText: 'Entendido!'
        });
      }
    });
  } catch (error) {
    console.log(error)
  }
}


// Formulario //
const addPing = document.querySelector('#addPing');
addPing.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(addPing);

  if (antenas[formData.get('address')]) {

    // Ya existe la direccion IP //
    Swal.fire({
      icon: 'warning',
      title: 'IPv4 Existente!',
      text: `La IPv4: ${formData.get('address')} esta registrada como ${antenas[formData.get('address')].name.toUpperCase()}`,
      confirmButtonText: 'Entendido!'
    });

  } else {

    antenas[formData.get('address')] ??= {
      "name" : formData.get('name'),
      "address" : formData.get('address'),
      "status" : 1,
      "last_ping" : `${date.toLocaleDateString()}:${date.getHours()}:${date.getMinutes()}`,
      "configuration": "",
      "type" : formData.get('type'),
    }

    if (formData.get('configuration').size == 0) {
      // Guardar Objeto //
      file_put_content(antenas);

    } else {

      fetch(`PHP/upload-file.php`, {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then( data => {
        if (data === 'OK') {

          antenas[formData.get('address')].configuration = `assets/respaldos/${formData.get('address')}-${formData.get('configuration').name}`;
      
          file_put_content(antenas);

        } else if (data === 'FILEERROR') {
          Swal.fire({
            icon: 'warning',
            title: 'Error!',
            text: `El formato del archivo de configuracion no esta permitido!`,
            confirmButtonText: 'Entendido!'
          });
        }

      });
    }
  }
});


// Agregar o modificar Objeto //
function file_put_content(antenas) {
  // Guardar Objeto //
  fetch(`PHP/file_put_content.php`, {
    method: 'POST',
    body: JSON.stringify(antenas),
    headers: { "Content-Type" : "Aplication/json" }
  })
  .then( response => response.json())
  .then( data => {
    if (data === 'OK') {
      getDataJSON();
      addPing.reset();
      editPing.reset();
      localStorage.setItem('antenas', JSON.stringify(antenas));
      Swal.fire({
        icon: 'success',
        title: 'Correcto!',
        text: `Datos agregados correctamente!`,
        confirmButtonText: 'Entendido!'
      });
    }
  });
}

// Obtener todas las address //
async function getAddressPaused() {
  try {
    const peticion = await fetch('pausedAddress.json');
    const address = await peticion.json();
    return address;
  } catch (error) {
    console.log(error);
  }
}