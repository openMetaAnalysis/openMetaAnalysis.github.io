$( document ).ajaxComplete(function() {
	//Background-color of cells
	$( "td:contains('Unclear')" ).css('background-color', '#ffcccc' );
	$( "td:contains('High')" ).css('background-color', '#ff5959' );
	$( "tr:contains('Unclear')").find('td:first').css('background-color', '#ffcccc' );
	$( "tr:contains('High')").find('td:first').css('background-color', '#ff5959' );
	//Event handlers in the xml
	$('a.hastip_intitle').mouseenter(function(event){
		var tiptext = $(this).attr('title');
		var trigger = $(this);
		var width = "200px"
		showtip(tiptext, trigger, width);
		});
});
$(document).ready(function(){
//Write header
$("#header_bias").html("<table><caption>Possible bias in randomized controlled trials of this topic<br><a href=\"http://handbook-5-1.cochrane.org/chapter_8/table_8_5_d_criteria_for_judging_risk_of_bias_in_the_risk_of.htm\" style=\"font-size:12px\">Criteria for individual items from Cochrane Handbook</a></caption><tr><th class='col1' width='180px' rowspan='2'>Trial</th><th colspan='2'>Selection bias</th><th width=\'100px\'>Performance bias</th><th width=\'100px\'>Detection bias</th><th width=\'100px\'>Attrition bias</th><th width=\'100px\'>Reporting bias</th><th width=\'100px\'>Other biases</th><th rowspan=2 style='width:7px;background-color:white;border: 1px solid white'></th></tr><tr><th width=\'100px\'>Random sequence generation</th><th width=\'100px\'>Allocation concealment</th><th>Blinding of participants and personnel</th><th>Blinding of outcome assessment</th><th>Incomplete outcome data</th><th>Selective reporting</th><th>E.g. imbalanced compliance , co-interventions, or other.</th></tr></table>");
//Get xml for table
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
			var highrisksubjects = 0;
			var unclearrisksubjects = 0;
			$(xml).find('study').each(function(){
					var randomization = [], allocation = [], blinding_people = [], blinding_assessment = [], attrition = [], selective_reporting = [], other_biases = [];
					var citationtext = $(this).find('citation').text() + ', ' + $(this).find("citation").attr("year") + "<br>"
					if ( $(this).find('citation').attr('pmid')){
						if ( $(this).find('citation').attr('pmid').length > 4){
							citationtext += "PMID: <a href='http://pubmed.gov/" + $(this).find('citation').attr('pmid') + "'>" + $(this).find('citation').attr('pmid') + "</a><br>"
							}
						}
					if ( $(this).find('citation').attr('trialregistration')){
						if ( $(this).find('citation').attr('trialregistration').toLowerCase().indexOf("nct") >= 0){
							citationtext += "<a href='https://clinicaltrials.gov/ct2/show/study/" + $(this).find('citation').attr('trialregistration') + "'>" + $(this).find('citation').attr('trialregistration') + "</a><br>"
							}
						if ( $(this).find('citation').attr('trialregistration').toLowerCase().indexOf("isrctn") >= 0){
							citationtext += "<a href='http://www.isrctn.com/" + $(this).find('citation').attr('trialregistration') + "'>" + $(this).find('citation').attr('trialregistration') + "</a><br>"
							}
						if ( $(this).find('citation').attr('trialregistration').toLowerCase().indexOf("actrn") >= 0){
							citationtext += "<a href='http://www.anzctr.org.au/TrialSearch.aspx?searchTxt=" + $(this).find('citation').attr('trialregistration') + "'>" + $(this).find('citation').attr('trialregistration') + "</a><br>"
							}
						}
					citationtext += "Subjects: " + $(this).find('citation').attr('totalsubjects')
					totalsubjects += parseFloat($(this).find('citation').attr('totalsubjects'))
					if ($(this).text().indexOf("igh")>0){
						highrisksubjects    += parseFloat($(this).find('citation').attr('totalsubjects'))
						}
					if ($(this).text().indexOf("igh")>0 || $(this).text().indexOf("nclear")>0){
						unclearrisksubjects += parseFloat($(this).find('citation').attr('totalsubjects'))
						}
					$(this).find('randomization').each(function(){
						randomization = $(this).text()
						if (this.hasAttribute('explanation')){
							if ($(this).attr('explanation').length>8){
								randomization = "<a href=\"#\" class=\"hastip_intitle\" title=\"" + $(this).attr('explanation')+ "\">" + $(this).text() + "</a>"
								}
							}
						})
					$(this).find('allocation').each(function(){
						allocation = $(this).text()
						if (this.hasAttribute('explanation')){
							if ($(this).attr('explanation').length>8){
								allocation = "<a href=\"#\" class=\"hastip_intitle\" title=\"" + $(this).attr('explanation')+ "\">" + $(this).text() + "</a>"
								}
							}
						})
					$(this).find('blinding_people').each(function(){
						blinding_people = $(this).text()
						if (this.hasAttribute('explanation')){
							if ($(this).attr('explanation').length>8){
								blinding_people = "<a href=\"#\" class=\"hastip_intitle\" title=\"" + $(this).attr('explanation')+ "\">" + $(this).text() + "</a>"
								}
							}
						})
					$(this).find('blinding_assessment').each(function(){
						blinding_assessment = $(this).text()
						if (this.hasAttribute('explanation')){
							if ($(this).attr('explanation').length>8){
								blinding_assessment = "<a href=\"#\" class=\"hastip_intitle\" title=\"" + $(this).attr('explanation')+ "\">" + $(this).text() + "</a>"
								}
							}
						})
					$(this).find('attrition').each(function(){
						attrition = $(this).text()
						if (this.hasAttribute('explanation')){
							if ($(this).attr('explanation').length>8){
								attrition = "<a href=\"#\" class=\"hastip_intitle\" title=\"" + $(this).attr('explanation')+ "\">" + $(this).text() + "</a>"
								}
							}
						})
					$(this).find('selective_reporting').each(function(){
						selective_reporting = $(this).text()
						if (this.hasAttribute('explanation')){
							if ($(this).attr('explanation').length>8){
								selective_reporting = "<a href=\"#\" class=\"hastip_intitle\" title=\"" + $(this).attr('explanation')+ "\">" + $(this).text() + "</a>"
								}
							}
						})
					$(this).find('other_biases').each(function(){
						other_biases = $(this).text()
						if (this.hasAttribute('explanation')){
							if ($(this).attr('explanation').length>8){
								other_biases = "<a href=\"#\" class=\"hastip_intitle\" title=\"" + $(this).attr('explanation')+ "\">" + $(this).text() + "</a>"
								}
							}
						})
				var trHTML = '<tr><td width=\'180px\'>' +  citationtext + '</td><td width=\'100px\'>' + randomization + '</td><td width=\'100px\'>' + allocation + '</td><td width=\'100px\'>' + blinding_people + '</td><td width=\'100px\'>' + blinding_assessment + '</td><td width=\'100px\'>' + attrition + '</td><td width=\'100px\'>' + selective_reporting + '</td><td width=\'100px\'>' + other_biases + '</td></tr>';
			        $('#citations').append(trHTML);
			})

			//summary judgment
			var ratio = 0;
			var denom = $(xml).find('study').length;
			$("#judgment").html('Low risk')
			//ratio = $(xml).find("study:contains(High)").length/denom;
			$("#rationale").html("\'Most information (<span style='color:red;font-weight:bold'>" + eval(100*(1-unclearrisksubjects/totalsubjects)).toFixed(1) + "% of " + totalsubjects + " patients</span>) is from studies at low risk of bias.\' (<a href=\'http://handbook-5-1.cochrane.org/chapter_8/table_8_7_a_possible_approach_for_summary_assessments_of_the.htm\'>Cochrane Handbook</a>)");
			//alert("Unclear/high risk proportion:\n" + eval(100*(unclearrisksubjects)/totalsubjects).toFixed(1)+"%")
			if (unclearrisksubjects/totalsubjects > 0.5){
			//Below is per Cochrane, but does not seem sensible as a study could have most trials low risk and also have most trials low or unclear.
			//if (1-highrisksubjects/totalsubjects > 0.5){
				$("#judgment").html('Unclear risk');
				$("#judgment").css('background-color','#ffcccc');
				$("#rationale").html("\'Most information (<span style='color:red;font-weight:bold'>" + eval(100*unclearrisksubjects/totalsubjects).toFixed(1) + "% of " + totalsubjects + " patients</span>) is from studies at unclear or high risk of bias.\' (modified from <a href=\'http://handbook-5-1.cochrane.org/chapter_8/table_8_7_a_possible_approach_for_summary_assessments_of_the.htm\'>Cochrane Handbook</a>)");
			};
			//ratio = $(xml).find("study:contains(Unclear)").length/denom;
			//alert("High risk proportion:\n"        + eval(100*highrisksubjects/totalsubjects).toFixed(1)+"%")
			if (highrisksubjects/totalsubjects > 0.5){
				$("#judgment").html('High risk');
				$("#judgment").css('background-color','#ff5959');
				$("#rationale").html("\'The proportion of information (<span style='color:red;font-weight:bold'>" + eval(100*highrisksubjects/totalsubjects).toFixed(1) + "% of " + totalsubjects + " patients</span> from studies at high risk of bias is sufficient to affect the interpretation of results.\' (<a href=\'http://handbook-5-1.cochrane.org/chapter_8/table_8_7_a_possible_approach_for_summary_assessments_of_the.htm\'>Cochrane Handbook</a>)");
			};

                }
      });
     
	//Write footer
	//Reuse
	$("#business-bias").append("<div style='text-align:center'><a href='https://github.com/openMetaAnalysis/openMetaAnalysis.github.io/blob/master/reusing.MD'>Cite &amp; use this content</a></div>")
	//Edit and history
	$("#business-bias").append("<div style='text-align:center'>Source content: <a href='/" + repo_dir + "/tables/bias.xml'>view</a> - <a href='https://github.com/openMetaAnalysis/" + repo_dir + "/commits/gh-pages/tables/bias.xml'>history</a> - <a href='https://github.com/openMetaAnalysis/" + repo_dir + "/blob/gh-pages/tables/bias.xml'>edit</a> - <a id='xmlhelp' class='hastip' href='#'>help with editting</a> (Hint: use <a href=\"https://kobra.io\">Kobra</a> for collaborative editing)</div>")
	//Issues and comments
	$("#business-bias").append("<div style='text-align:center'><a href='https://github.com/openMetaAnalysis/" + repo_dir + "/issues?q=is%3Aopen+is%3Aissue'>Issues and comments</a></div>")
});
