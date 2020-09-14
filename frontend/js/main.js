$(document).ready(function(){
    
    //borrar datos anteriores
    localStorage.clear()

    //mostrar login
    $('#acceder').click(function(){
        $('#login').fadeToggle(800)
    });

    //login
   
    
   var url = $(':header')[0].baseURI
   var newUrl = url.replace("index.html", "sistema.html")

   $("#ingresar").click(function(e){
    
        e.preventDefault()
        var email = $('#email').val();
        var password = $('#password').val();
        var token = ''
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3700/api/login',
            data: { email: email , password: password },
            success: function(resultData){
                var token = resultData.token;
                console.log(token)
                localStorage.setItem('Bearer', token )
                location.href = newUrl
            },
            error: function(type,error,errord){
                console.log(error,errord);
                $('#error').show();
            }
            
            
        });   
    });



});
