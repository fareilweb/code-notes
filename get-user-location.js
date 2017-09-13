/** 
 * Get User Geo Location 
 * @param {function} callback - a function called when obtain data, has two params: {bool} "status" and {object} "data"
 */
var getUserLocation = function (callback) {
    var options = { enableHighAccuracy: true };
    navigator.geolocation.getCurrentPosition(function success(loc) {
        callback(true, {
            lat: loc.coords.latitude,
            lng: loc.coords.longitude
        });
    }, function error(err) {
        callback(false, {
            errCode: err.code,
            errMsg: err.message
        });
    }, options);
};