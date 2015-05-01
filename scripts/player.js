/* Resize media player */

function formatPage() {

	var _mediaBox = document.getElementById("mediaBox");
	var _mediaPlayer = document.getElementById("mediaPlayer");


	var windowWidth = window.innerWidth;

	var aspectRatio = _mediaPlayer.clientHeight / _mediaPlayer.clientWidth;


	var w = Math.floor(windowWidth * 0.9) + "px";

	_mediaBox.style.width = Math.floor(windowWidth * 0.9) + "px"; // Set width to 90% of screen width

	_mediaBox.style.height = Math.floor(aspectRatio * (windowWidth * 0.9)) + "px"; // set height to maintain aspect ratio

}


/* Show media player controls when media player is ready */

function showControls() {

	formatPage();
	updateCurrentTime();


	var _mediaControlDiv = document.getElementById("mediaControlDiv");

	_mediaControlDiv.style.visibility = "visible";

}


/* Toggle play/pause media */

function playPauseMedia() {

	var _playDiv = document.getElementById("playDiv");
	var _playImg = document.getElementById("playImg");
	var _speed = document.getElementById("speed");
	var _mediaPlayer = document.getElementById("mediaPlayer");


	/* Play */

	if (_mediaPlayer.paused) {

		_playImg.src = "../images/controls/pause.png"; // Switch image
		_mediaPlayer.play();
		_speed.innerText = "Speed: " + _mediaPlayer.playbackRate + "x"; // Display play speed

	/* Pause */

	} else {

		_playImg.src = "../images/controls/play.png"; // Switch image
		_mediaPlayer.pause();
		_speed.innerText = "Speed: Paused"; // Display play speed

	}


	_playDiv.blur(); // Unselect button so menu will fade

}


/* Start media from beginning */

function restartMedia() {

	var _restartDiv = document.getElementById("restartDiv");
	var _mediaPlayer = document.getElementById("mediaPlayer");


	_mediaPlayer.currentTime = 0;
	_restartDiv.blur(); // Unselect button so menu will fade

}

/* Toggle media playback speed between normal and half speed */

function slowMedia() {

	var _slowDiv = document.getElementById("slowDiv");
	var _speed = document.getElementById("speed");
	var _mediaPlayer = document.getElementById("mediaPlayer");

	
	/* Half speed */

	if (_mediaPlayer.playbackRate > 0.5) {

		_mediaPlayer.playbackRate = 0.5;

	/* Normal speed */

	} else {

		_mediaPlayer.playbackRate = 1.0;

	}


	_speed.innerText = "Speed: " + _mediaPlayer.playbackRate + "x"; // Display play speed
	_slowDiv.blur(); // Unselect button so menu will fade

}


/* Toggle speed from normal to double to triple and back */

function fastforwardMedia() {

	var _fastforwardDiv = document.getElementById("fastforwardDiv");
	var _speed = document.getElementById("speed");
	var _mediaPlayer = document.getElementById("mediaPlayer");

	
	/* Double speed */

	if (_mediaPlayer.playbackRate < 2.0) {

		_mediaPlayer.playbackRate = 2.0;

	/* Triple speed */

	} else if (_mediaPlayer.playbackRate < 3.0) {

		_mediaPlayer.playbackRate = 3.0;

	/* Normal speed */

	} else {

		_mediaPlayer.playbackRate = 1.0;

	}


	_speed.innerText = "Speed: " + _mediaPlayer.playbackRate + "x"; // Display play speed
	_fastforwardDiv.blur(); // Unselect button so menu will fade

}


/* Increase volume in increments of 10% */

function volumeupMedia() {

	var _volumeupDiv = document.getElementById("volumeupDiv");
	var _volume = document.getElementById("volume");
	var _mediaPlayer = document.getElementById("mediaPlayer");


	if (_mediaPlayer.muted != true) { // Check if it's muted

		if (_mediaPlayer.volume < 1.0) { // Don't go above 100%

			_mediaPlayer.volume = _mediaPlayer.volume + 0.1;
		
		}

		_volume.innerText = "Volume: " + Math.floor(_mediaPlayer.volume * 100) + "%"; // Display volume

	}


	_volumeupDiv.blur(); // Unselect button so menu will fade

}


/* Decrease volume in increments of 10% */

