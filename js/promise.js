/*
This does not work at the moment.
Here the promise syntax for callback is used.
https://github.com/kriskowal/q
*/


var mapfile="/mnt/sdcard/Download/austria.map";  // <-------------- change this


var map = L.map('map').setView([48.205, 16.3], 13);


// define an tile layers

var layers={
   osm:L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   }),
   offline:L.offlineTileLayer({
       maxZoom: 18
   })
};

//add osm layer to map
layers.osm.addTo(map);

document.addEventListener("deviceready", function() {
    console.log("deviceready");
    if(typeof(mapsforge)!=="undefined"){
        mapsforge.cache.initialize(mapfile).then(function() {
                console.log("map file loaded");
                layers.offline.addTo(map);
                L.control.layers({
                    "OpenStreetMap":layers.osm,
                    "Offline":layers.offline 
                }).addTo(map);

            },
            function(error) {
                console.log("error loading map file: "+mapfile);
            }
        );
    }else{
        console.log("mapsforge not loaded");
    }
}, false);


