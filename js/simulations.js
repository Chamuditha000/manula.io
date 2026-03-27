

const canvas = document.getElementById("sim1");

if (canvas) {
  const ctx = canvas.getContext("2d");

  canvas.width = 600;
  canvas.height = 200;

  let x = 0;
  let velocity = 2;

  function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // particle
    ctx.beginPath();
    ctx.arc(x, canvas.height / 2, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#00ffff";
    ctx.fill();

    // motion
    x += velocity;

    if (x > canvas.width || x < 0) {
      velocity *= -1;
    }

    requestAnimationFrame(draw);
  }

  draw();
}
