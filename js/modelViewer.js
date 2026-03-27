// js/modelViewer.js

// Get canvas
const canvas = document.getElementById("modelCanvas");

// Run only if canvas exists
if (canvas) {

  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / 400,
    0.1,
    1000
  );

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
  });

  renderer.setSize(canvas.clientWidth, 400);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Lighting
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  // Controls (mouse interaction)
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Load 3D model
  const loader = new THREE.GLTFLoader();

  loader.load(
    "assets/models/accelerator.glb", // ✅ YOUR PATH HERE

    function (gltf) {
      const model = gltf.scene;

      // Center model (important)
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);

      // Scale if needed
      model.scale.set(1, 1, 1);

      scene.add(model);
    },

    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + "% loaded");
    },

    function (error) {
      console.error("Error loading model:", error);
    }
  );

  // Camera position
  camera.position.set(0, 1, 5);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    controls.update(); // smooth movement

    renderer.render(scene, camera);
  }

  animate();

  // Responsive resize
  window.addEventListener("resize", () => {
    const width = canvas.clientWidth;
    const height = 400;

    renderer.setSize(width, height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

}
