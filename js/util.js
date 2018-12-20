'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_TIME = 500;
  var similarErrorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorElement = similarErrorTemplate.cloneNode(true);
  var errorElementMessage = similarErrorTemplate.querySelector('h2');
  var main = document.querySelector('main');
  var errorButton = errorElement.querySelectorAll('.error__button');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successElement = successTemplate.cloneNode(true);
  var successButton = successElement.querySelector('.success__button');

  var errorElementClose = function () {
    errorElement.style.display = 'none';
    errorButton.forEach(function (button) {
      button.removeEventListener('click', onErrorButtonClick);
      button.removeEventListener('keydown', onErrorButtonKeyDown);
    });
    document.removeEventListener('keydown', onErrorDocumentKeyDown);
  };

  var onErrorButtonClick = function () {
    errorElementClose();
  };

  var onErrorButtonKeyDown = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      errorElementClose();
    }
  };

  var onErrorDocumentKeyDown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      errorElementClose();
    }
  };

  var successElementClose = function () {
    successElement.style.display = 'none';
    successButton.removeEventListener('click', onSuccessButtonClick);
    successElement.removeEventListener('keydown', onSuccessButtonKeyDown);
    document.removeEventListener('keydown', onSuccessDocumentKeyDown);
  };

  var onSuccessButtonClick = function () {
    successElementClose();
  };

  var onSuccessButtonKeyDown = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      successElementClose();
    }
  };

  var onSuccessDocumentKeyDown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      successElementClose();
    }
  };

  var utilInit = function () {
    main.appendChild(errorElement);
    errorElement.style.display = 'none';
    main.appendChild(successElement);
    successElement.style.display = 'none';
  };

  utilInit();

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
      errorElementMessage.textContent = errorMessage;
      errorButton.forEach(function (button) {
        button.addEventListener('click', onErrorButtonClick);
        button.addEventListener('keydown', onErrorButtonKeyDown);
      });
      document.addEventListener('keydown', onErrorDocumentKeyDown);
      errorElement.style.display = 'flex';
      main.addEventListener('click', onErrorButtonClick);
    },
    showSuccess: function () {
      successButton.addEventListener('click', onSuccessButtonClick);
      successElement.addEventListener('keydown', onSuccessButtonKeyDown);
      document.addEventListener('keydown', onSuccessDocumentKeyDown);
      successElement.style.display = 'flex';
      main.addEventListener('click', onSuccessButtonClick);
    },
    shuffle: function (array) {
      var m = array.length;
      var t;
      var i;
      while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
      return array;
    },
    debounce: function (func) {
      var lastTimeout = null;
      var parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        func.apply(null, parameters);
      }, DEBOUNCE_TIME);
    }
  };
})();
