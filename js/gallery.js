'use strict';
(function () {
  var ACTIVE_FILTER_CLASS = 'img-filters__button--active';
  var fragment = document.createDocumentFragment();
  var picturesList = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');
  var filterNew = document.querySelector('#filter-new');
  var filterPopular = document.querySelector('#filter-popular');
  var filterDiscussed = document.querySelector('#filter-discussed');
  var filterButtons = document.querySelectorAll('.img-filters__button');
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

  var delGallery = function () {
    document.querySelectorAll('.picture').forEach(function (pic) {
      picturesList.removeChild(pic);
    });
  };

  var onLoad = function (data) {
    gallery = data;
    renderGallery(gallery);
  };

  var onError = function (errorMessage) {
    window.util.showError(errorMessage);
  };

  var setActiveFilterClass = function (id) {
    filterButtons.forEach(function (button) {
      button.classList.remove(ACTIVE_FILTER_CLASS);
      if (button.id === id) {
        button.classList.add(ACTIVE_FILTER_CLASS);
      }
    });
  };

  filterPopular.addEventListener('click', function (e) {
    window.util.debounce(function () {
      setActiveFilterClass(e.target.id);
      delGallery();
      renderGallery(gallery);
    });
  });

  filterNew.addEventListener('click', function (e) {
    window.util.debounce(function () {
      setActiveFilterClass(e.target.id);
      delGallery();
      renderGallery(window.util.shuffle(gallery.slice(0)).slice(0, 10));
    });
  });

  filterDiscussed.addEventListener('click', function (e) {
    window.util.debounce(function () {
      setActiveFilterClass(e.target.id);
      delGallery();
      var galleryNew = gallery.slice(0);
      galleryNew = galleryNew.sort(function (first, second) {
        return second.comments.length - first.comments.length;
      });
      renderGallery(galleryNew);
    });
  });

  window.backend.load(onLoad, onError);
})();
