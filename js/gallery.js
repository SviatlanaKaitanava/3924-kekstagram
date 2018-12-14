'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  var picturesList = document.querySelector('.pictures');

  var onLoad = function (pictures) {
    pictures.forEach(function (picture, index) {
      fragment.appendChild(window.picture(pictures[index]));
    });
    picturesList.appendChild(fragment);
  };

  var onError = function (errorMessage) {
    window.util.showError(errorMessage);
  };
  window.backend.load(onLoad, onError);
})();
