/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */

/**
 * @param {string} searchTerm - Search term for Google Image search.
 * @param {function(string,number,number)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 */

function playVideo(videoURL, startSec) {
	videoURL = videoURL.replace("watch?v=","embed/");
	videoURL = videoURL+"?autoplay=1&start="+startSec;
	iframe = "<iframe style='width:100%;height:320px;' src='"+videoURL+"' frameborder='0'></iframe>";
	return iframe;
}

document.addEventListener('DOMContentLoaded', function() {
	chrome.tabs.query({url: "https://www.youtube.com/watch?v=*"}, searchForYoutube);
});

function displayMultipleVideo(tabs){
	nbYoutubes = tabs.length;
	listOfVid = "";
	for(i = 0; i < nbYoutubes; i++){
		videoURL = tabs[i].url;
		videoUC = videoURL.substring(32);//Video Unique Code
		videoTitle = tabs[i].title.replace("- YouTube", "");
		divVideo = "<div class='row'><div class='col'><img aria-hidden='true' width='168' data-url='"+videoURL+"' data-title='"+videoTitle+"'height='94' src='https://i.ytimg.com/vi/"+videoUC+"/hqdefault.jpg' alt='' style='top: 0px'><span class='video-time'>3:44</span></div><div class='col'><h6>"+videoTitle+"</h6></div></div><br>";
		listOfVid += divVideo;
	}
	$("#firstRow").html(listOfVid);
	$("img").each(function(){
		$(this).on("click", function(){
			selectedURL = $(this).attr("data-url");
			selectedTitle = $(this).attr("data-title");
			$("#firstRow").html(playVideo(selectedURL, 0)+"<br>"+selectedTitle);
		});
	});
}

function searchForYoutube(tabs){
	nbYoutubes = tabs.length;
	if(nbYoutubes == 1){
		videoURL = tabs[0].url;
		startSec = 0;
		videoTitle = tabs[0].title.replace("- YouTube", "");
		$("#firstRow").html(playVideo(videoURL, startSec)+"<br>"+videoTitle);
	}else{
		displayMultipleVideo(tabs)
	}
}
