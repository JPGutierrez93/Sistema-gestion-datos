$(document).ready(function(){
    
    //borrar datos anteriores
    localStorage.clear()

    //mostrar login
    $('#acceder').click(function(){
        $('#login').fadeToggle(300).css('display','flex');
    });

    //login
   
   var url = $(':header')[0].baseURI;
   var newUrl = url.replace("index.html", "sistema.html");

   $("#ingresar").click(function(e){
    
        e.preventDefault();
        var email = $('#email').val();
        var password = $('#password').val();
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3700/api/login',
            data: { email , password },
            success: function(resultData){
                localStorage.setItem('Bearer', resultData.token);
                location.href = newUrl;
            },
            error: function(type,error,errord){
                console.log('errors: ',type, error, errord);
                $('#error').show();
            }  
        });   
    });

    //Ocultar mensaje de error al hacer focus en inputs

    $('.input').click(function(){
        $('#error').hide(100);
    });

});
