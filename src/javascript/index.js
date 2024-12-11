$(document).ready(function () {

    // Tabla de Arrays 
    let solicitudes = [{
        "id": 1,
        "nombre": "Juan",
        "apellido": "Secreto"
        }, {
        "id": 2,
        "nombre": "Antonio",
        "apellido": "Pero"
        }, {
        "id": 3,
        "nombre": "de la Encarnación",
        "apellido": "No tanto"
         }, {
        "id": 4,
        "nombre": "Rey",
        "apellido": "Contreras"
        }
        ];


        for (i = 0 ; i < solicitudes.length; i++ ) {
            $("#maestro").append(
                $("<li>")
                    .text(solicitudes[i].nombre + ' ' + solicitudes[i].apellido)
                    .val(solicitudes[i])
                    .attr("id", "id" + solicitudes[i].id)
            );
        }
    
    
    
        $("li").on("click", function(event) {
            if ($("#detalle").is(':visible')) {
                $("#detalle").hide();
            } else {
                $("#detalle").show();
    
                let solicitud = $(this).attr("id");
    
                $("#id").val(solicitud);
                $("#nombre").val("Juan"  + solicitud);
                $("#apellido").val("Secreto" + solicitud);            
            }
            
        })
    });
