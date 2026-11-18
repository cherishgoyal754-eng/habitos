/**
 * WAYTOHEAVEN REALMS 3D ENGINE
 * Interactive Voxel Floating Islands Inspired by Yugaantar Pro-Show Nights
 * Built with Three.js for Cherish Goyal's WayToHeaven
 * 
 * Features:
 * - 3 Real 3D Floating Voxel Islands (Concert Stage, Spotlight Oasis, Citadel of Mastery)
 * - Deep Cosmic Starfield & Nebula Particles
 * - Real-time Pulsing Vertical Searchlights (synced to background audio)
 * - Cascading 3D Waterfalls with mist particles
 * - Interactive Mouse Parallax & Island Raycasting
 * - Python Study Quest Integration (Ternary Operator Challenge)
 */

(function () {
  'use strict';

  let scene, camera, renderer, container, canvas;
  let starsParticles, nebulaParticles;
  let island1Group, island2Group, island3Group;
  let lightBeams = [];
  let waterfallStreams = [];
  let mistParticles;
  let raycaster, mouse;
  let hoveredIsland = null;
  let clock;
  let isRunning = false;

  // Mouse parallax target & current values
  const mousePos = { x: 0, y: 0, targetX: 0, targetY: 0 };

  function initRealms3D() {
    if (typeof THREE === 'undefined') {
      console.warn('[Realms3D] Three.js not loaded. Skipping 3D viewport.');
      return;
    }

    container = document.getElementById('realms-3d-stage-wrap');
    if (!container) {
      // Find hero section and insert 3D stage container
      const heroSection = document.getElementById('realms-hero-section');
      if (!heroSection) return;

      container = document.createElement('div');
      container.id = 'realms-3d-stage-wrap';
      container.className = 'realms-3d-stage-wrap';

      // Insert right after the hero header
      const header = heroSection.querySelector('.realms-hero-header');
      if (header && header.nextSibling) {
        heroSection.insertBefore(container, header.nextSibling);
      } else {
        heroSection.prepend(container);
      }
    }

    // Canvas
    canvas = document.getElementById('realms-3d-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'realms-3d-canvas';
      canvas.className = 'realms-3d-canvas';
      container.appendChild(canvas);
    }

    const width = container.clientWidth || window.innerWidth;
    const height = Math.min(480, Math.max(340, window.innerHeight * 0.45));

    // Scene setup
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060c22, 0.0018);

    // Camera setup
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 3000);
    camera.position.set(0, 45, 340);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false; // keep fast and smooth

    clock = new THREE.Clock();
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Add Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0x7dd3fc, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfffbeb, 1.2);
    dirLight.position.set(120, 200, 150);
    scene.add(dirLight);

    const blueBackLight = new THREE.DirectionalLight(0x38bdf8, 0.9);
    blueBackLight.position.set(-150, -80, -100);
    scene.add(blueBackLight);

    // Build Cosmic Sky & Nebula
    buildStarfield();

    // Build the 3 Floating Voxel Islands
    buildIsland1_Concert();
    buildIsland2_Oasis();
    buildIsland3_Citadel();

    // Build Waterfalls & Spray
    buildWaterfallEffects();

    // Event Listeners
    setupEventListeners();

    isRunning = true;
    animate();

    console.log('[Realms3D] Pro-Show 3D Voxel Realms successfully initialized.');
  }

  // --- STARFIELD & NEBULA DUST ---
  function buildStarfield() {
    const starCount = 900;
    const starGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const palette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0x38bdf8),
      new THREE.Color(0xfef08a),
      new THREE.Color(0xa855f7),
      new THREE.Color(0x67e8f9)
    ];

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1600;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 900 + 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1200 - 200;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 2.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });

    starsParticles = new THREE.Points(starGeo, starMat);
    scene.add(starsParticles);
  }

  // Helper to create a voxel block
  function createVoxel(width, height, depth, colorHex) {
    const geo = new THREE.BoxGeometry(width, height, depth);
    const mat = new THREE.MeshLambertMaterial({ color: colorHex, flatShading: true });
    return new THREE.Mesh(geo, mat);
  }

  // Helper to create a voxel tiered island rock base
  function createIslandBase() {
    const group = new THREE.Group();

    // Tier 1 (Grass plateau)
    const grassTop = createVoxel(76, 8, 56, 0x22c55e);
    grassTop.position.set(0, 0, 0);
    group.add(grassTop);

    // Pixel grass border accents
    const grassDark = createVoxel(78, 4, 58, 0x15803d);
    grassDark.position.set(0, -4, 0);
    group.add(grassDark);

    // Tier 2 (Upper stone layer)
    const stone1 = createVoxel(70, 14, 50, 0x475569);
    stone1.position.set(0, -11, 0);
    group.add(stone1);

    // Tier 3 (Middle darker slate)
    const stone2 = createVoxel(58, 16, 42, 0x334155);
    stone2.position.set(0, -24, 0);
    group.add(stone2);

    // Tier 4 (Lower tapering core)
    const stone3 = createVoxel(42, 18, 30, 0x1e293b);
    stone3.position.set(0, -38, 0);
    group.add(stone3);

    // Tier 5 (Spire stalactite bottom)
    const stone4 = createVoxel(22, 18, 16, 0x0f172a);
    stone4.position.set(0, -52, 0);
    group.add(stone4);

    const stoneTip = createVoxel(10, 14, 8, 0x090d16);
    stoneTip.position.set(0, -64, 0);
    group.add(stoneTip);

    // Orbiting mini satellite voxel rocks
    const sat1 = createVoxel(7, 7, 7, 0x334155);
    sat1.position.set(-36, -58, 15);
    group.add(sat1);

    const sat2 = createVoxel(6, 6, 6, 0x1e293b);
    sat2.position.set(38, -62, -12);
    group.add(sat2);

    const sat3 = createVoxel(5, 5, 5, 0x475569);
    sat3.position.set(18, -72, 10);
    group.add(sat3);

    return group;
  }

  // --- ISLAND 1: STAR NIGHT CONCERT STAGE ---
  function buildIsland1_Concert() {
    island1Group = new THREE.Group();
    island1Group.position.set(-110, 5, 0);
    island1Group.userData = { id: 'island-1', name: 'Star Night Stage', realm: 'momentum', basePosY: 5 };

    // Voxel Island Base
    const base = createIslandBase();
    island1Group.add(base);

    // Stage Platform
    const stagePlat = createVoxel(54, 4, 38, 0x18181b);
    stagePlat.position.set(0, 4, 0);
    island1Group.add(stagePlat);

    // Stage Truss Arch (Back & Columns)
    const colLeft = createVoxel(4, 38, 4, 0x0f172a);
    colLeft.position.set(-24, 21, -14);
    island1Group.add(colLeft);

    const colRight = createVoxel(4, 38, 4, 0x0f172a);
    colRight.position.set(24, 21, -14);
    island1Group.add(colRight);

    const trussBeam = createVoxel(52, 4, 4, 0x1e293b);
    trussBeam.position.set(0, 40, -14);
    island1Group.add(trussBeam);

    // Speaker Stacks Left & Right
    const spkLeft = createVoxel(8, 24, 8, 0x09090b);
    spkLeft.position.set(-21, 14, 4);
    island1Group.add(spkLeft);

    const spkRight = createVoxel(8, 24, 8, 0x09090b);
    spkRight.position.set(21, 14, 4);
    island1Group.add(spkRight);

    // Warm Stage Glow Light
    const stageGlow = new THREE.PointLight(0xf59e0b, 1.8, 80);
    stageGlow.position.set(0, 16, 2);
    island1Group.add(stageGlow);

    // 4 Dynamic Sky-Shooting Vertical Beams (Cyan, Amber, Purple, Rose)
    const beamColors = [0x38bdf8, 0xf59e0b, 0xa855f7, 0xf43f5e];
    const beamPositions = [-16, -6, 6, 16];

    beamPositions.forEach((posX, idx) => {
      const beamGeo = new THREE.CylinderGeometry(0.8, 3.8, 180, 12, 1, true);
      const beamMat = new THREE.MeshBasicMaterial({
        color: beamColors[idx],
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(posX, 94, -8);
      island1Group.add(beam);

      lightBeams.push({
        mesh: beam,
        baseX: posX,
        baseAngle: idx * 0.15,
        speed: 1.5 + idx * 0.4,
        colorHex: beamColors[idx]
      });
    });

    scene.add(island1Group);
  }

  // --- ISLAND 2: THE SPOTLIGHT OASIS (STAND-UP & MIND LAB) ---
  function buildIsland2_Oasis() {
    island2Group = new THREE.Group();
    island2Group.position.set(0, -2, 20);
    island2Group.userData = { id: 'island-2', name: 'The Spotlight Oasis', realm: 'focus', basePosY: -2 };

    // Voxel Island Base
    const base = createIslandBase();
    island2Group.add(base);

    // Arched Rustic Red-Brick Wall
    const brickGroup = new THREE.Group();
    const brickColors = [0x991b1b, 0xb91c1c, 0x7f1d1d, 0xef4444];

    for (let r = 0; r < 6; r++) {
      const rowY = 8 + r * 5;
      const count = 7 - Math.abs(r - 2) * 0.5;
      for (let c = -3; c <= 3; c++) {
        const col = brickColors[(r + Math.abs(c)) % brickColors.length];
        const brick = createVoxel(6, 4, 3, col);
        brick.position.set(c * 6.5, rowY, -14);
        brickGroup.add(brick);
      }
    }
    island2Group.add(brickGroup);

    // Hanging Vintage Lantern & Warm Point Light
    const lanternPole = createVoxel(2, 16, 2, 0x334155);
    lanternPole.position.set(0, 42, -10);
    island2Group.add(lanternPole);

    const lantern = createVoxel(6, 6, 6, 0xfde047);
    lantern.position.set(0, 36, -8);
    island2Group.add(lantern);

    const lanternLight = new THREE.PointLight(0xfbbf24, 2.4, 110);
    lanternLight.position.set(0, 34, -4);
    island2Group.add(lanternLight);

    // Stand-Up Wooden Stool & Vintage Microphone
    const stoolTop = createVoxel(6, 2, 6, 0x92400e);
    stoolTop.position.set(8, 12, 4);
    island2Group.add(stoolTop);

    const stoolLeg = createVoxel(2, 10, 2, 0x78350f);
    stoolLeg.position.set(8, 6, 4);
    island2Group.add(stoolLeg);

    const micStand = createVoxel(1.5, 22, 1.5, 0x94a3b8);
    micStand.position.set(-6, 12, 6);
    island2Group.add(micStand);

    const micHead = createVoxel(3.5, 5, 3.5, 0xe2e8f0);
    micHead.position.set(-6, 23, 6);
    island2Group.add(micHead);

    scene.add(island2Group);
  }

  // --- ISLAND 3: CITADEL OF HEAVEN (GRAND FINALE CASTLE) ---
  function buildIsland3_Citadel() {
    island3Group = new THREE.Group();
    island3Group.position.set(110, 8, 0);
    island3Group.userData = { id: 'island-3', name: 'Citadel of Heaven', realm: 'ascension', basePosY: 8 };

    // Voxel Island Base
    const base = createIslandBase();
    island3Group.add(base);

    // Castle Main Fortress Wall
    const castleBody = createVoxel(46, 28, 30, 0xe2e8f0);
    castleBody.position.set(0, 16, -2);
    island3Group.add(castleBody);

    // Golden Arched Gate
    const castleGate = createVoxel(12, 16, 4, 0xf59e0b);
    castleGate.position.set(0, 10, 13);
    island3Group.add(castleGate);

    // Central High Royal Tower
    const centerTower = createVoxel(18, 38, 18, 0xf8fafc);
    centerTower.position.set(0, 36, -4);
    island3Group.add(centerTower);

    // Golden Center Spire Cone
    const spireGeo = new THREE.ConeGeometry(12, 26, 8);
    const spireMat = new THREE.MeshLambertMaterial({ color: 0xeab308, flatShading: true });
    const centerSpire = new THREE.Mesh(spireGeo, spireMat);
    centerSpire.position.set(0, 66, -4);
    island3Group.add(centerSpire);

    // Left & Right Flanking Blue-Roofed Spire Towers
    const towerGeo = new THREE.BoxGeometry(12, 34, 12);
    const towerMat = new THREE.MeshLambertMaterial({ color: 0xe2e8f0, flatShading: true });

    const coneGeo = new THREE.ConeGeometry(9, 20, 8);
    const coneMat = new THREE.MeshLambertMaterial({ color: 0x2563eb, flatShading: true });

    // Left Turret
    const leftTower = new THREE.Mesh(towerGeo, towerMat);
    leftTower.position.set(-20, 22, -2);
    island3Group.add(leftTower);

    const leftCone = new THREE.Mesh(coneGeo, coneMat);
    leftCone.position.set(-20, 48, -2);
    island3Group.add(leftCone);

    // Right Turret
    const rightTower = new THREE.Mesh(towerGeo, towerMat);
    rightTower.position.set(20, 22, -2);
    island3Group.add(rightTower);

    const rightCone = new THREE.Mesh(coneGeo, coneMat);
    rightCone.position.set(20, 48, -2);
    island3Group.add(rightCone);

    // Castle Golden Aura Light
    const citadelLight = new THREE.PointLight(0x60a5fa, 2.0, 120);
    citadelLight.position.set(0, 40, 10);
    island3Group.add(citadelLight);

    scene.add(island3Group);
  }

  // --- CASCADING 3D WATERFALLS & MIST ---
  function buildWaterfallEffects() {
    // Island 2: Left Waterfall Stream pouring over the edge
    const wfGeo = new THREE.PlaneGeometry(10, 85, 1, 12);
    const wfMat = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    });

    const stream1 = new THREE.Mesh(wfGeo, wfMat);
    stream1.position.set(-34, -42, 6);
    island2Group.add(stream1);
    waterfallStreams.push(stream1);

    // Island 3: Twin Front Waterfall Streams pouring from Citadel Gate
    const stream2A = new THREE.Mesh(new THREE.PlaneGeometry(6, 75), wfMat);
    stream2A.position.set(-8, -38, 24);
    island3Group.add(stream2A);
    waterfallStreams.push(stream2A);

    const stream2B = new THREE.Mesh(new THREE.PlaneGeometry(6, 75), wfMat);
    stream2B.position.set(8, -38, 24);
    island3Group.add(stream2B);
    waterfallStreams.push(stream2B);

    // Mist Particles below the waterfalls
    const mistGeo = new THREE.BufferGeometry();
    const mistCount = 180;
    const mistPositions = new Float32Array(mistCount * 3);

    for (let i = 0; i < mistCount; i++) {
      mistPositions[i * 3] = (Math.random() - 0.5) * 80;
      mistPositions[i * 3 + 1] = -75 - Math.random() * 30;
      mistPositions[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }

    mistGeo.setAttribute('position', new THREE.BufferAttribute(mistPositions, 3));
    const mistMat = new THREE.PointsMaterial({
      size: 4.5,
      color: 0xa5f3fc,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    mistParticles = new THREE.Points(mistGeo, mistMat);
    island2Group.add(mistParticles);
  }

  // --- INTERACTION & EVENT LISTENERS ---
  function setupEventListeners() {
    window.addEventListener('resize', onWindowResize);

    const targetEl = container || window;

    // Mouse movement parallax
    window.addEventListener('mousemove', (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      mousePos.targetX = normX * 28;
      mousePos.targetY = normY * 18;

      if (container) {
        const rect = container.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      }
    });

    // Touch support
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        const normX = (t.clientX / window.innerWidth) * 2 - 1;
        const normY = -(t.clientY / window.innerHeight) * 2 + 1;
        mousePos.targetX = normX * 22;
        mousePos.targetY = normY * 14;
      }
    }, { passive: true });

    // Click on Islands
    if (canvas) {
      canvas.addEventListener('click', onCanvasClick);
    }
  }

  function onCanvasClick(e) {
    if (!raycaster || !camera) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const clickY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(new THREE.Vector2(clickX, clickY), camera);
    const intersects = raycaster.intersectObjects([island1Group, island2Group, island3Group], true);

    if (intersects.length > 0) {
      let hitGroup = intersects[0].object;
      while (hitGroup.parent && hitGroup.parent !== scene) {
        hitGroup = hitGroup.parent;
      }

      if (hitGroup && hitGroup.userData && hitGroup.userData.id) {
        const targetId = hitGroup.userData.id;
        console.log(`[Realms3D] Clicked island: ${hitGroup.userData.name} (${targetId})`);

        // Trigger island sound effect
        if (window.AudioEngine && window.AudioEngine.playClick) {
          window.AudioEngine.playClick();
        }

        // Highlight matching pro-show card below
        const card = document.getElementById(targetId);
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.classList.add('island-card-focused');
          setTimeout(() => card.classList.remove('island-card-focused'), 1600);
        }

        // If Island 2 was clicked, offer to launch Python Quest
        if (targetId === 'island-2') {
          openPythonQuestModal();
        }
      }
    }
  }

  function onWindowResize() {
    if (!renderer || !camera || !container) return;
    const width = container.clientWidth || window.innerWidth;
    const height = Math.min(480, Math.max(340, window.innerHeight * 0.45));

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  // --- ANIMATION LOOP ---
  function animate() {
    if (!isRunning) return;
    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    // 1. Smooth Camera Parallax (Lerp)
    mousePos.x += (mousePos.targetX - mousePos.x) * 0.05;
    mousePos.y += (mousePos.targetY - mousePos.y) * 0.05;

    camera.position.x = mousePos.x;
    camera.position.y = 45 + mousePos.y;
    camera.lookAt(0, 0, 0);

    // 2. Sinusoidal Floating Bob for the 3 Islands
    if (island1Group) {
      island1Group.position.y = island1Group.userData.basePosY + Math.sin(elapsed * 1.6) * 3.5;
      island1Group.rotation.y = Math.sin(elapsed * 0.5) * 0.04;
    }
    if (island2Group) {
      island2Group.position.y = island2Group.userData.basePosY + Math.sin(elapsed * 1.4 + 1.2) * 4.0;
      island2Group.rotation.y = Math.cos(elapsed * 0.45) * 0.04;
    }
    if (island3Group) {
      island3Group.position.y = island3Group.userData.basePosY + Math.sin(elapsed * 1.5 + 2.4) * 3.8;
      island3Group.rotation.y = Math.sin(elapsed * 0.55 + 1.0) * 0.04;
    }

    // 3. Oscillate Concert Stage Beams
    const isPlaying = window.SoundtrackEngine && window.SoundtrackEngine.isPlaying;
    const beamPulseMultiplier = isPlaying ? 1.4 : 0.85;

    lightBeams.forEach((beamObj, idx) => {
      const angle = elapsed * beamObj.speed + beamObj.baseAngle;
      beamObj.mesh.rotation.z = Math.sin(angle) * 0.18;
      beamObj.mesh.rotation.x = Math.cos(angle * 0.8) * 0.12;

      // Pulse beam height and opacity
      const pulse = 1.0 + Math.sin(elapsed * 4 + idx) * 0.15 * beamPulseMultiplier;
      beamObj.mesh.scale.set(1.0, pulse, 1.0);
    });

    // 4. Waterfall animation & mist flutter
    if (mistParticles) {
      mistParticles.rotation.y = elapsed * 0.12;
    }

    // 5. Starfield slow cosmic drift
    if (starsParticles) {
      starsParticles.rotation.y = elapsed * 0.015;
    }

    renderer.render(scene, camera);
  }

  // --- PYTHON STUDY QUEST MODAL (Conditional Statements from Image 3) ---
  function openPythonQuestModal() {
    let existing = document.getElementById('python-study-quest-modal');
    if (existing) {
      existing.classList.add('visible');
      return;
    }

    const modal = document.createElement('div');
    modal.id = 'python-study-quest-modal';
    modal.className = 'modal-backdrop visible';
    modal.innerHTML = `
      <div class="modal-card gamified-quest-modal" style="max-width:580px;border:1px solid #38bdf8;">
        <div class="modal-header">
          <div class="quest-modal-title-row">
            <span class="quest-pill font-pixel">REALM 2 • MIND LAB</span>
            <h3 class="modal-title font-pixel" style="font-size:16px;color:#38bdf8;">🐍 Python Conditional Statements Quest</h3>
          </div>
          <button type="button" class="modal-close" onclick="document.getElementById('python-study-quest-modal').remove()">✕</button>
        </div>

        <div class="modal-body" style="padding:16px 20px;">
          <div class="quest-lesson-card" style="background:#0f172a;padding:14px;border-radius:8px;border:1px solid #1e293b;margin-bottom:14px;">
            <div style="font-size:12px;color:#94a3b8;margin-bottom:6px;font-family:var(--font-mono);font-weight:600;">CONCEPT: SINGLE-LINE IF / TERNARY OPERATOR</div>
            <pre style="background:#020617;padding:10px;border-radius:6px;color:#38bdf8;font-size:12px;font-family:var(--font-mono);overflow-x:auto;">&lt;var&gt; = &lt;val1&gt; if &lt;condition&gt; else &lt;val2&gt;

food = input("food : ")
eat = "Yes" if food == "cake" else "no"
print(eat)

# Double condition ternary evaluation:
print("sweet") if food == "cake" or food == "jalebi" else print("not sweet")</pre>
          </div>

          <div class="quest-interactive-tester">
            <label style="font-size:12px;font-weight:600;color:#e2e8f0;margin-bottom:6px;display:block;">
              Test Food Input:
            </label>
            <div style="display:flex;gap:8px;margin-bottom:12px;">
              <input type="text" id="quest-food-input" class="form-input" value="cake" placeholder="e.g. cake, jalebi, apple" style="flex:1;">
              <button id="btn-run-python-ternary" class="btn btn-primary font-pixel" style="font-size:12px;">▶ EVALUATE</button>
            </div>

            <!-- Terminal Output Box -->
            <div id="quest-terminal-output" style="background:#020617;border:1px solid #1e293b;padding:12px;border-radius:6px;font-family:var(--font-mono);font-size:13px;min-height:56px;color:#4ade80;">
              $ python3 study_challenge.py<br/>
              food : cake ➔ Output: <strong>"sweet"</strong> (Condition: cake or jalebi evaluated TRUE)
            </div>
          </div>
        </div>

        <div class="modal-footer" style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;">
          <span style="font-size:12px;color:#f59e0b;font-family:var(--font-arcade);">⚡ Reward: +50 Ascension XP + Daily Study Habit</span>
          <button id="btn-claim-python-quest" class="btn btn-accent font-pixel" style="font-size:12px;">
            ✓ CLAIM +50 XP
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Bind Runner
    const foodInput = modal.querySelector('#quest-food-input');
    const runBtn = modal.querySelector('#btn-run-python-ternary');
    const termOut = modal.querySelector('#quest-terminal-output');
    const claimBtn = modal.querySelector('#btn-claim-python-quest');

    const evaluateFood = () => {
      const val = (foodInput.value || '').trim().toLowerCase();
      const isSweet = val === 'cake' || val === 'jalebi';
      const outputText = isSweet ? 'sweet' : 'not sweet';
      const condResult = isSweet ? 'TRUE' : 'FALSE';
      const color = isSweet ? '#4ade80' : '#f87171';

      termOut.innerHTML = `
        $ python3 study_challenge.py<br/>
        food = "${escapeHtml(val)}"<br/>
        print("sweet") if food == "cake" or food == "jalebi" else print("not sweet")<br/>
        ➔ Output: <span style="color:${color};font-weight:bold;">"${outputText}"</span> (Condition evaluated ${condResult})
      `;

      if (window.AudioEngine && window.AudioEngine.playClick) {
        window.AudioEngine.playClick();
      }
    };

    runBtn.addEventListener('click', evaluateFood);
    foodInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') evaluateFood();
    });

    // Claim Quest Reward
    claimBtn.addEventListener('click', () => {
      if (window.AudioEngine && window.AudioEngine.playAchievementFanfare) {
        window.AudioEngine.playAchievementFanfare();
      }

      // Check off the "Study min 2 hr" habit for today
      if (window.AppState) {
        const todayStr = new Date().toISOString().slice(0, 10);
        const studyHabit = window.AppState.habits.find(h => h.name.toLowerCase().includes('study'));
        if (studyHabit) {
          if (!window.AppState.records[todayStr]) window.AppState.records[todayStr] = {};
          window.AppState.records[todayStr][studyHabit.id] = {
            status: 'completed',
            targetValue: null,
            notes: 'Completed Python Ternary Operator Study Quest (+50 XP)',
            updatedAt: new Date().toISOString()
          };
          window.AppState.save();
        }
      }

      if (window.UI) {
        window.UI.showToast('🎉 Python Quest Mastered! +50 Ascension XP Added & Study Habit Checked Off!');
        window.UI.renderCurrentView();
      }

      modal.remove();
    });
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Auto-init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initRealms3D, 200);
    });
  } else {
    setTimeout(initRealms3D, 200);
  }

  // Export to window
  window.Realms3D = {
    init: initRealms3D,
    openPythonQuestModal: openPythonQuestModal
  };

})();
