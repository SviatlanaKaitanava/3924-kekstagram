'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  var picturesList = document.querySelector('.pictures');

  var onLoad = function (pictures) {
    pictures.forEach(function (picture) {
      var picElement = window.picture.createElement(picture);
      picElement.addEventListener('click', function () {
        window.preview.showPreview(picture);
      });
      fragment.appendChild(picElement);
    });
    picturesList.appendChild(fragment);
  };

  var onError = function (errorMessage) {
    window.util.showError(errorMessage);
  };
  window.backend.load(onLoad, onError);
})();
