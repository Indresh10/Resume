/**
 * Three.js 3D Scene Engine for Indresh Hemani's Portfolio
 * Features:
 * - Interactive 3D Cyber Polyhedron & Orbiting Rings
 * - Reactive 3D Particle Starfield with Depth Parallax
 * - Mouse Tracking with Smooth Lerping Physics
 * - Dynamic Scroll-Linked Camera Orbiting
 * - Interactive Click Shockwaves (Particle Ripples in 3D Space)
 */

(function () {
    'use strict';

    const canvas = document.getElementById('bg-canvas');
    if (!canvas || typeof THREE === 'undefined') {
        console.warn('Three.js or #bg-canvas not found, skipping 3D background initialization.');
        return;
    }

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 25;
    camera.position.y = 0;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // --- Dynamic Lighting ---
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x00f0ff, 2.5, 60);
    cyanPointLight.position.set(12, 10, 15);
    scene.add(cyanPointLight);

    const purplePointLight = new THREE.PointLight(0x8b5cf6, 2.5, 60);
    purplePointLight.position.set(-15, -10, 10);
    scene.add(purplePointLight);

    // --- 3D Particle Starfield / Matrix ---
    const particleCount = 1500;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x00f0ff); // Cyan
    const color2 = new THREE.Color(0x8b5cf6); // Purple
    const color3 = new THREE.Color(0x38bdf8); // Sky blue

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const radius = 10 + Math.random() * 45;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particlePositions[i3 + 2] = radius * Math.cos(phi);

        const mixedColor = Math.random() > 0.5 ? color1.clone().lerp(color2, Math.random()) : color3;
        particleColors[i3] = mixedColor.r;
        particleColors[i3 + 1] = mixedColor.g;
        particleColors[i3 + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // --- Hero 3D Geometric Complex ---
    const heroGroup = new THREE.Group();
    heroGroup.position.set(7.5, 0.8, 0);

    // 1. Core Polyhedron & Luminous Energy Core
    const innerGeom = new THREE.IcosahedronGeometry(4.2, 0);
    const innerMat = new THREE.MeshPhongMaterial({
        color: 0x0a0f1d,
        emissive: 0x1e1b4b,
        specular: 0x00f0ff,
        shininess: 90,
        flatShading: true,
        transparent: true,
        opacity: 0.85
    });
    const innerMesh = new THREE.Mesh(innerGeom, innerMat);
    heroGroup.add(innerMesh);

    // Inner Glowing Core (Energetic Corona)
    const coreGeom = new THREE.SphereGeometry(2.4, 24, 24);
    const coreMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    heroGroup.add(coreMesh);

    // Wireframe Cage
    const wireGeom = new THREE.IcosahedronGeometry(4.35, 1);
    const wireMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.4
    });
    const wireMesh = new THREE.Mesh(wireGeom, wireMat);
    heroGroup.add(wireMesh);

    // 2. Surrounding Orbital Rings (Gyroscopic Triad)
    const ring1Geom = new THREE.TorusGeometry(6.2, 0.05, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.65
    });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    heroGroup.add(ring1);

    const ring2Geom = new THREE.TorusGeometry(7.4, 0.04, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.45
    });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    heroGroup.add(ring2);

    // Ring 3: Outer Telemetry Orbital Ring
    const ring3Geom = new THREE.TorusGeometry(8.6, 0.03, 16, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.35
    });
    const ring3 = new THREE.Mesh(ring3Geom, ring3Mat);
    ring3.rotation.z = Math.PI / 5;
    ring3.rotation.y = -Math.PI / 3;
    heroGroup.add(ring3);

    // 3. Floating Satellite Nodes & Telemetry Beacons
    const satelliteCount = 10;
    const satellites = [];
    const satColors = [0x00f0ff, 0x8b5cf6, 0x38bdf8, 0x10b981, 0xa855f7];

    for (let s = 0; s < satelliteCount; s++) {
        const satColor = satColors[s % satColors.length];
        const satContainer = new THREE.Group();

        // Central satellite bead
        const satGeom = new THREE.SphereGeometry(0.22, 10, 10);
        const satMat = new THREE.MeshBasicMaterial({ color: satColor });
        const satMesh = new THREE.Mesh(satGeom, satMat);
        satContainer.add(satMesh);

        // Orbital beacon halo ring
        const haloGeom = new THREE.RingGeometry(0.28, 0.36, 16);
        const haloMat = new THREE.MeshBasicMaterial({
            color: satColor,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending
        });
        const haloMesh = new THREE.Mesh(haloGeom, haloMat);
        satContainer.add(haloMesh);

        const angle = (s / satelliteCount) * Math.PI * 2;
        const satRadius = 5.8 + (s % 3) * 1.3;
        const speed = 0.012 + (s % 4) * 0.004;

        satContainer.position.set(
            Math.cos(angle) * satRadius,
            Math.sin(angle) * satRadius * 0.45,
            Math.sin(angle * 1.5) * 3
        );

        heroGroup.add(satContainer);
        satellites.push({
            group: satContainer,
            mesh: satMesh,
            halo: haloMesh,
            baseAngle: angle,
            speed: speed,
            radius: satRadius,
            phase: s * 0.6
        });
    }

    scene.add(heroGroup);

    // --- Interactive Shockwave Ring Generator (Cross-Platform Windows & Mac) ---
    const shockwaves = [];
    const raycaster = new THREE.Raycaster();

    function create3DShockwave(clientX, clientY) {
        if (!camera) return;

        // 1. Raycast into 3D camera space so it's ALWAYS directly under the cursor in 3D world space
        const mouseNdc = new THREE.Vector2(
            (clientX / window.innerWidth) * 2 - 1,
            -(clientY / window.innerHeight) * 2 + 1
        );

        raycaster.setFromCamera(mouseNdc, camera);

        // Position shockwave 14 units directly in front of camera along the ray
        const wavePos = new THREE.Vector3();
        raycaster.ray.at(14, wavePos);

        const ringGeo = new THREE.RingGeometry(0.18, 0.45, 36);
        const isCyan = Math.random() > 0.4;
        const ringMat = new THREE.MeshBasicMaterial({
            color: isCyan ? 0x00f0ff : 0x8b5cf6,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.95,
            blending: THREE.AdditiveBlending,
            depthWrite: false, // Critical for Windows Direct3D/ANGLE blending
            depthTest: true
        });

        const wave = new THREE.Mesh(ringGeo, ringMat);
        wave.position.copy(wavePos);
        // Ensure shockwave ring always faces the camera directly!
        wave.quaternion.copy(camera.quaternion);

        scene.add(wave);
        shockwaves.push({ 
            mesh: wave, 
            scale: 1, 
            maxScale: 22, 
            opacity: 0.95,
            growRate: 0.55,
            fadeRate: 0.025
        });
    }

    // Interactive DOM Surface Shockwave (Guarantees immediate visual feedback on Windows & over cards)
    function createDOMShockwave(clientX, clientY) {
        const ripple = document.createElement('div');
        ripple.className = 'shockwave-dom-pulse';
        ripple.style.left = `${clientX}px`;
        ripple.style.top = `${clientY}px`;
        ripple.style.borderColor = Math.random() > 0.5 ? 'var(--accent-cyan)' : 'var(--accent-purple)';
        document.body.appendChild(ripple);

        setTimeout(() => {
            if (ripple && ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 800);
    }

    function triggerShockwave(clientX, clientY) {
        create3DShockwave(clientX, clientY);
        createDOMShockwave(clientX, clientY);
    }

    // Windows & Mac Unified Event Listener:
    // pointerdown fires immediately on Windows (touch, touchpad, mouse) without click-drag cancellation
    let lastShockwaveTime = 0;
    function onPointerDownShockwave(e) {
        // Don't trigger if clicking interactive inputs or controls
        if (e.target.closest('input, textarea, button, a, select, .dynamic-island, .tab-btn, .modal-backdrop, .modal-content, .command-palette-modal')) {
            return;
        }

        const now = performance.now();
        if (now - lastShockwaveTime < 80) return; // Debounce rapid micro-events
        lastShockwaveTime = now;

        triggerShockwave(e.clientX, e.clientY);
    }

    window.addEventListener('pointerdown', onPointerDownShockwave, { passive: true });

    // --- Interactive Mouse & Scroll Physics ---
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    window.addEventListener('mousemove', (e) => {
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener('scroll', () => {
        targetScrollY = window.scrollY;
    }, { passive: true });

    // Responsive repositioning
    function adjustForScreen() {
        const isMobile = window.innerWidth < 992;
        if (isMobile) {
            heroGroup.position.set(0, 5, -8);
            heroGroup.scale.set(0.7, 0.7, 0.7);
        } else {
            heroGroup.position.set(7.5, 0.8, 0);
            heroGroup.scale.set(1, 1, 1);
        }
    }
    adjustForScreen();

    // --- Animation Loop ---
    let clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Smooth Lerp for Mouse
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        // Smooth Lerp for Scroll
        scrollY += (targetScrollY - scrollY) * 0.05;
        const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
        const scrollFraction = scrollY / maxScroll;

        // Rotate Hero Planet & Energy Core
        innerMesh.rotation.x = elapsedTime * 0.2;
        innerMesh.rotation.y = elapsedTime * 0.3;
        wireMesh.rotation.x = -elapsedTime * 0.15;
        wireMesh.rotation.y = -elapsedTime * 0.25;

        // Core pulsating respiration
        const corePulse = 1 + Math.sin(elapsedTime * 2.2) * 0.07;
        coreMesh.scale.set(corePulse, corePulse, corePulse);
        coreMesh.material.opacity = 0.22 + Math.sin(elapsedTime * 3) * 0.1;

        // Gyroscopic Rings Rotation
        ring1.rotation.z = elapsedTime * 0.35;
        ring1.rotation.y = Math.sin(elapsedTime * 0.5) * 0.5;
        ring2.rotation.z = -elapsedTime * 0.25;
        ring3.rotation.x = elapsedTime * 0.2;
        ring3.rotation.z = -elapsedTime * 0.15;

        // Orbit Telemetry Satellites with Beacon Pulses
        satellites.forEach(sat => {
            const currentAngle = sat.baseAngle + elapsedTime * sat.speed * 35;
            sat.group.position.x = Math.cos(currentAngle) * sat.radius;
            sat.group.position.y = Math.sin(currentAngle) * (sat.radius * 0.45);
            sat.group.position.z = Math.sin(currentAngle * 1.5) * 3;

            // Halo ring spin and beacon luminescence pulse
            sat.halo.rotation.z += 0.04;
            sat.halo.material.opacity = 0.35 + Math.sin(elapsedTime * 4.5 + sat.phase) * 0.35;
        });

        // Periodic Cosmic Telemetry Radar Ping from Planet Core
        if (Math.floor(elapsedTime * 10) % 45 === 0 && shockwaves.length < 5) {
            const pingGeo = new THREE.RingGeometry(0.2, 0.45, 32);
            const pingMat = new THREE.MeshBasicMaterial({
                color: 0x00f0ff,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.6,
                blending: THREE.AdditiveBlending
            });
            const pingWave = new THREE.Mesh(pingGeo, pingMat);
            pingWave.position.copy(heroGroup.position);
            pingWave.rotation.x = Math.PI / 2.5;
            scene.add(pingWave);
            shockwaves.push({ mesh: pingWave, scale: 1, maxScale: 22, opacity: 0.6 });
        }

        // Rotate background starfield
        particles.rotation.y = elapsedTime * 0.02 + mouseX * 0.1;
        particles.rotation.x = elapsedTime * 0.01 + mouseY * 0.1;

        // Parallax Camera based on mouse & scroll
        camera.position.x = mouseX * 2.5;
        camera.position.y = -mouseY * 2 - (scrollFraction * 14);
        camera.position.z = 25 - (scrollFraction * 8);

        // Move cyan & purple point lights dynamically
        cyanPointLight.position.x = 12 + Math.sin(elapsedTime) * 4;
        purplePointLight.position.y = -10 + Math.cos(elapsedTime) * 4;

        // Animate shockwaves
        for (let i = shockwaves.length - 1; i >= 0; i--) {
            const sw = shockwaves[i];
            sw.scale += sw.growRate || 0.5;
            sw.opacity -= sw.fadeRate || 0.025;
            sw.mesh.scale.set(sw.scale, sw.scale, 1);
            sw.mesh.material.opacity = Math.max(0, sw.opacity);
            // Keep billboarded facing camera
            sw.mesh.quaternion.copy(camera.quaternion);

            if (sw.opacity <= 0) {
                scene.remove(sw.mesh);
                if (sw.mesh.geometry) sw.mesh.geometry.dispose();
                if (sw.mesh.material) sw.mesh.material.dispose();
                shockwaves.splice(i, 1);
            }
        }

        camera.lookAt(0, -scrollFraction * 12, 0);

        renderer.render(scene, camera);
    }

    animate();

    // --- Window Resize Listener ---
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        adjustForScreen();
    });

})();
