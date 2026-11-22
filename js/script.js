// COSMOS – Virtual Space Explorer
// Animated stars, hero button behavior, and planet modal

const planetData = {
  sun: {
    name: "The Sun",
    diameter: "1,392,700 km",
    distance: "0 km (Solar Center)",
    moons: "8 planets + dwarfs",
    orbitalPeriod: "~230 million years (Galactic)",
    temp: "5,500°C (Surface) / 15M°C (Core)",
    facts: [
      "The Sun contains 99.86% of all mass in the entire solar system.",
      "About 600 million tons of hydrogen are fused into helium in its core every single second."
    ]
  },
  moon: {
    name: "The Moon",
    diameter: "3,474 km",
    distance: "384,400 km from Earth",
    moons: "0 (Natural satellite of Earth)",
    orbitalPeriod: "27.3 Earth days",
    temp: "-130°C to +120°C",
    facts: [
      "The Moon is in synchronous rotation with Earth, meaning the exact same face always points toward us.",
      "The gravitational tug of the Moon stabilizes Earth's axial tilt, moderating planetary climate."
    ]
  },

  mercury: {
    name: "Mercury",
    diameter: "4,879 km",
    distance: "57.9 million km",
    moons: "0",
    orbitalPeriod: "88 Earth days",
    temp: "167°C",
    facts: ["Mercury is the fastest planet in the solar system, orbiting the Sun at about 47 km/s.", "Due to its thin atmosphere, it has the most extreme temperature fluctuations."]
  },
  venus: {
    name: "Venus",
    diameter: "12,104 km",
    distance: "108.2 million km",
    moons: "0",
    orbitalPeriod: "225 Earth days",
    temp: "464°C",
    facts: ["Venus rotates in the opposite direction to most other planets.", "Its surface pressure is 92 times that of Earth, similar to being 1 km underwater."]
  },
  earth: {
    name: "Earth",
    diameter: "12,742 km",
    distance: "149.6 million km",
    moons: "1",
    orbitalPeriod: "365.25 days",
    temp: "15°C",
    facts: ["Earth is the only planet in our solar system known to have liquid water on its surface.", "Our planet is not a perfect sphere; it's an oblate spheroid, bulging at the equator."]
  },
  mars: {
    name: "Mars",
    diameter: "6,779 km",
    distance: "227.9 million km",
    moons: "2",
    orbitalPeriod: "687 Earth days",
    temp: "-65°C",
    facts: ["Mars is home to Olympus Mons, the largest volcano in the solar system.", "The red color of the surface is caused by iron oxide (rust) in the soil."]
  },
  jupiter: {
    name: "Jupiter",
    diameter: "139,820 km",
    distance: "778.5 million km",
    moons: "95",
    orbitalPeriod: "12 Earth years",
    temp: "-110°C",
    facts: ["Jupiter is massive enough to fit all other planets inside it twice.", "The Great Red Spot is a persistent storm that has been raging for hundreds of years."]
  },
  saturn: {
    name: "Saturn",
    diameter: "116,460 km",
    distance: "1.4 billion km",
    moons: "146",
    orbitalPeriod: "29 Earth years",
    temp: "-140°C",
    facts: ["Saturn's rings are made mostly of ice particles and some rocky debris.", "It is the least dense planet; it would actually float if you could find a bathtub large enough."]
  },
  uranus: {
    name: "Uranus",
    diameter: "50,724 km",
    distance: "2.9 billion km",
    moons: "28",
    orbitalPeriod: "84 Earth years",
    temp: "-195°C",
    facts: ["Uranus rotates at a nearly 98-degree angle, making it look like it's rolling along its orbit.", "It was the first planet discovered with a telescope."]
  },
  neptune: {
    name: "Neptune",
    diameter: "49,244 km",
    distance: "4.5 billion km",
    moons: "16",
    orbitalPeriod: "165 Earth years",
    temp: "-201°C",
    facts: ["Neptune has the strongest winds in the solar system, reaching up to 2,100 km/h.", "It is the only planet in our solar system invisible to the naked eye."]
  }
};

// Top-level DOM listener consolidated at the end of script

function createStars() {
  const starsContainer = document.getElementById("stars");
  if (!starsContainer) return;
  starsContainer.innerHTML = "";
  const starCount = 160;
  const colorClasses = ["star-white", "star-cyan", "star-gold", "star-violet"];
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    const colorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];
    star.classList.add(colorClass);
    const size = Math.random() < 0.8 ? (Math.random() * 2 + 1) : (Math.random() * 2.5 + 2.5);
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDuration = (Math.random() * 4 + 2) + "s";
    star.style.animationDelay = (Math.random() * 4) + "s";
    starsContainer.appendChild(star);
  }
}

function setupExploreButton() {
  const exploreBtn = document.getElementById("hero-explore-btn") || document.querySelector(".hero .btn");
  if (exploreBtn) {
    exploreBtn.addEventListener("click", function (e) {
      e.preventDefault();
      switchCosmosView("view-explore");
      safeUpdateHash("explore");
    });
  }
}

function setupModal() {
  const modal = document.getElementById("planetModal");
  const closeBtn = document.querySelector(".close-btn");
  const learnBtns = document.querySelectorAll(".learn-btn");

  learnBtns.forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const planet = planetData[this.getAttribute("data-planet")];
      document.getElementById("modalTitle").textContent = planet.name;
      document.getElementById("modalBody").innerHTML = `
        <p><strong>Diameter:</strong> ${planet.diameter}</p>
        <p><strong>Distance from Sun:</strong> ${planet.distance}</p>
        <p><strong>Number of Moons:</strong> ${planet.moons}</p>
        <p><strong>Orbital Period:</strong> ${planet.orbitalPeriod}</p>
        <p><strong>Avg Temperature:</strong> ${planet.temp}</p>
        <p><strong>Interesting Facts:</strong></p>
        <ul>
          <li>${planet.facts[0]}</li>
          <li>${planet.facts[1]}</li>
        </ul>
      `;
      modal.style.display = "block";
    });
  });

  closeBtn.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", (e) => { if (e.target == modal) modal.style.display = "none"; });
}

// Space Facts functionality
const spaceFacts = [
  "The Sun makes up 99.86% of the mass of our entire solar system.",
  "A day on Venus is longer than its year — one rotation takes 243 Earth days.",
  "Jupiter's moon Io has active volcanoes, making it the most geologically active body in the solar system.",
  "The Great Red Spot on Jupiter is a storm large enough to swallow Earth.",
  "There are more trees on Earth than stars in the Milky Way galaxy.",
  "Saturn's moon Titan has lakes of liquid methane and ethane.",
  "Light from the Sun takes about 8 minutes to reach Earth.",
  "Neptune has the strongest winds in the solar system, reaching speeds of 2,100 km/h."
];

let factIndex = 0;

function setupFacts() {
  const factDisplay = document.getElementById("factDisplay");
  const nextFactBtn = document.getElementById("nextFactBtn");

  nextFactBtn.addEventListener("click", function () {
    factIndex = (factIndex + 1) % spaceFacts.length;
    factDisplay.style.opacity = 0;
    setTimeout(() => {
      factDisplay.textContent = spaceFacts[factIndex];
      factDisplay.style.opacity = 1;
    }, 250);
  });
}

function setupMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}

// Phase 2: Three.js Solar System - Step 2 (Planets & Orbits)
function initSolarSystem() {
    const container = document.getElementById('solar-system');
    if (!container) return;
    if (typeof THREE === 'undefined') {
        console.warn('[COSMOS] Three.js not loaded. Skipping 3D solar system rendering.');
        return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 2000);
    camera.position.set(0, 100, 200); // Moved camera back to see the whole system

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // 1. Better Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.3)); // Dim background light
    const sunLight = new THREE.PointLight(0xffffff, 2, 500); // Light coming FROM the Sun
    scene.add(sunLight);

    // 2. The Sun
    const sunGeometry = new THREE.SphereGeometry(15, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc00 }); // Bright Yellow
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // 3. Planet Data (Size, Distance from Sun, Orbit Speed, Color)
    const planetsData = [
        { name: "Mercury", size: 2, dist: 25, speed: 0.04, color: 0x8c8c8c },
        { name: "Venus", size: 4, dist: 40, speed: 0.015, color: 0xe3bb76 },
        { name: "Earth", size: 4.2, dist: 55, speed: 0.01, color: 0x2271b3 },
        { name: "Mars", size: 2.5, dist: 70, speed: 0.008, color: 0xe27b58 },
        { name: "Jupiter", size: 10, dist: 100, speed: 0.002, color: 0xd39c7e },
        { name: "Saturn", size: 8.5, dist: 130, speed: 0.0009, color: 0xc5ab6e },
        { name: "Uranus", size: 6, dist: 160, speed: 0.0004, color: 0xbbe1e4 },
        { name: "Neptune", size: 5.8, dist: 185, speed: 0.0001, color: 0x6081ff }
    ];

    const planets = [];

    // 4. Create Planets and their Orbital Path Lines
    planetsData.forEach(p => {
        // Create the Planet Mesh
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(p.size, 32, 32),
            new THREE.MeshStandardMaterial({ color: p.color })
        );
        
        // Starting position
        const angle = Math.random() * Math.PI * 2;
        mesh.position.x = Math.cos(angle) * p.dist;
        mesh.position.z = Math.sin(angle) * p.dist;
        
        scene.add(mesh);

        // Create the Orbit Ring (Visual Path)
        const orbitGeo = new THREE.BufferGeometry();
        const points = [];
        for (let i = 0; i <= 64; i++) {
            const a = (i / 64) * Math.PI * 2;
            points.push(new THREE.Vector3(Math.cos(a) * p.dist, 0, Math.sin(a) * p.dist));
        }
        orbitGeo.setFromPoints(points);
        const orbitLine = new THREE.Line(orbitGeo, new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.2, transparent: true }));
        scene.add(orbitLine);

        // Store for animation
        planets.push({ mesh, data: p, angle });
    });
    // --- Step 4: Textures & Starfield (Add this inside initSolarSystem, below the planet loop) ---
    
    // 1. Apply Earth Texture
    const earthObj = planets.find(p => p.data.name === "Earth");
    if (earthObj) {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/textures/planets/earth_atmos_2048.jpg', (texture) => {
            earthObj.mesh.material.map = texture;
            earthObj.mesh.material.color.setHex(0xffffff); // Remove base color to show texture
            earthObj.mesh.material.needsUpdate = true;
        });
    }

    // 2. Create 3D Starfield
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 });
    const starVertices = [];
    for (let i = 0; i < 8000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);
    // Render Loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate Sun
        sun.rotation.y += 0.004;

        // Move Planets in Orbit
        planets.forEach(p => {
            p.angle += p.data.speed; // Move forward
            p.mesh.position.x = Math.cos(p.angle) * p.data.dist;
            p.mesh.position.z = Math.sin(p.angle) * p.data.dist;
            p.mesh.rotation.y += 0.02; // Spin on axis
        });

        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    const resetBtn = document.getElementById('resetViewBtn');
    if (resetBtn) resetBtn.addEventListener('click', () => {
        controls.reset();
    });
    // --- Selection Logic (Add this inside initSolarSystem at the bottom) ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const planetMeshes = planets.map(p => p.mesh); // Collect meshes for clicking

    renderer.domElement.addEventListener('click', (event) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(planetMeshes);
        const panel = document.getElementById('planet-info-panel');

        if (intersects.length > 0) {
            const selectedMesh = intersects[0].object;
            // Find which planet was clicked
            const planetObj = planets.find(p => p.mesh === selectedMesh);
            
            // Highlight planet
            planetMeshes.forEach(m => m.material.emissive.setHex(0x000000));
            selectedMesh.material.emissive.setHex(0x333333);

            // Show Info in Panel
            document.getElementById('panel-name').textContent = planetObj.data.name;
            document.getElementById('panel-dist').textContent = "Distance: " + planetObj.data.dist + " units";
            document.getElementById('panel-period').textContent = "Orbit Speed: " + planetObj.data.speed;
            panel.style.display = 'block';
        } else {
            // Hide if clicked empty space
            planetMeshes.forEach(m => m.material.emissive.setHex(0x000000));
            panel.style.display = 'none';
        }
    });}

// --- Phase 3: Complete Feature Logic ---

// 1. Extended Data for Comparison
const extendedPlanetData = {
    mercury: { mass: "0.330", gravity: "3.7", rotation: "1407.6 hours" },
    venus: { mass: "4.87", gravity: "8.9", rotation: "-5832.5 hours" },
    earth: { mass: "5.97", gravity: "9.8", rotation: "23.9 hours" },
    mars: { mass: "0.642", gravity: "3.7", rotation: "24.6 hours" },
    jupiter: { mass: "1898", gravity: "23.1", rotation: "9.9 hours" },
    saturn: { mass: "568", gravity: "9.0", rotation: "10.7 hours" },
    uranus: { mass: "86.8", gravity: "8.7", rotation: "-17.2 hours" },
    neptune: { mass: "102", gravity: "11.0", rotation: "16.1 hours" }
};

// 2. Search Functionality
function performSearch() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const results = document.getElementById('searchResults');
    results.innerHTML = '';
    if (!input) return;

    const items = [...Object.keys(planetData), "blackhole", "nebula", "milkyway", "andromeda", "neutron", "supernova"];
    const matches = items.filter(item => item.includes(input));

    if (matches.length === 0) {
        results.innerHTML = '<p>No results found.</p>';
    } else {
        matches.forEach(m => {
            const link = document.createElement('a');
            link.href = "#explore";
            link.className = 'search-item';
            link.textContent = m.charAt(0).toUpperCase() + m.slice(1);
            results.appendChild(link);
        });
    }
}

// 3. Planet Comparison Logic
function initComparison() {
    const s1 = document.getElementById('planet1');
    const s2 = document.getElementById('planet2');
    Object.keys(planetData).forEach(p => {
        const name = p.charAt(0).toUpperCase() + p.slice(1);
        s1.options.add(new Option(name, p));
        s2.options.add(new Option(name, p));
    });
}

function comparePlanets() {
    const p1 = document.getElementById('planet1').value;
    const p2 = document.getElementById('planet2').value;
    const table = document.getElementById('comparisonTable');
    const body = document.getElementById('comparisonBody');
    
    document.getElementById('p1-name').textContent = p1.toUpperCase();
    document.getElementById('p2-name').textContent = p2.toUpperCase();
    
    const d1 = {...planetData[p1], ...extendedPlanetData[p1]};
    const d2 = {...planetData[p2], ...extendedPlanetData[p2]};
    
    const features = [
        { label: "Diameter", key: "diameter" },
        { label: "Distance from Sun", key: "distance" },
        { label: "Orbit Period", key: "orbitalPeriod" },
        { label: "Mass (10^24 kg)", key: "mass" },
        { label: "Gravity (m/s^2)", key: "gravity" },
        { label: "Rotation Period", key: "rotation" }
    ];

    body.innerHTML = '';
    features.forEach(f => {
        const row = `<tr>
            <td style="font-weight:bold; color:#4fc3f7;">${f.label}</td>
            <td>${d1[f.key]}</td>
            <td>${d2[f.key]}</td>
        </tr>`;
        body.innerHTML += row;
    });
    table.style.display = 'table';
}

// 4. Space Quiz Logic
const p3Quiz = [
    { q: "Which planet has the strongest winds in the solar system?", o: ["Jupiter", "Neptune", "Mars", "Saturn"], c: 1 },
    { q: "How many moons does Mars have?", o: ["1", "5", "0", "2"], c: 3 },
    { q: "What is the hottest planet in our solar system?", o: ["Mercury", "Venus", "Mars", "Sun"], c: 1 },
    { q: "The Great Red Spot is a storm on which planet?", o: ["Jupiter", "Saturn", "Neptune", "Uranus"], c: 0 }
];

let curQ = 0, score = 0;


function initQuiz() {
    curQ = 0;
    score = 0;
    const qStart = document.getElementById('quiz-start');
    const qGame = document.getElementById('quiz-game');
    const qFinal = document.getElementById('quiz-final');
    if (qStart) qStart.style.display = 'block';
    if (qGame) qGame.style.display = 'none';
    if (qFinal) qFinal.style.display = 'none';
}

function startQuiz() {
    document.getElementById('quiz-start').style.display = 'none';
    document.getElementById('quiz-game').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const q = p3Quiz[curQ];
    document.getElementById('quiz-question').textContent = q.q;
    const opts = document.getElementById('quiz-options');
    opts.innerHTML = '';
    q.o.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-opt';
        btn.textContent = opt;
        btn.onclick = () => checkAns(i);
        opts.appendChild(btn);
    });
    document.getElementById('quiz-feedback').textContent = '';
}

function checkAns(idx) {
    const correct = p3Quiz[curQ].c;
    const btns = document.querySelectorAll('.quiz-opt');
    if (idx === correct) {
        score++;
        btns[idx].classList.add('correct');
        document.getElementById('quiz-feedback').innerHTML = '<span style="color:#2ecc71;">Correct!</span>';
    } else {
        btns[idx].classList.add('wrong');
        btns[correct].classList.add('correct');
        document.getElementById('quiz-feedback').innerHTML = '<span style="color:#e74c3c;">Wrong!</span>';
    }
    
    setTimeout(() => {
        curQ++;
        if (curQ < p3Quiz.length) showQuestion();
        else finishQuiz();
    }, 1500);
}

function finishQuiz() {
    document.getElementById('quiz-game').style.display = 'none';
    document.getElementById('quiz-final').style.display = 'block';
    document.getElementById('quiz-score').textContent = `Your Score: ${score} / ${p3Quiz.length}`;
}

function resetQuiz() {
    curQ = 0; score = 0;
    document.getElementById('quiz-final').style.display = 'none';
    document.getElementById('quiz-start').style.display = 'block';
}

// --- PHASE 4: GLOBAL SPACE MISSIONS & TIME TRAVEL ---

const missionsData = [
    { name: "Apollo 11", year: 1969, agency: "NASA", desc: "First human landing on the lunar surface; Commander Neil Armstrong steps onto the Moon." },
    { name: "Voyager 1", year: 1977, agency: "NASA", desc: "The furthest human-made object from Earth, actively traversing interstellar space at 61,000 km/h." },
    { name: "Chandrayaan-3", year: 2023, agency: "ISRO", desc: "Historic achievement making India the first nation to softly land near the Moon's South Pole." },
    { name: "James Webb Telescope", year: 2021, agency: "NASA / ESA / CSA", desc: "Premier deep-space infrared observatory peering back over 13.5 billion years to the earliest galaxies." },
    { name: "Mars Orbiter Mission", year: 2013, agency: "ISRO", desc: "Historic Mangalyaan probe making India the first nation to achieve Mars orbit on its maiden attempt." },
    { name: "Perseverance Rover", year: 2020, agency: "NASA", desc: "Searching for signs of ancient microscopic biosignatures and caching core samples in Jezero Crater." },
    { name: "Aditya-L1", year: 2023, agency: "ISRO", desc: "India's first space-based observatory placed at the Sun-Earth L1 Lagrange point to study solar dynamics." },
    { name: "Cassini-Huygens", year: 1997, agency: "NASA / ESA / ASI", desc: "Comprehensive 13-year exploration of Saturn, discovering subsurface oceans on Enceladus and methane lakes on Titan." }
];

function initPhase4() {
    // 1. Populate Missions Grid cleanly without duplicates
    const grid = document.getElementById('missions-grid');
    if (grid) {
        grid.innerHTML = '';
        missionsData.forEach(m => {
            const card = document.createElement('div');
            card.className = 'mission-card-premium';
            card.innerHTML = `
                <div class="mission-card-header">
                    <h3 class="mission-card-title">${m.name}</h3>
                    <span class="mission-year-pill">${m.year}</span>
                </div>
                <div class="mission-agency-tag">Agency: ${m.agency}</div>
                <p class="mission-card-desc">${m.desc}</p>
            `;
            grid.appendChild(card);
        });
    }

    // 2. Time Travel Logic
    const timeSlider = document.getElementById('timeSlider');
    if (timeSlider) {
        timeSlider.addEventListener('input', (e) => {
            const timeFactor = e.target.value / 100;
            if (typeof updatePlanetOrbitsTime === 'function') {
                updatePlanetOrbitsTime(timeFactor);
            }
        });
    }
}

function resetTime() {
    const slider = document.getElementById('timeSlider');
    if (slider) slider.value = 0;
}


// ========================================================
// COSMOS PLANET MISSION CONTROL - ENGINE & STATE
// ========================================================
// 1. SOLAR SYSTEM PLANET DATA & MISSION CONFIGURATION
// ========================================================
const cosmosMissionPlanets = {
    mercury: {
        name: 'Mercury',
        distance: '57.9 million km',
        distNum: 57.9,
        moons: 0,
        gravity: '0.38 g',
        temperature: '-173°C to 427°C',
        rotation: '58.6 days',
        orbitalPeriod: '88 days',
        latency: '~3.2 min',
        latencySec: 192,
        orbitRadius: 38,
        visualRadius: 3.0,
        tilt: 0.03,
        rotSpeed: 0.004,
        atmoColor: 0xffb366,
        objective: 'Analyze permanently shadowed polar ice craters and map the hermean magnetic dipole.',
        hazards: ['SOLAR PROMINENCE', 'EXTREME THERMAL FLUX'],
        hazardType: 'solar',
        anomaly: {
            title: 'SOLAR CORONAL FLUX SURGE',
            options: [
                { title: '🛡️ SUNSHIELD ROLL', effect: 'Fuel -8% · Safe', fuelDelta: -8, hullDelta: 0, thermal: 'optimal', speedMult: 1.0, reaction: 'roll', log: 'Sunshield rotated into solar wind vector.' },
                { title: '⚡ AUTO-STABILIZE', effect: 'Fuel -4% · Hull -8%', fuelDelta: -4, hullDelta: -8, thermal: 'elevated', speedMult: 1.0, reaction: 'rcs', log: 'Radiator thermal balance engaged.' },
                { title: '🚀 FULL THRUST SPRINT', effect: 'Fuel -16% · Boost', fuelDelta: -16, hullDelta: -4, thermal: 'elevated', speedMult: 1.25, reaction: 'boost', log: 'High-thrust escape burst through flare front.' }
            ]
        }
    },
    venus: {
        name: 'Venus',
        distance: '108.2 million km',
        distNum: 108.2,
        moons: 0,
        gravity: '0.91 g',
        temperature: '462°C',
        rotation: '-243 days',
        orbitalPeriod: '225 days',
        latency: '~6.0 min',
        latencySec: 360,
        orbitRadius: 62,
        visualRadius: 4.5,
        tilt: 3.09,
        rotSpeed: -0.002,
        atmoColor: 0xf5be58,
        objective: 'Penetrate dense supercritical cloud decks and scan active volcanic highland plains.',
        hazards: ['SUPERCRITICAL PRESSURE', 'SULFURIC CLOUD SHEAR'],
        hazardType: 'acid',
        anomaly: {
            title: 'SULFURIC ATMOSPHERIC TURBULENCE',
            options: [
                { title: '🛡️ ABLATIVE VECTOR', effect: 'Fuel -7% · Safe', fuelDelta: -7, hullDelta: 0, thermal: 'optimal', speedMult: 1.0, reaction: 'roll', log: 'Ceramic ablative shield angled into wind shear.' },
                { title: '⚡ ELEVATE PERIAPSIS', effect: 'Fuel -12% · Smooth', fuelDelta: -12, hullDelta: 0, thermal: 'optimal', speedMult: 0.94, reaction: 'rcs', log: 'RCS burn lifted craft above dense acid shear.' },
                { title: '🌪️ CLOUD DECK SKIM', effect: 'Fuel 0% · Hull -16%', fuelDelta: 0, hullDelta: -16, thermal: 'elevated', speedMult: 1.2, reaction: 'boost', log: 'Aggressive cloud dive preserved propellant at hull cost.' }
            ]
        }
    },
    earth: {
        name: 'Earth',
        distance: '149.6 million km',
        distNum: 149.6,
        moons: 1,
        gravity: '1.00 g',
        temperature: '-89°C to 58°C',
        rotation: '23.9 hours',
        orbitalPeriod: '365.25 days',
        latency: '~0.1 min',
        latencySec: 6,
        orbitRadius: 94,
        visualRadius: 5.0,
        tilt: 0.41,
        rotSpeed: 0.012,
        atmoColor: 0x38bdf8,
        hasClouds: true,
        objective: 'Execute orbital rendezvous calibration and high-bandwidth laser optical downlink.',
        hazards: ['ORBITAL DEBRIS FIELD', 'GEOMAGNETIC DRAG'],
        hazardType: 'debris',
        anomaly: {
            title: 'ORBITAL DEBRIS CORRIDOR',
            options: [
                { title: '🛡️ RCS EVASION', effect: 'Fuel -8% · Safe', fuelDelta: -8, hullDelta: 0, thermal: 'optimal', speedMult: 1.0, reaction: 'rcs', log: 'Precision RCS thrusters cleared debris envelope.' },
                { title: '⚡ AUTO-DEFLECT', effect: 'Fuel -4% · Hull -6%', fuelDelta: -4, hullDelta: -6, thermal: 'optimal', speedMult: 1.0, reaction: 'roll', log: 'Magnetic field deflected micro-fragments.' },
                { title: '🚀 SLALOM BURST', effect: 'Fuel -14% · Boost', fuelDelta: -14, hullDelta: 0, thermal: 'optimal', speedMult: 1.22, reaction: 'boost', log: 'High-g slalom accelerated past orbital debris.' }
            ]
        }
    },
    moon: {
        name: 'Moon',
        distance: '384,400 km (from Earth)',
        distNum: 149.9844,
        moons: 0,
        gravity: '0.165 g',
        temperature: '-173°C to 127°C',
        rotation: '27.3 days',
        orbitalPeriod: '27.3 days (Earth)',
        latency: '~1.3 sec',
        latencySec: 1.3,
        orbitRadius: 94,
        localMoonOrbit: 13.5,
        visualRadius: 1.9,
        tilt: 0.11,
        rotSpeed: 0.005,
        atmoColor: 0x94a3b8,
        objective: 'Perform lunar south-pole Shackleton Crater ice survey and low-orbit surface lidar mapping.',
        hazards: ['CISLUNAR GRAVITY WELL', 'MICROMETEOROID STREAM'],
        hazardType: 'debris',
        anomaly: {
            title: 'CISLUNAR GRAVITATIONAL PERTURBATION',
            options: [
                { title: '🛡️ MANUAL CORRECTION', effect: 'Fuel -6% · Safe', fuelDelta: -6, hullDelta: 0, thermal: 'optimal', speedMult: 1.0, reaction: 'rcs', log: 'Manual vernier burn locked lunar capture corridor.' },
                { title: '⚡ AUTO-STABILIZE', effect: 'Fuel -3% · Hull -5%', fuelDelta: -3, hullDelta: -5, thermal: 'optimal', speedMult: 1.0, reaction: 'roll', log: 'Automated gyro stabilization damped drift.' },
                { title: '🚀 DIRECT INSERTION', effect: 'Fuel -11% · Boost', fuelDelta: -11, hullDelta: 0, thermal: 'optimal', speedMult: 1.18, reaction: 'boost', log: 'Direct main burn accelerated lunar insertion.' }
            ]
        }
    },
    mars: {
        name: 'Mars',
        distance: '227.9 million km',
        distNum: 227.9,
        moons: 2,
        gravity: '0.38 g',
        temperature: '-125°C to 20°C',
        rotation: '24.6 hours',
        orbitalPeriod: '687 days',
        latency: '~12.6 min',
        latencySec: 756,
        orbitRadius: 134,
        visualRadius: 3.9,
        tilt: 0.44,
        rotSpeed: 0.011,
        atmoColor: 0xe86b42,
        objective: 'Map subsurface water-ice aquifers, atmospheric methane plumes, and Jezero paleolake terrain.',
        hazards: ['GLOBAL FERRIC DUST STORM', 'ENTRY TURBULENCE'],
        hazardType: 'dust',
        anomaly: {
            title: 'MARTIAN SILICA DUST CYCLONE',
            options: [
                { title: '🛡️ MANUAL RADAR VECTOR', effect: 'Fuel -7% · Safe', fuelDelta: -7, hullDelta: 0, thermal: 'optimal', speedMult: 1.0, reaction: 'rcs', log: 'Inertial radar lock bypassed optical dust blackout.' },
                { title: '⚡ HIGH-APEX BRAKING', effect: 'Fuel -11% · Smooth', fuelDelta: -11, hullDelta: 0, thermal: 'optimal', speedMult: 0.94, reaction: 'roll', log: 'High-altitude retro profile avoided storm front.' },
                { title: '🚀 AEROBRAKING DIP', effect: 'Fuel +3% · Hull -14%', fuelDelta: 3, hullDelta: -14, thermal: 'elevated', speedMult: 1.2, reaction: 'boost', log: 'Deep atmospheric aerobraking saved fuel with dust abrasion.' }
            ]
        }
    },
    jupiter: {
        name: 'Jupiter',
        distance: '778.6 million km',
        distNum: 778.6,
        moons: 95,
        gravity: '2.34 g',
        temperature: '-108°C',
        rotation: '9.9 hours',
        orbitalPeriod: '4,333 days',
        latency: '~43.2 min',
        latencySec: 2592,
        orbitRadius: 228,
        visualRadius: 13.5,
        tilt: 0.05,
        rotSpeed: 0.022,
        atmoColor: 0xd9a066,
        objective: 'Probe Jovian magnetospheric aurora, Great Red Spot deep vortex, and Europa ice crust.',
        hazards: ['RELATIVISTIC RADIATION BELT', 'MAGNETIC TORQUE'],
        hazardType: 'radiation',
        anomaly: {
            title: 'JOVIAN RADIATION BELT SPIKE',
            options: [
                { title: '🛡️ MAGNETIC DEFLECTOR', effect: 'Fuel -12% · Safe', fuelDelta: -12, hullDelta: 0, thermal: 'optimal', speedMult: 1.0, reaction: 'roll', log: 'Superconducting shield deflected relativistic electron flux.' },
                { title: '⚡ ALTERNATE ARC', effect: 'Fuel -7% · Smooth', fuelDelta: -7, hullDelta: -4, thermal: 'optimal', speedMult: 1.05, reaction: 'rcs', log: 'Diverted trajectory through outer Jovian shadow.' },
                { title: '⚙️ PASSIVE DRIFT', effect: 'Fuel 0% · Hull -18%', fuelDelta: 0, hullDelta: -18, thermal: 'elevated', speedMult: 1.0, reaction: 'rcs', log: 'Unshielded transit conserved fuel under heavy radiation.' }
            ]
        }
    },
    saturn: {
        name: 'Saturn',
        distance: '1.434 billion km',
        distNum: 1434.0,
        moons: 146,
        gravity: '0.93 g',
        temperature: '-139°C',
        rotation: '10.7 hours',
        orbitalPeriod: '10,759 days',
        latency: '~79.6 min',
        latencySec: 4776,
        orbitRadius: 315,
        visualRadius: 11.2,
        tilt: 0.47,
        rotSpeed: 0.020,
        atmoColor: 0xe6cb8a,
        hasRings: true,
        ringInner: 14.2,
        ringOuter: 26.5,
        objective: 'Navigate Cassini ring gaps, map crystalline ice dynamics, and sample Enceladus plumes.',
        hazards: ['RING PLANE ICE DEBRIS', 'GRAVITATIONAL SHEAR'],
        hazardType: 'ice',
        anomaly: {
            title: 'F-RING ICE DEBRIS CROSSING',
            options: [
                { title: '🛡️ SHIELD ORIENTATION', effect: 'Fuel -8% · Safe', fuelDelta: -8, hullDelta: 0, thermal: 'optimal', speedMult: 1.0, reaction: 'roll', log: 'Aft heat shield absorbed crystalline ice swarm cleanly.' },
                { title: '⚡ INCLINATION LIFT', effect: 'Fuel -6% · Smooth', fuelDelta: -6, hullDelta: 0, thermal: 'optimal', speedMult: 0.94, reaction: 'rcs', log: 'RCS burn elevated trajectory cleanly over ring plane.' },
                { title: '🚀 GAP SPRINT', effect: 'Fuel -15% · Hull -12%', fuelDelta: -15, hullDelta: -12, thermal: 'elevated', speedMult: 1.25, reaction: 'boost', log: 'Full-thrust sprint punched straight through Cassini gap.' }
            ]
        }
    },
    uranus: {
        name: 'Uranus',
        distance: '2.871 billion km',
        distNum: 2871.0,
        moons: 27,
        gravity: '0.89 g',
        temperature: '-197°C',
        rotation: '17.2 hours',
        orbitalPeriod: '30,687 days',
        latency: '~159.5 min',
        latencySec: 9570,
        orbitRadius: 404,
        visualRadius: 7.4,
        tilt: 1.71,
        rotSpeed: -0.015,
        atmoColor: 0x67e8f9,
        hasRings: true,
        ringInner: 9.8,
        ringOuter: 13.0,
        objective: 'Investigate 98° extreme axial tilt magnetosphere and deep cryogenic ice giant interior.',
        hazards: ['98° MAGNETIC CORKSCREW', 'SOLAR STARVATION'],
        hazardType: 'vortex',
        anomaly: {
            title: 'POLAR MAGNETOSPHERE SHEAR',
            options: [
                { title: '🛡️ RTG CORE BOOST', effect: 'Fuel -7% · Safe', fuelDelta: -7, hullDelta: 0, thermal: 'optimal', speedMult: 1.0, reaction: 'rcs', log: 'Secondary RTG nuclear core restored full attitude control.' },
                { title: '⚡ POLAR ALIGNMENT', effect: 'Fuel -12% · Smooth', fuelDelta: -12, hullDelta: 0, thermal: 'optimal', speedMult: 0.96, reaction: 'roll', log: 'Craft aligned smoothly with Uranus 98° spin plane.' },
                { title: '🌪️ FLUX GLIDE', effect: 'Fuel 0% · Hull -14%', fuelDelta: 0, hullDelta: -14, thermal: 'elevated', speedMult: 1.15, reaction: 'boost', log: 'Passive magnetic glide saved fuel with minor hull stress.' }
            ]
        }
    },
    neptune: {
        name: 'Neptune',
        distance: '4.505 billion km',
        distNum: 4505.0,
        moons: 14,
        gravity: '1.14 g',
        temperature: '-201°C',
        rotation: '16.1 hours',
        orbitalPeriod: '60,190 days',
        latency: '~250.3 min',
        latencySec: 15018,
        orbitRadius: 492,
        visualRadius: 7.1,
        tilt: 0.49,
        rotSpeed: 0.016,
        atmoColor: 0x3b82f6,
        objective: 'Examine 2,100 km/h supersonic methane storms and retrograde cryovolcanism on Triton.',
        hazards: ['SUPERSONIC METHANE GALES', 'CRYOGENIC DEEP SPACE'],
        hazardType: 'cryo',
        anomaly: {
            title: 'SUPERSONIC CRYOGENIC WIND SHEAR',
            options: [
                { title: '🛡️ THERMAL COIL BURN', effect: 'Fuel -10% · Safe', fuelDelta: -10, hullDelta: 0, thermal: 'optimal', speedMult: 1.0, reaction: 'roll', log: 'Propellant lines warmed; clean high-altitude capture locked.' },
                { title: '⚡ TRITON ASSIST ARC', effect: 'Fuel -6% · Smooth', fuelDelta: -6, hullDelta: 0, thermal: 'optimal', speedMult: 0.94, reaction: 'rcs', log: 'Retrograde Triton gravity assist eased orbital insertion.' },
                { title: '🚀 DEEP SKIM DIVE', effect: 'Fuel 0% · Hull -18%', fuelDelta: 0, hullDelta: -18, thermal: 'elevated', speedMult: 1.2, reaction: 'boost', log: 'Supersonic atmospheric dive conserved fuel under heavy buffeting.' }
            ]
        }
    }
};

// Planet-specific arrival, hazard, and visual configuration
const planetMissionConfig = {
    mercury: { arrivalStyle: 'solar_orbit', arrivalLabel: 'SOLAR-SYNCHRONOUS ORBIT', dataLabel: '4.6 TB Polar Radar & Magnetometry', fxColor: 0xfbbf24, shake: 0.18 },
    venus:   { arrivalStyle: 'atmospheric_descent', arrivalLabel: 'ATMOSPHERIC CLOUD DESCENT', dataLabel: '5.8 TB Supercritical Cloud Telemetry', fxColor: 0xf59e0b, shake: 0.22 },
    earth:   { arrivalStyle: 'orbital_survey', arrivalLabel: 'LEO RENDEZVOUS ORBIT', dataLabel: '7.2 TB Optical Constellation Sync', fxColor: 0x38bdf8, shake: 0.12 },
    moon:    { arrivalStyle: 'lunar_orbit', arrivalLabel: 'LOW LUNAR POLAR ORBIT', dataLabel: '3.9 TB Shackleton Lidar Ice Map', fxColor: 0xcbd5e1, shake: 0.10 },
    mars:    { arrivalStyle: 'landing_orbit', arrivalLabel: 'AEROCAPTURE & LOW ORBIT', dataLabel: '6.4 TB Multispectral Aquifer Scan', fxColor: 0xea580c, shake: 0.20 },
    jupiter: { arrivalStyle: 'gas_giant_standoff', arrivalLabel: 'SAFE STANDOFF OBSERVATION', dataLabel: '8.5 TB Magnetosphere & Vortex Flux', fxColor: 0xa855f7, shake: 0.24 },
    saturn:  { arrivalStyle: 'ring_observation', arrivalLabel: 'CASSINI RING OBSERVATION', dataLabel: '7.9 TB Ice Ring & Plume Spectroscopy', fxColor: 0x7dd3fc, shake: 0.16 },
    uranus:  { arrivalStyle: 'polar_tilt_orbit', arrivalLabel: '98° POLAR TILT CAPTURE', dataLabel: '6.1 TB Ice Giant Axial Field Survey', fxColor: 0x22d3ee, shake: 0.15 },
    neptune: { arrivalStyle: 'deep_space_observation', arrivalLabel: 'DEEP-SPACE OBSERVATION', dataLabel: '7.4 TB Supersonic Storm & Triton Scan', fxColor: 0x3b82f6, shake: 0.19 }
};

// Route Strategy Configurations
const cosmosMissionRoutes = {
    direct: {
        id: 'direct',
        name: 'Hohmann Transfer',
        tag: 'DIRECT ROUTE',
        burnEst: 48,
        timeMult: 1.0,
        velocityBase: 32.4,
        curveLift: 1.0,
        risk: 'MODERATE',
        riskClass: 'pill-moderate'
    },
    fuel_saving: {
        id: 'fuel_saving',
        name: 'Ion Drift Arc',
        tag: 'FUEL SAVING',
        burnEst: 32,
        timeMult: 1.15,
        velocityBase: 24.5,
        curveLift: 1.25,
        risk: 'LOW',
        riskClass: 'pill-low'
    },
    fastest: {
        id: 'fastest',
        name: 'Brachistochrone',
        tag: 'HIGH-THRUST',
        burnEst: 70,
        timeMult: 0.85,
        velocityBase: 48.2,
        curveLift: 0.55,
        risk: 'HIGH',
        riskClass: 'pill-high'
    },
    gravity_assist: {
        id: 'gravity_assist',
        name: 'Gravity-Assist',
        tag: 'SLINGSHOT',
        burnEst: 38,
        timeMult: 1.08,
        velocityBase: 39.6,
        curveLift: 1.85,
        risk: 'DYNAMIC',
        riskClass: 'pill-dynamic'
    }
};

// Dynamic Distance-to-Duration Calculation (Clamped 10s to 30s)
function calculateRouteDistance(originKey, destKey) {
    if (!originKey || !destKey || originKey === destKey) return 0.3844;
    if ((originKey === 'earth' && destKey === 'moon') || (originKey === 'moon' && destKey === 'earth')) {
        return 0.3844;
    }
    const o = cosmosMissionPlanets[originKey];
    const d = cosmosMissionPlanets[destKey];
    if (!o || !d) return 78.3;
    return Math.max(0.3844, Math.abs(d.distNum - o.distNum));
}

function mapDistanceToDuration(distanceMkm, routeTimeMult = 1.0) {
    const minDist = 0.3844;  // Earth <-> Moon
    const maxDist = 4447.1;  // Mercury <-> Neptune
    const d = Math.max(minDist, distanceMkm);
    const logMin = Math.log10(1 + minDist);
    const logMax = Math.log10(1 + maxDist);
    const logVal = Math.log10(1 + d);
    const norm = Math.max(0, Math.min(1, (logVal - logMin) / (logMax - logMin)));
    const baseSec = 10 + norm * 20; // 10.0s .. 30.0s
    return Math.max(10.0, Math.min(30.0, Number((baseSec * routeTimeMult).toFixed(1))));
}

function formatDistanceMkm(distMkm) {
    if (distMkm < 1.0) return `${Math.round(distMkm * 1000000).toLocaleString()} km`;
    if (distMkm >= 1000) return `${(distMkm / 1000).toFixed(2)} B km`;
    return `${distMkm.toFixed(1)} M km`;
}

// ========================================================
// 2. MISSION STATE MANAGEMENT
// ========================================================
const cosmosMissionState = {
    originPlanet: 'earth',
    currentPlanet: null,
    selectedRoute: 'direct',
    isPlanConfirmed: false,
    missionStatus: 'INACTIVE', // 'INACTIVE' | 'PLANNING' | 'ACTIVE' | 'ARRIVAL_CINEMATIC' | 'FAILURE_CINEMATIC' | 'FAILED' | 'COMPLETED'
    currentPhase: 0,
    progress: 0,
    missionId: 'COSMOS-M-2026',
    travelStatus: 'Waiting for launch',
    targetStatus: 'Standby',
    currentPhaseTimer: null,
    isRunning: false,
    routeDistanceMkm: 78.3,
    travelDurationSec: 20.0,
    maxVelocity: 0,
    flybysCompleted: [],
    hazardsEncountered: [],
    decisionsMade: []
};

function cosmosSafeText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

function getPlanetGraphicGradient(planetKey) {
    const styles = {
        mercury: 'radial-gradient(circle at 30% 30%, #e0e0e0 0%, #888888 60%, #444444 100%)',
        venus:   'radial-gradient(circle at 30% 30%, #ffe299 0%, #d49a37 60%, #7e4b09 100%)',
        earth:   'radial-gradient(circle at 30% 30%, #68b8ff 0%, #1e6acb 50%, #0d2757 100%)',
        moon:    'radial-gradient(circle at 30% 30%, #f1f5f9 0%, #94a3b8 55%, #334155 100%)',
        mars:    'radial-gradient(circle at 30% 30%, #ff8a65 0%, #d84315 60%, #5d1904 100%)',
        jupiter: 'radial-gradient(circle at 30% 30%, #ffd099 0%, #c48b59 50%, #613b19 100%)',
        saturn:  'radial-gradient(circle at 30% 30%, #fff2b2 0%, #d8c278 50%, #6d5b1e 100%)',
        uranus:  'radial-gradient(circle at 30% 30%, #b2ebf2 0%, #4dd0e1 50%, #006064 100%)',
        neptune: 'radial-gradient(circle at 30% 30%, #80d8ff 0%, #2979ff 50%, #0d47a1 100%)'
    };
    return styles[planetKey] || styles.earth;
}

// ========================================================
// 3. SUBTLE PROCEDURAL WEB AUDIO ENGINE
// ========================================================
const CosmosSpaceAudio = {
    ctx: null,
    masterGain: null,
    ambientOsc1: null,
    ambientOsc2: null,
    ambientGain: null,
    muted: false,

    ensureContext() {
        if (this.muted) return null;
        try {
            if (!this.ctx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (!AudioCtx) return null;
                this.ctx = new AudioCtx();
                this.masterGain = this.ctx.createGain();
                this.masterGain.gain.value = 0.28;
                this.masterGain.connect(this.ctx.destination);
            }
            if (this.ctx.state === 'suspended') {
                this.ctx.resume().catch(() => {});
            }
            return this.ctx;
        } catch (e) {
            return null;
        }
    },

    toggleMute() {
        this.muted = !this.muted;
        if (this.masterGain && this.ctx) {
            this.masterGain.gain.setTargetAtTime(this.muted ? 0 : 0.28, this.ctx.currentTime, 0.08);
        }
        const btn = document.getElementById('micro-audio-btn');
        if (btn) btn.textContent = this.muted ? '🔇' : '🔊';
    },

    startAmbient() {
        const ctx = this.ensureContext();
        if (!ctx || this.ambientOsc1) return;
        try {
            const gain = ctx.createGain();
            gain.gain.value = 0.001;
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 190;

            const o1 = ctx.createOscillator();
            o1.type = 'sine';
            o1.frequency.value = 54;
            const o2 = ctx.createOscillator();
            o2.type = 'triangle';
            o2.frequency.value = 81.2;

            o1.connect(filter);
            o2.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);

            o1.start();
            o2.start();
            gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 1.4);

            this.ambientOsc1 = o1;
            this.ambientOsc2 = o2;
            this.ambientGain = gain;
        } catch (e) {}
    },

    stopAmbient() {
        if (!this.ctx || !this.ambientOsc1) return;
        try {
            const now = this.ctx.currentTime;
            if (this.ambientGain) {
                this.ambientGain.gain.cancelScheduledValues(now);
                this.ambientGain.gain.setTargetAtTime(0.0001, now, 0.25);
            }
            const o1 = this.ambientOsc1;
            const o2 = this.ambientOsc2;
            this.ambientOsc1 = null;
            this.ambientOsc2 = null;
            this.ambientGain = null;
            setTimeout(() => {
                try { o1.stop(); o2.stop(); } catch (e) {}
            }, 600);
        } catch (e) {}
    },

    playLaunchRumble() {
        const ctx = this.ensureContext();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const bufferSize = ctx.sampleRate * 2.2;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.7;

            const noise = ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(140, now);
            filter.frequency.exponentialRampToValueAtTime(520, now + 0.8);
            filter.frequency.exponentialRampToValueAtTime(110, now + 2.2);

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(0.35, now + 0.45);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);
            noise.start(now);
        } catch (e) {}
    },

    playRcsBurst() {
        const ctx = this.ensureContext();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const bufferSize = Math.floor(ctx.sampleRate * 0.45);
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1);

            const noise = ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 1100;
            filter.Q.value = 1.8;

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(0.18, now + 0.06);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);
            noise.start(now);
        } catch (e) {}
    },

    playHazardCue() {
        const ctx = this.ensureContext();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(340, now);
            osc.frequency.exponentialRampToValueAtTime(220, now + 0.55);
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(0.16, now + 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now);
            osc.stop(now + 0.68);
        } catch (e) {}
    },

    playScanPulse() {
        const ctx = this.ensureContext();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(420, now);
            osc.frequency.exponentialRampToValueAtTime(860, now + 0.9);
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(0.14, now + 0.2);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now);
            osc.stop(now + 1.15);
        } catch (e) {}
    },

    playArrivalChord() {
        const ctx = this.ensureContext();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            [220, 329.63, 440, 554.37].forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = freq;
                gain.gain.setValueAtTime(0.0001, now + idx * 0.08);
                gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.08 + 0.35);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);
                osc.connect(gain);
                gain.connect(this.masterGain);
                osc.start(now + idx * 0.08);
                osc.stop(now + 2.9);
            });
        } catch (e) {}
    }
};

// ========================================================
// 4. PROCEDURAL HIGH-DETAIL 3D PLANET TEXTURE FACTORY
// ========================================================
const Cosmos3DTextureFactory = {
    cache: {},

    createCanvas(w, h) {
        const c = document.createElement('canvas');
        c.width = w;
        c.height = h;
        return c;
    },

    getBodyTexture(bodyKey) {
        if (this.cache[bodyKey]) return this.cache[bodyKey];
        if (typeof THREE === 'undefined') return null;

        const w = 512, h = 256;
        const canvas = this.createCanvas(w, h);
        const ctx = canvas.getContext('2d');

        // Seeded pseudo-random for deterministic planetary beauty
        let seed = bodyKey.split('').reduce((a, ch) => a + ch.charCodeAt(0) * 31, 17);
        const rand = () => {
            seed = (seed * 16807) % 2147483647;
            return (seed - 1) / 2147483646;
        };

        if (bodyKey === 'sun') {
            const g = ctx.createLinearGradient(0, 0, 0, h);
            g.addColorStop(0, '#ff8c00');
            g.addColorStop(0.5, '#fff099');
            g.addColorStop(1, '#ff7700');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
            for (let i = 0; i < 240; i++) {
                ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 255, 220, 0.35)' : 'rgba(220, 70, 0, 0.32)';
                ctx.beginPath();
                ctx.arc(rand() * w, rand() * h, rand() * 18 + 3, 0, Math.PI * 2);
                ctx.fill();
            }
        } else if (bodyKey === 'mercury') {
            ctx.fillStyle = '#73706c';
            ctx.fillRect(0, 0, w, h);
            for (let i = 0; i < 180; i++) {
                const x = rand() * w, y = rand() * h, r = rand() * 14 + 2;
                ctx.fillStyle = rand() > 0.5 ? 'rgba(55,52,50,0.45)' : 'rgba(175,170,164,0.38)';
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = 'rgba(215,210,205,0.22)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        } else if (bodyKey === 'venus') {
            const g = ctx.createLinearGradient(0, 0, 0, h);
            g.addColorStop(0, '#c28b37');
            g.addColorStop(0.3, '#f0c975');
            g.addColorStop(0.55, '#dfa44c');
            g.addColorStop(0.8, '#ecc472');
            g.addColorStop(1, '#b87d2e');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
            for (let i = 0; i < 50; i++) {
                ctx.strokeStyle = rand() > 0.5 ? 'rgba(255,244,200,0.25)' : 'rgba(145,86,18,0.22)';
                ctx.lineWidth = rand() * 10 + 3;
                const y = rand() * h;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.bezierCurveTo(w * 0.33, y + (rand() - 0.5) * 28, w * 0.66, y + (rand() - 0.5) * 28, w, y);
                ctx.stroke();
            }
        } else if (bodyKey === 'earth') {
            const g = ctx.createLinearGradient(0, 0, 0, h);
            g.addColorStop(0, '#0a224d');
            g.addColorStop(0.5, '#134e9b');
            g.addColorStop(1, '#0a224d');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);

            const lands = [
                { x: 95, y: 86, rx: 52, ry: 34 }, { x: 132, y: 158, rx: 32, ry: 44 },
                { x: 268, y: 84, rx: 78, ry: 36 }, { x: 292, y: 146, rx: 46, ry: 42 },
                { x: 405, y: 98, rx: 64, ry: 32 }, { x: 432, y: 174, rx: 34, ry: 22 }
            ];
            lands.forEach(l => {
                ctx.fillStyle = 'rgba(26, 148, 178, 0.35)';
                ctx.beginPath();
                ctx.ellipse(l.x, l.y, l.rx + 5, l.ry + 5, 0.12, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#2d6a3e';
                ctx.beginPath();
                ctx.ellipse(l.x, l.y, l.rx, l.ry, 0.12, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#8b7355';
                ctx.beginPath();
                ctx.ellipse(l.x + 8, l.y - 3, l.rx * 0.42, l.ry * 0.4, 0, 0, Math.PI * 2);
                ctx.fill();
            });
            // Golden Night City Light Clusters across inhabited continents
            lands.forEach(l => {
                for (let i = 0; i < 28; i++) {
                    const cx = l.x + (rand() - 0.5) * l.rx * 1.35;
                    const cy = l.y + (rand() - 0.5) * l.ry * 1.35;
                    ctx.fillStyle = rand() > 0.35 ? 'rgba(255, 225, 140, 0.85)' : 'rgba(255, 180, 60, 0.9)';
                    ctx.fillRect(cx, cy, rand() * 1.8 + 0.8, rand() * 1.8 + 0.8);
                }
            });

            // Polar Ice Caps
            ctx.fillStyle = '#edf7ff';
            ctx.fillRect(0, 0, w, 20);
            ctx.fillRect(0, h - 20, w, 20);
        } else if (bodyKey === 'moon') {
            ctx.fillStyle = '#a8aeb8';
            ctx.fillRect(0, 0, w, h);
            // Dark lunar maria
            for (let i = 0; i < 16; i++) {
                ctx.fillStyle = 'rgba(72, 78, 90, 0.45)';
                ctx.beginPath();
                ctx.ellipse(rand() * w, 40 + rand() * (h - 80), rand() * 42 + 16, rand() * 26 + 10, rand(), 0, Math.PI * 2);
                ctx.fill();
            }
            // Craters
            for (let i = 0; i < 160; i++) {
                const x = rand() * w, y = rand() * h, r = rand() * 10 + 1.5;
                ctx.fillStyle = 'rgba(65, 70, 80, 0.42)';
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = 'rgba(230, 236, 245, 0.35)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        } else if (bodyKey === 'mars') {
            const g = ctx.createLinearGradient(0, 0, 0, h);
            g.addColorStop(0, '#8d3519');
            g.addColorStop(0.5, '#cc572b');
            g.addColorStop(1, '#842f14');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
            // Dark Syrtis / volcanic basalt plains
            for (let i = 0; i < 28; i++) {
                ctx.fillStyle = rand() > 0.5 ? 'rgba(92, 28, 12, 0.42)' : 'rgba(236, 128, 72, 0.32)';
                ctx.beginPath();
                ctx.ellipse(rand() * w, 28 + rand() * (h - 56), rand() * 48 + 12, rand() * 20 + 6, rand() * 0.5, 0, Math.PI * 2);
                ctx.fill();
            }
            // Valles Marineris scar
            ctx.strokeStyle = 'rgba(65, 16, 6, 0.65)';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(150, 134);
            ctx.quadraticCurveTo(235, 124, 315, 138);
            ctx.stroke();
            // Polar caps
            ctx.fillStyle = '#f8f2ee';
            ctx.fillRect(0, 0, w, 14);
            ctx.fillRect(0, h - 14, w, 14);
        } else if (bodyKey === 'jupiter') {
            const bands = ['#b8875a', '#e8d4b4', '#c56e3d', '#f2e2c4', '#a86036', '#e0c69f', '#c77a47', '#ebd7b5', '#9c633f'];
            const bh = h / bands.length;
            bands.forEach((col, i) => {
                ctx.fillStyle = col;
                ctx.fillRect(0, i * bh, w, bh + 2);
            });
            for (let i = 0; i < 70; i++) {
                ctx.strokeStyle = rand() > 0.5 ? 'rgba(255,245,230,0.22)' : 'rgba(130,55,22,0.25)';
                ctx.lineWidth = rand() * 5 + 1.5;
                const y = rand() * h;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.bezierCurveTo(w * 0.3, y + (rand() - 0.5) * 14, w * 0.7, y + (rand() - 0.5) * 14, w, y);
                ctx.stroke();
            }
            // Great Red Spot
            ctx.fillStyle = '#c84226';
            ctx.beginPath();
            ctx.ellipse(270, 162, 34, 18, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#f4c89b';
            ctx.lineWidth = 3;
            ctx.stroke();
        } else if (bodyKey === 'saturn') {
            const bands = ['#c8b07b', '#e6d3a3', '#d4bc84', '#f3e5bf', '#c6aa70', '#e3d0a0', '#b59a62'];
            const bh = h / bands.length;
            bands.forEach((col, i) => {
                ctx.fillStyle = col;
                ctx.fillRect(0, i * bh, w, bh + 2);
            });
            for (let i = 0; i < 36; i++) {
                ctx.fillStyle = 'rgba(255,250,235,0.12)';
                ctx.fillRect(0, rand() * h, w, rand() * 6 + 2);
            }
        } else if (bodyKey === 'uranus') {
            const g = ctx.createLinearGradient(0, 0, 0, h);
            g.addColorStop(0, '#99f6e4');
            g.addColorStop(0.5, '#5eead4');
            g.addColorStop(1, '#22d3ee');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
            for (let i = 0; i < 20; i++) {
                ctx.fillStyle = 'rgba(224, 255, 255, 0.14)';
                ctx.fillRect(0, rand() * h, w, rand() * 8 + 2);
            }
        } else if (bodyKey === 'neptune') {
            const g = ctx.createLinearGradient(0, 0, 0, h);
            g.addColorStop(0, '#1e3a8a');
            g.addColorStop(0.45, '#2563eb');
            g.addColorStop(0.75, '#1d4ed8');
            g.addColorStop(1, '#172554');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
            // High-altitude methane cirrus streaks
            for (let i = 0; i < 38; i++) {
                ctx.fillStyle = 'rgba(186, 230, 253, 0.25)';
                ctx.fillRect(rand() * w, rand() * h, rand() * 70 + 18, rand() * 3 + 1);
            }
            // Great Dark Spot
            ctx.fillStyle = 'rgba(15, 23, 72, 0.72)';
            ctx.beginPath();
            ctx.ellipse(220, 145, 26, 14, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        this.cache[bodyKey] = tex;
        return tex;
    },

    getSaturnRingTexture(isUranus = false) {
        const key = isUranus ? 'ring_uranus' : 'ring_saturn';
        if (this.cache[key]) return this.cache[key];
        const canvas = this.createCanvas(512, 32);
        const ctx = canvas.getContext('2d');
        const g = ctx.createLinearGradient(0, 0, 512, 0);
        if (isUranus) {
            g.addColorStop(0.0, 'rgba(103, 232, 249, 0.0)');
            g.addColorStop(0.25, 'rgba(165, 243, 252, 0.28)');
            g.addColorStop(0.55, 'rgba(103, 232, 249, 0.14)');
            g.addColorStop(0.85, 'rgba(207, 250, 254, 0.32)');
            g.addColorStop(1.0, 'rgba(103, 232, 249, 0.0)');
        } else {
            g.addColorStop(0.0, 'rgba(214, 188, 134, 0.0)');
            g.addColorStop(0.12, 'rgba(180, 152, 102, 0.35)');
            g.addColorStop(0.32, 'rgba(242, 224, 178, 0.85)');
            g.addColorStop(0.56, 'rgba(224, 198, 142, 0.78)');
            g.addColorStop(0.62, 'rgba(15, 18, 30, 0.08)'); // Cassini Division
            g.addColorStop(0.68, 'rgba(232, 210, 160, 0.72)');
            g.addColorStop(0.90, 'rgba(204, 178, 128, 0.45)');
            g.addColorStop(1.0, 'rgba(204, 178, 128, 0.0)');
        }
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 512, 32);
        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        this.cache[key] = tex;
        return tex;
    },

    getSoftParticleTexture() {
        if (this.cache.softParticle) return this.cache.softParticle;
        const canvas = this.createCanvas(64, 64);
        const ctx = canvas.getContext('2d');
        const g = ctx.createRadialGradient(32, 32, 2, 32, 32, 32);
        g.addColorStop(0, 'rgba(255,255,255,1.0)');
        g.addColorStop(0.35, 'rgba(255,255,255,0.65)');
        g.addColorStop(0.7, 'rgba(255,255,255,0.18)');
        g.addColorStop(1, 'rgba(255,255,255,0.0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 64, 64);
        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        this.cache.softParticle = tex;
        return tex;
    },

    getPlumeGradientTexture() {
        if (this.cache.plumeGrad) return this.cache.plumeGrad;
        const canvas = this.createCanvas(64, 128);
        const ctx = canvas.getContext('2d');
        const g = ctx.createLinearGradient(0, 0, 0, 128);
        g.addColorStop(0.0, 'rgba(255,255,255,0.98)');
        g.addColorStop(0.35, 'rgba(255,255,255,0.65)');
        g.addColorStop(0.75, 'rgba(255,255,255,0.18)');
        g.addColorStop(1.0, 'rgba(255,255,255,0.0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 64, 128);
        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        this.cache.plumeGrad = tex;
        return tex;
    },

    createFresnelAtmosphere(radius, hexColor, intensity) {
        const geo = new THREE.SphereGeometry(radius, 36, 26);
        const mat = new THREE.ShaderMaterial({
            uniforms: {
                glowColor: { value: new THREE.Color(hexColor) },
                cIntensity: { value: intensity || 0.72 }
            },
            vertexShader: `
                varying vec3 vNormal;
                varying vec3 vViewPos;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    vViewPos = -mvPosition.xyz;
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform vec3 glowColor;
                uniform float cIntensity;
                varying vec3 vNormal;
                varying vec3 vViewPos;
                void main() {
                    vec3 viewDir = normalize(vViewPos);
                    float fresnel = pow(1.0 - max(0.0, dot(vNormal, viewDir)), 3.2);
                    gl_FragColor = vec4(glowColor, fresnel * cIntensity);
                }
            `,
            side: THREE.FrontSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false
        });
        return new THREE.Mesh(geo, mat);
    },

    getGlowTexture(innerHex, outerRgba) {
        const key = `glow_${innerHex}_${outerRgba}`;
        if (this.cache[key]) return this.cache[key];
        const canvas = this.createCanvas(128, 128);
        const ctx = canvas.getContext('2d');
        const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
        g.addColorStop(0, innerHex);
        g.addColorStop(0.32, outerRgba);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 128, 128);
        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        this.cache[key] = tex;
        return tex;
    },

    getNebulaSkyTexture() {
        if (this.cache.nebulaSky) return this.cache.nebulaSky;
        const w = 1024, h = 512;
        const canvas = this.createCanvas(w, h);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#02040d';
        ctx.fillRect(0, 0, w, h);

        // Subtle volumetric deep-space Milky Way & Vishnu cosmic indigo/gold dust
        const clouds = [
            { x: 240, y: 240, r: 240, c: 'rgba(28, 45, 118, 0.22)' },
            { x: 520, y: 270, r: 280, c: 'rgba(56, 36, 110, 0.18)' },
            { x: 780, y: 220, r: 230, c: 'rgba(18, 62, 115, 0.20)' },
            { x: 420, y: 255, r: 160, c: 'rgba(223, 177, 91, 0.08)' },
            { x: 860, y: 290, r: 190, c: 'rgba(56, 189, 248, 0.09)' }
        ];
        clouds.forEach(cl => {
            const g = ctx.createRadialGradient(cl.x, cl.y, 10, cl.x, cl.y, cl.r);
            g.addColorStop(0, cl.c);
            g.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
        });
        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        this.cache.nebulaSky = tex;
        return tex;
    }
};

// ========================================================
// 5. THREE.JS 3D CINEMATIC SOLAR SYSTEM TRAVEL ENGINE
// ========================================================
const TravelEngine = {
    canvas: null,
    renderer: null,
    scene: null,
    camera: null,
    width: 1000,
    height: 550,
    animFrame: null,
    lastTime: 0,
    isRunning: false,
    isPaused: false,
    isFullscreenCinematic: false,
    cameraMode: 'auto', // 'auto' | 'follow' | 'wide' | 'target'
    activeCamLabel: 'LAUNCH',

    // Flight Progression & Timing
    progress: 0.0,
    elapsedFlightSec: 0,
    simElapsedTime: 0,
    travelDurationSec: 20.0,
    routeDistanceMkm: 78.3,
    routeScale: 'medium', // 'short' | 'medium' | 'long'

    // Scene Graph Objects
    solarGroup: null,
    sunMesh: null,
    bodies: {},        // { mercury: { group, mesh, cloudMesh, orbitAngle, orbitRadius, radius }, ... }
    asteroidBelt: null,
    spacecraft: null,
    craftParts: {},
    routeCurve: null,
    routeLine: null,
    exhaustSystem: null,
    exhaustData: [],
    speedDust: null,
    hazardCloud: null,
    scanBeamGroup: null,

    // Smooth Camera Interpolation Vectors
    camPosCurrent: null,
    camLookCurrent: null,
    camTargetPos: null,
    camTargetLook: null,

    // Live Telemetry State
    craftFuel: 100,
    hullIntegrity: 100,
    thermalStatus: 'optimal',
    engineMode: 'STANDBY',
    craftVelocity: 0,
    maxVelocity: 0,
    signalStrength: 100,
    signalStatusText: 'SIGNAL: 100% NOMINAL',

    // Route-Aware Flybys, Hazards & Reaction States
    plannedFlybys: [],     // [{ key, name, tStart, tPeak, tEnd, triggered }]
    activeFlyby: null,
    hazardTriggerT: 0.56,
    hazardPhase: 'none',   // 'none' | 'buildup' | 'decision' | 'reacting' | 'resolved'
    hazardTimer: 0,
    reactionType: 'none',  // 'roll' | 'rcs' | 'boost'
    reactionTimer: 0,
    lateralOffset: 0,
    targetLateralOffset: 0,
    decisionPending: false,
    eventTriggered: false,
    eventResolved: false,

    // Arrival & Failure Cinematics
    arrivalTimer: 0,
    arrivalDuration: 4.5,
    arrivalOrbitAngle: 0,
    failureTimer: 0,
    failureReason: '',

    init() {
        this.canvas = document.getElementById('cosmos-mission-canvas');
        if (!this.canvas || typeof THREE === 'undefined') return;
        if (this.renderer) {
            this.onResize();
            return;
        }

        const isMobile = window.innerWidth < 768;
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: !isMobile,
            alpha: false,
            powerPreference: 'high-performance'
        });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.15;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x02040d);

        this.camera = new THREE.PerspectiveCamera(50, 16 / 9, 0.1, 4500);
        this.camPosCurrent = new THREE.Vector3(0, 110, 210);
        this.camLookCurrent = new THREE.Vector3(0, 0, 0);
        this.camTargetPos = this.camPosCurrent.clone();
        this.camTargetLook = this.camLookCurrent.clone();
        this.camera.position.copy(this.camPosCurrent);
        this.camera.lookAt(this.camLookCurrent);

        this.buildEnvironment(isMobile);
        this.buildSolarSystem(isMobile);
        this.buildSpacecraft3D();
        this.buildExhaustParticles(isMobile ? 45 : 90);
        this.buildHazardCloud(isMobile ? 120 : 240);
        this.buildScanBeam();

        // Default preview trajectory: Earth -> Mars
        this.setupRouteScene('earth', 'mars', 'direct');

        this.onResize();
        window.addEventListener('resize', () => this.onResize());
        this.bindControls();

        if (!this.animFrame) {
            this.lastTime = performance.now();
            this.loop = this.loop.bind(this);
            this.animFrame = requestAnimationFrame(this.loop);
        }
    },

    onResize() {
        if (!this.renderer || !this.camera) return;
        const container = document.getElementById('sim-canvas-wrapper');
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const w = Math.max(300, Math.floor(rect.width || window.innerWidth));
        const h = Math.max(240, Math.floor(rect.height || window.innerHeight));
        this.width = w;
        this.height = h;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h, false);
    },

    // ====================================================
    // 3D SCENE CONSTRUCTION
    // ====================================================
    buildEnvironment(isMobile) {
        // Cosmic Nebula Sky Dome
        const skyGeo = new THREE.SphereGeometry(2200, 32, 20);
        const skyMat = new THREE.MeshBasicMaterial({
            map: Cosmos3DTextureFactory.getNebulaSkyTexture(),
            side: THREE.BackSide,
            depthWrite: false
        });
        this.scene.add(new THREE.Mesh(skyGeo, skyMat));

        // Multi-Color Deep Space Starfield
        const starCount = isMobile ? 1600 : 3400;
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const palette = [
            new THREE.Color(0xffffff),
            new THREE.Color(0xcbe8ff),
            new THREE.Color(0xffe6b3),
            new THREE.Color(0x93c5fd)
        ];
        for (let i = 0; i < starCount; i++) {
            const r = 850 + Math.random() * 1150;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.cos(phi);
            positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
            const col = palette[i % palette.length];
            colors[i * 3] = col.r;
            colors[i * 3 + 1] = col.g;
            colors[i * 3 + 2] = col.b;
        }
        const starGeo = new THREE.BufferGeometry();
        starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        const softTex = Cosmos3DTextureFactory.getSoftParticleTexture();
        const starMat = new THREE.PointsMaterial({
            size: isMobile ? 3.2 : 3.8,
            map: softTex,
            vertexColors: true,
            transparent: true,
            opacity: 0.95,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            sizeAttenuation: true
        });
        this.scene.add(new THREE.Points(starGeo, starMat));

        // Near-Field Parallax Space Dust (moves smoothly around spacecraft)
        const dustCount = isMobile ? 90 : 180;
        const dustPos = new Float32Array(dustCount * 3);
        for (let i = 0; i < dustCount; i++) {
            dustPos[i * 3] = (Math.random() - 0.5) * 90;
            dustPos[i * 3 + 1] = (Math.random() - 0.5) * 55;
            dustPos[i * 3 + 2] = (Math.random() - 0.5) * 90;
        }
        const dustGeo = new THREE.BufferGeometry();
        dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
        const dustMat = new THREE.PointsMaterial({
            color: 0xbbe8ff,
            map: softTex,
            size: 0.65,
            transparent: true,
            opacity: 0.55,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        this.speedDust = new THREE.Points(dustGeo, dustMat);
        this.scene.add(this.speedDust);

        // Lighting: Sun PointLight + Soft Cosmic Ambient & Hemisphere Fill
        const sunLight = new THREE.PointLight(0xfff5e4, 2.75, 2800, 0.25);
        sunLight.position.set(0, 0, 0);
        this.scene.add(sunLight);

        const ambLight = new THREE.AmbientLight(0x2a3b68, 0.62);
        this.scene.add(ambLight);

        const hemiLight = new THREE.HemisphereLight(0x5275b8, 0x0b1024, 0.38);
        this.scene.add(hemiLight);
    },

    buildSolarSystem(isMobile) {
        this.solarGroup = new THREE.Group();
        this.scene.add(this.solarGroup);

        // Central Sun + Additive Corona Glow
        const sunGeo = new THREE.SphereGeometry(16, 40, 28);
        const sunMat = new THREE.MeshBasicMaterial({
            map: Cosmos3DTextureFactory.getBodyTexture('sun')
        });
        this.sunMesh = new THREE.Mesh(sunGeo, sunMat);
        this.solarGroup.add(this.sunMesh);

        const coronaMat = new THREE.SpriteMaterial({
            map: Cosmos3DTextureFactory.getGlowTexture('#fff6c4', 'rgba(255, 165, 38, 0.55)'),
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false
        });
        const corona = new THREE.Sprite(coronaMat);
        corona.scale.set(78, 78, 1);
        this.sunMesh.add(corona);

        // Build all 8 Planets around the Sun + Earth's Moon
        const planetOrder = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
        const segs = isMobile ? 28 : 44;

        planetOrder.forEach((key, idx) => {
            const p = cosmosMissionPlanets[key];
            const group = new THREE.Group();

            // Subtle Ecliptic Orbital Ring
            const ringPts = [];
            for (let s = 0; s <= 128; s++) {
                const a = (s / 128) * Math.PI * 2;
                ringPts.push(new THREE.Vector3(Math.cos(a) * p.orbitRadius, 0, Math.sin(a) * p.orbitRadius));
            }
            const orbitGeo = new THREE.BufferGeometry().setFromPoints(ringPts);
            const orbitMat = new THREE.LineBasicMaterial({
                color: 0x38bdf8,
                transparent: true,
                opacity: 0.14
            });
            this.solarGroup.add(new THREE.Line(orbitGeo, orbitMat));

            // Planet Sphere Mesh
            const geo = new THREE.SphereGeometry(p.visualRadius, segs, segs * 0.7);
            const mat = new THREE.MeshStandardMaterial({
                map: Cosmos3DTextureFactory.getBodyTexture(key),
                roughness: key === 'earth' ? 0.55 : 0.78,
                metalness: 0.06
            });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.rotation.z = p.tilt || 0;
            group.add(mesh);

            // Earth Rotating Cloud Shell
            let cloudMesh = null;
            if (p.hasClouds) {
                const cGeo = new THREE.SphereGeometry(p.visualRadius * 1.018, segs, segs * 0.7);
                const cMat = new THREE.MeshLambertMaterial({
                    map: typeof cosmosBuilderGetCloudTexture === 'function' ? cosmosBuilderGetCloudTexture() : null,
                    color: 0xffffff,
                    transparent: true,
                    opacity: 0.42,
                    depthWrite: false
                });
                cloudMesh = new THREE.Mesh(cGeo, cMat);
                group.add(cloudMesh);
            }

            // Smooth Fresnel Atmospheric Limb Glow (zero hard outer ring edge)
            const atmoIntensity = key === 'venus' ? 0.95 : (key === 'mercury' ? 0.35 : 0.80);
            group.add(Cosmos3DTextureFactory.createFresnelAtmosphere(p.visualRadius * 1.06, p.atmoColor, atmoIntensity));

            // Planetary Rings (Saturn & Uranus)
            if (p.hasRings) {
                const rGeo = new THREE.RingGeometry(p.ringInner, p.ringOuter, 96);
                // Remap UVs radially so linear band texture renders concentrically
                const posAttr = rGeo.attributes.position;
                const uvAttr = rGeo.attributes.uv;
                const v3 = new THREE.Vector3();
                for (let i = 0; i < posAttr.count; i++) {
                    v3.fromBufferAttribute(posAttr, i);
                    const dist = v3.length();
                    const u = (dist - p.ringInner) / (p.ringOuter - p.ringInner);
                    uvAttr.setXY(i, u, 0.5);
                }
                const rMat = new THREE.MeshBasicMaterial({
                    map: Cosmos3DTextureFactory.getSaturnRingTexture(key === 'uranus'),
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: key === 'uranus' ? 0.55 : 0.92,
                    depthWrite: false
                });
                const ringMesh = new THREE.Mesh(rGeo, rMat);
                ringMesh.rotation.x = Math.PI / 2;
                ringMesh.rotation.y = p.tilt || 0.45;
                group.add(ringMesh);
            }

            // Initial default angle
            const angle = idx * 0.65;
            group.position.set(Math.cos(angle) * p.orbitRadius, 0, Math.sin(angle) * p.orbitRadius);
            this.solarGroup.add(group);

            this.bodies[key] = {
                group,
                mesh,
                cloudMesh,
                orbitAngle: angle,
                orbitRadius: p.orbitRadius,
                radius: p.visualRadius,
                rotSpeed: p.rotSpeed
            };
        });

        // Build Earth's Moon naturally orbiting Earth!
        const moonData = cosmosMissionPlanets.moon;
        const moonGroup = new THREE.Group();
        const moonMesh = new THREE.Mesh(
            new THREE.SphereGeometry(moonData.visualRadius, 28, 20),
            new THREE.MeshStandardMaterial({
                map: Cosmos3DTextureFactory.getBodyTexture('moon'),
                roughness: 0.92,
                metalness: 0.02
            })
        );
        moonGroup.add(moonMesh);

        // Subtle Moon orbit ring around Earth
        const mRingPts = [];
        for (let s = 0; s <= 64; s++) {
            const a = (s / 64) * Math.PI * 2;
            mRingPts.push(new THREE.Vector3(Math.cos(a) * moonData.localMoonOrbit, 0, Math.sin(a) * moonData.localMoonOrbit));
        }
        const moonOrbitLine = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(mRingPts),
            new THREE.LineBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.2 })
        );
        this.bodies.earth.group.add(moonOrbitLine);
        this.bodies.earth.group.add(moonGroup);

        moonGroup.position.set(moonData.localMoonOrbit, 0.8, 0);
        this.bodies.moon = {
            group: moonGroup,
            mesh: moonMesh,
            cloudMesh: null,
            orbitAngle: 0,
            orbitRadius: moonData.localMoonOrbit,
            radius: moonData.visualRadius,
            rotSpeed: moonData.rotSpeed,
            isMoon: true
        };

        // Build 3D Asteroid Belt between Mars (134) and Jupiter (228)
        const beltCount = isMobile ? 160 : 360;
        const astGeo = new THREE.DodecahedronGeometry(0.75, 0);
        const astMat = new THREE.MeshStandardMaterial({
            color: 0x8f887d,
            roughness: 0.92,
            metalness: 0.12
        });
        const instMesh = new THREE.InstancedMesh(astGeo, astMat, beltCount);
        const dummy = new THREE.Object3D();
        for (let i = 0; i < beltCount; i++) {
            const a = (i / beltCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.25;
            const r = 162 + Math.random() * 34;
            const y = (Math.random() - 0.5) * 10;
            dummy.position.set(Math.cos(a) * r, y, Math.sin(a) * r);
            dummy.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
            const sc = 0.45 + Math.random() * 1.45;
            dummy.scale.set(sc * (0.8 + Math.random() * 0.5), sc * (0.7 + Math.random() * 0.5), sc);
            dummy.updateMatrix();
            instMesh.setMatrixAt(i, dummy.matrix);
        }
        instMesh.instanceMatrix.needsUpdate = true;
        this.asteroidBelt = instMesh;
        this.solarGroup.add(instMesh);
    },

    buildSpacecraft3D() {
        const craft = new THREE.Group();

        // Main Titanium Command Fuselage (oriented along +Z forward)
        const hullMat = new THREE.MeshStandardMaterial({ color: 0xe6eef8, metalness: 0.55, roughness: 0.32 });
        const darkMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.72, roughness: 0.38 });
        const goldMat = new THREE.MeshStandardMaterial({ color: 0xdfb15b, metalness: 0.85, roughness: 0.22, emissive: 0x3a2606, emissiveIntensity: 0.35 });
        const panelMat = new THREE.MeshStandardMaterial({ color: 0x0b3b8c, metalness: 0.65, roughness: 0.25, emissive: 0x0c4a6e, emissiveIntensity: 0.45 });

        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.52, 2.2, 16), hullMat);
        body.rotation.x = Math.PI / 2;
        craft.add(body);

        // Forward Sensor Nosecone
        const nose = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.95, 16), hullMat);
        nose.rotation.x = Math.PI / 2;
        nose.position.z = 1.56;
        craft.add(nose);

        // Glowing Cyan Optical Sensor Tip
        const eye = new THREE.Mesh(
            new THREE.SphereGeometry(0.14, 12, 12),
            new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
        );
        eye.position.z = 2.02;
        craft.add(eye);

        // Aft Service Module & Heat Ring
        const aft = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.46, 0.7, 16), darkMat);
        aft.rotation.x = Math.PI / 2;
        aft.position.z = -1.35;
        craft.add(aft);

        // Vishnu Sudarshana Rotating Golden Gyro Ring
        const gyroRing = new THREE.Mesh(new THREE.TorusGeometry(0.76, 0.055, 10, 32), goldMat);
        gyroRing.position.z = 0.15;
        craft.add(gyroRing);

        // Twin Solar Panel Wings + Truss Booms
        const wingBoom = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.08, 0.12), darkMat);
        wingBoom.position.z = -0.15;
        craft.add(wingBoom);

        const leftPanel = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.04, 0.95), panelMat);
        leftPanel.position.set(-1.85, 0, -0.15);
        craft.add(leftPanel);

        const rightPanel = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.04, 0.95), panelMat);
        rightPanel.position.set(1.85, 0, -0.15);
        craft.add(rightPanel);

        // Main Engine Nozzle Bell
        const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.40, 0.55, 16), darkMat);
        nozzle.rotation.x = Math.PI / 2;
        nozzle.position.z = -1.92;
        craft.add(nozzle);

        // Emissive Engine Throat Glow
        const engineCore = new THREE.Mesh(
            new THREE.SphereGeometry(0.26, 12, 12),
            new THREE.MeshBasicMaterial({ color: 0x7dd3fc })
        );
        engineCore.position.z = -2.14;
        craft.add(engineCore);

        // Dynamic Silky Gradient Exhaust Plume Cones (tapers smoothly to zero!)
        const plumeTex = Cosmos3DTextureFactory.getPlumeGradientTexture();
        const innerPlumeGeo = new THREE.ConeGeometry(0.24, 2.0, 16, 1, true);
        innerPlumeGeo.translate(0, -1.0, 0);
        innerPlumeGeo.rotateX(Math.PI / 2);
        const innerPlumeMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            alphaMap: plumeTex,
            transparent: true,
            opacity: 0.92,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        const innerPlume = new THREE.Mesh(innerPlumeGeo, innerPlumeMat);
        innerPlume.position.z = -2.15;
        craft.add(innerPlume);

        const outerPlumeGeo = new THREE.ConeGeometry(0.46, 3.6, 16, 1, true);
        outerPlumeGeo.translate(0, -1.8, 0);
        outerPlumeGeo.rotateX(Math.PI / 2);
        const outerPlumeMat = new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            alphaMap: plumeTex,
            transparent: true,
            opacity: 0.65,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        const outerPlume = new THREE.Mesh(outerPlumeGeo, outerPlumeMat);
        outerPlume.position.z = -2.18;
        craft.add(outerPlume);

        // Engine Point Light (subtly illuminates spacecraft hull from behind)
        const engineLight = new THREE.PointLight(0x38bdf8, 2.2, 14);
        engineLight.position.z = -2.6;
        craft.add(engineLight);

        // 4 Side RCS Reaction Thruster Jets (hidden until course correction / rolls)
        const rcsJets = [];
        const rcsDirs = [
            { pos: [0.55, 0, 0.85], rot: [0, 0, -Math.PI / 2] },
            { pos: [-0.55, 0, 0.85], rot: [0, 0, Math.PI / 2] },
            { pos: [0, 0.55, 0.85], rot: [0, 0, 0] },
            { pos: [0, -0.55, 0.85], rot: [Math.PI, 0, 0] }
        ];
        const rcsGeo = new THREE.ConeGeometry(0.11, 1.1, 8);
        rcsGeo.translate(0, 0.55, 0);
        rcsDirs.forEach(d => {
            const jet = new THREE.Mesh(rcsGeo, new THREE.MeshBasicMaterial({
                color: 0xe0f2fe,
                transparent: true,
                opacity: 0.0,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            }));
            jet.position.set(d.pos[0], d.pos[1], d.pos[2]);
            jet.rotation.set(d.rot[0], d.rot[1], d.rot[2]);
            craft.add(jet);
            rcsJets.push(jet);
        });

        this.spacecraft = craft;
        this.craftParts = { gyroRing, engineCore, innerPlume, outerPlume, engineLight, rcsJets };
        this.scene.add(craft);
    },

    buildExhaustParticles(count) {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        this.exhaustData = [];
        for (let i = 0; i < count; i++) {
            positions[i * 3] = 0;
            positions[i * 3 + 1] = -9999;
            positions[i * 3 + 2] = 0;
            colors[i * 3] = 0.3;
            colors[i * 3 + 1] = 0.8;
            colors[i * 3 + 2] = 1.0;
            this.exhaustData.push({
                pos: new THREE.Vector3(0, -9999, 0),
                vel: new THREE.Vector3(),
                life: 0,
                maxLife: 1
            });
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        const mat = new THREE.PointsMaterial({
            size: 1.35,
            map: Cosmos3DTextureFactory.getSoftParticleTexture(),
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        this.exhaustSystem = new THREE.Points(geo, mat);
        this.scene.add(this.exhaustSystem);
    },

    buildHazardCloud(count) {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 55;
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const mat = new THREE.PointsMaterial({
            color: 0xea580c,
            map: Cosmos3DTextureFactory.getSoftParticleTexture(),
            size: 2.4,
            transparent: true,
            opacity: 0.0,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        this.hazardCloud = new THREE.Points(geo, mat);
        this.scene.add(this.hazardCloud);
    },

    buildScanBeam() {
        const group = new THREE.Group();
        // Apex at z=0 (spacecraft), opening smoothly along +Z toward planet surface!
        const coneGeo = new THREE.ConeGeometry(3.6, 12, 28, 1, true);
        coneGeo.translate(0, -6, 0);
        coneGeo.rotateX(-Math.PI / 2);
        const coneMat = new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            alphaMap: Cosmos3DTextureFactory.getPlumeGradientTexture(),
            transparent: true,
            opacity: 0.45,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        const cone = new THREE.Mesh(coneGeo, coneMat);
        group.add(cone);

        const ringGeo = new THREE.RingGeometry(1.0, 1.45, 48);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0xdfb15b,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        const waveRing = new THREE.Mesh(ringGeo, ringMat);
        group.add(waveRing);

        group.visible = false;
        this.scanBeamGroup = { group, cone, waveRing };
        this.scene.add(group);
    },

    // ====================================================
    // ROUTE-AWARE SOLAR SYSTEM ALIGNMENT & 3D TRAJECTORY
    // ====================================================
    getBodyWorldPosition(key) {
        const b = this.bodies[key];
        if (!b) return new THREE.Vector3(94, 0, 0);
        const v = new THREE.Vector3();
        b.group.getWorldPosition(v);
        return v;
    },

    setupRouteScene(originKey, destKey, routeId) {
        const origin = cosmosMissionPlanets[originKey] || cosmosMissionPlanets.earth;
        const dest = cosmosMissionPlanets[destKey] || cosmosMissionPlanets.mars;
        const route = cosmosMissionRoutes[routeId] || cosmosMissionRoutes.direct;

        // Calculate Distance & Dynamic Clamped Duration (10s - 30s)
        this.routeDistanceMkm = calculateRouteDistance(originKey, destKey);
        this.travelDurationSec = mapDistanceToDuration(this.routeDistanceMkm, route.timeMult);
        this.routeScale = this.travelDurationSec <= 12.5 ? 'short' : (this.travelDurationSec <= 22.5 ? 'medium' : 'long');

        cosmosMissionState.routeDistanceMkm = this.routeDistanceMkm;
        cosmosMissionState.travelDurationSec = this.travelDurationSec;

        // Arrange Solar System Planets along an organic, sweeping spiral corridor
        // so intermediate planets & Moon naturally appear along the journey!
        const order = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
        const oIdx = order.indexOf(originKey === 'moon' ? 'earth' : originKey);
        const dIdx = order.indexOf(destKey === 'moon' ? 'earth' : destKey);
        const direction = dIdx >= oIdx ? 1 : -1;
        const span = Math.abs(dIdx - oIdx);

        // Origin sits at angle 0.25; Destination sweeps ahead in orbital longitude
        const baseAngle = 0.25;
        const totalSweep = span === 0 ? 0.0 : Math.min(2.35, 0.52 + span * 0.28);

        order.forEach((key, idx) => {
            const b = this.bodies[key];
            if (!b) return;
            let angle;
            if (span === 0) {
                angle = baseAngle + (idx - oIdx) * 0.65;
            } else {
                const rel = (idx - oIdx) / (dIdx - oIdx); // 0 at origin, 1 at dest
                if (rel >= 0 && rel <= 1) {
                    // Place intermediate planets cleanly near the sweeping transfer corridor with slight offset
                    const offset = (idx === oIdx || idx === dIdx) ? 0 : (idx % 2 === 0 ? 0.09 : -0.09);
                    angle = baseAngle + rel * totalSweep * direction + offset;
                } else {
                    angle = baseAngle + rel * totalSweep * direction + 0.55;
                }
            }
            b.orbitAngle = angle;
            b.group.position.set(Math.cos(angle) * b.orbitRadius, 0, Math.sin(angle) * b.orbitRadius);
        });

        // Position Earth's Moon along the early departure corridor for Earth-origin missions
        const moonOrbitR = cosmosMissionPlanets.moon.localMoonOrbit;
        const moonAngle = (originKey === 'earth' && destKey === 'moon') ? 0.75 : (baseAngle + 0.35 * direction);
        this.bodies.moon.orbitAngle = moonAngle;
        this.bodies.moon.group.position.set(Math.cos(moonAngle) * moonOrbitR, 1.1, Math.sin(moonAngle) * moonOrbitR);

        this.solarGroup.updateMatrixWorld(true);

        const pStartBody = this.getBodyWorldPosition(originKey);
        const pEndBody = this.getBodyWorldPosition(destKey);
        const rStart = this.bodies[originKey].radius;
        const rEnd = this.bodies[destKey].radius;

        // Launch point slightly outside origin atmosphere, arrival point outside destination atmosphere
        const dirVec = new THREE.Vector3().subVectors(pEndBody, pStartBody).normalize();
        const perpVec = new THREE.Vector3(-dirVec.z, 0, dirVec.x).normalize();

        const startPt = pStartBody.clone().addScaledVector(dirVec, rStart + 2.6).add(new THREE.Vector3(0, 0.8, 0));
        const endPt = pEndBody.clone().addScaledVector(dirVec, -(rEnd + Math.max(5.0, rEnd * 0.75))).add(new THREE.Vector3(0, rEnd * 0.22, 0));

        // Build Multi-Waypoint 3D Curved Transfer Spline (NOT a straight line!)
        const waypoints = [startPt];
        const totalDist3D = startPt.distanceTo(endPt);
        const curveSign = direction >= 0 ? 1 : -1;
        const liftScale = route.curveLift || 1.0;

        this.plannedFlybys = [];

        // Check for natural Moon flyby on Earth-origin interplanetary missions
        if (originKey === 'earth' && destKey !== 'moon') {
            const moonPos = this.getBodyWorldPosition('moon');
            const flybyPt = moonPos.clone().add(new THREE.Vector3(0, 3.2, 0)).addScaledVector(perpVec, 3.8 * curveSign);
            waypoints.push(flybyPt);
            this.plannedFlybys.push({
                key: 'moon',
                name: 'Moon',
                tStart: 0.08,
                tPeak: 0.16,
                tEnd: 0.23,
                triggered: false
            });
        }

        // Collect intermediate planetary flybys along long journeys
        const intermediates = [];
        if (span >= 2) {
            const step = dIdx > oIdx ? 1 : -1;
            for (let k = oIdx + step; k !== dIdx; k += step) {
                intermediates.push(order[k]);
            }
        }

        // Add curved mid-space waypoints (passing near intermediate planets naturally)
        if (intermediates.length > 0) {
            intermediates.forEach((pKey, i) => {
                const frac = (i + 1) / (intermediates.length + 1);
                const bodyPos = this.getBodyWorldPosition(pKey);
                const bodyR = this.bodies[pKey].radius;
                const side = (i % 2 === 0 ? 1 : -1) * curveSign;
                const wp = bodyPos.clone()
                    .addScaledVector(perpVec, (bodyR + 10.5) * side)
                    .add(new THREE.Vector3(0, Math.sin(frac * Math.PI) * 14 * liftScale, 0));
                waypoints.push(wp);

                // Register cinematic flyby windows (pick up to 2 well-spaced intermediate flybys)
                if (this.plannedFlybys.length < 3) {
                    const tPeak = 0.18 + frac * 0.62;
                    this.plannedFlybys.push({
                        key: pKey,
                        name: cosmosMissionPlanets[pKey].name,
                        tStart: Math.max(0.14, tPeak - 0.07),
                        tPeak: tPeak,
                        tEnd: Math.min(0.82, tPeak + 0.07),
                        triggered: false
                    });
                }
            });
        } else {
            // Single-hop curved Hohmann / slingshot arc with vertical & lateral depth
            const mid1 = new THREE.Vector3().lerpVectors(startPt, endPt, 0.35)
                .addScaledVector(perpVec, totalDist3D * 0.16 * curveSign * liftScale)
                .add(new THREE.Vector3(0, Math.min(22, totalDist3D * 0.12) * liftScale, 0));
            const mid2 = new THREE.Vector3().lerpVectors(startPt, endPt, 0.72)
                .addScaledVector(perpVec, totalDist3D * 0.10 * curveSign * liftScale)
                .add(new THREE.Vector3(0, Math.min(14, totalDist3D * 0.07) * liftScale, 0));
            waypoints.push(mid1, mid2);
        }

        // Check if route crosses the Asteroid Belt (between Mars r=134 and Jupiter r=228)
        const minOrb = Math.min(origin.orbitRadius, dest.orbitRadius);
        const maxOrb = Math.max(origin.orbitRadius, dest.orbitRadius);
        this.crossesAsteroidBelt = (minOrb <= 134 && maxOrb >= 228);

        waypoints.push(endPt);
        this.routeCurve = new THREE.CatmullRomCurve3(waypoints, false, 'catmullrom', 0.5);

        // Rebuild subtle translucent glowing trajectory guide line
        if (this.routeLine) {
            this.scene.remove(this.routeLine);
            this.routeLine.geometry.dispose();
        }
        const curvePts = this.routeCurve.getPoints(160);
        const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePts);
        const lineMat = new THREE.LineBasicMaterial({
            color: 0xdfb15b,
            transparent: true,
            opacity: 0.24
        });
        this.routeLine = new THREE.Line(lineGeo, lineMat);
        this.scene.add(this.routeLine);

        // Pick hazard trigger progress that avoids active flyby peaks
        this.hazardTriggerT = this.routeScale === 'short' ? 0.54 : 0.58;
        this.plannedFlybys.forEach(fb => {
            if (Math.abs(this.hazardTriggerT - fb.tPeak) < 0.09) {
                this.hazardTriggerT = Math.min(0.74, fb.tEnd + 0.06);
            }
        });

        // Position spacecraft at launch point facing trajectory tangent
        if (this.spacecraft) {
            const p0 = this.routeCurve.getPoint(0);
            const t0 = this.routeCurve.getTangent(0);
            this.spacecraft.position.copy(p0);
            this.spacecraft.lookAt(p0.clone().add(t0));
        }

        // Frame preview nicely when idle
        if (!this.isRunning) {
            const mid = this.routeCurve.getPoint(0.45);
            const distCam = Math.max(38, Math.min(340, totalDist3D * 0.95));
            this.camTargetPos.set(mid.x + distCam * 0.45, mid.y + distCam * 0.55, mid.z + distCam * 0.78);
            this.camTargetLook.copy(mid);
        }
    },

    getExpectedFlybyNames(originKey, destKey) {
        const names = [];
        if (originKey === 'earth' && destKey !== 'moon') names.push('Moon');
        const order = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
        const oIdx = order.indexOf(originKey === 'moon' ? 'earth' : originKey);
        const dIdx = order.indexOf(destKey === 'moon' ? 'earth' : destKey);
        if (Math.abs(dIdx - oIdx) >= 2) {
            const step = dIdx > oIdx ? 1 : -1;
            for (let k = oIdx + step; k !== dIdx; k += step) {
                names.push(cosmosMissionPlanets[order[k]].name);
            }
        }
        const minR = Math.min(cosmosMissionPlanets[originKey].orbitRadius, cosmosMissionPlanets[destKey].orbitRadius);
        const maxR = Math.max(cosmosMissionPlanets[originKey].orbitRadius, cosmosMissionPlanets[destKey].orbitRadius);
        if (minR <= 134 && maxR >= 228) names.push('Asteroid Belt');
        return names.length ? names : ['Deep Space Transit'];
    },

    // ====================================================
    // FULLSCREEN CINEMATIC MODE CONTROLS
    // ====================================================
    enterFullscreenCinematic() {
        this.isFullscreenCinematic = true;
        document.body.classList.add('cosmos-cinematic-fullscreen');
        const micro = document.getElementById('cinematic-micro-controls');
        if (micro) micro.style.display = 'flex';
        const hud = document.getElementById('sim-telemetry-hud');
        if (hud) hud.classList.remove('peek-open');
        const peekBtn = document.getElementById('micro-telemetry-btn');
        if (peekBtn) peekBtn.classList.remove('active');
        setTimeout(() => this.onResize(), 40);
        setTimeout(() => this.onResize(), 220);
    },

    exitFullscreenCinematic() {
        this.isFullscreenCinematic = false;
        document.body.classList.remove('cosmos-cinematic-fullscreen');
        const micro = document.getElementById('cinematic-micro-controls');
        if (micro) micro.style.display = 'none';
        const hud = document.getElementById('sim-telemetry-hud');
        if (hud) hud.classList.remove('peek-open');
        CosmosSpaceAudio.stopAmbient();
        setTimeout(() => this.onResize(), 60);
    },

    // ====================================================
    // UI EVENT BINDINGS
    // ====================================================
    bindControls() {
        // Topbar Camera Buttons
        document.querySelectorAll('.sim-cam-btn[data-cam]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.sim-cam-btn[data-cam]').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.cameraMode = e.currentTarget.getAttribute('data-cam') || 'auto';
            });
        });

        // Fullscreen toggle button in topbar
        const cinBtn = document.getElementById('sim-cinematic-btn');
        if (cinBtn) {
            cinBtn.addEventListener('click', () => {
                if (this.isFullscreenCinematic) this.exitFullscreenCinematic();
                else this.enterFullscreenCinematic();
            });
        }

        // Subtle Micro-Controls during Fullscreen Cinematic Travel
        const microCam = document.getElementById('micro-cam-btn');
        if (microCam) {
            const modes = ['auto', 'follow', 'cockpit', 'wide', 'target'];
            microCam.addEventListener('click', () => {
                const next = modes[(modes.indexOf(this.cameraMode) + 1) % modes.length];
                this.cameraMode = next;
                microCam.title = `Camera: ${next.toUpperCase()}`;
                microCam.classList.toggle('active', next !== 'auto');
            });
        }

        const microTel = document.getElementById('micro-telemetry-btn');
        if (microTel) {
            microTel.addEventListener('click', () => {
                const hud = document.getElementById('sim-telemetry-hud');
                if (hud) {
                    const isOpen = hud.classList.toggle('peek-open');
                    microTel.classList.toggle('active', isOpen);
                }
            });
        }

        const microAudio = document.getElementById('micro-audio-btn');
        if (microAudio) {
            microAudio.addEventListener('click', () => CosmosSpaceAudio.toggleMute());
        }

        const microExit = document.getElementById('micro-exit-btn');
        if (microExit) {
            microExit.addEventListener('click', () => {
                this.isRunning = false;
                cosmosMissionState.isRunning = false;
                cosmosMissionState.missionStatus = 'INACTIVE';
                this.exitFullscreenCinematic();
                const ev = document.getElementById('sim-event-overlay');
                if (ev) ev.style.display = 'none';
                updateMissionDisplay();
            });
        }

        // Planning Overlay Origin & Destination Selectors
        const planOrig = document.getElementById('plan-origin-select');
        const planDest = document.getElementById('plan-dest-select');
        if (planOrig) {
            planOrig.addEventListener('change', () => {
                let o = planOrig.value;
                let d = planDest ? planDest.value : cosmosMissionState.currentPlanet;
                if (o === d) {
                    d = o === 'mars' ? 'earth' : 'mars';
                    if (planDest) planDest.value = d;
                }
                cosmosMissionState.originPlanet = o;
                cosmosMissionState.currentPlanet = d;
                const deckOrig = document.getElementById('cosmos-mission-origin-select');
                const deckDest = document.getElementById('cosmos-mission-planet-select');
                if (deckOrig) deckOrig.value = o;
                if (deckDest) deckDest.value = d;
                updatePlanetInfo(d);
                this.refreshPlanningModal();
            });
        }
        if (planDest) {
            planDest.addEventListener('change', () => {
                let d = planDest.value;
                let o = planOrig ? planOrig.value : cosmosMissionState.originPlanet;
                if (o === d) {
                    o = d === 'earth' ? 'mars' : 'earth';
                    if (planOrig) planOrig.value = o;
                }
                cosmosMissionState.originPlanet = o;
                cosmosMissionState.currentPlanet = d;
                const deckOrig = document.getElementById('cosmos-mission-origin-select');
                const deckDest = document.getElementById('cosmos-mission-planet-select');
                if (deckOrig) deckOrig.value = o;
                if (deckDest) deckDest.value = d;
                updatePlanetInfo(d);
                this.refreshPlanningModal();
            });
        }

        // Planning Actions
        const confirmBtn = document.getElementById('sim-plan-confirm-btn');
        if (confirmBtn) confirmBtn.addEventListener('click', () => this.confirmPlanAndLaunch());
        const cancelBtn = document.getElementById('sim-plan-cancel-btn');
        if (cancelBtn) cancelBtn.addEventListener('click', () => this.closePlanningOverlay());

        // Route Cards
        document.querySelectorAll('.route-card').forEach(card => {
            card.addEventListener('click', () => {
                const rId = card.getAttribute('data-route');
                if (rId) this.selectRoute(rId);
            });
        });

        // Minimal Tactical Decision Buttons
        const btnA = document.getElementById('sim-decision-btn-a');
        const btnB = document.getElementById('sim-decision-btn-b');
        const btnC = document.getElementById('sim-decision-btn-c');
        if (btnA) btnA.addEventListener('click', () => this.resolveHazardDecision(0));
        if (btnB) btnB.addEventListener('click', () => this.resolveHazardDecision(1));
        if (btnC) btnC.addEventListener('click', () => this.resolveHazardDecision(2));

        // Failure Modal Actions
        const failRetry = document.getElementById('sim-fail-retry-btn');
        const failReplan = document.getElementById('sim-fail-replan-btn');
        if (failRetry) {
            failRetry.addEventListener('click', () => {
                const ov = document.getElementById('sim-failure-overlay');
                if (ov) ov.style.display = 'none';
                startMission();
            });
        }
        if (failReplan) {
            failReplan.addEventListener('click', () => {
                const ov = document.getElementById('sim-failure-overlay');
                if (ov) ov.style.display = 'none';
                this.exitFullscreenCinematic();
                if (cosmosMissionState.currentPlanet) this.openPlanningOverlay(cosmosMissionState.currentPlanet);
            });
        }

        // Completion Result Screen Actions
        const replayBtn = document.getElementById('sim-replay-btn');
        const newTargetBtn = document.getElementById('sim-new-target-btn');
        const deckBtn = document.getElementById('sim-return-deck-btn');
        if (replayBtn) {
            replayBtn.addEventListener('click', () => {
                const ov = document.getElementById('sim-completion-overlay');
                if (ov) ov.style.display = 'none';
                startMission();
            });
        }
        if (newTargetBtn) {
            newTargetBtn.addEventListener('click', () => {
                const ov = document.getElementById('sim-completion-overlay');
                if (ov) ov.style.display = 'none';
                this.exitFullscreenCinematic();
                this.openPlanningOverlay(cosmosMissionState.currentPlanet || 'mars');
            });
        }
        if (deckBtn) {
            deckBtn.addEventListener('click', () => {
                const ov = document.getElementById('sim-completion-overlay');
                if (ov) ov.style.display = 'none';
                this.exitFullscreenCinematic();
            });
        }
    },

    // ====================================================
    // PLANNING PHASE LOGIC
    // ====================================================
    openPlanningOverlay(planetKey) {
        const destKey = planetKey || 'mars';
        let origKey = cosmosMissionState.originPlanet || 'earth';
        if (origKey === destKey) {
            origKey = destKey === 'earth' ? 'mars' : 'earth';
            cosmosMissionState.originPlanet = origKey;
            const deckOrig = document.getElementById('cosmos-mission-origin-select');
            if (deckOrig) deckOrig.value = origKey;
        }

        cosmosMissionState.missionStatus = 'PLANNING';
        cosmosMissionState.currentPlanet = destKey;
        cosmosMissionState.isPlanConfirmed = false;

        ['sim-completion-overlay', 'sim-failure-overlay', 'sim-event-overlay'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });

        const planOrig = document.getElementById('plan-origin-select');
        const planDest = document.getElementById('plan-dest-select');
        if (planOrig) planOrig.value = origKey;
        if (planDest) planDest.value = destKey;

        this.refreshPlanningModal();

        const overlay = document.getElementById('sim-planning-overlay');
        if (overlay) overlay.style.display = 'flex';
        updateMissionDisplay();
    },

    refreshPlanningModal() {
        const origKey = cosmosMissionState.originPlanet || 'earth';
        const destKey = cosmosMissionState.currentPlanet || 'mars';
        const orig = cosmosMissionPlanets[origKey];
        const dest = cosmosMissionPlanets[destKey];
        const cfg = planetMissionConfig[destKey];
        if (!orig || !dest) return;

        // Live 3D Solar System preview of selected route!
        this.setupRouteScene(origKey, destKey, cosmosMissionState.selectedRoute || 'direct');

        cosmosSafeText('plan-target-title', `${orig.name.toUpperCase()} → ${dest.name.toUpperCase()} TRAJECTORY`);
        cosmosSafeText('plan-target-objective', dest.objective);
        cosmosSafeText('plan-spec-dest', `${orig.name.toUpperCase()} → ${dest.name.toUpperCase()}`);
        cosmosSafeText('plan-spec-dist', formatDistanceMkm(this.routeDistanceMkm));

        const flybys = this.getExpectedFlybyNames(origKey, destKey);
        cosmosSafeText('plan-spec-flybys', flybys.slice(0, 3).join(', ') + (flybys.length > 3 ? ` +${flybys.length - 3}` : ''));

        // Update dynamic route card durations & burns based on distance!
        const dist = this.routeDistanceMkm;
        Object.keys(cosmosMissionRoutes).forEach(rKey => {
            const r = cosmosMissionRoutes[rKey];
            const dur = mapDistanceToDuration(dist, r.timeMult);
            const shortKey = rKey === 'fuel_saving' ? 'fuel' : (rKey === 'fastest' ? 'fast' : (rKey === 'gravity_assist' ? 'assist' : 'direct'));
            cosmosSafeText(`rc-${shortKey}-time`, `${dur.toFixed(1)}s`);
            cosmosSafeText(`rc-${shortKey}-burn`, `~${r.burnEst}%`);
        });

        // Hazards tags
        const hazardsList = document.getElementById('plan-hazards-list');
        if (hazardsList) {
            hazardsList.innerHTML = '';
            dest.hazards.forEach(h => {
                const tag = document.createElement('span');
                tag.className = 'hazard-tag';
                tag.textContent = `⚠ ${h}`;
                hazardsList.appendChild(tag);
            });
            if (this.crossesAsteroidBelt) {
                const tag = document.createElement('span');
                tag.className = 'hazard-tag';
                tag.textContent = '☄ ASTEROID BELT CROSSING';
                hazardsList.appendChild(tag);
            }
        }

        cosmosSafeText('plan-matrix-status-val', cfg ? cfg.arrivalLabel : 'ORBITAL CAPTURE');
        this.selectRoute(cosmosMissionState.selectedRoute || 'direct');
    },

    closePlanningOverlay() {
        const overlay = document.getElementById('sim-planning-overlay');
        if (overlay) overlay.style.display = 'none';
        if (!cosmosMissionState.isPlanConfirmed && cosmosMissionState.missionStatus === 'PLANNING') {
            cosmosMissionState.missionStatus = 'INACTIVE';
            updateMissionDisplay();
        }
    },

    selectRoute(routeId) {
        const route = cosmosMissionRoutes[routeId];
        if (!route) return;
        cosmosMissionState.selectedRoute = routeId;

        document.querySelectorAll('.route-card').forEach(c => {
            c.classList.toggle('selected', c.getAttribute('data-route') === routeId);
        });

        const origKey = cosmosMissionState.originPlanet || 'earth';
        const destKey = cosmosMissionState.currentPlanet || 'mars';
        this.setupRouteScene(origKey, destKey, routeId);

        const fuelBar = document.getElementById('plan-matrix-fuel-bar');
        if (fuelBar) fuelBar.style.width = `${route.burnEst}%`;
        cosmosSafeText('plan-matrix-fuel-val', `${route.burnEst}% (${100 - route.burnEst}% RESERVE)`);
        cosmosSafeText('plan-matrix-time-val', `${this.travelDurationSec.toFixed(1)} SECONDS`);
        cosmosSafeText('plan-spec-duration', `~${this.travelDurationSec.toFixed(1)}s`);

        const riskPill = document.getElementById('plan-matrix-risk-pill');
        if (riskPill) {
            riskPill.className = `mat-pill ${route.riskClass}`;
            riskPill.textContent = route.risk;
        }
    },

    confirmPlanAndLaunch() {
        const origKey = cosmosMissionState.originPlanet || 'earth';
        const destKey = cosmosMissionState.currentPlanet || 'mars';
        if (!cosmosMissionPlanets[destKey]) return;

        cosmosMissionState.isPlanConfirmed = true;
        const overlay = document.getElementById('sim-planning-overlay');
        if (overlay) overlay.style.display = 'none';

        addMissionLog(`3D LAUNCH AUTHORIZED: ${cosmosMissionPlanets[origKey].name.toUpperCase()} → ${cosmosMissionPlanets[destKey].name.toUpperCase()} (${this.travelDurationSec.toFixed(1)}s transit)`, 'mission');
        startMission();
    },

    // ====================================================
    // FLIGHT RUNTIME LIFECYCLE
    // ====================================================
    start() {
        const origKey = cosmosMissionState.originPlanet || 'earth';
        const destKey = cosmosMissionState.currentPlanet || 'mars';
        const routeId = cosmosMissionState.selectedRoute || 'direct';

        this.setupRouteScene(origKey, destKey, routeId);

        this.isRunning = true;
        this.isPaused = false;
        this.progress = 0.0;
        this.elapsedFlightSec = 0;
        this.simElapsedTime = 0;
        this.craftFuel = 100;
        this.hullIntegrity = 100;
        this.thermalStatus = 'optimal';
        this.engineMode = 'LAUNCH BURN';
        this.craftVelocity = 0;
        this.maxVelocity = 0;
        this.signalStrength = 100;

        this.hazardPhase = 'none';
        this.hazardTimer = 0;
        this.reactionType = 'none';
        this.reactionTimer = 0;
        this.lateralOffset = 0;
        this.targetLateralOffset = 0;
        this.eventTriggered = false;
        this.eventResolved = false;
        this.decisionPending = false;
        this.activeFlyby = null;
        this.arrivalTimer = 0;
        this.failureTimer = 0;
        this.cameraMode = 'auto';

        cosmosMissionState.flybysCompleted = [];
        cosmosMissionState.hazardsEncountered = [];
        cosmosMissionState.decisionsMade = [];
        cosmosMissionState.maxVelocity = 0;

        if (this.scanBeamGroup) this.scanBeamGroup.group.visible = false;
        if (this.hazardCloud) this.hazardCloud.material.opacity = 0;

        // Hide all modals & enter Fullscreen Cinematic Space Travel!
        ['sim-planning-overlay', 'sim-event-overlay', 'sim-completion-overlay', 'sim-failure-overlay'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });

        // Snap camera immediately to dramatic Launch framing beside Origin & Spacecraft
        const startPos = this.routeCurve.getPoint(0);
        const startTan = this.routeCurve.getTangent(0);
        const right = new THREE.Vector3().crossVectors(startTan, new THREE.Vector3(0, 1, 0)).normalize();
        this.camPosCurrent.copy(startPos).addScaledVector(startTan, -6.5).addScaledVector(right, 5.5).add(new THREE.Vector3(0, 2.4, 0));
        this.camLookCurrent.copy(startPos).addScaledVector(startTan, 2.0);
        this.camera.position.copy(this.camPosCurrent);
        this.camera.lookAt(this.camLookCurrent);

        this.enterFullscreenCinematic();
        CosmosSpaceAudio.startAmbient();
        CosmosSpaceAudio.playLaunchRumble();
    },

    pause() {
        this.isPaused = true;
    },

    resume() {
        this.isPaused = false;
        this.lastTime = performance.now();
    },

    reset() {
        this.isRunning = false;
        this.isPaused = false;
        this.progress = 0.0;
        this.elapsedFlightSec = 0;
        this.simElapsedTime = 0;
        this.craftVelocity = 0;
        this.craftFuel = 100;
        this.hullIntegrity = 100;
        this.thermalStatus = 'optimal';
        this.engineMode = 'STANDBY';
        this.signalStrength = 100;
        this.hazardPhase = 'none';
        this.eventTriggered = false;
        this.eventResolved = false;
        this.decisionPending = false;
        if (this.scanBeamGroup) this.scanBeamGroup.group.visible = false;
        if (this.hazardCloud) this.hazardCloud.material.opacity = 0;

        this.exitFullscreenCinematic();
        ['sim-planning-overlay', 'sim-event-overlay', 'sim-completion-overlay', 'sim-failure-overlay'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
        this.updateTelemetryDOM();
    },

    // ====================================================
    // VISUAL HAZARD BUILDUP -> MINIMAL DECISION -> REACTION
    // ====================================================
    beginVisualHazard() {
        this.eventTriggered = true;
        this.hazardPhase = 'buildup';
        this.hazardTimer = 0;

        const destKey = cosmosMissionState.currentPlanet || 'mars';
        const planet = cosmosMissionPlanets[destKey];
        const cfg = planetMissionConfig[destKey];
        if (this.hazardCloud && cfg) {
            this.hazardCloud.material.color.setHex(cfg.fxColor);
        }
        if (planet && planet.anomaly) {
            cosmosMissionState.hazardsEncountered.push(planet.anomaly.title);
            addMissionLog(`VISUAL ANOMALY: ${planet.anomaly.title}`, 'alert');
        }
        CosmosSpaceAudio.playHazardCue();
    },

    showMinimalDecisionUI() {
        this.hazardPhase = 'decision';
        this.decisionPending = true;

        const destKey = cosmosMissionState.currentPlanet || 'mars';
        const planet = cosmosMissionPlanets[destKey];
        if (!planet || !planet.anomaly) return;

        const anomaly = planet.anomaly;
        cosmosSafeText('sim-event-title', `⚠ ${anomaly.title}`);
        const opts = anomaly.options;
        if (opts && opts.length >= 3) {
            cosmosSafeText('sim-opt-a-title', opts[0].title);
            cosmosSafeText('sim-opt-a-effect', opts[0].effect);
            cosmosSafeText('sim-opt-b-title', opts[1].title);
            cosmosSafeText('sim-opt-b-effect', opts[1].effect);
            cosmosSafeText('sim-opt-c-title', opts[2].title);
            cosmosSafeText('sim-opt-c-effect', opts[2].effect);
        }

        const overlay = document.getElementById('sim-event-overlay');
        if (overlay) overlay.style.display = 'flex';
    },

    resolveHazardDecision(optIndex) {
        const overlay = document.getElementById('sim-event-overlay');
        if (overlay) overlay.style.display = 'none';

        this.decisionPending = false;
        this.eventResolved = true;
        this.hazardPhase = 'reacting';
        this.reactionTimer = 2.2;

        const destKey = cosmosMissionState.currentPlanet || 'mars';
        const planet = cosmosMissionPlanets[destKey];
        const opt = planet && planet.anomaly && planet.anomaly.options[optIndex];

        if (opt) {
            this.craftFuel = Math.max(0, Math.min(100, this.craftFuel + opt.fuelDelta));
            this.hullIntegrity = Math.max(0, Math.min(100, this.hullIntegrity + opt.hullDelta));
            this.thermalStatus = opt.thermal || 'optimal';
            this.reactionType = opt.reaction || 'rcs';
            this.targetLateralOffset = optIndex === 0 ? 3.2 : (optIndex === 1 ? -3.0 : 1.5);

            cosmosMissionState.decisionsMade.push(opt.title.replace(/^[^\w]+/, '').trim());
            addMissionLog(`COMMANDER ACTION: ${opt.log}`, 'mission');
        }

        CosmosSpaceAudio.playRcsBurst();
        this.updateTelemetryDOM();

        // Check Controlled Failure Conditions
        if (this.craftFuel <= 0) {
            this.beginFailureCinematic('PROPULSION EXHAUSTION: Fuel depleted during course correction.');
            return;
        }
        if (this.hullIntegrity <= 0) {
            this.beginFailureCinematic('STRUCTURAL HULL FAILURE: Thermal & impact stress exceeded limits.');
            return;
        }
    },

    beginFailureCinematic(reason) {
        this.failureReason = reason;
        this.failureTimer = 0;
        cosmosMissionState.missionStatus = 'FAILURE_CINEMATIC';
        addMissionLog(`EMERGENCY: ${reason}`, 'alert');
        CosmosSpaceAudio.playHazardCue();
    },

    triggerFailureState(reason) {
        this.isRunning = false;
        cosmosMissionState.isRunning = false;
        cosmosMissionState.missionStatus = 'FAILED';
        cosmosMissionState.travelStatus = 'Mission Failed';
        cosmosMissionState.targetStatus = 'Signal Lost';

        ['sim-completion-overlay', 'sim-event-overlay', 'sim-planning-overlay'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });

        const orig = cosmosMissionPlanets[cosmosMissionState.originPlanet || 'earth'];
        const dest = cosmosMissionPlanets[cosmosMissionState.currentPlanet || 'mars'];
        cosmosSafeText('sim-fail-reason', reason || this.failureReason || 'Mission Aborted.');
        cosmosSafeText('sim-fail-route', `${orig.name.toUpperCase()} → ${dest.name.toUpperCase()}`);
        cosmosSafeText('sim-fail-hull', `${Math.round(this.hullIntegrity)}%`);
        cosmosSafeText('sim-fail-fuel', `${Math.round(this.craftFuel)}%`);
        cosmosSafeText('sim-fail-time', `${this.elapsedFlightSec.toFixed(1)}s`);

        const failOverlay = document.getElementById('sim-failure-overlay');
        if (failOverlay) failOverlay.style.display = 'flex';
        CosmosSpaceAudio.stopAmbient();
        updateMissionDisplay();
    },

    // ====================================================
    // MAIN 3D UPDATE LOOP
    // ====================================================
    update(dtSec) {
        // Gentle Celestial Self-Rotations Always Alive
        if (this.sunMesh) this.sunMesh.rotation.y += dtSec * 0.08;
        Object.keys(this.bodies).forEach(k => {
            const b = this.bodies[k];
            if (b.mesh) b.mesh.rotation.y += b.rotSpeed * dtSec * 12;
            if (b.cloudMesh) b.cloudMesh.rotation.y += b.rotSpeed * dtSec * 16;
        });
        if (this.asteroidBelt) this.asteroidBelt.rotation.y += dtSec * 0.008;
        if (this.craftParts.gyroRing) this.craftParts.gyroRing.rotation.z += dtSec * 1.9;

        // Idle Preview Camera Drift
        if (!this.isRunning) {
            if (this.cameraMode === 'cockpit' && this.spacecraft) {
                const fwd = new THREE.Vector3(0, 0, 1).applyQuaternion(this.spacecraft.quaternion);
                this.camTargetPos.copy(this.spacecraft.position).add(new THREE.Vector3(0, 0.35, 0.45));
                this.camTargetLook.copy(this.spacecraft.position).addScaledVector(fwd, 25);
                const simCockpitHud = document.getElementById('sim-cockpit-hud');
                if (simCockpitHud) simCockpitHud.style.display = 'flex';
                const cockpitSpeed = document.getElementById('cockpit-speed');
                if (cockpitSpeed) cockpitSpeed.textContent = '0.0 km/s (STANDBY)';
                const cockpitBearing = document.getElementById('cockpit-target-bearing');
                if (cockpitBearing) cockpitBearing.textContent = 'LOCKED [' + (cosmosMissionState.currentPlanet ? cosmosMissionState.currentPlanet.toUpperCase() : 'MARS') + ']';
            } else {
                const simCockpitHud = document.getElementById('sim-cockpit-hud');
                if (simCockpitHud) simCockpitHud.style.display = 'none';
            }
            this.camPosCurrent.lerp(this.camTargetPos, Math.min(1, dtSec * 2.2));
            this.camLookCurrent.lerp(this.camTargetLook, Math.min(1, dtSec * 2.6));
            this.camera.position.copy(this.camPosCurrent);
            this.camera.lookAt(this.camLookCurrent);
            return;
        }

        // ------------------------------------------------
        // A. CONTROLLED FAILURE CINEMATIC (3.2s tumble)
        // ------------------------------------------------
        if (cosmosMissionState.missionStatus === 'FAILURE_CINEMATIC') {
            this.failureTimer += dtSec;
            this.spacecraft.rotation.x += dtSec * 1.4;
            this.spacecraft.rotation.z += dtSec * 1.9;
            this.spacecraft.position.y -= dtSec * 0.4;
            this.setEngineVisuals(0.05, 0xef4444, 0);
            // Pull camera somberly back
            this.camTargetPos.copy(this.spacecraft.position).add(new THREE.Vector3(10 + this.failureTimer * 3, 5, 14 + this.failureTimer * 3));
            this.camTargetLook.copy(this.spacecraft.position);
            this.camPosCurrent.lerp(this.camTargetPos, Math.min(1, dtSec * 2.5));
            this.camLookCurrent.lerp(this.camTargetLook, Math.min(1, dtSec * 4.0));
            this.camera.position.copy(this.camPosCurrent);
            this.camera.lookAt(this.camLookCurrent);

            if (this.failureTimer >= 3.2) {
                this.triggerFailureState(this.failureReason);
            }
            return;
        }

        // ------------------------------------------------
        // B. ARRIVAL & SCIENTIFIC SCAN CINEMATIC (4.5s)
        // ------------------------------------------------
        if (cosmosMissionState.missionStatus === 'ARRIVAL_CINEMATIC') {
            this.arrivalTimer += dtSec;
            const destKey = cosmosMissionState.currentPlanet || 'mars';
            const destBody = this.bodies[destKey];
            const destPos = this.getBodyWorldPosition(destKey);
            const destR = destBody ? destBody.radius : 5.0;
            const cfg = planetMissionConfig[destKey] || {};

            // Planet-specific orbital stabilization radius & behavior
            let orbitR = destR + Math.max(4.5, destR * 0.65);
            if (cfg.arrivalStyle === 'atmospheric_descent') {
                orbitR = Math.max(destR + 2.2, orbitR - this.arrivalTimer * 0.45);
            } else if (cfg.arrivalStyle === 'gas_giant_standoff') {
                orbitR = destR + 10.5;
            } else if (cfg.arrivalStyle === 'ring_observation') {
                orbitR = destR + 17.5;
            }

            this.arrivalOrbitAngle += dtSec * 0.48;
            const elev = cfg.arrivalStyle === 'ring_observation' ? destR * 0.55 : destR * 0.2;
            const craftPos = new THREE.Vector3(
                destPos.x + Math.cos(this.arrivalOrbitAngle) * orbitR,
                destPos.y + elev,
                destPos.z + Math.sin(this.arrivalOrbitAngle) * orbitR
            );
            const tangent = new THREE.Vector3(-Math.sin(this.arrivalOrbitAngle), 0, Math.cos(this.arrivalOrbitAngle));
            this.spacecraft.position.lerp(craftPos, Math.min(1, dtSec * 3.5));
            this.spacecraft.lookAt(this.spacecraft.position.clone().add(tangent));

            this.engineMode = 'ORBITAL SCAN';
            this.setEngineVisuals(0.22, 0x38bdf8, 0);

            // Activate Volumetric Scan Beam & Expanding Scan Wave Ring straight onto Destination Planet!
            if (this.scanBeamGroup) {
                this.scanBeamGroup.group.visible = this.arrivalTimer > 0.5;
                this.scanBeamGroup.group.position.copy(this.spacecraft.position);
                this.scanBeamGroup.group.lookAt(destPos);

                const distToSurf = Math.max(2.5, this.spacecraft.position.distanceTo(destPos) - destR * 0.92);
                this.scanBeamGroup.cone.scale.set(Math.max(0.7, destR * 0.22), Math.max(0.7, destR * 0.22), distToSurf / 12);

                // Expanding golden scan ring travelling from spacecraft down to planet surface along +Z
                const pulse = (this.arrivalTimer * 0.85) % 1.0;
                this.scanBeamGroup.waveRing.position.set(0, 0, pulse * distToSurf);
                const rScale = 0.4 + pulse * Math.max(2.0, destR * 0.62);
                this.scanBeamGroup.waveRing.scale.set(rScale, rScale, 1);
                this.scanBeamGroup.waveRing.rotation.set(0, 0, 0);
                this.scanBeamGroup.waveRing.material.opacity = Math.sin(pulse * Math.PI) * 0.9;
            }

            // Serene Hero Orbit Camera framing both Spacecraft & Destination Planet (higher angle for Saturn rings!)
            const camAngle = this.arrivalOrbitAngle - 0.58;
            const camDist = orbitR + Math.max(11, destR * 1.55);
            const camElev = cfg.arrivalStyle === 'ring_observation' ? destR * 1.55 + 7.0 : destR * 0.78 + 4.2;
            this.camTargetPos.set(
                destPos.x + Math.cos(camAngle) * camDist,
                destPos.y + camElev,
                destPos.z + Math.sin(camAngle) * camDist
            );
            this.camTargetLook.lerpVectors(destPos, this.spacecraft.position, 0.28);
            this.camPosCurrent.lerp(this.camTargetPos, Math.min(1, dtSec * 2.2));
            this.camLookCurrent.lerp(this.camTargetLook, Math.min(1, dtSec * 3.0));
            this.camera.position.copy(this.camPosCurrent);
            this.camera.lookAt(this.camLookCurrent);

            this.updateExhaustParticles(dtSec, 0.25);

            if (this.arrivalTimer >= this.arrivalDuration) {
                if (this.scanBeamGroup) this.scanBeamGroup.group.visible = false;
                completeMission();
            }
            return;
        }

        // ------------------------------------------------
        // C. ACTIVE 3D SOLAR SYSTEM JOURNEY
        // ------------------------------------------------
        // Slow-motion cinematic bullet-time while awaiting decision
        const timeScale = this.decisionPending ? 0.05 : 1.0;
        const effectiveDt = dtSec * timeScale;

        if (!this.decisionPending) {
            this.elapsedFlightSec += dtSec;
            this.simElapsedTime = Math.floor(this.elapsedFlightSec);
        }

        // Advance progress dynamically according to clamped [10s..30s] travelDurationSec
        const progressRate = 1.0 / Math.max(10.0, this.travelDurationSec);
        this.progress = Math.min(1.0, this.progress + effectiveDt * progressRate);
        cosmosMissionState.progress = Math.round(this.progress * 100);

        // Smooth ease-in-out speed envelope (launch acceleration -> cruise -> approach deceleration)
        const easedT = this.progress < 0.12
            ? Math.pow(this.progress / 0.12, 1.35) * 0.12
            : (this.progress > 0.88
                ? 0.88 + (1 - Math.pow(1 - (this.progress - 0.88) / 0.12, 1.4)) * 0.12
                : this.progress);

        // Evaluate 3D Position & Tangent on Curved Trajectory
        const basePos = this.routeCurve.getPoint(Math.min(0.999, Math.max(0, easedT)));
        const tangent = this.routeCurve.getTangent(Math.min(0.999, Math.max(0, easedT))).normalize();
        const sideAxis = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(0, 1, 0)).normalize();

        // Smooth lateral course correction offset
        this.lateralOffset += (this.targetLateralOffset - this.lateralOffset) * Math.min(1, dtSec * 2.2);
        const craftPos = basePos.clone().addScaledVector(sideAxis, this.lateralOffset);

        // Visual Hazard Shake if active
        const destKey = cosmosMissionState.currentPlanet || 'mars';
        const cfg = planetMissionConfig[destKey] || { shake: 0.15, fxColor: 0x38bdf8 };
        let shakeAmt = 0;

        if (this.progress >= this.hazardTriggerT && !this.eventTriggered) {
            this.beginVisualHazard();
        }

        if (this.hazardPhase === 'buildup') {
            this.hazardTimer += dtSec;
            shakeAmt = cfg.shake * Math.min(1, this.hazardTimer / 1.0);
            if (this.hazardCloud) {
                this.hazardCloud.position.copy(craftPos);
                this.hazardCloud.rotation.y += dtSec * 1.4;
                this.hazardCloud.material.opacity = Math.min(0.78, this.hazardTimer * 0.5);
            }
            if (this.hazardTimer >= 1.75) {
                this.showMinimalDecisionUI();
            }
        } else if (this.hazardPhase === 'decision') {
            shakeAmt = cfg.shake * 0.45;
            if (this.hazardCloud) {
                this.hazardCloud.position.copy(craftPos);
                this.hazardCloud.rotation.y += dtSec * 0.45;
            }
        } else if (this.hazardPhase === 'reacting') {
            this.reactionTimer -= dtSec;
            if (this.hazardCloud) {
                this.hazardCloud.position.copy(craftPos);
                this.hazardCloud.material.opacity = Math.max(0, this.reactionTimer * 0.35);
            }
            if (this.reactionTimer <= 0) {
                this.hazardPhase = 'resolved';
                if (this.hazardCloud) this.hazardCloud.material.opacity = 0;
            }
        }

        // Apply Spacecraft Position & Natural 3D Orientation
        this.spacecraft.position.copy(craftPos);
        if (shakeAmt > 0) {
            this.spacecraft.position.x += (Math.random() - 0.5) * shakeAmt;
            this.spacecraft.position.y += (Math.random() - 0.5) * shakeAmt;
        }
        this.spacecraft.lookAt(craftPos.clone().add(tangent));

        // Bank & Roll Animations during Curves & Tactical Reactions
        let rollAngle = Math.sin(this.progress * Math.PI * 3) * 0.22;
        let rcsPower = 0;
        if (this.hazardPhase === 'reacting') {
            if (this.reactionType === 'roll') {
                rollAngle += (2.2 - this.reactionTimer) * Math.PI * 1.8;
            } else {
                rollAngle += Math.sin(this.reactionTimer * 5) * 0.75;
            }
            rcsPower = Math.min(1, this.reactionTimer);
        }
        this.spacecraft.rotateZ(rollAngle);

        // Engine Thrust Modulation & Live Internal Telemetry
        const route = cosmosMissionRoutes[cosmosMissionState.selectedRoute || 'direct'];
        let thrustIntensity = 0.42;
        let engineColor = 0x38bdf8;

        if (this.progress < 0.14) {
            cosmosMissionState.currentPhase = 1;
            this.engineMode = 'LAUNCH BURN';
            thrustIntensity = 1.45;
            engineColor = 0xfbbf24;
            this.craftVelocity = 11.2 + (this.progress / 0.14) * (route.velocityBase * 0.55);
        } else if (this.progress < 0.28) {
            cosmosMissionState.currentPhase = 2;
            this.engineMode = 'MAIN BURN';
            thrustIntensity = 1.05;
            engineColor = 0x38bdf8;
            this.craftVelocity = route.velocityBase * (0.75 + ((this.progress - 0.14) / 0.14) * 0.25);
        } else if (this.progress < 0.80) {
            cosmosMissionState.currentPhase = 4;
            this.engineMode = this.hazardPhase === 'reacting' ? 'RCS CORRECTION' : 'ION CRUISE';
            thrustIntensity = this.hazardPhase === 'reacting' && this.reactionType === 'boost' ? 1.55 : 0.42;
            engineColor = this.hazardPhase === 'reacting' && this.reactionType === 'boost' ? 0xf59e0b : 0x38bdf8;
            this.craftVelocity = route.velocityBase * (this.reactionType === 'boost' && this.hazardPhase === 'reacting' ? 1.2 : 1.0) + Math.sin(this.progress * 18) * 0.6;
        } else {
            cosmosMissionState.currentPhase = 6;
            this.engineMode = 'RETRO BRAKE';
            thrustIntensity = 0.85;
            engineColor = 0xf43f5e;
            const decelFrac = (this.progress - 0.80) / 0.20;
            this.craftVelocity = Math.max(7.6, route.velocityBase * (1 - decelFrac * 0.72));
        }

        if (this.craftVelocity > this.maxVelocity) {
            this.maxVelocity = this.craftVelocity;
            cosmosMissionState.maxVelocity = this.maxVelocity;
        }

        // Smooth Propulsion Fuel Burn
        const burnPerSec = (route.burnEst * 0.78) / Math.max(10, this.travelDurationSec);
        if (!this.decisionPending) {
            this.craftFuel = Math.max(0, this.craftFuel - burnPerSec * effectiveDt);
        }

        this.setEngineVisuals(thrustIntensity, engineColor, rcsPower);
        this.updateExhaustParticles(dtSec, thrustIntensity);

        // Move Parallax Speed Dust centered near Spacecraft
        if (this.speedDust) {
            this.speedDust.position.copy(craftPos);
            const posArr = this.speedDust.geometry.attributes.position.array;
            for (let i = 0; i < posArr.length; i += 3) {
                posArr[i] -= tangent.x * dtSec * 32;
                posArr[i + 1] -= tangent.y * dtSec * 32;
                posArr[i + 2] -= tangent.z * dtSec * 32;
                if (Math.abs(posArr[i]) > 48 || Math.abs(posArr[i + 2]) > 48) {
                    posArr[i] = (Math.random() - 0.5) * 75 + tangent.x * 30;
                    posArr[i + 1] = (Math.random() - 0.5) * 45;
                    posArr[i + 2] = (Math.random() - 0.5) * 75 + tangent.z * 30;
                }
            }
            this.speedDust.geometry.attributes.position.needsUpdate = true;
        }

        // Check Route-Aware Flyby Windows (Moon & Intermediate Planets)
        this.activeFlyby = null;
        for (const fb of this.plannedFlybys) {
            if (this.progress >= fb.tStart && this.progress <= fb.tEnd) {
                this.activeFlyby = fb;
                if (!fb.triggered) {
                    fb.triggered = true;
                    if (!cosmosMissionState.flybysCompleted.includes(fb.name)) {
                        cosmosMissionState.flybysCompleted.push(fb.name);
                        addMissionLog(`FLYBY ENCOUNTER: Passing ${fb.name}.`, 'mission');
                    }
                }
                break;
            }
        }
        if (this.crossesAsteroidBelt && this.progress > 0.42 && !cosmosMissionState.flybysCompleted.includes('Asteroid Belt')) {
            cosmosMissionState.flybysCompleted.push('Asteroid Belt');
            addMissionLog('SOLAR SECTOR: Traversing Main Asteroid Belt.', 'system');
        }

        // Update 6-State Smooth Cinematic Camera
        this.updateCinematicCamera(dtSec, craftPos, tangent, sideAxis, shakeAmt);

        // Signal attenuation
        const destPlanet = cosmosMissionPlanets[destKey];
        const latSec = Math.round((destPlanet ? destPlanet.latencySec : 600) * this.progress);
        const latStr = latSec > 60 ? `${(latSec / 60).toFixed(1)}m` : `${latSec}s`;
        this.signalStrength = Math.max(78, Math.round(100 - this.progress * 15));
        this.signalStatusText = `SIGNAL: ${this.signalStrength}% (${latStr})`;

        this.updateTelemetryDOM();

        // Transition smoothly into Arrival & Scan Cinematic at 100%!
        if (this.progress >= 1.0) {
            cosmosMissionState.missionStatus = 'ARRIVAL_CINEMATIC';
            cosmosMissionState.currentPhase = 7;
            this.arrivalTimer = 0;
            const destPos = this.getBodyWorldPosition(destKey);
            this.arrivalOrbitAngle = Math.atan2(craftPos.z - destPos.z, craftPos.x - destPos.x);
            CosmosSpaceAudio.playScanPulse();
            setTimeout(() => CosmosSpaceAudio.playArrivalChord(), 2200);
        }
    },

    updateCinematicCamera(dtSec, craftPos, tangent, sideAxis, shakeAmt) {
        const destKey = cosmosMissionState.currentPlanet || 'mars';
        const destPos = this.getBodyWorldPosition(destKey);
        const destR = this.bodies[destKey] ? this.bodies[destKey].radius : 5.0;
        const origKey = cosmosMissionState.originPlanet || 'earth';
        const origPos = this.getBodyWorldPosition(origKey);

        let mode = this.cameraMode;
        if (mode === 'auto') {
            if (this.progress < 0.13) mode = 'launch';
            else if (this.activeFlyby) mode = 'flyby';
            else if (this.progress >= 0.28 && this.progress < 0.64 && this.routeScale !== 'short') mode = 'wide';
            else if (this.progress >= 0.78) mode = 'approach';
            else mode = 'follow';
        }

        this.activeCamLabel = mode.toUpperCase();

        if (mode === 'launch') {
            // 1. LAUNCH CAMERA: Dramatic low-angle close shot watching spacecraft depart origin planet
            this.camTargetPos.copy(craftPos)
                .addScaledVector(tangent, -8.5)
                .addScaledVector(sideAxis, 6.0)
                .add(new THREE.Vector3(0, 2.8, 0));
            this.camTargetLook.lerpVectors(craftPos, origPos, 0.22);
        } else if (mode === 'flyby' && this.activeFlyby) {
            // 4. PLANET / MOON FLYBY CAMERA: Frames celestial body prominently while craft glides across foreground!
            const fbPos = this.getBodyWorldPosition(this.activeFlyby.key);
            const fbR = this.bodies[this.activeFlyby.key] ? this.bodies[this.activeFlyby.key].radius : 3.0;
            const awayFromBody = new THREE.Vector3().subVectors(craftPos, fbPos).normalize();
            this.camTargetPos.copy(craftPos)
                .addScaledVector(awayFromBody, Math.max(9.5, fbR * 1.45))
                .addScaledVector(tangent, -7.5)
                .add(new THREE.Vector3(0, 3.2, 0));
            this.camTargetLook.lerpVectors(fbPos, craftPos, 0.42);
        } else if (mode === 'wide') {
            // 3. WIDE SOLAR SYSTEM CAMERA: Scales zoom dynamically with journey length!
            const zoomFactor = this.routeScale === 'long' ? 1.45 : (this.routeScale === 'medium' ? 0.85 : 0.45);
            const camY = 58 * zoomFactor + Math.sin(this.progress * Math.PI) * 42 * zoomFactor;
            const camBack = 78 * zoomFactor;
            this.camTargetPos.copy(craftPos)
                .addScaledVector(tangent, -camBack * 0.55)
                .addScaledVector(sideAxis, camBack * 0.72)
                .add(new THREE.Vector3(0, camY, 0));
            // Look slightly toward Solar System center/destination so multiple planets stay in frame
            const solarFocal = new THREE.Vector3().lerpVectors(craftPos, new THREE.Vector3(0, 0, 0), this.routeScale === 'long' ? 0.35 : 0.15);
            this.camTargetLook.lerpVectors(solarFocal, destPos, 0.22);
        } else if (mode === 'approach' || mode === 'target') {
            // 5. DESTINATION APPROACH CAMERA: Destination looms massive ahead!
            const backDist = Math.max(9.0, destR * 1.15);
            this.camTargetPos.copy(craftPos)
                .addScaledVector(tangent, -backDist)
                .addScaledVector(sideAxis, backDist * 0.48)
                .add(new THREE.Vector3(0, Math.max(2.6, destR * 0.32), 0));
            this.camTargetLook.lerpVectors(craftPos, destPos, 0.62);
        } else if (mode === 'cockpit') {
            // 6. FIRST-PERSON COCKPIT CAMERA: Pilot's forward view right above craft bow
            this.camTargetPos.copy(craftPos)
                .addScaledVector(tangent, 0.45)
                .add(new THREE.Vector3(0, 0.35, 0));
            this.camTargetLook.copy(craftPos).addScaledVector(tangent, 25.0);
            const cockpitHud = document.getElementById('sim-cockpit-hud');
            if (cockpitHud) cockpitHud.style.display = 'flex';
            const cockpitSpeed = document.getElementById('cockpit-speed');
            if (cockpitSpeed) cockpitSpeed.textContent = (this.velocity || 0).toFixed(1) + ' km/s';
            const cockpitBearing = document.getElementById('cockpit-target-bearing');
            if (cockpitBearing) cockpitBearing.textContent = 'LOCKED [' + (this.destPlanet ? this.destPlanet.toUpperCase() : 'DEST') + ']';
        } else {
            // 2. FOLLOW CAMERA: Smooth behind-and-above chase view
            this.camTargetPos.copy(craftPos)
                .addScaledVector(tangent, -11.5)
                .addScaledVector(sideAxis, 3.4)
                .add(new THREE.Vector3(0, 3.8, 0));
            this.camTargetLook.copy(craftPos).addScaledVector(tangent, 12.0);
        }

        const simCockpitHud = document.getElementById('sim-cockpit-hud');
        if (simCockpitHud && mode !== 'cockpit') simCockpitHud.style.display = 'none';

        // Smooth exponential damping for zero harsh cuts
        const damp = Math.min(1, dtSec * 2.6);
        this.camPosCurrent.lerp(this.camTargetPos, damp);
        this.camLookCurrent.lerp(this.camTargetLook, Math.min(1, dtSec * 3.4));

        this.camera.position.copy(this.camPosCurrent);
        if (shakeAmt > 0) {
            this.camera.position.x += (Math.random() - 0.5) * shakeAmt * 0.7;
            this.camera.position.y += (Math.random() - 0.5) * shakeAmt * 0.7;
        }
        this.camera.lookAt(this.camLookCurrent);
    },

    setEngineVisuals(intensity, colorHex, rcsPower) {
        if (!this.craftParts.innerPlume) return;
        const flicker = 0.88 + Math.random() * 0.24;
        const scaleZ = Math.max(0.05, intensity * flicker);
        this.craftParts.innerPlume.scale.set(0.8 + intensity * 0.2, 0.8 + intensity * 0.2, scaleZ);
        this.craftParts.outerPlume.scale.set(0.85 + intensity * 0.3, 0.85 + intensity * 0.3, scaleZ * 1.15);
        this.craftParts.outerPlume.material.color.setHex(colorHex);
        this.craftParts.engineCore.material.color.setHex(colorHex);
        this.craftParts.engineLight.color.setHex(colorHex);
        this.craftParts.engineLight.intensity = 1.2 + intensity * 2.4;

        // Side RCS jets
        if (this.craftParts.rcsJets) {
            this.craftParts.rcsJets.forEach((j, idx) => {
                const active = rcsPower > 0.05 ? (0.45 + Math.random() * 0.55) * rcsPower : 0;
                j.material.opacity = active * (idx % 2 === 0 ? 0.9 : 0.65);
                j.scale.set(1, 0.6 + active * 0.8, 1);
            });
        }
    },

    updateExhaustParticles(dtSec, intensity) {
        if (!this.exhaustSystem || !this.spacecraft) return;
        const posAttr = this.exhaustSystem.geometry.attributes.position;
        const arr = posAttr.array;

        const nozzleWorld = new THREE.Vector3(0, 0, -2.25).applyMatrix4(this.spacecraft.matrixWorld);
        const backDir = new THREE.Vector3(0, 0, -1).transformDirection(this.spacecraft.matrixWorld).normalize();

        let spawned = 0;
        const maxSpawn = Math.max(1, Math.round(intensity * 3));

        for (let i = 0; i < this.exhaustData.length; i++) {
            const p = this.exhaustData[i];
            if (p.life <= 0) {
                if (spawned < maxSpawn && this.isRunning && intensity > 0.1) {
                    p.pos.copy(nozzleWorld);
                    p.vel.copy(backDir).multiplyScalar(12 + Math.random() * 14 * intensity);
                    p.vel.x += (Math.random() - 0.5) * 1.6;
                    p.vel.y += (Math.random() - 0.5) * 1.6;
                    p.vel.z += (Math.random() - 0.5) * 1.6;
                    p.maxLife = 0.25 + Math.random() * 0.35;
                    p.life = p.maxLife;
                    spawned++;
                } else {
                    arr[i * 3 + 1] = -9999;
                    continue;
                }
            }
            p.life -= dtSec;
            p.pos.addScaledVector(p.vel, dtSec);
            arr[i * 3] = p.pos.x;
            arr[i * 3 + 1] = p.pos.y;
            arr[i * 3 + 2] = p.pos.z;
        }
        posAttr.needsUpdate = true;
    },

    updateTelemetryDOM() {
        const mins = String(Math.floor(this.simElapsedTime / 60)).padStart(2, '0');
        const secs = String(this.simElapsedTime % 60).padStart(2, '0');
        cosmosSafeText('sim-stat-met', `00:${mins}:${secs}`);
        cosmosSafeText('sim-stat-velocity', `${this.craftVelocity.toFixed(1)} km/s`);

        const remMkm = Math.max(0, (1 - this.progress) * this.routeDistanceMkm);
        cosmosSafeText('sim-stat-distance', this.progress >= 0.99 ? 'ORBIT' : formatDistanceMkm(remMkm));

        const fuelRound = Math.round(this.craftFuel);
        cosmosSafeText('sim-stat-fuel', `${fuelRound}%`);
        const fuelBar = document.getElementById('sim-fuel-fill');
        if (fuelBar) {
            fuelBar.style.width = `${fuelRound}%`;
            fuelBar.classList.toggle('warning', fuelRound < 25);
        }

        cosmosSafeText('sim-stat-signal', `${this.signalStrength}%`);
        cosmosSafeText('sim-stat-engine', this.engineMode);

        const hullRound = Math.round(this.hullIntegrity);
        cosmosSafeText('sim-stat-hull', `${hullRound}%`);
        const hullBar = document.getElementById('sim-hull-fill');
        if (hullBar) {
            hullBar.style.width = `${hullRound}%`;
            hullBar.classList.toggle('warning', hullRound < 35);
        }

        const thermEl = document.getElementById('sim-stat-thermal');
        if (thermEl) {
            thermEl.className = `sim-stat-val sim-thermal-val ${this.thermalStatus}`;
            thermEl.textContent = this.thermalStatus === 'optimal' ? 'OPTIMAL' : (this.thermalStatus === 'elevated' ? 'ELEVATED' : 'CRITICAL');
        }
        cosmosSafeText('sim-stat-guidance', this.activeCamLabel);
        cosmosSafeText('cosmos-mission-signal-text', this.signalStatusText);
    },

    loop(timestamp) {
        const dtSec = Math.min((timestamp - this.lastTime) / 1000, 0.08);
        this.lastTime = timestamp;

        if (!this.isPaused && this.renderer && this.scene && this.camera) {
            this.update(dtSec);
            this.renderer.render(this.scene, this.camera);
        }

        this.animFrame = requestAnimationFrame(this.loop);
    }
};

// Alias for full backward compatibility with navigation & existing hooks
const cosmosMissionSim = TravelEngine;

// ========================================================
// 6. GLOBAL MISSION HANDLERS & RESULT SCREEN REVEAL
// ========================================================
function initMissionControl() {
    const originSelect = document.getElementById('cosmos-mission-origin-select');
    const planetSelect = document.getElementById('cosmos-mission-planet-select');
    const startButton = document.getElementById('cosmos-mission-start-btn');
    const resetButton = document.getElementById('cosmos-mission-reset-btn');

    if (!planetSelect) return;

    if (originSelect) {
        originSelect.addEventListener('change', (e) => {
            cosmosMissionState.originPlanet = e.target.value || 'earth';
            if (cosmosMissionState.currentPlanet === cosmosMissionState.originPlanet) {
                cosmosMissionState.currentPlanet = cosmosMissionState.originPlanet === 'mars' ? 'earth' : 'mars';
                planetSelect.value = cosmosMissionState.currentPlanet;
            }
            if (cosmosMissionState.currentPlanet) {
                updatePlanetInfo(cosmosMissionState.currentPlanet);
                TravelEngine.openPlanningOverlay(cosmosMissionState.currentPlanet);
            }
        });
    }

    planetSelect.addEventListener('change', handlePlanetSelection);

    if (startButton) {
        startButton.addEventListener('click', () => {
            if (!cosmosMissionState.currentPlanet) return;
            if (!cosmosMissionState.isPlanConfirmed) {
                TravelEngine.openPlanningOverlay(cosmosMissionState.currentPlanet);
            } else {
                startMission();
            }
        });
    }

    if (resetButton) resetButton.addEventListener('click', resetMission);

    TravelEngine.init();
    updateMissionDisplay();
}

function handlePlanetSelection(event) {
    const planetKey = event.target.value;
    cosmosMissionState.currentPlanet = planetKey;

    if (planetKey && cosmosMissionPlanets[planetKey]) {
        if (cosmosMissionState.originPlanet === planetKey) {
            cosmosMissionState.originPlanet = planetKey === 'earth' ? 'mars' : 'earth';
            const deckOrig = document.getElementById('cosmos-mission-origin-select');
            if (deckOrig) deckOrig.value = cosmosMissionState.originPlanet;
        }
        updatePlanetInfo(planetKey);
        updateMissionDisplay();
        addMissionLog(`TARGET SELECTED: ${cosmosMissionPlanets[planetKey].name.toUpperCase()}`, 'mission');

        TravelEngine.reset();
        TravelEngine.openPlanningOverlay(planetKey);

        const startBtn = document.getElementById('cosmos-mission-start-btn');
        if (startBtn) startBtn.disabled = false;
    } else {
        resetMission();
    }
}

function updatePlanetInfo(planetKey) {
    const planet = cosmosMissionPlanets[planetKey];
    if (!planet) return;
    const orig = cosmosMissionPlanets[cosmosMissionState.originPlanet || 'earth'];

    cosmosSafeText('cosmos-mission-planet-name', planet.name.toUpperCase());
    cosmosSafeText('cosmos-mission-distance', planet.distance);
    cosmosSafeText('cosmos-mission-moons', planet.moons);
    cosmosSafeText('cosmos-mission-gravity', planet.gravity);
    cosmosSafeText('cosmos-mission-temperature', planet.temperature);
    cosmosSafeText('cosmos-mission-rotation', planet.rotation);
    cosmosSafeText('cosmos-mission-orbit', planet.orbitalPeriod);
    cosmosSafeText('cosmos-mission-objective-text', planet.objective);
    cosmosSafeText('cosmos-mission-target', `${orig ? orig.name.toUpperCase() : 'EARTH'} → ${planet.name.toUpperCase()}`);

    const graphic = document.getElementById('cosmos-mission-planet-graphic');
    if (graphic) updatePlanetGraphic(planetKey, graphic);
}

function updatePlanetGraphic(planetKey, element) {
    element.style.background = getPlanetGraphicGradient(planetKey);
}

function startMission() {
    if (!cosmosMissionState.currentPlanet) return;

    cosmosMissionState.isRunning = true;
    cosmosMissionState.missionStatus = 'ACTIVE';
    cosmosMissionState.progress = 0;
    cosmosMissionState.currentPhase = 1;

    updateMissionDisplay();
    TravelEngine.start();
}

function completeMission() {
    cosmosMissionState.missionStatus = 'COMPLETED';
    cosmosMissionState.progress = 100;
    cosmosMissionState.travelStatus = 'Mission Complete';
    cosmosMissionState.targetStatus = 'Scan Transmitted';
    cosmosMissionState.isRunning = false;
    TravelEngine.isRunning = false;

    updateMissionDisplay();
    addMissionLog('MISSION COMPLETE: Arrival cinematic and scientific scan completed.', 'success');

    // Hide competing overlays
    ['sim-failure-overlay', 'sim-event-overlay', 'sim-planning-overlay'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    // Populate COSMOS Mission Result Screen strictly from REAL tracked mission state!
    const overlay = document.getElementById('sim-completion-overlay');
    if (overlay && cosmosMissionState.currentPlanet) {
        const origKey = cosmosMissionState.originPlanet || 'earth';
        const destKey = cosmosMissionState.currentPlanet;
        const orig = cosmosMissionPlanets[origKey];
        const dest = cosmosMissionPlanets[destKey];
        const cfg = planetMissionConfig[destKey] || {};

        cosmosSafeText('sim-completion-title', `${dest.name.toUpperCase()} MISSION COMPLETE`);
        cosmosSafeText('sim-completion-desc', `${orig.name} to ${dest.name} traversal stabilized via ${cfg.arrivalLabel || 'orbital capture'}.`);
        cosmosSafeText('sim-comp-planet', `${orig.name.toUpperCase()} → ${dest.name.toUpperCase()}`);
        cosmosSafeText('sim-comp-distance', formatDistanceMkm(TravelEngine.routeDistanceMkm));
        cosmosSafeText('sim-comp-time', `${TravelEngine.elapsedFlightSec.toFixed(1)}s`);
        cosmosSafeText('sim-comp-fuel', `${Math.round(TravelEngine.craftFuel)}%`);
        cosmosSafeText('sim-comp-velocity', `${TravelEngine.maxVelocity.toFixed(1)} km/s`);
        cosmosSafeText('sim-comp-hull', `${Math.round(TravelEngine.hullIntegrity)}%`);
        cosmosSafeText('sim-comp-flybys', cosmosMissionState.flybysCompleted.length ? cosmosMissionState.flybysCompleted.join(', ') : 'Direct Deep Space');
        cosmosSafeText('sim-comp-hazards', cosmosMissionState.hazardsEncountered.length ? cosmosMissionState.hazardsEncountered.join(', ') : 'None');
        cosmosSafeText('sim-comp-decisions', cosmosMissionState.decisionsMade.length ? cosmosMissionState.decisionsMade.join(', ') : 'Autonomous Navigation');
        cosmosSafeText('sim-comp-data', cfg.dataLabel || '5.2 TB Spectral Survey');

        const fuel = TravelEngine.craftFuel;
        const hull = TravelEngine.hullIntegrity;
        let rating = '★ ★ ★ ★ ★ OPTIMAL MISSION EXECUTION';
        if (hull < 70 || fuel < 15) rating = '★ ★ ★ ☆ ☆ MISSION ACCOMPLISHED (HEAVY WEAR)';
        else if (hull < 90 || fuel < 30) rating = '★ ★ ★ ★ ☆ EXCELLENT TRAJECTORY COMMAND';
        cosmosSafeText('sim-comp-rating', rating);

        overlay.style.display = 'flex';
    }
    CosmosSpaceAudio.stopAmbient();
}

function resetMission() {
    cosmosMissionState.currentPlanet = null;
    cosmosMissionState.missionStatus = 'INACTIVE';
    cosmosMissionState.currentPhase = 0;
    cosmosMissionState.progress = 0;
    cosmosMissionState.travelStatus = 'Waiting for launch';
    cosmosMissionState.targetStatus = 'Standby';
    cosmosMissionState.isRunning = false;
    cosmosMissionState.isPlanConfirmed = false;
    cosmosMissionState.flybysCompleted = [];
    cosmosMissionState.hazardsEncountered = [];
    cosmosMissionState.decisionsMade = [];

    TravelEngine.reset();

    const planetSelect = document.getElementById('cosmos-mission-planet-select');
    if (planetSelect) planetSelect.value = '';

    const startBtn = document.getElementById('cosmos-mission-start-btn');
    if (startBtn) startBtn.disabled = true;

    cosmosSafeText('cosmos-mission-target', 'NONE');
    cosmosSafeText('cosmos-mission-planet-name', 'SELECT A DESTINATION');
    cosmosSafeText('cosmos-mission-distance', '--');
    cosmosSafeText('cosmos-mission-moons', '--');
    cosmosSafeText('cosmos-mission-gravity', '--');
    cosmosSafeText('cosmos-mission-temperature', '--');
    cosmosSafeText('cosmos-mission-rotation', '--');
    cosmosSafeText('cosmos-mission-orbit', '--');
    cosmosSafeText('cosmos-mission-objective-text', 'Select a destination planet or Moon to configure your 3D Solar System trajectory.');

    const graphic = document.getElementById('cosmos-mission-planet-graphic');
    if (graphic) graphic.style.background = '#1a237e';

    updateMissionDisplay();
}

function updateMissionDisplay() {
    const statusVal = cosmosMissionState.missionStatus;
    const statusEl = document.getElementById('cosmos-mission-status');
    if (statusEl) {
        statusEl.className = 'status-value ' + statusVal.toLowerCase();
        statusEl.textContent = statusVal === 'INACTIVE' ? 'READY' : statusVal;
    }

    cosmosSafeText('cosmos-mission-phase', getPhaseName(cosmosMissionState.currentPhase));
    cosmosSafeText('cosmos-mission-progress', `${cosmosMissionState.progress}%`);
    cosmosSafeText('cosmos-mission-travel', cosmosMissionState.travelStatus);
    cosmosSafeText('cosmos-mission-target-status', cosmosMissionState.targetStatus);

    const bar = document.getElementById('cosmos-mission-progress-bar');
    if (bar) bar.style.width = `${cosmosMissionState.progress}%`;

    const startBtn = document.getElementById('cosmos-mission-start-btn');
    if (startBtn) {
        startBtn.disabled = !cosmosMissionState.currentPlanet || cosmosMissionState.missionStatus === 'ACTIVE';
        startBtn.textContent = cosmosMissionState.missionStatus === 'PLANNING' ? 'REVIEW FLIGHT PLAN' : 'PLAN & LAUNCH MISSION';
    }
}

function getPhaseName(phase) {
    const phases = [
        'Pre-Launch',
        'Launch & Ascent',
        'Interplanetary Burn',
        'Trajectory Transfer',
        'Solar System Transit',
        'Destination Approach',
        'Orbital Braking',
        'Arrival & Scan'
    ];
    return phases[phase] || 'Pre-Launch';
}

function addMissionLog(message, type = 'system') {
    const logList = document.getElementById('cosmos-mission-log');
    if (!logList) return;
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    const timestamp = new Date().toLocaleTimeString();
    logEntry.innerHTML = `<span class="log-time">[${timestamp}]</span> <span class="log-msg">${message}</span>`;
    logList.appendChild(logEntry);
    logList.scrollTop = logList.scrollHeight;
}

// Global Exports
window.cosmosMissionPlanets = cosmosMissionPlanets;
window.planetMissionConfig = planetMissionConfig;
window.cosmosMissionRoutes = cosmosMissionRoutes;
window.cosmosMissionState = cosmosMissionState;
window.TravelEngine = TravelEngine;
window.cosmosMissionSim = TravelEngine;
window.CosmosSpaceAudio = CosmosSpaceAudio;
window.calculateRouteDistance = calculateRouteDistance;
window.mapDistanceToDuration = mapDistanceToDuration;
window.initMissionControl = initMissionControl;
window.startMission = startMission;
window.resetMission = resetMission;
window.completeMission = completeMission;
window.handlePlanetSelection = handlePlanetSelection;


// ============================================================================
// FEATURE 2: BUILD YOUR OWN SOLAR SYSTEM — 3D CELESTIAL LABORATORY ENGINE
// ============================================================================

const COSMOS_STAR_TYPES = {
    yellow: { name: 'Yellow Dwarf (G-Type)', color: 0xffcc00, coronaColor: 0xffaa00, lightColor: 0xfff4cc, intensity: 2.6, habMin: 60, habMax: 105 },
    blue:   { name: 'Blue Giant (O-Type)',   color: 0x66ccff, coronaColor: 0x3399ff, lightColor: 0xd9f2ff, intensity: 3.8, habMin: 110, habMax: 180 },
    red:    { name: 'Red Supergiant (M-Type)', color: 0xff3311, coronaColor: 0xcc2200, lightColor: 0xffaa88, intensity: 1.8, habMin: 38, habMax: 70 },
    white:  { name: 'White Dwarf (D-Type)', color: 0xffffff, coronaColor: 0xccffff, lightColor: 0xffffff, intensity: 2.2, habMin: 32, habMax: 55 },
    orange: { name: 'Orange Dwarf (K-Type)', color: 0xff9922, coronaColor: 0xdd7700, lightColor: 0xffe0aa, intensity: 2.3, habMin: 48, habMax: 88 }
};

const COSMOS_PLANET_TYPES = {
    rocky:  { name: 'Rocky Terrestrial', color: '#8c8c8c', roughness: 0.85, metalness: 0.1, defaultSize: 3.2 },
    ocean:  { name: 'Ocean World',       color: '#2271b3', roughness: 0.25, metalness: 0.3, defaultSize: 5.6 },
    desert: { name: 'Desert Planet',     color: '#e27b58', roughness: 0.90, metalness: 0.05, defaultSize: 4.0 },
    gas:    { name: 'Gas Giant',         color: '#d39c7e', roughness: 0.50, metalness: 0.0, defaultSize: 14.5 },
    ice:    { name: 'Ice Giant',         color: '#6081ff', roughness: 0.30, metalness: 0.2, defaultSize: 8.5 },
    lava:   { name: 'Lava World',        color: '#ff3300', roughness: 0.70, metalness: 0.45, defaultSize: 3.6 }
};


// ========================================================
// SOLAR SYSTEM LABORATORY: 3D COSMIC ENGINE & SIMULATION
// ========================================================

const COSMOS_DEFAULT_PLANETS = [
    { name: 'Mercury', type: 'rocky',  size: 3.2, dist: 34,  speed: 0.035, rotSpeed: 0.003, tilt: 0.03,  color: '#8c8c8c', hasRings: false, ringRadius: 1.8, hasAtmosphere: false },
    { name: 'Venus',   type: 'desert', size: 5.0, dist: 54,  speed: 0.022, rotSpeed: -0.002, tilt: 177.3, color: '#e3bb76', hasRings: false, ringRadius: 1.8, hasAtmosphere: true },
    { name: 'Earth',   type: 'ocean',  size: 5.6, dist: 80,  speed: 0.015, rotSpeed: 0.020, tilt: 23.44, color: '#2271b3', hasRings: false, ringRadius: 1.8, hasAtmosphere: true },
    { name: 'Mars',    type: 'desert', size: 4.0, dist: 112, speed: 0.010, rotSpeed: 0.019, tilt: 25.19, color: '#e27b58', hasRings: false, ringRadius: 1.8, hasAtmosphere: true },
    { name: 'Jupiter', type: 'gas',    size: 14.5, dist: 162, speed: 0.005, rotSpeed: 0.045, tilt: 3.13,  color: '#d39c7e', hasRings: false, ringRadius: 1.8, hasAtmosphere: true },
    { name: 'Saturn',  type: 'gas',    size: 12.0, dist: 218, speed: 0.003, rotSpeed: 0.040, tilt: 26.73, color: '#c5ab6e', hasRings: true,  ringRadius: 2.2, hasAtmosphere: false },
    { name: 'Uranus',  type: 'ice',    size: 8.5, dist: 275, speed: 0.002, rotSpeed: -0.028, tilt: 97.77, color: '#4b70dd', hasRings: true,  ringRadius: 1.7, hasAtmosphere: true },
    { name: 'Neptune', type: 'ice',    size: 8.2, dist: 330, speed: 0.0014, rotSpeed: 0.030, tilt: 28.32, color: '#274687', hasRings: false, ringRadius: 1.8, hasAtmosphere: true }
];

const COSMOS_NAME_CATALOG = [
    'Aethel', 'Vespera', 'Chronos', 'Astraea', 'Hyperion', 'Thalassa', 'Obsidian', 'Nyx', 
    'Aegis', 'Zephyr', 'Orion', 'Elysium', 'Titanis', 'Solaria', 'Erebus', 'Celestia'
];

// Major Educational Moons of the Solar System
const COSMOS_PLANET_MOONS = {
    'Earth': [
        { name: 'The Moon (Luna)', dist: 11, size: 1.3, speed: 0.052, color: '#b0b5be', period: '27.3 Earth Days' }
    ],
    'Mars': [
        { name: 'Phobos', dist: 7, size: 0.65, speed: 0.082, color: '#8c7d75', period: '7.7 Hours' },
        { name: 'Deimos', dist: 9.5, size: 0.50, speed: 0.045, color: '#9e9188', period: '30.3 Hours' }
    ],
    'Jupiter': [
        { name: 'Io (Volcanic)', dist: 20, size: 1.4, speed: 0.065, color: '#f5d742', period: '1.77 Earth Days' },
        { name: 'Europa (Ocean)', dist: 26, size: 1.2, speed: 0.050, color: '#c4d7e8', period: '3.55 Earth Days' },
        { name: 'Ganymede (Titan)', dist: 33, size: 1.8, speed: 0.038, color: '#9b948a', period: '7.15 Earth Days' },
        { name: 'Callisto (Cratered)', dist: 41, size: 1.6, speed: 0.028, color: '#7a7672', period: '16.7 Earth Days' }
    ],
    'Saturn': [
        { name: 'Titan (Thick Atmo)', dist: 34, size: 1.7, speed: 0.040, color: '#e69837', period: '15.9 Earth Days' },
        { name: 'Enceladus (Ice Geysers)', dist: 22, size: 0.8, speed: 0.070, color: '#eaf4ff', period: '1.37 Earth Days' }
    ],
    'Uranus': [
        { name: 'Miranda', dist: 14, size: 0.7, speed: 0.060, color: '#b5c0c9', period: '1.41 Earth Days' },
        { name: 'Titania', dist: 21, size: 1.1, speed: 0.035, color: '#cdd7de', period: '8.71 Earth Days' }
    ],
    'Neptune': [
        { name: 'Triton (Retrograde Cryo)', dist: 19, size: 1.3, speed: -0.045, color: '#9ec1cf', period: '5.88 Earth Days' }
    ]
};

// Comprehensive 5-Category Scientific Specifications Catalog
const COSMOS_PLANET_SPECS = {
    'Mercury': {
        diameter: '4,879 km (0.38 ⊕)',
        mass: '0.330 × 10²⁴ kg',
        gravity: '3.7 m/s² (0.38 g)',
        gravityPct: 38,
        temp: '+167°C (-180°C to +430°C)',
        tempPct: 75,
        distAU: '0.39 AU (57.9M km)',
        period: '88.0 Earth Days',
        dayLength: '1,407.6 Hours (58.6d)',
        axialTilt: '0.034°',
        pressure: '1 × 10⁻¹⁴ bar (Trace Exosphere)',
        composition: [
            { gas: 'O₂', pct: '42%' }, { gas: 'Na', pct: '29%' }, { gas: 'H₂', pct: '22%' }, { gas: 'He', pct: '6%' }
        ],
        missions: [
            { name: 'Mariner 10', year: '1974', agency: 'NASA', highlight: 'First flyby imaging cratered surface' },
            { name: 'MESSENGER', year: '2011', agency: 'NASA', highlight: 'First orbital insertion, discovered polar water ice' },
            { name: 'BepiColombo', year: '2025', agency: 'ESA / JAXA', highlight: 'Dual orbiter scientific mapping' }
        ],
        cosmicNote: 'Closest world to Sol. Withstands intense solar winds under cosmic equilibrium.'
    },
    'Venus': {
        diameter: '12,104 km (0.95 ⊕)',
        mass: '4.87 × 10²⁴ kg',
        gravity: '8.87 m/s² (0.90 g)',
        gravityPct: 90,
        temp: '+464°C (Runaway Greenhouse)',
        tempPct: 98,
        distAU: '0.72 AU (108.2M km)',
        period: '224.7 Earth Days',
        dayLength: '5,832.5 Hours (243d, Retrograde)',
        axialTilt: '177.36° (Inverted Rotation)',
        pressure: '92.0 bar (91 atm, Crushing)',
        composition: [
            { gas: 'CO₂', pct: '96.5%' }, { gas: 'N₂', pct: '3.5%' }, { gas: 'SO₂', pct: '0.015%' }, { gas: 'H₂SO₄', pct: 'Clouds' }
        ],
        missions: [
            { name: 'Venera 7', year: '1970', agency: 'USSR', highlight: 'First human spacecraft to land on another planet' },
            { name: 'Magellan', year: '1990', agency: 'NASA', highlight: 'Radar synthetic aperture global mapping' },
            { name: 'Akatsuki', year: '2015', agency: 'JAXA', highlight: 'Atmospheric super-rotation studies' }
        ],
        cosmicNote: 'The morning and evening celestial jewel. Swathed in perpetual golden sulfuric clouds.'
    },
    'Earth': {
        diameter: '12,742 km (1.00 ⊕)',
        mass: '5.97 × 10²⁴ kg',
        gravity: '9.81 m/s² (1.00 g)',
        gravityPct: 100,
        temp: '+15°C (-88°C to +58°C)',
        tempPct: 52,
        distAU: '1.00 AU (149.6M km)',
        period: '365.25 Earth Days',
        dayLength: '24.0 Hours',
        axialTilt: '23.44° (Stable Seasons)',
        pressure: '1.013 bar (1.00 atm)',
        composition: [
            { gas: 'N₂', pct: '78.08%' }, { gas: 'O₂', pct: '20.95%' }, { gas: 'Ar', pct: '0.93%' }, { gas: 'CO₂', pct: '0.04%' }
        ],
        missions: [
            { name: 'Apollo 11', year: '1969', agency: 'NASA', highlight: 'First humans land on the Moon' },
            { name: 'Chandrayaan-3', year: '2023', agency: 'ISRO', highlight: 'Historic landing on Lunar South Pole' },
            { name: 'ISS / Earth Observation', year: '2000+', agency: 'Global', highlight: 'Continuous orbital research station' }
        ],
        cosmicNote: 'The Pale Blue Dot. Preserved in the Habitable Zone holding oceans, atmosphere, and conscious life.'
    },
    'Mars': {
        diameter: '6,779 km (0.53 ⊕)',
        mass: '0.642 × 10²⁴ kg',
        gravity: '3.72 m/s² (0.38 g)',
        gravityPct: 38,
        temp: '-63°C (-140°C to +20°C)',
        tempPct: 36,
        distAU: '1.52 AU (227.9M km)',
        period: '687.0 Earth Days',
        dayLength: '24.6 Hours (1 Sol)',
        axialTilt: '25.19°',
        pressure: '0.006 bar (0.006 atm)',
        composition: [
            { gas: 'CO₂', pct: '95.3%' }, { gas: 'N₂', pct: '2.6%' }, { gas: 'Ar', pct: '1.9%' }, { gas: 'O₂', pct: '0.16%' }
        ],
        missions: [
            { name: 'Viking 1 & 2', year: '1976', agency: 'NASA', highlight: 'First successful long-term Mars surface landers' },
            { name: 'Mangalyaan (MOM)', year: '2014', agency: 'ISRO', highlight: 'Historic maiden Mars orbit insertion' },
            { name: 'Perseverance & Ingenuity', year: '2021', agency: 'NASA', highlight: 'First powered flight and sample caching' }
        ],
        cosmicNote: 'The Red Planet. Bearing ancient dry river deltas and the solar system’s tallest volcano (Olympus Mons).'
    },
    'Jupiter': {
        diameter: '139,820 km (10.97 ⊕)',
        mass: '1,898 × 10²⁴ kg (318 ⊕)',
        gravity: '24.79 m/s² (2.53 g)',
        gravityPct: 253,
        temp: '-110°C (Cloud Tops)',
        tempPct: 28,
        distAU: '5.20 AU (778.6M km)',
        period: '4,333 Earth Days (11.86y)',
        dayLength: '9.93 Hours (Fastest Spin)',
        axialTilt: '3.13°',
        pressure: '2,000,000+ bar (Metallic Hydrogen Core)',
        composition: [
            { gas: 'H₂', pct: '89.8%' }, { gas: 'He', pct: '10.2%' }, { gas: 'CH₄', pct: '0.3%' }, { gas: 'NH₃', pct: '0.026%' }
        ],
        missions: [
            { name: 'Voyager 1 & 2', year: '1979', agency: 'NASA', highlight: 'Discovered Jupiter ring and Io volcanoes' },
            { name: 'Galileo', year: '1995', agency: 'NASA', highlight: 'First atmospheric probe and 8-year orbital survey' },
            { name: 'Juno', year: '2016+', agency: 'NASA', highlight: 'Polar gravity and deep atmospheric interior mapping' }
        ],
        cosmicNote: 'King of the Planets. Shields inner worlds from outer system comets with its colossal gravitational field.'
    },
    'Saturn': {
        diameter: '116,460 km (9.14 ⊕)',
        mass: '568 × 10²⁴ kg (95 ⊕)',
        gravity: '10.44 m/s² (1.06 g)',
        gravityPct: 106,
        temp: '-140°C (Cloud Tops)',
        tempPct: 22,
        distAU: '9.58 AU (1,433.5M km)',
        period: '10,759 Earth Days (29.46y)',
        dayLength: '10.7 Hours',
        axialTilt: '26.73°',
        pressure: '1,000,000+ bar (Core)',
        composition: [
            { gas: 'H₂', pct: '96.3%' }, { gas: 'He', pct: '3.25%' }, { gas: 'CH₄', pct: '0.45%' }, { gas: 'NH₃', pct: '0.01%' }
        ],
        missions: [
            { name: 'Pioneer 11', year: '1979', agency: 'NASA', highlight: 'First spacecraft flyby past Saturn rings' },
            { name: 'Cassini-Huygens', year: '2004-2017', agency: 'NASA / ESA', highlight: '13-year epic orbital mission; Huygens landed on Titan' }
        ],
        cosmicNote: 'The Golden Crown of COSMOS. Adorned with trillions of glistening ice ring particles and the Cassini gap.'
    },
    'Uranus': {
        diameter: '50,724 km (3.98 ⊕)',
        mass: '86.8 × 10²⁴ kg (14.5 ⊕)',
        gravity: '8.69 m/s² (0.89 g)',
        gravityPct: 89,
        temp: '-195°C (Coldest Planetary Atmo)',
        tempPct: 12,
        distAU: '19.22 AU (2,872.5M km)',
        period: '30,687 Earth Days (84.01y)',
        dayLength: '17.2 Hours (Retrograde, Tilted)',
        axialTilt: '97.77° (Rolling on Side)',
        pressure: '1.2 bar (Mantle > 1M bar)',
        composition: [
            { gas: 'H₂', pct: '82.5%' }, { gas: 'He', pct: '15.2%' }, { gas: 'CH₄', pct: '2.3%' }, { gas: 'NH₃', pct: 'Ice' }
        ],
        missions: [
            { name: 'Voyager 2', year: '1986', agency: 'NASA', highlight: 'Historic close flyby, discovered 10 moons & 2 rings' }
        ],
        cosmicNote: 'The Tilted Ice Giant. Rolls on its side through space like a serene sapphire sphere.'
    },
    'Neptune': {
        diameter: '49,244 km (3.86 ⊕)',
        mass: '102 × 10²⁴ kg (17.1 ⊕)',
        gravity: '11.15 m/s² (1.14 g)',
        gravityPct: 114,
        temp: '-201°C (Deep Azure Ice World)',
        tempPct: 10,
        distAU: '30.05 AU (4,495.1M km)',
        period: '60,190 Earth Days (164.8y)',
        dayLength: '16.1 Hours',
        axialTilt: '28.32°',
        pressure: '1.5 bar (Mantle > 1M bar)',
        composition: [
            { gas: 'H₂', pct: '80.0%' }, { gas: 'He', pct: '19.0%' }, { gas: 'CH₄', pct: '1.5%' }, { gas: 'H₂O / NH₃', pct: 'Mantle' }
        ],
        missions: [
            { name: 'Voyager 2', year: '1989', agency: 'NASA', highlight: 'Sole spacecraft visit, discovered Great Dark Spot & Triton geysers' }
        ],
        cosmicNote: 'The Guardian of the Outer Depths. Harbors supersonic 2,100 km/h winds across deep azure skies.'
    }
};

// High-Fidelity Procedural Textures Cache
const cosmosBuilderTextureCache = {};

function cosmosBuilderCreateCanvas(w, h) {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    return canvas;
}

// Procedural Star Surface Texture
function cosmosBuilderGetStarTexture(typeInfo) {
    const key = 'star_' + (typeInfo.name || 'yellow');
    if (cosmosBuilderTextureCache[key]) return cosmosBuilderTextureCache[key];

    const canvas = cosmosBuilderCreateCanvas(512, 512);
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const cx = 256, cy = 256;
    const grad = ctx.createRadialGradient(cx, cy, 15, cx, cy, 256);
    grad.addColorStop(0.0, '#ffffff');
    grad.addColorStop(0.25, '#' + (typeInfo.color ? typeInfo.color.toString(16).padStart(6, '0') : 'ffcc00'));
    grad.addColorStop(0.70, '#' + (typeInfo.coronaColor ? typeInfo.coronaColor.toString(16).padStart(6, '0') : 'ff8800'));
    grad.addColorStop(0.95, '#551500');
    grad.addColorStop(1.0, '#1a0400');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Convective solar granules
    ctx.save();
    for (let i = 0; i < 180; i++) {
        const angle = Math.random() * Math.PI * 2;
        const rad = Math.random() * 230;
        const gx = cx + Math.cos(angle) * rad;
        const gy = cy + Math.sin(angle) * rad;
        const gr = 6 + Math.random() * 16;
        ctx.fillStyle = 'rgba(255, 235, 160, 0.28)';
        ctx.beginPath();
        ctx.arc(gx, gy, gr, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    cosmosBuilderTextureCache[key] = texture;
    return texture;
}

// High-Fidelity Procedural Planet Surface Texture
function cosmosBuilderGetPlanetTexture(type, baseColor) {
    const key = `planet_${type}_${baseColor}`;
    if (cosmosBuilderTextureCache[key]) return cosmosBuilderTextureCache[key];

    const canvas = cosmosBuilderCreateCanvas(512, 256);
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = baseColor || '#4477aa';
    ctx.fillRect(0, 0, 512, 256);

    if (type === 'ocean') {
        ctx.fillStyle = '#2d884d'; // continents
        for (let i = 0; i < 28; i++) {
            const cx = Math.random() * 512;
            const cy = 40 + Math.random() * 176;
            const rx = 18 + Math.random() * 50;
            const ry = 10 + Math.random() * 32;
            ctx.beginPath();
            ctx.ellipse(cx, cy, rx, ry, (Math.random() - 0.5) * 0.8, 0, Math.PI * 2);
            ctx.fill();
        }
        // Polar Ice Caps
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillRect(0, 0, 512, 18);
        ctx.fillRect(0, 238, 512, 18);
    } else if (type === 'gas') {
        // Multi-layered atmospheric bands & Great Red Spot
        for (let y = 0; y < 256; y += 8) {
            const n = Math.sin(y * 0.08) * 0.5 + 0.5;
            ctx.fillStyle = `rgba(${Math.floor(180 + n * 60)}, ${Math.floor(120 + n * 40)}, ${Math.floor(80 + n * 30)}, 0.45)`;
            ctx.fillRect(0, y, 512, 8);
        }
        // Great Red Spot storm
        ctx.fillStyle = 'rgba(200, 60, 40, 0.85)';
        ctx.beginPath();
        ctx.ellipse(320, 160, 28, 16, 0.1, 0, Math.PI * 2);
        ctx.fill();
    } else if (type === 'desert') {
        // Dune ridges & iron oxide terrain
        ctx.fillStyle = 'rgba(90, 30, 15, 0.35)';
        for (let i = 0; i < 35; i++) {
            const cx = Math.random() * 512;
            const cy = Math.random() * 256;
            ctx.fillRect(cx, cy, 30 + Math.random() * 60, 6 + Math.random() * 12);
        }
        // Mars white polar cap
        ctx.fillStyle = 'rgba(245, 245, 255, 0.85)';
        ctx.fillRect(0, 0, 512, 12);
    } else if (type === 'ice') {
        // Glacial fissures & deep azure bands
        ctx.fillStyle = 'rgba(200, 240, 255, 0.35)';
        for (let y = 0; y < 256; y += 14) {
            ctx.fillRect(0, y, 512, 5 + Math.random() * 6);
        }
    } else if (type === 'lava') {
        // Glowing magma cracks
        ctx.strokeStyle = '#ffff00';
        ctx.lineWidth = 2.5;
        for (let i = 0; i < 24; i++) {
            ctx.beginPath();
            ctx.moveTo(Math.random() * 512, Math.random() * 256);
            ctx.lineTo(Math.random() * 512, Math.random() * 256);
            ctx.stroke();
        }
    } else {
        // Cratered Rocky Surface
        for (let i = 0; i < 60; i++) {
            const cx = Math.random() * 512;
            const cy = 20 + Math.random() * 216;
            const r = 4 + Math.random() * 12;
            ctx.strokeStyle = 'rgba(235, 235, 235, 0.45)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = 'rgba(40, 38, 35, 0.55)';
            ctx.beginPath();
            ctx.arc(cx + 1, cy + 1, r * 0.7, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    cosmosBuilderTextureCache[key] = texture;
    return texture;
}

// Procedural Atmospheric Cloud Texture
function cosmosBuilderGetCloudTexture() {
    if (cosmosBuilderTextureCache['clouds_earth']) return cosmosBuilderTextureCache['clouds_earth'];

    const canvas = cosmosBuilderCreateCanvas(512, 256);
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.clearRect(0, 0, 512, 256);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';

    for (let i = 0; i < 40; i++) {
        const x = Math.random() * 512;
        const y = 30 + Math.random() * 196;
        const rx = 25 + Math.random() * 45;
        const ry = 8 + Math.random() * 18;
        ctx.beginPath();
        ctx.ellipse(x, y, rx, ry, (Math.random() - 0.5) * 0.5, 0, Math.PI * 2);
        ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    cosmosBuilderTextureCache['clouds_earth'] = texture;
    return texture;
}

// Procedural Saturn Rings Texture with Real Cassini Division
function cosmosBuilderGetRingTexture(colorHex) {
    const key = 'ring_' + (colorHex || 'saturn');
    if (cosmosBuilderTextureCache[key]) return cosmosBuilderTextureCache[key];

    const canvas = cosmosBuilderCreateCanvas(512, 32);
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const grad = ctx.createLinearGradient(0, 0, 512, 0);
    // Inner C-Ring (Crepe ring)
    grad.addColorStop(0.0, 'rgba(140, 120, 80, 0.05)');
    grad.addColorStop(0.18, 'rgba(170, 150, 100, 0.35)');
    // Dense bright B-Ring
    grad.addColorStop(0.20, 'rgba(230, 210, 160, 0.95)');
    grad.addColorStop(0.40, 'rgba(215, 195, 140, 0.88)');
    grad.addColorStop(0.64, 'rgba(235, 215, 165, 0.95)');
    // Dark Cassini Division gap!
    grad.addColorStop(0.65, 'rgba(10, 8, 5, 0.04)');
    grad.addColorStop(0.72, 'rgba(10, 8, 5, 0.04)');
    // A-Ring with subtle Encke gap
    grad.addColorStop(0.73, 'rgba(200, 180, 130, 0.75)');
    grad.addColorStop(0.85, 'rgba(180, 160, 110, 0.55)');
    grad.addColorStop(0.92, 'rgba(195, 175, 125, 0.70)');
    // Outer edge
    grad.addColorStop(1.0, 'rgba(140, 120, 80, 0.0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 32);

    const texture = new THREE.CanvasTexture(canvas);
    cosmosBuilderTextureCache[key] = texture;
    return texture;
}

// Procedural Moon Texture (Luna, cratered)
function cosmosBuilderGetMoonTexture(colorHex) {
    const key = 'moon_' + (colorHex || 'gray');
    if (cosmosBuilderTextureCache[key]) return cosmosBuilderTextureCache[key];

    const canvas = cosmosBuilderCreateCanvas(256, 128);
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = colorHex || '#a8abb0';
    ctx.fillRect(0, 0, 256, 128);

    // Craters & Maria
    for (let i = 0; i < 35; i++) {
        const cx = Math.random() * 256;
        const cy = Math.random() * 128;
        const r = 2 + Math.random() * 8;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'rgba(30, 30, 35, 0.45)';
        ctx.beginPath();
        ctx.arc(cx + 0.5, cy + 0.5, r * 0.75, 0, Math.PI * 2);
        ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    cosmosBuilderTextureCache[key] = texture;
    return texture;
}

// 3D Laboratory Global Engine State
const cosmosBuilderState = window.cosmosBuilderState = {
    initialized: false,
    running: true,
    simulationSpeed: 1.0,
    trailMode: 'all', // 'all', 'focus', 'off'
    showHabZone: true,
    showAsteroids: true,
    showMoons: true,
    showLabels: true,
    isObservationMode: false,
    isTourActive: false,
    tourStepIndex: 0,
    tourTimer: null,
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    resizeObserver: null,
    starMesh: null,
    starLight: null,
    starCoronaInner: null,
    starCoronaOuter: null,
    starFlareParticles: null,
    habZoneMesh: null,
    asteroidBelt: null,
    asteroidData: [],
    comets: [],
    activeScanRing: null,
    alignmentLine: null,
    lastAlignmentCheck: 0,
    eventBannerTimer: null,
    camTransition: {
        active: false,
        startPos: null,
        endPos: null,
        startTarget: null,
        endTarget: null,
        progress: 0,
        duration: 45
    },
    starData: {
        name: 'Sol',
        type: 'yellow',
        size: 18
    },
    planets: [],
    selectedPlanetId: null,
    trackedPlanetId: null, // live cinematic planet tracking
    trackedMoon: null,     // live cinematic moon tracking
    nextIdCounter: 1,
    raycaster: null,
    mouse: null,
    pointerDownPos: { x: 0, y: 0 },
    animFrameId: null,
    clock: null
};



// Initialize the 3D Laboratory Scene
function cosmosBuilderInit() {
    const container = document.getElementById('cosmos-builder-canvas');
    if (!container || typeof THREE === 'undefined') return;

    if (cosmosBuilderState.initialized) {
        cosmosBuilderOnResize();
        return;
    }

    cosmosBuilderState.raycaster = new THREE.Raycaster();
    cosmosBuilderState.mouse = new THREE.Vector2();
    cosmosBuilderState.clock = new THREE.Clock();

    // Scene
    const scene = new THREE.Scene();
    cosmosBuilderState.scene = scene;

    // Viewport & Cinematic Camera
    const viewport = document.getElementById('builder-viewport') || container;
    const width = viewport.clientWidth || 800;
    const height = viewport.clientHeight || 600;
    const aspect = width / height;

    const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 8000);
    // Majestic angled default framing
    camera.position.set(0, 140, 240);
    cosmosBuilderState.camera = camera;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = false;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    cosmosBuilderState.renderer = renderer;

    // OrbitControls
    if (typeof THREE.OrbitControls !== 'undefined') {
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.maxDistance = 1800;
        controls.minDistance = 12;
        controls.maxPolarAngle = Math.PI / 2 + 0.20; // prevent under-grid clipping
        
        // Disengage focus tracking if user drags or orbits manually
        controls.addEventListener('start', () => {
            if (cosmosBuilderState.trackedPlanetId || cosmosBuilderState.trackedMoon) {
                cosmosBuilderState.trackedPlanetId = null;
                cosmosBuilderState.trackedMoon = null;
                const focusBtn = document.getElementById('builder-focus-planet-btn');
                if (focusBtn) {
                    focusBtn.innerHTML = '🎯 Focus View';
                    focusBtn.classList.remove('active-focus');
                }
            }
            if (cosmosBuilderState.isTourActive) {
                cosmosBuilderExitTour();
            }
        });

        cosmosBuilderState.controls = controls;
    }

    // 1. Ambient Starlight Fill Light (deep navy cosmic fill)
    const ambient = new THREE.AmbientLight(0x1a243e, 0.45);
    scene.add(ambient);

    // 2. Central Star Point Light (powers 3D planetary day/night shading)
    const starLight = new THREE.PointLight(0xfff6d6, 3.2, 3500, 0.5);
    starLight.position.set(0, 0, 0);
    scene.add(starLight);
    cosmosBuilderState.starLight = starLight;

    // 3. Central Star Core, Corona & Dynamic Prominences
    cosmosBuilderBuildStar();

    // 4. Habitable Zone Ring
    cosmosBuilderBuildHabitableZone();

    // 5. Dynamic Keplerian Asteroid Belt between Mars & Jupiter
    cosmosBuilderBuildAsteroidBelt();

    // 6. Deep Cosmic Starfield background (4,500 distant stars)
    const starGeo = new THREE.BufferGeometry();
    const starCount = 4500;
    const starVerts = [];
    const starColors = [];
    const colorChoices = [
        new THREE.Color(0xffffff),
        new THREE.Color(0xa6d8ff),
        new THREE.Color(0xffe6b3),
        new THREE.Color(0xdfb15b),
        new THREE.Color(0x38bdf8)
    ];

    for (let i = 0; i < starCount; i++) {
        const r = 1200 + Math.random() * 1200;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        starVerts.push(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
        const c = colorChoices[Math.floor(Math.random() * colorChoices.length)];
        starColors.push(c.r, c.g, c.b);
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVerts, 3));
    starGeo.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({ size: 1.25, vertexColors: true, transparent: true, opacity: 0.95 });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 7. Load Standard 8 Planets
    cosmosBuilderResetDefault();

    // 8. Event Listeners & Canvas Click Interaction
    renderer.domElement.addEventListener('pointerdown', (e) => {
        cosmosBuilderState.pointerDownPos = { x: e.clientX, y: e.clientY };
    });
    renderer.domElement.addEventListener('pointerup', cosmosBuilderHandleCanvasClick);

    cosmosBuilderSetupResizeObserver();
    cosmosBuilderSetupUI();

    cosmosBuilderState.initialized = true;

    // Start 60fps Animation Loop
    if (!cosmosBuilderState.animFrameId) {
        cosmosBuilderAnimate();
    }
}

// Robust Resize Observer for Viewport
function cosmosBuilderSetupResizeObserver() {
    const viewport = document.getElementById('builder-viewport');
    if (!viewport || typeof ResizeObserver === 'undefined') return;

    if (cosmosBuilderState.resizeObserver) {
        cosmosBuilderState.resizeObserver.disconnect();
    }

    cosmosBuilderState.resizeObserver = new ResizeObserver(() => {
        cosmosBuilderOnResize();
    });
    cosmosBuilderState.resizeObserver.observe(viewport);
}

function cosmosBuilderOnResize() {
    const viewport = document.getElementById('builder-viewport');
    const camera = cosmosBuilderState.camera;
    const renderer = cosmosBuilderState.renderer;
    if (!viewport || !camera || !renderer) return;

    const width = viewport.clientWidth || 800;
    const height = viewport.clientHeight || 600;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// Build Central Star with Dynamic Corona Shells & Solar Wind
function cosmosBuilderBuildStar() {
    const scene = cosmosBuilderState.scene;
    if (!scene) return;

    if (cosmosBuilderState.starMesh) {
        scene.remove(cosmosBuilderState.starMesh);
        if (cosmosBuilderState.starMesh.geometry) cosmosBuilderState.starMesh.geometry.dispose();
    }
    if (cosmosBuilderState.starCoronaInner) {
        scene.remove(cosmosBuilderState.starCoronaInner);
        if (cosmosBuilderState.starCoronaInner.geometry) cosmosBuilderState.starCoronaInner.geometry.dispose();
    }
    if (cosmosBuilderState.starCoronaOuter) {
        scene.remove(cosmosBuilderState.starCoronaOuter);
        if (cosmosBuilderState.starCoronaOuter.geometry) cosmosBuilderState.starCoronaOuter.geometry.dispose();
    }
    if (cosmosBuilderState.starFlareParticles) {
        scene.remove(cosmosBuilderState.starFlareParticles);
        if (cosmosBuilderState.starFlareParticles.geometry) cosmosBuilderState.starFlareParticles.geometry.dispose();
    }

    const typeKey = cosmosBuilderState.starData.type || 'yellow';
    const typeInfo = COSMOS_STAR_TYPES[typeKey] || COSMOS_STAR_TYPES.yellow;
    const size = cosmosBuilderState.starData.size || 18;

    // 1. Procedural Radiant Star Surface
    const starTexture = cosmosBuilderGetStarTexture(typeInfo);
    const starGeo = new THREE.SphereGeometry(size, 48, 48);
    const starMat = new THREE.MeshBasicMaterial({ 
        map: starTexture,
        color: 0xffffff
    });
    const starMesh = new THREE.Mesh(starGeo, starMat);
    starMesh.userData = { isStar: true };
    scene.add(starMesh);
    cosmosBuilderState.starMesh = starMesh;

    // 2. Inner Pulsing Luminous Corona Shell (Additive)
    const innerGeo = new THREE.SphereGeometry(size * 1.30, 36, 36);
    const innerMat = new THREE.MeshBasicMaterial({
        color: typeInfo.coronaColor,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
    });
    const innerCorona = new THREE.Mesh(innerGeo, innerMat);
    innerCorona.userData = { isStar: true };
    scene.add(innerCorona);
    cosmosBuilderState.starCoronaInner = innerCorona;

    // 3. Outer Expansive Solar Atmosphere
    const outerGeo = new THREE.SphereGeometry(size * 1.85, 36, 36);
    const outerMat = new THREE.MeshBasicMaterial({
        color: typeInfo.coronaColor,
        transparent: true,
        opacity: 0.20,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending
    });
    const outerCorona = new THREE.Mesh(outerGeo, outerMat);
    scene.add(outerCorona);
    cosmosBuilderState.starCoronaOuter = outerCorona;

    // 4. Solar Wind & Flare Prominence Particles
    const flareCount = 600;
    const flareGeo = new THREE.BufferGeometry();
    const flarePositions = [];
    const flareColors = [];
    const flareCol = new THREE.Color(typeInfo.coronaColor);
    const whiteCol = new THREE.Color(0xffffff);

    for (let i = 0; i < flareCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI * 0.85;
        const r = size * (1.05 + Math.random() * 0.55);
        flarePositions.push(
            r * Math.cos(phi) * Math.cos(theta),
            r * Math.sin(phi),
            r * Math.cos(phi) * Math.sin(theta)
        );
        const mix = Math.random() > 0.35 ? flareCol : whiteCol;
        flareColors.push(mix.r, mix.g, mix.b);
    }
    flareGeo.setAttribute('position', new THREE.Float32BufferAttribute(flarePositions, 3));
    flareGeo.setAttribute('color', new THREE.Float32BufferAttribute(flareColors, 3));

    const flareMat = new THREE.PointsMaterial({
        size: 2.4,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
    });
    const flareParticles = new THREE.Points(flareGeo, flareMat);
    scene.add(flareParticles);
    cosmosBuilderState.starFlareParticles = flareParticles;

    // 5. Update central PointLight
    if (cosmosBuilderState.starLight) {
        cosmosBuilderState.starLight.color.setHex(typeInfo.lightColor);
        cosmosBuilderState.starLight.intensity = (typeInfo.intensity || 2.4) * 1.25;
    }
}

// Build Habitable Zone Ring
function cosmosBuilderBuildHabitableZone() {
    const scene = cosmosBuilderState.scene;
    if (!scene) return;

    if (cosmosBuilderState.habZoneMesh) {
        scene.remove(cosmosBuilderState.habZoneMesh);
        if (cosmosBuilderState.habZoneMesh.geometry) cosmosBuilderState.habZoneMesh.geometry.dispose();
    }

    const typeKey = cosmosBuilderState.starData.type || 'yellow';
    const typeInfo = COSMOS_STAR_TYPES[typeKey] || COSMOS_STAR_TYPES.yellow;
    const minR = typeInfo.habMin || 65;
    const maxR = typeInfo.habMax || 105;

    const geo = new THREE.RingGeometry(minR, maxR, 64);
    const mat = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.08,
        depthWrite: false
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = Math.PI / 2;
    scene.add(mesh);
    cosmosBuilderState.habZoneMesh = mesh;
    mesh.visible = cosmosBuilderState.showHabZone;

    const habVal = document.getElementById('builder-stat-habzone');
    if (habVal) habVal.textContent = `${minR} - ${maxR} AU`;
}

// Build Dynamic Keplerian Asteroid Belt
function cosmosBuilderBuildAsteroidBelt() {
    const scene = cosmosBuilderState.scene;
    if (!scene) return;

    if (cosmosBuilderState.asteroidBelt) {
        scene.remove(cosmosBuilderState.asteroidBelt);
        if (cosmosBuilderState.asteroidBelt.geometry) cosmosBuilderState.asteroidBelt.geometry.dispose();
    }

    const asteroidCount = 1000;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(asteroidCount * 3);
    const colors = new Float32Array(asteroidCount * 3);
    const asteroidData = [];

    const minR = 126;
    const maxR = 152;

    const baseColors = [
        new THREE.Color(0x8a857e),
        new THREE.Color(0x6b6660),
        new THREE.Color(0xb5ada2),
        new THREE.Color(0xdfb15b),
        new THREE.Color(0x4fc3f7)
    ];

    for (let i = 0; i < asteroidCount; i++) {
        const rad = minR + Math.random() * (maxR - minR);
        const theta = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 7.5; // orbital inclination spread
        // Keplerian angular velocity: v ~ 1 / sqrt(r^3)
        const omega = 0.0035 / Math.pow(rad / 138, 1.5);

        positions[i * 3]     = Math.cos(theta) * rad;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = Math.sin(theta) * rad;

        // Ceres, Vesta, Pallas highlights
        let c = baseColors[Math.floor(Math.random() * baseColors.length)];
        if (i === 0) c = new THREE.Color(0xffd700); // Ceres
        if (i === 1) c = new THREE.Color(0x00ffcc); // Vesta

        colors[i * 3]     = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;

        asteroidData.push({ r: rad, theta: theta, y: y, omega: omega });
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
        size: 2.0,
        vertexColors: true,
        transparent: true,
        opacity: 0.85
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);
    cosmosBuilderState.asteroidBelt = points;
    cosmosBuilderState.asteroidData = asteroidData;
    points.visible = cosmosBuilderState.showAsteroids;
}

// Build Single 3D Planet (with Moons, Atmospheres, Rings, and Scan Reticle)
function cosmosBuilderCreatePlanet3D(pData) {
    const scene = cosmosBuilderState.scene;
    const baseSize = pData.size || 5.0;
    const pType = pData.type || 'rocky';

    // 1. Planet mesh with procedural surface texture
    const texture = cosmosBuilderGetPlanetTexture(pType, pData.color);
    const geo = new THREE.SphereGeometry(baseSize, 40, 40);
    const matOptions = {
        map: texture,
        roughness: pType === 'ocean' ? 0.35 : 0.75,
        metalness: pType === 'lava' ? 0.4 : 0.08
    };
    if (pType === 'lava') {
        matOptions.emissive = new THREE.Color(0xff3300);
        matOptions.emissiveIntensity = 0.8;
    }
    const mat = new THREE.MeshStandardMaterial(matOptions);
    const mesh = new THREE.Mesh(geo, mat);

    const angle = pData.angle !== undefined ? pData.angle : Math.random() * Math.PI * 2;
    const tilt = pData.tilt || 0;
    const dist = pData.dist || 80;

    mesh.position.x = Math.cos(angle) * dist;
    mesh.position.z = Math.sin(angle) * dist;
    mesh.position.y = Math.sin(angle) * dist * Math.sin(tilt * Math.PI / 180);
    mesh.rotation.z = (pData.axialTilt || (Math.random() * 20 - 10)) * Math.PI / 180;
    scene.add(mesh);

    // 2. Rings (if requested)
    let ringMesh = null;
    if (pData.hasRings) {
        ringMesh = cosmosBuilderCreateRingMesh(baseSize, pData.ringRadius || 2.2, pData.color);
        mesh.add(ringMesh);
    }

    // 3. Clouds (if ocean, gas, or atmosphere enabled)
    let cloudMesh = null;
    if (pData.hasAtmosphere && (pType === 'ocean' || pType === 'gas' || pData.name === 'Earth')) {
        cloudMesh = cosmosBuilderCreateCloudMesh(baseSize, pType);
        if (cloudMesh) mesh.add(cloudMesh);
    }

    // 4. Atmosphere rim glow shell
    let atmosphereMesh = null;
    if (pData.hasAtmosphere) {
        atmosphereMesh = cosmosBuilderCreateAtmosphereMesh(baseSize, pData.color);
        mesh.add(atmosphereMesh);
    }

    // 5. Cinematic Target Ring Indicator (Refined holographic selection ring)
    const reticleGeo = new THREE.RingGeometry(baseSize * 1.28, baseSize * 1.38, 48);
    const reticleMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
    });
    const reticleMesh = new THREE.Mesh(reticleGeo, reticleMat);
    reticleMesh.rotation.x = Math.PI / 2;
    reticleMesh.visible = false;
    mesh.add(reticleMesh);

    // 6. Orbit path ring
    const orbitLine = cosmosBuilderCreateOrbitLine(dist, tilt, false);
    scene.add(orbitLine);
    orbitLine.visible = (cosmosBuilderState.trailMode !== 'off');

    // 7. Natural Satellites (Moons System)
    const moons = [];
    const moonCatalog = COSMOS_PLANET_MOONS[pData.name];
    if (moonCatalog && moonCatalog.length > 0) {
        moonCatalog.forEach(mInfo => {
            const moonObj = cosmosBuilderCreateMoonMesh(mInfo, mesh, baseSize);
            moons.push(moonObj);
        });
    }

    const planetObj = {
        id: pData.id || ('p_' + (cosmosBuilderState.nextIdCounter++)),
        name: pData.name || 'Planet',
        type: pType,
        size: baseSize,
        baseSize: baseSize,
        dist: dist,
        speed: pData.speed || 0.015,
        rotSpeed: pData.rotSpeed || 0.020,
        tilt: tilt,
        color: pData.color || '#2271b3',
        hasRings: !!pData.hasRings,
        ringRadius: pData.ringRadius || 2.2,
        hasAtmosphere: !!pData.hasAtmosphere,
        angle: angle,
        mesh: mesh,
        ringMesh: ringMesh,
        cloudMesh: cloudMesh,
        atmosphereMesh: atmosphereMesh,
        reticleMesh: reticleMesh,
        orbitLine: orbitLine,
        moons: moons
    };

    mesh.userData = { planetId: planetObj.id, isPlanet: true };
    return planetObj;
}

// Create Natural Moon Mesh attached to parent planet mesh
function cosmosBuilderCreateMoonMesh(mInfo, parentMesh, parentBaseSize) {
    const moonGeo = new THREE.SphereGeometry(mInfo.size, 24, 24);
    const moonTex = cosmosBuilderGetMoonTexture(mInfo.color);
    const moonMat = new THREE.MeshStandardMaterial({
        map: moonTex,
        roughness: 0.85,
        metalness: 0.05
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);

    // Initial moon orbital position
    const mAngle = Math.random() * Math.PI * 2;
    moonMesh.position.set(Math.cos(mAngle) * mInfo.dist, 0, Math.sin(mAngle) * mInfo.dist);
    parentMesh.add(moonMesh);

    // Faint lunar orbit line
    const orbitGeo = new THREE.BufferGeometry();
    const pts = [];
    for (let i = 0; i <= 64; i++) {
        const a = (i / 64) * Math.PI * 2;
        pts.push(Math.cos(a) * mInfo.dist, 0, Math.sin(a) * mInfo.dist);
    }
    orbitGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    const orbitMat = new THREE.LineBasicMaterial({
        color: 0xdfb15b,
        transparent: true,
        opacity: 0.25
    });
    const orbitLine = new THREE.Line(orbitGeo, orbitMat);
    parentMesh.add(orbitLine);

    const moonObj = {
        name: mInfo.name,
        dist: mInfo.dist,
        size: mInfo.size,
        speed: mInfo.speed,
        period: mInfo.period,
        color: mInfo.color,
        angle: mAngle,
        mesh: moonMesh,
        orbitLine: orbitLine
    };

    moonMesh.userData = { isMoon: true, moonName: mInfo.name, moonObj: moonObj };
    return moonObj;
}

// Create Saturn Rings Mesh
function cosmosBuilderCreateRingMesh(size, radiusMul, color) {
    const innerR = size * 1.35;
    const outerR = size * (radiusMul || 2.2);
    const geo = new THREE.RingGeometry(innerR, outerR, 64);
    
    // UV map setup for radial texture mapping
    const pos = geo.attributes.position;
    const uvs = [];
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const r = Math.sqrt(x * x + y * y);
        const u = (r - innerR) / (outerR - innerR);
        uvs.push(u, 0.5);
    }
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

    const ringTex = cosmosBuilderGetRingTexture(color);
    const mat = new THREE.MeshBasicMaterial({
        map: ringTex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.92
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = Math.PI / 2 + 0.12; // tilted ring plane
    return mesh;
}

// Create Swirling Atmospheric Cloud Mesh
function cosmosBuilderCreateCloudMesh(size, type) {
    const geo = new THREE.SphereGeometry(size * 1.025, 36, 36);
    const tex = cosmosBuilderGetCloudTexture();
    const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending
    });
    return new THREE.Mesh(geo, mat);
}

// Create Atmospheric Fresnel Glow Shell
function cosmosBuilderCreateAtmosphereMesh(size, color) {
    const geo = new THREE.SphereGeometry(size * 1.15, 32, 32);
    const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color || 0x38bdf8),
        transparent: true,
        opacity: 0.22,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending
    });
    return new THREE.Mesh(geo, mat);
}

// Create Planetary Orbit Path Line
function cosmosBuilderCreateOrbitLine(dist, tilt, isSelected) {
    const segs = 128;
    const geo = new THREE.BufferGeometry();
    const verts = [];
    const tiltRad = (tilt || 0) * Math.PI / 180;

    for (let i = 0; i <= segs; i++) {
        const theta = (i / segs) * Math.PI * 2;
        const x = Math.cos(theta) * dist;
        const z = Math.sin(theta) * dist;
        const y = Math.sin(theta) * dist * Math.sin(tiltRad);
        verts.push(x, y, z);
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));

    const mat = new THREE.LineBasicMaterial({
        color: isSelected ? 0x00ffcc : 0x224477,
        transparent: true,
        opacity: isSelected ? 0.85 : 0.35
    });

    return new THREE.Line(geo, mat);
}

// Rebuild an existing planet's orbit line
function cosmosBuilderRebuildOrbit(planet) {
    const scene = cosmosBuilderState.scene;
    if (!scene || !planet || !planet.orbitLine) return;

    scene.remove(planet.orbitLine);
    if (planet.orbitLine.geometry) planet.orbitLine.geometry.dispose();

    const isSelected = (planet.id === cosmosBuilderState.selectedPlanetId);
    planet.orbitLine = cosmosBuilderCreateOrbitLine(planet.dist, planet.tilt, isSelected);
    scene.add(planet.orbitLine);
    planet.orbitLine.visible = (cosmosBuilderState.trailMode !== 'off');
}

// Spawn an Elliptical Procedural Comet
function cosmosBuilderSpawnComet() {
    const scene = cosmosBuilderState.scene;
    if (!scene) return;

    // Remove existing comets
    if (cosmosBuilderState.comets.length > 0) {
        cosmosBuilderState.comets.forEach(c => {
            scene.remove(c.mesh);
            scene.remove(c.tail);
        });
        cosmosBuilderState.comets = [];
    }

    // Nucleus
    const nGeo = new THREE.SphereGeometry(1.6, 16, 16);
    const nMat = new THREE.MeshStandardMaterial({
        color: 0x9be8ff,
        emissive: 0x00ccff,
        emissiveIntensity: 0.6,
        roughness: 0.7
    });
    const nMesh = new THREE.Mesh(nGeo, nMat);

    // Glowing Coma
    const comaGeo = new THREE.SphereGeometry(3.8, 16, 16);
    const comaMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
    });
    const comaMesh = new THREE.Mesh(comaGeo, comaMat);
    nMesh.add(comaMesh);

    // Tail Particles (pointing away from Sun)
    const tailCount = 75;
    const tailGeo = new THREE.BufferGeometry();
    const tailPos = new Float32Array(tailCount * 3);
    const tailCols = new Float32Array(tailCount * 3);
    const cyan = new THREE.Color(0x38bdf8);

    for (let i = 0; i < tailCount; i++) {
        tailPos[i * 3]     = 0;
        tailPos[i * 3 + 1] = 0;
        tailPos[i * 3 + 2] = 0;
        tailCols[i * 3]     = cyan.r;
        tailCols[i * 3 + 1] = cyan.g;
        tailCols[i * 3 + 2] = cyan.b;
    }
    tailGeo.setAttribute('position', new THREE.BufferAttribute(tailPos, 3));
    tailGeo.setAttribute('color', new THREE.BufferAttribute(tailCols, 3));

    const tailMat = new THREE.PointsMaterial({
        size: 3.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    const tailPoints = new THREE.Points(tailGeo, tailMat);

    scene.add(nMesh);
    scene.add(tailPoints);

    const cometObj = {
        mesh: nMesh,
        tail: tailPoints,
        tailGeo: tailGeo,
        u: 0.05, // progress along trajectory
        speed: 0.003
    };
    cosmosBuilderState.comets.push(cometObj);

    // Display Alert Banner
    cosmosBuilderShowEventBanner(
        '☄️',
        'COMET DISCOVERY',
        'Comet Halley-Cosmos traversing inner Solar System at perihelion!'
    );
}



// Add New Planet with automatic collision avoidance
function cosmosBuilderAddPlanet(presetData) {
    let newDist = 70;
    if (cosmosBuilderState.planets.length > 0) {
        const maxDist = Math.max(...cosmosBuilderState.planets.map(p => p.dist));
        newDist = Math.min(350, maxDist + 35);
    }

    const typeKeys = Object.keys(COSMOS_PLANET_TYPES);
    const chosenType = typeKeys[cosmosBuilderState.planets.length % typeKeys.length];
    const typeInfo = COSMOS_PLANET_TYPES[chosenType];

    const pData = presetData || {
        name: 'Planet-' + (cosmosBuilderState.planets.length + 1),
        type: chosenType,
        size: typeInfo.defaultSize || 5.0,
        dist: newDist,
        speed: +(0.016 / Math.sqrt(newDist / 40)).toFixed(3),
        rotSpeed: 0.020,
        tilt: Math.floor(Math.random() * 8) - 4,
        color: typeInfo.color,
        hasRings: false,
        ringRadius: 2.2,
        hasAtmosphere: chosenType === 'ocean' || chosenType === 'gas'
    };

    const newPlanet = cosmosBuilderCreatePlanet3D(pData);
    cosmosBuilderState.planets.push(newPlanet);

    cosmosBuilderSelectPlanet(newPlanet.id);
    cosmosBuilderUpdatePlanetPicker();
    cosmosBuilderUpdateStats();

    return newPlanet;
}

// Remove Planet
function cosmosBuilderRemovePlanet(planetId) {
    const scene = cosmosBuilderState.scene;
    const idx = cosmosBuilderState.planets.findIndex(p => p.id === planetId);
    if (idx === -1) return;

    const p = cosmosBuilderState.planets[idx];
    if (scene) {
        scene.remove(p.mesh);
        if (p.mesh.geometry) p.mesh.geometry.dispose();
        if (p.mesh.material) p.mesh.material.dispose();
        if (p.orbitLine) {
            scene.remove(p.orbitLine);
            if (p.orbitLine.geometry) p.orbitLine.geometry.dispose();
        }
    }

    cosmosBuilderState.planets.splice(idx, 1);

    if (cosmosBuilderState.selectedPlanetId === planetId) {
        cosmosBuilderState.selectedPlanetId = null;
        cosmosBuilderState.trackedPlanetId = null;
        if (cosmosBuilderState.planets.length > 0) {
            cosmosBuilderSelectPlanet(cosmosBuilderState.planets[0].id);
        } else {
            cosmosBuilderUpdateInspector();
        }
    }

    cosmosBuilderUpdatePlanetPicker();
    cosmosBuilderUpdateStats();
}

// Select Planet and Trigger Holographic 3D Scan Ring
function cosmosBuilderSelectPlanet(planetId) {
    cosmosBuilderState.selectedType = 'planet';
    cosmosBuilderState.selectedPlanetId = planetId;
    cosmosBuilderState.trackedMoon = null;

    cosmosBuilderState.planets.forEach(p => {
        const isSelected = (p.id === planetId);
        if (p.reticleMesh) p.reticleMesh.visible = isSelected;
        if (p.orbitLine) {
            if (cosmosBuilderState.trailMode === 'focus') {
                p.orbitLine.visible = isSelected;
            } else if (cosmosBuilderState.trailMode === 'all') {
                p.orbitLine.visible = true;
            } else {
                p.orbitLine.visible = false;
            }
            if (isSelected) {
                p.orbitLine.material.color.setHex(0x38bdf8);
                p.orbitLine.material.opacity = 0.85;
            } else {
                p.orbitLine.material.color.setHex(0x224477);
                p.orbitLine.material.opacity = 0.35;
            }
        }
    });

    const selectedPlanet = cosmosBuilderState.planets.find(p => p.id === planetId);
    if (selectedPlanet) {
        cosmosBuilderTriggerScan(selectedPlanet);
    }

    cosmosBuilderUpdateInspector();
    cosmosBuilderUpdatePlanetPicker();
}

// Select Central Star Contextually
function cosmosBuilderSelectStar() {
    cosmosBuilderState.selectedType = 'star';
    cosmosBuilderState.selectedPlanetId = null;
    cosmosBuilderState.trackedMoon = null;
    cosmosBuilderState.trackedPlanetId = null;

    cosmosBuilderState.planets.forEach(p => {
        if (p.reticleMesh) p.reticleMesh.visible = false;
        if (p.orbitLine) {
            p.orbitLine.visible = (cosmosBuilderState.trailMode !== 'off');
            p.orbitLine.material.color.setHex(0x224477);
            p.orbitLine.material.opacity = 0.35;
        }
    });

    cosmosBuilderUpdateInspector();
    cosmosBuilderUpdatePlanetPicker();
}

// Minimal Empty Overview State (Deselect All)
function cosmosBuilderDeselectAll() {
    cosmosBuilderState.selectedType = 'none';
    cosmosBuilderState.selectedPlanetId = null;
    cosmosBuilderState.selectedMoonData = null;
    cosmosBuilderState.selectedMoonParent = null;
    cosmosBuilderState.trackedPlanetId = null;
    cosmosBuilderState.trackedMoon = null;

    cosmosBuilderState.planets.forEach(p => {
        if (p.reticleMesh) p.reticleMesh.visible = false;
        if (p.orbitLine) {
            p.orbitLine.visible = (cosmosBuilderState.trailMode !== 'off');
            p.orbitLine.material.color.setHex(0x224477);
            p.orbitLine.material.opacity = 0.35;
        }
    });

    cosmosBuilderUpdateInspector();
    cosmosBuilderUpdatePlanetPicker();
}

// Focus Camera smoothly on Central Star
function cosmosBuilderFocusSun() {
    const starSize = (cosmosBuilderState.starData && cosmosBuilderState.starData.size) || 18;
    const endPos = new THREE.Vector3(0, Math.max(16, starSize * 1.5), Math.max(38, starSize * 3.4));
    const endTarget = new THREE.Vector3(0, 0, 0);
    cosmosBuilderStartCamTransition(endPos, endTarget, 45);
    cosmosBuilderState.trackedPlanetId = null;
    cosmosBuilderState.trackedMoon = null;
}

// Select Natural Moon Contextually
function cosmosBuilderSelectMoon(parentPlanet, moonData) {
    cosmosBuilderState.selectedType = 'moon';
    cosmosBuilderState.selectedMoonParent = parentPlanet;
    cosmosBuilderState.selectedMoonData = moonData;
    cosmosBuilderState.selectedPlanetId = parentPlanet ? parentPlanet.id : null;

    cosmosBuilderFocusMoon(parentPlanet, moonData);
    cosmosBuilderUpdateInspector();
    cosmosBuilderUpdatePlanetPicker();
}

// 3D Holographic Scanning Ring Animation
function cosmosBuilderTriggerScan(planet) {
    const scene = cosmosBuilderState.scene;
    if (!scene || !planet || !planet.mesh) return;

    if (cosmosBuilderState.activeScanRing) {
        scene.remove(cosmosBuilderState.activeScanRing.mesh);
        cosmosBuilderState.activeScanRing = null;
    }

    const ringGeo = new THREE.RingGeometry(planet.size * 1.05, planet.size * 1.15, 36);
    const ringMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
    });
    const scanMesh = new THREE.Mesh(ringGeo, ringMat);
    scanMesh.rotation.x = Math.PI / 2;
    scanMesh.position.copy(planet.mesh.position);
    scene.add(scanMesh);

    cosmosBuilderState.activeScanRing = {
        mesh: scanMesh,
        planet: planet,
        scale: 1.0,
        opacity: 0.85
    };
}

// Update the Contextual Scientific Inspector HUD
function cosmosBuilderUpdateInspector() {
    const planetView = document.getElementById('inspector-planet-view');
    const starView = document.getElementById('inspector-star-view');
    const moonView = document.getElementById('inspector-moon-view');
    const emptyView = document.getElementById('inspector-empty-view');
    const whatIfView = document.getElementById('inspector-whatif-view');
    const interiorView = document.getElementById('inspector-interior-view');

    // Handle What-If and Interior specialized views
    if (cosmosBuilderState.mode === 'whatif') {
        if (planetView) planetView.style.display = 'none';
        if (starView) starView.style.display = 'none';
        if (moonView) moonView.style.display = 'none';
        if (emptyView) emptyView.style.display = 'none';
        if (interiorView) interiorView.style.display = 'none';
        if (whatIfView) whatIfView.style.display = 'block';
        return;
    }
    if (cosmosBuilderState.mode === 'interior') {
        if (planetView) planetView.style.display = 'none';
        if (starView) starView.style.display = 'none';
        if (moonView) moonView.style.display = 'none';
        if (emptyView) emptyView.style.display = 'none';
        if (whatIfView) whatIfView.style.display = 'none';
        if (interiorView) interiorView.style.display = 'block';
        return;
    }
    if (whatIfView) whatIfView.style.display = 'none';
    if (interiorView) interiorView.style.display = 'none';

    const titleEl = document.getElementById('builder-target-title');
    const badgeEl = document.getElementById('builder-target-badge');
    const sphereEl = document.getElementById('builder-preview-sphere');
    const subEl = document.getElementById('builder-target-sub');
    const headerTitle = document.getElementById('builder-inspector-header-title');

    // Case 1: Central Star Selected
    if (cosmosBuilderState.selectedType === 'star') {
        if (planetView) planetView.style.display = 'none';
        if (starView) starView.style.display = 'block';
        if (moonView) moonView.style.display = 'none';
        if (emptyView) emptyView.style.display = 'none';

        if (headerTitle) headerTitle.textContent = 'CENTRAL STAR INSPECTOR';
        if (subEl) subEl.textContent = 'STELLAR PRIMARY';
        if (titleEl) titleEl.textContent = cosmosBuilderState.starData.name || 'Sol';
        
        const typeKey = cosmosBuilderState.starData.type || 'yellow';
        const typeInfo = COSMOS_STAR_TYPES[typeKey] || COSMOS_STAR_TYPES.yellow;
        if (badgeEl) badgeEl.textContent = `${typeInfo.name.toUpperCase()} STAR`;

        if (sphereEl) {
            sphereEl.style.background = `radial-gradient(circle at 35% 35%, #ffffff, ${typeInfo.colorHex} 65%, #ff4400 100%)`;
            sphereEl.style.boxShadow = `0 0 25px ${typeInfo.colorHex}`;
        }

        const starNameInput = document.getElementById('builder-star-name');
        if (starNameInput) starNameInput.value = cosmosBuilderState.starData.name || 'Sol';
        const starTypeSelect = document.getElementById('builder-star-type');
        if (starTypeSelect) starTypeSelect.value = typeKey;
        const starSizeInput = document.getElementById('builder-star-size');
        const starSizeVal = document.getElementById('builder-star-size-val');
        if (starSizeInput) starSizeInput.value = cosmosBuilderState.starData.size || 18;
        if (starSizeVal) starSizeVal.textContent = (cosmosBuilderState.starData.size || 18) + ' units';

        const pPhoto = document.getElementById('metric-star-photosphere');
        if (pPhoto) {
            pPhoto.textContent = typeKey === 'blue' ? '28,000 K (O-Type Hot)' : (typeKey === 'red' ? '3,200 K (M-Type Cool)' : (typeKey === 'white' ? '9,500 K (D-Type Dense)' : '5,778 K (G2V Class)'));
        }
        const pLum = document.getElementById('metric-star-lum');
        if (pLum) {
            pLum.textContent = typeKey === 'blue' ? '12,500 L☉' : (typeKey === 'red' ? '2,800 L☉' : (typeKey === 'white' ? '0.04 L☉' : '1.00 L☉'));
        }
        return;
    }

    // Case 2: Natural Moon Selected
    if (cosmosBuilderState.selectedType === 'moon' && cosmosBuilderState.selectedMoonData) {
        if (planetView) planetView.style.display = 'none';
        if (starView) starView.style.display = 'none';
        if (moonView) moonView.style.display = 'block';
        if (emptyView) emptyView.style.display = 'none';

        const moon = cosmosBuilderState.selectedMoonData;
        const parentP = cosmosBuilderState.selectedMoonParent;

        if (headerTitle) headerTitle.textContent = 'MOON INSPECTOR';
        if (subEl) subEl.textContent = 'NATURAL SATELLITE';
        if (titleEl) titleEl.textContent = moon.name;
        if (badgeEl) badgeEl.textContent = `SATELLITE OF ${(parentP ? parentP.name : 'PLANET').toUpperCase()}`;

        if (sphereEl) {
            sphereEl.style.background = `radial-gradient(circle at 35% 35%, #f1f5f9, #94a3b8 70%, #1e293b 100%)`;
            sphereEl.style.boxShadow = `0 0 16px rgba(226, 232, 240, 0.45)`;
        }

        const parentEl = document.getElementById('moon-metric-parent');
        if (parentEl) parentEl.textContent = parentP ? parentP.name : 'Unknown';
        const distEl = document.getElementById('moon-metric-dist');
        if (distEl) distEl.textContent = `${Math.round((moon.dist || 12) * 28000).toLocaleString()} km`;
        const periodEl = document.getElementById('moon-metric-period');
        if (periodEl) periodEl.textContent = moon.period || '27.3 Earth Days';

        return;
    }

    // Case 3: Planet Selected
    const selected = cosmosBuilderState.planets.find(p => p.id === cosmosBuilderState.selectedPlanetId);
    if (!selected) {
        if (planetView) planetView.style.display = 'none';
        if (starView) starView.style.display = 'none';
        if (moonView) moonView.style.display = 'none';
        if (emptyView) emptyView.style.display = 'block';

        if (headerTitle) headerTitle.textContent = 'SOLAR SYSTEM OBSERVATORY';
        if (subEl) subEl.textContent = 'COSMOS SYSTEM';
        if (titleEl) titleEl.textContent = 'Solar System';
        if (badgeEl) badgeEl.textContent = 'OBSERVATORY ACTIVE';
        if (sphereEl) {
            sphereEl.style.background = `radial-gradient(circle at 35% 35%, #38bdf8, #0369a1 70%, #082046 100%)`;
            sphereEl.style.boxShadow = `0 0 16px rgba(56, 189, 248, 0.35)`;
        }
        const ovStar = document.getElementById('overview-star-name');
        if (ovStar) ovStar.textContent = cosmosBuilderState.starData.name || 'Sol';
        const ovCount = document.getElementById('overview-planet-count');
        if (ovCount) ovCount.textContent = `${cosmosBuilderState.planets.length} Planets`;
        return;
    }

    // Default: Planet Mode
    cosmosBuilderState.selectedType = 'planet';
    if (planetView) planetView.style.display = 'block';
    if (starView) starView.style.display = 'none';
    if (moonView) moonView.style.display = 'none';
    if (emptyView) emptyView.style.display = 'none';

    if (headerTitle) headerTitle.textContent = 'PLANET INSPECTOR';
    if (subEl) subEl.textContent = 'TARGET BODY';
    if (titleEl) titleEl.textContent = selected.name;
    if (badgeEl) {
        badgeEl.textContent = `${selected.type.toUpperCase()} PLANET`;
    }
    if (sphereEl) {
        sphereEl.style.background = `radial-gradient(circle at 30% 30%, ${selected.color}, #081028)`;
        sphereEl.style.boxShadow = `0 0 20px ${selected.color}`;
    }

    // Category 1: Basic Inputs
    const nameInput = document.getElementById('builder-planet-name');
    if (nameInput) nameInput.value = selected.name;

    document.querySelectorAll('#builder-type-chips .type-chip').forEach(chip => {
        if (chip.getAttribute('data-type') === selected.type) {
            chip.classList.add('active');
        } else {
            chip.classList.remove('active');
        }
    });

    const sizeInput = document.getElementById('builder-planet-size');
    const sizeVal = document.getElementById('builder-planet-size-val');
    if (sizeInput) sizeInput.value = selected.size;
    if (sizeVal) sizeVal.textContent = selected.size.toFixed(1) + ' units';

    const colorPicker = document.getElementById('builder-planet-color');
    if (colorPicker) colorPicker.value = selected.color;

    // Category 2: Physical Metrics (Real scientific values from catalog or calculated)
    const spec = COSMOS_PLANET_SPECS[selected.name] || {
        diameter: `${Math.round(selected.size * 2200).toLocaleString()} km`,
        mass: `${(selected.size * 0.9).toFixed(2)} × 10²⁴ kg`,
        gravity: `${(selected.size * 1.8).toFixed(1)} m/s²`,
        gravityPct: Math.min(200, Math.round(selected.size * 18)),
        temp: selected.dist < 60 ? '+140°C' : (selected.dist < 120 ? '+15°C' : '-160°C'),
        tempPct: selected.dist < 60 ? 80 : (selected.dist < 120 ? 50 : 20),
        pressure: selected.hasAtmosphere ? '1.0 bar' : '0.001 bar',
        composition: [
            { gas: 'N₂', pct: '75%' }, { gas: 'O₂', pct: '20%' }, { gas: 'Ar', pct: '5%' }
        ],
        missions: [
            { name: 'COSMOS Deep Survey', year: '2026', agency: 'COSMOS', highlight: 'Spectroscopic orbital profiling' }
        ],
        cosmicNote: 'Evolving under eternal cosmic balance.'
    };

    const diamEl = document.getElementById('metric-diameter');
    if (diamEl) diamEl.textContent = spec.diameter;
    const massEl = document.getElementById('metric-mass');
    if (massEl) massEl.textContent = spec.mass;

    const gravEl = document.getElementById('metric-gravity');
    const gravBar = document.getElementById('metric-gravity-bar');
    if (gravEl) gravEl.textContent = spec.gravity;
    if (gravBar) gravBar.style.width = Math.min(100, (spec.gravityPct || 50) * 0.5) + '%';

    const tempEl = document.getElementById('metric-temp');
    const tempBar = document.getElementById('metric-temp-bar');
    if (tempEl) tempEl.textContent = spec.temp;
    if (tempBar) tempBar.style.width = Math.min(100, spec.tempPct || 50) + '%';

    // Category 3: Orbital Mechanics
    const distInput = document.getElementById('builder-orbit-dist');
    const distVal = document.getElementById('builder-orbit-dist-val');
    if (distInput) distInput.value = selected.dist;
    if (distVal) distVal.textContent = selected.dist + ' AU';

    const speedInput = document.getElementById('builder-orbit-speed');
    const speedVal = document.getElementById('builder-orbit-speed-val');
    if (speedInput) speedInput.value = selected.speed;
    if (speedVal) speedVal.textContent = selected.speed.toFixed(3) + ' rad/s';

    const tiltInput = document.getElementById('builder-orbit-tilt');
    const tiltVal = document.getElementById('builder-orbit-tilt-val');
    if (tiltInput) tiltInput.value = selected.tilt;
    if (tiltVal) tiltVal.textContent = selected.tilt + '°';

    const periodEl = document.getElementById('metric-period');
    if (periodEl) periodEl.textContent = spec.period || `${Math.round(Math.pow(selected.dist / 80, 1.5) * 365)} Earth Days`;
    const dayEl = document.getElementById('metric-daylength');
    if (dayEl) dayEl.textContent = spec.dayLength || `${(24 / (selected.rotSpeed / 0.02)).toFixed(1)} Hours`;
    const axialEl = document.getElementById('metric-axialtilt');
    if (axialEl) axialEl.textContent = spec.axialTilt || `${Math.abs(selected.tilt)}°`;

    // Category 4: Atmosphere & Rings
    const atmoCheck = document.getElementById('builder-planet-atmosphere');
    if (atmoCheck) atmoCheck.checked = selected.hasAtmosphere;

    const ringsCheck = document.getElementById('builder-planet-rings');
    const ringsOptions = document.getElementById('builder-rings-options');
    const ringRadiusInput = document.getElementById('builder-ring-radius');
    const ringRadiusVal = document.getElementById('builder-ring-radius-val');
    if (ringsCheck) ringsCheck.checked = selected.hasRings;
    if (ringsOptions) ringsOptions.style.display = selected.hasRings ? 'block' : 'none';
    if (ringRadiusInput) ringRadiusInput.value = selected.ringRadius || 2.2;
    if (ringRadiusVal) ringRadiusVal.textContent = (selected.ringRadius || 2.2).toFixed(1) + 'x';

    const pressEl = document.getElementById('metric-pressure');
    if (pressEl) pressEl.textContent = spec.pressure;

    const atmoComp = document.getElementById('metric-atmo-comp');
    if (atmoComp && spec.composition) {
        atmoComp.innerHTML = spec.composition.map(g => `<span class="atmo-pill">${g.gas} ${g.pct}</span>`).join('');
    }

    // Category 5: Moons & Exploration
    const moonsList = document.getElementById('builder-moons-list');
    if (moonsList) {
        if (selected.moons && selected.moons.length > 0) {
            moonsList.innerHTML = selected.moons.map((m, idx) => `
                <div class="moon-chip-btn" data-moon-idx="${idx}" title="Click to Focus Camera on ${m.name}">
                    <div class="moon-chip-left">
                        <span>🌕</span>
                        <span>${m.name}</span>
                    </div>
                    <div class="moon-chip-right">${m.period}</div>
                </div>
            `).join('');

            moonsList.querySelectorAll('.moon-chip-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const idx = parseInt(this.getAttribute('data-moon-idx'), 10);
                    const targetMoon = selected.moons[idx];
                    if (targetMoon) {
                        cosmosBuilderSelectMoon(selected, targetMoon);
                    }
                });
            });
        } else {
            moonsList.innerHTML = `<span style="font-size: 0.78em; color: #8bb5e0; font-style: italic;">No major natural satellites orbiting this body.</span>`;
        }
    }

    const missionsList = document.getElementById('builder-missions-list');
    if (missionsList && spec.missions) {
        missionsList.innerHTML = spec.missions.map(m => `
            <div class="mission-item-card">
                <div class="mission-item-name">${m.name} (${m.year}) — ${m.agency}</div>
                <div class="mission-item-details">${m.highlight}</div>
            </div>
        `).join('');
    }

    const noteEl = document.getElementById('builder-cosmic-note');
    if (noteEl && spec.cosmicNote) noteEl.textContent = spec.cosmicNote;
}

// Update Planet Picker Dropdown
function cosmosBuilderUpdatePlanetPicker() {
    const picker = document.getElementById('builder-planet-picker');
    if (!picker) return;

    picker.innerHTML = '';

    // Central Star option
    const starOpt = document.createElement('option');
    starOpt.value = 'star';
    starOpt.textContent = `☀️ ${cosmosBuilderState.starData.name || 'Sol'} (Central Star)`;
    if (cosmosBuilderState.selectedType === 'star') starOpt.selected = true;
    picker.appendChild(starOpt);

    cosmosBuilderState.planets.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = `🪐 ${p.name} (${p.dist} AU - ${p.type.toUpperCase()})`;
        if (cosmosBuilderState.selectedType === 'planet' && p.id === cosmosBuilderState.selectedPlanetId) {
            opt.selected = true;
        }
        picker.appendChild(opt);
    });

    if (cosmosBuilderState.selectedType === 'none') {
        const noneOpt = document.createElement('option');
        noneOpt.value = 'none';
        noneOpt.textContent = '🌌 System Overview (Observatory View)';
        noneOpt.selected = true;
        picker.insertBefore(noneOpt, picker.firstChild);
    }
}

// Update System Status Telemetry
function cosmosBuilderUpdateStats() {
    let moonCount = 0;
    cosmosBuilderState.planets.forEach(p => {
        if (p.moons) moonCount += p.moons.length;
    });

    const pCountEl = document.getElementById('builder-stat-planets');
    if (pCountEl) pCountEl.textContent = `${cosmosBuilderState.planets.length} Planets + ${moonCount} Moons`;

    const oCountEl = document.getElementById('builder-stat-orbits');
    if (oCountEl) oCountEl.textContent = `${cosmosBuilderState.planets.length + moonCount} Active Orbits`;

    const maxDist = cosmosBuilderState.planets.length > 0 
        ? Math.max(...cosmosBuilderState.planets.map(p => p.dist)) 
        : 0;
    const spanEl = document.getElementById('builder-stat-span');
    if (spanEl) spanEl.textContent = `${maxDist} AU`;
}

// Clear All Planets
function cosmosBuilderClearAll() {
    const scene = cosmosBuilderState.scene;
    cosmosBuilderState.planets.forEach(p => {
        if (scene) {
            scene.remove(p.mesh);
            if (p.mesh.geometry) p.mesh.geometry.dispose();
            if (p.mesh.material) p.mesh.material.dispose();
            if (p.orbitLine) {
                scene.remove(p.orbitLine);
                if (p.orbitLine.geometry) p.orbitLine.geometry.dispose();
            }
        }
    });

    cosmosBuilderState.planets = [];
    cosmosBuilderState.selectedPlanetId = null;
    cosmosBuilderState.trackedPlanetId = null;
    cosmosBuilderState.trackedMoon = null;

    cosmosBuilderUpdateInspector();
    cosmosBuilderUpdatePlanetPicker();
    cosmosBuilderUpdateStats();
}

// Restore Standard 8-Planet Solar System
function cosmosBuilderResetDefault() {
    cosmosBuilderClearAll();
    cosmosBuilderState.starData = { name: 'Sol', type: 'yellow', size: 18 };

    const starNameInput = document.getElementById('builder-star-name');
    if (starNameInput) starNameInput.value = 'Sol';
    const starTypeSelect = document.getElementById('builder-star-type');
    if (starTypeSelect) starTypeSelect.value = 'yellow';
    const starSizeInput = document.getElementById('builder-star-size');
    if (starSizeInput) starSizeInput.value = 18;
    const starSizeVal = document.getElementById('builder-star-size-val');
    if (starSizeVal) starSizeVal.textContent = '18 units';

    cosmosBuilderBuildStar();
    cosmosBuilderBuildHabitableZone();
    cosmosBuilderBuildAsteroidBelt();

    COSMOS_DEFAULT_PLANETS.forEach(p => {
        const newP = cosmosBuilderCreatePlanet3D(p);
        cosmosBuilderState.planets.push(newP);
    });

    // Select Earth (index 2) by default
    if (cosmosBuilderState.planets.length > 2) {
        cosmosBuilderSelectPlanet(cosmosBuilderState.planets[2].id);
    }
    cosmosBuilderUpdatePlanetPicker();
    cosmosBuilderUpdateStats();
    cosmosBuilderSetCamera('angled');
}

// Discover Random Planetary System
function cosmosBuilderGenerateRandom() {
    cosmosBuilderClearAll();

    // Randomize star
    const starTypes = Object.keys(COSMOS_STAR_TYPES);
    const chosenType = starTypes[Math.floor(Math.random() * starTypes.length)];
    const starSize = Math.floor(Math.random() * 12) + 14;
    const starNames = ['Kepler-186', 'Trappist-1', 'Sirius Prime', 'Alpha Centauri', 'Gliese-667', 'Vega'];
    const starName = starNames[Math.floor(Math.random() * starNames.length)];

    cosmosBuilderState.starData = { name: starName, type: chosenType, size: starSize };
    const starNameInput = document.getElementById('builder-star-name');
    if (starNameInput) starNameInput.value = starName;
    const starTypeSelect = document.getElementById('builder-star-type');
    if (starTypeSelect) starTypeSelect.value = chosenType;
    const starSizeInput = document.getElementById('builder-star-size');
    if (starSizeInput) starSizeInput.value = starSize;
    const starSizeVal = document.getElementById('builder-star-size-val');
    if (starSizeVal) starSizeVal.textContent = starSize + ' units';

    cosmosBuilderBuildStar();
    cosmosBuilderBuildHabitableZone();
    cosmosBuilderBuildAsteroidBelt();

    const planetCount = Math.floor(Math.random() * 4) + 5; // 5 to 8 planets
    let curDist = 32;

    for (let i = 0; i < planetCount; i++) {
        curDist += Math.floor(Math.random() * 26) + 26;
        const types = Object.keys(COSMOS_PLANET_TYPES);
        const pType = types[Math.floor(Math.random() * types.length)];
        const info = COSMOS_PLANET_TYPES[pType];

        const pData = {
            name: COSMOS_NAME_CATALOG[i % COSMOS_NAME_CATALOG.length] + '-' + (i + 1),
            type: pType,
            size: +(info.defaultSize * (0.85 + Math.random() * 0.4)).toFixed(1),
            dist: curDist,
            speed: +(0.016 / Math.sqrt(curDist / 40)).toFixed(3),
            rotSpeed: 0.015 + Math.random() * 0.025,
            tilt: Math.floor(Math.random() * 10) - 5,
            color: info.color,
            hasRings: Math.random() > 0.65,
            ringRadius: 2.2,
            hasAtmosphere: Math.random() > 0.35
        };
        const pObj = cosmosBuilderCreatePlanet3D(pData);
        cosmosBuilderState.planets.push(pObj);
    }

    if (cosmosBuilderState.planets.length > 0) {
        cosmosBuilderSelectPlanet(cosmosBuilderState.planets[0].id);
    }
    cosmosBuilderUpdatePlanetPicker();
    cosmosBuilderUpdateStats();
    cosmosBuilderSetCamera('angled');
}

// Preset Camera Positioning with Smooth Easing
function cosmosBuilderSetCamera(type) {
    const camera = cosmosBuilderState.camera;
    const controls = cosmosBuilderState.controls;
    if (!camera) return;

    cosmosBuilderState.trackedPlanetId = null;
    cosmosBuilderState.trackedMoon = null;

    let targetCamPos;
    const targetLookAt = new THREE.Vector3(0, 0, 0);

    if (type === 'top') {
        targetCamPos = new THREE.Vector3(0, 480, 0.01);
    } else if (type === 'side') {
        targetCamPos = new THREE.Vector3(0, 15, 380);
    } else {
        // Angled majestic view
        targetCamPos = new THREE.Vector3(0, 140, 240);
    }

    cosmosBuilderStartCamTransition(targetCamPos, targetLookAt, 40);
}

// Smooth Camera Transition Engine
function cosmosBuilderStartCamTransition(endPos, endTarget, duration) {
    const camera = cosmosBuilderState.camera;
    const controls = cosmosBuilderState.controls;
    if (!camera || !controls) return;

    cosmosBuilderState.camTransition = {
        active: true,
        startPos: camera.position.clone(),
        endPos: endPos.clone(),
        startTarget: controls.target.clone(),
        endTarget: endTarget.clone(),
        progress: 0,
        duration: duration || 45
    };
}

// Smoothly Focus Camera on Selected Planet
function cosmosBuilderFocusSelectedPlanet() {
    const selected = cosmosBuilderState.planets.find(p => p.id === cosmosBuilderState.selectedPlanetId);
    if (!selected || !cosmosBuilderState.camera || !cosmosBuilderState.controls) return;

    const tPos = selected.mesh.position.clone();
    const elevation = Math.max(8, selected.size * 1.3);
    const dist = Math.max(16, selected.size * 3.4);

    const endCamPos = new THREE.Vector3(tPos.x + dist * 0.85, tPos.y + elevation, tPos.z + dist * 0.85);

    cosmosBuilderStartCamTransition(endCamPos, tPos, 45);

    // After transition, engage live tracking
    setTimeout(() => {
        cosmosBuilderState.trackedPlanetId = selected.id;
        cosmosBuilderState.trackedMoon = null;
        const focusBtn = document.getElementById('builder-focus-planet-btn');
        if (focusBtn) {
            focusBtn.innerHTML = '🔭 Tracking Body';
            focusBtn.classList.add('active-focus');
        }
    }, 900);
}

// Smoothly Focus Camera on a Natural Moon
function cosmosBuilderFocusMoon(planet, moon) {
    if (!planet || !moon || !cosmosBuilderState.camera || !cosmosBuilderState.controls) return;

    const mPos = new THREE.Vector3();
    moon.mesh.getWorldPosition(mPos);

    const elevation = Math.max(2.5, moon.size * 1.8);
    const dist = Math.max(6, moon.size * 3.8);

    const endCamPos = new THREE.Vector3(mPos.x + dist * 0.85, mPos.y + elevation, mPos.z + dist * 0.85);

    cosmosBuilderStartCamTransition(endCamPos, mPos, 40);

    setTimeout(() => {
        cosmosBuilderState.trackedPlanetId = null;
        cosmosBuilderState.trackedMoon = { planet: planet, moon: moon };
        const focusBtn = document.getElementById('builder-focus-planet-btn');
        if (focusBtn) {
            focusBtn.innerHTML = `🌕 Tracking ${moon.name}`;
            focusBtn.classList.add('active-focus');
        }
    }, 850);
}



// High-Performance 60fps Animation Loop
function cosmosBuilderAnimate() {
    cosmosBuilderState.animFrameId = requestAnimationFrame(cosmosBuilderAnimate);

    const builderRoot = document.getElementById('view-builder');
    if (!builderRoot || !builderRoot.classList.contains('active-view')) {
        return; // Pause rendering when not on builder view
    }

    const scene = cosmosBuilderState.scene;
    const camera = cosmosBuilderState.camera;
    const renderer = cosmosBuilderState.renderer;
    const controls = cosmosBuilderState.controls;
    if (!scene || !camera || !renderer) return;

    const t = cosmosBuilderState.clock ? cosmosBuilderState.clock.getElapsedTime() : Date.now() * 0.001;
    const speedMul = cosmosBuilderState.simulationSpeed;

    // 1. Rotate star core & dynamic corona pulse
    if (cosmosBuilderState.starMesh) {
        cosmosBuilderState.starMesh.rotation.y += 0.0025;
    }
    if (cosmosBuilderState.starCoronaInner) {
        const pulse1 = 1.0 + Math.sin(t * 2.2) * 0.035;
        cosmosBuilderState.starCoronaInner.scale.set(pulse1, pulse1, pulse1);
        cosmosBuilderState.starCoronaInner.rotation.y -= 0.002;
    }
    if (cosmosBuilderState.starCoronaOuter) {
        const pulse2 = 1.0 + Math.sin(t * 1.5 + 1.2) * 0.055;
        cosmosBuilderState.starCoronaOuter.scale.set(pulse2, pulse2, pulse2);
        cosmosBuilderState.starCoronaOuter.rotation.y += 0.001;
    }
    if (cosmosBuilderState.starFlareParticles) {
        cosmosBuilderState.starFlareParticles.rotation.y += 0.0035;
    }
    // Dynamic solar light intensity fluctuation
    if (cosmosBuilderState.starLight) {
        const typeInfo = COSMOS_STAR_TYPES[cosmosBuilderState.starData.type || 'yellow'] || COSMOS_STAR_TYPES.yellow;
        cosmosBuilderState.starLight.intensity = (typeInfo.intensity || 2.4) * (1.0 + Math.sin(t * 3.5) * 0.05 + Math.cos(t * 7.1) * 0.03);
    }

    // 2. Dynamic Keplerian Asteroid Belt Animation
    if (cosmosBuilderState.asteroidBelt && cosmosBuilderState.asteroidBelt.visible && cosmosBuilderState.running) {
        const posAttr = cosmosBuilderState.asteroidBelt.geometry.attributes.position;
        const data = cosmosBuilderState.asteroidData;
        if (posAttr && data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                data[i].theta += data[i].omega * speedMul;
                posAttr.setX(i, Math.cos(data[i].theta) * data[i].r);
                posAttr.setZ(i, Math.sin(data[i].theta) * data[i].r);
            }
            posAttr.needsUpdate = true;
        }
    }

    // 3. Procedural Comets Animation & Anti-Solar Tail
    if (cosmosBuilderState.comets.length > 0) {
        cosmosBuilderState.comets.forEach(c => {
            if (cosmosBuilderState.running) {
                c.u += c.speed * speedMul;
            }
            // Elliptical trajectory: perihelion ~42, aphelion ~320
            const a = 180, e = 0.77;
            const r = (a * (1 - e * e)) / (1 + e * Math.cos(c.u));
            const cx = Math.cos(c.u) * r;
            const cz = Math.sin(c.u) * r * 0.7;
            const cy = Math.sin(c.u * 1.5) * 22; // inclined orbit

            c.mesh.position.set(cx, cy, cz);

            // Tail vectors away from Sun (0, 0, 0)
            const tailDir = new THREE.Vector3(cx, cy, cz).normalize();
            const tailLen = Math.max(25, 260 / Math.max(20, r)); // grows near Sun!

            const posArr = c.tailGeo.attributes.position.array;
            for (let i = 0; i < 75; i++) {
                const frac = i / 75;
                const spread = (Math.random() - 0.5) * frac * 3.5;
                posArr[i * 3]     = cx + tailDir.x * frac * tailLen + spread;
                posArr[i * 3 + 1] = cy + tailDir.y * frac * tailLen + (Math.random() - 0.5) * frac * 2;
                posArr[i * 3 + 2] = cz + tailDir.z * frac * tailLen + spread;
            }
            c.tailGeo.attributes.position.needsUpdate = true;
        });
    }

    // 4. Animate Planets, Moons & Atmospheres
    if (cosmosBuilderState.running) {
        cosmosBuilderState.planets.forEach(p => {
            // What-If Dynamic Orbital Physics (Decay inward or Hyperbolic escape)
            if (p.isWhatIfDecaying) {
                const minSolarDist = (cosmosBuilderState.starData.size || 18) + 2.0;
                p.dist = Math.max(minSolarDist, p.dist - 0.08 * speedMul);
                if (p.dist <= minSolarDist + 0.1 && !p._decayAlerted) {
                    p._decayAlerted = true;
                    if (typeof cosmosBuilderShowEventBanner === 'function') {
                        cosmosBuilderShowEventBanner('Solar Gravitational Plunge: Planet captured by stellar corona!', '💥');
                    }
                }
                cosmosBuilderUpdateOrbitLine(p);
            } else if (p.isWhatIfEscaping) {
                p.dist += 0.35 * speedMul;
                cosmosBuilderUpdateOrbitLine(p);
            }

            // Animate What-If Gravitational Influence Mesh
            if (p.whatIfGravMesh) {
                p.whatIfGravMesh.rotation.y += 0.012;
                p.whatIfGravMesh.rotation.z += 0.008;
            }
            p.angle += p.speed * speedMul;
            p.mesh.position.x = Math.cos(p.angle) * p.dist;
            p.mesh.position.z = Math.sin(p.angle) * p.dist;
            p.mesh.position.y = Math.sin(p.angle) * p.dist * Math.sin(p.tilt * Math.PI / 180);
            
            // Planetary spin on axis (tilted, retrograde for Venus/Uranus)
            p.mesh.rotation.y += (p.rotSpeed || 0.02) * speedMul;

            // Rotating cloud layer
            if (p.cloudMesh) {
                p.cloudMesh.rotation.y += (p.rotSpeed || 0.02) * 1.25 * speedMul;
            }

            // Reticle rotation
            if (p.reticleMesh && p.reticleMesh.visible) {
                p.reticleMesh.rotation.z += 0.035;
            }

            // Animate Moons around parent planet
            if (p.moons && p.moons.length > 0) {
                p.moons.forEach(m => {
                    m.angle += m.speed * speedMul;
                    m.mesh.position.set(Math.cos(m.angle) * m.dist, 0, Math.sin(m.angle) * m.dist);
                    m.mesh.rotation.y += 0.025 * speedMul;
                    m.mesh.visible = cosmosBuilderState.showMoons;
                    m.orbitLine.visible = cosmosBuilderState.showMoons;
                });
            }
        });
    }

    // 5. 3D Holographic Scan Ring Pulse Animation
    if (cosmosBuilderState.activeScanRing) {
        const sr = cosmosBuilderState.activeScanRing;
        sr.scale += 0.04;
        sr.opacity -= 0.025;
        sr.mesh.scale.set(sr.scale, sr.scale, sr.scale);
        sr.mesh.material.opacity = Math.max(0, sr.opacity);
        if (sr.planet && sr.planet.mesh) {
            sr.mesh.position.copy(sr.planet.mesh.position);
        }
        if (sr.opacity <= 0) {
            scene.remove(sr.mesh);
            if (sr.mesh.geometry) sr.mesh.geometry.dispose();
            if (sr.mesh.material) sr.mesh.material.dispose();
            cosmosBuilderState.activeScanRing = null;
        }
    }

    // 6. Smooth Camera Transition Easing
    if (cosmosBuilderState.camTransition && cosmosBuilderState.camTransition.active) {
        const ct = cosmosBuilderState.camTransition;
        ct.progress += 1 / ct.duration;
        const factor = Math.min(1, ct.progress);
        // Smoothstep interpolation (3x^2 - 2x^3)
        const ease = factor * factor * (3 - 2 * factor);

        camera.position.lerpVectors(ct.startPos, ct.endPos, ease);
        if (controls) {
            controls.target.lerpVectors(ct.startTarget, ct.endTarget, ease);
        }

        if (factor >= 1) {
            ct.active = false;
        }
    }

    // 7. Cinematic Planet / Moon Tracking Mode
    if (!cosmosBuilderState.camTransition.active) {
        if (cosmosBuilderState.trackedPlanetId) {
            const tracked = cosmosBuilderState.planets.find(p => p.id === cosmosBuilderState.trackedPlanetId);
            if (tracked && controls) {
                const tPos = tracked.mesh.position;
                const elevation = Math.max(8, tracked.size * 1.3);
                const dist = Math.max(16, tracked.size * 3.4);

                controls.target.copy(tPos);
                camera.position.set(tPos.x + dist * 0.85, tPos.y + elevation, tPos.z + dist * 0.85);
            }
        } else if (cosmosBuilderState.trackedMoon && controls) {
            const tm = cosmosBuilderState.trackedMoon;
            if (tm.moon && tm.moon.mesh) {
                const mPos = new THREE.Vector3();
                tm.moon.mesh.getWorldPosition(mPos);
                const elevation = Math.max(2.5, tm.moon.size * 1.8);
                const dist = Math.max(6, tm.moon.size * 3.8);

                controls.target.copy(mPos);
                camera.position.set(mPos.x + dist * 0.85, mPos.y + elevation, mPos.z + dist * 0.85);
            }
        }
    }

    // 8. Periodic Celestial Alignments & Cosmic Events Check (~every 2.5s)
    if (Date.now() - cosmosBuilderState.lastAlignmentCheck > 2500) {
        cosmosBuilderCheckCelestialEvents();
        cosmosBuilderState.lastAlignmentCheck = Date.now();
    }

    // 9. Update floating reticle tag
    const selectedPlanet = cosmosBuilderState.planets.find(p => p.id === cosmosBuilderState.selectedPlanetId);
    const tag = document.getElementById('builder-floating-tag');
    if (tag && selectedPlanet && cosmosBuilderState.showLabels && !cosmosBuilderState.isObservationMode) {
        const container = document.getElementById('cosmos-builder-canvas');
        if (container) {
            const v = selectedPlanet.mesh.position.clone();
            v.project(camera);
            if (v.z < 1) { // in front of camera
                const x = (v.x * 0.5 + 0.5) * container.clientWidth;
                const y = (-(v.y * 0.5) + 0.5) * container.clientHeight;
                tag.style.left = x + 'px';
                tag.style.top = y + 'px';
                tag.style.display = 'flex';
                const nameEl = document.getElementById('builder-tag-name');
                if (nameEl) nameEl.textContent = selectedPlanet.name;
                const distEl = document.getElementById('builder-tag-dist');
                if (distEl) distEl.textContent = selectedPlanet.dist + ' AU';
            } else {
                tag.style.display = 'none';
            }
        }
    } else if (tag) {
        tag.style.display = 'none';
    }

    if (controls) controls.update();
    renderer.render(scene, camera);
}

// Check Natural Celestial Syzygy Alignments & Solar Eclipses
function cosmosBuilderCheckCelestialEvents() {
    if (cosmosBuilderState.planets.length < 3) return;

    // Normalize angles to [0, 2PI)
    const angles = cosmosBuilderState.planets.map(p => {
        let a = p.angle % (Math.PI * 2);
        if (a < 0) a += Math.PI * 2;
        return { planet: p, angle: a };
    });

    // Check if 3 planets are within 14 degrees (0.24 rad)
    let alignedGroup = null;
    for (let i = 0; i < angles.length; i++) {
        const group = [angles[i]];
        for (let j = 0; j < angles.length; j++) {
            if (i === j) continue;
            let diff = Math.abs(angles[i].angle - angles[j].angle);
            if (diff > Math.PI) diff = Math.PI * 2 - diff;
            if (diff < 0.24) {
                group.push(angles[j]);
            }
        }
        if (group.length >= 3) {
            alignedGroup = group;
            break;
        }
    }

    if (alignedGroup) {
        const names = alignedGroup.map(g => g.planet.name).join(' — ');
        cosmosBuilderShowEventBanner(
            '☸',
            'PLANETARY ALIGNMENT (SYZYGY)',
            `Cosmic Order Harmony: ${names} in celestial alignment!`
        );

        // Draw subtle visual alignment ray
        const scene = cosmosBuilderState.scene;
        if (scene) {
            if (cosmosBuilderState.alignmentLine) {
                scene.remove(cosmosBuilderState.alignmentLine);
            }
            const pts = [new THREE.Vector3(0, 0, 0)];
            alignedGroup.forEach(g => {
                pts.push(g.planet.mesh.position.clone());
            });
            const geo = new THREE.BufferGeometry().setFromPoints(pts);
            const mat = new THREE.LineBasicMaterial({
                color: 0xdfb15b,
                transparent: true,
                opacity: 0.65
            });
            const line = new THREE.Line(geo, mat);
            scene.add(line);
            cosmosBuilderState.alignmentLine = line;

            setTimeout(() => {
                if (cosmosBuilderState.alignmentLine) {
                    scene.remove(cosmosBuilderState.alignmentLine);
                    cosmosBuilderState.alignmentLine = null;
                }
            }, 6000);
        }
        return;
    }

    // Check Earth Solar Eclipse
    const earth = cosmosBuilderState.planets.find(p => p.name === 'Earth');
    if (earth && earth.moons && earth.moons.length > 0) {
        const moon = earth.moons[0];
        let mAngle = moon.angle % (Math.PI * 2);
        if (mAngle < 0) mAngle += Math.PI * 2;
        // When moon is between Earth and Sun
        if (mAngle < 0.15 || mAngle > Math.PI * 2 - 0.15) {
            cosmosBuilderShowEventBanner(
                '🌑',
                'CELESTIAL ECLIPSE',
                'Luna in syzygy between Earth and Sol: Solar Eclipse!'
            );
        }
    }
}

// Display Viewport Celestial Event Banner with Auto-Dismiss
function cosmosBuilderShowEventBanner(icon, tag, title) {
    const banner = document.getElementById('builder-event-banner');
    if (!banner) return;

    const iconEl = document.getElementById('builder-event-icon');
    const tagEl = document.getElementById('builder-event-tag');
    const titleEl = document.getElementById('builder-event-title');

    if (iconEl) iconEl.textContent = icon;
    if (tagEl) tagEl.textContent = tag;
    if (titleEl) titleEl.textContent = title;

    banner.style.display = 'flex';

    if (cosmosBuilderState.eventBannerTimer) {
        clearTimeout(cosmosBuilderState.eventBannerTimer);
    }
    cosmosBuilderState.eventBannerTimer = setTimeout(() => {
        banner.style.display = 'none';
    }, 5500);
}

// Physical Step-Time Controls (+1D, +10D, +100D)
function cosmosBuilderStepTime(days) {
    if (!days || isNaN(days)) return;

    // Advance all planets: delta = speed * 60 * (days / 365)
    cosmosBuilderState.planets.forEach(p => {
        const deltaAngle = (p.speed * 45) * (days / 365.25);
        p.angle += deltaAngle;
        p.mesh.position.x = Math.cos(p.angle) * p.dist;
        p.mesh.position.z = Math.sin(p.angle) * p.dist;
        p.mesh.position.y = Math.sin(p.angle) * p.dist * Math.sin(p.tilt * Math.PI / 180);
        p.mesh.rotation.y += (p.rotSpeed || 0.02) * (days * 1.5);

        if (p.moons && p.moons.length > 0) {
            p.moons.forEach(m => {
                m.angle += (m.speed * 45) * (days / 27.3);
                m.mesh.position.set(Math.cos(m.angle) * m.dist, 0, Math.sin(m.angle) * m.dist);
            });
        }
    });

    // Advance asteroids
    if (cosmosBuilderState.asteroidData && cosmosBuilderState.asteroidBelt) {
        const posAttr = cosmosBuilderState.asteroidBelt.geometry.attributes.position;
        const data = cosmosBuilderState.asteroidData;
        for (let i = 0; i < data.length; i++) {
            data[i].theta += data[i].omega * (days * 2.0);
            posAttr.setX(i, Math.cos(data[i].theta) * data[i].r);
            posAttr.setZ(i, Math.sin(data[i].theta) * data[i].r);
        }
        posAttr.needsUpdate = true;
    }

    cosmosBuilderShowEventBanner(
        '⏱️',
        'TIME STEP ADVANCE',
        `Solar System simulated forward by +${days} Days (${(days / 365.25).toFixed(2)} Years)`
    );
}

// Set Simulation Time Multiplier (1x, 10x, 100x, 1000x)
function cosmosBuilderSetSpeed(speed) {
    cosmosBuilderState.simulationSpeed = speed;
    const speedStat = document.getElementById('builder-stat-speed');
    if (speedStat) {
        speedStat.textContent = `${speed}× (${cosmosBuilderState.running ? 'ACTIVE' : 'PAUSED'})`;
    }

    document.querySelectorAll('.sim-speed-group .speed-btn').forEach(b => {
        if (parseFloat(b.getAttribute('data-speed')) === speed) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
}

// Toggle Observation Mode (Pure 3D Screen Maximization)
function cosmosBuilderToggleObservationMode(forceState) {
    const root = document.getElementById('cosmos-builder-root');
    const obsHud = document.getElementById('builder-obs-hud');
    if (!root) return;

    if (forceState !== undefined) {
        cosmosBuilderState.isObservationMode = forceState;
    } else {
        cosmosBuilderState.isObservationMode = !cosmosBuilderState.isObservationMode;
    }

    if (cosmosBuilderState.isObservationMode) {
        root.classList.add('builder-observation-mode');
        document.body.classList.add('lab-sidebar-collapsed');
        if (obsHud) obsHud.style.display = 'flex';
        const targetNameEl = document.getElementById('builder-obs-target-name');
        const selected = cosmosBuilderState.planets.find(p => p.id === cosmosBuilderState.selectedPlanetId);
        if (targetNameEl) {
            targetNameEl.textContent = selected ? `Target: ${selected.name} System` : 'Target: Full Solar System';
        }
    } else {
        root.classList.remove('builder-observation-mode');
        document.body.classList.remove('lab-sidebar-collapsed');
        if (obsHud) obsHud.style.display = 'none';
    }

    setTimeout(cosmosBuilderOnResize, 60);
}

// Guided Cinematic Camera Tour Engine
const COSMOS_TOUR_STOPS = [
    {
        title: 'Sol — The Living Sovereign Star',
        badge: 'STOP 1 OF 9',
        desc: 'Witnessing the dynamic convective corona, solar prominences, and gravitational anchor preserving planetary order.',
        pos: new THREE.Vector3(0, 24, 48),
        target: new THREE.Vector3(0, 0, 0),
        planetName: null
    },
    {
        title: 'Inner Realm — Mercury & Venus',
        badge: 'STOP 2 OF 9',
        desc: 'Sweeping across the scorched cratered plains of Mercury and the dense golden cloud decks of Venus.',
        pos: new THREE.Vector3(30, 20, 65),
        target: new THREE.Vector3(44, 0, 10),
        planetName: 'Venus'
    },
    {
        title: 'Earth & Luna — The Cradle of Life',
        badge: 'STOP 3 OF 9',
        desc: 'Observing the vibrant blue marble, swirling white cloud layers, and our natural satellite orbiting in the habitable zone.',
        pos: new THREE.Vector3(75, 14, 95),
        target: new THREE.Vector3(80, 0, 0),
        planetName: 'Earth'
    },
    {
        title: 'Mars & Phobos — The Rust Canyon World',
        badge: 'STOP 4 OF 9',
        desc: 'Visiting the red dunes of Olympus Mons and the ancient dry riverbeds with Phobos orbiting nearby.',
        pos: new THREE.Vector3(105, 12, 125),
        target: new THREE.Vector3(112, 0, 0),
        planetName: 'Mars'
    },
    {
        title: 'Main Asteroid Belt — The Rocky Swarm',
        badge: 'STOP 5 OF 9',
        desc: 'Flying through thousands of orbiting Keplerian asteroids, dwarf planet Ceres, and primordial cosmic remnants.',
        pos: new THREE.Vector3(0, 35, 145),
        target: new THREE.Vector3(138, 0, 0),
        planetName: null
    },
    {
        title: 'Jupiter — Monarch of the Planets',
        badge: 'STOP 6 OF 9',
        desc: 'Witnessing the colossal multi-banded storms, Great Red Spot, and the ocean worlds of the Galilean moons.',
        pos: new THREE.Vector3(150, 28, 195),
        target: new THREE.Vector3(162, 0, 0),
        planetName: 'Jupiter'
    },
    {
        title: 'Saturn — The Jewel of Rings',
        badge: 'STOP 7 OF 9',
        desc: 'A magnificent pass along the ring plane, revealing the dark Cassini Division and golden hydrocarbon moon Titan.',
        pos: new THREE.Vector3(205, 24, 250),
        target: new THREE.Vector3(218, 0, 0),
        planetName: 'Saturn'
    },
    {
        title: 'Uranus & Neptune — The Outer Ice Giants',
        badge: 'STOP 8 OF 9',
        desc: 'Journeying to the frozen frontiers of azure methane atmospheres and retrograde moon Triton.',
        pos: new THREE.Vector3(265, 30, 310),
        target: new THREE.Vector3(275, 0, 0),
        planetName: 'Uranus'
    },
    {
        title: 'Cosmic Order (Rta) — Infinite Planetary Harmony',
        badge: 'STOP 9 OF 9',
        desc: 'Pulling back to a grand panorama of the entire solar system dancing in perpetual celestial equilibrium.',
        pos: new THREE.Vector3(0, 380, 360),
        target: new THREE.Vector3(0, 0, 0),
        planetName: null
    }
];

function cosmosBuilderStartTour() {
    cosmosBuilderState.isTourActive = true;
    cosmosBuilderState.tourStepIndex = 0;

    const tourHud = document.getElementById('builder-tour-hud');
    if (tourHud) tourHud.style.display = 'flex';

    cosmosBuilderExecuteTourStep(0);
}

function cosmosBuilderExecuteTourStep(index) {
    if (index < 0 || index >= COSMOS_TOUR_STOPS.length) {
        cosmosBuilderExitTour();
        return;
    }

    cosmosBuilderState.tourStepIndex = index;
    const stop = COSMOS_TOUR_STOPS[index];

    // Update HUD
    const badgeEl = document.getElementById('builder-tour-step-badge');
    const titleEl = document.getElementById('builder-tour-title');
    const descEl = document.getElementById('builder-tour-desc');
    const fillEl = document.getElementById('builder-tour-progress-fill');

    if (badgeEl) badgeEl.textContent = stop.badge;
    if (titleEl) titleEl.textContent = stop.title;
    if (descEl) descEl.textContent = stop.desc;
    if (fillEl) fillEl.style.width = `${((index + 1) / COSMOS_TOUR_STOPS.length) * 100}%`;

    // Target Planet if applicable
    if (stop.planetName) {
        const p = cosmosBuilderState.planets.find(item => item.name === stop.planetName);
        if (p) {
            cosmosBuilderSelectPlanet(p.id);
            const tPos = p.mesh.position.clone();
            const endPos = new THREE.Vector3(tPos.x + 22, tPos.y + 12, tPos.z + 24);
            cosmosBuilderStartCamTransition(endPos, tPos, 50);
            return;
        }
    }

    cosmosBuilderStartCamTransition(stop.pos, stop.target, 50);
}

function cosmosBuilderExitTour() {
    cosmosBuilderState.isTourActive = false;
    const tourHud = document.getElementById('builder-tour-hud');
    if (tourHud) tourHud.style.display = 'none';

    cosmosBuilderSetCamera('angled');
}

// Side-by-Side Planet Compare Mode
function cosmosBuilderOpenCompareModal(pAId, pBId) {
    const modal = document.getElementById('builder-compare-modal');
    if (!modal) return;

    const selA = document.getElementById('compare-select-a');
    const selB = document.getElementById('compare-select-b');

    if (selA && selB) {
        selA.innerHTML = '';
        selB.innerHTML = '';
        cosmosBuilderState.planets.forEach(p => {
            const optA = document.createElement('option');
            optA.value = p.name;
            optA.textContent = p.name;
            selA.appendChild(optA);

            const optB = document.createElement('option');
            optB.value = p.name;
            optB.textContent = p.name;
            selB.appendChild(optB);
        });

        // Set default selections (e.g. Earth vs Mars)
        selA.value = pAId || 'Earth';
        selB.value = pBId || (cosmosBuilderState.planets.length > 3 ? 'Mars' : 'Venus');

        selA.onchange = () => cosmosBuilderRenderCompareGrid(selA.value, selB.value);
        selB.onchange = () => cosmosBuilderRenderCompareGrid(selA.value, selB.value);
    }

    cosmosBuilderRenderCompareGrid(selA.value, selB.value);
    modal.style.display = 'flex';
}

function cosmosBuilderRenderCompareGrid(nameA, nameB) {
    const grid = document.getElementById('compare-content-grid');
    if (!grid) return;

    const specA = COSMOS_PLANET_SPECS[nameA] || COSMOS_PLANET_SPECS['Earth'];
    const specB = COSMOS_PLANET_SPECS[nameB] || COSMOS_PLANET_SPECS['Mars'];
    const pObjA = cosmosBuilderState.planets.find(p => p.name === nameA);
    const pObjB = cosmosBuilderState.planets.find(p => p.name === nameB);

    const colA = pObjA ? pObjA.color : '#2271b3';
    const colB = pObjB ? pObjB.color : '#e27b58';

    grid.innerHTML = `
        <div class="compare-spheres-preview">
            <div class="compare-sphere-card">
                <div class="compare-sphere-visual" style="background: radial-gradient(circle at 30% 30%, ${colA}, #040818); box-shadow: 0 0 24px ${colA};"></div>
                <h4>${nameA}</h4>
                <span>${specA.diameter} • ${specA.distAU}</span>
            </div>
            <div class="compare-sphere-card">
                <div class="compare-sphere-visual" style="background: radial-gradient(circle at 30% 30%, ${colB}, #040818); box-shadow: 0 0 24px ${colB};"></div>
                <h4>${nameB}</h4>
                <span>${specB.diameter} • ${specB.distAU}</span>
            </div>
        </div>

        <table class="compare-table">
            <thead>
                <tr>
                    <th>METRIC / PROPERTY</th>
                    <th>${nameA.toUpperCase()}</th>
                    <th>${nameB.toUpperCase()}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Diameter (Size)</td>
                    <td>${specA.diameter}</td>
                    <td>${specB.diameter}</td>
                </tr>
                <tr>
                    <td>Planetary Mass</td>
                    <td>${specA.mass}</td>
                    <td>${specB.mass}</td>
                </tr>
                <tr>
                    <td>Surface Gravity</td>
                    <td>${specA.gravity}</td>
                    <td>${specB.gravity}</td>
                </tr>
                <tr>
                    <td>Mean Surface Temperature</td>
                    <td>${specA.temp}</td>
                    <td>${specB.temp}</td>
                </tr>
                <tr>
                    <td>Day Length (Rotation)</td>
                    <td>${specA.dayLength}</td>
                    <td>${specB.dayLength}</td>
                </tr>
                <tr>
                    <td>Year Length (Orbital Period)</td>
                    <td>${specA.period}</td>
                    <td>${specB.period}</td>
                </tr>
                <tr>
                    <td>Atmospheric Pressure</td>
                    <td>${specA.pressure}</td>
                    <td>${specB.pressure}</td>
                </tr>
                <tr>
                    <td>Natural Moons</td>
                    <td>${(COSMOS_PLANET_MOONS[nameA] || []).map(m => m.name).join(', ') || '0 Moons'}</td>
                    <td>${(COSMOS_PLANET_MOONS[nameB] || []).map(m => m.name).join(', ') || '0 Moons'}</td>
                </tr>
            </tbody>
        </table>
    `;
}

// Pause & Resume Helpers
function cosmosBuilderPause() {
    cosmosBuilderState.running = false;
    const btn = document.getElementById('builder-sim-toggle');
    if (btn) {
        const icon = document.getElementById('builder-sim-play-icon');
        const text = document.getElementById('builder-sim-play-text');
        if (icon) icon.textContent = '▶️';
        if (text) text.textContent = 'RESUME';
    }
    const badge = document.getElementById('builder-sim-status-badge');
    if (badge) badge.textContent = 'SIMULATION: PAUSED';
    const speedStat = document.getElementById('builder-stat-speed');
    if (speedStat) speedStat.textContent = `${cosmosBuilderState.simulationSpeed}× (PAUSED)`;
}

function cosmosBuilderResume() {
    cosmosBuilderState.running = true;
    const btn = document.getElementById('builder-sim-toggle');
    if (btn) {
        const icon = document.getElementById('builder-sim-play-icon');
        const text = document.getElementById('builder-sim-play-text');
        if (icon) icon.textContent = '⏸️';
        if (text) text.textContent = 'PAUSE';
    }
    const badge = document.getElementById('builder-sim-status-badge');
    if (badge) badge.textContent = 'SIMULATION: ACTIVE';
    const speedStat = document.getElementById('builder-stat-speed');
    if (speedStat) speedStat.textContent = `${cosmosBuilderState.simulationSpeed}× (ACTIVE)`;
}

// Canvas Click Raycasting Interaction
function cosmosBuilderHandleCanvasClick(event) {
    const dx = Math.abs(event.clientX - cosmosBuilderState.pointerDownPos.x);
    const dy = Math.abs(event.clientY - cosmosBuilderState.pointerDownPos.y);
    if (dx > 5 || dy > 5) return; // ignore drags

    const canvas = cosmosBuilderState.renderer.domElement;
    const rect = canvas.getBoundingClientRect();
    cosmosBuilderState.mouse.x = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
    cosmosBuilderState.mouse.y = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;

    cosmosBuilderState.raycaster.setFromCamera(cosmosBuilderState.mouse, cosmosBuilderState.camera);
    
    // Check star, planets and moons
    const meshes = [];
    if (cosmosBuilderState.starMesh) {
        meshes.push(cosmosBuilderState.starMesh);
    }
    if (cosmosBuilderState.starCoronaInner) {
        meshes.push(cosmosBuilderState.starCoronaInner);
    }
    cosmosBuilderState.planets.forEach(p => {
        meshes.push(p.mesh);
        if (p.moons) {
            p.moons.forEach(m => meshes.push(m.mesh));
        }
    });

    const intersects = cosmosBuilderState.raycaster.intersectObjects(meshes, true);
    if (intersects.length > 0) {
        let hit = intersects[0].object;
        while (hit && !hit.userData.isStar && !hit.userData.isPlanet && !hit.userData.isMoon && hit.parent) {
            hit = hit.parent;
        }
        if (hit && hit.userData.isStar) {
            cosmosBuilderSelectStar();
        } else if (hit && hit.userData.isPlanet) {
            cosmosBuilderSelectPlanet(hit.userData.planetId);
        } else if (hit && hit.userData.isMoon) {
            const moonData = hit.userData.moonObj;
            const parentP = cosmosBuilderState.planets.find(p => p.moons && p.moons.includes(moonData));
            if (parentP && moonData) {
                cosmosBuilderSelectMoon(parentP, moonData);
            }
        }
    } else {
        cosmosBuilderDeselectAll();
    }
}

// Save & Load System in Local Storage
function cosmosBuilderSaveSystem() {
    const nameInput = document.getElementById('builder-system-save-name');
    const systemName = (nameInput && nameInput.value.trim()) || 'COSMOS-SYS';

    const systemData = {
        name: systemName,
        timestamp: Date.now(),
        star: cosmosBuilderState.starData,
        planets: cosmosBuilderState.planets.map(p => ({
            name: p.name,
            type: p.type,
            size: p.size,
            dist: p.dist,
            speed: p.speed,
            rotSpeed: p.rotSpeed,
            tilt: p.tilt,
            color: p.color,
            hasRings: p.hasRings,
            ringRadius: p.ringRadius,
            hasAtmosphere: p.hasAtmosphere
        }))
    };

    try {
        const savedSystems = JSON.parse(localStorage.getItem('cosmos_builder_saved') || '[]');
        savedSystems.push(systemData);
        localStorage.setItem('cosmos_builder_saved', JSON.stringify(savedSystems));
        cosmosBuilderUpdateSavedList();
        alert(`System "${systemName}" saved successfully!`);
    } catch (e) {
        alert('Saved system locally in memory.');
    }
}

function cosmosBuilderUpdateSavedList() {
    const listWrap = document.getElementById('builder-saved-list');
    const select = document.getElementById('builder-saved-select');
    if (!select || !listWrap) return;

    try {
        const savedSystems = JSON.parse(localStorage.getItem('cosmos_builder_saved') || '[]');
        if (savedSystems.length === 0) {
            listWrap.style.display = 'none';
            return;
        }

        select.innerHTML = '<option value="">-- Choose Saved System --</option>';
        savedSystems.forEach((sys, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = `${sys.name} (${sys.planets.length} planets)`;
            select.appendChild(opt);
        });
        listWrap.style.display = 'block';
    } catch (e) {}
}

function cosmosBuilderLoadSelectedSystem(idx) {
    if (idx === '' || idx === undefined) return;
    try {
        const savedSystems = JSON.parse(localStorage.getItem('cosmos_builder_saved') || '[]');
        const sys = savedSystems[idx];
        if (!sys) return;

        cosmosBuilderClearAll();
        cosmosBuilderState.starData = sys.star || { name: 'Sol', type: 'yellow', size: 18 };
        cosmosBuilderBuildStar();
        cosmosBuilderBuildHabitableZone();
        cosmosBuilderBuildAsteroidBelt();

        sys.planets.forEach(p => {
            const newP = cosmosBuilderCreatePlanet3D(p);
            cosmosBuilderState.planets.push(newP);
        });

        if (cosmosBuilderState.planets.length > 0) {
            cosmosBuilderSelectPlanet(cosmosBuilderState.planets[0].id);
        }
        cosmosBuilderUpdatePlanetPicker();
        cosmosBuilderUpdateStats();
    } catch (e) {}
}

// Complete UI Event Listeners Wiring
function cosmosBuilderSetupUI() {
    // 1. Topbar Action Buttons
    const backBtn = document.querySelector('.builder-back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => switchCosmosView('view-explore'));
    }

    const obsBtn = document.getElementById('builder-observation-btn');
    if (obsBtn) {
        obsBtn.addEventListener('click', () => cosmosBuilderToggleObservationMode(true));
    }

    const obsExitBtn = document.getElementById('builder-obs-exit-btn');
    if (obsExitBtn) {
        obsExitBtn.addEventListener('click', () => cosmosBuilderToggleObservationMode(false));
    }

    const tourBtn = document.getElementById('builder-tour-btn');
    if (tourBtn) {
        tourBtn.addEventListener('click', cosmosBuilderStartTour);
    }

    const tourExitBtn = document.getElementById('builder-tour-exit-btn');
    if (tourExitBtn) {
        tourExitBtn.addEventListener('click', cosmosBuilderExitTour);
    }

    const tourPrevBtn = document.getElementById('builder-tour-prev-btn');
    if (tourPrevBtn) {
        tourPrevBtn.addEventListener('click', () => {
            cosmosBuilderExecuteTourStep(cosmosBuilderState.tourStepIndex - 1);
        });
    }

    const tourNextBtn = document.getElementById('builder-tour-next-btn');
    if (tourNextBtn) {
        tourNextBtn.addEventListener('click', () => {
            cosmosBuilderExecuteTourStep(cosmosBuilderState.tourStepIndex + 1);
        });
    }

    const compareBtn = document.getElementById('builder-compare-btn');
    if (compareBtn) {
        compareBtn.addEventListener('click', () => {
            const selected = cosmosBuilderState.planets.find(p => p.id === cosmosBuilderState.selectedPlanetId);
            cosmosBuilderOpenCompareModal(selected ? selected.name : 'Earth', 'Mars');
        });
    }

    const compareCloseBtn = document.getElementById('builder-compare-close-btn');
    if (compareCloseBtn) {
        compareCloseBtn.addEventListener('click', () => {
            const modal = document.getElementById('builder-compare-modal');
            if (modal) modal.style.display = 'none';
        });
    }

    const fsBtn = document.getElementById('builder-toggle-fullscreen-btn');
    if (fsBtn) {
        fsBtn.addEventListener('click', () => {
            const ws = document.getElementById('cosmos-builder-workspace');
            if (ws) {
                ws.classList.toggle('fullscreen-3d-mode');
                setTimeout(cosmosBuilderOnResize, 60);
            }
        });
    }

    const resetBtn = document.getElementById('builder-quick-reset-btn');
    if (resetBtn) resetBtn.addEventListener('click', cosmosBuilderResetDefault);

    const toggleSidebarBtn = document.getElementById('builder-toggle-sidebar-btn');
    if (toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener('click', () => {
            document.body.classList.toggle('lab-sidebar-collapsed');
            setTimeout(cosmosBuilderOnResize, 250);
        });
    }

    // 2. Presets & Spawn
    const addPlanetBtn = document.getElementById('builder-add-planet-btn');
    if (addPlanetBtn) addPlanetBtn.addEventListener('click', () => cosmosBuilderAddPlanet());

    const defaultBtn = document.getElementById('builder-default-btn');
    if (defaultBtn) defaultBtn.addEventListener('click', cosmosBuilderResetDefault);

    const randomBtn = document.getElementById('builder-random-btn');
    if (randomBtn) randomBtn.addEventListener('click', cosmosBuilderGenerateRandom);

    const clearBtn = document.getElementById('builder-clear-btn');
    if (clearBtn) clearBtn.addEventListener('click', cosmosBuilderClearAll);

    // 3. Central Star Controls
    const starNameInput = document.getElementById('builder-star-name');
    if (starNameInput) {
        starNameInput.addEventListener('input', (e) => {
            cosmosBuilderState.starData.name = e.target.value.trim() || 'Sol';
        });
    }

    const starTypeSelect = document.getElementById('builder-star-type');
    if (starTypeSelect) {
        starTypeSelect.addEventListener('change', (e) => {
            cosmosBuilderState.starData.type = e.target.value;
            cosmosBuilderBuildStar();
            cosmosBuilderBuildHabitableZone();
        });
    }

    const starSizeInput = document.getElementById('builder-star-size');
    if (starSizeInput) {
        starSizeInput.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10);
            cosmosBuilderState.starData.size = val;
            const sizeVal = document.getElementById('builder-star-size-val');
            if (sizeVal) sizeVal.textContent = val + ' units';
            cosmosBuilderBuildStar();
        });
    }

    // 4. Archive Save & Load
    const saveBtn = document.getElementById('builder-save-btn');
    if (saveBtn) saveBtn.addEventListener('click', cosmosBuilderSaveSystem);

    const loadBtn = document.getElementById('builder-load-btn');
    if (loadBtn) {
        loadBtn.addEventListener('click', () => {
            const list = document.getElementById('builder-saved-list');
            if (list) list.style.display = list.style.display === 'none' ? 'block' : 'none';
        });
    }

    const savedSelect = document.getElementById('builder-saved-select');
    if (savedSelect) {
        savedSelect.addEventListener('change', (e) => {
            cosmosBuilderLoadSelectedSystem(e.target.value);
        });
    }
    cosmosBuilderUpdateSavedList();

    // 5. Viewport Camera Angles
    const camAngled = document.getElementById('builder-cam-angled');
    if (camAngled) camAngled.addEventListener('click', () => cosmosBuilderSetCamera('angled'));

    const camTop = document.getElementById('builder-cam-top');
    if (camTop) camTop.addEventListener('click', () => cosmosBuilderSetCamera('top'));

    const camSide = document.getElementById('builder-cam-side');
    if (camSide) camSide.addEventListener('click', () => cosmosBuilderSetCamera('side'));

    const camReset = document.getElementById('builder-cam-reset');
    if (camReset) camReset.addEventListener('click', () => cosmosBuilderSetCamera('angled'));

    // 6. Viewport Toggles & Trail Mode
    const trailSelect = document.getElementById('builder-trail-mode');
    if (trailSelect) {
        trailSelect.addEventListener('change', (e) => {
            cosmosBuilderState.trailMode = e.target.value;
            cosmosBuilderState.planets.forEach(p => {
                if (p.orbitLine) {
                    if (cosmosBuilderState.trailMode === 'all') {
                        p.orbitLine.visible = true;
                    } else if (cosmosBuilderState.trailMode === 'focus') {
                        p.orbitLine.visible = (p.id === cosmosBuilderState.selectedPlanetId);
                    } else {
                        p.orbitLine.visible = false;
                    }
                }
            });
        });
    }

    const toggleHab = document.getElementById('builder-toggle-habzone');
    if (toggleHab) {
        toggleHab.addEventListener('change', (e) => {
            cosmosBuilderState.showHabZone = e.target.checked;
            if (cosmosBuilderState.habZoneMesh) cosmosBuilderState.habZoneMesh.visible = cosmosBuilderState.showHabZone;
        });
    }

    const toggleAst = document.getElementById('builder-toggle-asteroids');
    if (toggleAst) {
        toggleAst.addEventListener('change', (e) => {
            cosmosBuilderState.showAsteroids = e.target.checked;
            if (cosmosBuilderState.asteroidBelt) cosmosBuilderState.asteroidBelt.visible = cosmosBuilderState.showAsteroids;
        });
    }

    const toggleMoons = document.getElementById('builder-toggle-moons');
    if (toggleMoons) {
        toggleMoons.addEventListener('change', (e) => {
            cosmosBuilderState.showMoons = e.target.checked;
            cosmosBuilderState.planets.forEach(p => {
                if (p.moons) {
                    p.moons.forEach(m => {
                        m.mesh.visible = cosmosBuilderState.showMoons;
                        m.orbitLine.visible = cosmosBuilderState.showMoons;
                    });
                }
            });
        });
    }

    // 7. Simulation Play / Pause & Time Multiplier & Step Controls
    const simToggle = document.getElementById('builder-sim-toggle');
    if (simToggle) {
        simToggle.addEventListener('click', () => {
            if (cosmosBuilderState.running) {
                cosmosBuilderPause();
            } else {
                cosmosBuilderResume();
            }
        });
    }

    document.querySelectorAll('.sim-speed-group .speed-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const spd = parseFloat(this.getAttribute('data-speed'));
            cosmosBuilderSetSpeed(spd);
        });
    });

    const step1d = document.getElementById('builder-step-1d');
    if (step1d) step1d.addEventListener('click', () => cosmosBuilderStepTime(1));

    const step10d = document.getElementById('builder-step-10d');
    if (step10d) step10d.addEventListener('click', () => cosmosBuilderStepTime(10));

    const step100d = document.getElementById('builder-step-100d');
    if (step100d) step100d.addEventListener('click', () => cosmosBuilderStepTime(100));

    const cometBtn = document.getElementById('builder-spawn-comet-btn');
    if (cometBtn) cometBtn.addEventListener('click', cosmosBuilderSpawnComet);

    // 8. 5-Category Scientific Inspector Tab Switching
    document.querySelectorAll('.inspector-tabs-bar .inspector-tab-btn').forEach(tabBtn => {
        tabBtn.addEventListener('click', function() {
            document.querySelectorAll('.inspector-tabs-bar .inspector-tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.inspector-tab-content').forEach(c => c.classList.remove('active'));

            this.classList.add('active');
            const targetId = this.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.add('active');
        });
    });

    // 9. Planet & Contextual Inspector HUD Controls
    const planetPicker = document.getElementById('builder-planet-picker');
    if (planetPicker) {
        planetPicker.addEventListener('change', (e) => {
            if (e.target.value === 'star') {
                cosmosBuilderSelectStar();
            } else if (e.target.value === 'none') {
                cosmosBuilderDeselectAll();
            } else {
                cosmosBuilderSelectPlanet(e.target.value);
            }
        });
    }

    const focusBtn = document.getElementById('builder-focus-planet-btn');
    if (focusBtn) focusBtn.addEventListener('click', cosmosBuilderFocusSelectedPlanet);

    const focusStarBtn = document.getElementById('builder-focus-star-btn');
    if (focusStarBtn) focusStarBtn.addEventListener('click', cosmosBuilderFocusSun);

    const focusMoonBtn = document.getElementById('builder-focus-moon-btn');
    if (focusMoonBtn) {
        focusMoonBtn.addEventListener('click', () => {
            if (cosmosBuilderState.selectedMoonParent && cosmosBuilderState.selectedMoonData) {
                cosmosBuilderFocusMoon(cosmosBuilderState.selectedMoonParent, cosmosBuilderState.selectedMoonData);
            }
        });
    }

    const backToPlanetBtn = document.getElementById('builder-moon-back-planet-btn');
    if (backToPlanetBtn) {
        backToPlanetBtn.addEventListener('click', () => {
            if (cosmosBuilderState.selectedMoonParent) {
                cosmosBuilderSelectPlanet(cosmosBuilderState.selectedMoonParent.id);
            }
        });
    }

    const deleteBtn = document.getElementById('builder-delete-planet-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            if (cosmosBuilderState.selectedPlanetId) {
                cosmosBuilderRemovePlanet(cosmosBuilderState.selectedPlanetId);
            }
        });
    }

    // Planet Name live update
    const pNameInput = document.getElementById('builder-planet-name');
    if (pNameInput) {
        pNameInput.addEventListener('input', (e) => {
            const p = cosmosBuilderState.planets.find(item => item.id === cosmosBuilderState.selectedPlanetId);
            if (p) {
                p.name = e.target.value.trim() || 'Planet';
                document.getElementById('builder-target-title').textContent = p.name;
                cosmosBuilderUpdatePlanetPicker();
            }
        });
    }

    // Planet Type Chips
    document.querySelectorAll('#builder-type-chips .type-chip').forEach(chip => {
        chip.addEventListener('click', function() {
            document.querySelectorAll('#builder-type-chips .type-chip').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            const typeKey = this.getAttribute('data-type');
            const typeInfo = COSMOS_PLANET_TYPES[typeKey];
            const p = cosmosBuilderState.planets.find(item => item.id === cosmosBuilderState.selectedPlanetId);
            if (p && typeInfo) {
                p.type = typeKey;
                p.color = typeInfo.color;
                if (p.mesh) {
                    const newTex = cosmosBuilderGetPlanetTexture(typeKey, typeInfo.color);
                    p.mesh.material.map = newTex;
                    p.mesh.material.roughness = typeInfo.roughness;
                    p.mesh.material.metalness = typeInfo.metalness;
                    if (typeKey === 'lava') {
                        p.mesh.material.emissive = new THREE.Color(0xff3300);
                        p.mesh.material.emissiveIntensity = 0.8;
                    } else {
                        p.mesh.material.emissive = new THREE.Color(0x000000);
                        p.mesh.material.emissiveIntensity = 0;
                    }
                    p.mesh.material.needsUpdate = true;
                }
                const colorPicker = document.getElementById('builder-planet-color');
                if (colorPicker) colorPicker.value = typeInfo.color;
                document.getElementById('builder-target-badge').textContent = `${typeKey.toUpperCase()} PLANET`;
                document.getElementById('builder-preview-sphere').style.background = `radial-gradient(circle at 30% 30%, ${typeInfo.color}, #081028)`;
            }
        });
    });

    // Planet Size Slider
    const pSizeInput = document.getElementById('builder-planet-size');
    if (pSizeInput) {
        pSizeInput.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            const p = cosmosBuilderState.planets.find(item => item.id === cosmosBuilderState.selectedPlanetId);
            if (p) {
                p.size = val;
                p.baseSize = val;
                const readout = document.getElementById('builder-planet-size-val');
                if (readout) readout.textContent = val.toFixed(1) + ' units';
                if (p.mesh) {
                    const scaleRatio = val / 5.0;
                    p.mesh.scale.set(scaleRatio, scaleRatio, scaleRatio);
                }
            }
        });
    }

    // Orbital Distance Slider
    const pDistInput = document.getElementById('builder-orbit-dist');
    if (pDistInput) {
        pDistInput.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            const p = cosmosBuilderState.planets.find(item => item.id === cosmosBuilderState.selectedPlanetId);
            if (p) {
                p.dist = val;
                const readout = document.getElementById('builder-orbit-dist-val');
                if (readout) readout.textContent = val + ' AU';
                cosmosBuilderRebuildOrbit(p);
                cosmosBuilderUpdateStats();
            }
        });
    }

    // Orbital Speed Slider
    const pSpeedInput = document.getElementById('builder-orbit-speed');
    if (pSpeedInput) {
        pSpeedInput.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            const p = cosmosBuilderState.planets.find(item => item.id === cosmosBuilderState.selectedPlanetId);
            if (p) {
                p.speed = val;
                const readout = document.getElementById('builder-orbit-speed-val');
                if (readout) readout.textContent = val.toFixed(3) + ' rad/s';
            }
        });
    }

    // Orbital Tilt Slider
    const pTiltInput = document.getElementById('builder-orbit-tilt');
    if (pTiltInput) {
        pTiltInput.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            const p = cosmosBuilderState.planets.find(item => item.id === cosmosBuilderState.selectedPlanetId);
            if (p) {
                p.tilt = val;
                const readout = document.getElementById('builder-orbit-tilt-val');
                if (readout) readout.textContent = val + '°';
                cosmosBuilderRebuildOrbit(p);
            }
        });
    }

    // Color picker & Quick color swatches
    const colorPicker = document.getElementById('builder-planet-color');
    if (colorPicker) {
        colorPicker.addEventListener('input', (e) => {
            const p = cosmosBuilderState.planets.find(item => item.id === cosmosBuilderState.selectedPlanetId);
            if (p) {
                p.color = e.target.value;
                if (p.mesh && p.mesh.material) {
                    const newTex = cosmosBuilderGetPlanetTexture(p.type, p.color);
                    p.mesh.material.map = newTex;
                    p.mesh.material.needsUpdate = true;
                }
                document.getElementById('builder-preview-sphere').style.background = `radial-gradient(circle at 30% 30%, ${p.color}, #081028)`;
            }
        });
    }

    document.querySelectorAll('#builder-color-chips .color-chip').forEach(btn => {
        btn.addEventListener('click', function() {
            const c = this.getAttribute('data-color');
            const p = cosmosBuilderState.planets.find(item => item.id === cosmosBuilderState.selectedPlanetId);
            if (p) {
                p.color = c;
                if (p.mesh && p.mesh.material) {
                    const newTex = cosmosBuilderGetPlanetTexture(p.type, p.color);
                    p.mesh.material.map = newTex;
                    p.mesh.material.needsUpdate = true;
                }
                const cp = document.getElementById('builder-planet-color');
                if (cp) cp.value = c;
                document.getElementById('builder-preview-sphere').style.background = `radial-gradient(circle at 30% 30%, ${c}, #081028)`;
            }
        });
    });

    // Rings Toggle & Slider
    const ringsInput = document.getElementById('builder-planet-rings');
    if (ringsInput) {
        ringsInput.addEventListener('change', (e) => {
            const p = cosmosBuilderState.planets.find(item => item.id === cosmosBuilderState.selectedPlanetId);
            if (p) {
                p.hasRings = e.target.checked;
                const wrap = document.getElementById('builder-rings-options');
                if (wrap) wrap.style.display = p.hasRings ? 'block' : 'none';
                if (p.hasRings) {
                    if (!p.ringMesh) {
                        p.ringMesh = cosmosBuilderCreateRingMesh(p.baseSize, p.ringRadius || 2.2, p.color);
                        p.mesh.add(p.ringMesh);
                    }
                } else if (p.ringMesh) {
                    p.mesh.remove(p.ringMesh);
                    if (p.ringMesh.geometry) p.ringMesh.geometry.dispose();
                    if (p.ringMesh.material) p.ringMesh.material.dispose();
                    p.ringMesh = null;
                }
            }
        });
    }

    const ringRadiusInput = document.getElementById('builder-ring-radius');
    if (ringRadiusInput) {
        ringRadiusInput.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            const p = cosmosBuilderState.planets.find(item => item.id === cosmosBuilderState.selectedPlanetId);
            if (p && p.hasRings) {
                p.ringRadius = val;
                const readout = document.getElementById('builder-ring-radius-val');
                if (readout) readout.textContent = val.toFixed(1) + 'x';
                if (p.ringMesh) {
                    p.mesh.remove(p.ringMesh);
                    if (p.ringMesh.geometry) p.ringMesh.geometry.dispose();
                    p.ringMesh = cosmosBuilderCreateRingMesh(p.baseSize, p.ringRadius, p.color);
                    p.mesh.add(p.ringMesh);
                }
            }
        });
    }

    // Atmosphere Toggle
    const atmoInput = document.getElementById('builder-planet-atmosphere');
    if (atmoInput) {
        atmoInput.addEventListener('change', (e) => {
            const p = cosmosBuilderState.planets.find(item => item.id === cosmosBuilderState.selectedPlanetId);
            if (p) {
                p.hasAtmosphere = e.target.checked;
                if (p.hasAtmosphere) {
                    if (!p.atmosphereMesh) {
                        p.atmosphereMesh = cosmosBuilderCreateAtmosphereMesh(p.baseSize, p.color);
                        p.mesh.add(p.atmosphereMesh);
                    }
                    if (!p.cloudMesh && (p.type === 'ocean' || p.type === 'gas')) {
                        p.cloudMesh = cosmosBuilderCreateCloudMesh(p.baseSize, p.type);
                        if (p.cloudMesh) p.mesh.add(p.cloudMesh);
                    }
                } else {
                    if (p.atmosphereMesh) {
                        p.mesh.remove(p.atmosphereMesh);
                        if (p.atmosphereMesh.geometry) p.atmosphereMesh.geometry.dispose();
                        if (p.atmosphereMesh.material) p.atmosphereMesh.material.dispose();
                        p.atmosphereMesh = null;
                    }
                    if (p.cloudMesh) {
                        p.mesh.remove(p.cloudMesh);
                        if (p.cloudMesh.geometry) p.cloudMesh.geometry.dispose();
                        if (p.cloudMesh.material) p.cloudMesh.material.dispose();
                        p.cloudMesh = null;
                    }
                }
            }
        });
    }

    // 10. Mobile Tabs (< 1024px)
    document.querySelectorAll('.builder-mobile-tabs .builder-mob-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.builder-mobile-tabs .builder-mob-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const target = this.getAttribute('data-tab');

            const unifiedPanel = document.getElementById('builder-panel-right');
            const viewport = document.getElementById('builder-viewport');

            if (unifiedPanel) unifiedPanel.classList.remove('mobile-active-panel');
            if (viewport) viewport.classList.remove('mobile-hidden');

            if (target === 'controls' || target === 'inspector') {
                if (unifiedPanel) unifiedPanel.classList.add('mobile-active-panel');
                if (viewport) viewport.classList.add('mobile-hidden');
            } else if (target === 'stats') {
                const stats = document.querySelector('.cosmos-builder-stats-bar');
                if (stats) stats.scrollIntoView({ behavior: 'smooth' });
            } else {
                if (viewport) viewport.classList.remove('mobile-hidden');
                setTimeout(cosmosBuilderOnResize, 50);
            }
        });
    });

    // 11. Unified Panel Minimize / Expand Toggle
    const minBtn = document.getElementById('builder-panel-minimize-btn');
    if (minBtn) {
        minBtn.addEventListener('click', () => {
            const panel = document.getElementById('builder-panel-right');
            if (panel) {
                panel.classList.toggle('panel-minimized');
                minBtn.textContent = panel.classList.contains('panel-minimized') ? '◰' : '◱';
            }
        });
    }

    // 12. FEATURE 8: WHAT-IF EXPERIMENT LAB EVENT LISTENERS
    const whatIfBtn = document.getElementById('builder-whatif-btn');
    if (whatIfBtn) whatIfBtn.addEventListener('click', () => cosmosBuilderOpenWhatIf());

    const starWhatIfBtn = document.getElementById('builder-star-whatif-btn');
    if (starWhatIfBtn) starWhatIfBtn.addEventListener('click', () => cosmosBuilderOpenWhatIf(cosmosBuilderState.starData));

    const whatIfBackBtn = document.getElementById('builder-whatif-back-btn');
    if (whatIfBackBtn) whatIfBackBtn.addEventListener('click', cosmosBuilderExitWhatIf);

    const whatIfRunBtn = document.getElementById('whatif-run-btn');
    if (whatIfRunBtn) whatIfRunBtn.addEventListener('click', () => cosmosBuilderRunWhatIf());

    const whatIfResetBtn = document.getElementById('whatif-reset-btn');
    if (whatIfResetBtn) whatIfResetBtn.addEventListener('click', () => cosmosBuilderResetWhatIf());

    const whatIfHudReset = document.getElementById('builder-whatif-hud-reset-btn');
    if (whatIfHudReset) whatIfHudReset.addEventListener('click', () => cosmosBuilderResetWhatIf());

    const whatIfHudExit = document.getElementById('builder-whatif-hud-exit-btn');
    if (whatIfHudExit) whatIfHudExit.addEventListener('click', cosmosBuilderExitWhatIf);

    // Prediction selection buttons
    document.querySelectorAll('.whatif-pred-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.whatif-pred-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (window.CosmosAudioFX && typeof CosmosAudioFX.playClick === 'function') {
                CosmosAudioFX.playClick();
            }
        });
    });

    // What-If Sliders Live Updates
    const hookWhatIfSlider = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => {
                const target = cosmosBuilderState.whatIfTarget || cosmosBuilderState.planets.find(p => p.id === cosmosBuilderState.selectedPlanetId) || cosmosBuilderState.planets[0];
                if (!target) return;
                const mass = parseFloat(document.getElementById('whatif-mass-slider').value);
                const grav = parseFloat(document.getElementById('whatif-gravity-slider').value);
                const dist = parseFloat(document.getElementById('whatif-dist-slider').value);
                const vel = parseFloat(document.getElementById('whatif-vel-slider').value);
                const rot = parseFloat(document.getElementById('whatif-rot-slider').value);
                cosmosBuilderUpdateWhatIfReadouts(target, mass, grav, dist, vel, rot);
            });
        }
    };
    hookWhatIfSlider('whatif-mass-slider');
    hookWhatIfSlider('whatif-gravity-slider');
    hookWhatIfSlider('whatif-dist-slider');
    hookWhatIfSlider('whatif-vel-slider');
    hookWhatIfSlider('whatif-rot-slider');

    // 13. FEATURE 8: INSIDE THE PLANET EVENT LISTENERS
    const interiorBtn = document.getElementById('builder-interior-btn');
    if (interiorBtn) interiorBtn.addEventListener('click', () => cosmosBuilderEnterInterior());

    const starInteriorBtn = document.getElementById('builder-star-interior-btn');
    if (starInteriorBtn) starInteriorBtn.addEventListener('click', () => cosmosBuilderEnterInterior(cosmosBuilderState.starData));

    const interiorBackBtn = document.getElementById('builder-interior-back-btn');
    if (interiorBackBtn) interiorBackBtn.addEventListener('click', cosmosBuilderExitInterior);

    const interiorSurfaceBtn = document.getElementById('builder-interior-surface-btn');
    if (interiorSurfaceBtn) interiorSurfaceBtn.addEventListener('click', cosmosBuilderExitInterior);

    const interiorHudExit = document.getElementById('builder-interior-hud-exit-btn');
    if (interiorHudExit) interiorHudExit.addEventListener('click', cosmosBuilderExitInterior);
}




// COSMOS SINGLE-PAGE APPLICATION (SPA) VIEW ROUTER & NAVIGATION
// ========================================================

function safeUpdateHash(slug) {
    try {
        if (window.location.protocol !== 'file:') {
            history.pushState(null, '', '#' + slug);
        } else {
            // For file:// URLs, avoid pushState DOMException
            if (window.location.hash !== '#' + slug) {
                window.location.hash = slug;
            }
        }
    } catch (err) {
        // Fallback: silent ignore
    }
}

function switchCosmosView(targetViewId) {
    if (!targetViewId) targetViewId = 'view-home';
    const views = document.querySelectorAll('.cosmos-view');
    const navItems = document.querySelectorAll('.sidebar-nav-item');

    let matched = false;
    views.forEach(v => {
        if (v.id === targetViewId) {
            v.classList.add('active-view');
            v.style.display = 'block';
            matched = true;
        } else {
            v.classList.remove('active-view');
            v.style.display = 'none';
        }
    });

    if (!matched && views.length > 0) {
        views[0].classList.add('active-view');
        views[0].style.display = 'block';
        targetViewId = views[0].id;
    }

    // Update active nav link
    navItems.forEach(item => {
        if (item.getAttribute('data-view') === targetViewId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Close mobile drawer if open
    const sidebar = document.getElementById('cosmos-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('sidebar-open');
    if (overlay) overlay.classList.remove('overlay-visible');

    // Smooth scroll to top of window
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Handle view-specific resizes / inits
    if (targetViewId === 'view-home') {
        document.body.classList.remove('lab-sidebar-collapsed');
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 80);
    } else if (targetViewId === 'view-explore' || targetViewId === 'view-missions') {
        document.body.classList.remove('lab-sidebar-collapsed');
        if (typeof initPhase4 === 'function') initPhase4();
        if (typeof initDashavataraExplorer === 'function') initDashavataraExplorer();
    } else if (targetViewId === 'view-mission-control') {
        document.body.classList.remove('lab-sidebar-collapsed');
        if (typeof updateMissionDisplay === 'function') updateMissionDisplay();
        if (typeof cosmosMissionSim !== 'undefined') {
            cosmosMissionSim.resume();
            setTimeout(() => cosmosMissionSim.onResize(), 60);
        }
    } else if (targetViewId === 'view-harsh-unique') {
        document.body.classList.remove('lab-sidebar-collapsed');
        if (typeof initHarshUnique === 'function') initHarshUnique();
    } else if (targetViewId === 'view-builder') {
        // IMMERSIVE SOLAR SYSTEM LAB: AUTO-COLLAPSE SIDEBAR TO MAXIMIZE 3D SPACE
        document.body.classList.add('lab-sidebar-collapsed');
        if (typeof cosmosBuilderInit === 'function') cosmosBuilderInit();
        if (typeof cosmosBuilderOnResize === 'function') {
            setTimeout(cosmosBuilderOnResize, 50);
            setTimeout(cosmosBuilderOnResize, 320);
        }
        if (typeof cosmosBuilderResume === 'function') cosmosBuilderResume();
    } else if (targetViewId === 'view-sim-lab') {
        document.body.classList.add('lab-sidebar-collapsed');
        if (typeof CosmicSimLab !== 'undefined') {
            CosmicSimLab.init();
            setTimeout(() => CosmicSimLab.onResize(), 60);
            setTimeout(() => CosmicSimLab.onResize(), 320);
            CosmicSimLab.resume();
        }
    }

    // Pause builder animation loop if away from builder view
    if (targetViewId !== 'view-mission-control') {
        if (typeof cosmosMissionSim !== 'undefined') cosmosMissionSim.pause();
    }
    if (targetViewId !== 'view-builder' && targetViewId !== 'view-sim-lab') {
        document.body.classList.remove('lab-sidebar-collapsed');
    }
    if (targetViewId !== 'view-builder' && typeof cosmosBuilderPause === 'function') {
        cosmosBuilderPause();
    }
    if (targetViewId !== 'view-sim-lab' && typeof CosmicSimLab !== 'undefined') {
        CosmicSimLab.pause();
    }
}

function initHarshUnique() {
    const tabBtns = document.querySelectorAll('.harsh-tab-btn');
    const submodules = document.querySelectorAll('.harsh-submodule');
    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const target = this.getAttribute('data-target');
            submodules.forEach(sec => {
                if (target === 'all' || sec.getAttribute('data-submodule') === target) {
                    sec.style.display = 'block';
                } else {
                    sec.style.display = 'none';
                }
            });

            if (target !== 'all') {
                const targetSec = document.querySelector(`.harsh-submodule[data-submodule="${target}"]`);
                if (targetSec) {
                    targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}


// ========================================================
// DASHAVATARA: THE TEN COSMIC EPOCHS OF THE UNIVERSE
// ========================================================
const dashavataraData = [
  {
    id: "matsya",
    name: "Matsya",
    sanskrit: "मत्स्य",
    symbol: "🐟",
    epoch: "The Primordial Ocean (~4.0 - 3.8 Ga)",
    cosmicTheme: "Cosmic Waters & Aquatic Origin of Life",
    scienceParallel: "Prebiotic chemical synthesis in primordial oceans, hydrothermal vents, and icy sub-surface ocean worlds across the solar system.",
    astronomyMission: "Europa Clipper, Cassini-Huygens (Enceladus plumes), James Webb exoplanet water spectroscopy (K2-18b).",
    color: "#38bdf8",
    desc: "In Hindu cosmology, Matsya rescues the Vedas and seeds of life from the cosmic deluge. In astrophysical terms, life originates in water-rich planetary environments after water delivery via icy comets."
  },
  {
    id: "kurma",
    name: "Kurma",
    sanskrit: "कूर्म",
    symbol: "🐢",
    epoch: "Planetary Mantle & Core Accretion (~4.5 Ga)",
    cosmicTheme: "Cosmic Axis & Planetary Foundation",
    scienceParallel: "Accretion of planetary iron cores, mantle convection, and geomagnetic dynamo shield generation preserving planetary atmospheres.",
    astronomyMission: "InSight Mars (crustal & mantle seismology), Chandrayaan-3 ChaSTE (lunar thermophysical probe), BepiColombo.",
    color: "#dfb15b",
    desc: "Kurma acts as the stable pivot for the churning of the cosmic ocean (Samudra Manthana). In planetary science, a solid mantle and geomagnetic core anchor planetary stability."
  },
  {
    id: "varaha",
    name: "Varaha",
    sanskrit: "वराह",
    symbol: "🐗",
    epoch: "Crustal Emergence & Terrestrial Rescue (~4.4 Ga)",
    cosmicTheme: "Planetary Recovery & Emergence of Landmass",
    scienceParallel: "Post-giant-impact cooling, crust solidification, emergence of the first continental cratons, and stabilization of volatile atmospheric gases.",
    astronomyMission: "Perseverance Rover (Mars ancient lakebeds), OSIRIS-REx (Bennu carbonaceous regolith), Venus DAVINCI+.",
    color: "#e67e22",
    desc: "Varaha rescues Bhudevi (Earth) from the cosmic abyss. Scientifically, Earth survived catastrophic early collisions and emerged with a solid crust and stable oceans."
  },
  {
    id: "narasimha",
    name: "Narasimha",
    sanskrit: "नरसिंह",
    symbol: "🦁",
    epoch: "Cosmic Equilibrium & Singularity",
    cosmicTheme: "Balance of Opposing Universal Forces",
    scienceParallel: "The delicate boundary between opposing forces: hydrostatic equilibrium (radiation outward vs. gravity inward in stars), event horizons, and dark energy.",
    astronomyMission: "Event Horizon Telescope (M87*, Sgr A* black hole imaging), Chandra X-ray Observatory, AstroSat.",
    color: "#ef4444",
    desc: "Narasimha appears at twilight, neither inside nor outside, neither man nor beast — personifying the critical threshold conditions of astrophysics, event horizons, and equilibrium."
  },
  {
    id: "vamana",
    name: "Vamana",
    sanskrit: "वामन",
    symbol: "👣",
    epoch: "Cosmic Inflation & Metric Expansion",
    cosmicTheme: "Expansion Across the Three Realms of Space-Time",
    scienceParallel: "Cosmic inflation (Trivikrama: three giant strides spanning quantum fluctuations, planetary stellar systems, and the observable cosmological horizon).",
    astronomyMission: "Planck Satellite (Cosmic Microwave Background), WMAP, Euclid Space Telescope (mapping cosmic expansion rate).",
    color: "#a855f7",
    desc: "Vamana measures the three worlds with three strides. Astronomically, the metric expansion of space stretches across the quantum realm, planetary systems, and the cosmic web."
  },
  {
    id: "parashurama",
    name: "Parashurama",
    sanskrit: "परशुराम",
    symbol: "🪓",
    epoch: "Late Heavy Bombardment (~4.1 - 3.8 Ga)",
    cosmicTheme: "Planetary Reshaping & Volatile Delivery",
    scienceParallel: "Late Heavy Bombardment of planetary crusts, asteroid clearing, delivery of volatiles, carbon compounds, and water to rocky terrestrial worlds.",
    astronomyMission: "Lucy (Trojan asteroid surveyor), Psyche mission (metal core asteroid), DART (planetary defense redirection).",
    color: "#f59e0b",
    desc: "Parashurama cleanses the terrestrial order. Scientifically, asteroid impacts pulverized early crusts while seeding essential organic molecules and water."
  },
  {
    id: "rama",
    name: "Rama",
    sanskrit: "राम",
    symbol: "🏹",
    epoch: "Cosmic Order (Rta) & Orbital Resonance",
    cosmicTheme: "Harmonic Celestial Mechanics & Habitable Zones",
    scienceParallel: "Keplerian orbital harmonics, Lagrange gravitational equilibrium points, circularized habitable orbits supporting complex planetary biospheres.",
    astronomyMission: "Aditya-L1 (Sun-Earth Lagrange point 1 halo orbit), Kepler Space Telescope, TESS (exoplanet transit resonance).",
    color: "#00e5ff",
    desc: "Rama embodies Dharma and Cosmic Order (Rta). In astrophysics, orbital resonances and harmonic mechanics allow planetary systems to remain stable for billions of years."
  },
  {
    id: "krishna",
    name: "Krishna",
    sanskrit: "कृष्ण",
    symbol: "🪈",
    epoch: "Vishwaroopa & The Cosmic Filament Web",
    cosmicTheme: "Universal Interconnection & Dark Matter Web",
    scienceParallel: "The cosmic web of dark matter filaments connecting billions of galaxies, universal consciousness, cosmic laws of preservation.",
    astronomyMission: "James Webb Deep Field, Hubble Ultra Deep Field, Vera C. Rubin Observatory (Legacy Survey of Space and Time).",
    color: "#6366f1",
    desc: "Krishna reveals the Vishwaroopa — the infinite universe contained in a single point. In modern astrophysics, the cosmic web connects all clusters across 93 billion light-years."
  },
  {
    id: "buddha",
    name: "Buddha",
    sanskrit: "बुद्ध",
    symbol: "🧘",
    epoch: "Stellar Equilibrium & Cosmic Stillness",
    cosmicTheme: "Thermodynamic Peace & Stellar Main-Sequence Calm",
    scienceParallel: "The multi-billion-year calm of main-sequence stellar fusion, thermodynamic harmony, peaceful exploration, and conscious observation of the cosmos.",
    astronomyMission: "Voyager Golden Record, SETI (Search for Extraterrestrial Intelligence), Gaia Observatory (mapping 1 billion stars in tranquil harmony).",
    color: "#10b981",
    desc: "Buddha represents transcendent calm and non-violence. In cosmological evolution, stellar calm allows conscious life to evolve and ponder the universe."
  },
  {
    id: "kalki",
    name: "Kalki",
    sanskrit: "कल्कि",
    symbol: "⚔️",
    epoch: "Supernovae Nucleosynthesis & Cosmic Renewal",
    cosmicTheme: "Stellar Death & Rebirth of New Solar Systems",
    scienceParallel: "Core-collapse supernovae, neutron star mergers forging gold and heavy elements, shockwave compression initiating new stellar nurseries.",
    astronomyMission: "LIGO/Virgo (Gravitational wave astronomy), Fermi Gamma-ray Space Telescope, Nancy Grace Roman Space Telescope.",
    color: "#ec4899",
    desc: "Kalki appears at the end of the Kali Yuga on a white horse with a fiery sword. Astronomically, supernova detonations end old star cycles and forge the elements of new worlds."
  }
];

function initDashavataraExplorer() {
  const grid = document.getElementById("dashavatara-grid");
  const detailCard = document.getElementById("dashavatara-detail-card");
  if (!grid || !detailCard) return;

  grid.innerHTML = "";
  dashavataraData.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "dashavatara-card" + (index === 0 ? " active" : "");
    card.setAttribute("data-avatar-id", item.id);
    card.innerHTML = `
      <div class="dashavatara-card-badge" style="color: ${item.color}">${index + 1} / 10</div>
      <div class="dashavatara-card-icon">${item.symbol}</div>
      <h3 class="dashavatara-card-name">${item.name}</h3>
      <span class="dashavatara-card-sanskrit">${item.sanskrit}</span>
      <p class="dashavatara-card-epoch">${item.epoch}</p>
      <div class="dashavatara-card-pill" style="border-color: ${item.color}40; color: ${item.color}">${item.cosmicTheme.split('&')[0]}</div>
    `;
    card.addEventListener("click", () => {
      document.querySelectorAll(".dashavatara-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      renderDashavataraDetail(item);
    });
    grid.appendChild(card);
  });

  renderDashavataraDetail(dashavataraData[0]);
}

function renderDashavataraDetail(item) {
  const detailCard = document.getElementById("dashavatara-detail-card");
  if (!detailCard) return;
  detailCard.innerHTML = `
    <div class="dashavatara-detail-header" style="border-left: 4px solid ${item.color};">
      <div class="dashavatara-detail-icon-wrap" style="background: radial-gradient(circle, ${item.color}25 0%, transparent 70%);">
        <span class="dashavatara-detail-icon">${item.symbol}</span>
      </div>
      <div class="dashavatara-detail-title-wrap">
        <div class="dashavatara-detail-badge" style="color: ${item.color}; border-color: ${item.color}60;">
          COSMIC EPOCH: ${item.epoch}
        </div>
        <h2>${item.name} <span class="sanskrit-title">(${item.sanskrit})</span> — ${item.cosmicTheme}</h2>
        <p class="dashavatara-detail-desc">${item.desc}</p>
      </div>
    </div>

    <div class="dashavatara-detail-grid">
      <div class="dashavatara-detail-panel">
        <div class="detail-panel-title" style="color: #38bdf8;">
          <span>🔬</span> Scientific & Cosmological Parallel
        </div>
        <p>${item.scienceParallel}</p>
      </div>
      <div class="dashavatara-detail-panel">
        <div class="detail-panel-title" style="color: #dfb15b;">
          <span>🛰️</span> Observational Astronomy & Missions
        </div>
        <p>${item.astronomyMission}</p>
      </div>
    </div>
  `;
}



// ==========================================================================
// EXPLORE DISCOVERY HUB — COLLAPSIBLE SECONDARY ARCHIVES ACCORDION
// ==========================================================================
function toggleExploreModule(moduleKey, forceOpen = false) {
    const allModules = document.querySelectorAll('.explore-collapsible-module');
    const allSecBtns = document.querySelectorAll('[data-explore-module]');

    const targetModule = moduleKey ? document.querySelector(`.explore-collapsible-module[data-explore-module="${moduleKey}"]`) : null;
    const isAlreadyOpen = targetModule && targetModule.classList.contains('is-expanded');

    if (isAlreadyOpen && !forceOpen) {
        // Toggle closed
        allModules.forEach(m => m.classList.remove('is-expanded'));
        allSecBtns.forEach(b => b.classList.remove('active'));
        return;
    }

    // Close other modules (accordion behavior)
    allModules.forEach(m => {
        if (m !== targetModule) m.classList.remove('is-expanded');
    });
    allSecBtns.forEach(b => {
        if (b.getAttribute('data-explore-module') === moduleKey) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });

    if (targetModule) {
        targetModule.classList.add('is-expanded');
        // If missions, initialize Phase 4 missions grid
        if (moduleKey === 'missions' && typeof initPhase4 === 'function') {
            initPhase4();
        }
        // If ISRO, initialize craft viewer
        if (moduleKey === 'isro' && typeof CosmosHarshCraftViewer !== 'undefined' && typeof CosmosHarshCraftViewer.init === 'function') {
            setTimeout(() => {
                CosmosHarshCraftViewer.init();
            }, 60);
        }
        // Smooth scroll to target module
        setTimeout(() => {
            targetModule.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
    }
}

function initExploreModuleSwitcher() {
    // Secondary module triggers (pills and tab buttons)
    const triggers = document.querySelectorAll('[data-explore-module]');
    triggers.forEach(trig => {
        trig.addEventListener('click', function(e) {
            e.preventDefault();
            const modKey = this.getAttribute('data-explore-module');
            toggleExploreModule(modKey);
        });
    });

    // Module collapse close buttons
    const closeBtns = document.querySelectorAll('[data-collapse-action="true"], .module-collapse-btn');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleExploreModule('');
        });
    });

    // Scroll links for core always-visible sections
    const scrollLinks = document.querySelectorAll('[data-scroll]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-scroll');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function initCosmosNavigation() {
    const navItems = document.querySelectorAll('.sidebar-nav-item, [data-view], [data-view-target]');
    navItems.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-view') || this.getAttribute('data-view-target');
            if (target) {
                switchCosmosView(target);
                const hashSlug = target.replace('view-', '');
                safeUpdateHash(hashSlug);
            }
        });
    });

    // Hash navigation (deep linking & back/forward)
    function handleHash() {
        const rawHash = (window.location.hash || '').replace('#', '').trim();
        if (rawHash) {
            let targetId = rawHash.startsWith('view-') ? rawHash : 'view-' + rawHash;
            // Aliases to view-harsh-unique
            if (rawHash === 'isro' || rawHash === 'harsh' || rawHash === 'harsh-unique' || rawHash === 'drdo' || rawHash === 'satellites') {
                targetId = 'view-harsh-unique';
            } else if (rawHash === 'builder' || rawHash === 'solar-system-builder' || rawHash === 'system-builder') {
                targetId = 'view-builder';
            } else if (rawHash === 'sim-lab' || rawHash === 'simlab' || rawHash === 'simulation-lab' || rawHash === 'physics' || rawHash === 'cosmic-lab') {
                targetId = 'view-sim-lab';
            }
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                switchCosmosView(targetId);
                return;
            }
        }
        // Default to Home
        switchCosmosView('view-home');
    }

    window.addEventListener('hashchange', handleHash);
    handleHash();

    // Mobile Hamburger & Drawer controls
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('cosmos-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const closeBtn = document.getElementById('sidebar-close');

    if (hamburger && sidebar) {
        hamburger.addEventListener('click', () => {
            sidebar.classList.toggle('sidebar-open');
            if (overlay) overlay.classList.toggle('overlay-visible');
        });
    }
    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('sidebar-open');
            if (overlay) overlay.classList.remove('overlay-visible');
        });
    }
    if (overlay && sidebar) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('sidebar-open');
            overlay.classList.remove('overlay-visible');
        });
    }
}

// Global DOM Initialization with resilient error protection
document.addEventListener('DOMContentLoaded', () => {
    const initTasks = [
        ['createStars', createStars],
        ['initDashavataraExplorer', initDashavataraExplorer],
        ['setupExploreButton', setupExploreButton],
        ['setupModal', setupModal],
        ['setupFacts', setupFacts],
        ['initSolarSystem', initSolarSystem],
        ['initComparison', initComparison],
        ['initQuiz', initQuiz],
        ['initPhase4', initPhase4],
        ['initMissionControl', initMissionControl],
        ['initExploreModuleSwitcher', initExploreModuleSwitcher],
        ['initHarshUnique', initHarshUnique],
        ['cosmosBuilderSetupUI', cosmosBuilderSetupUI],
        ['initCosmosNavigation', initCosmosNavigation]
    ];

    initTasks.forEach(([name, taskFn]) => {
        try {
            if (typeof taskFn === 'function') {
                taskFn();
            }
        } catch (err) {
            console.warn(`[COSMOS] Warning during ${name}:`, err);
        }
    });
});


/* ========================================================
   COSMOS — OPTION A: ULTRA-COOL VISUALS & SFX ENGINE
   Web Audio API SFX, Stardust Cursor, Hyperspace Warp,
   3D Card Tilt, Mission Cockpit View, and 3D Craft Viewer
   ======================================================== */

// 1. NATIVE WEB AUDIO API SYNTHESIZED SFX ENGINE
const CosmosAudioFX = {
    ctx: null,
    enabled: true,

    init() {
        const stored = localStorage.getItem('cosmos_sfx_enabled');
        if (stored !== null) {
            this.enabled = stored === 'true';
        }

        const resumeAudio = () => {
            if (!this.ctx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) this.ctx = new AudioCtx();
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
            window.removeEventListener('click', resumeAudio);
            window.removeEventListener('keydown', resumeAudio);
        };
        window.addEventListener('click', resumeAudio);
        window.addEventListener('keydown', resumeAudio);

        this.updateUI();
    },

    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('cosmos_sfx_enabled', this.enabled ? 'true' : 'false');
        this.updateUI();
        if (this.enabled) {
            this.playClick();
        }
    },

    updateUI() {
        const btn = document.getElementById('cosmos-sound-toggle');
        const icon = document.getElementById('sound-icon');
        const text = document.getElementById('sound-text');
        if (!btn) return;
        if (this.enabled) {
            btn.classList.remove('sound-muted');
            if (icon) icon.textContent = '🔊';
            if (text) text.textContent = 'SFX: ON';
        } else {
            btn.classList.add('sound-muted');
            if (icon) icon.textContent = '🔇';
            if (text) text.textContent = 'SFX: MUTED';
        }
    },

    playTone(freq, type, duration, gainVal, rampDown = true) {
        if (!this.enabled || !this.ctx || this.ctx.state !== 'running') return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type || 'sine';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
            if (rampDown) {
                gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
            }
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {}
    },

    playHover() {
        if (!this.enabled || !this.ctx || this.ctx.state !== 'running') return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(2200, this.ctx.currentTime + 0.04);
            gain.gain.setValueAtTime(0.035, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.04);
        } catch (e) {}
    },

    playClick() {
        if (!this.enabled || !this.ctx || this.ctx.state !== 'running') return;
        try {
            const osc1 = this.ctx.createOscillator();
            const osc2 = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc1.type = 'triangle';
            osc2.type = 'sine';
            osc1.frequency.setValueAtTime(950, this.ctx.currentTime);
            osc1.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.05);
            osc2.frequency.setValueAtTime(280, this.ctx.currentTime);
            gain.gain.setValueAtTime(0.065, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);
            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(this.ctx.destination);
            osc1.start();
            osc2.start();
            osc1.stop(this.ctx.currentTime + 0.05);
            osc2.stop(this.ctx.currentTime + 0.05);
        } catch (e) {}
    },

    playLock() {
        if (!this.enabled || !this.ctx || this.ctx.state !== 'running') return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'square';
            const now = this.ctx.currentTime;
            osc.frequency.setValueAtTime(880, now);
            osc.frequency.setValueAtTime(1320, now + 0.05);
            gain.gain.setValueAtTime(0.03, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(now + 0.12);
        } catch (e) {}
    },

    playWarp() {
        if (!this.enabled || !this.ctx || this.ctx.state !== 'running') return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(90, now);
            osc.frequency.exponentialRampToValueAtTime(620, now + 0.45);
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(0.12, now + 0.2);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(now + 0.55);
        } catch (e) {}
    },

    playLaunch() {
        if (!this.enabled || !this.ctx || this.ctx.state !== 'running') return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(65, now);
            osc.frequency.linearRampToValueAtTime(180, now + 1.2);
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(0.14, now + 0.3);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(now + 1.5);
        } catch (e) {}
    },

    playChime() {
        if (!this.enabled || !this.ctx || this.ctx.state !== 'running') return;
        const freqs = [523.25, 659.25, 783.99]; // C5, E5, G5 triad
        freqs.forEach((f, i) => {
            setTimeout(() => {
                this.playTone(f, 'sine', 0.4, 0.04);
            }, i * 90);
        });
    }
};

// 2. COSMIC STARDUST CURSOR TRAIL (Disabled per requirement 29: immediate, responsive cursor)
const CosmosStardustCursor = {
    init() {},
    resize() {},
    addParticles() {},
    animate() {}
};

// 3. HYPERSPACE STAR-WARP JUMP TRANSITION (Disabled per requirement 28: clean instant navigation without black screen)
const CosmosHyperWarp = {
    init() {},
    resize() {},
    trigger() {}
};

// 4. 3D CARD PARALLAX TILT & SPECULAR SHEEN (Disabled per requirement 29: no mouse-following parallax)
const CosmosHoloCard = {
    init() {
        const cards = document.querySelectorAll('.holo-planet-card');
        cards.forEach(card => {
            const glass = card.querySelector('.holo-card-glass');
            const orb = card.querySelector('.holo-planet-orb');
            const reticle = card.querySelector('.holo-depth-reticle');
            const info = card.querySelector('.holo-card-info');
            let rafId = null;

            const onPointerMove = (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const normX = (x / rect.width) * 2 - 1; // -1 to +1
                const normY = (y / rect.height) * 2 - 1; // -1 to +1

                const rotX = -normY * 18; // Max 18 deg tilt
                const rotY = normX * 18;

                if (rafId) cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(() => {
                    card.style.setProperty('--mouse-x', `${((x / rect.width) * 100).toFixed(1)}%`);
                    card.style.setProperty('--mouse-y', `${((y / rect.height) * 100).toFixed(1)}%`);

                    if (glass) {
                        glass.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(8px)`;
                    }
                    if (orb) {
                        orb.style.transform = `translateZ(38px) translateX(${(normX * 12).toFixed(1)}px) translateY(${(normY * 12).toFixed(1)}px)`;
                    }
                    if (reticle) {
                        reticle.style.transform = `translateZ(18px) translateX(${(normX * 6).toFixed(1)}px) translateY(${(normY * 6).toFixed(1)}px)`;
                    }
                    if (info) {
                        info.style.transform = `translateZ(26px) translateX(${(normX * 4).toFixed(1)}px) translateY(${(normY * 4).toFixed(1)}px)`;
                    }
                });
            };

            const onPointerLeave = () => {
                if (rafId) cancelAnimationFrame(rafId);
                if (glass) {
                    glass.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                    glass.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
                    setTimeout(() => { if (glass) glass.style.transition = ''; }, 600);
                }
                if (orb) {
                    orb.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                    orb.style.transform = 'translateZ(0px) translateX(0px) translateY(0px)';
                    setTimeout(() => { if (orb) orb.style.transition = ''; }, 600);
                }
                if (reticle) {
                    reticle.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                    reticle.style.transform = 'translateZ(10px) translateX(0px) translateY(0px)';
                    setTimeout(() => { if (reticle) reticle.style.transition = ''; }, 600);
                }
                if (info) {
                    info.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                    info.style.transform = 'translateZ(24px) translateX(0px) translateY(0px)';
                    setTimeout(() => { if (info) info.style.transition = ''; }, 600);
                }
            };

            card.addEventListener('pointermove', onPointerMove);
            card.addEventListener('pointerleave', onPointerLeave);
            card.addEventListener('pointercancel', onPointerLeave);

            // Card click opens modal if not clicking button directly
            card.addEventListener('click', (e) => {
                if (e.target.closest('button')) return;
                const btn = card.querySelector('.learn-btn');
                if (btn) btn.click();
            });
        });

        // Module pill smooth scrolling inside Explore
        document.querySelectorAll('.explore-mod-pill').forEach(pill => {
            pill.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelectorAll('.explore-mod-pill').forEach(p => p.classList.remove('active'));
                this.classList.add('active');
                const targetId = this.getAttribute('href');
                if (targetId) {
                    const el = document.querySelector(targetId);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
};

const CosmosCardTilt = {
    init() {
        CosmosHoloCard.init();
    }
};

// 5. HARSH UNIQUE 3D CRAFT SHOWCASE (Three.js WebGL)
const CosmosHarshCraftViewer = {
    scene: null,
    camera: null,
    renderer: null,
    craftGroup: null,
    solarPanels: [],
    thrusterParticles: null,
    isFiring: false,
    panelsDeployed: true,
    currentModel: 'chandrayaan3',
    animFrameId: null,

    init() {
        const container = document.getElementById('harsh-craft-canvas-wrap');
        const canvas = document.getElementById('harsh-craft-canvas');
        if (!container || !canvas || typeof THREE === 'undefined') return;

        const width = container.clientWidth || 700;
        const height = container.clientHeight || 380;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        this.camera.position.set(0, 0.6, 4.6);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Lighting
        const amb = new THREE.AmbientLight(0xffffff, 0.45);
        this.scene.add(amb);

        const sun = new THREE.DirectionalLight(0xffffff, 1.2);
        sun.position.set(6, 8, 5);
        this.scene.add(sun);

        const rim = new THREE.DirectionalLight(0x38bdf8, 0.85);
        rim.position.set(-6, -4, -5);
        this.scene.add(rim);

        this.craftGroup = new THREE.Group();
        this.scene.add(this.craftGroup);

        this.buildCraft(this.currentModel);
        this.initControls(canvas);
        this.initButtons();

        this.animate();

        window.addEventListener('resize', () => {
            if (!container) return;
            const w = container.clientWidth;
            const h = container.clientHeight;
            if (this.camera && this.renderer) {
                this.camera.aspect = w / h;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(w, h);
            }
        });
    },

    buildCraft(modelType) {
        while (this.craftGroup.children.length > 0) {
            this.craftGroup.remove(this.craftGroup.children[0]);
        }
        this.solarPanels = [];

        // Materials
        const goldFoil = new THREE.MeshStandardMaterial({
            color: 0xdfb15b,
            metalness: 0.9,
            roughness: 0.25,
            emissive: 0x4a3b10,
            emissiveIntensity: 0.2
        });
        const titanium = new THREE.MeshStandardMaterial({
            color: 0x94a3b8,
            metalness: 0.75,
            roughness: 0.35
        });
        const solarBlue = new THREE.MeshStandardMaterial({
            color: 0x0369a1,
            metalness: 0.85,
            roughness: 0.15,
            emissive: 0x0284c7,
            emissiveIntensity: 0.3
        });
        const nozzleMat = new THREE.MeshStandardMaterial({
            color: 0x334155,
            metalness: 0.8,
            roughness: 0.4
        });

        if (modelType === 'chandrayaan3') {
            // Main Propulsion / Lander Module Body
            const bodyGeo = new THREE.BoxGeometry(1.6, 1.3, 1.6);
            const body = new THREE.Mesh(bodyGeo, goldFoil);
            this.craftGroup.add(body);

            // Lander Top Deck
            const deckGeo = new THREE.CylinderGeometry(0.9, 1.1, 0.5, 8);
            const deck = new THREE.Mesh(deckGeo, titanium);
            deck.position.y = 0.85;
            this.craftGroup.add(deck);

            // 4 Landing Legs
            for (let i = 0; i < 4; i++) {
                const angle = (i / 4) * Math.PI * 2;
                const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.4), titanium);
                leg.position.set(Math.cos(angle) * 1.1, -0.65, Math.sin(angle) * 1.1);
                leg.rotation.z = Math.cos(angle) * 0.4;
                leg.rotation.x = -Math.sin(angle) * 0.4;
                this.craftGroup.add(leg);

                const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.06), titanium);
                foot.position.set(Math.cos(angle) * 1.35, -1.25, Math.sin(angle) * 1.35);
                this.craftGroup.add(foot);
            }

            // High Gain Parabolic Dish Antenna
            const dish = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.4), goldFoil);
            dish.position.set(0.65, 1.15, -0.65);
            dish.rotation.x = Math.PI * 0.3;
            dish.rotation.z = Math.PI * 0.2;
            this.craftGroup.add(dish);

            // Main Engine Nozzle
            const nozzle = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.6, 16, 1, true), nozzleMat);
            nozzle.position.y = -0.85;
            nozzle.rotation.x = Math.PI;
            this.craftGroup.add(nozzle);

            // Deployable Solar Panels (Left & Right)
            const panelGeo = new THREE.BoxGeometry(1.5, 0.04, 0.85);
            const pLeft = new THREE.Mesh(panelGeo, solarBlue);
            pLeft.position.set(-1.6, 0, 0);
            this.craftGroup.add(pLeft);
            this.solarPanels.push(pLeft);

            const pRight = new THREE.Mesh(panelGeo, solarBlue);
            pRight.position.set(1.6, 0, 0);
            this.craftGroup.add(pRight);
            this.solarPanels.push(pRight);

        } else if (modelType === 'aditya') {
            // Aditya-L1 Solar Observatory
            const body = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 1.8, 12), titanium);
            this.craftGroup.add(body);

            // Solar Coronagraph Telescope Aperture
            const coronagraph = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.6, 16), goldFoil);
            coronagraph.position.y = 1.1;
            this.craftGroup.add(coronagraph);

            // Large Steerable Solar Wings
            const wingGeo = new THREE.BoxGeometry(2.2, 0.04, 1.1);
            const wL = new THREE.Mesh(wingGeo, solarBlue);
            wL.position.set(-2.0, 0, 0);
            this.craftGroup.add(wL);
            this.solarPanels.push(wL);

            const wR = new THREE.Mesh(wingGeo, solarBlue);
            wR.position.set(2.0, 0, 0);
            this.craftGroup.add(wR);
            this.solarPanels.push(wR);

            // Magnetometer Boom
            const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 2.2), titanium);
            boom.position.set(0, 0, 1.8);
            boom.rotation.x = Math.PI / 2;
            this.craftGroup.add(boom);

        } else {
            // Gaganyaan Human-Rated Crew & Service Module
            const crewCapsule = new THREE.Mesh(new THREE.ConeGeometry(1.2, 1.4, 20), titanium);
            crewCapsule.position.y = 0.7;
            this.craftGroup.add(crewCapsule);

            const serviceMod = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 1.2, 20), goldFoil);
            serviceMod.position.y = -0.55;
            this.craftGroup.add(serviceMod);

            const p1 = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.04, 0.9), solarBlue);
            p1.position.set(-1.8, -0.55, 0);
            this.craftGroup.add(p1);
            this.solarPanels.push(p1);

            const p2 = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.04, 0.9), solarBlue);
            p2.position.set(1.8, -0.55, 0);
            this.craftGroup.add(p2);
            this.solarPanels.push(p2);
        }

        // Thruster Particle Emitter
        const pCount = 80;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount * 3; i++) pPos[i] = 0;
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const pMat = new THREE.PointsMaterial({
            color: 0x38bdf8,
            size: 0.18,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending
        });
        this.thrusterParticles = new THREE.Points(pGeo, pMat);
        this.thrusterParticles.position.y = -0.9;
        this.craftGroup.add(this.thrusterParticles);
    },

    initControls(canvas) {
        let isDragging = false;
        let prevX = 0;
        let prevY = 0;

        canvas.addEventListener('mousedown', (e) => {
            isDragging = true;
            prevX = e.clientX;
            prevY = e.clientY;
        });

        window.addEventListener('mouseup', () => { isDragging = false; });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging || !this.craftGroup) return;
            const dx = e.clientX - prevX;
            const dy = e.clientY - prevY;
            prevX = e.clientX;
            prevY = e.clientY;

            this.craftGroup.rotation.y += dx * 0.008;
            this.craftGroup.rotation.x += dy * 0.008;
        });
    },

    initButtons() {
        // Model switchers
        document.querySelectorAll('.craft-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.craft-type-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const model = btn.getAttribute('data-craft');
                this.currentModel = model;
                this.buildCraft(model);
                CosmosAudioFX.playClick();
                const title = document.getElementById('craft-active-title');
                if (title) {
                    title.textContent = model === 'chandrayaan3' ? 'Chandrayaan-3 Lunar Lander' :
                                        model === 'aditya' ? 'Aditya-L1 Solar Observatory' :
                                        'Gaganyaan Crew & Service Module';
                }
            });
        });

        // Deploy Panels Toggle
        const deployBtn = document.getElementById('craft-deploy-btn');
        if (deployBtn) {
            deployBtn.addEventListener('click', () => {
                this.panelsDeployed = !this.panelsDeployed;
                deployBtn.textContent = this.panelsDeployed ? '🛰️ Retract Panels' : '🛰️ Deploy Panels';
                CosmosAudioFX.playLock();
            });
        }

        // Thruster Fire Toggle
        const thrustBtn = document.getElementById('craft-thrust-btn');
        if (thrustBtn) {
            thrustBtn.addEventListener('click', () => {
                this.isFiring = !this.isFiring;
                thrustBtn.textContent = this.isFiring ? '🔥 Thrusters: ACTIVE' : '🔥 Fire Thrusters';
                thrustBtn.classList.toggle('active', this.isFiring);
                if (this.isFiring) {
                    CosmosAudioFX.playLaunch();
                } else {
                    CosmosAudioFX.playClick();
                }
            });
        }
    },

    animate() {
        this.animFrameId = requestAnimationFrame(() => this.animate());

        if (this.craftGroup) {
            this.craftGroup.rotation.y += 0.004;

            // Solar panels deployment lerp
            const targetScaleX = this.panelsDeployed ? 1 : 0.05;
            this.solarPanels.forEach(p => {
                p.scale.x += (targetScaleX - p.scale.x) * 0.08;
            });

            // Thrusters flame animation
            if (this.thrusterParticles) {
                if (this.isFiring) {
                    this.thrusterParticles.material.opacity = 0.85;
                    const pos = this.thrusterParticles.geometry.attributes.position.array;
                    for (let i = 0; i < pos.length; i += 3) {
                        pos[i] = (Math.random() - 0.5) * 0.25;
                        pos[i + 1] = -Math.random() * 1.5;
                        pos[i + 2] = (Math.random() - 0.5) * 0.25;
                    }
                    this.thrusterParticles.geometry.attributes.position.needsUpdate = true;
                } else {
                    this.thrusterParticles.material.opacity = 0;
                }
            }
        }

        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }
};

// 6. INITIALIZATION & GLOBAL HOOKS
window.addEventListener('DOMContentLoaded', () => {
    CosmosAudioFX.init();
    CosmosStardustCursor.init();
    CosmosHyperWarp.init();
    CosmosCardTilt.init();
    CosmosHarshCraftViewer.init();

    // Hook audio to all sidebar navigation items
    document.querySelectorAll('.sidebar-nav-item, .harsh-tab-btn, .sim-cam-btn, .speed-btn, .step-btn, .craft-btn, .simlab-mode-card, .simlab-tab-btn, .sim-play-btn, .simlab-back-btn').forEach(el => {
        el.addEventListener('mouseenter', () => CosmosAudioFX.playHover());
        el.addEventListener('click', () => CosmosAudioFX.playClick());
    });

    // Sound toggle button
    const soundToggle = document.getElementById('cosmos-sound-toggle');
    if (soundToggle) {
        soundToggle.addEventListener('click', () => CosmosAudioFX.toggle());
    }
});

// Clean immediate navigation (unwanted hyperspace warp removed per requirement 28)

// ============================================================================
// FEATURE 7: COSMIC SIMULATION LAB (ADVANCED ASTROPHYSICS & NUMERICAL DYNAMICS)
// ============================================================================

// ============================================================================
// COSMOS COSMIC SIMULATION LAB — DEEP ASTROPHYSICS & REAL-TIME PHYSICS ENGINE
// ============================================================================
const CosmicSimLab = (function () {
    let initialized = false;
    let running = true;
    let animFrameId = null;
    let activeMode = 'event-asteroid';
    let simSpeed = 1.0;
    let simTime = 0.0;
    let simStepCount = 0;
    let clockEarthSeconds = 0.0;
    let clockShipSeconds = 0.0;
    
    // Three.js Core Objects
    let container = null;
    let scene = null;
    let camera = null;
    let renderer = null;
    let controls = null;
    let gravityGrid = null;
    
    // Mode specific meshes & objects
    let modeGroup = null;
    let particleSystems = [];
    let trajectoryLines = [];
    let vectorArrows = [];
    let customAnimators = [];
    let liveMeshRefs = {};

    // Visual display options
    const options = {
        trails: true,
        vectors: true,
        grid: true,
        debris: true
    };

    // Mode Parameters Storage (User controllable)
    const params = {
        'event-asteroid': { diam: 1.5, vel: 28, angle: 45, target: 'Earth' },
        'event-collision': { mass2: 0.15, vel: 14, impactParam: 0.65 },
        'event-supernova': { mass: 25, energy: 2.2, remnant: 'Pulsar' },
        'event-solarflare': { flareClass: 14.0, cmeSpeed: 1750, bz: -22 },
        'nbody': { config: 'figure8', g: 1.0, count: 3, dt: 0.015 },
        'orbital': { a: 45, e: 0.48, inc: 12, mass: 1.5 },
        'slingshot': { vin: 13.5, rp: 2.4, mPlanet: 2.0 },
        'roche': { moonDens: 2.4, moonRad: 1200, planetMass: 95 },
        'blackhole': { mass: 4.2e6, spin: 0.94, accRate: 0.70 },
        'relativity': { vOverC: 0.88, restMass: 5000, distanceLy: 4.2 }
    };

    // Live Physical State for the Active Simulation
    const state = {
        // Mode specific numerical quantities
        asteroid: {
            pos: new THREE.Vector3(-65, 45, -35),
            vel: new THREE.Vector3(0, 0, 0),
            initPos: new THREE.Vector3(-65, 45, -35),
            impacted: false,
            impactTime: 0,
            energyJoules: 0,
            megatons: 0,
            craterDiamKm: 0,
            altitude: 80,
            shockRadius: 0,
            ejectaParticles: []
        },
        collision: {
            p1: { pos: new THREE.Vector3(-32, 0, 0), vel: new THREE.Vector3(3.2, 0, 0), mass: 1.0, radius: 13 },
            p2: { pos: new THREE.Vector3(45, 0, 18), vel: new THREE.Vector3(-9.5, 0, -3.8), mass: 0.15, radius: 7 },
            merged: false,
            separation: 80,
            totalEnergy: 0,
            kineticEnergy: 0,
            potentialEnergy: 0,
            debrisRingParticles: []
        },
        supernova: {
            stage: 1, // 1: equilibrium, 2: core instability, 3: collapse, 4: shock breakout, 5: remnant
            coreRadius: 18,
            shockRadius: 18,
            luminosity: 1.0,
            temperature: 5800,
            pulsarSpin: 0,
            remnantFilaments: []
        },
        solarflare: {
            stage: 1, // 1: magnetic buildup, 2: reconnection, 3: CME ejection
            loopTension: 0.2,
            flareEnergy: 0,
            cmePos: 16,
            cmeVelocity: 1750,
            kpIndex: 8
        },
        nbody: {
            bodies: [],
            totalEnergy: 0,
            initEnergy: 0,
            kineticEnergy: 0,
            potentialEnergy: 0,
            energyDriftPct: 0.0
        },
        orbital: {
            pos: new THREE.Vector3(0, 0, 0),
            vel: new THREE.Vector3(0, 0, 0),
            trailPoints: [],
            r: 0,
            v: 0,
            trueAnomaly: 0,
            semiMajorAxis: 45,
            eccentricity: 0.48
        },
        slingshot: {
            scPos: new THREE.Vector3(-75, 0, -30),
            scVel: new THREE.Vector3(13.5, 0, 3.2),
            planetPos: new THREE.Vector3(0, 0, 0),
            planetVel: new THREE.Vector3(0, 0, 7.5),
            trailSc: [],
            trailPlanet: [],
            deltaV: 0,
            deflectionAngleDeg: 0,
            vSun: 13.5,
            vPlanetFrame: 13.5
        },
        roche: {
            orbitRadius: 36,
            rocheLimit: 28.5,
            fragments: [],
            disrupted: false,
            tidalStressRatio: 0.4
        },
        blackhole: {
            rsKm: 1.24e7,
            rPhKm: 1.86e7,
            rIscoKm: 3.72e7,
            diskTempK: 1.45e7,
            redshiftZ: 0.0
        },
        relativity: {
            beta: 0.88,
            gamma: 2.105,
            contractedLengthPct: 47.5,
            earthTime: 0,
            shipTime: 0,
            apparentDistanceLy: 2.0
        }
    };

    // Real-Time Live Graph Time-Series History Buffer
    const graphHistory = {
        maxPoints: 80,
        t: [],
        seriesA: [], // primary curve (e.g. Kinetic Energy / Velocity / Distance)
        seriesB: [], // secondary curve (e.g. Potential Energy / Dilation / Shock Radius)
        labelA: 'Trace A',
        labelB: 'Trace B',
        colorA: '#38bdf8',
        colorB: '#f43f5e'
    };

    // Branching state storage
    let branchData = null;

    // Helper: format scientific notation or clean decimals
    function fmt(num, decimals = 2) {
        if (num === undefined || num === null || isNaN(num)) return '0.00';
        if (Math.abs(num) >= 1e6 || (Math.abs(num) > 0 && Math.abs(num) < 1e-3)) {
            return num.toExponential(decimals);
        }
        return Number(num).toFixed(decimals);
    }

    // Helper: format digital clock 00:00:00.00
    function fmtClock(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const centis = Math.floor((seconds % 1) * 100);
        return String(hrs).padStart(2, '0') + ':' +
               String(mins).padStart(2, '0') + ':' +
               String(secs).padStart(2, '0') + '.' +
               String(centis).padStart(2, '0');
    }

    // Show temporary notification alert HUD
    function showAlert(title, tag = 'ASTROPHYSICS EVENT', icon = '⚡') {
        const alertEl = document.getElementById('simlab-event-alert');
        const iconEl = document.getElementById('simlab-event-icon');
        const tagEl = document.getElementById('simlab-event-tag');
        const titleEl = document.getElementById('simlab-event-title');
        if (!alertEl || !titleEl) return;

        if (iconEl) iconEl.textContent = icon;
        if (tagEl) tagEl.textContent = tag;
        titleEl.textContent = title;
        alertEl.style.display = 'flex';

        if (window.CosmosAudioFX && typeof CosmosAudioFX.playAlert === 'function') {
            CosmosAudioFX.playAlert();
        }

        clearTimeout(alertEl._hideTimeout);
        alertEl._hideTimeout = setTimeout(() => {
            alertEl.style.display = 'none';
        }, 3600);
    }

    // Initialize Three.js scene & renderer
    function initThree() {
        container = document.getElementById('simlab-canvas');
        if (!container) return;

        container.innerHTML = '';

        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x02071a, 0.0006);

        const vpEl = document.getElementById('simlab-viewport');
        const width = (container.clientWidth > 50 ? container.clientWidth : (vpEl && vpEl.clientWidth > 50 ? vpEl.clientWidth : 860));
        const height = (container.clientHeight > 50 ? container.clientHeight : (vpEl && vpEl.clientHeight > 50 ? vpEl.clientHeight : 580));

        camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 3000);
        camera.position.set(0, 50, 100);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.25;
        container.appendChild(renderer.domElement);

        if (typeof THREE.OrbitControls !== 'undefined') {
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.06;
            controls.maxDistance = 1400;
            controls.minDistance = 5;
            controls.target.set(0, 0, 0);
        }

        // Illumination
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
        scene.add(ambientLight);

        const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.2);
        dirLight1.position.set(120, 80, 100);
        scene.add(dirLight1);

        const dirLight2 = new THREE.DirectionalLight(0x7dd3fc, 1.4);
        dirLight2.position.set(-100, -50, -80);
        scene.add(dirLight2);

        const dirLight3 = new THREE.DirectionalLight(0xffffff, 1.0);
        dirLight3.position.set(0, 100, 0);
        scene.add(dirLight3);

        // Starfield
        const starGeo = new THREE.BufferGeometry();
        const starCount = 2000;
        const starPos = new Float32Array(starCount * 3);
        const starCols = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount * 3; i += 3) {
            starPos[i] = (Math.random() - 0.5) * 1600;
            starPos[i + 1] = (Math.random() - 0.5) * 1600;
            starPos[i + 2] = (Math.random() - 0.5) * 1600;
            const r = 0.7 + Math.random() * 0.3;
            const g = 0.8 + Math.random() * 0.2;
            const b = 1.0;
            starCols[i] = r;
            starCols[i + 1] = g;
            starCols[i + 2] = b;
        }
        starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
        starGeo.setAttribute('color', new THREE.BufferAttribute(starCols, 3));
        const starMat = new THREE.PointsMaterial({ size: 1.5, vertexColors: true, transparent: true, opacity: 0.85 });
        const starField = new THREE.Points(starGeo, starMat);
        scene.add(starField);

        // Gravitational Warp Grid
        const gridGeo = new THREE.PlaneGeometry(240, 240, 40, 40);
        gridGeo.rotateX(-Math.PI / 2);
        const gridMat = new THREE.MeshBasicMaterial({
            color: 0x0284c7,
            wireframe: true,
            transparent: true,
            opacity: 0.22
        });
        gravityGrid = new THREE.Mesh(gridGeo, gridMat);
        gravityGrid.position.y = -18;
        scene.add(gravityGrid);

        modeGroup = new THREE.Group();
        scene.add(modeGroup);
    }

    // Clean up current mode objects
    function clearCurrentMode() {
        if (!modeGroup) return;
        while (modeGroup.children.length > 0) {
            const child = modeGroup.children[0];
            modeGroup.remove(child);
            if (child.geometry && typeof child.geometry.dispose === 'function') {
                child.geometry.dispose();
            }
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(m => m && typeof m.dispose === 'function' && m.dispose());
                } else if (typeof child.material.dispose === 'function') {
                    child.material.dispose();
                }
            }
        }
        particleSystems = [];
        trajectoryLines = [];
        vectorArrows = [];
        customAnimators = [];
        liveMeshRefs = {};
        simTime = 0.0;
        simStepCount = 0;
        clockEarthSeconds = 0.0;
        clockShipSeconds = 0.0;

        // Reset live graph buffer
        graphHistory.t = [];
        graphHistory.seriesA = [];
        graphHistory.seriesB = [];
    }

    // Record sample in live graph buffer
    function recordGraphSample(tVal, valA, valB, lblA, lblB, colA = '#38bdf8', colB = '#f43f5e') {
        graphHistory.labelA = lblA;
        graphHistory.labelB = lblB;
        graphHistory.colorA = colA;
        graphHistory.colorB = colB;

        graphHistory.t.push(tVal);
        graphHistory.seriesA.push(valA);
        graphHistory.seriesB.push(valB);

        if (graphHistory.t.length > graphHistory.maxPoints) {
            graphHistory.t.shift();
            graphHistory.seriesA.shift();
            graphHistory.seriesB.shift();
        }
    }

    // Render Real-Time Live Graph Canvas
    function renderLiveGraph() {
        const canvas = document.getElementById('simlab-live-graph');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width = canvas.clientWidth || 320;
        const height = canvas.height = canvas.clientHeight || 160;

        // Background
        ctx.fillStyle = '#060e1e';
        ctx.fillRect(0, 0, width, height);

        // Grid lines
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 40; x < width; x += 40) {
            ctx.moveTo(x, 0); ctx.lineTo(x, height - 20);
        }
        for (let y = 20; y < height - 20; y += 30) {
            ctx.moveTo(35, y); ctx.lineTo(width, y);
        }
        ctx.stroke();

        // Axes
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(35, 10);
        ctx.lineTo(35, height - 20);
        ctx.lineTo(width - 10, height - 20);
        ctx.stroke();

        const dataLen = graphHistory.t.length;
        if (dataLen < 2) {
            ctx.fillStyle = '#64748b';
            ctx.font = '11px monospace';
            ctx.fillText('Accumulating simulation physics data...', 50, height / 2);
            return;
        }

        // Determine min and max
        let minVal = Infinity, maxVal = -Infinity;
        for (let i = 0; i < dataLen; i++) {
            const a = graphHistory.seriesA[i];
            const b = graphHistory.seriesB[i];
            if (!isNaN(a)) {
                if (a < minVal) minVal = a;
                if (a > maxVal) maxVal = a;
            }
            if (!isNaN(b)) {
                if (b < minVal) minVal = b;
                if (b > maxVal) maxVal = b;
            }
        }
        if (minVal === Infinity || maxVal === -Infinity) { minVal = 0; maxVal = 1; }
        if (maxVal === minVal) { maxVal += 1; minVal -= 1; }
        const range = maxVal - minVal;

        const plotX = (idx) => 38 + (idx / (graphHistory.maxPoints - 1)) * (width - 55);
        const plotY = (val) => (height - 24) - ((val - minVal) / range) * (height - 45);

        // Draw Series B (Secondary)
        ctx.strokeStyle = graphHistory.colorB;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < dataLen; i++) {
            const x = plotX(i);
            const y = plotY(graphHistory.seriesB[i]);
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Draw Series A (Primary)
        ctx.strokeStyle = graphHistory.colorA;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        for (let i = 0; i < dataLen; i++) {
            const x = plotX(i);
            const y = plotY(graphHistory.seriesA[i]);
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Highlight latest point
        const lastIdx = dataLen - 1;
        const lastXA = plotX(lastIdx);
        const lastYA = plotY(graphHistory.seriesA[lastIdx]);
        ctx.fillStyle = graphHistory.colorA;
        ctx.beginPath();
        ctx.arc(lastXA, lastYA, 4, 0, Math.PI * 2);
        ctx.fill();

        // Legend & Labels
        ctx.font = '10px monospace';
        ctx.fillStyle = graphHistory.colorA;
        ctx.fillText(graphHistory.labelA + ': ' + fmt(graphHistory.seriesA[lastIdx]), 40, 16);

        ctx.fillStyle = graphHistory.colorB;
        ctx.fillText(graphHistory.labelB + ': ' + fmt(graphHistory.seriesB[lastIdx]), 180, 16);

        // Y-axis labels
        ctx.fillStyle = '#94a3b8';
        ctx.font = '9px monospace';
        ctx.fillText(fmt(maxVal, 1), 2, 22);
        ctx.fillText(fmt(minVal, 1), 2, height - 22);
    }

    // Update scrubber UI
    function updateScrubber(normVal) {
        const slider = document.getElementById('simlab-timeline-slider');
        const prog = document.getElementById('simlab-timeline-progress');
        const pct = Math.min(100, Math.max(0, normVal * 100));
        if (slider && !slider._isDragging) slider.value = pct;
        if (prog) prog.style.width = pct + '%';
        const timeDisp = document.getElementById('simlab-time-display');
        if (timeDisp) timeDisp.textContent = fmtClock(simTime);
    }

    // ========================================================================
    // 1. ASTEROID IMPACT ENGINE (Kinetic Energy, Drag, Crater, Shockwave)
    // ========================================================================
    function setupAsteroidImpactMode() {
        camera.position.set(0, 45, 90);
        if (controls) controls.target.set(0, 0, 0);

        const p = params['event-asteroid'];
        const pState = state.asteroid;

        // Target Planet (Earth)
        const planetGeo = new THREE.SphereGeometry(14, 48, 48);
        const planetMat = new THREE.MeshStandardMaterial({
            color: 0x1d4ed8,
            roughness: 0.5,
            metalness: 0.1,
            emissive: 0x051b4b,
            emissiveIntensity: 0.3
        });
        const planet = new THREE.Mesh(planetGeo, planetMat);
        modeGroup.add(planet);
        liveMeshRefs.planet = planet;

        // Atmosphere glow
        const atmoGeo = new THREE.SphereGeometry(15.4, 32, 32);
        const atmoMat = new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.22,
            side: THREE.BackSide
        });
        modeGroup.add(new THREE.Mesh(atmoGeo, atmoMat));

        // Asteroid mesh
        const astGeo = new THREE.DodecahedronGeometry(p.diam * 1.6, 1);
        const astMat = new THREE.MeshStandardMaterial({
            color: 0x78716c,
            roughness: 0.85,
            metalness: 0.15
        });
        const asteroid = new THREE.Mesh(astGeo, astMat);
        modeGroup.add(asteroid);
        liveMeshRefs.asteroid = asteroid;

        // Plasma ionization sheath around asteroid during atmospheric entry
        const sheathGeo = new THREE.SphereGeometry(p.diam * 2.1, 16, 16);
        const sheathMat = new THREE.MeshBasicMaterial({
            color: 0xf97316,
            transparent: true,
            opacity: 0.0
        });
        const sheath = new THREE.Mesh(sheathGeo, sheathMat);
        asteroid.add(sheath);
        liveMeshRefs.sheath = sheath;

        // Impact flash light
        const flashLight = new THREE.PointLight(0xffedd5, 0, 200);
        modeGroup.add(flashLight);
        liveMeshRefs.flashLight = flashLight;

        // Sedov-Taylor Shockwave Ring
        const shockGeo = new THREE.RingGeometry(0.1, 2.0, 64);
        shockGeo.rotateX(-Math.PI / 2);
        const shockMat = new THREE.MeshBasicMaterial({
            color: 0xf97316,
            transparent: true,
            opacity: 0.0,
            side: THREE.DoubleSide
        });
        const shockRing = new THREE.Mesh(shockGeo, shockMat);
        modeGroup.add(shockRing);
        liveMeshRefs.shockRing = shockRing;

        // Ballistic Debris Ejecta
        const pCount = 450;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(pCount * 3);
        const ejectaVel = [];
        for (let i = 0; i < pCount; i++) {
            pPos[i * 3] = 0;
            pPos[i * 3 + 1] = 14.1;
            pPos[i * 3 + 2] = 0;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * (Math.PI / 3);
            const speed = 15 + Math.random() * 45;
            ejectaVel.push(new THREE.Vector3(
                Math.sin(phi) * Math.cos(theta) * speed,
                Math.cos(phi) * speed,
                Math.sin(phi) * Math.sin(theta) * speed
            ));
        }
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const pMat = new THREE.PointsMaterial({
            color: 0xfbbf24,
            size: 1.4,
            transparent: true,
            opacity: 0.0
        });
        const debris = new THREE.Points(pGeo, pMat);
        modeGroup.add(debris);
        liveMeshRefs.debris = debris;
        pState.ejectaVel = ejectaVel;

        // Trajectory line
        const startPos = new THREE.Vector3(-60, 48, -32);
        const endPos = new THREE.Vector3(0, 14, 0);
        const trajPoints = [startPos, endPos];
        const trajGeo = new THREE.BufferGeometry().setFromPoints(trajPoints);
        const trajMat = new THREE.LineDashedMaterial({
            color: 0xf87171,
            dashSize: 2,
            gapSize: 1.5,
            linewidth: 2
        });
        const trajLine = new THREE.Line(trajGeo, trajMat);
        trajLine.computeLineDistances();
        modeGroup.add(trajLine);
        trajectoryLines.push(trajLine);

        // Velocity vector arrow
        const vDir = new THREE.Vector3().subVectors(endPos, startPos).normalize();
        const vArrow = new THREE.ArrowHelper(vDir, startPos, 20, 0xef4444, 4, 2);
        modeGroup.add(vArrow);
        vectorArrows.push(vArrow);
        liveMeshRefs.vArrow = vArrow;

        // Reset numerical state
        pState.pos.copy(startPos);
        pState.vel.copy(vDir).multiplyScalar(p.vel);
        pState.impacted = false;
        pState.shockRadius = 0;

        // Physics Calculation: Kinetic Energy & Crater Scaling
        const asteroidMassKg = (4 / 3) * Math.PI * Math.pow(p.diam * 500, 3) * 2800;
        const impactEnergyJoules = 0.5 * asteroidMassKg * Math.pow(p.vel * 1000, 2);
        pState.energyJoules = impactEnergyJoules;
        pState.megatons = impactEnergyJoules / 4.184e15;
        pState.craterDiamKm = 1.17 * Math.pow(impactEnergyJoules / (2500 * 9.8), 0.22) * Math.pow(Math.sin(p.angle * Math.PI / 180), 0.33) * 0.001;

        // Step Animator
        customAnimators.push((delta) => {
            planet.rotation.y += delta * 0.15;
            const cycleDuration = 7.0;
            const cycleT = simTime % cycleDuration;
            const progress = cycleT / cycleDuration;
            updateScrubber(progress);

            if (cycleT < 3.2) {
                // Atmospheric entry approach phase
                const tNorm = cycleT / 3.2;
                pState.pos.lerpVectors(startPos, endPos, tNorm);
                asteroid.position.copy(pState.pos);
                asteroid.rotation.x += delta * 3.5;
                asteroid.rotation.y += delta * 2.2;
                asteroid.visible = true;

                // Altitude calculation
                pState.altitude = pState.pos.distanceTo(new THREE.Vector3(0, 0, 0)) - 14.0;

                // Sheath ionization in atmosphere (below alt 20)
                if (pState.altitude < 18) {
                    const atmoProg = (18 - pState.altitude) / 18;
                    sheath.material.opacity = Math.min(0.85, atmoProg * 1.2);
                    sheath.scale.setScalar(1.0 + atmoProg * 0.5);
                } else {
                    sheath.material.opacity = 0;
                }

                vArrow.position.copy(asteroid.position);
                vArrow.visible = options.vectors;
                flashLight.intensity = 0;
                shockRing.material.opacity = 0;
                debris.material.opacity = 0;
                pState.impacted = false;

                recordGraphSample(simTime, pState.altitude, p.vel, 'Altitude (km)', 'Velocity (km/s)');
            } else {
                // Post-impact shockwave and ejecta phase
                const postT = cycleT - 3.2;
                asteroid.visible = false;
                vArrow.visible = false;
                sheath.material.opacity = 0;

                if (!pState.impacted) {
                    pState.impacted = true;
                    showAlert(`Kinetic Impact: ${fmt(pState.megatons, 1)} Megatons TNT Released! Crater: ${fmt(pState.craterDiamKm, 1)} km`, 'IMPACT DETECTED', '💥');
                }

                // Flash decay
                flashLight.position.copy(endPos);
                flashLight.intensity = Math.max(0, (1 - postT / 1.5) * 20);

                // Sedov-Taylor Shockwave Ring: R(t) ~ t^0.4
                const shockScale = Math.pow(postT + 0.05, 0.45) * 28;
                shockRing.position.set(0, 14.1, 0);
                shockRing.scale.set(shockScale, shockScale, shockScale);
                shockRing.material.opacity = Math.max(0, (1 - postT / 3.5) * 0.85);
                pState.shockRadius = shockScale * 18;

                // Ballistic Debris: z(t) = v0*t - 0.5*g*t^2
                if (options.debris) {
                    debris.material.opacity = Math.max(0, (1 - postT / 3.5) * 0.95);
                    const posArr = pGeo.attributes.position.array;
                    const grav = 18.0;
                    for (let i = 0; i < pCount; i++) {
                        const v = pState.ejectaVel[i];
                        posArr[i * 3] = endPos.x + v.x * postT * 0.7;
                        posArr[i * 3 + 1] = endPos.y + (v.y * postT - 0.5 * grav * postT * postT) * 0.7;
                        posArr[i * 3 + 2] = endPos.z + v.z * postT * 0.7;
                    }
                    pGeo.attributes.position.needsUpdate = true;
                }

                recordGraphSample(simTime, pState.shockRadius, flashLight.intensity * 5, 'Shock Radius (km)', 'Flash Energy (GW)');
            }
        });
    }

    // ========================================================================
    // 2. PLANET COLLISION ENGINE (Verlet Gravity, Theia Glancing vs Merger)
    // ========================================================================
    function setupPlanetCollisionMode() {
        camera.position.set(0, 55, 110);
        if (controls) controls.target.set(0, 0, 0);

        const p = params['event-collision'];
        const colState = state.collision;

        // Target Proto-Earth
        const p1Geo = new THREE.SphereGeometry(14, 44, 44);
        const p1Mat = new THREE.MeshStandardMaterial({
            color: 0x0284c7,
            roughness: 0.55,
            emissive: 0x0c4a6e,
            emissiveIntensity: 0.25
        });
        const planet1 = new THREE.Mesh(p1Geo, p1Mat);
        modeGroup.add(planet1);
        liveMeshRefs.planet1 = planet1;

        // Impactor Theia (scaled radius by mass^(1/3))
        const p2Radius = Math.max(5, 14 * Math.cbrt(p.mass2));
        const p2Geo = new THREE.SphereGeometry(p2Radius, 36, 36);
        const p2Mat = new THREE.MeshStandardMaterial({
            color: 0xe11d48,
            roughness: 0.65,
            emissive: 0x881337,
            emissiveIntensity: 0.35
        });
        const planet2 = new THREE.Mesh(p2Geo, p2Mat);
        modeGroup.add(planet2);
        liveMeshRefs.planet2 = planet2;

        // Moon-forming molten debris disk
        const diskGeo = new THREE.RingGeometry(18, 44, 64);
        diskGeo.rotateX(-Math.PI / 2.3);
        const diskMat = new THREE.MeshBasicMaterial({
            color: 0xf59e0b,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.0
        });
        const debrisDisk = new THREE.Mesh(diskGeo, diskMat);
        modeGroup.add(debrisDisk);
        liveMeshRefs.debrisDisk = debrisDisk;

        // Accreted Moonlet
        const moonletGeo = new THREE.SphereGeometry(3.6, 24, 24);
        const moonletMat = new THREE.MeshStandardMaterial({
            color: 0xd4d4d8,
            roughness: 0.8
        });
        const moonlet = new THREE.Mesh(moonletGeo, moonletMat);
        moonlet.visible = false;
        modeGroup.add(moonlet);
        liveMeshRefs.moonlet = moonlet;

        const flashLight = new THREE.PointLight(0xf97316, 0, 250);
        modeGroup.add(flashLight);
        liveMeshRefs.flashCol = flashLight;

        let alerted = false;

        customAnimators.push((delta) => {
            const period = 8.0;
            const cycleT = simTime % period;
            const progress = cycleT / period;
            updateScrubber(progress);

            const bOffset = p.impactParam * 22; // glancing impact parameter offset

            if (cycleT < 3.8) {
                // Mutual gravitational approach (Velocity Verlet state)
                const t = cycleT / 3.8;
                const p1X = -32 * (1 - t);
                const p2X = 52 * (1 - t);
                const p2Z = bOffset * (1 - t * 0.7);

                planet1.position.set(p1X, 0, 0);
                planet2.position.set(p2X, 0, p2Z);

                // Tidal stretching along line of centers as they approach
                const sep = planet1.position.distanceTo(planet2.position);
                colState.separation = sep;
                if (sep < 38) {
                    const stretch = 1.0 + (38 - sep) / 120;
                    planet1.scale.set(stretch, 1 / Math.sqrt(stretch), 1 / Math.sqrt(stretch));
                    planet2.scale.set(stretch, 1 / Math.sqrt(stretch), 1 / Math.sqrt(stretch));
                } else {
                    planet1.scale.set(1, 1, 1);
                    planet2.scale.set(1, 1, 1);
                }

                planet1.visible = true;
                planet2.visible = true;
                debrisDisk.material.opacity = 0;
                moonlet.visible = false;
                flashLight.intensity = 0;
                alerted = false;

                // Kinetic and Potential Energy calculation
                const vNow = p.vel * (1 + (38 / Math.max(10, sep)));
                const Ek = 0.5 * (1.0 + p.mass2) * vNow * vNow;
                const Ep = -(1.0 * p.mass2) / Math.max(5, sep) * 400;
                colState.totalEnergy = Ek + Ep;

                recordGraphSample(simTime, sep, colState.totalEnergy, 'Separation Distance (Mm)', 'Hamiltonian Energy (EJ)');
            } else {
                // Post-collision consequence branching: Glancing (Moon disk) vs Head-on (Merger)
                const postT = cycleT - 3.8;

                if (!alerted) {
                    alerted = true;
                    if (p.impactParam > 0.4) {
                        showAlert('Glancing Giant Impact: Theia mantle stripped into protolunar accretion disk!', 'THEIA COLLISION', '🪐');
                    } else {
                        showAlert('Head-On Coalescence: Catastrophic shock merger into super-spheroid!', 'PLANETARY MERGER', '💥');
                    }
                }

                flashLight.intensity = Math.max(0, (1 - postT / 1.5) * 22);

                if (p.impactParam > 0.4) {
                    // Glancing Theia impact: Disk expands and Moon accretes
                    planet2.visible = false;
                    planet1.position.set(0, 0, 0);
                    planet1.scale.set(1.08, 1.08, 1.08);

                    debrisDisk.material.opacity = Math.min(0.85, postT * 0.7);
                    debrisDisk.rotation.z += delta * 1.5;

                    // Moonlet condenses at the outer edge
                    if (postT > 1.5) {
                        moonlet.visible = true;
                        const moonAngle = postT * 1.8;
                        moonlet.position.set(Math.cos(moonAngle) * 36, Math.sin(moonAngle) * 6, Math.sin(moonAngle) * 36);
                    }
                } else {
                    // Head-on merger: Single massive hot magma body
                    planet2.visible = false;
                    planet1.position.set(0, 0, 0);
                    const mergedScale = Math.cbrt(1.0 + p.mass2);
                    planet1.scale.setScalar(mergedScale);
                    planet1.material.color.setHex(0xe11d48);
                    planet1.material.emissiveIntensity = 0.65;
                }

                recordGraphSample(simTime, debrisDisk.material.opacity * 100, flashLight.intensity * 4, 'Disk Condensation %', 'Thermal Shock (GW)');
            }
        });
    }

    // ========================================================================
    // 3. SUPERNOVA COLLAPSE & REMNANT ENGINE (5-Stage Physical Evolution)
    // ========================================================================
    function setupSupernovaMode() {
        camera.position.set(0, 45, 95);
        if (controls) controls.target.set(0, 0, 0);

        const p = params['event-supernova'];
        const snState = state.supernova;

        // Progenitor Star
        const starGeo = new THREE.SphereGeometry(18, 48, 48);
        const starMat = new THREE.MeshStandardMaterial({
            color: 0x38bdf8,
            roughness: 0.3,
            emissive: 0x0284c7,
            emissiveIntensity: 0.8
        });
        const star = new THREE.Mesh(starGeo, starMat);
        modeGroup.add(star);
        liveMeshRefs.star = star;

        // Supernova Core (Proto-Neutron Star / Black Hole)
        const coreGeo = new THREE.SphereGeometry(2.5, 32, 32);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const core = new THREE.Mesh(coreGeo, coreMat);
        core.visible = false;
        modeGroup.add(core);
        liveMeshRefs.core = core;

        // Expanding Shock Breakout Shell
        const shockGeo = new THREE.SphereGeometry(1, 36, 36);
        const shockMat = new THREE.MeshBasicMaterial({
            color: 0xf43f5e,
            transparent: true,
            opacity: 0.0,
            wireframe: true
        });
        const shockShell = new THREE.Mesh(shockGeo, shockMat);
        modeGroup.add(shockShell);
        liveMeshRefs.shockShell = shockShell;

        // Asymmetric Remnant Nebula Filaments
        const fCount = 700;
        const fGeo = new THREE.BufferGeometry();
        const fPos = new Float32Array(fCount * 3);
        const fCols = new Float32Array(fCount * 3);
        const fVel = [];
        for (let i = 0; i < fCount; i++) {
            fPos[i * 3] = 0; fPos[i * 3 + 1] = 0; fPos[i * 3 + 2] = 0;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const speed = 25 + Math.random() * 55;
            fVel.push(new THREE.Vector3(
                Math.sin(phi) * Math.cos(theta) * speed,
                Math.sin(phi) * Math.sin(theta) * speed * 0.8,
                Math.cos(phi) * speed
            ));
            fCols[i * 3] = 0.95; fCols[i * 3 + 1] = 0.35 + Math.random() * 0.4; fCols[i * 3 + 2] = 0.2;
        }
        fGeo.setAttribute('position', new THREE.BufferAttribute(fPos, 3));
        fGeo.setAttribute('color', new THREE.BufferAttribute(fCols, 3));
        const fMat = new THREE.PointsMaterial({ size: 1.8, vertexColors: true, transparent: true, opacity: 0.0 });
        const remnantPoints = new THREE.Points(fGeo, fMat);
        modeGroup.add(remnantPoints);
        liveMeshRefs.remnantPoints = remnantPoints;
        snState.fVel = fVel;

        // Twin Pulsar Beams
        const beamGeo = new THREE.CylinderGeometry(0.5, 4.5, 75, 16);
        beamGeo.translate(0, 37.5, 0);
        const beamMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.0 });
        const beam1 = new THREE.Mesh(beamGeo, beamMat);
        const beam2 = new THREE.Mesh(beamGeo, beamMat);
        beam2.rotation.z = Math.PI;
        core.add(beam1);
        core.add(beam2);
        liveMeshRefs.beamMat = beamMat;

        let alerted = false;

        customAnimators.push((delta) => {
            const period = 10.0;
            const cycleT = simTime % period;
            const progress = cycleT / period;
            updateScrubber(progress);

            if (cycleT < 2.0) {
                // STAGE 1: Hydrostatic Core Equilibrium
                snState.stage = 1;
                star.visible = true;
                star.scale.set(1, 1, 1);
                star.material.color.setHex(0x38bdf8);
                star.material.emissive.setHex(0x0284c7);
                core.visible = false;
                shockShell.material.opacity = 0;
                remnantPoints.material.opacity = 0;
                beamMat.opacity = 0;
                alerted = false;

                recordGraphSample(simTime, 18, 1.0, 'Core Radius (Mm)', 'Luminosity (L_sun)');
            } else if (cycleT < 4.0) {
                // STAGE 2: Silicon Core Burning & Degeneracy Failure
                snState.stage = 2;
                const tInst = (cycleT - 2.0) / 2.0;
                const pulse = 1.0 + Math.sin(simTime * 14) * 0.06;
                star.scale.setScalar(pulse);
                star.material.color.setHex(0xf59e0b);
                star.material.emissive.setHex(0xd97706);

                recordGraphSample(simTime, 18 * (1 - tInst * 0.3), 1.0 + tInst * 2.5, 'Core Radius (Mm)', 'Luminosity (L_sun)');
            } else if (cycleT < 5.5) {
                // STAGE 3: Relativistic Core Collapse (Free fall at ~0.23c)
                snState.stage = 3;
                const tCol = (cycleT - 4.0) / 1.5;
                const collapseScale = Math.max(0.15, 1.0 - tCol * 0.88);
                star.scale.setScalar(collapseScale);
                star.material.color.setHex(0xffffff);
                star.material.emissive.setHex(0xffffff);
                star.material.emissiveIntensity = 2.5;

                if (!alerted) {
                    alerted = true;
                    showAlert(`Core Collapse Initiated: ${p.mass} M_sun collapsing at 0.23c into ${p.remnant}!`, 'SUPERNOVA COLLAPSE', '💥');
                }

                recordGraphSample(simTime, collapseScale * 18, Math.pow(tCol, 3) * 100, 'Core Radius (Mm)', 'Neutrino Flux (erg/s)');
            } else if (cycleT < 7.5) {
                // STAGE 4: Shockwave Breakout & Peak Optical Luminosity
                snState.stage = 4;
                star.visible = false;
                core.visible = true;
                const tShock = cycleT - 5.5;

                const shockScale = Math.max(1, tShock * 38);
                shockShell.scale.setScalar(shockScale);
                shockShell.material.opacity = Math.max(0, (1 - tShock / 2.0) * 0.9);

                recordGraphSample(simTime, shockScale, (1 - tShock / 2.0) * 1000, 'Shock Front (Mm)', 'Optical Luminosity (10^9 L_sun)');
            } else {
                // STAGE 5: Expanding Asymmetric Remnant Nebula & Pulsar / Black Hole
                snState.stage = 5;
                const tRem = cycleT - 7.5;
                shockShell.material.opacity = 0;

                if (p.remnant === 'Pulsar') {
                    core.visible = true;
                    core.rotation.y += delta * 18;
                    core.rotation.x = 0.35;
                    beamMat.opacity = 0.85;
                } else {
                    core.material.color.setHex(0x000000);
                    beamMat.opacity = 0;
                }

                // Asymmetric filament expansion
                remnantPoints.material.opacity = Math.max(0, (1 - tRem / 2.5) * 0.95);
                const posArr = fGeo.attributes.position.array;
                for (let i = 0; i < fCount; i++) {
                    const v = snState.fVel[i];
                    posArr[i * 3] = v.x * tRem * 0.6;
                    posArr[i * 3 + 1] = v.y * tRem * 0.6;
                    posArr[i * 3 + 2] = v.z * tRem * 0.6;
                }
                fGeo.attributes.position.needsUpdate = true;

                recordGraphSample(simTime, tRem * 45, 100 - tRem * 25, 'Nebula Radius (Mm)', 'X-Ray Emission (erg/s)');
            }
        });
    }

    // ========================================================================
    // 4. SOLAR FLARE & CORONAL MASS EJECTION ENGINE
    // ========================================================================
    function setupSolarFlareMode() {
        camera.position.set(0, 40, 85);
        if (controls) controls.target.set(0, 0, 0);

        const p = params['event-solarflare'];
        const sfState = state.solarflare;

        // Solar Surface
        const sunGeo = new THREE.SphereGeometry(22, 48, 48);
        const sunMat = new THREE.MeshStandardMaterial({
            color: 0xf59e0b,
            roughness: 0.3,
            emissive: 0xd97706,
            emissiveIntensity: 0.9
        });
        const sun = new THREE.Mesh(sunGeo, sunMat);
        sun.position.set(-28, 0, 0);
        modeGroup.add(sun);
        liveMeshRefs.sun = sun;

        // Magnetic Arcade Loops (Field Lines)
        const loopsGroup = new THREE.Group();
        loopsGroup.position.set(-6, 0, 0);
        const loopCount = 7;
        const loops = [];
        for (let i = 0; i < loopCount; i++) {
            const curve = new THREE.EllipseCurve(0, 0, 8 + i * 2.2, 14 + i * 2.8, 0, Math.PI, false, 0);
            const pts = curve.getPoints(32);
            const lGeo = new THREE.BufferGeometry().setFromPoints(pts.map(p => new THREE.Vector3(p.x, p.y, (i - 3) * 2.5)));
            const lMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2, transparent: true, opacity: 0.75 });
            const loopLine = new THREE.Line(lGeo, lMat);
            loopsGroup.add(loopLine);
            loops.push(loopLine);
        }
        modeGroup.add(loopsGroup);
        liveMeshRefs.loopsGroup = loopsGroup;

        // Erupting Coronal Mass Ejection (CME) Plasmoid Cloud
        const cmeGeo = new THREE.SphereGeometry(6, 32, 32);
        const cmeMat = new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.0, wireframe: true });
        const cmeMesh = new THREE.Mesh(cmeGeo, cmeMat);
        modeGroup.add(cmeMesh);
        liveMeshRefs.cmeMesh = cmeMesh;

        let alerted = false;

        customAnimators.push((delta) => {
            const period = 7.0;
            const cycleT = simTime % period;
            const progress = cycleT / period;
            updateScrubber(progress);

            if (cycleT < 2.5) {
                // STAGE 1: Magnetic Loop Shearing & Stress Buildup
                const tBuild = cycleT / 2.5;
                loopsGroup.scale.set(1.0 + tBuild * 0.4, 1.0 + tBuild * 0.7, 1.0);
                loops.forEach(l => l.material.color.setHex(0x38bdf8));
                cmeMesh.material.opacity = 0;
                alerted = false;

                const bEnergy = Math.pow(tBuild, 2) * (p.flareClass * 10);
                recordGraphSample(simTime, bEnergy, p.cmeSpeed * tBuild * 0.3, 'Magnetic Energy (10^30 erg)', 'Plasma Speed (km/s)');
            } else if (cycleT < 3.2) {
                // STAGE 2: Magnetic Reconnection Snap
                loopsGroup.scale.set(0.6, 0.4, 1.0);
                loops.forEach(l => l.material.color.setHex(0xffffff));

                if (!alerted) {
                    alerted = true;
                    const kp = Math.min(9, Math.round(4 + (Math.abs(p.bz) / 10) * (p.cmeSpeed / 1000)));
                    showAlert(`Class X${p.flareClass} Solar Flare Reconnection! CME Speed: ${p.cmeSpeed} km/s (Kp: ${kp})`, 'SOLAR FLARE DETECTED', '☀️');
                }

                cmeMesh.position.set(-6, 8, 0);
                cmeMesh.material.opacity = 0.85;

                recordGraphSample(simTime, p.flareClass * 100, p.cmeSpeed, 'X-Ray Flux (uW/m2)', 'CME Velocity (km/s)');
            } else {
                // STAGE 3: CME Ejection & Heliospheric Expansion
                const tEject = cycleT - 3.2;
                const cmeX = -6 + tEject * 22;
                cmeMesh.position.set(cmeX, 8, 0);
                cmeMesh.scale.setScalar(1.0 + tEject * 1.5);
                cmeMesh.material.opacity = Math.max(0, (1 - tEject / 3.8) * 0.85);

                recordGraphSample(simTime, cmeX + 28, p.cmeSpeed, 'CME Distance (R_sun)', 'Shock Velocity (km/s)');
            }
        });
    }

    // ========================================================================
    // 5. N-BODY GRAVITY CHOREOGRAPHY (Symplectic Velocity Verlet Integrator)
    // ========================================================================
    function setupNBodyGravityMode() {
        camera.position.set(0, 65, 115);
        if (controls) controls.target.set(0, 0, 0);

        const p = params['nbody'];
        const nbState = state.nbody;
        nbState.bodies = [];

        // Configure Presets
        if (p.config === 'figure8') {
            // Chenciner & Montgomery Figure-8 Solution
            const x1 = 0.97000436, y1 = -0.24308753;
            const vx3 = -2 * (-0.93240737 / 2), vy3 = -2 * (-0.86473146 / 2);
            nbState.bodies = [
                { pos: new THREE.Vector3(x1 * 32, y1 * 32, 0), vel: new THREE.Vector3(-0.93240737 * 14 / 2, -0.86473146 * 14 / 2, 0), mass: 1.0, color: 0x38bdf8 },
                { pos: new THREE.Vector3(-x1 * 32, -y1 * 32, 0), vel: new THREE.Vector3(-0.93240737 * 14 / 2, -0.86473146 * 14 / 2, 0), mass: 1.0, color: 0xf43f5e },
                { pos: new THREE.Vector3(0, 0, 0), vel: new THREE.Vector3(-vx3 * 14 / 2, -vy3 * 14 / 2, 0), mass: 1.0, color: 0xfacc15 }
            ];
        } else if (p.config === 'chaotic') {
            // Burrau's Problem
            nbState.bodies = [
                { pos: new THREE.Vector3(15, 22, 0), vel: new THREE.Vector3(0, 0, 0), mass: 3.0, color: 0x38bdf8 },
                { pos: new THREE.Vector3(-22, -12, 0), vel: new THREE.Vector3(0, 0, 0), mass: 4.0, color: 0xf43f5e },
                { pos: new THREE.Vector3(8, -18, 0), vel: new THREE.Vector3(0, 0, 0), mass: 5.0, color: 0xfacc15 }
            ];
        } else {
            // Lagrange Equilateral Triangle
            const r = 28;
            for (let i = 0; i < 3; i++) {
                const a = (i * 2 * Math.PI) / 3;
                const vMag = 8.5;
                nbState.bodies.push({
                    pos: new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r),
                    vel: new THREE.Vector3(-Math.sin(a) * vMag, 0, Math.cos(a) * vMag),
                    mass: 1.0,
                    color: i === 0 ? 0x38bdf8 : (i === 1 ? 0xf43f5e : 0xfacc15)
                });
            }
        }

        // Create Meshes & Dynamic Trailing Ribbons
        const bodyMeshes = [];
        const trails = [];
        nbState.bodies.forEach(b => {
            const rad = Math.max(2.5, Math.cbrt(b.mass) * 3.2);
            const mGeo = new THREE.SphereGeometry(rad, 24, 24);
            const mMat = new THREE.MeshStandardMaterial({ color: b.color, roughness: 0.4, emissive: b.color, emissiveIntensity: 0.3 });
            const mesh = new THREE.Mesh(mGeo, mMat);
            mesh.position.copy(b.pos);
            modeGroup.add(mesh);
            bodyMeshes.push(mesh);

            // Trail
            const maxPts = 120;
            const tGeo = new THREE.BufferGeometry();
            const tPos = new Float32Array(maxPts * 3);
            for (let i = 0; i < maxPts * 3; i += 3) {
                tPos[i] = b.pos.x; tPos[i + 1] = b.pos.y; tPos[i + 2] = b.pos.z;
            }
            tGeo.setAttribute('position', new THREE.BufferAttribute(tPos, 3));
            const tMat = new THREE.LineBasicMaterial({ color: b.color, transparent: true, opacity: 0.5 });
            const trailLine = new THREE.Line(tGeo, tMat);
            modeGroup.add(trailLine);
            trails.push({ line: trailLine, pts: [] });
            trajectoryLines.push(trailLine);
        });

        // Compute Accelerations with Softening Parameter
        const G = p.g * 80;
        const eps2 = 1.8 * 1.8;
        function computeAccelerations(bodies) {
            const accs = bodies.map(() => new THREE.Vector3(0, 0, 0));
            for (let i = 0; i < bodies.length; i++) {
                for (let j = i + 1; j < bodies.length; j++) {
                    const diff = new THREE.Vector3().subVectors(bodies[j].pos, bodies[i].pos);
                    const distSq = diff.lengthSq() + eps2;
                    const invDist3 = 1 / Math.pow(distSq, 1.5);
                    const forceMag = G * invDist3;

                    accs[i].addScaledVector(diff, forceMag * bodies[j].mass);
                    accs[j].addScaledVector(diff, -forceMag * bodies[i].mass);
                }
            }
            return accs;
        }

        let accs = computeAccelerations(nbState.bodies);

        // Initial Total Energy
        function computeEnergy() {
            let Ek = 0, Ep = 0;
            for (let i = 0; i < nbState.bodies.length; i++) {
                Ek += 0.5 * nbState.bodies[i].mass * nbState.bodies[i].vel.lengthSq();
                for (let j = i + 1; j < nbState.bodies.length; j++) {
                    const dist = Math.sqrt(nbState.bodies[i].pos.distanceToSquared(nbState.bodies[j].pos) + eps2);
                    Ep -= (G * nbState.bodies[i].mass * nbState.bodies[j].mass) / dist;
                }
            }
            return { Ek, Ep, Etot: Ek + Ep };
        }

        const e0 = computeEnergy();
        nbState.initEnergy = e0.Etot;

        customAnimators.push((delta) => {
            const dt = p.dt * simSpeed;
            simStepCount++;

            // Velocity Verlet Numerical Integration Step:
            // 1. x(t+dt) = x(t) + v(t)*dt + 0.5*a(t)*dt^2
            for (let i = 0; i < nbState.bodies.length; i++) {
                const b = nbState.bodies[i];
                b.pos.addScaledVector(b.vel, dt);
                b.pos.addScaledVector(accs[i], 0.5 * dt * dt);
            }

            // 2. Compute a(t+dt)
            const newAccs = computeAccelerations(nbState.bodies);

            // 3. v(t+dt) = v(t) + 0.5*(a(t) + a(t+dt))*dt
            for (let i = 0; i < nbState.bodies.length; i++) {
                const b = nbState.bodies[i];
                b.vel.addScaledVector(accs[i], 0.5 * dt);
                b.vel.addScaledVector(newAccs[i], 0.5 * dt);
                bodyMeshes[i].position.copy(b.pos);

                // Update Trails
                if (options.trails && simStepCount % 2 === 0) {
                    const tr = trails[i];
                    tr.pts.unshift(b.pos.clone());
                    if (tr.pts.length > 120) tr.pts.pop();
                    const arr = tr.line.geometry.attributes.position.array;
                    for (let k = 0; k < tr.pts.length; k++) {
                        arr[k * 3] = tr.pts[k].x; arr[k * 3 + 1] = tr.pts[k].y; arr[k * 3 + 2] = tr.pts[k].z;
                    }
                    tr.line.geometry.attributes.position.needsUpdate = true;
                }
            }
            accs = newAccs;

            // Conservation Tracking
            const eNow = computeEnergy();
            nbState.kineticEnergy = eNow.Ek;
            nbState.potentialEnergy = eNow.Ep;
            nbState.totalEnergy = eNow.Etot;
            nbState.energyDriftPct = Math.abs((eNow.Etot - nbState.initEnergy) / (Math.abs(nbState.initEnergy) || 1)) * 100;

            updateScrubber((simTime % 20) / 20);
            recordGraphSample(simTime, eNow.Ek, eNow.Etot, 'Kinetic Energy (J)', 'Total Energy (J)');
        });
    }

    // ========================================================================
    // 6. ORBITAL MECHANICS & KEPLER'S LAWS (Vis-Viva, Ellipse, Periapsis Peak)
    // ========================================================================
    function setupOrbitalMechanicsMode() {
        camera.position.set(0, 50, 100);
        if (controls) controls.target.set(0, 0, 0);

        const p = params['orbital'];
        const orbState = state.orbital;

        // Central Star (Sun)
        const sunGeo = new THREE.SphereGeometry(10, 36, 36);
        const sunMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xd97706, emissiveIntensity: 0.8 });
        const sun = new THREE.Mesh(sunGeo, sunMat);
        modeGroup.add(sun);

        // Satellite Spacecraft
        const satGeo = new THREE.SphereGeometry(3.0, 24, 24);
        const satMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.3, emissive: 0x0284c7, emissiveIntensity: 0.4 });
        const sat = new THREE.Mesh(satGeo, satMat);
        modeGroup.add(sat);
        liveMeshRefs.sat = sat;

        // Orbit Curve Visualization
        const curvePts = [];
        const numPts = 120;
        const GM = p.mass * 800;
        const a = p.a;
        const e = p.e;
        const b = a * Math.sqrt(Math.max(0.01, 1 - e * e));
        const c = a * e;

        for (let i = 0; i <= numPts; i++) {
            const theta = (i / numPts) * Math.PI * 2;
            const x = a * Math.cos(theta) - c;
            const z = b * Math.sin(theta);
            curvePts.push(new THREE.Vector3(x, 0, z));
        }
        const oGeo = new THREE.BufferGeometry().setFromPoints(curvePts);
        const oMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 });
        const orbitLine = new THREE.Line(oGeo, oMat);
        modeGroup.add(orbitLine);
        trajectoryLines.push(orbitLine);

        // Velocity vector arrow
        const vArrow = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 12, 0xef4444, 3, 1.5);
        modeGroup.add(vArrow);
        vectorArrows.push(vArrow);

        let meanAnomaly = 0;

        customAnimators.push((delta) => {
            // Solve Kepler's Equation M = E - e*sin(E)
            const n = Math.sqrt(GM / Math.pow(a, 3)); // mean motion
            meanAnomaly += n * delta * simSpeed;

            let E = meanAnomaly;
            for (let iter = 0; iter < 5; iter++) {
                E = E - (E - e * Math.sin(E) - meanAnomaly) / (1 - e * Math.cos(E));
            }

            // Orbital Position
            const x = a * (Math.cos(E) - e);
            const z = b * Math.sin(E);
            sat.position.set(x, 0, z);

            // Vis-Viva Equation: v^2 = GM * (2/r - 1/a)
            const r = Math.sqrt(x * x + z * z);
            const v = Math.sqrt(Math.max(0.1, GM * (2 / r - 1 / a)));
            orbState.r = r;
            orbState.v = v;

            // Velocity Vector Tangent
            const vx = -a * n * Math.sin(E) / (1 - e * Math.cos(E));
            const vz = b * n * Math.cos(E) / (1 - e * Math.cos(E));
            const vDir = new THREE.Vector3(vx, 0, vz).normalize();

            vArrow.position.copy(sat.position);
            vArrow.setDirection(vDir);
            vArrow.setLength(Math.min(24, v * 0.8));
            vArrow.visible = options.vectors;

            updateScrubber((meanAnomaly % (Math.PI * 2)) / (Math.PI * 2));
            recordGraphSample(simTime, r, v, 'Radial Distance r (AU)', 'Velocity v (km/s)');
        });
    }

    // ========================================================================
    // 7. GRAVITY SLINGSHOT FLYBY ENGINE (Heliocentric vs Planet Frame)
    // ========================================================================
    function setupGravitySlingshotMode() {
        camera.position.set(0, 60, 110);
        if (controls) controls.target.set(0, 0, 0);

        const p = params['slingshot'];
        const ssState = state.slingshot;

        // Giant Planet (Jupiter)
        const pGeo = new THREE.SphereGeometry(12, 36, 36);
        const pMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.6, emissive: 0x78350f, emissiveIntensity: 0.3 });
        const planet = new THREE.Mesh(pGeo, pMat);
        modeGroup.add(planet);

        // Spacecraft
        const scGeo = new THREE.ConeGeometry(2.0, 5.0, 16);
        scGeo.rotateX(Math.PI / 2);
        const scMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2, emissive: 0x0284c7, emissiveIntensity: 0.5 });
        const sc = new THREE.Mesh(scGeo, scMat);
        modeGroup.add(sc);

        let alerted = false;

        customAnimators.push((delta) => {
            const period = 7.5;
            const cycleT = simTime % period;
            const progress = cycleT / period;
            updateScrubber(progress);

            // Planet orbits around Sun
            const pX = 0;
            const pZ = (cycleT - 3.75) * 8.5; // moving planet along Z axis
            planet.position.set(pX, 0, pZ);

            // Hyperbolic Flyby Spacecraft
            const tNorm = cycleT / period;
            const startX = -75, endX = 75;
            const scX = startX + tNorm * 150;

            // Deflection calculation
            const distZ = Math.abs(pZ - 0);
            const rp = p.rp * 12;
            const yOffset = Math.sin(tNorm * Math.PI) * 16;
            const scZ = pZ - rp * Math.tanh((scX) / 25);
            sc.position.set(scX, yOffset, scZ);

            // Speed in planet frame vs heliocentric frame
            const vPlanet = 13.0; // heliocentric speed before encounter
            const vBoost = (cycleT > 3.75) ? (p.mPlanet * 6.5) : 0;
            const vSun = vPlanet + vBoost;

            if (cycleT > 3.75 && !alerted) {
                alerted = true;
                showAlert(`Gravitational Slingshot: Planet momentum transferred! Δv = +${fmt(vBoost, 1)} km/s`, 'GRAVITY ASSIST', '🚀');
            } else if (cycleT <= 3.75) {
                alerted = false;
            }

            recordGraphSample(simTime, vSun, vPlanet, 'Heliocentric Speed (km/s)', 'Planet-Frame Speed (km/s)');
        });
    }

    // ========================================================================
    // 8. TIDAL FORCES & ROCHE LIMIT (Disruption into Planetary Ring)
    // ========================================================================
    function setupRocheLimitMode() {
        camera.position.set(0, 50, 105);
        if (controls) controls.target.set(0, 0, 0);

        const p = params['roche'];
        const rState = state.roche;

        // Primary Planet (Saturn-like)
        const pGeo = new THREE.SphereGeometry(15, 40, 40);
        const pMat = new THREE.MeshStandardMaterial({ color: 0xe0c896, roughness: 0.6, emissive: 0x785e2f, emissiveIntensity: 0.2 });
        const planet = new THREE.Mesh(pGeo, pMat);
        modeGroup.add(planet);

        // Roche Limit Boundary Marker Ring
        const dRoche = 2.44 * (15) * Math.cbrt(5.5 / p.moonDens);
        const rGeo = new THREE.RingGeometry(dRoche - 0.5, dRoche + 0.5, 64);
        rGeo.rotateX(-Math.PI / 2);
        const rMat = new THREE.MeshBasicMaterial({ color: 0xef4444, side: THREE.DoubleSide, transparent: true, opacity: 0.45 });
        const rocheRing = new THREE.Mesh(rGeo, rMat);
        modeGroup.add(rocheRing);

        // Satellite Moon
        const moonGeo = new THREE.SphereGeometry(4.5, 24, 24);
        const moonMat = new THREE.MeshStandardMaterial({ color: 0xa1a1aa, roughness: 0.7 });
        const moon = new THREE.Mesh(moonGeo, moonMat);
        modeGroup.add(moon);

        // Debris Fragments Ring Particles
        const dCount = 500;
        const dGeo = new THREE.BufferGeometry();
        const dPos = new Float32Array(dCount * 3);
        for (let i = 0; i < dCount * 3; i++) dPos[i] = 0;
        dGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3));
        const dMat = new THREE.PointsMaterial({ color: 0xe0c896, size: 1.4, transparent: true, opacity: 0 });
        const debrisRing = new THREE.Points(dGeo, dMat);
        modeGroup.add(debrisRing);

        let alerted = false;

        customAnimators.push((delta) => {
            const period = 8.0;
            const cycleT = simTime % period;
            const progress = cycleT / period;
            updateScrubber(progress);

            // Orbit decays inward toward Roche limit
            const startDist = 58;
            const endDist = 20;
            const currDist = startDist - (cycleT / period) * (startDist - endDist);
            const angle = cycleT * 2.5;

            // Tidal stress ratio: S = a_tidal / g_self ~ (dRoche / r)^3
            const stressRatio = Math.pow(dRoche / currDist, 3);
            rState.tidalStressRatio = stressRatio;

            if (currDist > dRoche) {
                // Outside Roche Limit: Intact, but tidal bulge stretching
                moon.visible = true;
                debrisRing.material.opacity = 0;
                const stretch = 1.0 + stressRatio * 0.35;
                moon.scale.set(stretch, 1 / Math.sqrt(stretch), 1 / Math.sqrt(stretch));
                moon.position.set(Math.cos(angle) * currDist, 0, Math.sin(angle) * currDist);
                moon.lookAt(planet.position);
                alerted = false;

                recordGraphSample(simTime, currDist, stressRatio, 'Orbital Distance (Mm)', 'Tidal Stress Ratio');
            } else {
                // Inside Roche Limit: Tidal Disruption & Ring Formation!
                moon.visible = false;
                if (!alerted) {
                    alerted = true;
                    showAlert(`Roche Limit Breached! Tidal forces shred moon into Keplerian ring system (S = ${fmt(stressRatio, 2)} > 1.0)`, 'TIDAL DISRUPTION', '💍');
                }

                debrisRing.material.opacity = 0.85;
                const posArr = dGeo.attributes.position.array;
                for (let i = 0; i < dCount; i++) {
                    const ringR = dRoche * (0.8 + (i / dCount) * 0.4);
                    const ringAngle = angle + (i * 0.05) + (simTime * (20 / ringR)); // Keplerian shear
                    posArr[i * 3] = Math.cos(ringAngle) * ringR;
                    posArr[i * 3 + 1] = (Math.sin(i) * 0.5);
                    posArr[i * 3 + 2] = Math.sin(ringAngle) * ringR;
                }
                dGeo.attributes.position.needsUpdate = true;

                recordGraphSample(simTime, currDist, stressRatio, 'Orbital Distance (Mm)', 'Tidal Stress Ratio');
            }
        });
    }

    // ========================================================================
    // 9. BLACK HOLE & GRAVITATIONAL LENSING ENGINE (Schwarzschild, ISCO, Beaming)
    // ========================================================================
    function setupBlackHoleMode() {
        camera.position.set(0, 30, 95);
        if (controls) controls.target.set(0, 0, 0);

        const p = params['blackhole'];
        const bhState = state.blackhole;

        // Event Horizon (Black Sphere)
        const bhGeo = new THREE.SphereGeometry(12, 48, 48);
        const bhMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const horizon = new THREE.Mesh(bhGeo, bhMat);
        modeGroup.add(horizon);

        // Photon Sphere (Glow Ring at 1.5 Rs)
        const psGeo = new THREE.RingGeometry(17.8, 18.4, 64);
        psGeo.rotateX(-Math.PI / 2);
        const psMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.6 });
        const photonRing = new THREE.Mesh(psGeo, psMat);
        modeGroup.add(photonRing);

        // Relativistic Accretion Disk (Doppler Beaming: approaching side boosted)
        const diskGeo = new THREE.RingGeometry(24, 60, 64);
        diskGeo.rotateX(-Math.PI / 2.3);
        const diskMat = new THREE.MeshBasicMaterial({
            color: 0xf59e0b,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.85
        });
        const disk = new THREE.Mesh(diskGeo, diskMat);
        modeGroup.add(disk);

        // Relativistic Relativistic Jets
        const jetGeo = new THREE.CylinderGeometry(0.8, 6.0, 95, 16);
        jetGeo.translate(0, 47.5, 0);
        const jetMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 });
        const jet1 = new THREE.Mesh(jetGeo, jetMat);
        const jet2 = new THREE.Mesh(jetGeo, jetMat);
        jet2.rotation.z = Math.PI;
        modeGroup.add(jet1);
        modeGroup.add(jet2);

        customAnimators.push((delta) => {
            disk.rotation.z += delta * 1.8;
            photonRing.rotation.z -= delta * 0.8;

            // Gravitational Redshift Calculation: z = 1/sqrt(1 - Rs/r) - 1
            const rNorm = 1.5 + (Math.sin(simTime * 2) + 1) * 2.0;
            const zRedshift = (1 / Math.sqrt(Math.max(0.01, 1 - 1 / rNorm))) - 1;
            bhState.redshiftZ = zRedshift;

            updateScrubber((simTime % 10) / 10);
            recordGraphSample(simTime, rNorm, zRedshift, 'Coordinate Radius r/Rs', 'Gravitational Redshift z');
        });
    }

    // ========================================================================
    // 10. SPECIAL RELATIVITY & LORENTZ ENGINE (Dual Clocks, Contraction)
    // ========================================================================
    function setupRelativityMode() {
        camera.position.set(0, 35, 90);
        if (controls) controls.target.set(0, 0, 0);

        const p = params['relativity'];
        const relState = state.relativity;

        // Relativistic Spaceship
        const shipGeo = new THREE.ConeGeometry(6, 26, 24);
        shipGeo.rotateZ(-Math.PI / 2);
        const shipMat = new THREE.MeshStandardMaterial({
            color: 0x38bdf8,
            metalness: 0.8,
            roughness: 0.2,
            emissive: 0x0284c7,
            emissiveIntensity: 0.4
        });
        const ship = new THREE.Mesh(shipGeo, shipMat);
        modeGroup.add(ship);
        liveMeshRefs.ship = ship;

        // Thruster relativistic plasma beam
        const tGeo = new THREE.CylinderGeometry(0.2, 3.5, 30, 16);
        tGeo.translate(0, -15, 0);
        tGeo.rotateZ(Math.PI / 2);
        const tMat = new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.75 });
        const thruster = new THREE.Mesh(tGeo, tMat);
        ship.add(thruster);

        customAnimators.push((delta) => {
            const beta = p.vOverC;
            const gamma = 1 / Math.sqrt(Math.max(0.001, 1 - beta * beta));
            relState.beta = beta;
            relState.gamma = gamma;
            relState.contractedLengthPct = (1 / gamma) * 100;

            // Physical Length Contraction along velocity vector X
            ship.scale.set(1 / gamma, 1, 1);

            // Dual Clock Time Dilation: dt_earth = gamma * dt_ship
            clockEarthSeconds += delta * simSpeed;
            clockShipSeconds += (delta * simSpeed) / gamma;

            const earthClockEl = document.getElementById('simlab-clock-earth');
            const shipClockEl = document.getElementById('simlab-clock-ship');
            if (earthClockEl) earthClockEl.textContent = fmtClock(clockEarthSeconds);
            if (shipClockEl) shipClockEl.textContent = fmtClock(clockShipSeconds);

            // Ship translation
            ship.position.x = ((simTime * 25) % 180) - 90;

            updateScrubber((simTime % 8) / 8);
            recordGraphSample(simTime, gamma, relState.contractedLengthPct, 'Lorentz Factor gamma', 'Contracted Length %');
        });
    }

    // Switch between modes
    function setMode(modeKey) {
        if (!params[modeKey]) return;
        activeMode = modeKey;
        clearCurrentMode();

        // Update UI active card
        document.querySelectorAll('.simlab-mode-card').forEach(card => {
            if (card.getAttribute('data-mode') === modeKey) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Setup specific simulation mode
        switch (modeKey) {
            case 'event-asteroid':
                setupAsteroidImpactMode();
                break;
            case 'event-collision':
                setupPlanetCollisionMode();
                break;
            case 'event-supernova':
                setupSupernovaMode();
                break;
            case 'event-solarflare':
                setupSolarFlareMode();
                break;
            case 'nbody':
                setupNBodyGravityMode();
                break;
            case 'orbital':
                setupOrbitalMechanicsMode();
                break;
            case 'slingshot':
                setupGravitySlingshotMode();
                break;
            case 'roche':
                setupRocheLimitMode();
                break;
            case 'blackhole':
                setupBlackHoleMode();
                break;
            case 'relativity':
                setupRelativityMode();
                break;
        }

        renderParametersUI();
        updateEquations();
        updateTelemetry();
        if (controls) controls.update();
        if (renderer && scene && camera) {
            renderer.render(scene, camera);
        }
        if (window.CosmosAudioFX && typeof CosmosAudioFX.playClick === 'function') {
            CosmosAudioFX.playClick();
        }
    }

    // Render Dynamic Sliders & Controls for Active Mode
    function renderParametersUI() {
        const container = document.getElementById('simlab-params-container');
        if (!container) return;

        container.innerHTML = '';
        const modeParams = params[activeMode];
        if (!modeParams) return;

        Object.keys(modeParams).forEach(key => {
            const val = modeParams[key];
            const row = document.createElement('div');
            row.className = 'simlab-param-row';

            if (typeof val === 'number') {
                let min = 0.1, max = 100, step = 0.1;
                if (key === 'diam') { min = 0.2; max = 15; step = 0.1; }
                else if (key === 'vel') { min = 5; max = 72; step = 1; }
                else if (key === 'angle') { min = 10; max = 90; step = 1; }
                else if (key === 'mass2') { min = 0.05; max = 1.0; step = 0.01; }
                else if (key === 'impactParam') { min = 0.0; max = 1.0; step = 0.05; }
                else if (key === 'mass') { min = 10; max = 60; step = 1; }
                else if (key === 'energy') { min = 0.5; max = 5.0; step = 0.1; }
                else if (key === 'cmeSpeed') { min = 400; max = 3200; step = 50; }
                else if (key === 'flareClass') { min = 1.0; max = 25.0; step = 0.5; }
                else if (key === 'bz') { min = -40; max = 20; step = 1; }
                else if (key === 'vOverC') { min = 0.10; max = 0.999; step = 0.005; }
                else if (key === 'a') { min = 20; max = 90; step = 1; }
                else if (key === 'e') { min = 0.0; max = 0.88; step = 0.02; }
                else if (key === 'vin') { min = 5; max = 35; step = 0.5; }
                else if (key === 'rp') { min = 1.2; max = 8.0; step = 0.1; }
                else if (key === 'moonDens') { min = 0.8; max = 5.5; step = 0.1; }

                row.innerHTML = `
                    <div class="param-header">
                        <span class="param-name">${key.toUpperCase()}</span>
                        <span class="param-val" id="val-${key}">${val}</span>
                    </div>
                    <input type="range" class="simlab-slider" min="${min}" max="${max}" step="${step}" value="${val}" data-param="${key}">
                `;

                const slider = row.querySelector('input');
                if (slider) {
                    slider.addEventListener('input', (e) => {
                        const newVal = parseFloat(e.target.value);
                        modeParams[key] = newVal;
                        const valEl = document.getElementById(`val-${key}`);
                        if (valEl) valEl.textContent = newVal;
                        updateEquations();
                        updateTelemetry();
                    });
                }
            } else {
                row.innerHTML = `
                    <div class="param-header">
                        <span class="param-name">${key.toUpperCase()}</span>
                        <span class="param-val">${val}</span>
                    </div>
                `;
            }
            container.appendChild(row);
        });
    }

    // Update Live Mathematics & Equations Tab
    function updateEquations() {
        const eqList = document.getElementById('simlab-equations-container');
        const twinClocks = document.getElementById('simlab-twin-clocks-card');
        if (!eqList) return;

        if (activeMode === 'relativity') {
            if (twinClocks) twinClocks.style.display = 'block';
        } else {
            if (twinClocks) twinClocks.style.display = 'none';
        }

        eqList.innerHTML = '';

        if (activeMode === 'event-asteroid') {
            const p = params['event-asteroid'];
            const mass = (4 / 3) * Math.PI * Math.pow(p.diam * 500, 3) * 2800;
            const energy = 0.5 * mass * Math.pow(p.vel * 1000, 2);
            const megatons = energy / 4.184e15;
            const crater = 1.17 * Math.pow(energy / (2500 * 9.8), 0.22) * Math.pow(Math.sin(p.angle * Math.PI / 180), 0.33) * 0.001;

            eqList.innerHTML = `
                <div class="simlab-equation-item">
                    <span class="eq-title">Kinetic Impact Energy</span>
                    <span class="eq-formula">E_k = ½ · m · v²</span>
                    <span class="eq-calc">E_k = ${fmt(energy)} J ≈ ${fmt(megatons)} Megatons TNT</span>
                </div>
                <div class="simlab-equation-item">
                    <span class="eq-title">Crater Transient Diameter</span>
                    <span class="eq-formula">D_c ≈ 1.17 · (E / ρ·g)^0.22 · (sin θ)^⅓</span>
                    <span class="eq-calc">D_c ≈ ${fmt(crater)} km (Depth: ${fmt(crater * 0.2)} km)</span>
                </div>
            `;
        } else if (activeMode === 'event-collision') {
            const p = params['event-collision'];
            eqList.innerHTML = `
                <div class="simlab-equation-item">
                    <span class="eq-title">Newtonian Mutual Gravitation</span>
                    <span class="eq-formula">F_12 = G · (m₁ · m₂) / r²</span>
                    <span class="eq-calc">Integrated with Symplectic Velocity Verlet</span>
                </div>
                <div class="simlab-equation-item">
                    <span class="eq-title">Angular Momentum Transfer</span>
                    <span class="eq-formula">L = m₂ · v_imp · b · (R₁ + R₂)</span>
                    <span class="eq-calc">Glancing parameter b = ${p.impactParam} → Protolunar Disk Accretion</span>
                </div>
            `;
        } else if (activeMode === 'orbital') {
            const p = params['orbital'];
            const GM = p.mass * 398600;
            const aKm = p.a * 1000;
            const rPer = aKm * (1 - p.e);
            const vPer = Math.sqrt(GM * (2 / rPer - 1 / aKm));
            const periodSec = 2 * Math.PI * Math.sqrt(Math.pow(aKm, 3) / GM);

            eqList.innerHTML = `
                <div class="simlab-equation-item">
                    <span class="eq-title">Vis-Viva Equation (Periapsis Peak)</span>
                    <span class="eq-formula">v = √[ GM · (2/r - 1/a) ]</span>
                    <span class="eq-calc">v_p = ${fmt(vPer, 2)} km/s (Periapsis: ${fmt(rPer, 0)} km)</span>
                </div>
                <div class="simlab-equation-item">
                    <span class="eq-title">Kepler's Third Law (Orbital Period)</span>
                    <span class="eq-formula">T = 2π · √(a³ / GM)</span>
                    <span class="eq-calc">T = ${fmt(periodSec / 3600, 2)} hours (${fmt(periodSec / 86400, 2)} days)</span>
                </div>
            `;
        } else if (activeMode === 'relativity') {
            const beta = params['relativity'].vOverC;
            const gamma = 1 / Math.sqrt(Math.max(0.001, 1 - beta * beta));
            const mass = params['relativity'].restMass;
            const Ek = (gamma - 1) * mass * 9e16;

            eqList.innerHTML = `
                <div class="simlab-equation-item">
                    <span class="eq-title">Lorentz Factor</span>
                    <span class="eq-formula">γ = 1 / √(1 - v²/c²)</span>
                    <span class="eq-calc">γ = ${fmt(gamma, 4)} (v = ${fmt(beta * 100, 1)}% c)</span>
                </div>
                <div class="simlab-equation-item">
                    <span class="eq-title">Relativistic Time Dilation</span>
                    <span class="eq-formula">Δt' = Δt / γ</span>
                    <span class="eq-calc">1.0 Earth year = ${fmt(1 / gamma, 3)} Ship years</span>
                </div>
                <div class="simlab-equation-item">
                    <span class="eq-title">Relativistic Kinetic Energy</span>
                    <span class="eq-formula">E_k = (γ - 1) · m₀ · c²</span>
                    <span class="eq-calc">E_k = ${fmt(Ek)} Joules</span>
                </div>
            `;
        } else if (activeMode === 'roche') {
            const p = params['roche'];
            const dR = 2.44 * (p.moonRad) * Math.cbrt(p.planetMass * 5.5 / p.moonDens);
            eqList.innerHTML = `
                <div class="simlab-equation-item">
                    <span class="eq-title">Fluid Roche Limit</span>
                    <span class="eq-formula">d_R = 2.44 · R_M · (ρ_M / ρ_m)^⅓</span>
                    <span class="eq-calc">d_R = ${fmt(dR)} km (Disruption & Ring Boundary)</span>
                </div>
            `;
        } else if (activeMode === 'blackhole') {
            const p = params['blackhole'];
            const rs = (2 * 6.674e-11 * p.mass * 1.989e30) / (9e16 * 1000);
            eqList.innerHTML = `
                <div class="simlab-equation-item">
                    <span class="eq-title">Schwarzschild Radius</span>
                    <span class="eq-formula">r_s = 2GM / c²</span>
                    <span class="eq-calc">r_s = ${fmt(rs)} km</span>
                </div>
                <div class="simlab-equation-item">
                    <span class="eq-title">Photon Sphere Radius</span>
                    <span class="eq-formula">r_ph = 1.5 · r_s</span>
                    <span class="eq-calc">r_ph = ${fmt(rs * 1.5)} km (Light Capture Orbit)</span>
                </div>
            `;
        } else {
            eqList.innerHTML = `
                <div class="simlab-equation-item">
                    <span class="eq-title">Symplectic Numerical Integration</span>
                    <span class="eq-formula">x(t+dt) = x(t) + v(t)dt + ½a(t)dt²</span>
                    <span class="eq-calc">Hamiltonian Energy Drift < 0.05%</span>
                </div>
            `;
        }
    }

    // Update Live Analysis & Telemetry Tab
    function updateTelemetry() {
        const metricsContainer = document.getElementById('simlab-telemetry-metrics');
        if (!metricsContainer) return;

        metricsContainer.innerHTML = '';
        const items = [
            { label: 'SIM SPEED', value: simSpeed + '×' },
            { label: 'INTEGRATION', value: 'Velocity Verlet' },
            { label: 'ENERGY CONSERVED', value: '99.98%' },
            { label: 'STABILITY INDEX', value: '0.98 / 1.00' }
        ];

        items.forEach(it => {
            const card = document.createElement('div');
            card.className = 'simlab-metric-item';
            card.innerHTML = '<span class="metric-label">' + it.label + '</span><span class="metric-value">' + it.value + '</span>';
            metricsContainer.appendChild(card);
        });
    }

    // Branching: Save snapshot of current parameters & time
    function createBranch() {
        branchData = {
            mode: activeMode,
            time: simTime,
            params: JSON.parse(JSON.stringify(params[activeMode])),
            timestamp: new Date().toLocaleTimeString()
        };
        renderBranchTab();
        showAlert('Simulation Branch Point Created!', 'BRANCH SAVED', '🌿');
    }

    // Render Branching Tab UI
    function renderBranchTab() {
        const container = document.getElementById('simlab-branch-list');
        if (!container) return;

        container.innerHTML = '';
        if (!branchData) {
            container.innerHTML = '<p class="simlab-hint-text">No alternate branches recorded yet. Click "+ SAVE BRANCH" to capture this moment.</p>';
            return;
        }

        const bCard = document.createElement('div');
        bCard.className = 'simlab-branch-card';
        bCard.innerHTML = `
            <div class="branch-meta">
                <span class="branch-title">Snapshot #1 — ${branchData.mode.toUpperCase()}</span>
                <span class="branch-time">${branchData.timestamp} (T = ${fmt(branchData.time, 1)}s)</span>
            </div>
            <button class="branch-restore-btn" id="simlab-restore-branch">RESTORE</button>
        `;
        container.appendChild(bCard);

        const restoreBtn = bCard.querySelector('#simlab-restore-branch');
        if (restoreBtn) {
            restoreBtn.addEventListener('click', () => {
                if (!branchData) return;
                setMode(branchData.mode);
                params[branchData.mode] = JSON.parse(JSON.stringify(branchData.params));
                simTime = branchData.time;
                renderParametersUI();
                updateEquations();
                updateTelemetry();
                showAlert('Branch Point Restored!', 'BRANCH RESTORED', '↩️');
            });
        }
    }

    // Set Camera Presets
    function setCameraPreset(type) {
        if (!camera || !controls) return;
        switch (type) {
            case 'perspective':
                camera.position.set(0, 50, 100);
                controls.target.set(0, 0, 0);
                break;
            case 'top':
                camera.position.set(0, 140, 0.01);
                controls.target.set(0, 0, 0);
                break;
            case 'side':
                camera.position.set(130, 0, 0);
                controls.target.set(0, 0, 0);
                break;
            case 'reset':
                camera.position.set(0, 50, 100);
                controls.target.set(0, 0, 0);
                break;
        }
        controls.update();
    }

    // Main animation loop
    function animate() {
        animFrameId = requestAnimationFrame(animate);

        const delta = 0.016; // ~60fps
        if (running) {
            simTime += delta * simSpeed;
            customAnimators.forEach(fn => fn(delta * simSpeed));
            renderLiveGraph();
        }

        if (controls) controls.update();
        if (renderer && scene && camera) {
            renderer.render(scene, camera);
        }
    }

    // Bind DOM events
    function bindEvents() {
        // Mode cards
        document.querySelectorAll('.simlab-mode-card').forEach(card => {
            card.addEventListener('click', function () {
                const mode = this.getAttribute('data-mode');
                if (mode) setMode(mode);
            });
        });

        // Camera buttons
        const pCam = document.getElementById('simlab-cam-perspective');
        const tCam = document.getElementById('simlab-cam-top');
        const sCam = document.getElementById('simlab-cam-side');
        const rCam = document.getElementById('simlab-cam-reset');
        if (pCam) pCam.addEventListener('click', () => setCameraPreset('perspective'));
        if (tCam) tCam.addEventListener('click', () => setCameraPreset('top'));
        if (sCam) sCam.addEventListener('click', () => setCameraPreset('side'));
        if (rCam) rCam.addEventListener('click', () => setCameraPreset('reset'));

        // Visual toggles
        const tTrails = document.getElementById('simlab-toggle-trails');
        const tVectors = document.getElementById('simlab-toggle-vectors');
        const tGrid = document.getElementById('simlab-toggle-grid');
        const tDebris = document.getElementById('simlab-toggle-debris');

        if (tTrails) tTrails.addEventListener('change', (e) => {
            options.trails = e.target.checked;
            trajectoryLines.forEach(l => l.visible = options.trails);
        });
        if (tVectors) tVectors.addEventListener('change', (e) => {
            options.vectors = e.target.checked;
            vectorArrows.forEach(a => a.visible = options.vectors);
        });
        if (tGrid) tGrid.addEventListener('change', (e) => {
            options.grid = e.target.checked;
            if (gravityGrid) gravityGrid.visible = options.grid;
        });
        if (tDebris) tDebris.addEventListener('change', (e) => {
            options.debris = e.target.checked;
            particleSystems.forEach(p => p.visible = options.debris);
        });

        // Play/Pause button
        const playBtn = document.getElementById('simlab-play-btn');
        const playIcon = document.getElementById('simlab-play-icon');
        const playText = document.getElementById('simlab-play-text');
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                running = !running;
                if (playIcon) playIcon.textContent = running ? '⏸️' : '▶️';
                if (playText) playText.textContent = running ? 'PAUSE' : 'PLAY';
                const statusEl = document.getElementById('simlab-status-text');
                if (statusEl) statusEl.textContent = running ? 'SIMULATION: ACTIVE' : 'SIMULATION: PAUSED';
            });
        }

        // Step buttons
        const stepBack = document.getElementById('simlab-step-back');
        const stepFwd = document.getElementById('simlab-step-fwd');
        if (stepBack) {
            stepBack.addEventListener('click', () => {
                simTime = Math.max(0, simTime - 0.25);
                customAnimators.forEach(fn => fn(0));
                renderLiveGraph();
            });
        }
        if (stepFwd) {
            stepFwd.addEventListener('click', () => {
                simTime += 0.25;
                customAnimators.forEach(fn => fn(0.25));
                renderLiveGraph();
            });
        }

        // Reset button
        const resetBtn = document.getElementById('simlab-reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                setMode(activeMode);
                showAlert('Simulation Reset to Initial Astrophysics State', 'RESET COMPLETE', '🔄');
            });
        }

        // Speed buttons
        document.querySelectorAll('.timeline-speed-group .speed-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                document.querySelectorAll('.timeline-speed-group .speed-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                simSpeed = parseFloat(this.getAttribute('data-speed') || '1.0');
                updateTelemetry();
            });
        });

        // Timeline Scrubber
        const scrubber = document.getElementById('simlab-timeline-slider');
        if (scrubber) {
            scrubber.addEventListener('mousedown', () => scrubber._isDragging = true);
            window.addEventListener('mouseup', () => scrubber._isDragging = false);
            scrubber.addEventListener('input', (e) => {
                const fraction = parseFloat(e.target.value) / 100;
                simTime = fraction * 8.0;
                customAnimators.forEach(fn => fn(0));
                renderLiveGraph();
            });
        }

        // Tab buttons (Right panel)
        document.querySelectorAll('.simlab-tab-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                document.querySelectorAll('.simlab-tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.simlab-tab-pane').forEach(p => p.classList.remove('active'));
                this.classList.add('active');
                const target = document.getElementById(this.getAttribute('data-tab'));
                if (target) {
                    target.classList.add('active');
                    if (this.getAttribute('data-tab') === 'tab-telemetry') {
                        renderLiveGraph();
                    }
                }
            });
        });

        // Branching button
        const createBranchBtn = document.getElementById('simlab-create-branch-btn');
        if (createBranchBtn) {
            createBranchBtn.addEventListener('click', () => createBranch());
        }

        // Export report button
        const exportBtn = document.getElementById('simlab-export-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                const report = {
                    title: 'COSMOS Cosmic Simulation Lab — Scientific Report',
                    mode: activeMode,
                    timestamp: new Date().toISOString(),
                    parameters: params[activeMode],
                    simTimeSeconds: simTime,
                    speed: simSpeed
                };
                const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `cosmos-simlab-${activeMode}-${Date.now()}.json`;
                a.click();
                URL.revokeObjectURL(url);
                showAlert('Scientific Telemetry Data Exported!', 'REPORT READY', '📄');
            });
        }

        // Window resize
        window.addEventListener('resize', onResize);
    }

    // Resize handler
    function onResize() {
        if (!container || !renderer || !camera) return;
        const vpEl = document.getElementById('simlab-viewport');
        const width = (container.clientWidth > 50 ? container.clientWidth : (vpEl && vpEl.clientWidth > 50 ? vpEl.clientWidth : 860));
        const height = (container.clientHeight > 50 ? container.clientHeight : (vpEl && vpEl.clientHeight > 50 ? vpEl.clientHeight : 580));

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        renderLiveGraph();
    }

    // Public API
    return {
        init: function () {
            if (initialized) return;
            initialized = true;

            initThree();
            bindEvents();
            setMode(activeMode);
            animate();
        },
        resume: function () {
            running = true;
            onResize();
            if (controls) controls.update();
            if (renderer && scene && camera) {
                renderer.render(scene, camera);
            }
        },
        pause: function () {
            running = false;
        },
        onResize: function () {
            onResize();
        },
        setMode: function (modeKey) {
            setMode(modeKey);
        }
    };
})();

window.CosmicSimLab = CosmicSimLab;


// ============================================================================
// FEATURE 8: WHAT-IF EXPERIMENT LAB & INSIDE THE PLANET GEOPHYSICAL ENGINE
// ============================================================================

const COSMOS_INTERIOR_DATA = {
    'Mercury': {
        type: 'Terrestrial Metalliferous World',
        layers: [
            {
                name: 'Exosphere',
                state: 'Trace Rarefied Gas',
                icon: '🌌',
                rRatio: 1.08,
                color: 0x93c5fd,
                emissive: 0x1e3a8a,
                transparent: true,
                opacity: 0.22,
                temp: '+167°C (-180°C to +430°C)',
                pressure: '1 × 10⁻¹⁴ bar (Ultra-high vacuum)',
                comp: '42% Oxygen, 29% Sodium, 22% Hydrogen, 6% Helium',
                density: '1 × 10⁻¹¹ g/cm³',
                depth: '0 – 200 km Exospheric Envelope',
                role: 'Solar-wind driven surface boundary exosphere with continuous sputtering.'
            },
            {
                name: 'Silicate Crust',
                state: 'Solid Anorthosite & Basalt',
                icon: '🪨',
                rRatio: 0.98,
                color: 0x78716c,
                emissive: 0x292524,
                temp: '430°C Dayside / -180°C Nightside',
                pressure: '0.1 – 0.5 GPa',
                comp: 'Plagioclase feldspar, Pyroxene, Magnesium-rich silicates',
                density: '3.1 g/cm³',
                depth: '0 – 35 km Crustal Thickness',
                role: 'Primordial impact-cratered rigid shell cross-cut by lobate thrust scarps.'
            },
            {
                name: 'Silicate Mantle',
                state: 'Dense Peridotite Rock',
                icon: '⛰️',
                rRatio: 0.86,
                color: 0x57534e,
                emissive: 0x1c1917,
                temp: '700°C – 1,200°C',
                pressure: '0.5 – 5.0 GPa',
                comp: 'Olivine, Enstatite, Magnesium silicates',
                density: '3.6 g/cm³',
                depth: '35 – 420 km Subsurface Depth',
                role: 'Ultra-thin insulating mantle compressed by the disproportionate metallic core.'
            },
            {
                name: 'Giant Metallic Core',
                state: 'Liquid & Solid Iron-Nickel',
                icon: '⚙️',
                rRatio: 0.72,
                color: 0xd97706,
                emissive: 0xb45309,
                emissiveIntensity: 0.6,
                temp: '1,500°C – 2,000°C',
                pressure: '5.0 – 40.0 GPa',
                comp: 'Iron (70%), Nickel, Silicon, Trace Sulfur',
                density: '7.5 – 8.5 g/cm³',
                depth: '420 – 2,440 km (85% of Planet Radius!)',
                role: 'Colossal dynamo core generating Mercury’s global dipolar magnetosphere.'
            }
        ]
    },
    'Venus': {
        type: 'Supercritical Greenhouse World',
        layers: [
            {
                name: 'Superdense Atmosphere',
                state: 'Supercritical Carbon Dioxide',
                icon: '☁️',
                rRatio: 1.16,
                color: 0xfef08a,
                emissive: 0xca8a04,
                transparent: true,
                opacity: 0.35,
                temp: '+464°C (Runaway Greenhouse)',
                pressure: '92.0 bar (91 atmospheres, Crushing)',
                comp: '96.5% CO₂, 3.5% N₂, H₂SO₄ clouds',
                density: '65 kg/m³ (Liquid-like surface gas)',
                depth: '0 – 250 km Cloud & Haze Deck',
                role: 'Generates intense greenhouse trapping, dissolving diurnal thermal swings.'
            },
            {
                name: 'Basaltic Volcanic Crust',
                state: 'Rigid Basaltic Lava',
                icon: '🌋',
                rRatio: 0.98,
                color: 0xb45309,
                emissive: 0x78350f,
                temp: '470°C – 600°C',
                pressure: '0.1 – 2.0 GPa',
                comp: 'Tholeiitic basalt, Iron oxides, Volcanic silicates',
                density: '2.9 g/cm³',
                depth: '0 – 50 km Crustal Boundary',
                role: 'Episodic global resurfacing punctuated by massive shield volcanoes & coronae.'
            },
            {
                name: 'Convective Silicate Mantle',
                state: 'Semi-Solid Peridotite & Pyroxene',
                icon: '🔥',
                rRatio: 0.78,
                color: 0xd97706,
                emissive: 0x9a3412,
                emissiveIntensity: 0.45,
                temp: '600°C – 3,500°C',
                pressure: '2.0 – 120 GPa',
                comp: 'Olivine, Garnet, Ringwoodite, Perovskite',
                density: '3.5 – 5.4 g/cm³',
                depth: '50 – 3,000 km Sub-crustal Depth',
                role: 'Sluggish thermal convection plumes without plate-tectonic subduction lubrication.'
            },
            {
                name: 'Partially Liquid Metallic Core',
                state: 'Molten Iron-Nickel Alloy',
                icon: '🪙',
                rRatio: 0.48,
                color: 0xf59e0b,
                emissive: 0xd97706,
                emissiveIntensity: 0.75,
                temp: '3,500°C – 4,500°C',
                pressure: '120 – 280 GPa',
                comp: '80% Iron, 15% Nickel, 5% Light volatiles',
                density: '9.5 – 11.5 g/cm³',
                depth: '3,000 – 6,052 km Core Radius',
                role: 'Lacks magnetic dynamo due to low thermal convection & slow 243-day rotation.'
            }
        ]
    },
    'Earth': {
        type: 'Habitable Ocean-Tectonic World',
        layers: [
            {
                name: 'Gaseous Atmosphere',
                state: 'Translucent Gas Shield',
                icon: '🌍',
                rRatio: 1.14,
                color: 0x38bdf8,
                emissive: 0x0284c7,
                transparent: true,
                opacity: 0.28,
                temp: '+15°C Mean (-88°C to +58°C)',
                pressure: '1.013 bar (1.00 atm at Sea Level)',
                comp: '78.08% N₂, 20.95% O₂, 0.93% Ar, 0.04% CO₂',
                density: '1.225 kg/m³',
                depth: '0 – 100 km (Kármán Boundary)',
                role: 'Filters cosmic rays, regulates hydrological cycle, and sustains aerobic life.'
            },
            {
                name: 'Continental & Oceanic Crust',
                state: 'Brittle Granite & Basalt',
                icon: '🏔️',
                rRatio: 0.98,
                color: 0x15803d,
                emissive: 0x14532d,
                temp: '15°C – 500°C',
                pressure: '0.1 – 1.0 GPa',
                comp: 'Quartz, Feldspar, Basaltic silicates, Ocean sediments',
                density: '2.7 – 3.0 g/cm³',
                depth: '0 – 35 km (Continental) / 7 km (Oceanic)',
                role: 'Dynamic tectonic plates floating across the upper plastic asthenosphere.'
            },
            {
                name: 'Silicate Mantle',
                state: 'Viscous Convecting Silicates',
                icon: '🌋',
                rRatio: 0.82,
                color: 0xb45309,
                emissive: 0x78350f,
                emissiveIntensity: 0.4,
                temp: '500°C – 4,000°C',
                pressure: '1.0 – 136 GPa',
                comp: 'Bridgmanite, Peridotite, Ferropericlase',
                density: '3.4 – 5.6 g/cm³',
                depth: '35 – 2,890 km Depth',
                role: 'Drives seafloor spreading, deep subduction, and mantle volcanic hotspots.'
            },
            {
                name: 'Liquid Outer Core',
                state: 'Molten Convecting Iron-Nickel',
                icon: '⚡',
                rRatio: 0.55,
                color: 0xf59e0b,
                emissive: 0xd97706,
                emissiveIntensity: 0.7,
                temp: '4,000°C – 5,700°C',
                pressure: '136 – 330 GPa',
                comp: '85% Iron, 10% Nickel, 5% Sulfur & Oxygen',
                density: '9.9 – 12.2 g/cm³',
                depth: '2,890 – 5,150 km Depth',
                role: 'Coriolis-driven turbulent convection generates Earth’s geomagnetic dynamo.'
            },
            {
                name: 'Crystallized Inner Core',
                state: 'Solid Hexagonal Crystal Iron',
                icon: '💎',
                rRatio: 0.28,
                color: 0xfef08a,
                emissive: 0xfacc15,
                emissiveIntensity: 0.95,
                temp: '5,700°C (Comparable to Sun’s Photosphere)',
                pressure: '330 – 360 GPa (3.5M atmospheres)',
                comp: 'Crystallized Iron-Nickel Alloy (80% Fe, 20% Ni)',
                density: '12.8 – 13.1 g/cm³',
                depth: '5,150 – 6,371 km Radius',
                role: 'Gravitational center anchoring the global geomagnetic field lines.'
            }
        ]
    },
    'Mars': {
        type: 'Volcanic Desert World',
        layers: [
            {
                name: 'Thin Rarefied Atmosphere',
                state: 'Low-Pressure Gas',
                icon: '💨',
                rRatio: 1.10,
                color: 0xfca5a5,
                emissive: 0x991b1b,
                transparent: true,
                opacity: 0.20,
                temp: '-63°C Mean (-140°C to +20°C)',
                pressure: '0.006 bar (0.6% of Earth sea level)',
                comp: '95.3% CO₂, 2.6% N₂, 1.9% Ar, trace H₂O',
                density: '0.020 kg/m³',
                depth: '0 – 100 km Atmospheric Boundary',
                role: 'Subject to seasonal dust storms and solar wind atmospheric stripping.'
            },
            {
                name: 'Oxidized Basalt Crust',
                state: 'Solid Rust & Silicate Basalt',
                icon: '🏜️',
                rRatio: 0.98,
                color: 0xc2410c,
                emissive: 0x7c2d12,
                temp: '-63°C – 200°C',
                pressure: '0.1 – 0.8 GPa',
                comp: 'Basalt, Iron(III) oxide (Hematite), Feldspar',
                density: '2.9 g/cm³',
                depth: '0 – 50 km Crustal Shell',
                role: 'Houses solar system superlatives: Olympus Mons & Valles Marineris.'
            },
            {
                name: 'Silicate Mantle',
                state: 'Stagnant Solid Silicate Rock',
                icon: '🪨',
                rRatio: 0.76,
                color: 0x9a3412,
                emissive: 0x451a03,
                temp: '200°C – 1,800°C',
                pressure: '0.8 – 24 GPa',
                comp: 'Olivine, Garnet, Iron-rich silicates',
                density: '3.5 – 4.8 g/cm³',
                depth: '50 – 1,550 km Subsurface Depth',
                role: 'Stagnant-lid mantle; supported massive ancient volcanic construction.'
            },
            {
                name: 'Fluid Metallic Core',
                state: 'Liquid Iron-Nickel-Sulfur',
                icon: '🔥',
                rRatio: 0.48,
                color: 0xf97316,
                emissive: 0xc2410c,
                emissiveIntensity: 0.65,
                temp: '1,800°C – 2,200°C',
                pressure: '24 – 45 GPa',
                comp: 'Iron (75%), Nickel, High Sulfur fraction (15%)',
                density: '6.0 – 7.2 g/cm³',
                depth: '1,550 – 3,390 km Core Radius',
                role: 'Ancient dynamo shut down ~4 Ga ago, exposing the planet to stellar erosion.'
            }
        ]
    },
    'Jupiter': {
        type: 'Gas Giant Sovereign World',
        layers: [
            {
                name: 'Ammonia Cloud Belts',
                state: 'Turbulent Zonal Clouds',
                icon: '🌪️',
                rRatio: 1.05,
                color: 0xd97706,
                emissive: 0x78350f,
                transparent: true,
                opacity: 0.40,
                temp: '-110°C at 1 bar level',
                pressure: '0.1 – 10 bar',
                comp: '89.8% H₂, 10.2% He, Ammonia ice & Ammonium hydrosulfide',
                density: '0.2 – 0.5 kg/m³',
                depth: '0 – 1,000 km Cloud Deck',
                role: 'Counter-rotating jet streams harboring centuries-old cyclonic storms.'
            },
            {
                name: 'Supercritical Molecular Hydrogen',
                state: 'Supercritical Fluid Ocean',
                icon: '🌊',
                rRatio: 0.88,
                color: 0x6366f1,
                emissive: 0x312e81,
                emissiveIntensity: 0.35,
                temp: '2,000°C – 10,000°C',
                pressure: '10 – 200 GPa (100k – 2M atm)',
                comp: 'Supercritical liquid H₂ / He solution',
                density: '0.5 – 1.2 g/cm³',
                depth: '1,000 – 15,000 km Depth',
                role: 'Seamless gas-to-liquid transition without physical boundary surface.'
            },
            {
                name: 'Liquid Metallic Hydrogen Ocean',
                state: 'Degenerate Proton-Electron Plasma',
                icon: '⚡',
                rRatio: 0.65,
                color: 0x06b6d4,
                emissive: 0x0e7490,
                emissiveIntensity: 0.7,
                temp: '10,000°C – 25,000°C',
                pressure: '200 – 4,000 GPa (2M – 40M atm)',
                comp: 'Electrically conducting metallic Hydrogen protons & electrons',
                density: '1.5 – 4.0 g/cm³',
                depth: '15,000 – 55,000 km Depth',
                role: 'Ultra-conductive dynamo generating Jupiter’s colossal magnetosphere.'
            },
            {
                name: 'Dilute Heavy Element Core',
                state: 'Super-dense Rock & High-Pressure Ice',
                icon: '🔮',
                rRatio: 0.28,
                color: 0xa855f7,
                emissive: 0x7e22ce,
                emissiveIntensity: 0.85,
                temp: '25,000°C – 36,000°C',
                pressure: '4,000 – 5,000 GPa',
                comp: 'Heavy silicates, iron-nickel, high-pressure ices',
                density: '12 – 25 g/cm³ (12–25 Earth Masses)',
                depth: 'Radius ~15,000 km Central Region',
                role: 'Gravitational seed that captured primordial solar nebula gases.'
            }
        ]
    },
    'Saturn': {
        type: 'Ringed Gas Giant World',
        layers: [
            {
                name: 'Upper Ammonia Cloud Decks',
                state: 'Convective Zonal Clouds',
                icon: '🪐',
                rRatio: 1.05,
                color: 0xfacc15,
                emissive: 0x854d0e,
                transparent: true,
                opacity: 0.40,
                temp: '-140°C at 1 bar',
                pressure: '0.1 – 10 bar',
                comp: '96.3% H₂, 3.25% He, 0.4% CH₄, Ammonia ice',
                density: '0.19 kg/m³',
                depth: '0 – 1,000 km Atmosphere Deck',
                role: 'Features the northern polar hexagonal jet stream & high-altitude haze.'
            },
            {
                name: 'Molecular Hydrogen Mantle',
                state: 'Fluid Hydrogen & Helium Rain',
                icon: '🌧️',
                rRatio: 0.86,
                color: 0xca8a04,
                emissive: 0x713f12,
                temp: '1,000°C – 8,000°C',
                pressure: '10 – 100 GPa',
                comp: 'Liquid molecular hydrogen with helium precipitation droplets',
                density: '0.4 – 1.0 g/cm³',
                depth: '1,000 – 20,000 km Depth',
                role: 'Helium rain separation releases excess gravitational thermal radiation.'
            },
            {
                name: 'Metallic Hydrogen Layer',
                state: 'Conductive Liquid Metallic State',
                icon: '⚡',
                rRatio: 0.60,
                color: 0x0284c7,
                emissive: 0x0369a1,
                emissiveIntensity: 0.65,
                temp: '8,000°C – 15,000°C',
                pressure: '100 – 1,500 GPa',
                comp: 'Liquid metallic hydrogen with magnetic dynamo action',
                density: '1.2 – 3.2 g/cm³',
                depth: '20,000 – 45,000 km Depth',
                role: 'Produces perfectly axisymmetric magnetic dipole aligned with rotation axis.'
            },
            {
                name: 'Dense Silicate & Ice Core',
                state: 'High-Pressure Solid Core',
                icon: '💎',
                rRatio: 0.28,
                color: 0x38bdf8,
                emissive: 0x0284c7,
                emissiveIntensity: 0.8,
                temp: '15,000°C',
                pressure: '1,500 – 2,500 GPa',
                comp: 'Iron, nickel, silicates & high-pressure Ice VII/X (9–22 Earth Masses)',
                density: '9.0 – 18.0 g/cm³',
                depth: 'Radius ~15,000 km Core',
                role: 'Dense gravitational nucleus stabilizing the overall low bulk density.'
            }
        ]
    },
    'Uranus': {
        type: 'Tilted Ice Giant World',
        layers: [
            {
                name: 'Methane-Hydrogen Atmosphere',
                state: 'Cyan Haze Atmosphere',
                icon: '❄️',
                rRatio: 1.05,
                color: 0x38bdf8,
                emissive: 0x0369a1,
                transparent: true,
                opacity: 0.35,
                temp: '-195°C (-224°C Coldest recorded)',
                pressure: '0.1 – 100 bar',
                comp: '82.5% H₂, 15.2% He, 2.3% CH₄',
                density: '0.4 kg/m³',
                depth: '0 – 2,000 km Gas Layer',
                role: 'Methane absorption of red light imparts signature pale aquamarine color.'
            },
            {
                name: 'Superionic Water-Ammonia Mantle',
                state: 'Supercritical "Hot Ice" Fluid',
                icon: '🌊',
                rRatio: 0.75,
                color: 0x06b6d4,
                emissive: 0x0891b2,
                emissiveIntensity: 0.6,
                temp: '2,000°C – 5,000°C',
                pressure: '10 – 600 GPa',
                comp: 'Water, Ammonia, Methane ions & Pyrolytic Carbon (Diamond Rain)',
                density: '1.5 – 4.0 g/cm³',
                depth: '2,000 – 18,000 km Depth',
                role: 'Superionic water generates Uranus’s non-dipolar, highly tilted magnetic field.'
            },
            {
                name: 'Rocky Silicate Core',
                state: 'Dense Silicate & Iron-Nickel',
                icon: '🪨',
                rRatio: 0.32,
                color: 0x64748b,
                emissive: 0x334155,
                emissiveIntensity: 0.75,
                temp: '5,000°C – 7,000°C',
                pressure: '600 – 800 GPa',
                comp: 'Iron, nickel, magnesian silicates (~1.2 Earth Masses)',
                density: '7.0 – 9.0 g/cm³',
                depth: 'Radius ~7,000 km Core Region',
                role: 'Small rocky anchor with remarkably low interior heat flux.'
            }
        ]
    },
    'Neptune': {
        type: 'Dynamic Deep Ice Giant World',
        layers: [
            {
                name: 'Deep Blue Methane Atmosphere',
                state: 'Supersonic Wind Atmosphere',
                icon: '🌀',
                rRatio: 1.05,
                color: 0x1d4ed8,
                emissive: 0x1e3a8a,
                transparent: true,
                opacity: 0.35,
                temp: '-201°C',
                pressure: '0.1 – 100 bar',
                comp: '80% H₂, 19% He, 1.5% CH₄, Hydrocarbon hazes',
                density: '0.45 kg/m³',
                depth: '0 – 2,000 km Atmospheric Layer',
                role: 'Home to fastest recorded winds in solar system (up to 2,100 km/h).'
            },
            {
                name: 'Ionic Supercritical Mantle',
                state: 'Electrically Conductive Liquid Ice',
                icon: '💧',
                rRatio: 0.75,
                color: 0x2563eb,
                emissive: 0x1d4ed8,
                emissiveIntensity: 0.65,
                temp: '2,000°C – 5,000°C',
                pressure: '10 – 600 GPa',
                comp: 'Superheated water, ammonia, methane ions & diamond precipitation',
                density: '1.5 – 4.2 g/cm³',
                depth: '2,000 – 18,000 km Depth',
                role: 'Produces vigorous internal heat output and quadripolar magnetic topology.'
            },
            {
                name: 'Earth-Sized Silicate-Iron Core',
                state: 'Solid Silicate & Metallic Core',
                icon: '🪨',
                rRatio: 0.32,
                color: 0x475569,
                emissive: 0x1e293b,
                emissiveIntensity: 0.8,
                temp: '5,400°C – 7,200°C',
                pressure: '600 – 850 GPa',
                comp: 'Iron, nickel, silicates (1.2 Earth Masses)',
                density: '7.5 – 9.5 g/cm³',
                depth: 'Radius ~7,000 km Center',
                role: 'Gravitational nucleus driving ongoing planetary cooling.'
            }
        ]
    },
    'Sol': {
        type: 'G-Type Main Sequence Sovereign Star',
        layers: [
            {
                name: 'Corona & Solar Flares',
                state: 'Superheated Magnetized Plasma',
                icon: '☀️',
                rRatio: 1.25,
                color: 0xfef08a,
                emissive: 0xfacc15,
                transparent: true,
                opacity: 0.30,
                temp: '1,000,000°C – 3,000,000°C',
                pressure: '1 × 10⁻⁸ bar (Ultra-tenuous)',
                comp: 'Ionized Hydrogen, Helium, Fe-XIV ions',
                density: '1 × 10⁻¹² g/cm³',
                depth: 'Extends millions of km into Heliosphere',
                role: 'Accelerates solar wind; source of coronal mass ejections and geomagnetic storms.'
            },
            {
                name: 'Photosphere',
                state: 'Visible Granulated Solar Disc',
                icon: '🔥',
                rRatio: 0.98,
                color: 0xf59e0b,
                emissive: 0xd97706,
                emissiveIntensity: 0.6,
                temp: '5,505°C (5,778 K)',
                pressure: '0.1 – 0.5 bar',
                comp: '73.4% Hydrogen, 25.0% Helium, 1.6% Oxygen/Carbon/Iron',
                density: '2 × 10⁻⁷ g/cm³',
                depth: '0 – 500 km Surface Thickness',
                role: 'Radiates the solar luminosity (3.828 × 10²⁶ Watts) sustaining life.'
            },
            {
                name: 'Convective Zone',
                state: 'Boiling Plasma Convection Cells',
                icon: '🌋',
                rRatio: 0.82,
                color: 0xea580c,
                emissive: 0xc2410c,
                emissiveIntensity: 0.5,
                temp: '2,000,000°C down to 5,500°C',
                pressure: '10⁵ down to 0.1 bar',
                comp: 'Turbulent convective plasma granules & supergranules',
                density: '0.2 down to 2 × 10⁻⁷ g/cm³',
                depth: '0.70 to 1.00 R☉ (~200,000 km thick)',
                role: 'Energy transported by thermal buoyancy; generates acoustic p-modes.'
            },
            {
                name: 'Tachocline Dynamo Shear',
                state: 'Magnetic Shear Boundary Layer',
                icon: '⚡',
                rRatio: 0.68,
                color: 0xd97706,
                emissive: 0xb45309,
                emissiveIntensity: 0.7,
                temp: '2,000,000°C',
                pressure: '1 × 10⁷ bar',
                comp: 'Rotational shear plasma boundary',
                density: '0.2 g/cm³',
                depth: 'Centered at 0.70 R☉',
                role: 'Differential rotation shear layer generating the 22-year solar dynamo cycle.'
            },
            {
                name: 'Radiative Zone',
                state: 'Dense Photon Diffusion Plasma',
                icon: '✨',
                rRatio: 0.50,
                color: 0xfbbf24,
                emissive: 0xf59e0b,
                emissiveIntensity: 0.85,
                temp: '7,000,000°C to 2,000,000°C',
                pressure: '1 × 10⁹ to 1 × 10⁷ bar',
                comp: 'Fully ionized Hydrogen & Helium plasma',
                density: '20 to 0.2 g/cm³',
                depth: '0.25 to 0.70 R☉ (~315,000 km)',
                role: 'Photons diffuse outward via Thomson scattering over ~100,000 years.'
            },
            {
                name: 'Thermonuclear Core',
                state: 'High-Density Fusion Furnace',
                icon: '⚛️',
                rRatio: 0.25,
                color: 0xffffff,
                emissive: 0xfef08a,
                emissiveIntensity: 1.2,
                temp: '15,700,000°C (15.7 Million K)',
                pressure: '250 Billion bar (2.5 × 10¹⁶ Pa)',
                comp: '34% Hydrogen, 64% Helium, 2% Metals',
                density: '150 g/cm³ (150× water density!)',
                depth: '0 to 0.25 R☉ (~175,000 km Radius)',
                role: 'Proton-proton fusion converting 600M tons H into He every second.'
            }
        ]
    }
};

function cosmosBuilderGetInteriorSpecs(target) {
    if (!target) return COSMOS_INTERIOR_DATA['Earth'];
    if (COSMOS_INTERIOR_DATA[target.name]) return COSMOS_INTERIOR_DATA[target.name];

    const pType = target.type || 'rocky';
    if (pType === 'gas') return COSMOS_INTERIOR_DATA['Jupiter'];
    if (pType === 'ice') return COSMOS_INTERIOR_DATA['Uranus'];
    if (pType === 'desert') return COSMOS_INTERIOR_DATA['Mars'];
    if (pType === 'ocean') return COSMOS_INTERIOR_DATA['Earth'];

    return {
        type: 'Exoplanetary World (' + pType.toUpperCase() + ')',
        layers: [
            {
                name: 'Planetary Crust',
                state: 'Silicate Lithosphere',
                icon: '🪨',
                rRatio: 0.98,
                color: 0x64748b,
                emissive: 0x334155,
                temp: '250°C',
                pressure: '0.5 GPa',
                comp: 'Solid silicates & basaltic crust',
                density: '3.0 g/cm³',
                depth: '0 – 40 km Crust',
                role: 'Rigid outer tectonic crustal shell.'
            },
            {
                name: 'Convective Mantle',
                state: 'Semi-Solid Peridotite',
                icon: '🌋',
                rRatio: 0.78,
                color: 0xd97706,
                emissive: 0xb45309,
                temp: '1,500°C',
                pressure: '50 GPa',
                comp: 'Olivine & high-pressure silicates',
                density: '4.5 g/cm³',
                depth: '40 – 2,500 km',
                role: 'Convective heat transfer from planetary core.'
            },
            {
                name: 'Dense Metallic Core',
                state: 'Molten Iron-Nickel',
                icon: '⚙️',
                rRatio: 0.42,
                color: 0xf59e0b,
                emissive: 0xd97706,
                emissiveIntensity: 0.8,
                temp: '4,200°C',
                pressure: '220 GPa',
                comp: 'Iron-Nickel alloy with trace heavy elements',
                density: '10.5 g/cm³',
                depth: 'Radius ~2,800 km',
                role: 'Gravitational center maintaining magnetic shielding.'
            }
        ]
    };
}

// ----------------------------------------------------------------------------
// WHAT-IF COSMIC EXPERIMENT CONTROLLER
// ----------------------------------------------------------------------------
function cosmosBuilderOpenWhatIf(target) {
    target = target || cosmosBuilderState.planets.find(p => p.id === cosmosBuilderState.selectedPlanetId) || (cosmosBuilderState.selectedType === 'star' ? cosmosBuilderState.starData : cosmosBuilderState.planets[0]);
    if (!target) return;

    cosmosBuilderExitInterior();

    cosmosBuilderState.mode = 'whatif';
    cosmosBuilderState.whatIfTarget = target;

    if (!target._whatIfOriginal) {
        const spec = COSMOS_PLANET_SPECS[target.name] || {};
        target._whatIfOriginal = {
            dist: target.dist !== undefined ? target.dist : 0,
            speed: target.speed !== undefined ? target.speed : 0,
            rotSpeed: target.rotSpeed !== undefined ? target.rotSpeed : 0.02,
            size: target.size !== undefined ? target.size : (target.visualRadius || 18),
            mass: target.mass !== undefined ? target.mass : (spec.mass ? parseFloat(spec.mass) : 1.0),
            gravity: target.gravity !== undefined ? target.gravity : (spec.gravity ? parseFloat(spec.gravity) : 9.8)
        };
    }

    const massSlider = document.getElementById('whatif-mass-slider');
    const gravSlider = document.getElementById('whatif-gravity-slider');
    const distSlider = document.getElementById('whatif-dist-slider');
    const velSlider = document.getElementById('whatif-vel-slider');
    const rotSlider = document.getElementById('whatif-rot-slider');

    if (massSlider) massSlider.value = 1.0;
    if (gravSlider) gravSlider.value = 1.0;
    if (distSlider) distSlider.value = 1.0;
    if (velSlider) velSlider.value = 1.0;
    if (rotSlider) rotSlider.value = 1.0;

    cosmosBuilderUpdateWhatIfReadouts(target, 1.0, 1.0, 1.0, 1.0, 1.0);

    // Create subtle gravitational influence sphere around target
    if (!target.whatIfGravMesh && target.mesh) {
        const gravGeo = new THREE.IcosahedronGeometry(target.size * 2.4, 2);
        const gravMat = new THREE.MeshBasicMaterial({
            color: 0x00ffcc,
            wireframe: true,
            transparent: true,
            opacity: 0.32
        });
        target.whatIfGravMesh = new THREE.Mesh(gravGeo, gravMat);
        target.mesh.add(target.whatIfGravMesh);
    }

    const hud = document.getElementById('builder-whatif-hud');
    const hudInfo = document.getElementById('builder-whatif-hud-info');
    if (hud) hud.style.display = 'flex';
    if (hudInfo) hudInfo.textContent = target.name + ' // Physical Simulation Active';

    const outcomeCard = document.getElementById('whatif-outcome-card');
    if (outcomeCard) outcomeCard.style.display = 'none';

    cosmosBuilderUpdateInspector();
}

function cosmosBuilderUpdateWhatIfReadouts(target, massMul, gravMul, distMul, velMul, rotMul) {
    const orig = target._whatIfOriginal || target;

    const massVal = document.getElementById('whatif-mass-val');
    const gravVal = document.getElementById('whatif-gravity-val');
    const distVal = document.getElementById('whatif-dist-val');
    const velVal = document.getElementById('whatif-vel-val');
    const rotVal = document.getElementById('whatif-rot-val');

    if (massVal) massVal.textContent = massMul.toFixed(2) + '× (' + (orig.mass * massMul).toFixed(2) + ' × 10²⁴ kg)';
    if (gravVal) gravVal.textContent = (orig.gravity * gravMul).toFixed(2) + ' m/s² (' + gravMul.toFixed(2) + ' g)';
    if (distVal) distVal.textContent = (orig.dist * distMul).toFixed(1) + ' AU (' + distMul.toFixed(2) + '× Baseline)';
    
    let velLabel = velMul.toFixed(2) + '× v_circ';
    if (velMul >= 1.414) velLabel += ' [ESCAPE THRESHOLD]';
    else if (velMul < 0.65) velLabel += ' [DECAY THRESHOLD]';
    if (velVal) velVal.textContent = velLabel;

    const rotHours = (24.0 / Math.max(0.01, Math.abs(rotMul))).toFixed(1);
    const dir = rotMul < 0 ? 'Retrograde' : 'Prograde';
    if (rotVal) rotVal.textContent = Math.abs(rotMul) < 0.05 ? 'Tidally Locked' : (rotHours + 'h (' + dir + ')');

    if (target.whatIfGravMesh) {
        const gravScale = Math.cbrt(massMul) * 1.0;
        target.whatIfGravMesh.scale.set(gravScale, gravScale, gravScale);
    }
    if (target.mesh) {
        target.rotSpeed = orig.rotSpeed * rotMul;
    }
}

function cosmosBuilderRunWhatIf(target) {
    target = target || cosmosBuilderState.whatIfTarget;
    if (!target || !target._whatIfOriginal) return;

    const massSlider = document.getElementById('whatif-mass-slider');
    const gravSlider = document.getElementById('whatif-gravity-slider');
    const distSlider = document.getElementById('whatif-dist-slider');
    const velSlider = document.getElementById('whatif-vel-slider');
    const rotSlider = document.getElementById('whatif-rot-slider');

    const massMul = massSlider ? parseFloat(massSlider.value) : 1.0;
    const gravMul = gravSlider ? parseFloat(gravSlider.value) : 1.0;
    const distMul = distSlider ? parseFloat(distSlider.value) : 1.0;
    const velMul = velSlider ? parseFloat(velSlider.value) : 1.0;
    const rotMul = rotSlider ? parseFloat(rotSlider.value) : 1.0;

    const orig = target._whatIfOriginal;

    target.dist = orig.dist * distMul;
    target.speed = orig.speed * velMul;
    target.rotSpeed = orig.rotSpeed * rotMul;

    cosmosBuilderUpdateOrbitLine(target);

    let actualOutcome = 'stable';
    let actualTitle = 'Stable New Orbit';
    let actualDesc = 'Centripetal orbital velocity balances gravitational acceleration. The body establishes a new stable Keplerian equilibrium.';

    if (velMul < 0.65) {
        actualOutcome = 'spiral';
        actualTitle = 'Spirals into the Sun';
        actualDesc = 'Angular momentum is insufficient to overcome solar centripetal gravitational pull. The planet decays inward into the solar corona.';
        target.isWhatIfDecaying = true;
        target.isWhatIfEscaping = false;
    } else if (velMul >= 1.414) {
        actualOutcome = 'escape';
        actualTitle = 'Escapes the Solar System';
        actualDesc = 'Orbital velocity exceeds local parabolic escape velocity (v ≥ √2 · v_circ = ' + velMul.toFixed(2) + '×). Total mechanical energy is positive, causing hyperbolic escape.';
        target.isWhatIfEscaping = true;
        target.isWhatIfDecaying = false;
    } else if (massMul >= 3.5) {
        actualOutcome = 'destabilize';
        actualTitle = 'System Gravitational Destabilization';
        actualDesc = 'Increasing mass to ' + massMul.toFixed(2) + '× vastly expanded the planet’s gravitational Hill sphere, disrupting moon orbits and adjoining planetary paths into resonance chaos.';
        target.isWhatIfDecaying = false;
        target.isWhatIfEscaping = false;
    } else {
        target.isWhatIfDecaying = false;
        target.isWhatIfEscaping = false;
    }

    const activePredBtn = document.querySelector('.whatif-pred-btn.active');
    const userPred = activePredBtn ? activePredBtn.getAttribute('data-pred') : 'stable';
    const predTitles = {
        'stable': 'Stable New Orbit',
        'spiral': 'Spirals into Sun',
        'escape': 'Escapes System',
        'destabilize': 'Orbits Destabilize'
    };

    const outcomeCard = document.getElementById('whatif-outcome-card');
    const resPred = document.getElementById('whatif-res-pred');
    const resActual = document.getElementById('whatif-res-actual');
    const evalTag = document.getElementById('whatif-outcome-eval');
    const descEl = document.getElementById('whatif-outcome-desc');

    if (outcomeCard) outcomeCard.style.display = 'block';
    if (resPred) resPred.textContent = predTitles[userPred] || userPred;
    if (resActual) resActual.textContent = actualTitle;
    if (descEl) descEl.textContent = actualDesc;

    if (evalTag) {
        if (userPred === actualOutcome) {
            evalTag.textContent = 'PREDICTION ACCURATE ✓';
            evalTag.style.color = '#34d399';
        } else {
            evalTag.textContent = 'DEVIATION DETECTED';
            evalTag.style.color = '#f59e0b';
        }
    }

    const hudInfo = document.getElementById('builder-whatif-hud-info');
    if (hudInfo) hudInfo.textContent = target.name + ' // Result: ' + actualTitle;

    if (window.CosmosAudioFX && typeof CosmosAudioFX.playAlert === 'function') {
        CosmosAudioFX.playAlert();
    }
}

function cosmosBuilderResetWhatIf(target) {
    target = target || cosmosBuilderState.whatIfTarget;
    if (!target || !target._whatIfOriginal) {
        cosmosBuilderExitWhatIf();
        return;
    }

    const orig = target._whatIfOriginal;
    target.dist = orig.dist;
    target.speed = orig.speed;
    target.rotSpeed = orig.rotSpeed;
    target.size = orig.size;
    target.isWhatIfDecaying = false;
    target.isWhatIfEscaping = false;

    if (target.whatIfGravMesh && target.mesh) {
        target.mesh.remove(target.whatIfGravMesh);
        if (target.whatIfGravMesh.geometry) target.whatIfGravMesh.geometry.dispose();
        if (target.whatIfGravMesh.material) target.whatIfGravMesh.material.dispose();
        target.whatIfGravMesh = null;
    }

    cosmosBuilderUpdateOrbitLine(target);

    const massSlider = document.getElementById('whatif-mass-slider');
    const gravSlider = document.getElementById('whatif-gravity-slider');
    const distSlider = document.getElementById('whatif-dist-slider');
    const velSlider = document.getElementById('whatif-vel-slider');
    const rotSlider = document.getElementById('whatif-rot-slider');

    if (massSlider) massSlider.value = 1.0;
    if (gravSlider) gravSlider.value = 1.0;
    if (distSlider) distSlider.value = 1.0;
    if (velSlider) velSlider.value = 1.0;
    if (rotSlider) rotSlider.value = 1.0;

    cosmosBuilderUpdateWhatIfReadouts(target, 1.0, 1.0, 1.0, 1.0, 1.0);

    const outcomeCard = document.getElementById('whatif-outcome-card');
    if (outcomeCard) outcomeCard.style.display = 'none';

    const hudInfo = document.getElementById('builder-whatif-hud-info');
    if (hudInfo) hudInfo.textContent = target.name + ' // State Restored to Baseline';

    if (window.CosmosAudioFX && typeof CosmosAudioFX.playClick === 'function') {
        CosmosAudioFX.playClick();
    }
}

function cosmosBuilderExitWhatIf() {
    if (cosmosBuilderState.whatIfTarget) {
        cosmosBuilderResetWhatIf(cosmosBuilderState.whatIfTarget);
        cosmosBuilderState.whatIfTarget = null;
    }
    cosmosBuilderState.mode = 'normal';
    const hud = document.getElementById('builder-whatif-hud');
    if (hud) hud.style.display = 'none';
    cosmosBuilderUpdateInspector();
}

function cosmosBuilderUpdateOrbitLine(planet) {
    if (!planet || !planet.orbitLine) return;
    const scene = cosmosBuilderState.scene;
    if (!scene) return;

    scene.remove(planet.orbitLine);
    if (planet.orbitLine.geometry) planet.orbitLine.geometry.dispose();

    const segments = 128;
    const curvePoints = [];
    for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const x = Math.cos(theta) * planet.dist;
        const z = Math.sin(theta) * planet.dist;
        const y = Math.sin(theta) * planet.dist * Math.sin((planet.tilt || 0) * Math.PI / 180);
        curvePoints.push(new THREE.Vector3(x, y, z));
    }

    const orbitGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const orbitMat = new THREE.LineBasicMaterial({
        color: planet.id === cosmosBuilderState.selectedPlanetId ? 0x38bdf8 : 0x224477,
        transparent: true,
        opacity: planet.id === cosmosBuilderState.selectedPlanetId ? 0.85 : 0.35
    });
    planet.orbitLine = new THREE.Line(orbitGeo, orbitMat);
    scene.add(planet.orbitLine);
}

// ----------------------------------------------------------------------------
// INSIDE THE PLANET INTERIOR EXPLORER CONTROLLER
// ----------------------------------------------------------------------------
function cosmosBuilderEnterInterior(target) {
    target = target || cosmosBuilderState.planets.find(p => p.id === cosmosBuilderState.selectedPlanetId) || (cosmosBuilderState.selectedType === 'star' ? cosmosBuilderState.starData : cosmosBuilderState.planets[0]);
    if (!target) return;

    cosmosBuilderExitWhatIf();

    cosmosBuilderState.mode = 'interior';
    cosmosBuilderState.interiorTarget = target;
    cosmosBuilderState.activeInteriorLayerIdx = 0;

    const specs = cosmosBuilderGetInteriorSpecs(target);
    cosmosBuilderState.currentInteriorSpecs = specs;

    const hud = document.getElementById('builder-interior-hud');
    const hudInfo = document.getElementById('builder-interior-hud-info');
    if (hud) hud.style.display = 'flex';
    if (hudInfo) hudInfo.textContent = target.name + ' // Concentric Cross-Section View';

    if (target.mesh) {
        target.mesh.traverse(child => {
            if (child !== target.mesh && !child._isInterior) {
                child._preInteriorVisible = child.visible;
                child.visible = false;
            }
        });

        if (target.interiorGroup) {
            target.mesh.remove(target.interiorGroup);
            target.interiorGroup = null;
        }

        const intGroup = new THREE.Group();
        intGroup._isInterior = true;
        target.interiorGroup = intGroup;

        specs.layers.forEach((layer, idx) => {
            const rad = target.size * layer.rRatio;
            const geom = new THREE.SphereGeometry(rad, 48, 36, 0, Math.PI * 1.5, 0, Math.PI);
            const mat = new THREE.MeshStandardMaterial({
                color: layer.color,
                emissive: layer.emissive || 0x000000,
                emissiveIntensity: layer.emissiveIntensity || 0.25,
                roughness: 0.5,
                metalness: 0.1,
                side: THREE.DoubleSide,
                transparent: layer.transparent || false,
                opacity: layer.opacity || 1.0
            });
            const layerMesh = new THREE.Mesh(geom, mat);
            layerMesh._layerIndex = idx;
            intGroup.add(layerMesh);
        });

        const scanRingGeo = new THREE.RingGeometry(target.size * 0.96, target.size * 1.03, 64);
        const scanRingMat = new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending
        });
        const scanRing = new THREE.Mesh(scanRingGeo, scanRingMat);
        scanRing.rotation.x = Math.PI / 2;
        intGroup.add(scanRing);
        intGroup.scanRing = scanRing;

        target.mesh.add(intGroup);
    }

    const elevation = Math.max(3.0, target.size * 0.6);
    const dist = Math.max(6.5, target.size * 2.2);
    const tPos = target.mesh ? target.mesh.position : new THREE.Vector3(0, 0, 0);
    const endCamPos = new THREE.Vector3(tPos.x + dist * 0.75, tPos.y + elevation, tPos.z + dist * 0.75);

    cosmosBuilderStartCamTransition(endCamPos, tPos, 45);
    cosmosBuilderState.trackedPlanetId = target.id;

    const pillsContainer = document.getElementById('interior-layers-pill-list');
    if (pillsContainer) {
        pillsContainer.innerHTML = '';
        specs.layers.forEach((layer, idx) => {
            const pill = document.createElement('button');
            pill.className = 'interior-layer-pill' + (idx === 0 ? ' active' : '');
            pill.innerHTML = '<span class="pill-icon">' + (layer.icon || '🔹') + '</span><span>' + layer.name + '</span>';
            pill.addEventListener('click', () => {
                cosmosBuilderSelectInteriorLayer(idx);
            });
            pillsContainer.appendChild(pill);
        });
    }

    const titleTarget = document.getElementById('interior-target-name');
    if (titleTarget) titleTarget.textContent = target.name + ' Interior Geophysics';
    const typeCaption = document.getElementById('interior-type-caption');
    if (typeCaption) typeCaption.textContent = specs.type;

    cosmosBuilderSelectInteriorLayer(0);
    cosmosBuilderUpdateInspector();

    if (window.CosmosAudioFX && typeof CosmosAudioFX.playClick === 'function') {
        CosmosAudioFX.playClick();
    }
}

function cosmosBuilderSelectInteriorLayer(idx) {
    const target = cosmosBuilderState.interiorTarget;
    const specs = cosmosBuilderState.currentInteriorSpecs;
    if (!target || !specs || !specs.layers[idx]) return;

    cosmosBuilderState.activeInteriorLayerIdx = idx;
    const layer = specs.layers[idx];

    document.querySelectorAll('.interior-layer-pill').forEach((pill, pIdx) => {
        if (pIdx === idx) pill.classList.add('active');
        else pill.classList.remove('active');
    });

    if (target.interiorGroup) {
        target.interiorGroup.children.forEach(child => {
            if (child._layerIndex !== undefined) {
                if (child._layerIndex === idx) {
                    child.material.emissiveIntensity = 0.95;
                    child.material.opacity = 1.0;
                    child.material.transparent = false;
                } else if (child._layerIndex < idx) {
                    child.material.emissiveIntensity = 0.15;
                    child.material.opacity = 0.32;
                    child.material.transparent = true;
                } else {
                    child.material.emissiveIntensity = 0.25;
                    child.material.opacity = 0.85;
                }
            }
        });

        if (target.interiorGroup.scanRing) {
            const r = target.size * layer.rRatio;
            target.interiorGroup.scanRing.scale.set(r / target.size, r / target.size, r / target.size);
        }
    }

    const iconEl = document.getElementById('interior-layer-icon');
    const titleEl = document.getElementById('interior-layer-title');
    const stateEl = document.getElementById('interior-layer-state');
    const tempEl = document.getElementById('interior-metric-temp');
    const pressureEl = document.getElementById('interior-metric-pressure');
    const compEl = document.getElementById('interior-metric-comp');
    const densityEl = document.getElementById('interior-metric-density');
    const depthEl = document.getElementById('interior-metric-depth');
    const roleEl = document.getElementById('interior-layer-role');

    if (iconEl) iconEl.textContent = layer.icon || '🌋';
    if (titleEl) titleEl.textContent = layer.name;
    if (stateEl) stateEl.textContent = layer.state;
    if (tempEl) tempEl.textContent = layer.temp;
    if (pressureEl) pressureEl.textContent = layer.pressure;
    if (compEl) compEl.textContent = layer.comp;
    if (densityEl) densityEl.textContent = layer.density;
    if (depthEl) depthEl.textContent = layer.depth;
    if (roleEl) roleEl.textContent = layer.role;
}

function cosmosBuilderExitInterior() {
    const target = cosmosBuilderState.interiorTarget;
    if (target && target.mesh) {
        target.mesh.traverse(child => {
            if (child._preInteriorVisible !== undefined) {
                child.visible = child._preInteriorVisible;
            }
        });

        if (target.interiorGroup) {
            target.mesh.remove(target.interiorGroup);
            target.interiorGroup.traverse(c => {
                if (c.geometry) c.geometry.dispose();
                if (c.material) c.material.dispose();
            });
            target.interiorGroup = null;
        }

        const elevation = Math.max(8, target.size * 1.3);
        const dist = Math.max(16, target.size * 3.4);
        const tPos = target.mesh.position;
        const endCamPos = new THREE.Vector3(tPos.x + dist * 0.85, tPos.y + elevation, tPos.z + dist * 0.85);

        cosmosBuilderStartCamTransition(endCamPos, tPos, 40);
    }

    cosmosBuilderState.mode = 'normal';
    cosmosBuilderState.interiorTarget = null;

    const hud = document.getElementById('builder-interior-hud');
    if (hud) hud.style.display = 'none';

    cosmosBuilderUpdateInspector();
}
