'use strict';
(function () {
  var MAX_COMMENT_NUM = 5;
  var body = document.querySelector('body');
  var similarComment = document.querySelector('.social__comment');
  var commentsList = document.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = document.querySelector('.big-picture__img > img');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var likesCount = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');
  var socialCaption = document.querySelector('.social__caption');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');

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
    bigPicture.classList.remove('hidden');
    bigPicture.focus();
    bigPictureImg.src = pic.url;
    likesCount.textContent = pic.likes;
    commentsCount.textContent = pic.comments.length;
    socialCaption.textContent = pic.description;
  };

  var initPreview = function () {
    bigPictureCancel.addEventListener('click', function () {
      window.util.closePopup('.big-picture');
    });

    bigPicture.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        window.util.closePopup('.big-picture');
      }
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        window.util.closePopup('.big-picture');
      }
    });

    socialCommentCount.classList.add('visually-hidden');
    commentsLoader.classList.add('visually-hidden');
  };

  initPreview();

  window.preview = {
    showPreview: function (picture) {
      showBigPicture(picture);
      renredComments(picture);
      body.classList.add('modal-open');
    }
  };
})();
