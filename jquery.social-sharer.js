/**
 * [This Plugin Manage The Sharing of the current page on social networks]
 * @param  {[type]} $         [jQuery object]
 * @param  {[type]} window    [the current window]
 * @param  {[type]} document  [the current document]
 * @param  {[type]} undefined [is a REAL undefined type, safer for type sensitive compare]
 * @return {[type]}           [return every instances on the dom]
 */
;(function($, window, document, undefined) {
  'use strict';

  // Create the defaults once
  var pluginName = 'socialSharer',
    defaults = {
      popup_width: 600,
      popup_height: 400,
      center_popup: true,
      inject_buttons: true,
      sharers: {
        facebook: 'https://www.facebook.com/sharer/sharer.php?u=#URL#&display=popup',
        twitter: 'https://twitter.com/intent/tweet?original_referer=#URL#&text=#TEXT#&url=#URL#',
        googleplus: 'https://plus.google.com/share?url=#URL#',
      },
      buttons: {
        facebook: '<button class="facebook btn btn-info" data-target="facebook" data-text="Take a look">Facebook</button>',
        twitter: '<button class="twitter" data-target="twitter" data-text="Take a look">Twitter</button>',
        googleplus: '<button class="googleplus" data-target="googleplus" data-text="Take a look">Google Plus</button>',
      },
      onOpened: function(fireElem, popup, callback) {
        if (typeof callback === 'function') {
          callback(opts);
        }
        console.log('Opened');
        console.log(typeof callback);
      },

      onClosed: function(fireElem, popup, callback) {
        if (typeof callback === 'function') {
          callback(opts);
        }
        console.log('Closed');
        console.log(callback);
      },
    };

  // The actual plugin constructor
  function Plugin(element, options) {
    this.element = element;
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {
    init: function() {
      var _this = this;
      if (this.settings.inject_buttons) {
        this.injectButtons();
      }

      $('button, a', this.element).on('click', function(e) {
        e.preventDefault();
        var social = $(this).data('target');
        var text = $(this).data('text') !== undefined ? $(this).data('text') : '';
        var url_tpl = _this.settings.sharers[social];
        var url = url_tpl
          .replace(/#URL#/g, location.href)
          .replace(/#TEXT#/g, text);
        _this.openPopup(url, this);
      });
    },

    injectButtons: function() {
      var _this = this;
      var buttons = this.settings.buttons;
      $(Object.keys(buttons)).each(function(i, e) {
          $(_this.element).append(buttons[e]);
      });
      /*var buttons = this.settings.buttons.facebook +
        this.settings.buttons.twitter +
        this.settings.buttons.googleplus;
      $(this.element).html(buttons);*/
    },

    openPopup: function(url, fireElem) {
      var _this = this;
      if (this.settings.center_popup === true) {
        var top = Math.floor((screen.height - this.settings.popup_height) / 2);
        var left = Math.floor((screen.width - this.settings.popup_width) / 2);
      } else {
        var top = 0,
          left = 0;
      }
      var popup = window.open(
        url,
        "",
        "width=" + this.settings.popup_width +
        ",height=" + this.settings.popup_height +
        ",top=" + top +
        ",left=" + left
      );

      /* ========================================
      	Cross Domain Events
      ** ======================================== */
      $(popup.window.document).ready(function(e) {
        _this.settings.onOpened(fireElem, popup);
      });
      var tClosed = setInterval(function() {
        if (popup.closed) {
          _this.settings.onClosed(fireElem, popup);
          clearInterval(tClosed);
        }
      }, 100);

      /* ========================================
      	Same Domain ONLY Events
      ** ====================================== */
      /*$(popup).on("load", function(e){
      		console.log("Load!");
      		console.log(popup);
      });
      $(popup).on("beforeunload", function(e){
      		console.log("Before UnLoad");
      });
      $(popup).on("unload", function(e){
      		console.log("UnLoad");
      });*/
    }
  });

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" +
          pluginName, new Plugin(this, options));
      }
    });
  };

})(jQuery, window, document);


/* Usage
$("#ss").socialSharer({
    popup_width: 600,
    popup_height: 400,
    center_popup: true,
    inject_buttons: true,
    buttons: {
      facebook: '<a class="facebook btn btn-primary" data-target="facebook" data-text="Take a look"><i class="fa fa-facebook-f"></i></a>',
      twitter: '<a class="twitter" data-target="twitter" data-text="Take a look">Twitter</a>',
      googleplus: '<button class="googleplus" data-target="googleplus" data-text="Take a look">Google Plus</button>'
    },
    onOpened: function(fireElem, popup) {
      console.log("Opened");
      console.log(button);
      console.log(popup);
    },
    onClosed: function(fireElem, popup) {
      switch($(button).data("social"))
      {
          case 'facebook':
            alert("Chiuso Facebook!");
            break;
          case 'twitter':
            alert("Chiuso Twitter");
            break;
          case 'googleplus':
            alert("Chiuso Google Plus");
            break;
      }
      //console.log("Closed");
      //console.log(button);
      //console.log(popup);
    }
});
*/
