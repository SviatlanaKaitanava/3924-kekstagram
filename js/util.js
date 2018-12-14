'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    random: function (max, min) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    showError: function (errorMessage) {
      var similarErrorTemplate = document.querySelector('#error').content.querySelector('.error');
      similarErrorTemplate.querySelector('h2').textContent = errorMessage;
      var errorElement = similarErrorTemplate.cloneNode(true);
      document.querySelector('main').appendChild(errorElement);

      return similarErrorTemplate;
    }
  };
})();
