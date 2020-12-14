'use strict'
$(document).ready(function(){
    
    var url = $(':header')[0].baseURI;
    var newUrl = url.replace("sistema.html", "index.html");

    //Boton salir

    $('#exit').click(function(){
        localStorage.clear();
        location.href = newUrl;
    });

    //Funcion calcular edad 

    function calcularEdad(birthday) {
        var birthday_arr = birthday.split("/");
        var birthday_date = new Date(birthday_arr[2], birthday_arr[1] - 1, birthday_arr[0]);
        var ageDifMs = Date.now() - birthday_date.getTime();
        var ageDate = new Date(ageDifMs);

        var age = Math.abs(ageDate.getUTCFullYear() - 1970);
        return age;
    };


    //comprobación usuario
    if(localStorage.getItem('Bearer') === null){
        $('#exit').hide();
        $('#container').hide();
        $('#hiddenAlert').show();

        setTimeout(
            function(){
                location.href = newUrl;
            }, 4000);
        
    };
    
    var token = localStorage.getItem('Bearer');

    //Clear search inputs 
    function clearSearchInputs(){
        $('#name').val('');
        $('#documento').val('');
        $('#divDni').hide();
        $('#divName').hide();

    }

    //boton para traer todos los datos
    $('#allData').click(function(){
        $('p').remove(".append");
        clearSearchInputs();
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3700/api/all-data',
            data: {},
            headers: {'Authorization': 'Bearer '+token},
            success: function(response){
                
                const personas = response.data;
                const data = personas.sort((a,b)=>{
                    return a.nombre.charCodeAt(0) - b.nombre.charCodeAt(0)
                });
                const arrayId = [];

                for (let i = 0; i < data.length; i++) {
                    const idPersona = data[i]._id;
                    const nombre = data[i].nombre;
                    const apellido = data[i].apellido;

                    $('#dataList').append('<p class="list-group-item list-group-item-action append" id="'+i+'">'+nombre+' '+apellido+'</p>');

                    arrayId.push(idPersona);

                    if(i == data.length-1){
                        $('.append').on('click', function() {
                            $('.append').removeClass('appendActive');
                            $(this).addClass('appendActive');
            
                            var id = $(this).attr('id');

                            $('#nombre').val(data[id].nombre);
                            $('#apellido').val(data[id].apellido);
                            $('#dni').val(data[id].dni);
                            $('#nacimiento').val(data[id].nacimiento);
                            $('#edad').val(calcularEdad(data[id].nacimiento));
                            $('#domicilio').val(data[id].domicilio);
                            $('#email').val(data[id].mail);
                            $('#comentario').val(data[id].comentario);

                            var idClickeada = arrayId[id];
                            localStorage.setItem('idClickeada', idClickeada);
                        });
                    };
                };

                

            },
            error: function(type,error,errord){
                console.log(error,errord);
            }
            
        }); 
    });

    //boton para mostrar el search por nombre
    $('#showName').click(function(){
        $('p').remove(".append");
        clearSearchInputs();
        $('#divName').toggle(200).css('display','flex');
        $('#name').focus();
    })

    //boton para mostrar el search por dni
    $('#showDni').click(function(){
        $('p').remove(".append");
        clearSearchInputs();
        $('#divDni').toggle(200).css('display','flex');
        $('#documento').focus();
    })

    //boton para buscar por nombre

    $('#byName').click(function(){
        let name = $('#name').val();
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3700/api/all-data/byname',
            data: {name},
            headers: {'Authorization': 'Bearer '+token},
            success: function(response){

                var persona = response.data;
                var arrayId = [];

                for (let i = 0; i < persona.length; i++) {
                    const idPersona = persona[i]._id;
                    const nombre = persona[i].nombre;
                    const apellido = persona[i].apellido;

                    $('#dataList').append('<p class="list-group-item list-group-item-action w-100 append" id="'+i+'">'+nombre+' '+apellido+'</p>');

                    arrayId.push(idPersona);

                    if(i == persona.length-1){
                        $('.append').on('click', function() {
                            $('.append').removeClass('appendActive');
                            $(this).addClass('appendActive');
    
                            var id = $(this).attr('id');

                            $('#nombre').val(persona[id].nombre);
                            $('#apellido').val(persona[id].apellido);
                            $('#dni').val(persona[id].dni);
                            $('#nacimiento').val(persona[id].nacimiento);
                            $('#edad').val(calcularEdad(persona[id].nacimiento));
                            $('#domicilio').val(persona[id].domicilio);
                            $('#email').val(persona[id].mail);
                            $('#comentario').val(persona[id].comentario);

                            var idClickeada = arrayId[id];
                            localStorage.setItem('idClickeada', idClickeada);
                        });
                    };
                };
            },
            error: function(type,error,errord){
                console.log(type,error,errord);
            }
            
        }); 
    })

    //boton para buscar por dni

    $('#byDni').click(function(){
        $('p').remove(".append");
        let documento = $('#documento').val();
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3700/api/all-data/bydni',
            data: { documento },
            headers: {'Authorization': 'Bearer '+token},
            success: function(response){
                
                var persona = response.data;
                var arrayId = [];

                for (let i = 0; i < persona.length; i++) {
                    const idPersona = persona[i]._id;
                    const nombre = persona[i].nombre;
                    const apellido = persona[i].apellido;
                    $('#dataList').append('<p class="list-group-item list-group-item-action w-100 append" id="'+i+'">'+nombre+' '+apellido+'</p>');

                    arrayId.push(idPersona);

                    if(i == persona.length-1){
                        $('.append').on('click', function() {
                            $('.append').removeClass('appendActive');
                            $(this).addClass('appendActive');

                            var id = $(this).attr('id');

                            $('#nombre').val(persona[id].nombre);
                            $('#apellido').val(persona[id].apellido);
                            $('#dni').val(persona[id].dni);
                            $('#nacimiento').val(persona[id].nacimiento);
                            $('#edad').val(calcularEdad(persona[id].nacimiento));
                            $('#domicilio').val(persona[id].domicilio);
                            $('#email').val(persona[id].mail);
                            $('#comentario').val(persona[id].comentario);

                            var idClickeada = arrayId[id];
                            localStorage.setItem('idClickeada', idClickeada);
                        });
                    };
                };
            },
            error: function(type,error,errord){
                console.log(type,error,errord);
            }
        });
    });
    
    //Funciones auxiliares
    function hideButtons(){
        $('#modificar').hide();
        $('#eliminar').hide();
        $('#crear').hide();
    };

    function removeClassClicked(){
        $('.crud').removeClass("clicked");
    };

    //VER

    $('#ver').click(function(){
        location.reload();
    });

    //Crear nuevo registro
    
    $('#showCrear').click(function(){
        hideButtons();
        removeClassClicked();
        $(this).addClass('clicked');
        $('#crear').show();
        let input = $('.input');
        input.removeAttr('readonly');
        input.val('');
        $('.append').removeClass('appendActive');
        localStorage.setItem('idClickeada','');
    });

    $('#crear').click(function(){
        let nombre = $('#nombre').val();
        let apellido = $('#apellido').val();
        let dni = $('#dni').val();
        let nacimiento = $('#nacimiento').val();
        let domicilio = $('#domicilio').val();
        let email = $('#email').val();
        let comentario = $('#comentario').val();
        
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3700/api/save-data',
            headers: {'Authorization': 'Bearer '+token},
            data: { nombre, apellido, dni, nacimiento, domicilio, mail: email, comentario },
            success: function(){
                alert('Usuario ' + nombre + ' guardado con éxito!');
                location.reload();
            },
            error: function(type,error,errort){
                alert('Un error ha ocurrido, contacte al desarrollador');
                console.log(type,error,errort);
            } 
        });
    });
    
    //Actualizar registro

    $('#showModificar').click(function(){
        hideButtons();
        removeClassClicked();
        $(this).addClass('clicked');
        $('#modificar').show();

        let input = $('.input');
        input.val('');
        input.removeAttr('readonly');
        localStorage.setItem('idClickeada','');
        alert('Busque y seleccione el fichero a modificar');
    });

    $('#modificar').click(function(){
        let idClickeada = localStorage.getItem('idClickeada');
        
        if(idClickeada.length < 10){
            alert('Busque y seleccione el fichero a modificar');
        }else{
            let nombre = $('#nombre').val();
            let apellido = $('#apellido').val();
            let dni = $('#dni').val();
            let nacimiento = $('#nacimiento').val();
            let domicilio = $('#domicilio').val();
            let email = $('#email').val();
            let comentario = $('#comentario').val();

            let idPersona = localStorage.getItem('idClickeada');

            $.ajax({
                type: 'PUT',
                url: 'http://localhost:3700/api/data/' + idPersona,
                headers: {
                        'Authorization': 'Bearer '+token, 
                },
                data: { nombre, apellido, dni, nacimiento, domicilio, mail: email, comentario },
                success: function(){
                    alert('Usuario ' + nombre + ' modificado con éxito!')
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
        hideButtons();
        removeClassClicked();
        $(this).addClass('clicked');
        $('#eliminar').show();
        let input = $('.input');
        input.val('');
        localStorage.setItem('idClickeada','');
        alert('Busque y seleccione el fichero a eliminar');
    });
    
    $('#eliminar').click(function(){
        let idClickeada = localStorage.getItem('idClickeada');
        let nombre = $('#nombre').val();

        if(idClickeada.length < 10){
            alert('Busque y seleccione el fichero a eliminar');
        }else{
            
            let idPersona = localStorage.getItem('idClickeada');

            $.ajax({
                type: 'DELETE',
                url: 'http://localhost:3700/api/data/'+idPersona,
                headers: {
                        'Authorization': 'Bearer '+token, 
                },
                success: function(){
                    alert('Usuario '+nombre+ ' eliminado con éxito!');
                    location.reload();
                   
                },
                error: function(type,error,errord){
                    console.log(type,error,errord);
                }
            });
        };
    });
})

