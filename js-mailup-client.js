
/** 
 * A JS MailUp Client
 * Require jQuery to perfor AJAX requests
 */
var MailUpManager = function ()
{
    var _self = this;
	var MAILUP_URL_ID = ""
    var apiRoot = "https://" + MAILUP_URL_ID + ".mailupclient.com/frontend";

   /** 
    * Subscribe to one or more lists/groups
    * @param {object} data - the user data and flags to post
    * @param {function} callback - the function to invoke after the request with response as param
    * @return - no data is returned
    */
    this.subscribe = function (data, callback) {
        var actionUrl = apiRoot + "/xmlSubscribe.aspx";

        var dataToSend = {
            "retCode": "1",  // 0/1 as a string
            "confirm": "on", // on/off 
            "email": "",     // the email
            "list": "",      // list id as string
            "group": ""      // group id as string            
        };
        
        $.extend(true, dataToSend, data);

        $.ajax({
            url: actionUrl,
            method: 'POST',
            data: dataToSend
        }).done(function (response) {
            /* 
               - Response codes (as strings):  
               0: Operation completed successfully 
               1: Generic error 
               2: Invalid email address or mobile number 
               3: Recipient already subscribed 
               -1011: IP not registered 
            */
            if (!!callback) { 
                callback(response.trim());
            }
        }).fail(function (response) {
            if (!!callback) {
                callback(response.trim());
            }
            //console.log("Mailup subscribe failed\n", response);
        });
    };

};