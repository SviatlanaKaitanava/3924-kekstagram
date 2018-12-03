'use strict';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var COMMENTS_PICTURES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTION_PICTURES = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var fragment = document.createDocumentFragment();
var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var picturesList = document.querySelector('.pictures');
var similarComment = document.querySelector('.social__comment');
var commentsList = document.querySelector('.social__comments');

var random = function (max, min) {
  return Math.floor(Math.random() * (max - min) + min);
};

var urlPictures = [];
for (var i = 0; i < 25; i++) {
  urlPictures[i] = 'photos/' + (i + 1) + '.jpg';
}

var likesPictures = [];
for (i = 0; i < 25; i++) {
  likesPictures[i] = random(200, 15);
}

var commentPicture = function () {
  var comment = [];
  for (var j = 0; j < random(10, 2); j++) {
    comment[j] = ' ' + COMMENTS_PICTURES[random(5, 0)];
  }
  return (comment);
};

var commentsPictures = [];
for (i = 0; i < 25; i++) {
  commentsPictures[i] = commentPicture();
}

var descriptionPictures = [];
for (i = 0; i < 25; i++) {
  descriptionPictures[i] = DESCRIPTION_PICTURES[random(5, 0)];
}

var pictures = [];
var generatePictures = function (pictureNum) {

  for (i = 0; i < pictureNum; i++) {
    pictures[i] = {
      url: urlPictures[i],
      likes: likesPictures[i],
      comments: commentsPictures[i],
      description: descriptionPictures[i]
    };
  }

  return pictures;
};

var renderPicture = function (picture) {
  var pictureElement = similarPictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

var renderAllPictures = function () {
  var picturesAll = generatePictures(25);

  for (i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPicture(picturesAll[i]));
  }
  picturesList.appendChild(fragment);
};

var generateComment = function (numPicture) {
  var commentElement = similarComment.cloneNode(true);

  commentElement.querySelector('.social__picture').src = 'img/avatar-' + random(6, 1) + '.svg';
  commentElement.querySelector('.social__text').textContent = pictures[numPicture].comments[i];

  return commentElement;
};

var renredComments = function (numPicture) {
  commentsList.innerHTML = '';

  for (i = 0; i < pictures[numPicture].comments.length; i++) {
    fragment.appendChild(generateComment(numPicture));
  }

  commentsList.appendChild(fragment);
};

var showBigPicture = function (num) {
  document.querySelector('.big-picture').classList.remove('hidden');
  document.querySelector('.big-picture').focus();
  document.querySelector('.big-picture__img > img').src = pictures[num].url;
  document.querySelector('.likes-count').textContent = pictures[num].likes;
  document.querySelector('.comments-count').textContent = pictures[num].comments.length;
  document.querySelector('.social__caption').textContent = pictures[num].description;
};

renderAllPictures();

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');

var choicePictures = document.querySelectorAll('.picture');

var clickPicture = function (numPicture) {
  choicePictures[numPicture].addEventListener('click', function () {
    renredComments(numPicture);
    showBigPicture(numPicture);
    document.querySelector('body').classList.add('modal-open');
  });
};

for (var k = 0; k < choicePictures.length; k++) {
  var numPicture = k;
  clickPicture(numPicture);
}

var closePopup = function (classPopup) {
  document.querySelector(classPopup).classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

document.querySelector('.big-picture__cancel').addEventListener('click', function () {
  closePopup('.big-picture');
});

document.querySelector('.big-picture').addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup('.big-picture');
  }
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup('.big-picture');
  }
});

var uploadFile = document.querySelector('#upload-file');
uploadFile.addEventListener('change', function () {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
});

document.querySelector('.img-upload__cancel').addEventListener('click', function () {
  closePopup('.img-upload__overlay');
});

uploadFile.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup('.img-upload__overlay');
  }
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup('.img-upload__overlay');
  }
});

var imgUploadPreview = document.querySelector('.img-upload__preview img');

document.querySelector('.effects__preview--chrome').addEventListener('click', function () {
  imgUploadPreview.style.filter = 'grayscale(1)';
});

document.querySelector('.effects__preview--sepia').addEventListener('click', function () {
  imgUploadPreview.style.filter = 'sepia(1)';
});

document.querySelector('.effects__preview--marvin').addEventListener('click', function () {
  imgUploadPreview.style.filter = 'invert(100%)';
});

document.querySelector('.effects__preview--phobos').addEventListener('click', function () {
  imgUploadPreview.style.filter = 'blur(5px)';
});

document.querySelector('.effects__preview--heat').addEventListener('click', function () {
  imgUploadPreview.style.filter = 'brightness(3)';
});

document.querySelector('.effects__preview--none').addEventListener('click', function () {
  imgUploadPreview.style.filter = 'none';
});

var effectLevelPin = document.querySelector('.effect-level__pin');
var positionPin;
var positionPinPercents;

effectLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
    };

    startCoords = {
      x: moveEvt.clientX,
    };

    positionPin = effectLevelPin.offsetLeft - shift.x;
    effectLevelPin.style.left = (positionPin) + 'px';
    positionPinPercents = (positionPin * 100 / 453) + '%';
    document.querySelector('.effect-level__depth').style.width = positionPinPercents;
    imgUploadPreview.style.filter = 'saturate(positionPinPercents)';

  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
