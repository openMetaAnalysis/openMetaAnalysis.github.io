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
		event.preventDefault();
		window.location.href = "https://raw.githubusercontent.com/openMetaAnalysis/" + repo_dir + $(this).attr("href");
	});
	$(".pmid").click(function(event){
		event.preventDefault();
		window.location.href = "http://www.ncbi.nlm.nih.gov/pubmed/" + $(this).text(); //$(this).attr("href")
	});
	$("pmid").click(function(event){
		event.preventDefault();
		window.location.href = "http://www.ncbi.nlm.nih.gov/pubmed/" + $(this).text(); //$(this).attr("href")
	});
})
