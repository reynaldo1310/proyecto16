$(function () {

   // Cargar los datos al cargar la página
cargarDatosYLista();

// Función para cargar los datos y luego la lista
function cargarDatosYLista() {
    $.ajax({
        url: 'https://my-json-server.typicode.com/desarrollo-seguro/datos/solicitudes', // URL corregida
        method: 'GET',
        beforeSend: function () {
            $("#cargando").show();  // Mostrar indicador de carga
        },
        success: function (data) {
            cargarLista(data);
        },
        error: function (error) {
            console.error('Error al obtener los datos:', error);
            alert('No se pudo obtener los datos. Inténtalo de nuevo.');
        },
        complete: function () {
            $("#cargando").hide();  // Ocultar indicador de carga
        }
    });
}

// Función para cargar las solicitudes en la lista
function cargarLista(solicitudes) {
    const $cuerpoLista = $("#lista");
    $cuerpoLista.empty(); 

    if (solicitudes.length === 0) {
        $cuerpoLista.append("<li>No hay registros disponibles.</li>");
    } else {
        solicitudes.forEach((persona) => {
            const elemento = `
                <li data-id="${persona.id}">
                    <span>${persona.nombre} ${persona.apellido}</span>
                    <button class="botonBorrar" data-id="${persona.id}">Borrar</button>
                </li>`;
            $cuerpoLista.append(elemento);
        });
    }

    // Boton borrar
    $('.botonBorrar').on('click', function (e) {
        e.stopPropagation(); 

        // Obtener el ID 
        const id = $(this).data('id');
        const url = `https://my-json-server.typicode.com/desarrollo-seguro/datos/solicitudes/${id}`; // URL corregida

        if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
            const $boton = $(this);  // Guardar el botón
            $.ajax({
                url: url,
                method: 'DELETE',
                success: function () {
                    alert('Registro eliminado con éxito');
                    $boton.closest('li').remove();
                },
                error: function (error) {
                    console.error('Error al eliminar:', error);
                    alert('No se pudo eliminar el registro. Inténtalo de nuevo.');
                }
            });
        }
    });
}

// Boton actualizar
$("#botonRefrescar").on('click', function () {
    cargarDatosYLista();  // Recargar los datos
});

$("#botonNuevo").on('click', function () {
    $(".detalleSub1").hide(); // Ocultar el detalleUpdate si está visible
    $(".detalle").toggle(); // Mostrar el detalle
    // Limpiar los campos
    $("#nombre").val("");
    $("#apellido").val("");
});

// Boton cancelar
$(".botonCancelar").on('click', function () {
    $(".detalle").hide();
    $(".detalleUpdate").hide();
});

// Boton guardar (POST)
$("#botonGuardar").on('click', function () {
    // Eliminar los espacios en blanco
    const nombre = $("#nombre").val().trim();
    const apellido = $("#apellido").val().trim();

    // Validar los campos
    if (nombre === "" || apellido === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Crear un objeto con los datos del nuevo registro
    const data = { nombre: nombre, apellido: apellido };

    // Hacer un POST al servidor para agregar el nuevo registro
    $.ajax({
        url: 'https://my-json-server.typicode.com/desarrollo-seguro/datos/solicitudes', // URL corregida
        method: 'POST',
        data: JSON.stringify(data), // Convertir a JSON
        success: function () {
            alert('Registro guardado con éxito');
            cargarDatosYLista();  // Recargar los datos y la lista después de guardar el registro
            $(".detalle").hide();  // Ocultar el formulario
        },
        error: function (error) {
            console.error('Error al guardar el registro:', error);
            alert('No se pudo guardar el registro. Inténtalo de nuevo.');
        }
    });
});

// Hacer clic en un elemento de la lista
$('#lista').on('click', 'li', function (e) {
    if (!$(e.target).hasClass('botonBorrar')) {
        
        const id = $(this).data('id');

        
        const nombre = $(this).find('span').text().split(' ')[0]; 
        const apellido = $(this).find('span').text().split(' ')[1]; 

       
        $("#nombreSub1").val(nombre);
        $("#apellidoSub2").val(apellido);

        // Mostrar la zona de detalle
        $(".detalleSub1").show();
        // Ocultar el .detalle si está activo
        $(".detalle").hide();

        // Guardar el ID en un campo oculto
        $("#detalleId").val(id);
    }
});

// Botón editar
$('#botonEditar').on('click', function () {
    const nombre = $("#nombreUpdate").val().trim();
    const apellido = $("#apellidoUpdate").val().trim();
    const id = $("#detalleId").val();

    // Validar los campos
    if (nombre === "" || apellido === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const data = {
        nombre: nombre,
        apellido: apellido
    };

    
    $.ajax({
        url: `https://my-json-server.typicode.com/desarrollo-seguro/datos/solicitudes/${id}`, // URL corregida
        method: 'PUT',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function () {
            alert('Registro actualizado con éxito');
            cargarDatosYLista();  
            $(".detalleUpdate").hide();  
        },
        error: function (error) {
            console.error('Error al actualizar el registro:', error);
            alert('No se pudo actualizar el registro. Inténtalo de nuevo.');
        }
    });
});