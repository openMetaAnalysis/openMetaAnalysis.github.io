$( document ).ajaxComplete(function() {
	//Background-color of cells
	});
$(document).ready(function(){
$("#header_pico").html("<p>Included trials, starting with the oldest trials.</p><table><caption>Randomized controlled trials of this topic</caption><tbody><tr><th width=\'180px\'>Trial</th><th>Patients</th><th>Intervention</th><th>Comparison</th><th>Outcome</th><th style='width:7px;background-color:white;border: 1px solid white'></th></tr></table>");
var url = "/" + repo_dir + "/tables/pico.xml";
        $.ajax({
            type: "GET",
            url: url,
            cache: false,
            dataType: "xml",
            error: function() {
                alert("The XML File," + url + ", could not be processed correctly.");
                },
            success: function(xml) { 
			$(xml).find('study').each(function(){
				var citationtext = $(this).find('citation').text() + ', ' + $(this).find("citation").attr("year") +  '<br>' + $(this).find("citation").attr("journal_abbrev") + "<br>"
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
				var patients = $(this).find('patients').attr('total') + ' subjects with ' + $(this).find('patients').find('description').text();
					$(this).find('patients').find('bullet').each(function(){
						patients += '<br>&bull; ' + $(this).text()
						})
				var intervention = '';
					$(this).find('intervention').find('bullet').each(function(){
						intervention += '<br>&bull; ' + $(this).text()
						})
				intervention = $(this).find('intervention').find('bullet').remove().end().html() + intervention
				var comparison = '';
					$(this).find('comparison').find('bullet').each(function(){
						comparison += '<br>&bull; ' + $(this).text()
						})
				comparison = $(this).find('comparison').find('bullet').remove().end().text() + comparison
				var outcome = 'Primary:';
					$(this).find('outcome').each(function(){
						$(this).find("bullet[type='primary']").each(function(){
								if ( $(this).attr('url'))
									{outcome += "<br>&bull; <a href=\"" + $(this).attr('url') + " \">" + $(this).text() + '</a>'}
								else
									{outcome += '<br>&bull; ' + $(this).text()}
						})
						if ($(this).find("bullet[type='secondary']").length) {
							outcome += '<br>Secondary:';
							$(this).find("bullet[type='secondary']").each(function(){
								if ( $(this).attr('url'))
									{outcome += "<br>&bull; <a href=\"" + $(this).attr('url') + " \">" + $(this).text() + '</a>'}
								else
									{outcome += '<br>&bull; ' + $(this).text()}
							})
						}
					})
                        	var pmid= $(this).find('citation').attr('pmid');
				var trHTML = '<tr><td width=\'180px\'>' +  citationtext + '</td><td>' + patients + '</td><td>' + intervention + '</td><td>' + comparison + '</td><td>' + outcome + '</td></tr>';
				//PubMed links
				regex = /(\s{1,})(\d{7,})/ig; //from http://jsfiddle.net/badgettrg/60482cbh/
				trHTML = trHTML.replace(regex, "$1<a href='http://pubmed.gov/$2'>$2</a>");
				//Highlight emphasis
				regex = /\*{2}(.+)\*{2}/ig;
				trHTML = trHTML.replace(regex, "<span style='background-color:yellow;font-weight:bold;font-style:italic'>$1</span>");	
			        $('#citations').append(trHTML);
			})
                }
      });

	//Write footer
	//Reuse
	$("#business-pico").append("<div style='text-align:center'><a href='https://github.com/openMetaAnalysis/openMetaAnalysis.github.io/blob/master/reusing.MD'>Cite &amp; use this content</a></div>")
	//Edit and history
	$("#business-pico").append("<div style='text-align:center'>Source content: <a href='/" + repo_dir + "/tables/pico.xml'>view</a> - <a href='https://github.com/openMetaAnalysis/" + repo_dir + "/commits/gh-pages/tables/pico.xml'>history</a> - <a href='https://github.com/openMetaAnalysis/" + repo_dir + "/blob/gh-pages/tables/pico.xml'>edit</a> - <a id='xmlhelp' class='hastip' href='#'>help with editting</a> (Hint: use <a href=\"https://kobra.io\">Kobra</a> for collaborative editing)</div>")
	//Issues and comments
	$("#business-pico").append("<div style='text-align:center'><a href='https://github.com/openMetaAnalysis/" + repo_dir + "/issues?q=is%3Aopen+is%3Aissue'>Issues and comments</a></div>")

    });
