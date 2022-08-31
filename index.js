const $ = (selector) => document.querySelector(selector);

// Table items Addresses //
const fragment = document.createDocumentFragment();
const itemsAddress = $('.itemsAddress');
const templateAddress = $('#templateAddress').content;
const selectStatus = $('#select-status');
const searchName = $('#searchName');
const addPing = $('#addPing');
const editPing = $('#editPing');
const searchIP = $('#searchIP');



const message = {

  clearData: () => {

    Swal.fire({
      icon: 'error',
      title: 'Datos vacíos!',
      text: 'Revise la conexión!',
      confirmButtonText: 'Entendido!'
    });

  },

  successDelete: (data) => {
    Swal.fire({
      icon: 'success',
      title: 'Correcto!',
      text: 'Se eliminó correctamente la IPv4: ' + data.address,
      confirmButtonText: 'Entendido!'
    });
  },

  errorDelete: (data) => {
    Swal.fire({
      icon: 'error',
      title: 'Incorrecto!',
      text: 'No se eliminó correctamente la IPv4: ' + data.address,
      confirmButtonText: 'Entendido!'
    });
  },

  repeatData: (address) => {
    Swal.fire({
      icon: 'warning',
      title: 'Cuidado!',
      text: 'La IPv4: ' + address + ' ya existe!',
      confirmButtonText: 'Entendido!'
    });
  },

  successInsert: () => {
    Swal.fire({
      icon: 'success',
      title: 'Correcto!',
      text: 'Los datos se agregaron correctamente!',
      confirmButtonText: 'Entendido!'
    });
  }, 

  errorInsert: () => {
    Swal.fire({
      icon: 'error',
      title: 'Incorrecto!',
      text: 'Error al agregar los datos!',
      confirmButtonText: 'Entendido!'
    });
  },

  errorFormat: () => {
    Swal.fire({
      icon: 'error',
      title: 'Incorrecto!',
      text: 'El formato del archivo no es permitido!',
      confirmButtonText: 'Entendido!'
    });
  }, 

  errorUpload: () => {
    Swal.fire({
      icon: 'error',
      title: 'Incorrecto!',
      text: 'No se pudo copiar el archivo revise los permisos!',
      confirmButtonText: 'Entendido!'
    });
  },
  
  successPause: (data) => {
    Swal.fire({
      icon: 'success',
      title: 'Correcto!',
      text: 'Antena pausada correctamente!',
      confirmButtonText: 'Entendido!'
    });
  },

  errorPause: () => {
    Swal.fire({
      icon: 'error',
      title: 'Incorrecto!',
      text: 'La antena no fue pausada!',
      confirmButtonText: 'Entendido!'
    });
  }

}


let saveData = {}, order = 0, saveID = {};

const status_address = {
  0 : { id: 0, value: 0, name: 'Offline', color: 'danger' },
  1 : { id: 1, value: 1,name: 'Online', color: 'success' },
}



const server = {
  windows: 'windows', 
  linux: 'linux'
};



let date = new Date();


