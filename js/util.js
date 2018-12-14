'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    closePopup: function (classPopup) {
      document.querySelector(classPopup).classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
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
