var Geo = function () {
    var _self = this;
    this.latitude = "";
    this.longitude = "";
    this.position = {};

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

};