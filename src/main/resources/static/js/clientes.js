// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarClientes();
  $('#clientes').DataTable();
});

function getHeaders(){
       return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': localStorage.token
        };
}

/*Funcion que solicita los datos guardadis de los usuarios
  de forma asincrona.
*/
async function cargarClientes(){
      const request = await fetch('api/clientes', {
        method: 'GET',
        headers: getHeaders()
      });
      const clientes = await request.json();

      //console.log(clientes);

      let listadoHtml = '';

      //Se listan los datos para mostrarlos en forma ordenada en la tabla correspondiente
      for(let cliente of clientes){
       let botonEliminar = '<a href="#" onclick="eliminarCliente(' + cliente.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="bi bi-trash3"></i></a>';
       let botonModificar = '<button onclick="getInfoCliente(' + cliente.id + ')" class="btn btn-info btn-circle btn-sm" data-toggle="modal" data-target="#ventanaModal"><i class="bi bi-pencil"></i></button>';

       let telefonoTexto = (cliente.telefono == null || cliente.telefono == '') ? '-' : cliente.telefono;

       let clienteHtml = '<tr><td>'+ cliente.id +'</td><td>' + cliente.nombre + '</td><td>' + cliente.apellido + '</td><td>'
       + cliente.domicilio + '</td><td>'
       + telefonoTexto + '</td><td>' + '$ ' + cliente.compra +  '</td><td>' + botonEliminar + ' ' + botonModificar +'</td></tr>'

        listadoHtml += clienteHtml;
      }

      //Se crean las filas para los datos extraidos de la base de datos
      document.querySelector('#clientes tbody').outerHTML = listadoHtml;
}

//Función para mostrar la información del cliente en el Modal para poder Editarla
async function getInfoCliente (id){
    const request = await fetch('api/clientes/' + id, {
            method: 'GET',
            headers: getHeaders()
          });
          const clientes = await request.json();

        //console.log(clientes);

        for(let clie of clientes){
            document.getElementById("txtNombre").value = clie.nombre;
            document.getElementById("txtApellido").value = clie.apellido;
            document.getElementById("txtTelefono").value = clie.telefono;
            document.getElementById("txtDomicilio").value = clie.domicilio;
            document.getElementById("txtCompra").value = clie.compra;
        }
}

//Función para editar la información del cliente seleccionado
//(Seguir modificando para que se pueda modificar y no agregue como uno nuevo el registro dado)
async function editarCliente(){
    let datosCliente = {};

    datosCliente.apellido = document.getElementById("txtApellido").value;
    datosCliente.nombre = document.getElementById("txtNombre").value;
    datosCliente.domicilio = document.getElementById("txtDomicilio").value;
    datosCliente.telefono = document.getElementById("txtTelefono").value;
    datosCliente.compra = parseFloat(document.getElementById("txtCompra").value);

    const request = await fetch('api/clientes/', {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(datosCliente)
              });

    alert("Información Actualizada con Éxito");
    location.reload();
}

//Función para eliminar registro de cliente por medio del Id
async function eliminarCliente (id){

    if(!confirm('¿Desea eliminar este Cliente?')){
        return;
    }

    const request = await fetch('api/clientes/' + id, {
            method: 'DELETE',
            headers: getHeaders()
          });

    location.reload();
}

