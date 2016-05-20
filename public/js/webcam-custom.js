var newAttach = function(elem, theSourceId) {
	// create webcam preview and attach to DOM element
	// pass in actual DOM reference, ID, or CSS selector
	if (typeof(elem) == 'string') {
		elem = document.getElementById(elem) || document.querySelector(elem);
	}
	if (!elem) {
		return this.dispatch('error', "Could not locate DOM element to attach to.");
	}
	this.container = elem;
	elem.innerHTML = ''; // start with empty element
	
	// insert "peg" so we can insert our preview canvas adjacent to it later on
	var peg = document.createElement('div');
	elem.appendChild( peg );
	this.peg = peg;
	
	// set width/height if not already set
	if (!this.params.width) this.params.width = elem.offsetWidth;
	if (!this.params.height) this.params.height = elem.offsetHeight;
	
	// set defaults for dest_width / dest_height if not set
	if (!this.params.dest_width) this.params.dest_width = this.params.width;
	if (!this.params.dest_height) this.params.dest_height = this.params.height;
	
	// if force_flash is set, disable userMedia
	if (this.params.force_flash) this.userMedia = null;
	
	// adjust scale if dest_width or dest_height is different
	var scaleX = this.params.width / this.params.dest_width;
	var scaleY = this.params.height / this.params.dest_height;
	
	if (this.userMedia) {
		// setup webcam video container
		var video = document.createElement('video');
		video.setAttribute('autoplay', 'autoplay');
		video.style.width = '' + this.params.dest_width + 'px';
		video.style.height = '' + this.params.dest_height + 'px';
		
		if ((scaleX != 1.0) || (scaleY != 1.0)) {
			elem.style.overflow = 'hidden';
			video.style.webkitTransformOrigin = '0px 0px';
			video.style.mozTransformOrigin = '0px 0px';
			video.style.msTransformOrigin = '0px 0px';
			video.style.oTransformOrigin = '0px 0px';
			video.style.transformOrigin = '0px 0px';
			video.style.webkitTransform = 'scaleX('+scaleX+') scaleY('+scaleY+')';
			video.style.mozTransform = 'scaleX('+scaleX+') scaleY('+scaleY+')';
			video.style.msTransform = 'scaleX('+scaleX+') scaleY('+scaleY+')';
			video.style.oTransform = 'scaleX('+scaleX+') scaleY('+scaleY+')';
			video.style.transform = 'scaleX('+scaleX+') scaleY('+scaleY+')';
		}
		
		// add video element to dom
		elem.appendChild( video );
		this.video = video;
		
		// ask user for access to their camera
		var self = this;
		var opts = {};
		if (theSourceId != null) {
			opts = {
				"audio": false,
				"video":{
					optional: [{sourceId: theSourceId}]
				}
			}
		} else {
			opts = {
				"audio": false,
				"video": true
			}

		}

		navigator.getUserMedia(opts,
		function(stream) {
			// got access, attach stream to video
			video.src = window.URL.createObjectURL( stream ) || stream;
			Webcam.stream = stream;
			Webcam.loaded = true;
			Webcam.live = true;
			Webcam.dispatch('load');
			Webcam.dispatch('live');

			// Get the current camera id
			currentId = stream;
		},
		function(err) {
			return self.dispatch('error', "Could not access webcam.");
		});
		
	}
	else {
		// flash fallback
		var div = document.createElement('div');
		div.innerHTML = this.getSWFHTML();
		elem.appendChild( div );
	}
	
	// setup final crop for live preview
	if (this.params.crop_width && this.params.crop_height) {
		var scaled_crop_width = Math.floor( this.params.crop_width * scaleX );
		var scaled_crop_height = Math.floor( this.params.crop_height * scaleY );
		
		elem.style.width = '' + scaled_crop_width + 'px';
		elem.style.height = '' + scaled_crop_height + 'px';
		elem.style.overflow = 'hidden';
		
		elem.scrollLeft = Math.floor( (this.params.width / 2) - (scaled_crop_width / 2) );
		elem.scrollTop = Math.floor( (this.params.height / 2) - (scaled_crop_height / 2) );
	}
	else {
		// no crop, set size to desired
		elem.style.width = '' + this.params.width + 'px';
		elem.style.height = '' + this.params.height + 'px';
	}
}