'use strict';
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

var generateComment = function () {
  var commentElement = similarComment.cloneNode(true);

  commentElement.querySelector('.social__picture').src = 'img/avatar-' + random(6, 1) + '.svg';
  commentElement.querySelector('.social__text').textContent = pictures[0].comments[i];

  return commentElement;

};

var renredComments = function () {
  commentsList.innerHTML = '';

  for (i = 0; i < pictures[0].comments.length; i++) {
    fragment.appendChild(generateComment());
  }

  commentsList.appendChild(fragment);
};

var showBigPicture = function () {
  document.querySelector('.big-picture').classList.remove('hidden');
  document.querySelector('.big-picture__img > img').src = pictures[0].url;
  document.querySelector('.likes-count').textContent = pictures[0].likes;
  document.querySelector('.comments-count').textContent = pictures[0].comments.length;
  document.querySelector('.social__caption').textContent = pictures[0].description;
};

renderAllPictures();
renredComments();
showBigPicture();

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');
