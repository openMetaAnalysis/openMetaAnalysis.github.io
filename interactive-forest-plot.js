$(document).ready(function(){
	//Link handlers
	$('a').mouseleave(function(event){
		$( "#tip0" ).css('display', 'none');
	});
	$('a').mouseenter(function(event){
		//alert($(this).attr("id"));
		//alert($(this).attr('id'))
		var trigger = $(this).attr('id')
		event.preventDefault();
		$("#div1").load("pico-table.html tr:contains('" + $(this).attr("pmid") + "')")
		$("#div2").load("bias-table.html tr:contains('" + $(this).attr("pmid") + "')",function(responseTxt,statusTxt,xhr)
		{
		if(statusTxt=="success")
			//alert("External content loaded successfully!\n\n");
			$("#div1").html("<table class='tipster'><caption><b>PICO components</b></caption><tr><th>Trial</th><th>Patients</th><th>Intervention</th><th>Comparison</th><th>Outcome</th></tr>" + $("#div1").html() + "</table>")
			$("#div2").html("<table class='tipster'><caption><b>Possible bias</b></caption><tr><th class='col1' rowspan='2'>Trial</th><th colspan='2'>Selection biases:</th><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th><th>Other biases:</th></tr><tr><th>Random sequence generation</th><th>Allocation concealment</th><th>Blinding of participants and personnel</th><th>Blinding of outcome assessment</th><th>Incomplete outcome data</th><th>Selective reporting</th><th>E.g. imbalanced compliance , co-interventions, or other.</th></tr>" + $("#div2").html() + "</table>")
			$( "#tip0" ).css({"background-color":"black","border-color":"black","border-width":"2px"});
			$( ".tipster" ).css({"display":"inline"});
			$( ".tipster" ).css({"background-color":"white"});
			$( ".tipster" ).css({"opacity":"1"});
			$( ".tipster" ).css({"width":"500px"});
			$( "#tip0" ).offset({top: $("#" + trigger).position().top + 50, left:50})
			//$( "#tip0" ).css('border-style', 'solid' );
			//$( "#tip0" ).css('border-width', '3px' );
			//alert(event.PageY)
			//$( "#tip0" ).offset({top: event.PageY + 25, left:100})
			//$( "div" ).css({"background-color":"white"});
			//$( "caption").css({"background-color":"white"});
			//$( "td" ).css({"background-color":"white"});
			$( "th" ).css({"background-color":"lightgray"});
			$( "tr:contains('risk')").css({"text-align":"center"});
			$( "td:contains('Unclear')" ).css({"background-color":"#ffcccc"});
			$( "td:contains('High')" ).css({"background-color":"#ff5959"});
			$( "emphasis" ).css({"background-color":"#FFFF00"});
			$( ".emphasis" ).css({"background-color":"#FFFF00"});
			$( "tr:contains('Unclear')").find('td:first').css({"background-color":"#ffcccc"});
			$( "tr:contains('High')").find('td:first').css({"background-color":"#ff5959"});	 
			//alert($("#" + trigger).position().top)
			//alert($("#tip0").html());
			//$(this).after($("#tip0").html())
			
			if(statusTxt=="error")
				alert("Error: "+xhr.status+": "+xhr.statusText);
		});
	});

})
