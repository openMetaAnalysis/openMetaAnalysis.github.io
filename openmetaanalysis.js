$(document).ready(function(){
	var repo_dir = location.pathname.substring(1,location.pathname.indexOf("/",1));
	var repo_name = repo_dir.replace('-', ' ');
	//Display the repo_name in all the correct spots
	$(".repo_name").text(repo_name);
	//Link handlers
	$(".main").click(function(event){
		event.preventDefault();
		window.location.href = "http://openmetaanalysis.github.io/" + $(this).attr("href");
	});
	$(".repo").click(function(event){
		event.preventDefault();
		window.location.href = "http://github.com/" + $(this).attr("href");
	});
	$(".pmid").click(function(event){
		event.preventDefault();
		window.location.href = "http://www.ncbi.nlm.nih.gov/pubmed/" + $(this).text(); //$(this).attr("href")
	});
})
