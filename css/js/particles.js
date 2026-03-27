

const starGeometry = new THREE.BufferGeometry();
const starCount = 1000;

const positions = [];

for (let i = 0; i < starCount; i++) {
  positions.push(
    (Math.random() - 0.5) * 1000,
    (Math.random() - 0.5) * 1000,
    (Math.random() - 0.5) * 1000
  );
}

starGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(positions, 3)
);

const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 1,
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);
