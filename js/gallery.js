'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  var picturesList = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');
  var filterNew = document.querySelector('#filter-new');
  var filterPopular = document.querySelector('#filter-popular');
  var filterDiscussed = document.querySelector('#filter-discussed');
  var galleryOld = [];
  var galleryNew = [];
  var gallery = [];

  var renderGallery = function (pictures) {
    pictures.forEach(function (picture) {
      var picElement = window.picture.createElement(picture);
      picElement.addEventListener('click', function () {
        window.preview.showPreview(picture);
      });
      fragment.appendChild(picElement);
    });
    picturesList.appendChild(fragment);
    imgFilters.classList.remove('img-filters--inactive');
  };

  var delGallery = function (pictures) {
    pictures.forEach(function () {
      var picElement = document.querySelector('.picture');
      picturesList.removeChild(picElement);
    });
  };

  var onLoad = function (data) {
    gallery = data;
    renderGallery(gallery);
  };

  var onError = function (errorMessage) {
    window.util.showError(errorMessage);
  };
  window.backend.load(onLoad, onError);

  filterPopular.addEventListener('click', function () {
    window.setTimeout(function () {
      filterPopular.classList.add('img-filters__button--active');
      filterNew.classList.remove('img-filters__button--active');
      filterDiscussed.classList.remove('img-filters__button--active');

      galleryOld = document.querySelectorAll('.picture');
      delGallery(galleryOld);
      renderGallery(gallery);
    }, 500);
  });

  filterNew.addEventListener('click', function () {
    window.setTimeout(function () {
      filterNew.classList.add('img-filters__button--active');
      filterPopular.classList.remove('img-filters__button--active');
      filterDiscussed.classList.remove('img-filters__button--active');

      delGallery(gallery);
      galleryNew = gallery.slice();
      galleryNew = window.util.shuffle(galleryNew).slice(0, 10);
      renderGallery(galleryNew);
    }, 500);
  });

  filterDiscussed.addEventListener('click', function () {
    window.setTimeout(function () {
      filterDiscussed.classList.add('img-filters__button--active');
      filterNew.classList.remove('img-filters__button--active');
      filterPopular.classList.remove('img-filters__button--active');

      galleryOld = document.querySelectorAll('.picture');
      delGallery(galleryOld);
      galleryNew = gallery.slice();
      galleryNew = galleryNew.sort(function (first, second) {
        if (first.comments.length < second.comments.length) {
          return 1;
        } else if (first.comments.length > second.comments.length) {
          return -1;
        } else {
          return 0;
        }
      });
      renderGallery(galleryNew);
    }, 500);
  });

})();
