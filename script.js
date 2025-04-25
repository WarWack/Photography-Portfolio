document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 500;
  const container = document.getElementById("canvas-container");
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  const images = ['images/portrait2.jpg', 'images/sports2.JPG', 'images/studio3.JPG', 'images/events4.jpg', 'images/events5.jpg', 'images/sports1.jpg'];
  let currentIndex = 0;
  let img = new Image();

  function loadCurrentImage() {
    img.src = images[currentIndex];
  }

  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.min(hRatio, vRatio);

    const newWidth = img.width * ratio;
    const newHeight = img.height * ratio;

    const xOffset = (canvas.width - newWidth) / 2;
    const yOffset = (canvas.height - newHeight) / 2;

    ctx.drawImage(img, xOffset, yOffset, newWidth, newHeight);
  };

  img.onerror = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "20px sans-serif";
    ctx.fillText("Image failed to load.", 20, 50);
  };

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % images.length;
      loadCurrentImage();
    } else if (event.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      loadCurrentImage();
    }
  });

  loadCurrentImage();
});
