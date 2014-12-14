var mapfile="/mnt/sdcard/Download/austria.map"; //  <-------------- change this

var isCordovaApp = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
var map = L.map('map').setView([48.205, 16.3], 13);


// define the tile layers

var layers={
   osm:L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   }),
   cycle:L.tileLayer('http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
        attribution: '&copy;  <a href="http://www.thunderforest.com/">OpenCycleMap</a> <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   }),
   offline:L.offlineTileLayer({
       maxZoom: 18,
       attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   })
};

//add osm layer to map
if(!isCordovaApp){
layers.osm.addTo(map);
                L.control.layers({
                    "OpenStreetMap":layers.osm,
                    "Cycle":layers.cycle,
                }).addTo(map);
}

document.addEventListener("deviceready", function() {
    console.log("deviceready");
    if(typeof(mapsforge)!=="undefined"){
        mapsforge.cache.initialize(mapfile, 
            function() {
                console.log("map file loaded");
                layers.offline.addTo(map);

                //the layer button top right 
                L.control.layers({
                    "OpenStreetMap":layers.osm,
                    "Cycle":layers.cycle,
                    "Offline":layers.offline 
                }).addTo(map);

            },
            function(error) {
                console.log("error loading map file: "+mapfile);
            });
    }else{
        console.log("mapsforge not loaded");
    }
}, false);


