// Attach a submit handler to the form
$( "#theJQueryForm" ).on( "submit", function( event ) {
    // Stop form from submitting normally
    event.preventDefault();
    //validación del nombre
    $.validator.addMethod("customname",
        function (value, element) {
            return /^([a-zA-Z'À-ÿ-.])/.test(value);
        },
        "<div class='regular_required_msg'>Por favor ingrese el nombre correcto</div>"
    );
    //Validación del email
    $.validator.addMethod("customemail", 
        function(value, element) {
            return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
        }, 
        "<div class='regular_required_msg'>El correo no es una dirección válida</div>"
    );  
    $('#theJQueryForm').validate({ 
        errorElement: "div",
        rules: {
            'first_name': {
                required: true,
                customname: true,
            }, 
            'email': {
                required: true,
                customemail: true,
                "remote":{
                    //Agregar la url de la cloudpage que contiene la validación del email, está en email-validation.amp
                    url: 'https://mcfmxk1g37c1jn91t2tp6mmtn3l1.pub.sfmc-content.com/kgadpqnxldu',
                    type: "post",
                    data:
                    {
                        unique_id: function () {
                            return $('#email').val();
                        }
                    }
                } 
            },         
            'optin': {
               required: true
            },
        },
        messages: {
            'first_name': {
            required: "<div class='regular_required_msg'>Por favor, verifica tu nombre.</div>"
            },
            'email': {
                required: "<div class='regular_required_msg'>Por favor, verifica tu correo electrónico.</div>",
                email: "<div class='regular_required_msg'>Por favor, verifica tu correo electrónico.</div>",
                remote: "<div class='regular_required_msg'>El email ya está registrado.</div>",
            },
            'optin': {
                required: "<div class='regular_required_msg'>Acepta la política de privacidad</div>"
            },           
        },
        errorPlacement: function(error, element) {
            if (element.attr("name") == "terms_co")
            error.insertAfter(".main-error1"); 
            else if  (element.attr("name") == "optin")
                error.insertAfter(".main-error2");    
            else
                error.insertAfter(element);
        },
        submitHandler: function(form) {
        $("#submitBtn").attr("disabled", true);
        // Get some values from elements on the page:
        var $form = $( this ),
        form_first_name = $form.find( "input[name='first_name']" ).val(),
        form_email = $form.find( "input[name='email']" ).val(),
        form_campaign = $form.find( "input[name='campaign']" ).val(),
        //moved the url from the form action to here so it's "hidden" lol
        url = "https://mcfmxk1g37c1jn91t2tp6mmtn3l1.pub.sfmc-content.com/ozshjgkzgho";
        // Send the data using post
        var posting = $.post( url, { first_name: form_first_name, email: form_email, campaign: form_campaign } );
        // Put the results in a div
        posting.done(function( data ) {
        var content = $( data );
        $( "#result" ).empty().append( content );
        $('#popup').fadeIn('slow');         
        $('.popup-overlay').fadeIn('slow');         
        $('.popup-overlay').height($(window).height());         
        return false;
        } );
        },
    });
    } );
    $('#close').on('click', function(){
        $('#popup').fadeOut('slow');         
        $('.popup-overlay').fadeOut('slow');         
        return false;
    });