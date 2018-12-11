'use strict';
(function () {
  var similarComment = document.querySelector('.social__comment');
  var commentsList = document.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();
  var i;

  var generateComment = function (numPicture) {
    var commentElement = similarComment.cloneNode(true);

    commentElement.querySelector('.social__picture').src = 'img/avatar-' + window.data.random(6, 1) + '.svg';
    commentElement.querySelector('.social__text').textContent = window.gallery[numPicture].comments[i];

    return commentElement;
  };

  var renredComments = function (numPicture) {
    commentsList.innerHTML = '';

    for (i = 0; i < window.gallery[numPicture].comments.length; i++) {
      fragment.appendChild(generateComment(numPicture));
    }

    commentsList.appendChild(fragment);
  };

  var showBigPicture = function (num) {
    document.querySelector('.big-picture').classList.remove('hidden');
    document.querySelector('.big-picture').focus();
    document.querySelector('.big-picture__img > img').src = window.gallery[num].url;
    document.querySelector('.likes-count').textContent = window.gallery[num].likes;
    document.querySelector('.comments-count').textContent = window.gallery[num].comments.length;
    document.querySelector('.social__caption').textContent = window.gallery[num].description;
  };


  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');

  window.preview = {
    showBigPicture: showBigPicture,
    renredComments: renredComments
  };
})();
