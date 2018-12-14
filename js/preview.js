'use strict';
(function () {
  var MAX_COMMENT_NUM = 5;
  var similarComment = document.querySelector('.social__comment');
  var commentsList = document.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();

  var generateComment = function (comment) {
    var commentElement = similarComment.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };

  var renredComments = function (pic) {
    commentsList.innerHTML = '';

    pic.comments.slice(0, MAX_COMMENT_NUM).forEach(function (comment) {
      fragment.appendChild(generateComment(comment));
    });

    commentsList.appendChild(fragment);
  };

  var showBigPicture = function (pic) {
    document.querySelector('.big-picture').classList.remove('hidden');
    document.querySelector('.big-picture').focus();
    document.querySelector('.big-picture__img > img').src = pic.url;
    document.querySelector('.likes-count').textContent = pic.likes;
    document.querySelector('.comments-count').textContent = pic.comments.length;
    document.querySelector('.social__caption').textContent = pic.description;
  };

  var initPreview = function () {
    document.querySelector('.big-picture__cancel').addEventListener('click', function () {
      window.util.closePopup('.big-picture');
    });

    document.querySelector('.big-picture').addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        window.util.closePopup('.big-picture');
      }
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        window.util.closePopup('.big-picture');
      }
    });

    document.querySelector('.social__comment-count').classList.add('visually-hidden');
    document.querySelector('.comments-loader').classList.add('visually-hidden');
  };

  initPreview();

  window.preview = {
    showPreview: function (picture) {
      showBigPicture(picture);
      renredComments(picture);
      document.querySelector('body').classList.add('modal-open');
    }
  };
})();
