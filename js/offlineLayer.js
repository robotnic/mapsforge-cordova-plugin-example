L.OfflineTileLayer = L.TileLayer.extend({
    getTileUrl: function(tilePoint, tile) {
        if (typeof(mapsforge)=="undefined") {
            console.warn("mapsforge not loaded");
            return;
        }
        var zoom = tilePoint.z,
            x = tilePoint.x,
            y = tilePoint.y;

        if (mapsforge.cache) {
            var start = new Date().getTime();
            mapsforge.cache.getTile([x, y, zoom], {
                onSuccess: function(result) {
                    console.log("1 " + (new Date().getTime() - start)+"ms");
                    tile.src = result;
                },
                onError: function() {
                    tile.src = "path to an error image";
                }
            });
            console.log("2 " + (new Date().getTime() - start)+"ms <--- should be 0ms");
            //adb logcat |grep Console 
        } else {
            tile.src = "path to an error image";
        }
    },

    _loadTile: function(tile, tilePoint) {
        tile._layer = this;
        tile.onload = this._tileOnLoad;
        tile.onerror = this._tileOnError;

        this._adjustTilePoint(tilePoint);
        this.getTileUrl(tilePoint, tile);

        this.fire('tileloadstart', {
            tile: tile,
            url: tile.src
        });
    }
});

L.offlineTileLayer = function(options) {
    return new L.OfflineTileLayer(null, options);
};
