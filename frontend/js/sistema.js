'use strict'
$(document).ready(function(){
    
    var url = $(':header')[0].baseURI
    var newUrl = url.replace("sistema.html", "index.html")

    //Boton salir

    $('#salir').click(function(){
        localStorage.clear()
        location.href = newUrl
    })

    //Funcion calcular edad 

    function calcularEdad(birthday) {
        var birthday_arr = birthday.split("/");
        var birthday_date = new Date(birthday_arr[2], birthday_arr[1] - 1, birthday_arr[0]);
        var ageDifMs = Date.now() - birthday_date.getTime();
        var ageDate = new Date(ageDifMs);

        var age = Math.abs(ageDate.getUTCFullYear() - 1970);
        return age
    }


    
    //comprobación usuario
    if(localStorage.getItem('Bearer') === null){
        $('#salir').hide()
        $('#botones-abajo').hide()
        $('#contenedor').hide()
        $('#oculto').show()

        setTimeout(
            function() 
            {
                location.href = newUrl
            }, 4000);
        
    }
    
    var token = localStorage.getItem('Bearer')

    //boton para traer todos los datos
    $('#projects').click(function(){
        $('p').remove(".append")
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3700/api/projects',
            data: {},
            headers: {'Authorization': 'Bearer '+token},
            success: function(response){
                
                var persona = response.projects
                var arrayId = []

                for (let i = 0; i < persona.length; i++) {
                    const idPersona = persona[i]._id
                    const nombre = persona[i].nombre
                    const apellido = persona[i].apellido
                    const dni = persona[i].dni
                    const nacimiento = persona[i].nacimiento
                    const edad = calcularEdad(nacimiento)
                    const domicilio = persona[i].domicilio
                    const mail = persona[i].mail
                    const comentario = persona[i].comentario;
                    var parrafo = $('#personas').append('<p class="list-group-item list-group-item-action append" id="'+i+'">'+nombre+' '+apellido+'</p>');

                    arrayId.push(idPersona);

                    if(i == persona.length-1){
                        $('.append').on('click', function() {
                            $('.append').removeClass('appendActive')
                            $(this).addClass('appendActive')
            
                            var id = $(this).attr('id')

                            $('#nombre').val(persona[id].nombre)
                            $('#apellido').val(persona[id].apellido) 
                            $('#dni').val(persona[id].dni) 
                            $('#nacimiento').val(persona[id].nacimiento)
                            $('#edad').val(calcularEdad(persona[id].nacimiento))
                            $('#domicilio').val(persona[id].domicilio)
                            $('#email').val(persona[id].mail)
                            $('#comentario').val(persona[id].comentario)

                            var idClickeada = arrayId[id]
                            localStorage.setItem('idClickeada', idClickeada)
                        }) 
                    }
                };

                

            },
            error: function(type,error,errord){
                console.log(error,errord);
            }
            
        }); 
    });

    //boton para mostrar el search por nombre
    $('#showName').click(function(){
        $('#divDni').hide()
        $('#divName').toggle()
    })

    //boton para mostrar el search por dni
    $('#showDni').click(function(){
        $('#divName').hide()
        $('#divDni').toggle()
    })

    //boton para buscar por nombre

    $('#byName').click(function(){
        $('p').remove(".append")
        let name = $('#name').val()
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3700/api/projects/byname',
            data: {name: name},
            headers: {'Authorization': 'Bearer '+token},
            success: function(response){
                
                var persona = response.projects
                var arrayId = []

                for (let i = 0; i < persona.length; i++) {
                    const idPersona = persona[i]._id
                    const nombre = persona[i].nombre
                    const apellido = persona[i].apellido
                    const dni = persona[i].dni
                    const nacimiento = persona[i].nacimiento
                    const edad = calcularEdad(nacimiento)
                    const domicilio = persona[i].domicilio
                    const mail = persona[i].mail
                    const comentario = persona[i].comentario;
                    var parrafo = $('#personas').append('<p class="list-group-item list-group-item-action append" id="'+i+'">'+nombre+' '+apellido+'</p>');

                    arrayId.push(idPersona);

                    if(i == persona.length-1){
                        $('.append').on('click', function() {
                            $('.append').removeClass('appendActive')
                            $(this).addClass('appendActive')
    
                            var id = $(this).attr('id')

                            $('#nombre').val(persona[id].nombre)
                            $('#apellido').val(persona[id].apellido) 
                            $('#dni').val(persona[id].dni) 
                            $('#nacimiento').val(persona[id].nacimiento)
                            $('#edad').val(calcularEdad(persona[id].nacimiento))
                            $('#domicilio').val(persona[id].domicilio)
                            $('#email').val(persona[id].mail)
                            $('#comentario').val(persona[id].comentario)

                            var idClickeada = arrayId[id]
                            localStorage.setItem('idClickeada', idClickeada)
                        }) 
                    }
                };

                

            },
            error: function(type,error,errord){
                console.log(type,error,errord);
            }
            
        }); 
    })

    //boton para buscar por dni

    $('#byDni').click(function(){
        $('p').remove(".append")
        let documento = $('#documento').val()
        console.log(documento)
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3700/api/projects/bydni',
            data: {documento: documento},
            headers: {'Authorization': 'Bearer '+token},
            success: function(response){
                
                var persona = response.projects
                var arrayId = []

                for (let i = 0; i < persona.length; i++) {
                    const idPersona = persona[i]._id
                    const nombre = persona[i].nombre
                    const apellido = persona[i].apellido
                    const dni = persona[i].dni
                    const nacimiento = persona[i].nacimiento
                    const edad = calcularEdad(nacimiento)
                    const domicilio = persona[i].domicilio
                    const mail = persona[i].mail
                    const comentario = persona[i].comentario;
                    var parrafo = $('#personas').append('<p class="list-group-item list-group-item-action append" id="'+i+'">'+nombre+' '+apellido+'</p>');

                    arrayId.push(idPersona);

                    if(i == persona.length-1){
                        $('.append').on('click', function() {
                            $('.append').removeClass('appendActive')
                            $(this).addClass('appendActive')

                            var id = $(this).attr('id')

                            $('#nombre').val(persona[id].nombre)
                            $('#apellido').val(persona[id].apellido) 
                            $('#dni').val(persona[id].dni) 
                            $('#nacimiento').val(persona[id].nacimiento)
                            $('#edad').val(calcularEdad(persona[id].nacimiento))
                            $('#domicilio').val(persona[id].domicilio)
                            $('#email').val(persona[id].mail)
                            $('#comentario').val(persona[id].comentario)

                            var idClickeada = arrayId[id]
                            localStorage.setItem('idClickeada', idClickeada)
                        }) 
                    }
                };

                

            },
            error: function(type,error,errord){
                console.log(type,error,errord);
            }
            
        });
    })
    //Botones para ver las funciones CREAR MODIFICAR ELIMINAR

    $('#showCrear').click(function(){
        $('#modificar').hide()
        $('#eliminar').hide()
        $('#crear').show()
    });

    $('#showModificar').click(function(){
        $('#crear').hide()
        $('#eliminar').hide()
        $('#modificar').show()
    });

    $('#showEliminar').click(function(){
        $('#crear').hide()
        $('#modificar').hide()
        $('#eliminar').show()
    });

    //VER

    $('#ver').click(function(){
        location.reload();
    })

    //Crear nuevo registro
    

    $('#showCrear').click(function(){
        let input = $('.input')

        input.removeAttr('readonly')
        input.addClass('inputeditable')
        input.val('')
        $('.append').removeClass('appendActive')
        localStorage.setItem('idClickeada','')
    });

    $('#crear').click(function(){
        let nombre = $('#nombre').val()
        let apellido = $('#apellido').val() 
        let dni = $('#dni').val() 
        let nacimiento = $('#nacimiento').val()
        let domicilio = $('#domicilio').val()
        let email = $('#email').val()
        let comentario = $('#comentario').val()  
        

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3700/api/save-project',
            headers: {'Authorization': 'Bearer '+token},
            data: { nombre: nombre, apellido: apellido, dni: dni, nacimiento: nacimiento, domicilio: domicilio, mail: email, comentario: comentario },
            success: function(response){
                alert('Usuario '+nombre+ ' guardado con éxito!')
                location.reload();
               
            },
            error: function(type,error,errord){
                console.log(type,error,errord);
            }
            
        });
    });
    
    //Actualizar registro

    $('#showModificar').click(function(){
    
        let input = $('.input')
        input.val('')
        input.removeAttr('readonly')
        input.addClass('inputeditable')
        $('.append').removeClass('appendActive')
        localStorage.setItem('idClickeada','')
        alert('Busque y seleccione el fichero a modificar')
    });

    $('#modificar').click(function(){
        let idClickeada = localStorage.getItem('idClickeada')
        
        if(idClickeada.length < 10){
            alert('Busque y seleccione el fichero a modificar')
        }else{
            let nombre = $('#nombre').val()
            let apellido = $('#apellido').val() 
            let dni = $('#dni').val() 
            let nacimiento = $('#nacimiento').val()
            let domicilio = $('#domicilio').val()
            let email = $('#email').val()
            let comentario = $('#comentario').val() 

            let idPersona = localStorage.getItem('idClickeada')

            $.ajax({
                type: 'PUT',
                url: 'http://localhost:3700/api/project/'+idPersona,
                headers: {
                        'Authorization': 'Bearer '+token, 
                },
                data: { nombre: nombre, apellido: apellido, dni: dni, nacimiento: nacimiento, domicilio: domicilio, mail: email, comentario: comentario },
                success: function(response){
                    alert('Usuario '+nombre+ ' modificado con éxito!')
                    location.reload();
                   
                },
                error: function(type,error,errord){
                    console.log(type,error,errord);
                }
                
            });


        }

    });
    
    //ELIMINAR REGISTRO

    $('#showEliminar').click(function(){
    
        let input = $('.input')
        input.val('')
        $('.append').removeClass('appendActive')
        localStorage.setItem('idClickeada','')
        alert('Busque y seleccione el fichero a eliminar')
        
    });
    
    $('#eliminar').click(function(){
        let idClickeada = localStorage.getItem('idClickeada')
        let nombre = $('#nombre').val()

        if(idClickeada.length < 10){
            alert('Busque y seleccione el fichero a eliminar')
        }else{
            
            let idPersona = localStorage.getItem('idClickeada')

            $.ajax({
                type: 'DELETE',
                url: 'http://localhost:3700/api/project/'+idPersona,
                headers: {
                        'Authorization': 'Bearer '+token, 
                },
                success: function(response){
                    alert('Usuario '+nombre+ ' eliminado con éxito!')
                    location.reload();
                   
                },
                error: function(type,error,errord){
                    console.log(type,error,errord);
                }
                
            });


        }

    });
})

