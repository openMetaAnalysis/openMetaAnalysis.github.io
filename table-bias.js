$( document ).ajaxComplete(function() {
	//Background-color of cells
	$( "td:contains('Unclear')" ).css('background-color', '#ffcccc' );
	$( "td:contains('High')" ).css('background-color', '#ff5959' );
	$( "tr:contains('Unclear')").find('td:first').css('background-color', '#ffcccc' );
	$( "tr:contains('High')").find('td:first').css('background-color', '#ff5959' );
});
$(document).ready(function(){
$("#header_bias").html("<p>This assessment is done with the Cochrane Collaboration's tool for assessing risk of bias (see '<a href='https://github.com/openMetaAnalysis/_Methods/blob/master/README.md' target='_blank'>Criteria for judging risk of bias</a>' in the 'Risk of bias' assessment tool').</p><p>Included trials, starting with the oldest trials.</p><table><caption>Possible bias in randomized controlled trials of this topic</caption><tr><th class='col1' rowspan='2'>Trial</th><th colspan='2'>Selection bias</th><th>Performance bias</th><th>Detection bias</th><th>Attrition bias</th><th>Reporting bias</th><th>Other biased</th><th rowspan=2 style='width:7px;background-color:white;border: 1px solid white'></th></tr><tr><th>Random sequence generation</th><th>Allocation concealment</th><th>Blinding of participants and personnel</th><th>Blinding of outcome assessment</th><th>Incomplete outcome data</th><th>Selective reporting</th><th>E.g. imbalanced compliance , co-interventions, or other.</th></tr></table>");
var url = "/template/tables/bias.xml";
        $.ajax({
            type: "GET",
            url: url,
            cache: false,
            dataType: "xml",
            error: function() {
                alert("The XML File could not be processed correctly.");
                },
            success: function(xml) { 
			$(xml).find('study').each(function(){
					$(this).find('randomization').each(function(){
						var randomization = $(this).html()
						})
					$(this).find('allocation').each(function(){
						var allocation = $(this).html()
						})
					$(this).find('blinding_people').each(function(){
						var blinding_people = $(this).html()
						})
					$(this).find('blinding_assessment').each(function(){
						var blinding_assessment = $(this).html()
						})
					$(this).find('attrition').each(function(){
						var attrition = $(this).html()
						})
					$(this).find('selective_reporting').each(function(){
						var selective_reporting = $(this).html()
						})
					$(this).find('other_biases').each(function(){
						var other_biases = $(this).html()
						})
				var trHTML = '<tr><td>' + $(this).find('citation').text() + ', ' + $(this).find("citation").attr("year") +  '<br>' + "<br>PMID: <a href='http://pubmed.gov/" + $(this).find('citation').attr('pmid') + "'>" + $(this).find('citation').attr('pmid') + '</td><td>' + randomization + '</td><td>' + intervention + '</td><td>' + blinding_people + '</td><td>' + blinding_assessment + '</td><td>' + attrition + '</td><td>' + selective_reporting + '</td><td>' + other_biases + '</td></tr>';
			        $('#citations').append(trHTML);
				
			})
                }
      });
    });
