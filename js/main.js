// create a map in the "map" div, set the view to a given place and zoom
var map = L.map('map').setView([48.205, 16.3], 13);
var mapfile="/mnt/sdcard/Download/austria.map";

// add an OpenStreetMap tile layer

var layers={
   osm:L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   }),
   offline:L.offlineTileLayer({
       maxZoom: 18
   })
};

layers.osm.addTo(map);

document.addEventListener("deviceready", function() {
    console.log("deviceready");
    if(typeof(mapsforge)!=="undefined"){
        mapsforge.cache.initialize(mapfile, {
            onSuccess: function() {
                console.log("map file loaded");
                layers.offline.addTo(map);
                layerControl();

            },
            onError: function(error) {
                console.log("error loading map file: "+mapfile);
            }
        });
    }else{
        console.log("mapsforge not loaded");
    }
}, false);

function layerControl() {
    L.control.layers({
        "OpenStreetMap":layers.osm,
        "Offline":layers.offline 
    }).addTo(map);
}

