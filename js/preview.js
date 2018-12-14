'use strict';
(function () {
  var similarComment = document.querySelector('.social__comment');
  var commentsList = document.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();
  var i;
  var picturesList = document.querySelector('.pictures');
  var choicePictures = picturesList.querySelectorAll('.picture img');

  var clickPicture = function (num) {
    choicePictures[num].addEventListener('click', function () {

      renredComments(num);
      showBigPicture(num);
      document.querySelector('body').classList.add('modal-open');
    });
  };

  for (var k = 0; k < choicePictures.length; k++) {
    var num = k;
    clickPicture(num);
  }

  var generateComment = function (numPicture) {
    var commentElement = similarComment.cloneNode(true);

    commentElement.querySelector('.social__picture').src = window.gallery[numPicture].comments.avatar;
    commentElement.querySelector('.social__text').textContent = window.gallery[numPicture].comments.length;

    return commentElement;
  };

  var renredComments = function (numPicture) {
    commentsList.innerHTML = '';

    for (i = 0; i < window.gallery.comments.length; i++) {
      fragment.appendChild(generateComment(numPicture));
    }

    commentsList.appendChild(fragment);
  };

  var showBigPicture = function () {
    document.querySelector('.big-picture').classList.remove('hidden');
    document.querySelector('.big-picture').focus();
    document.querySelector('.big-picture__img > img').src = window.gallery.url;
    document.querySelector('.likes-count').textContent = window.gallery.likes;
    document.querySelector('.comments-count').textContent = window.gallery.comments.length;
    document.querySelector('.social__caption').textContent = window.gallery.description;
  };

  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');

  window.preview = {
    showBigPicture: showBigPicture,
    renredComments: renredComments
  };
})();