// Obtener las direcciones IPv4 //
const getAddresses = async () => {
  try {
    const peticion = await fetch(`PHP/get-addresses.php?order=${order}`);
    const response = await peticion.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}


// Obtener las direcciones IPV4 //
getAddresses()
  .then( addresses => {
    
  addresses !== 0
    ? paintAddresses(addresses)
    : message.clearData();

});


// Ahora cada 3 segundos //
let executionInterval = setInterval(() => {
  
  getAddresses(0)
  .then( addresses => {
    
  addresses !== 0
    ? paintAddresses(addresses)
    : message.clearData();

});

}, 30000);


const paintAddresses = (addresses) => {

    if (addresses === 0) {
      message.clearData();
    }

    if(addresses.length === 0) {
      message.clearData();
    }

    saveData = addresses;

    // Save data addresses db //
    if ( order == 0 ) {
      saveData = Object.values(addresses).sort((a, b) => a.status - b.status )
    }

    if (order == 1) {
      saveData = Object.values(addresses).sort((a, b) => b.status - a.status );
    }    
    
    // Pintame los datos en la tabla //
    Object.values(saveData).forEach( address => {

        itemsAddress.innerHTML = '';

        // Paint data tr //
        const cloneTMP = templateAddress.cloneNode(true);
        const $clone = (selector) => cloneTMP.querySelector(selector);

        $clone('.name').textContent = address.name.toUpperCase();
        $clone('.last-ping').textContent = 'Last Ping: ' + address.ultimo_ping;
        $clone('.address').textContent = address.address;
        $clone('.address').href = `http://${address.address}`;
        $clone('.status').textContent = status_address[address.status].name + ': ' + address.type;
        $clone('.color').classList.add(`bg-${status_address[address.status].color}`);
        $clone('.content-template').classList.add(`border-start-${status_address[address.status].color}`)

        if (address.status == 0 || address.status == 1) {
            $clone('.bi-play').classList.add('d-none');
            $clone('.bi-pause').dataset.id = address.id;
            $clone('.bi-trash').dataset.id = address.id;
            $clone('.bi-pencil-square').dataset.id = address.id;
        }

        if (address.status == 3) {
            $clone('.bi-play').dataset.id = address.address;
            $clone('.bi-pause').classList.add('d-none');
            $clone('.bi-trash').dataset.id = address.id;
            $clone('.bi-pencil-square').dataset.id = address.id;
        }

        if (address.conf_file === "") {
            $clone('.bi-download').classList.add('d-none');
        }

        if (address.conf_file !== "") {
            $clone('.bi-download').href = address.conf_file;
            $clone('.bi-download').download = address.conf_file;
        }

        fragment.appendChild(cloneTMP);

        ping(address); // Hacer Ping //

    });

    itemsAddress.appendChild(fragment);

}


document.addEventListener('click', function (e) {

  if (e.target.classList.contains('bi-pause')) {
    const data = saveData.find( 
      element => element.id == e.target.dataset.id 
    );
    pausedAddress(data);
  }

  if ( e.target.classList.contains('bi-trash') ) {

    const data = saveData.find( 
      element => element.id == e.target.dataset.id 
    );
    
    deleteAddress(data);

  }

  if (e.target.classList.contains('bi-pencil-square')) {

    saveID = saveData.find( 
      element => element.id == e.target.dataset.id 
    );

    if (saveID.length !== 0) {

      editPing.querySelector('.modal-title').textContent = saveID.name;
      editPing.querySelector('#address').value = saveID.address;
      editPing.querySelector('#name').value = saveID.name;
      editPing.querySelector('#type').selectedIndex = saveID.type;

    }
    
  }

  e.stopPropagation();

});


// Pausar una ip //
const pausedAddress = (data) => {

  Swal.fire({
    icon: 'question',
    title: 'Confirmar!',
    text: '¿ Está seguro de pausar a ' + data.name + ' ?',
    confirmButtonText: 'Pausar',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    cancelButtonColor: '#DC2626', 
  })

  .then( promise => {

    if ( promise.isConfirmed ) {
      fetch(`PHP/update-status.php?id=${data.id}&status=${2}`)
        .then( response => response.json())
        .then( status => {
        
        status === 'OK'
          ? message.successPause(data)
          : message.errorPause(data);

          getAddresses()
            .then( addresses => {
            paintAddresses(addresses)
          });

      });
    }

  })

}


// Eliminar una ip //
const deleteAddress = (data) => {

  Swal.fire({
    icon: 'question',
    title: 'Confirmar!',
    text: '¿ Está seguro de eliminar a ' + data.name + ' ?',
    confirmButtonText: 'Eliminar',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    cancelButtonColor: '#DC2626', 
  })

  .then( promise => {

    if ( promise.isConfirmed ) {
      fetch(`PHP/delete-address.php?id=${data.id}`)
        .then( response => response.json())
        .then( status => {
        
        status === 'OK'
          ? message.successDelete(data)
          : message.errorDelete(data);

          getAddresses()
            .then( addresses => {
            paintAddresses(addresses)          
          });

      });
    }

  })

}

editPing.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(editPing);

  if (formData.get('configuration').size === 0) {
    updateData(formData,0,saveID.id)
      .then( status => {

      status === 'OK'
        ? message.successInsert()
        : message.errorInsert();

      getAddresses()
        .then( addresses => {
        paintAddresses(addresses)
      });
      
    });
  }

  if (formData.get('configuration').size !== 0) {
    uploadFile(formData)
      .then( response => {
      if (response === 'OK') {

        updateData(formData,1,saveID.id)
          .then( status => {

          status === 'OK'
            ? message.successInsert()
            : message.errorInsert();

          getAddresses()
            .then( addresses => {
            paintAddresses(addresses);
          });

        });
      }
    })
  }

});


const ping = (address) => {
  
  fetch(`PHP/ping.php?address=${address.address}&type=${address.type}&server=${server.windows}`)
    .then( response => response.json())
    .then( data => {

      if ( data === 0 ) {
        fetch(`PHP/update-status.php?status=0&id=${address.id}`);
      }

      if ( data !== 0 ) {
        processResponse[server.windows](data,address);
      }

  });
}



