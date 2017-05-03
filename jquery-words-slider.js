(function ($) {
    $.fn.wordsSlider = function (options) {
        var _this = this; // Pseudo This
        var currentItem = 0;
        var currentPosition = 0;

        // Options / Settings
        var settings = $.extend({
            names: [],
            time: 1000,
            transitionTime: 400,
            width: 200
        }, options);

        // create/append list container
        this.createElements = function () {
            var listContainerNode = document.createElement("DIV");
            listContainerNode.className = "names-list";
            this.append(listContainerNode);
        };

        this.setStyle = function () {
            _this.css({
                width: _this.outerWidth() + "px",
                paddingTop: "1%",
                paddingBottom: "1%",
                overflow: "hidden"
            });

            _this.find(".names-list").css({
                position: "relative",
                left: currentPosition + "px",
                width: _this.outerWidth() * settings.names.length + "px",
                margin: "0",
                padding: "0"
            });

            _this.find(".name").css({
                float: "left",
                width: _this.outerWidth() + "px",
                margin: "0",
                padding: "0",
                textAlign: "center"
            });
        };

        this.appendNames = function () {
            settings.names.forEach(function (item, i) {
                var newNode = document.createElement("DIV");
                newNode.className = "name";
                newNode.innerHTML = item;
                _this.children(".names-list").append(newNode);
            });
        };

        this.prevItem = function () {
            // not implemented yet
        };

        this.nextItem = function () {
            if (currentItem < (settings.names.length-1)) {
                var newPosition = currentPosition - _this.outerWidth();
                _this.children(".names-list").animate({ left: newPosition + "px" }, settings.transitionTime, function () {
                    currentPosition = newPosition;
                    currentItem++;
                });
            } else {
                var newPosition = currentPosition - _this.outerWidth();
                _this.children(".names-list").animate({ left: newPosition + "px" }, settings.transitionTime / 2, function () {
                    _this.children(".names-list").css({ left: _this.outerWidth() + "px" });
                    currentPosition = 0;
                    _this.children(".names-list").animate({ left: currentPosition + "px" }, settings.transitionTime / 2, function () {
                        currentItem = 0;
                    });
                });
            }
        };

        this.startAnimation = function () {
            var timer = setInterval(function () {
                _this.nextItem();
            }, settings.time);
        };

        this.createElements();
        this.appendNames();
        this.setStyle();
        this.startAnimation();

        return this;
    };
}(jQuery));


/*
// Usage Example
$("#airlines-loader").wordsSlider({
    names: [
        "Alitalia", "Air Malta", "Volotea", "Ryanair",
        "Air France", "Lufthansa", "British Airways",
        "Turkish Airlines", "Etihad Airways"
    ],
    time: 1000,
    transitionTime: 600
});
*/


/* Pure JS Solution
(function () {
        var wrapper = document.getElementById("airlines-rotation");
        var list = wrapper.getElementsByClassName("airline");
        var time = 250;
        var count = 0;
        var prev = 0;
        function goNext() {
            if (count === 0) {
                if(prev === list.length-1){
                    //list[prev].style.display = "none";
                    list[prev].style.opacity = "0";
                    prev = 0;
                }
                //list[count].style.display = "inline";
                list[count].style.opacity = "1";
                count++;
            } else {
                //list[prev].style.display = "none";
                list[prev].style.opacity = "0";

                //list[count].style.display = "inline";
                list[count].style.opacity = "1";

                prev = count;
                if (count === list.length - 1) {
                    count = 0;
                } else {
                    count++;
                }
            }
        };
        var interval = setInterval(function () {
            goNext();
        }, time);
    })();
*/