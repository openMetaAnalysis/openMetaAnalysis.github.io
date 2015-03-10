var n = location.pathname.indexOf("/",1);
var sub_domain = location.hostname.split('.').shift();
if (n == 0){n = location.pathname.length};
var pagename = location.pathname.split('/').slice(-1);
if (pagename == ""){pagename = "index.html"};
var repo_dir = location.pathname.substring(1,n);
var repo_name = repo_dir.replace(/\-/gi, ' '); 
var metagression = false;
function showtip(tiptext, trigger, width){
		$("#tip").css('display','block');
        $("#tip").html("<div style = 'background-color:white;opacity:1;border-style: solid; border-width: medium;padding:10px'>" + tiptext + '</div>');
		$("#tip").css('width', width);
		$("#tip").css({"background-color":"#6DC6E7"});
		$("#tip").css({"color":"#0022B4"});
		$("#tip").css({"opacity":"1"});
		var posleft = trigger.position().left;
        if ((posleft + $("#tip").width()) > $(window).width()){
            posleft = $(window).width() - $("#tip").width() - 10;
		}
        if (posleft < 0){
            posleft = 10;
		}
        $("#tip").offset({top: trigger.position().top + 0, left: posleft});
}  
$(document).ready(function(){
	//Display the repo_name in all the correct spots
	$(".repo_name").text(repo_name);
	//Is this a meta-regression?
	if (repo_dir == "Early-goal-directed-therapy-for-septic-shock"){
		//code for testing a specific repository
	}
	$("#metaregression_figure").attr('src', 'https://raw.githubusercontent.com/' + sub_domain + '/' + repo_dir + '/master/' + $("#metaregression_figure").attr('src'))
	$("#metaregression_figure").load(function() {
		metaregression = true;
		$("#metaregression").show();
	});
	//Customize src for images based on repo name
	$("#forest").attr('src', 'https://raw.githubusercontent.com/' + sub_domain + '/' + repo_dir + '/master/' + $("#forest").attr('src'))
	$("#grade").attr('src', 'https://raw.githubusercontent.com/' + sub_domain + '/' + repo_dir + '/master/' + $("#grade").attr('src'))
	//Link rewrites
	$("body").find('a.main').each(function(){
		//gh-pages
		$(this).attr('href', "http://" + sub_domain + ".github.io/" + $(this).attr("href"));
		})
	$("body").find('a.master').each(function(){
		//For directories on gh-pages
		$(this).attr('href', 'https://github.com/' + sub_domain + '/' + repo_dir + '/' + $(this).attr("href"));
		})
	$("body").find('a.master-dir').each(function(){
		//For directories on master
		$(this).attr('href', 'https://github.com/' + sub_domain + '/' + repo_dir + '/tree/master/' + $(this).attr("href"));
		})
	$("body").find('a.master-file').each(function(){
		//For specific files on master
		$(this).attr('href', 'https://raw.githubusercontent.com/' + sub_domain + '/' + repo_dir + '/master/' + $(this).attr("href"));
		})
	//Tips
	$("body").find('GRADE').each(function(){
		//For GRADE
		//$(this).attr("id","grade_quality_definition")
		//$(this).attr("class","hastip")
		//$(this).attr("href","#")
		//$(this).attr('href', "http://www.ncbi.nlm.nih.gov/pubmed/" + $(this).text());
		$(this).replaceWith($("<a href=\"#\" class=\"hastip\" id=\"grade_quality_definition\">" + $(this).text() + '</a>'));
		})
	$("body").find('SoF').each(function(){
		//For Summary of Findings Tables
		$(this).replaceWith($("<a href=\"#\" class=\"hastip\" id=\"SoF_explanation\">" + $(this).text() + '</a>'));
		})
	//For eligibility criteria
	$("CRITERIA").css("display","none")
	$("#criteria_display").html($("CRITERIA").html())
	
	$("body").find('RED').each(function(){
		//For red font
		$(this).replaceWith($("<span style=\"color:red;font-weight:normal\">" + $(this).text() + '</span>'));
		})
	$("body").find('FOREST_PLOTS').each(function(){
		//Link to directory of forest plots
		$(this).replaceWith($("<a href=\"https://github.com/" + sub_domain + '/' + repo_dir + "/tree/master/forest-plots/\" title=\"forest plots\">" + $(this).text() + '</a>'));
		})
	$("body").find('a.pmid').each(function(){
		//For PMIDs
		$(this).attr('href', "http://www.ncbi.nlm.nih.gov/pubmed/" + $(this).text());
		})
	$("body").find('pmid').each(function(){
		//For PMIDs
		//$(this).attr('href', "http://www.ncbi.nlm.nih.gov/pubmed/" + $(this).text());
		$(this).replaceWith($("<a href=\"http://pubmed.gov/" + $(this).text() + "\">" + $(this).text() + '</a>'));
		})
	$("body").find('PMID').each(function(){
		//For PMIDs
		//$(this).attr('href', "http://www.ncbi.nlm.nih.gov/pubmed/" + $(this).text());
		$(this).replaceWith($("<a href=\"http://pubmed.gov/" + $(this).text() + "\">" + $(this).text() + '</a>'));
		})
	if ($("#references").length){
		var replaced_text = $("#references").html();
		//alert("Testing:\n\n" + $("#references").html())
		// Set the regex string for PMCIDs
		var regex = /(\s{1,})(pmc\d{7,})/ig;
		// Replace plain text links by hyperlinks
		replaced_text = replaced_text.replace(regex, "$1<a href='http://pubmedcentral.gov/$2'>$2</a>");
		// Set the regex string for NCTs
		regex = /(\s{1,})(NCT\d{7,})/ig;
		// Replace plain text links by hyperlinks
		replaced_text = replaced_text.replace(regex, "$1<a href='https://clinicaltrials.gov/ct2/show/study/$2'>$2</a>");
		// Set the regex string for PMIDs
		regex = /(\s{1,})(\d{7,})/ig;
		// Replace plain text links by hyperlinks
		replaced_text = replaced_text.replace(regex, "$1<a href='http://pubmed.gov/$2'>$2</a>");
		// Set the regex string for line
		// try 1: regex = /([^>]\n{1,}\s{0,})/ig;
		regex = /([^>])(\n{1,}\s{0,})/ig;
		// Replace plain text line feeds with <br>
		// try 1: replaced_text = replaced_text.replace(regex, "<br>");
		replaced_text = replaced_text.replace(regex, "$1<br>\n");
		}
	// Echo content
	$('#references').html(replaced_text);
	//write footer business
	//write to div business in the footer
	//Resuse
	$("#business").append("<div style='text-align:center'><a href='https://github.com/openMetaAnalysis/openMetaAnalysis.github.io/blob/master/reusing.MD'>Cite &amp; use this content</a></div>")
	//Edit and issues/comments
	$("#business").append("<div style='text-align:center'><a href='https://github.com/" + sub_domain + '/' + repo_dir + "/blob/gh-pages/" + pagename + "'>Edit this page</a> - <a href='https://github.com/" + sub_domain + '/' + repo_dir + "/issues?q=is%3Aboth+is%3Aissue'>Issues and comments</a></div>")
	//Version date...
	lastmod = document.lastModified     // get string of last modified date
	lastmoddate = Date.parse(lastmod)   // convert modified string to date
	if (lastmoddate == 0) {               // unknown date (or January 1, 1970 GMT)
		$("#business").append("<div style='text-align:center'>You need a new browser</div>")
	} else {
		$("#business").append("<div style='text-align:center'>Updated: " + lastmod + " - <a href='https://github.com/" + sub_domain + '/' + repo_dir + "/commits/gh-pages/" + pagename + "'>History</a></div>")
	}
	//Event handlers
	$('#tip').mouseleave(function(event){
		$( "#tip" ).css('display', 'none');
		});
	$('a.hastip_intitle').mouseenter(function(event){
		var tiptext = $(this).attr('title')
		trigger = $(this);
		width = "200px"
		showtip(tiptext, trigger, width);
		});
	$('a.hastip').mouseenter(function(event){
		var tipname = $(this).attr("id");
		trigger = $(this);
		width = "400px"
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
				showtip(tiptext, trigger, width)
			}
			if(statusTxt=="error"){
				alert("Error: "+xhr.status+": "+xhr.statusText);
			}
			});


	});
})
