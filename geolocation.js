var Geo = function () {
    var _self = this;
    this.latitude = "";
    this.longitude = "";
    this.position = {};
    this.google_api_key = "";

    /**
     * Test the current browser for geolocation api functionality
     * @return {bool} available - geo location is avaiable or not
     */
    this.isGeolocationAvailable = function () {
        return !!navigator.geolocation;
    }

    /** 
     * Get User Geo Location 
     * @param {function} callback - callback function has two params: {bool} "status" and {object} "data"
     * @return {bool} 
     */
    this.getUserLocation = function (callback) {
        if (!_self.isGeolocationAvailable()) {
            callback(false, {});
        }

        var options = { enableHighAccuracy: true };

        navigator.geolocation.getCurrentPosition(function success(loc) {

            _self.position = loc;
            _self.latitude = loc.coords.latitude;
            _self.longitude = loc.coords.longitude;

            callback(true, loc.coords);

        }, function error(err) {

            callback(false, {
                errCode: err.code,
                errMsg: err.message
            });

        }, options);
    };
	
	
	
	/** ==================================================== *
		Gogle Api Methods 
	 ** ==================================================== */
	
	/**
	 * Get City By Coordinates
	 * @param {object} position
	 * @param {function} callback
	 */
	this.getCityByPosition = function (position, callback) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        var api_url = "https://maps.googleapis.com/maps/api/geocode/json?";
        api_url += "latlng=" + lat + "," + lng;
        api_url += "&key=" + _self.google_api_key;

        $.get(api_url).done(function (response) {
            response.results.forEach(function (item, index) {
                if (item.types[0] == "administrative_area_level_3") {
                    var city = item.address_components[0].long_name;
                    callback(city);
                }
            });
        }).fail(function (response) {

        });
    }

	/**
	 * Get Position By City
	 * @param {string} city
	 * @param {function} callback
	 */
    this.getPositionByCity = function (city, callback) {
        var api_url = "https://maps.googleapis.com/maps/api/geocode/json?";
        api_url += "address=" + city;
        api_url += "&key=" + _self.google_api_key;

        $.get(api_url).done(function (response) {
            var location = response.results[0].geometry.location;
            callback(location);
        }).fail(function (response) {

        });
    }

};