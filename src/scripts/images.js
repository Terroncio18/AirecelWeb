//scripts/images.js
document.addEventListener("DOMContentLoaded", function () {
  const containers = document.querySelectorAll(".pictures-container");

  containers.forEach(container => {
    const images = container.querySelectorAll(".bg-image");
    if (images.length === 0) return;

    let index = -1;

    setInterval(() => {
      if (index >= 0) {
        images[index].classList.remove("active");
      }
      index = (index + 1) % images.length;
      images[index].classList.add("active");
    }, 4000);
  });
});

