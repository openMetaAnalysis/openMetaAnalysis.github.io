$(document).ready(function(){
    $( "td:contains('Unclear')" ).css('background-color', '#ffcccc' );
    $( "td:contains('High')" ).css('background-color', '#ff5959' );
    $( "tr:contains('Unclear')").find('td:first').css('background-color', '#ffcccc' );
    $( "tr:contains('High')").find('td:first').css('background-color', '#ff5959' );

    $( ".emphasis" ).css('background-color', '#FFFF00' );
    $( ".emphasis" ).css('font-style', 'italic' );
    $( ".emphasis" ).css('font-weight', 'bold' );
    $( "emphasis" ).css('background-color', '#FFFF00' );
    $( "emphasis" ).css('font-style', 'italic' );
    $( "emphasis" ).css('font-weight', 'bold' );
    
    $("#header_pico").html("<p>Included trials, starting with the oldest trials.</p><table><caption>Randomized controlled trials of this topic</caption><tbody><tr><th width='180px'>Trial</th><th class='col_other'>Patients</th><th class='col_other'>Intervention</th><th class='col_other'>Comparison</th><th>Outcome</th><th style='width:7px;background-color:white;border: 1px solid white'></th></tr></table>");
    $("#header_bias").html("<p><table><caption>Possible bias in randomized controlled trials of this topic</caption><tr><th class='col1' rowspan='2' width='180px'>Trial</th><th colspan='2'>Selection bias</th><th class='col_other'>Performance bias</th><th class='col_other'>Detection bias</th><th class='col_other'>Attrition bias</th><th class='col_other'>Reporting bias</th><th class='col_other'>Other biases</th><th rowspan=2 style='width:7px;background-color:white;border: 1px solid white'></th></tr><tr><th class='col_other'>Random sequence generation</th><th class='col_other'>Allocation concealment</th><th class='col_other'>Blinding of participants and personnel</th><th class='col_other'>Blinding of outcome assessment</th><th>Incomplete outcome data</th><th>Selective reporting</th><th>E.g. imbalanced compliance , co-interventions, or other.</th></tr></table>");
});
 
