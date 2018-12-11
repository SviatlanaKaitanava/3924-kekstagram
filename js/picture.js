'use strict';
(function () {
  var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  window.picture = function (picture) {
    var pictureElement = similarPictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  };
})();
