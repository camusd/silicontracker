
// Using our custom attach method to accept camera id's.
Webcam.attach = newAttach;


function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}
if (!hasGetUserMedia()) {
  alert('Warning: The webcam may not work for this browser.');
}

// http://jsfiddle.net/xLF38/818/
// Gets the average RGB values of the imgage provided.
function getAverageRGB(imgEl) {
  var blockSize = 5, // only visit every 5 pixels
    defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
    canvas = document.createElement('canvas'),
    context = canvas.getContext && canvas.getContext('2d'),
    data, width, height,
    i = -4,
    length,
    rgb = {r:0,g:0,b:0},
    count = 0;
        
    if (!context) {
      return defaultRGB;
    }
    
    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
    
    context.drawImage(imgEl, 0, 0);
    
    try {
      data = context.getImageData(0, 0, width, height);
    } catch(e) {
      /* security error, img on diff domain */alert('x');
      return defaultRGB;
    }
    
    length = data.data.length;
    
    while ( (i += blockSize * 4) < length ) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i+1];
      rgb.b += data.data[i+2];
    }
    
    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);
    
    return rgb;
}

$(document).ready(function() {
  var depthCamId, rgbCamId;
  var camIds = [];

  var OSName="Unknown OS";
  if (navigator.appVersion.indexOf("Win")!=-1) { OSName="Windows" };
  if (navigator.appVersion.indexOf("Linux")!=-1) { OSName="Linux" };

  // Webcam setup
  Webcam.set({
    width: 320,
    height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90
  });

  // Linux cuts off the ends of the camera names, because they are too long.
  // The end of the camera names determine the differences between the cameras.
  // This makes it so we have to determine ourselves which camera is being run.
  // We do an analysis on the images after the images are taken.
  // if (OSName === 'Linux') {
    // Find all the cameras
    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
      for (var i = 0; i != devices.length; ++i) {
        var device = devices[i];
        if (device.kind === 'videoinput' && device.label.includes('RealSense')) {
          camIds.push(device.deviceId);
        }
      }
      // Attach the first camera.
      Webcam.attach('#my_camera0', camIds[0]);
      $('#snapshot').click(function() {
        var imagesToSend = [];
        // take snapshot and get image data from first camera
        Webcam.snap( function(data_uri0) {
          $('#results0').html( 
            '<img id="myimg0" src="'+data_uri0+'"/>');
          

          // Attach second camera
          Webcam.attach('#my_camera1', camIds[1]);
          setTimeout(function() {
            // take snapshot of second camera
            Webcam.snap( function(data_uri1) {

              $('#results1').html(
                '<img id="myimg1" src="'+data_uri1+'"/>');
              
              // Since we don't know which image is which, we verify using
              // getting the average colors. The one that has way more green
              // than red or blue is the depth camera.
              var rgb = getAverageRGB(document.getElementById('myimg0'));
              if (rgb.g > rgb.b+100 && rgb.g > rgb.r+100) {
                // got depthcam
                imagesToSend.push({type: 'depth', uri: data_uri0});
                imagesToSend.push({type: 'rgb', uri: data_uri1});
              } else {
                // got rgbcam
                imagesToSend.push({type: 'rgb', uri: data_uri0});
                imagesToSend.push({type: 'depth', uri: data_uri1});
              }

              // after we have our images, send them to the server
              if (window.location.pathname === '/settings/facial-setup' ||
                  window.location.pathname === '/settings/facial-setup/') {
                $.post('/web/image', {images: imagesToSend})
                  .done(function() {
                    alert("images saved!");
                    location.reload();
                  });
              }

              if (window.location.pathname === '/kiosk' ||
                  window.location.pathname === '/kiosk/') {
                $.post('/kiosk/image', {images: imagesToSend})
                  .done(function() {
                    window.location = '/cart';
                  });
              }
            });
          }, 1000);
        });
      });
    });
  // }

  // Unlike Linux, Windows keeps the full names of the cameras.
  // This makes things simpler to determine each camera.
  // if (OSName === 'Windows') {
  //   navigator.mediaDevices.enumerateDevices()
  //   .then(function(devices) {
  //     for (var i = 0; i != devices.length; ++i) {
  //       var device = devices[i];
  //       if (device.kind === 'videoinput' && 
  //           device.label.includes('RealSense') &&
  //           device.label.includes('Depth')) {
  //           // We have the depth camera
  //           depthCamId = device.id;
  //       }
  //       if (device.kind === 'videoinput' && 
  //           device.label.includes('RealSense') &&
  //           device.label.includes('RGB')) {
  //           // We have the rgb camera
  //           rgbCamId = device.id;
  //       }
  //     }
  //     // Attach the rgb camera.
  //     Webcam.attach('#my_camera0', rgbCamId);
      
  //     $('#snapshot').click(function() {
  //       // take snapshot and get image data from the rgb camera
  //       Webcam.snap( function(data_uri0) {
  //         $('#results0').html( 
  //           '<img id="myimg0" src="'+data_uri0+'"/>');
          
  //         // Attach the depth camera
  //         Webcam.attach('#my_camera1', depthCamId);
  //         setTimeout(function() {
  //           // take snapshot of second camera
  //           Webcam.snap( function(data_uri1) {

  //             $('#results1').html(
  //               '<img id="myimg1" src="'+data_uri1+'"/>');
  //           });
            
  //           // Grabbing all the images.
  //           imagesToSend.push({type: 'rgb', uri: data_uri0});
  //           imagesToSend.push({type: 'depth', uri: data_uri1});

  //           // after we have our images, send them to the server
  //           $.post('/web/image', {images: imagesToSend})
  //             .done(function() {
  //               alert("images saved!");
  //               location.reload();
  //             });
  //         });
  //       }, 1000);
  //     });
  //   });
  // }
});