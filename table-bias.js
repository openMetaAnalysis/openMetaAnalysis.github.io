$( document ).ajaxComplete(function() {
	//Background-color of cells
	$( "td:contains('Unclear')" ).css('background-color', '#ffcccc' );
	$( "td:contains('High')" ).css('background-color', '#ff5959' );
	$( "tr:contains('Unclear')").find('td:first').css('background-color', '#ffcccc' );
	$( "tr:contains('High')").find('td:first').css('background-color', '#ff5959' );
});
$(document).ready(function(){
$("#header_bias").html("<table><caption>Possible bias in randomized controlled trials of this topic</caption><tr><th class='col1' rowspan='2'>Trial</th><th colspan='2'>Selection bias</th><th>Performance bias</th><th>Detection bias</th><th>Attrition bias</th><th>Reporting bias</th><th>Other biased</th><th rowspan=2 style='width:7px;background-color:white;border: 1px solid white'></th></tr><tr><th>Random sequence generation</th><th>Allocation concealment</th><th>Blinding of participants and personnel</th><th>Blinding of outcome assessment</th><th>Incomplete outcome data</th><th>Selective reporting</th><th>E.g. imbalanced compliance , co-interventions, or other.</th></tr></table>");
var url = "/" + repo_dir + "/tables/bias.xml";
        $.ajax({
            type: "GET",
            url: url,
            cache: false,
            dataType: "xml",
            error: function() {
                alert("The XML File," + url + ", could not be processed correctly.");
                },
            success: function(xml) {
			var totalsubjects = 0;
			highrisksubjects = 0;
			unclearrisksubjects = 0;
			$(xml).find('study').each(function(){
					var randomization = [], allocation = [], blinding_people = [], blinding_assessment = [], attrition = [], selective_reporting = [], other_biases = [];
					totalsubjects += parseFloat($(this).find('citation').attr('totalsubjects'))
					if (($(this).text().indexOf,"igh")>0){
						highrisksubjects += parseFloat($(this).find('citation').attr('totalsubjects'))
						}
					if (($(this).text().indexOf,"igh")>0 || ($(this).text().indexOf,"nclear")>0){
						unclearrisksubjects += parseFloat($(this).find('citation').attr('totalsubjects'))
						}
					$(this).find('randomization').each(function(){
						randomization = $(this).text()
						})
					$(this).find('allocation').each(function(){
						allocation = $(this).text()
						})
					$(this).find('blinding_people').each(function(){
						blinding_people = $(this).text()
						})
					$(this).find('blinding_assessment').each(function(){
						blinding_assessment = $(this).text()
						})
					$(this).find('attrition').each(function(){
						attrition = $(this).text()
						})
					$(this).find('selective_reporting').each(function(){
						selective_reporting = $(this).text()
						})
					$(this).find('other_biases').each(function(){
						other_biases = $(this).text()
						})
				var trHTML = '<tr><td>' + $(this).find('citation').text() + ', ' + $(this).find("citation").attr("year") + "<br>PMID: <a href='http://pubmed.gov/" + $(this).find('citation').attr('pmid') + "'>" + $(this).find('citation').attr('pmid') + '</td><td>' + randomization + '</td><td>' + allocation + '</td><td>' + blinding_people + '</td><td>' + blinding_assessment + '</td><td>' + attrition + '</td><td>' + selective_reporting + '</td><td>' + other_biases + '</td></tr>';
			        $('#citations').append(trHTML);
			})

			//summary judgment
			var ratio = 0;
			var denom = $(xml).find('study').length;
			$("#judgment").html('Low risk')
			ratio = $(xml).find("study:contains(High)").length/denom;
			$("#rationale").html("\'Most information (<span style='color:red;font-weight:bold'>" + eval(1 - $(xml).find("study:contains(Unclear)").length/denom).toFixed(2) + " or more</span> - " + totalsubjects + " subjects) is from studies at low risk of bias.\' (<a href=\'http://handbook.cochrane.org/chapter_8/table_8_7_a_possible_approach_for_summary_assessments_of_the.htm\'>Cochrane Handbook</a>)");
			if (ratio > 0.5){
				$("#judgment").html('High risk');
				$("#judgment").css('background-color','#ffcccc');
				$("#rationale").html("\'Most information (<span style='color:red;font-weight:bold'>" + ratio.toFixed(2) + "</span>) is from studies at low or unclear risk of bias.\' (<a href=\'http://handbook.cochrane.org/chapter_8/table_8_7_a_possible_approach_for_summary_assessments_of_the.htm\'>Cochrane Handbook</a>)");
			};
			ratio = $(xml).find("study:contains(Unclear)").length/denom;
			if (ratio > 0.5){
				$("#judgment").html('High risk');
				$("#judgment").css('background-color','#ff5959');
				$("#rationale").html("\'The proportion of information from studies at high risk of bias (<span style='color:red;font-weight:bold'>" + ratio.toFixed(2) + "</span> or " + eval(100*highrisksubjects/totalsubjects).toFixed(0) + "% of subjects) is sufficient to affect the interpretation of results.\' (<a href=\'http://handbook.cochrane.org/chapter_8/table_8_7_a_possible_approach_for_summary_assessments_of_the.htm\'>Cochrane Handbook</a>)");
			};

                }
      });
    });
