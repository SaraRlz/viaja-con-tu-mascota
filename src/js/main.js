import '../scss/main.scss';

import baguetteBox from "baguettebox.js";
import "baguettebox.js/dist/baguetteBox.min.css";
// Inicializar BaguetteBox en las imágenes de las tarjetas
window.addEventListener('DOMContentLoaded', () => {
  baguetteBox.run('.tarjetas', {
    animation: 'fadeIn',
    captions: true
  });
});