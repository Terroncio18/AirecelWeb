document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll("#section1 .bg-image");
    let index = 0;

    function changeBackground() {
        images.forEach(img => img.classList.remove("active"));
        images[index].classList.add("active");
        index = (index + 1) % images.length;
    }

    // Mostrar la primera imagen de inmediato
    images[0].classList.add("active");

    // Cambiar imágenes cada 5 segundos
    setInterval(changeBackground, 5000);
});