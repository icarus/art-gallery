const paintings = [
  {
    src: '/images/TensionSuave.jpg',
    title: 'Tension Suave – Wassily Kandinsky',
    alt: '1 / 4'
  }, {
    src: '/images/TheSwing.jpeg',
    title: 'The Swing – Jean-Honoré Fragonard',
    alt: '2 / 4'
  }, {
    src: '/images/ElAquelarre.jpeg',
    title: 'El Aquelarre – Francisco de Goya',
    alt: '3 / 4'
  }, {
    src: '/images/DamaMalva.jpg',
    title: 'Dama Malva – Lyonel Feininger',
    alt: '4 / 4'
  }
]

const prevImage = document.querySelector('nav a.prev');
const nextImage = document.querySelector('nav a.next');

const descriptionTag = document.querySelector('header div');
const imageTag = document.querySelector('div.canvas-holder img');

let index = 0;

const next = function () {
  index++;
  if (index >= paintings.length) {
    index = 0;
  }
  update();
};

const prev = function () {
  index--;
  if (index < 0) {
    index = paintings.length - 1;
  }
  update();
};

const update = function () {
  descriptionTag.innerHTML = paintings[index].alt;
  imageTag.setAttribute('src', paintings[index].src);
  imageTag.setAttribute('alt', paintings[index].title);
};

nextImage.addEventListener('click', function (event) {
  event.preventDefault();
  next();
});

prevImage.addEventListener('click', function (event) {
  event.preventDefault();
  prev();
});
