import '../scss/main.scss';

import baguetteBox from "baguettebox.js";
import "baguettebox.js/dist/baguetteBox.min.css";
// Inicializar BaguetteBox en las imágenes de las tarjetas
window.addEventListener('DOMContentLoaded', () => {
  // Galería de la página de categoría
  baguetteBox.run('.tarjetas', {
    animation: 'fadeIn',
    captions: true
  });

  // Galería de las páginas de detalle
  baguetteBox.run('.galeria .imagenes', {
    animation: 'fadeIn',
    captions: true
  });
});

// Filtros de categorias
const botones = document.querySelectorAll(".filtros button");
const tarjetas = document.querySelectorAll(".tarjeta");

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    const filtro = boton.dataset.filter;

    tarjetas.forEach(tarjeta => {
      const categoria = tarjeta.dataset.categoria;

      if (filtro === "todos" || categoria === filtro) {
        tarjeta.style.display = "block";
      } else {
        tarjeta.style.display = "none";
      }
    });
  });
});