function volumedownMedia() {

	var _volumedownDiv = document.getElementById("volumedownDiv");
	var _volume = document.getElementById("volume");
	var _mediaPlayer = document.getElementById("mediaPlayer");


	if (_mediaPlayer.muted != true) { // Check if it's muted

		if (_mediaPlayer.volume > 0.1) { // Don't go below 0%

			_mediaPlayer.volume = _mediaPlayer.volume - 0.1;
		
		}

		_volume.innerText = "Volume: " + Math.floor(_mediaPlayer.volume * 100) + "%"; // Display volume

	}


	_volumedownDiv.blur(); // Unselect button so menu will fade

}


/* Toggles mute/unmute */

function volumeonMedia() {

	var _volumeonDiv = document.getElementById("volumeonDiv");
	var _volumeonImg = document.getElementById("volumeonImg");
	var _volume = document.getElementById("volume");
	var _mediaPlayer = document.getElementById("mediaPlayer");


	/* Mute volume */

	if (_mediaPlayer.muted != true) {

		_volumeonImg.src = "../images/controls/volumeoff.png"; // Switch image
		_mediaPlayer.muted = true;
		_volume.innerText = "Volume: Muted"; // Display volume

	/* Unmute volume */

	} else {

		_volumeonImg.src = "../images/controls/volumeon.png"; // Switch image
		_mediaPlayer.muted = false;
		_volume.innerText = "Volume: " + Math.floor(_mediaPlayer.volume * 100) + "%"; // Display volume

	}


	_volumeonDiv.blur(); // Unselect button so menu will fade

}


/* Set current media timestamp to relative position on seek div */

function seekGo(){

	var _seekDiv = document.getElementById("seekDiv");
	var _seekHandle = document.getElementById("seekHandle");
	var _mediaPlayer = document.getElementById("mediaPlayer");


	/* Find the left edge of the seek div relative to the window */

	var _offset = 0;
	var obj = _seekDiv;
	
	if (obj.offsetParent) {
		do {
			_offset += obj.offsetLeft;
		} while (obj = obj.offsetParent);
	}


	var x = event.clientX - _offset; // Mouse position within the seek div
	var w = _seekDiv.clientWidth;

	_mediaPlayer.currentTime = Math.floor(_mediaPlayer.duration * (x / w)); // Set the new time stamp


	_seekHandle.blur(); // Unselect button so menu will fade
	_seekDiv.blur(); // Unselect button so menu will fade

}


/* Update and display current timestamp and media duration */

function updateCurrentTime() {

	var _playImg = document.getElementById("playImg");
	var _seekDiv = document.getElementById("seekDiv");
	var _seekHandle = document.getElementById("seekHandle");
	var _time = document.getElementById("time");
	var _duration = document.getElementById("duration");
	var _mediaPlayer = document.getElementById("mediaPlayer");


	_seekHandle.style.left = Math.floor(_seekDiv.clientWidth * (_mediaPlayer.currentTime / _mediaPlayer.duration)) + "px"; // Move the seek handle

	
	/* Format current time into HOUR:MINUTE:SECOND */

	var currentHour = Math.floor((_mediaPlayer.currentTime / 60) / 60);
	var currentMinute = Math.floor((_mediaPlayer.currentTime / 60) - (currentHour * 60));
	var currentSecond = Math.floor(_mediaPlayer.currentTime - (currentMinute * 60) - ((currentHour * 60) * 60));

	/* Make sure it's in two digit format */

	if(currentHour < 10) {

		currentHour = "0" + currentHour;

	}

	if(currentMinute < 10) {

		currentMinute = "0" + currentMinute;

	}

	if(currentSecond < 10) {

		currentSecond = "0" + currentSecond;

	}

	_time.innerText = currentHour + ":" + currentMinute + ":" + currentSecond; // Display current timestamp


	/* Format media duration into HOUR:MINUTE:SECOND */

	var totalHour = Math.floor((_mediaPlayer.duration / 60) / 60);
	var totalMinute = Math.floor((_mediaPlayer.duration / 60) - (totalHour * 60));
	var totalSecond = Math.floor(_mediaPlayer.duration - (totalMinute * 60) - ((totalHour * 60) * 60));

	if(totalHour < 10) {

		totalHour = "0" + totalHour;

	}

	if(totalMinute < 10) {

		totalMinute = "0" + totalMinute;

	}

	if(totalSecond < 10) {

		totalSecond = "0" + totalSecond;

	}

	_duration.innerText = totalHour + ":" + totalMinute + ":" + totalSecond; // Display media duration



	/* Change to play button */

	if(_mediaPlayer.currentTime == _mediaPlayer.duration) {

		_playImg.style.background = "../images/controls/play.png";

	}

}

