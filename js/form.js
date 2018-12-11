'use strict';
(function () {
  var choicePictures = document.querySelectorAll('.picture');

  var clickPicture = function (numPicture) {
    choicePictures[numPicture].addEventListener('click', function () {
      window.preview.renredComments(numPicture);
      window.preview.showBigPicture(numPicture);
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
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      closePopup('.big-picture');
    }
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closePopup('.big-picture');
    }
  });

  var uploadFile = document.querySelector('#upload-file');
  uploadFile.addEventListener('change', function () {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    document.querySelector('.img-upload__effect-level').classList.add('visually-hidden');
  });

  document.querySelector('.img-upload__cancel').addEventListener('click', function () {
    closePopup('.img-upload__overlay');
  });

  uploadFile.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      closePopup('.img-upload__overlay');
    }
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closePopup('.img-upload__overlay');
    }
  });

  var imgUploadPreview = document.querySelector('.img-upload__preview img');

  var setNoneFilter = function () {
    if (imgUploadPreview.className !== '') {
      imgUploadPreview.classList.remove(imgUploadPreview.className);
      imgUploadPreview.style.filter = 'none';
    }
  };

  var setImageEffect = function (effectName) {
    imgUploadPreview.classList.add('effects__preview--' + effectName);

    if (effectName !== 'none') {
      effectLevelPin.style.left = '453px';
      document.querySelector('.effect-level__depth').style.width = '100%';
      document.querySelector('.img-upload__effect-level').classList.remove('visually-hidden');
    } else {
      document.querySelector('.img-upload__effect-level').classList.add('visually-hidden');
    }

    imgUploadPreview.style.filter = effectMap[effectName];
  };

  var effectMap = {
    chrome: 'grayscale(1)',
    sepia: 'sepia(1)',
    marvin: 'invert(100%)',
    phobos: 'blur(3px)',
    heat: 'brightness(3)',
    none: 'none'
  };

  document.querySelectorAll('.effects__item').forEach(function (li) {
    li.addEventListener('click', function (e) {
      setNoneFilter();
      setImageEffect(e.currentTarget.children[0].value);
    });
  });

  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelValue = document.querySelector('.effect-level__value');
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
      positionPinPercents = Math.round(positionPin * 100 / 453);
      effectLevelValue.value = positionPinPercents;
      document.querySelector('.effect-level__depth').style.width = effectLevelValue.value + '%';

      if (imgUploadPreview.className === 'effects__preview--chrome') {
        imgUploadPreview.style.filter = 'grayscale(' + (positionPinPercents / 100) + ')';
      }
      if (imgUploadPreview.className === 'effects__preview--sepia') {
        imgUploadPreview.style.filter = 'sepia(' + (positionPinPercents / 100) + ')';
      }
      if (imgUploadPreview.className === 'effects__preview--marvin') {
        imgUploadPreview.style.filter = 'invert(' + positionPinPercents + '%)';
      }
      if (imgUploadPreview.className === 'effects__preview--phobos') {
        imgUploadPreview.style.filter = 'blur(' + (positionPinPercents * 0.03) + 'px)';
      }
      if (imgUploadPreview.className === 'effects__preview--heat') {
        imgUploadPreview.style.filter = 'brightness(' + (positionPinPercents * 0.03) + ')';
      }
      if (imgUploadPreview.className === 'effects__preview--none') {
        imgUploadPreview.style.filter = 'none';
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var textHashtags = document.querySelector('.text__hashtags');

  textHashtags.addEventListener('change', function (evt) {
    var hashtags = textHashtags.value.trim();
    hashtags = hashtags.split(' ').filter(function (hashtag) {
      return hashtag !== '';
    });

    var validationResult = hashTagsValidate(hashtags);
    evt.target.setCustomValidity(validationResult);
  });

  var hashTagsValidate = function (hashtags) {
    if (hashtags.length > 5) {
      return 'Не должно быть больше 5 хэштэгов';
    }

    if (repeatTag(hashtags)) {
      return 'Хэштеги не должны повторяться';
    }

    var result = hashtags.map(function (hashtag) {
      return hashTagValidate(hashtag);
    })
      .filter(function (err) {
        return err !== '';
      });

    if (result.length !== 0) {
      return result[0];
    }
    return '';
  };

  var hashTagValidate = function (hashtag) {
    hashtag = hashtag.toUpperCase();

    if (hashtag.slice(0, 1) !== '#') {
      return 'Хэштег должен начинаться с #';
    }

    if (hashtag.length > 20) {
      return 'Не должно быть больше 20 символов в одном хэштэге';
    }

    hashtag = hashtag.slice(1);
    if (hashtag.length < 1) {
      return 'Хэштег не может состоять только из решетки';
    }

    if (/#/.test(hashtag)) {
      return 'Хэштеги должны разделяться пробелами';
    }

    return '';
  };

  var repeatTag = function (hashtags) {
    var tagsMap = {};
    var validationError = false;
    hashtags.forEach(function (hashtag) {
      if (tagsMap.hasOwnProperty(hashtag)) {
        validationError = true;
      } else {
        tagsMap[hashtag] = true;
      }
    });

    return validationError;
  };
})();
