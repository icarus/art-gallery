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
const canvas = document.querySelector('div.canvas-holder canvas');
const sandbox = new GlslCanvas(canvas)
sandbox.load(frag(paintings));

let startIndex = 0;
let endIndex = 0;
let timeline = performance.now() - 9999;

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
  descriptionTag.innerHTML = paintings[endIndex].alt;
  timeline = performance.now();

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
