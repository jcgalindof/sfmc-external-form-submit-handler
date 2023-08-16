//validación del nombre
$.validator.addMethod("customname",
    function (value, element) {
        return /^([a-zA-Z'À-ÿ-.]+ [a-zA-Z'À-ÿ-.]+)$/.test(value);
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
           required: true,  
       
        },
    },
    messages: {
        'first_name': { // and here
        required: "<div class='regular_required_msg'>Por favor, verifica tu nombre.</div>"
        },
        'email': { // and here
            required: "<div class='regular_required_msg'>Por favor, verifica tu correo electrónico.</div>",
            email: "<div class='regular_required_msg'>Por favor, verifica tu correo electrónico.</div>",
            remote: "<div class='regular_required_msg'>El email ya está registrado.</div>",
        },
        'optin': { // and here
            required: "<div class='regular_required_msg'>Aceptá la política de privacidad</div>"
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
        form.submit();
    }
});
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}