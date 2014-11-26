$(document).ready(function(){
var url = "/template/tables/pico.xml";
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
				var patients = $(this).find('patients').attr('total') + ' patients:';
					$(this).find('patients').find('bullet').each(function(){
						patients += '<br>&bull; ' + $(this).html()
						})
				var intervention = [];
					$(this).find('intervention').find('bullet').each(function(){
						intervention += '<br>&bull; ' + $(this).html()
						})
				intervention = $(this).find('intervention').find('bullet').remove().end().html() + intervention
				var comparison = [];
					$(this).find('comparison').find('bullet').each(function(){
						comparison += '<br>&bull; ' + $(this).html()
						})
				comparison = $(this).find('comparison').find('bullet').remove().end().html() + comparison
				var outcome = '[]'Primary'';
					$(this).find('outcome').find('bullet').each(function(){
						outcome += '<br>&bull; ' + $(this).html()
						})
				outcome = $(this).find('outcome').find('bullet').remove().end().text() + outcome
                        	var pmid= $(this).find('citation').attr('pmid');
				var trHTML = '<tr><td>' + $(this).find('citation').text() + ', ' + $(this).find("citation").attr("year") +  '<br>' + $(this).find("citation").attr("journal_abbrev") + "<br>PMID: <a href='http://pubmed.gov/" + pmid + "'>" + pmid + '</td><td>' + patients + '</td><td>' + intervention + '</td><td>' + comparison + '</td><td>' + outcome + '</td></tr>';
			        $('#citations').append(trHTML);
				
			})
                }
      });
    });
