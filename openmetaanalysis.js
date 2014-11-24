var repo_name = location.pathname.substring(1,location.pathname.indexOf("/",1));
$(document).ready(function(){
  //Link handlers
  $(".main").click(function(event){
    event.preventDefault();
	window.location.href = "http://openmetaanalysis.github.io/" + $(this).attr("href")
  });
  $(".repo").click(function(event){
    event.preventDefault();
	window.location.href = "http://github.com/" + $(this).attr("href")
  });
  $(".pmid").click(function(event){
    event.preventDefault();
	window.location.href = "http://www.ncbi.nlm.nih.gov/pubmed/" + $(this).text() //$(this).attr("href")
  });
})
