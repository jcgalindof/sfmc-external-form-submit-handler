// Attach a submit handler to the form
$( "#theJQueryForm" ).on( "submit", function( event ) {
// Stop form from submitting normally
event.preventDefault();
$("#submitBtn").attr("disabled", true);
    // Get some values from elements on the page:
    var $form = $( this ),
    form_first_name = $form.find( "input[name='first_name']" ).val(),
    form_email = $form.find( "input[name='email']" ).val(),
    form_campaign = $form.find( "input[name='campaign']" ).val(),
    url = $form.attr( "action" );
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
} );
$('#close').on('click', function(){
    $('#popup').fadeOut('slow');         
    $('.popup-overlay').fadeOut('slow');         
    return false;
});