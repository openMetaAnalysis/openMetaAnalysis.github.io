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
		var tipname = $(this).attr("id");
		$("#tip").load("/tips.xml", function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success"){
				//alert("Success: "+xhr.status+": "+xhr.statusText);
				var xmlDoc = $.parseXML(responseTxt)
				var tiptext = '';
				var temp =$(xmlDoc).find("[name= " + tipname + "]").each(function(){
					$(this).find('p').each(function(){
						tiptext += $(this).text() + "<br>"
					})
					$(this).find('href').each(function(){
						tiptext += "<a href='" +  $(this).text() + "'>"
					})
					$(this).find('text').each(function(){
						tiptext += $(this).text() + "</a>"
					})
				     });
				     $("#tip").html("<div style = 'background-color:white;opacity:1;border-style: solid; border-width: medium;'>" + tiptext + '</div>')
				$("#tip").css('display','block');
				$("#tip").css({"background-color":"#6DC6E7"});
				$("#tip").css({"color":"#0022B4"});
				$("#tip").css({"opacity":"1"});
				var trigger = $(this).attr('id');
				var posleft = $("#" + trigger).position().left;
				if ((posleft + $("#tip").width()) > $(window).width())(posleft = $(window).width() - $("#tip").width() - 10);
				$( "#tip" ).offset({top: $("#" + trigger).position().top + 25, left: posleft});
			}
			if(statusTxt=="error"){
				alert("Error: "+xhr.status+": "+xhr.statusText);
			}
			});


	});
})