// Respuesta del ping //
const processResponse = {
  windows : (data,address) => {

    if ( data.split("(")[1].split("%")[0] == 0 && address.type == 'Normal') {
      fetch(`PHP/update-status.php?status=1&id=${address.id}`);
    }

    if ( data.split("(")[1].split("%")[0] == 0 && address.type == 'Scan' ) {
      fetch(`PHP/update-status.php?status=0&id=${address.id}`);
    }

    if ( data.split("(")[1].split("%")[0] != 0  && address.type == 'Normal' ) {
      fetch(`PHP/update-status.php?status=0&id=${address.id}`);
    }

    if ( data.split("(")[1].split("%")[0] != 0  && address.type == 'Scan' ) {
      fetch(`PHP/update-status.php?status=1&id=${address.id}`);
    }
  }, 

  linux: (data, address) => {

    if ( data.split(' ')[3] >= 2 && address.type == 'Normal' ) {
      fetch(`PHP/update-status.php?status=1&id=${address.id}`);
    }

    if ( data && data.split(' ')[3] >= 2 && address.type == 'Scan' ) {
      fetch(`PHP/update-status.php?status=0&id=${address.id}`);
    }

    if ( data && data.split(' ')[3] < 2 && address.type == 'Normal' ) {
      fetch(`PHP/update-status.php?status=0&id=${address.id}`);
    }

    if ( data && data.split(' ')[3] < 2 && address.type == 'Scan' ) {
      fetch(`PHP/update-status.php?status=1&id=${address.id}`);
    }

  }
}



// Ordenar por status //
const options = Object.values(status_address).map(element => `<option value="${element.value}">${element.name}</option>`);
selectStatus.innerHTML = `<option>--Status--</option>${options}`;
selectStatus.addEventListener('change', () => {
  order = Number(selectStatus.value)
  paintAddresses(saveData);
});



// Buscar por parametros //
searchName.addEventListener('submit', e => {

  e.preventDefault();
  const formData = new FormData(searchName);

  const data = Object.values(saveData).filter( element => 
    element.name.toLowerCase()
      .includes(formData.get('searchIP').toLowerCase())
  );

  if (data.length !== 0) {

    // Frenar la ejecucion del ping //
    clearInterval(executionInterval);

    paintAddresses(data);

    // Reiniciar el tiempo //
    executionInterval = setInterval(() => { 

      getAddresses(0)
        .then( addresses => { 
          paintAddresses(addresses)
      });

    }, 30000);


  } else {
    message.clearData();
  }

});


searchIP.addEventListener('keyup', () => {
  if (searchIP.value == '') {
    getAddresses()
      .then( addresses => {
      paintAddresses(addresses);
    });
  }
});


// Agregar una nueva IPv4 //
addPing.addEventListener('submit', e => {

  e.preventDefault();
  const formData = new FormData(addPing);

  const newIPv4 = formData.get('address');

  const validIPv4 = saveData.some (
    element => element.address == newIPv4
  );
  
  validIPv4
    ? message.repeatData(newIPv4)
    : insertData(formData);
  
});


const insertData = (formData) => {

  if (formData.get('configuration').size !== 0) { // Insertar //

    uploadFile(formData)
      .then( response => {

      if (response === 'OK') {

        insertDataBase(formData)
          .then( data => {
          
          data === 'OK'
            ? message.successInsert()
            : message.errorInsert();
          
          // Obtener nuevamente las IP's //
          getAddresses()
            .then( addresses => {
            paintAddresses(addresses)          
          });

        });

      }

      if (response === 0) {
        message.errorFormat();
      }

      if (response === 1) {
        message.errorUpload();
      }

    });
  }


  if (formData.get('configuration').size === 0) { // Upload file //

    insertDataBase(formData)
      .then( data => {
      
      data === 'OK'
        ? message.successInsert()
        : message.errorInsert();
      
      // Obtener nuevamente las IP's //
      getAddresses()
        .then( addresses => {
        paintAddresses(addresses)      
      });

    });

  }

}



// Subir la configuration //
const uploadFile = async(formData) => {
  try {
    
    const peticion = await fetch(`PHP/upload-file.php`, {
      method: 'POST',
      body: formData
    });
    const response = await peticion.json();
    return response;

  } catch (error) {
    console.log(error)
  }
}


// Actualizar datos //
const insertDataBase = async(formData) => {
  try {

    const peticion = await fetch(`PHP/insert-data.php`, {
      method: 'POST',
      body: formData
    });
    const response = await peticion.json();
    return response;

  } catch (error) {
    console.log(error)
  }
}

const updateData = async(formData,file,id) => {
  try {

    const peticion = await fetch(`PHP/update-data.php?file=${file}&id=${id}`, {
      method: 'POST',
      body: formData
    });
    const response = await peticion.json();
    return response;

  } catch (error) {
    console.log(error);
  }
}