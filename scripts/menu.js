/* Toggle opacity of mediaMenuDiv to 'show' or 'hide' the menu */

function hideShow() {

	var _mediaMenuDiv = document.getElementById("mediaMenuDiv");


	/* Hide */

	if(_mediaMenuDiv.style.opacity=="1.0" || _mediaMenuDiv.style.opacity=="1") {

		_mediaMenuDiv.style.opacity = "0.0";
		_mediaMenuDiv.style.display = "none";

	/* Show */

	} else {
		
		var cgiUrl = "cgi/get.asp?type=menu";


		/* Generate menu from asp script */

		if (window.XMLHttpRequest) {

			xmlhttp=new XMLHttpRequest();

		} else {

			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");

		}
	
		xmlhttp.onreadystatechange=function() {

			if (xmlhttp.readyState==4 && xmlhttp.status==200) {

				_mediaMenuDiv.innerHTML = xmlhttp.responseText;

			}

		}

		xmlhttp.open("GET", cgiUrl, true);
		xmlhttp.send();


		_mediaMenuDiv.style.opacity = "1.0";
		_mediaMenuDiv.style.display = "block";

	}

}


/* Set the video source of the media player and display the media player */

function loadMedia(media) {

	var _mediaDiv = document.getElementById("mediaDiv");
	var _mediaPlayer = document.getElementById("mediaPlayer");
	var _mediaSource = document.getElementById("mediaSource");
	var _mediaTitle = document.getElementById("mediaTitle");
	var _playImg = document.getElementById("playImg");

	_mediaSource.src = media.substring(0, media.lastIndexOf("|")); // strip type
	var temp = unescape(_mediaSource.src.substring(_mediaSource.src.lastIndexOf("/") + 1)); //strip path and translate 'html characters'
	_mediaTitle.innerText = temp.substring(0, temp.lastIndexOf(".")); // strip extension
	_mediaSource.type = media.substring(media.lastIndexOf("|") + 1); //strip all except type
	_playImg.src = "../images/controls/play.png";

	_mediaPlayer.load();

	_mediaDiv.style.display = "block";
	hideShow();

}
