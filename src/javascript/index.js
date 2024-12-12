$(function () {

    // Cargar los datos al cargar la página
    cargarDatosYLista();

    // Función para cargar los datos y luego la lista
    function cargarDatosYLista() {
        $.ajax({
            url: 'https://my-json-server.typicode.com/desarrollo-seguro/dato/solicitudes',
            method: 'GET',
            success: function (data) {
                // Llamar a la función para cargar la lista con los datos obtenidos
                cargarLista(data);
            },
            error: function (error) {
                console.error('Error al obtener los datos:', error);
                alert('No se pudo obtener los datos. Inténtalo de nuevo.');
            }
        });
    }

    // Función para cargar las solicitudes en la lista
    function cargarLista(solicitudes) {
        const $cuerpoLista = $("#lista");
        $cuerpoLista.empty(); // Limpiar lista

        // Recorrer las solicitudes y crear elementos dinámicos
        solicitudes.forEach((persona) => {
            const elemento = `
                <li data-id="${persona.id}">
                    <span>${persona.nombre} ${persona.apellido}</span>
                    <button class="botonBorrar" data-id="${persona.id}">Borrar</button>
                </li>`;
            $cuerpoLista.append(elemento);
        });

        // Boton borrar
        $('.botonBorrar').on('click', function (e) {
            e.stopPropagation(); // Detener la propagación del evento

            // Obtener el ID del recurso desde el atributo data-id del botón
            const id = $(this).data('id');
            const url = `https://my-json-server.typicode.com/desarrollo-seguro/dato/solicitudes/${id}`;

            // Confirmación de eliminación
            if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
                // Petición AJAX DELETE
                $.ajax({
                    url: url,
                    method: 'DELETE',
                    success: function () {
                        alert('Registro eliminado con éxito');
                        // Eliminar el elemento de la lista
                        $(this).closest('li').remove();
                    }.bind(this),
                    error: function (error) {
                        console.error('Error al eliminar:', error);
                        alert('No se pudo eliminar el registro. Inténtalo de nuevo.');
                    }
                });
            }
        });
    }

    // Boton refrescar
    $("#botonRefrescar").on('click', function () {
        $.ajax({
            url: 'https://my-json-server.typicode.com/desarrollo-seguro/dato/solicitudes',
            method: 'GET',
            success: function (data) {
                cargarLista(data);
            },
            error: function (error) {
                console.error('Error al obtener los datos:', error);
                alert('No se pudo obtener los datos. Inténtalo de nuevo.');
            }
        });
    });

    // Boton nuevo
    $("#botonNuevo").on('click', function () {
        $(".detalleUpdate").hide(); // Ocultar el detalleUpdate si está visible
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
            url: 'https://my-json-server.typicode.com/desarrollo-seguro/dato/solicitudes',
            method: 'POST',
            data: JSON.stringify(data), // Convertir a JSON
            success: function (data) {
                alert('Registro guardado con éxito');
                // Recargar los datos y la lista después de guardar el registro
                cargarDatosYLista();
                // Ocultar el formulario
                $(".detalle").hide();
            },
            error: function (error) {
                console.error('Error al guardar el registro:', error);
                alert('No se pudo guardar el registro. Inténtalo de nuevo.');
            }
        });
    });

    // Hacer clic en un elemento de la lista
    $('#lista').on('click', 'li', function (e) {
        // Comprobar si el clic no fue en un botón de borrar
        if (!$(e.target).hasClass('botonBorrar')) {
            // Obtener el ID desde el atributo data-id del elemento
            const id = $(this).data('id');

            // Guardar el nombre y apellido del elemento que se ha hecho clic
            const nombre = $(this).find('span').text().split(' ')[0]; // Primer palabra (nombre)
            const apellido = $(this).find('span').text().split(' ')[1]; // Segunda palabra (apellido)

            // En los input ponemos el nombre y apellido
            $("#nombreUpdate").val(nombre);
            $("#apellidoUpdate").val(apellido);

            // Mostrar la zona de detalle
            $(".detalleUpdate").show();
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

        // Realizar la petición PUT para actualizar el registro
        $.ajax({
            url: `https://my-json-server.typicode.com/desarrollo-seguro/dato/solicitudes/${id}`,
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
});