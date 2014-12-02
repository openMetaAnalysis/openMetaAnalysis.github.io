var n = location.pathname.indexOf("/",1)
if (n == 0){n = location.pathname.length}
var repo_dir = location.pathname.substring(1,n);
var repo_name = repo_dir.replace(/\-/gi, ' '); 
$(document).ready(function(){
	//Display the repo_name in all the correct spots
	$(".repo_name").text(repo_name);
	//Customize src for images based on repo name
	$("#forest").attr('src', 'https://raw.githubusercontent.com/openMetaAnalysis/' + repo_dir + '/master/' + $("#forest").attr('src'))
	$("#grade").attr('src', 'https://raw.githubusercontent.com/openMetaAnalysis/' + repo_dir + '/master/' + $("#grade").attr('src'))
	//Link handlers
		//gh-pages
	$(".main").click(function(event){
		event.preventDefault();
		window.location.href = "http://openmetaanalysis.github.io/" + $(this).attr("href");
	});
	$(".master").click(function(event){
		//For directories on master branch
		event.preventDefault();
		window.location.href = "https://github.com/openMetaAnalysis/" + repo_dir + '/' + $(this).attr("href");
	});
	$(".master-dir").click(function(event){
		//For directories on master branch
		event.preventDefault();
		window.location.href = "https://github.com/openMetaAnalysis/" + repo_dir + '/tree/master/' + $(this).attr("href");
	});
	$(".master-file").click(function(event){
		//For specific files on master branch
		event.preventDefault();
		window.location.href = "https://raw.githubusercontent.com/openMetaAnalysis/" + repo_dir + '/master/' + $(this).attr("href");
	});
	$(".pmid").click(function(event){
		event.preventDefault();
		window.location.href = "http://www.ncbi.nlm.nih.gov/pubmed/" + $(this).text(); //$(this).attr("href")
	});
	$("pmid").click(function(event){
		event.preventDefault();
		window.location.href = "http://www.ncbi.nlm.nih.gov/pubmed/" + $(this).text(); //$(this).attr("href")
	});
	$('a.hastip').mouseleave(function(event){
		$( "#tip" ).css('display', 'none');
	});
	$('a.hastip').mouseenter(function(event){
		$("#tip").css('display','inline');
		$("#tip").css({"background-color":"white"});
		$("#tip").css({"border-style":"solid"});
		$("#tip").css({"border-width":"medium"});
		$("#tip").css({"margin-right":"auto"});
		$("#tip").css({"opacity":"1"});
		var trigger = $(this).attr('id');
		posleft = $("#" + trigger).position().left;
		if ((posleft + $("#tip").width()) > $(window).width())(posleft = $(window).width() - $("#tip").width() - 10);
		$( "#tip" ).offset({top: $("#" + trigger).position().top + 25, left: posleft});

		$("#tip").load("tip.xml",function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success"){
				$("#div1").html("<table class='tipster'><caption><b>PICO components</b></caption><tr><th>Trial</th><th>Patients</th><th>Intervention</th><th>Comparison</th><th>Outcome</th></tr>" + $("#div1").html() + "</table>")
				$("#div2").html("<table class='tipster'><caption><b>Possible bias</b></caption><tr><th class='col1' rowspan='2'>Trial</th><th colspan='2'>Selection biases:</th><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th><th>Other biases:</th></tr><tr><th>Random sequence generation</th><th>Allocation concealment</th><th>Blinding of participants and personnel</th><th>Blinding of outcome assessment</th><th>Incomplete outcome data</th><th>Selective reporting</th><th>E.g. imbalanced compliance , co-interventions, or other.</th></tr>" + $("#div2").html() + "</table>")
				$( "#tip" ).css({"background-color":"black","border-color":"black","border-width":"2px"});
				$( ".tipster" ).css({"display":"inline"});
				$( ".tipster" ).css({"background-color":"white"});
				$( ".tipster" ).css({"opacity":"1"});
				$( ".tipster" ).css({"width":"500px"});
				$( "#tip" ).offset({top: $("#" + trigger).position().top + 50, left:50})
				//$( "#tip" ).css('border-style', 'solid' );
				//$( "#tip" ).css('border-width', '3px' );
				//alert(event.PageY)
				//$( "#tip" ).offset({top: event.PageY + 25, left:100})
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
			}
			if(statusTxt=="error"){
				alert("Error: "+xhr.status+": "+xhr.statusText);
			}
			});


	});
})
