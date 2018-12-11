'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  var picturesList = document.querySelector('.pictures');
  var picturesAll = window.data.picture(25);
  var renderAllPictures = function () {
    for (var i = 0; i < picturesAll.length; i++) {
      fragment.appendChild(window.picture(picturesAll[i]));
    }
    picturesList.appendChild(fragment);
  };
  renderAllPictures();
  window.gallery = picturesAll;
})();
