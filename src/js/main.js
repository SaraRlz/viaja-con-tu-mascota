import '../scss/main.scss';
import baguetteBox from "baguettebox.js";
import "baguettebox.js/dist/baguetteBox.min.css";

// Inicializar BaguetteBox
window.addEventListener('DOMContentLoaded', () => {
  baguetteBox.run('.tarjeta', {
    animation: 'fadeIn',
    captions: true
  });
  baguetteBox.run('.galeria .imagenes', {
    animation: 'fadeIn',
    captions: true
  });
});

// Filtros de categorías
const botones = document.querySelectorAll(".filtros button");
const tarjetas = document.querySelectorAll(".tarjeta");

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    const filtro = boton.dataset.filter;
    tarjetas.forEach(tarjeta => {
      const categoria = tarjeta.dataset.categoria;
      tarjeta.style.display = (filtro === "todos" || categoria === filtro) ? "block" : "none";
    });
  });
});
