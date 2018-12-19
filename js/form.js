'use strict';
(function () {
  var PERCENT_MAX = 100;
  var WIDTH_SLIDER = 453;
  var FILTER_BLUR_MAX = 3;
  var FILTER_BRIGHTNESS_MAX = 3;
  var FILTER_BRIGHTNESS_MIN = 1;
  var HASHTAGS_MAX = 5;
  var HASHTAG_SYMBOL_MAX = 20;
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = document.querySelector('.img-upload__cancel');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectsItem = document.querySelectorAll('.effects__item');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var textHashtags = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');
  var positionPin;
  var positionPinPercents;
  var effectMap = {
    chrome: 'grayscale(1)',
    sepia: 'sepia(1)',
    marvin: 'invert(100%)',
    phobos: 'blur(3px)',
    heat: 'brightness(3)',
    none: 'none'
  };
  var form = document.querySelector('.img-upload__form');

  uploadFile.addEventListener('change', function () {
    imgUploadOverlay.classList.remove('hidden');
    imgUploadEffectLevel.classList.add('visually-hidden');
  });

  imgUploadCancel.addEventListener('click', function () {
    window.util.closePopup('.img-upload__overlay');
  });

  uploadFile.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      window.util.closePopup('.img-upload__overlay');
    }
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      window.util.closePopup('.img-upload__overlay');
    }
  });

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
      effectLevelDepth.style.width = '100%';
      imgUploadEffectLevel.classList.remove('visually-hidden');
    } else {
      imgUploadEffectLevel.classList.add('visually-hidden');
    }

    imgUploadPreview.style.filter = effectMap[effectName];
  };


  effectsItem.forEach(function (li) {
    li.addEventListener('click', function (e) {
      setNoneFilter();
      setImageEffect(e.currentTarget.children[0].value);
    });
  });

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
      positionPinPercents = Math.round(positionPin * PERCENT_MAX / WIDTH_SLIDER);
      effectLevelValue.value = positionPinPercents;
      document.querySelector('.effect-level__depth').style.width = effectLevelValue.value + '%';

      if (imgUploadPreview.className === 'effects__preview--chrome') {
        imgUploadPreview.style.filter = 'grayscale(' + (positionPinPercents / PERCENT_MAX) + ')';
      }
      if (imgUploadPreview.className === 'effects__preview--sepia') {
        imgUploadPreview.style.filter = 'sepia(' + (positionPinPercents / PERCENT_MAX) + ')';
      }
      if (imgUploadPreview.className === 'effects__preview--marvin') {
        imgUploadPreview.style.filter = 'invert(' + positionPinPercents + '%)';
      }
      if (imgUploadPreview.className === 'effects__preview--phobos') {
        imgUploadPreview.style.filter = 'blur(' + (positionPinPercents * FILTER_BLUR_MAX / PERCENT_MAX) + 'px)';
      }
      if (imgUploadPreview.className === 'effects__preview--heat') {
        imgUploadPreview.style.filter = 'brightness(' + (positionPinPercents * (FILTER_BRIGHTNESS_MAX - FILTER_BRIGHTNESS_MIN) / PERCENT_MAX + FILTER_BRIGHTNESS_MIN) + ')';
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

  textHashtags.addEventListener('change', function (evt) {
    var hashtags = textHashtags.value.trim();
    hashtags = hashtags.split(' ').filter(function (hashtag) {
      return hashtag !== '';
    });

    var validationResult = hashTagsValidate(hashtags);
    evt.target.setCustomValidity(validationResult);
  });

  var hashTagsValidate = function (hashtags) {
    if (hashtags.length > HASHTAGS_MAX) {
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

    if (hashtag.length > HASHTAG_SYMBOL_MAX) {
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

  var onLoad = function () {
    imgUploadOverlay.classList.add('hidden');
    textHashtags.value = '';
    if (imgUploadPreview.className !== '') {
      imgUploadPreview.classList.remove(imgUploadPreview.className);
      imgUploadPreview.style.filter = 'none';
    }
    textDescription.value = '';
    window.util.showSuccess();
  };

  var onError = function (errorMessage) {
    imgUploadOverlay.classList.add('hidden');
    textHashtags.value = '';
    if (imgUploadPreview.className !== '') {
      imgUploadPreview.classList.remove(imgUploadPreview.className);
      imgUploadPreview.style.filter = 'none';
    }
    textDescription.value = '';
    window.util.showError(errorMessage);
  };


  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onLoad, onError);
    evt.preventDefault();
  });
})();
