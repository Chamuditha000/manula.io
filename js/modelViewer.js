// js/modelViewer.js

const viewers = [];

function createViewer(canvasId, modelPath) {

  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.offsetWidth / 300,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
  });

  renderer.setSize(canvas.offsetWidth, 300);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Lighting
  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(5, 5, 5);
  scene.add(light);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));

  // Controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Load model
  const loader = new THREE.GLTFLoader();

  loader.load(
    modelPath,
    function (gltf) {
      const model = gltf.scene;

      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());

      model.position.sub(center);

      const scale = 2 / size;
      model.scale.set(scale, scale, scale);

      scene.add(model);
    },
    undefined,
    function (error) {
      console.error("FAILED:", modelPath, error);
    }
  );

  camera.position.set(0, 1, 5);

  // Save viewer
  viewers.push({ scene, camera, renderer, controls });
}

// 🔥 LOAD MODELS
createViewer("model1", "models/linac_4.glb");
createViewer("model2", "models/psb_peiode_01.glb");
createViewer("model3", "models/ps.glb");
createViewer("model4", "models/cms_detector.glb");


// ✅ ONE GLOBAL ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);

  viewers.forEach(v => {
    v.controls.update();
    v.renderer.render(v.scene, v.camera);
  });
}

animate();
