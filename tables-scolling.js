$(document).ready(function(){
    $( "td:contains('Unclear')" ).css('background-color', '#ffcccc' );
});
$(document).ready(function(){
    $( "td:contains('High')" ).css('background-color', '#ff5959' );
});
$(document).ready(function(){
    $( "tr:contains('Unclear')").find('td:first').css('background-color', '#ffcccc' );
});
$(document).ready(function(){
    $( "tr:contains('High')").find('td:first').css('background-color', '#ff5959' );
});
