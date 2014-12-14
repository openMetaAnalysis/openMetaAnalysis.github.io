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
	//Link rewrites
	$("body").find('a.main').each(function(){
		//gh-pages
		$(this).attr('href', "http://openmetaanalysis.github.io/" + $(this).attr("href"));
		})
	$("body").find('a.master').each(function(){
		//For directories on gh-pages
		$(this).attr('href', "https://github.com/openMetaAnalysis/" + repo_dir + '/' + $(this).attr("href"));
		})
	$("body").find('a.master-dir').each(function(){
		//For directories on master
		$(this).attr('href', "https://github.com/openMetaAnalysis/" + repo_dir + '/tree/master/' + $(this).attr("href"));
		})
	$("body").find('a.master-file').each(function(){
		//For specific files on master
		$(this).attr('href', "https://raw.githubusercontent.com/openMetaAnalysis/" + repo_dir + '/master/' + $(this).attr("href"));
		})
	$("body").find('a.pmid').each(function(){
		//For PMIDs
		$(this).attr('href', "http://www.ncbi.nlm.nih.gov/pubmed/" + $(this).text());
		})
	$("body").find('pmid').each(function(){
		//For PMIDs
		$(this).attr('href', "http://www.ncbi.nlm.nih.gov/pubmed/" + $(this).text());
		})
	//write business
	//write to div business in the footer
	//issues and comments
	$("#business").append("<div style='text-align:center'><a href='https://github.com/openMetaAnalysis/" + repo_dir + "/issues?q=is%3Aopen+is%3Aissue'>Issues and comments</a></div>")
	//Edit and page history
	$("#business").append("<div style='text-align:center'><a href='https://github.com/openMetaAnalysis/" + repo_dir + "/blob/gh-pages/" + pagename + "'>Edit this page</a> - <a href='https://github.com/openMetaAnalysis/" + repo_dir + "/commits/gh-pages/" + pagename + "'>Page history</a></div>")
	//License
	$("#business").append("<div style='text-align:center'><a href='https://github.com/openMetaAnalysis/openMetaAnalysis.github.io/blob/master/LICENSE'>Use this content</a></div>")//For gh-pages
	//Event handlers
	$('#tip').mouseleave(function(event){
		$( "#tip" ).css('display', 'none');
	});
	$('a.hastip').mouseenter(function(event){
		var tipname = $(this).attr("id");
		var trigger = $(this).attr('id');
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
						tiptext += "From: <a href='" +  $(this).text() + "' style='align:center'>"
					})
					$(this).find('text').each(function(){
						tiptext += $(this).text() + "</a>"
					})
				     });
				     $("#tip").html("<div style = 'background-color:white;opacity:1;border-style: solid; border-width: medium;padding:10px'>" + tiptext + '</div>')
				$("#tip").css('display','block');
				$("#tip").css('width','400px');
				$("#tip").css({"background-color":"#6DC6E7"});
				$("#tip").css({"color":"#0022B4"});
				$("#tip").css({"opacity":"1"});
				var posleft = $("#" + trigger).position().left;
				if ((posleft + $("#tip").width()) > $(window).width())(posleft = $(window).width() - $("#tip").width() - 10);
				$( "#tip" ).offset({top: $("#" + trigger).position().top + 0, left: posleft});
			}
			if(statusTxt=="error"){
				alert("Error: "+xhr.status+": "+xhr.statusText);
			}
			});


	});
})
