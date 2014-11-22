$(document).ready(function(){
    $( "td:contains('Unclear')" ).css('background-color', '#ffcccc' );
    $( "td:contains('High')" ).css('background-color', '#ff5959' );
    $( "tr:contains('Unclear')").find('td:first').css('background-color', '#ffcccc' );
    $( "tr:contains('High')").find('td:first').css('background-color', '#ff5959' );
    $( ".emphasis" ).css('background-color', '#FFFF00' );
    $( ".emphasis" ).css('font-style', 'italic' );
    $( ".emphasis" ).css('font-weight', 'bold' );
});
