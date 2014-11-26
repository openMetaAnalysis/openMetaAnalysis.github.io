$( document ).ajaxComplete(function() {
	//Background-color of cells
	});
$(document).ready(function(){
$("#header_pico").html("<p>Included trials, starting with the oldest trials.</p><table><caption>Randomized controlled trials of this topic</caption><tbody><tr><th>Trial</th><th>Patients</th><th>Intervention</th><th>Comparison</th><th>Outcome</th><th style='width:7px;background-color:white;border: 1px solid white'></th></tr></table>");
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
				var patients = $(this).find('patients').attr('total') + ' patients:';
					$(this).find('patients').find('bullet').each(function(){
						patients += '<br>&bull; ' + $(this).text()
						})
				var intervention = '';
					$(this).find('intervention').find('bullet').each(function(){
						intervention += '<br>&bull; ' + $(this).text()
						})
				intervention = $(this).find('intervention').find('bullet').remove().end().text() + intervention
				var comparison = '';
					$(this).find('comparison').find('bullet').each(function(){
						comparison += '<br>&bull; ' + $(this).text()
						})
				comparison = $(this).find('comparison').find('bullet').remove().end().text() + comparison
				var outcome = 'Primary:';
					$(this).find('outcome').each(function(){
						$(this).find("bullet[type='primary']").each(function(){
							outcome += '<br>&bull; ' + $(this).text()
						})
						if ($(this).find("bullet[type='secondary']").length) {
							outcome += '<br>Secondary:';
							$(this).find("bullet[type='secondary']").each(function(){
								outcome += '<br>&bull; ' + $(this).text()
							})
						}
						outcome = outcome.replace("PMID", "pmid");
					})
                        	var pmid= $(this).find('citation').attr('pmid');
				var trHTML = '<tr><td>' + $(this).find('citation').text() + ', ' + $(this).find("citation").attr("year") +  '<br>' + $(this).find("citation").attr("journal_abbrev") + "<br>PMID: <a href='http://pubmed.gov/" + pmid + "'>" + pmid + '</td><td>' + patients + '</td><td>' + intervention + '</td><td>' + comparison + '</td><td>' + outcome + '</td></tr>';
			        $('#citations').append(trHTML);
				
			})
                }
      });
    });
