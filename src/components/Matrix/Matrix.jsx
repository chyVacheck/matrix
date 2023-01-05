// * react
import { useEffect, useState } from 'react';
// ? стили
import './Matrix.css';

// * константы
import { alphabet } from './../../utils/constants';

function Matrix() {

  //todo вынести в constants
  const fontSize = 6;

  let canvas;
  let illumination;
  let context;
  let columns;
  const rainDrops = [];

  let interval;

  function setSize() {
    canvas = document.getElementById('Matrix__background');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    clearInterval(interval);
    interval = setInterval(draw, 45);
  }

  function initialisationContext() {
    context = canvas.getContext('2d');
    columns = parseInt(window.innerWidth / fontSize, 10);
    context.font = fontSize + 'px monospace';
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }
  }

  function initialisationIllumination() {
    const illuminationMatrix = document.getElementById('Matrix__background-illumination');
    illumination = document.getElementById('Matrix__illumination');

    illumination.style.top = '-100px';
    illumination.style.left = '-100px';

    illuminationMatrix.addEventListener('mousemove', e => {
      illumination.style.top = e.pageY - 50 + "px";
      illumination.style.left = e.pageX - 50 + "px";
    })
  }

  function draw() {
    context.fillStyle = 'rgba(0, 0, 0, 0.03)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#0F0';
    context.font = fontSize + 'px monospace';
    for (let i = 0; i < rainDrops.length; i++) {
      const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

      if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        rainDrops[i] = 0;
      }
      rainDrops[i]++;
    }

  }

  useEffect(() => {
    setSize();
    window.addEventListener('resize', function () {
      setSize();
    }, true);
  }, [window.onresize])

  useEffect(() => {
    initialisationContext();
    initialisationIllumination();
  }, [window.onload])

  return (
    <>
      {/* // ? панель управления фоном */}
      <article id='Matrix__panel' className='Matrix__panel'>
        <input />
      </article>

      <div className='Matrix__background-illumination' id='Matrix__background-illumination'>
        {/* // ? сам фон */}
        <canvas id='Matrix__background' className='Matrix__background' />
        <div id='Matrix__illumination' className='Matrix__illumination' />
      </div>
    </>
  );
}

export default Matrix;