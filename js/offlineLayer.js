L.OfflineTileLayer = L.TileLayer.extend({

    createTile: function (coords, done) {
        var tile = document.createElement('img');

        tile.onload = L.bind(this._tileOnLoad, this, done, tile);
        tile.onerror = L.bind(this._tileOnError, this, done, tile);

        if (this.options.crossOrigin) {
            tile.crossOrigin = '';
        }

        /*
         Alt tag is set to empty string to keep screen readers from reading URL and for compliance reasons
         http://www.w3.org/TR/WCAG20-TECHS/H67
        */
        tile.alt = '';

        var x = coords.x;
        var y = this.options.tms ? this._globalTileRange.max.y - coords.y : coords.y;
        var zoom = this._getZoomForUrl();

        // Tile path to return
        var errorUrl = this.options.errorTileUrl;

        if (mapsforge.cache) {
            mapsforge.cache.getTile([ x, y, zoom ], function(result) {
                tile.src = result;
            }, function(error) {
                tile.src = errorUrl;
                console.log(error);
            });
        }

        return tile;
    }
});


L.offlineTileLayer = function(options) {
    return new L.OfflineTileLayer(null, options);
};
