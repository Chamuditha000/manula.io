

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Rings (accelerator tunnel)
const rings = [];

for (let i = 0; i < 60; i++) {
  const geometry = new THREE.TorusGeometry(5, 0.1, 16, 100);
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    wireframe: true,
  });

  const ring = new THREE.Mesh(geometry, material);
  ring.position.z = -i * 5;

  scene.add(ring);
  rings.push(ring);
}

camera.position.z = 2;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  rings.forEach((ring) => {
    ring.rotation.x += 0.01;
    ring.rotation.y += 0.005;

    ring.position.z += 0.3;

    if (ring.position.z > 5) {
      ring.position.z = -300;
    }
  });

  renderer.render(scene, camera);
}

animate();

// Resize fix
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
