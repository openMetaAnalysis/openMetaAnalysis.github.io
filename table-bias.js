$(document).ready(function(){
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
				var trHTML = '<tr><td>' + $(this).find('citation').text() + ', ' + $(this).find("citation").attr("year") +  '<br>' + "<br>PMID: <a href='http://pubmed.gov/" + pmid + "'>" + $(this).find('citation').attr('pmid') + '</td><td>' + randomization + '</td><td>' + intervention + '</td><td>' + blinding_people + '</td><td>' + blinding_assessment + '</td><td>' + attrition + '</td><td>' + selective_reporting + '</td><td>' + other_biases + '</td></tr>';
			        $('#citations').append(trHTML);
				
			})
                }
      });
    });
