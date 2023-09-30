// * react
import { useEffect, useState } from "react";
// ? стили
import style from "./Matrix.module.css";

// * компоненты
// ? личные
import Background from "./Background/Background";

// * константы
import { alphabet, color } from "./../../utils/constants";

function Matrix() {
  //todo вынести в constants
  const [fontSize, setFontSize] = useState(6);

  let canvas;
  let context;
  let columns;
  const rainDrops = [];

  let interval;

  function setSize() {
    canvas = document.getElementById("Matrix__background");

    if (canvas.width < window.innerWidth) {
      initialisationContext();
      canvas.width = window.innerWidth;
    }

    if (canvas.height < window.innerHeight) {
      canvas.height = window.innerHeight;
    }

    clearInterval(interval);

    interval = setInterval(() => draw(), 50);
  }

  function initialisationContext() {
    context = canvas.getContext("2d");
    columns = parseInt(window.innerWidth / fontSize, 10);
    context.font = fontSize + "px monospace";
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }
  }

  function draw() {
    context.fillStyle = "rgba(0, 0, 0, 0.05)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = color.lightGreen;
    context.font = fontSize + "px monospace";
    for (let i = 0; i < rainDrops.length; i++) {
      if (rainDrops[i] * fontSize === canvas.height / 2) {
        context.fillStyle = color.green;
      }
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
    window.addEventListener(
      "resize",
      function () {
        setSize();
      },
      true
    );
  }, [window.onresize]);

  useEffect(() => {
    initialisationContext();
  }, [window.onload]);

  return (
    <article id="Matrix__background-illumination" className={style.main}>
      <Background />

      <h1 className={style.title}>Сто первая</h1>
    </article>
  );
}

export default Matrix;
