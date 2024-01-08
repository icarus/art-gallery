const paintings = [
  {
    src: '/images/TensionSuave.jpg',
    title: 'Tension Suave – Wassily Kandinsky'
  }, {
    src: '/images/TheSwing.jpeg',
    title: 'The Swing – Jean-Honoré Fragonard'
  }, {
    src: '/images/ElAquelarre.jpeg',
    title: 'El Aquelarre – Francisco de Goya'
  }, {
    src: '/images/DamaMalva.jpg',
    title: 'Dama Malva – Lyonel Feininger'
  }, {
    src: '/images/Guernica.jpeg',
    title: 'Guernica – Pablo Picasso'
  }, {
    src: '/images/Univers.jpg',
    title: 'Comment une conscience se fait univers – Roberto Matta'
  }, {
    src: '/images/Nativity.jpg',
    title: 'Nativity – Antonio da Correggio'
  }, {
    src: '/images/Angel.jpeg',
    title: 'Angel – Melozzo da Forlì'
  }, {
    src: '/images/Campo.jpeg',
    title: 'Wheat Field with Cypresses – Vincent van Gogh'
  }, {
    src: '/images/Agrigente.jpeg',
    title: 'Agrigente – Nicolas de Staél'
  }
];


const prevImage = document.querySelector('nav a.prev');
const nextImage = document.querySelector('nav a.next');

const descriptionTag = document.querySelector('header div');
const canvas = document.querySelector('div.canvas-holder canvas');
const sandbox = new GlslCanvas(canvas)
sandbox.load(frag(paintings));

let startIndex = 0;
let endIndex = 0;
let timeline = performance.now() - 9999;

function generateAltText(index, length) {
  return (index + 1) + ' / ' + length;
}

const sizer = function () {
  const ww = window.innerWidth
  const wh = window.innerHeight
  const s = Math.min(ww, wh)
  const dpi = window.devicePixelRatio

  canvas.width = s * 0.5 * dpi
  canvas.height = s * 0.7 * dpi
  canvas.style.width = Math.round(s * 0.5) + 'px'
  canvas.style.height = Math.round(s * 0.7) + 'px'
}

const next = function () {
  endIndex++;
  if (endIndex >= paintings.length) {
    endIndex = 0;
  }
  update();
};

const prev = function () {
  endIndex--;
  if (endIndex < 0) {
    endIndex = paintings.length - 1;
  }
  update();
};

const update = function () {
  const altText = generateAltText(endIndex, paintings.length);
  descriptionTag.innerHTML = altText;
  timeline = performance.now();

  sandbox.setUniform('imageAlt', altText);
  sandbox.setUniform('startIndex', startIndex);
  sandbox.setUniform('endIndex', endIndex);
  tick();

  startIndex = endIndex;
};

const tick = function() {
  const diff = performance.now() - timeline;
  sandbox.setUniform('timeline', diff / 1000);
  requestAnimationFrame(tick);
}

const load = function () {
  sizer();
  tick();
  descriptionTag.innerHTML = generateAltText(0, paintings.length);

  paintings.forEach((painting, endIndex) => {
    sandbox.setUniform(`textures[${endIndex}]`, painting.src)
  })
};

load();

nextImage.addEventListener('click', function (event) {
  event.preventDefault();
  next();
});

prevImage.addEventListener('click', function (event) {
  event.preventDefault();
  prev();
});
