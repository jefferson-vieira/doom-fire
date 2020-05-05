'use strict';

const fire = {
  width: Math.ceil(window.innerWidth / 4),
  height: Math.ceil(window.innerHeight / 4),
  density: 4,
  pixels: [],
  pallet: [
    '#070707',
    '#1f0707',
    '#2f0f07',
    '#470f07',
    '#571707',
    '#671f07',
    '#771f07',
    '#8f2707',
    '#9f2f07',
    '#af3f07',
    '#bf4707',
    '#c74707',
    '#df4f07',
    '#df5707',
    '#df5707',
    '#d75f07',
    '#d75f07',
    '#d7670f',
    '#cf6f0f',
    '#cf770f',
    '#cf7f0f',
    '#cf8717',
    '#c78717',
    '#c78f17',
    '#c7971f',
    '#bf9f1f',
    '#bf9f1f',
    '#bfa727',
    '#bfa727',
    '#bfaf2f',
    '#b7af2f',
    '#b7b72f',
    '#b7b737',
    '#cfcf6f',
    '#dfdf9f',
    '#efefc7',
    '#ffffff',
  ],
};

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d', { alpha: false });

canvas.width = fire.width * fire.density;
canvas.height = fire.height * fire.density;

const container = document.getElementById('container');
container.appendChild(canvas);

function getPixelIndex(row, col) {
  return col + row * fire.width;
}

function createFireStructure() {
  const minIntensity = 0;

  fire.pixels = new Array(fire.width * fire.height).fill(minIntensity);
}

function createFireSource() {
  const maxIntensity = fire.pallet.length - 1;

  for (let col = 0; col < fire.width; col++) {
    const lastInColumn = col + (fire.height - 1) * fire.width;
    fire.pixels[lastInColumn] = maxIntensity;
  }
}

function calculateFireIntensity(currentPixel) {
  const topPixel = currentPixel - fire.width;

  if (topPixel < 0) return;

  // double NOT bitwise operator
  // faster substitute for Math.floor()
  const decay = ~~(Math.random() * 3);

  fire.pixels[topPixel - decay + 1] = Math.max(fire.pixels[currentPixel] - (decay & 1), 0);
}

function calculateFirePropagation() {
  for (let col = 0; col < fire.width; col++) {
    for (let row = 0; row < fire.height; row++) {
      calculateFireIntensity(getPixelIndex(row, col));
    }
  }
}

function renderFire() {
  calculateFirePropagation();

  for (let row = 0; row < fire.height; row++) {
    for (let col = 0; col < fire.width; col++) {
      const pixel = fire.pixels[getPixelIndex(row, col)];
      const color = fire.pallet[pixel];

      context.fillStyle = color;
      context.fillRect(col * fire.density, row * fire.density, fire.density, fire.density);
    }
  }

  window.requestAnimationFrame(renderFire);
}

function init() {
  createFireStructure();
  createFireSource();
  renderFire();
}

init();
