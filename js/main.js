/**
 * Main Application Logic for Indresh Hemani's Portfolio
 * - Dynamic Data Binding from data.js
 * - Akasa Air Model Context Protocol (MCP) Live Interactive Playground
 * - Interactive Project Deep-Dive Modal Inspector
 * - Command Palette (Ctrl+K / Cmd+K)
 * - 3D Card Tilt Physics & Dynamic Glare Effects
 * - Typewriter Hero Animation
 * - Project Category Filtering
 * - Theme Switcher with localStorage Memory
 */

// Global State for MCP Simulator
let currentMcpViewMode = 'chatgpt'; // 'chatgpt' | 'jsonrpc'
let currentMcpQueryKey = 'flight_status';
let currentMcpData = null;

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    if (typeof portfolioData === 'undefined') {
        console.error('portfolioData is not loaded.');
        return;
    }

    const { personal, stats, skillCategories, experience, research, education, projects } = portfolioData;

    // --- 1. Populate Personal Info in Hero & Navbar ---
    const heroNameEl = document.getElementById('hero-name');
    const heroBioEl = document.getElementById('hero-bio');
    const heroStatusEl = document.getElementById('hero-status');
    const heroGithubEl = document.getElementById('hero-github');
    const heroLinkedinEl = document.getElementById('hero-linkedin');
    const heroEmailEl = document.getElementById('hero-email');
    const heroPhoneEl = document.getElementById('hero-phone');

    if (heroNameEl) heroNameEl.textContent = personal.name;
    if (heroBioEl) heroBioEl.textContent = personal.summary;
    if (heroStatusEl) heroStatusEl.textContent = personal.statusBadge;
    if (heroGithubEl) heroGithubEl.href = personal.github;
    if (heroLinkedinEl) heroLinkedinEl.href = personal.linkedin;
    if (heroEmailEl) heroEmailEl.href = `mailto:${personal.email}`;
    if (heroPhoneEl) heroPhoneEl.href = `tel:${personal.phone}`;

    // --- 2. Dynamic Typewriter Effect for Hero Titles ---
    const typewriterEl = document.getElementById('typewriter-text');
    if (typewriterEl && personal.roleTitles && personal.roleTitles.length > 0) {
        let titleIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let typingSpeed = 80;

        function typeLoop() {
            const currentTitle = personal.roleTitles[titleIdx];

            if (isDeleting) {
                typewriterEl.textContent = currentTitle.substring(0, charIdx - 1);
                charIdx--;
                typingSpeed = 35;
            } else {
                typewriterEl.textContent = currentTitle.substring(0, charIdx + 1);
                charIdx++;
                typingSpeed = 70;
            }

            if (!isDeleting && charIdx === currentTitle.length) {
                typingSpeed = 2200; // Pause at full string
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                titleIdx = (titleIdx + 1) % personal.roleTitles.length;
                typingSpeed = 400;
            }

            setTimeout(typeLoop, typingSpeed);
        }
        typeLoop();
    }

    // --- 3. Render Stats Bar ---
    const statsContainer = document.getElementById('stats-container');
    if (statsContainer && stats) {
        statsContainer.innerHTML = stats.map(st => `
            <div class="stat-card">
                <i class="${st.icon} stat-icon"></i>
                <div>
                    <div class="stat-val">${st.value}</div>
                    <div class="stat-lbl">${st.label}</div>
                </div>
            </div>
        `).join('');
    }

    // --- 3B. Render Celestial Comet Keywords Streams (Alternating Directions) ---
    const keywordsContainer = document.getElementById('about-keywords');
    if (keywordsContainer && portfolioData.about && portfolioData.about.coreKeywords) {
        const keywords = portfolioData.about.coreKeywords;

        // Split into 3 alternating rows
        const row1 = keywords.filter((_, i) => i % 3 === 0);
        const row2 = keywords.filter((_, i) => i % 3 === 1);
        const row3 = keywords.filter((_, i) => i % 3 === 2);

        function buildCometItem(k, direction) {
            let catClass = 'mobile';
            let icon = 'fa-brands fa-flutter';
            if (k.cat === 'Architecture') { catClass = 'arch'; icon = 'fa-solid fa-layer-group'; }
            else if (k.cat === 'Backend') { catClass = 'backend'; icon = 'fa-solid fa-server'; }
            else if (k.cat === 'Performance') { catClass = 'perf'; icon = 'fa-solid fa-gauge-high'; }
            else if (k.cat === 'AI') { catClass = 'ai'; icon = 'fa-solid fa-brain'; }

            const name = k.name.toLowerCase();
            if (name.includes('java') || name.includes('xml')) icon = 'fa-brands fa-java';
            else if (name.includes('android tv') || name.includes('tv')) icon = 'fa-solid fa-tv';
            else if (name.includes('android')) icon = 'fa-brands fa-android';
            else if (name.includes('swift') || name.includes('ios')) icon = 'fa-brands fa-apple';
            else if (name.includes('dart')) icon = 'fa-solid fa-cube';
            else if (name.includes('websocket')) icon = 'fa-solid fa-bolt';
            else if (name.includes('lan') || name.includes('peer-to-peer')) icon = 'fa-solid fa-circle-nodes';
            else if (name.includes('p2p') || name.includes('mdns')) icon = 'fa-solid fa-network-wired';
            else if (name.includes('desktop')) icon = 'fa-solid fa-desktop';
            else if (name.includes('rest') || name.includes('graphql')) icon = 'fa-solid fa-arrows-split-up-and-left';
            else if (name.includes('fastlane') || name.includes('ci/cd')) icon = 'fa-solid fa-rocket';
            else if (name.includes('compose')) icon = 'fa-solid fa-shapes';
            else if (name.includes('leakcanary') || name.includes('profiling')) icon = 'fa-solid fa-magnifying-glass-chart';
            else if (name.includes('crash')) icon = 'fa-solid fa-shield-halved';
            else if (name.includes('clean architecture') || name.includes('mvvm')) icon = 'fa-solid fa-cubes';
            else if (name.includes('state')) icon = 'fa-solid fa-arrows-spin';
            else if (name.includes('system design')) icon = 'fa-solid fa-diagram-project';
            else if (name.includes('offline')) icon = 'fa-solid fa-cloud-arrow-down';
            else if (name.includes('coroutines') || name.includes('flow')) icon = 'fa-solid fa-water';
            else if (name.includes('ai') || name.includes('mcp') || name.includes('agent')) icon = 'fa-solid fa-brain';

            return `
                <div class="comet-chip comet-${direction} ${catClass}" onclick="openKeywordProjectsModal('${k.name}')" title="Explore projects with ${k.name}" role="button" tabindex="0">
                    <span class="comet-sheen" aria-hidden="true"></span>
                    <span class="comet-head" aria-hidden="true"></span>
                    <i class="${icon} comet-icon" aria-hidden="true"></i>
                    <span class="comet-text">${k.name}</span>
                </div>
                <span class="comet-divider" aria-hidden="true">—</span>
            `;
        }

        const row1Items = row1.map(k => buildCometItem(k, 'left')).join('');
        const row2Items = row2.map(k => buildCometItem(k, 'right')).join('');
        const row3Items = row3.map(k => buildCometItem(k, 'left')).join('');

        // Repeat items twice per half to guarantee seamless looping without gaps
        const track1Half = row1Items + row1Items;
        const track2Half = row2Items + row2Items;
        const track3Half = row3Items + row3Items;

        keywordsContainer.innerHTML = `
            <div class="comet-stream-container">
                <div class="comet-row comet-row-1" aria-label="Keywords Stream Westward">
                    <div class="comet-track comet-track-left-1">
                        ${track1Half}${track1Half}
                    </div>
                </div>
                <div class="comet-row comet-row-2" aria-label="Keywords Stream Eastward">
                    <div class="comet-track comet-track-right">
                        ${track2Half}${track2Half}
                    </div>
                </div>
                <div class="comet-row comet-row-3" aria-label="Keywords Stream Westward">
                    <div class="comet-track comet-track-left-2">
                        ${track3Half}${track3Half}
                    </div>
                </div>
            </div>
        `;
    }

    // --- 4. Render Experience Timeline ---
    // --- 4. Render Experience Timeline with Mobile Scope & Metrics ---
    const timelineContainer = document.getElementById('experience-timeline');
    if (timelineContainer && experience) {
        timelineContainer.innerHTML = experience.map(exp => `
            <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="tilt-card timeline-content">
                    <div class="timeline-top">
                        <div>
                            <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
                                <h3 class="timeline-role">${exp.role}</h3>
                                ${exp.badge ? `<span class="pill-tag" style="font-size: 0.72rem; padding: 0.15rem 0.55rem; border-color: ${exp.badge.includes('Current') ? 'var(--accent-cyan)' : 'var(--accent-purple)'}; color: ${exp.badge.includes('Current') ? 'var(--accent-cyan)' : '#c084fc'}; font-weight: 700;">${exp.badge}</span>` : ''}
                            </div>
                            <div class="timeline-company"><i class="fa-solid fa-building"></i> ${exp.company} &bull; ${exp.location}</div>
                        </div>
                        <span class="timeline-period">${exp.period}</span>
                    </div>

                    ${exp.mobileBadge ? `
                        <div class="timeline-mobile-banner">
                            <div class="mobile-scope-title">
                                <i class="fa-solid fa-mobile-screen-button"></i>
                                <span>${exp.mobileBadge}</span>
                            </div>
                            ${exp.platformStores ? `
                                <div class="store-badge-group">
                                    ${exp.platformStores.map(store => `
                                        <span class="store-badge-pill">
                                            <i class="${store.includes('Google') ? 'fa-brands fa-google-play' : store.includes('Apple') ? 'fa-brands fa-apple' : store.includes('Staff') ? 'fa-solid fa-ticket' : 'fa-brands fa-android'}"></i>
                                            ${store}
                                        </span>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    ` : ''}

                    ${exp.mobileMetrics ? `
                        <div class="timeline-metrics-strip">
                            ${exp.mobileMetrics.map(m => `
                                <div class="mini-metric-chip">
                                    <i class="${m.icon}"></i>
                                    <span>${m.label}</span>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    <ul class="timeline-bullets">
                        ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
                    </ul>
                    <div class="timeline-tags">
                        ${exp.techStack.map(t => `<span class="pill-tag">${t}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // --- 5. Render Skills Matrix with Mobile Flagship Card ---
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer && skillCategories) {
        skillsContainer.innerHTML = skillCategories.map(cat => {
            const isMobileCat = cat.category === "Mobile Engineering";
            return `
            <div class="tilt-card skill-category-card ${isMobileCat ? 'mobile-flagship-card' : ''}">
                <div class="skill-card-head">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <i class="${cat.icon}"></i>
                        <h3>${cat.category}</h3>
                    </div>
                    ${isMobileCat ? `<span class="flagship-badge"><i class="fa-solid fa-crown"></i> Flagship Domain</span>` : ''}
                </div>
                <div class="skill-items">
                    ${cat.skills.map(sk => `
                        <div class="skill-badge" title="${sk.level}">
                            <i class="${sk.icon}"></i>
                            <span>${sk.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `}).join('');
    }

    // --- 6. Render Projects with Category Filtering, Store Badges & Metrics ---
    const projectsContainer = document.getElementById('projects-container');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function renderProjects(filter = 'all') {
        if (!projectsContainer || !projects) return;

        const filtered = filter === 'all'
            ? projects
            : projects.filter(p => p.category === filter || (Array.isArray(p.categories) && p.categories.includes(filter)));

        projectsContainer.innerHTML = filtered.map(proj => `
            <div class="tilt-card project-card ${proj.category === 'mobile' ? 'mobile-project-card' : ''}" data-category="${proj.category}" onclick="openProjectModal('${proj.id}')">
                <div>
                    <div class="project-header">
                        <div class="project-header-left">
                            <div class="project-icon-box">
                                <i class="${proj.icon}"></i>
                            </div>
                            ${proj.storeBadges ? `
                                <div class="project-store-badges">
                                    ${proj.storeBadges.map(st => `
                                        <span class="project-store-badge">
                                            <i class="${st.includes('Google') || st.includes('Play') ? 'fa-brands fa-google-play' :
                st.includes('Apple') ? 'fa-brands fa-apple' :
                    st.includes('TV') ? 'fa-solid fa-tv' :
                        st.includes('Desktop') || st.includes('Windows') ? 'fa-brands fa-windows' :
                            st.includes('Dart') || st.includes('Plugin') ? 'fa-solid fa-cube' :
                                st.includes('Android') ? 'fa-brands fa-android' :
                                    st.includes('Flutter') ? 'fa-solid fa-layer-group' :
                                        st.includes('Compose') ? 'fa-solid fa-shapes' :
                                            st.includes('Maps') ? 'fa-solid fa-map-location-dot' :
                                                st.includes('IEEE') ? 'fa-solid fa-certificate' :
                                                    st.includes('Open Source') ? 'fa-brands fa-github' :
                                                        'fa-solid fa-bolt'
            }"></i>
                                            ${st}
                                        </span>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                        <div class="project-links" onclick="event.stopPropagation()">
                            ${proj.links.chatgpt ? `<a href="${proj.links.chatgpt}" target="_blank" rel="noopener" title="Open Akasa ChatGPT App"><i class="fa-solid fa-robot"></i></a>` : ''}
                            ${proj.links.live ? `<a href="${proj.links.live}" target="_blank" rel="noopener" title="Live Application"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ''}
                            ${proj.links.github ? `<a href="${proj.links.github}" target="_blank" rel="noopener" title="GitHub Repository"><i class="fa-brands fa-github"></i></a>` : ''}
                        </div>
                    </div>
                    <h3 class="project-title">${proj.title}</h3>
                    <p class="project-tagline">${proj.tagline}</p>
                    <p class="project-desc">${proj.description}</p>

                    ${proj.stats ? `
                        <div class="project-stats-strip">
                            ${proj.stats.map(s => `
                                <div class="project-stat-pill">
                                    <span class="stat-p-lbl">${s.label}:</span>
                                    <span class="stat-p-val">${s.value}</span>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    <ul class="project-highlights-list">
                        ${proj.highlights.slice(0, 3).map(hl => `<li>${hl}</li>`).join('')}
                    </ul>
                </div>
                <div class="project-footer">
                    ${proj.tags.slice(0, 5).map(tag => `<span class="pill-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');

        initTiltPhysics();
    }

    window.renderProjects = renderProjects;

    window.filterProjectsByKeyword = function (keyword) {
        if (typeof openKeywordProjectsModal === 'function') {
            openKeywordProjectsModal(keyword);
        }
    };

    renderProjects('all');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-filter');
            renderProjects(category);
        });
    });

    // --- 7. Render Research & IEEE Publications Section ---
    const researchContainer = document.getElementById('research-container');
    if (researchContainer && research) {
        researchContainer.innerHTML = research.map(item => `
            <div class="tilt-card research-card">
                <div class="research-top-row">
                    <span class="ieee-badge"><i class="fa-solid fa-certificate"></i> ${item.badge}</span>
                    <span class="research-year"><i class="fa-regular fa-calendar"></i> ${item.year}</span>
                </div>
                <h3 class="research-paper-title">${item.title}</h3>
                <div class="research-conf"><i class="fa-solid fa-book-bookmark"></i> ${item.conference}</div>
                <div class="research-authors">
                    <strong>Authors:</strong> ${item.authors.map(a => a === "Indresh Hemani" ? `<span style="color: var(--accent-cyan); font-weight:700;">${a} (Author)</span>` : a).join(', ')}
                </div>
                <div class="research-abstract">
                    <strong>Abstract:</strong> ${item.abstract}
                </div>
                <ul class="project-highlights-list">
                    ${item.highlights.map(h => `<li>${h}</li>`).join('')}
                </ul>
                <div class="timeline-tags" style="margin-top: 1.2rem;">
                    ${item.tags.map(t => `<span class="pill-tag">${t}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    // --- 8. Render Education Section ---
    const educationContainer = document.getElementById('education-container');
    if (educationContainer && education) {
        educationContainer.innerHTML = education.map(edu => `
            <div class="tilt-card education-card">
                <i class="fa-solid fa-graduation-cap edu-icon"></i>
                <h3 class="edu-degree">${edu.degree}</h3>
                <div class="edu-spec">${edu.specialization}</div>
                <div class="edu-inst"><i class="fa-solid fa-building-columns"></i> ${edu.institution}</div>
                <div class="edu-period"><i class="fa-regular fa-calendar"></i> ${edu.period} &bull; ${edu.location}</div>
                ${edu.badge ? `<div style="margin-top: 0.6rem;"><span class="pill-tag" style="border-color: var(--accent-purple); color: #c084fc;">${edu.badge}</span></div>` : ''}
                <ul class="project-highlights-list" style="margin-top: 1rem;">
                    ${edu.highlights.map(hl => `<li>${hl}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    // --- 8b. Render Core Stack & Keywords Cloud ---
    const keywordContainer = document.getElementById('keyword-chips-container');
    if (keywordContainer && portfolioData.about && portfolioData.about.coreKeywords) {
        function getKeywordIcon(name) {
            if (name.includes('Flutter')) return 'devicon-flutter-plain';
            if (name.includes('Android') || name.includes('Kotlin')) return 'devicon-android-plain';
            if (name.includes('Compose')) return 'fa-solid fa-shapes';
            if (name.includes('Swift') || name.includes('iOS')) return 'devicon-swift-plain';
            if (name.includes('Java')) return 'fa-brands fa-java';
            if (name.includes('Architecture')) return 'fa-solid fa-layer-group';
            if (name.includes('State')) return 'fa-solid fa-arrows-spin';
            if (name.includes('GraphQL') || name.includes('REST')) return 'fa-solid fa-network-wired';
            if (name.includes('System')) return 'fa-solid fa-diagram-project';
            if (name.includes('MCP') || name.includes('Protocol')) return 'fa-solid fa-robot';
            if (name.includes('Crash')) return 'fa-solid fa-shield-halved';
            if (name.includes('Coroutines')) return 'fa-solid fa-water';
            if (name.includes('LeakCanary')) return 'fa-solid fa-bug-slash';
            return 'fa-solid fa-bolt';
        }

        keywordContainer.innerHTML = portfolioData.about.coreKeywords.map(k => `
            <span class="keyword-chip ${k.cat.toLowerCase()}" onclick="copyToClipboard('${k.name}', 'Keyword copied!')">
                <i class="${getKeywordIcon(k.name)}"></i> ${k.name}
            </span>
        `).join('');
    }

    // --- 9. Render Contact Section Details ---
    const contactEmailEl = document.getElementById('contact-email-text');
    const contactPhoneEl = document.getElementById('contact-phone-text');
    const contactLocationEl = document.getElementById('contact-location-text');

    if (contactEmailEl) contactEmailEl.textContent = personal.email;
    if (contactPhoneEl) contactPhoneEl.textContent = personal.phone;
    if (contactLocationEl) contactLocationEl.textContent = personal.location;

    // --- 10. Initialize Command Palette (Ctrl+K) ---
    try {
        initCommandPalette();
    } catch (e) {
        console.warn('Error initializing command palette:', e);
    }

    // --- 11. 3D Card Tilt Physics ---
    try {
        initTiltPhysics();
    } catch (e) {
        console.warn('Error initializing tilt physics:', e);
    }

    // --- 13. Dark / Light Theme Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = theme === 'light'
                ? '<i class="fa-solid fa-moon"></i>'
                : '<i class="fa-solid fa-sun"></i>';
        }
    }

    setTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(nextTheme);
        });
    }

    // --- 14. Mobile & Tablet iPhone Duo Side Drawer ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sideDrawer = document.getElementById('side-drawer');
    const sideDrawerBackdrop = document.getElementById('side-drawer-backdrop');

    window.openSideDrawer = function () {
        if (sideDrawer) sideDrawer.classList.add('open');
        if (sideDrawerBackdrop) sideDrawerBackdrop.classList.add('open');
        if (hamburgerBtn) hamburgerBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        document.body.style.overflow = 'hidden';
    };

    window.closeSideDrawer = function () {
        if (sideDrawer) sideDrawer.classList.remove('open');
        if (sideDrawerBackdrop) sideDrawerBackdrop.classList.remove('open');
        if (hamburgerBtn) hamburgerBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        document.body.style.overflow = '';
    };

    window.toggleSideDrawer = function () {
        if (sideDrawer && sideDrawer.classList.contains('open')) {
            window.closeSideDrawer();
        } else {
            window.openSideDrawer();
        }
    };

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            window.toggleSideDrawer();
        });
    }

    if (sideDrawerBackdrop) {
        sideDrawerBackdrop.addEventListener('click', () => {
            window.closeSideDrawer();
        });
    }

    // Close side drawer on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sideDrawer && sideDrawer.classList.contains('open')) {
            window.closeSideDrawer();
        }
    });

    // Close side drawer when any navigation link inside it is clicked
    if (sideDrawer) {
        sideDrawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                window.closeSideDrawer();
            });
        });
    }

    // --- 15. Active Nav Section Spy ---
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPosition = window.pageYOffset + 220;

        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                currentSection = sec.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }, { passive: true });
});

// ==========================================================================
// 3D Card Tilt & Dynamic Glare Effect
// ==========================================================================
function initTiltPhysics() {
    const tiltCards = document.querySelectorAll('.tilt-card, .hero-3d-card, .mcp-console-wrapper, .phone-device-card, .pillar-card, .outside-card, .about-story-card, .about-philosophy-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;
            card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// ==========================================================================
// Interactive Smartphone Mockup Controls
// ==========================================================================
window.switchPhoneScreen = function (screenId) {
    const screens = {
        flight: document.getElementById('phone-screen-flight'),
        arch: document.getElementById('phone-screen-arch'),
        vitals: document.getElementById('phone-screen-vitals')
    };

    const tabBtns = {
        flight: document.getElementById('tab-btn-flight'),
        arch: document.getElementById('tab-btn-arch'),
        vitals: document.getElementById('tab-btn-vitals')
    };

    Object.keys(screens).forEach(key => {
        if (screens[key]) {
            if (key === screenId) {
                screens[key].classList.add('active');
            } else {
                screens[key].classList.remove('active');
            }
        }
        if (tabBtns[key]) {
            if (key === screenId) {
                tabBtns[key].classList.add('active');
            } else {
                tabBtns[key].classList.remove('active');
            }
        }
    });

    const islandText = document.getElementById('island-text-content');
    if (islandText) {
        if (screenId === 'flight') islandText.innerHTML = 'QP 1366 &bull; Gate B4 &bull; On Schedule';
        else if (screenId === 'arch') islandText.innerHTML = 'Client ↔ Contract ↔ Cloud';
        else if (screenId === 'vitals') islandText.innerHTML = '500K+ Users &bull; -30% Crashes';
    }
};

let islandNotificationIdx = 0;
const ISLAND_NOTIFICATIONS = [
    { icon: 'fa-solid fa-plane-up', text: 'QP 1366 &bull; Gate B4 &bull; Boarding Now' },
    { icon: 'fa-solid fa-shield-halved', text: 'Production Stability: 99.8% Crash-Free' },
    { icon: 'fa-solid fa-robot', text: 'Akasa MCP Server: 6 Tools Active' },
    { icon: 'fa-solid fa-bolt', text: 'Sub-100ms API Latency Verified' },
    { icon: 'fa-brands fa-flutter', text: 'Fluid 120 FPS Declarative Rendering' }
];

window.triggerIslandNotification = function () {
    const island = document.getElementById('dynamic-island');
    const islandText = document.getElementById('island-text-content');
    if (!island || !islandText) return;

    islandNotificationIdx = (islandNotificationIdx + 1) % ISLAND_NOTIFICATIONS.length;
    const currentNotif = ISLAND_NOTIFICATIONS[islandNotificationIdx];

    island.classList.add('island-alert');
    islandText.innerHTML = currentNotif.text;
    const iconEl = island.querySelector('.island-icon i');
    if (iconEl) iconEl.className = currentNotif.icon;

    showToast(`📱 Mobile Alert: ${currentNotif.text.replace(/&bull;/g, '•')}`);

    setTimeout(() => {
        island.classList.remove('island-alert');
    }, 600);
};

// ==========================================================================
// Retro Music & Equalizer Vibe Control (Web Audio API Chillhop / Jazz Synth)
// ==========================================================================
let isMusicVibePlaying = false;
let audioCtx = null;
let chordInterval = null;
let masterGain = null;

// Warm jazz lo-fi chord progressions (frequencies in Hz)
// Ebmaj7, Gm7, Fm7, Bb7 (Kishore Kumar & vintage jazz progression)
const jazzChords = [
    [155.56, 196.00, 233.08, 293.66], // Ebmaj7
    [196.00, 233.08, 293.66, 349.23], // Gm7
    [174.61, 207.65, 261.63, 311.13], // Fm7
    [116.54, 174.61, 233.08, 277.18]  // Bb7
];
let currentChordIdx = 0;

function playJazzChord() {
    if (!audioCtx || !isMusicVibePlaying) return;

    const chord = jazzChords[currentChordIdx % jazzChords.length];
    currentChordIdx++;

    const now = audioCtx.currentTime;
    const chordDuration = 3.6; // Soft lingering chord

    chord.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        // Warm sine and triangle hybrid for Rhodes piano / vintage synth feel
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Warm vintage lowpass filter (cuts harsh highs)
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450 + idx * 80, now);

        // Soft ADSR envelope
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.045, now + 0.6); // Gentle attack
        gain.gain.exponentialRampToValueAtTime(0.001, now + chordDuration); // Smooth decay

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + chordDuration);
    });
}

function startVibeAudio() {
    try {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContextClass();
            masterGain = audioCtx.createGain();
            masterGain.gain.setValueAtTime(0.7, audioCtx.currentTime);
            masterGain.connect(audioCtx.destination);
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        playJazzChord();
        if (chordInterval) clearInterval(chordInterval);
        chordInterval = setInterval(() => {
            if (isMusicVibePlaying) playJazzChord();
        }, 3400);
    } catch (e) {
        console.warn('Web Audio could not start:', e);
    }
}

function stopVibeAudio() {
    if (chordInterval) {
        clearInterval(chordInterval);
        chordInterval = null;
    }
    if (audioCtx && audioCtx.state === 'running') {
        audioCtx.suspend();
    }
}

window.toggleMusicVibe = function () {
    const eq = document.querySelector('.retro-equalizer');
    const label = document.getElementById('vibe-status-label');
    const navBtn = document.getElementById('vibe-nav-btn');
    const fabBtn = document.getElementById('floating-vibe-fab');
    const fabLabel = document.getElementById('vibe-fab-label');
    const sideCard = document.querySelector('.duo-vibe-card');
    const sideBadge = document.getElementById('side-vibe-badge');

    isMusicVibePlaying = !isMusicVibePlaying;

    if (isMusicVibePlaying) {
        if (eq) eq.classList.remove('paused');
        if (label) {
            label.textContent = 'Now Grooving 🎶';
            label.classList.add('vibe-status');
        }
        if (navBtn) {
            navBtn.classList.add('playing');
            const pillText = navBtn.querySelector('.vibe-pill-text');
            if (pillText) pillText.textContent = 'Grooving 🎶';
        }
        if (fabBtn) {
            fabBtn.classList.add('playing');
        }
        if (fabLabel) {
            fabLabel.textContent = 'Grooving';
        }
        if (sideCard) {
            sideCard.classList.add('playing');
        }
        if (sideBadge) {
            sideBadge.textContent = 'Grooving 🎶';
        }
        startVibeAudio();
        showToast('🎶 Retro Vibe Active: Old-School Jazz Synth playing!');
    } else {
        if (eq) eq.classList.add('paused');
        if (label) {
            label.textContent = 'Vibe Paused';
            label.classList.remove('vibe-status');
        }
        if (navBtn) {
            navBtn.classList.remove('playing');
            const pillText = navBtn.querySelector('.vibe-pill-text');
            if (pillText) pillText.textContent = 'Chill Vibe';
        }
        if (fabBtn) {
            fabBtn.classList.remove('playing');
        }
        if (fabLabel) {
            fabLabel.textContent = 'Vibe';
        }
        if (sideCard) {
            sideCard.classList.remove('playing');
        }
        if (sideBadge) {
            sideBadge.textContent = 'Tap to Groove';
        }
        stopVibeAudio();
        showToast('⏸️ Equalizer paused. Tap again to groove!');
    }

    if (typeof renderCommandList === 'function') {
        const input = document.getElementById('cmd-palette-input');
        renderCommandList(input ? input.value : '');
    }
};

window.openCommandPaletteWithQuery = function (query) {
    if (typeof openCommandPalette === 'function') {
        openCommandPalette();
        const input = document.getElementById('cmd-palette-input');
        if (input) {
            input.value = query;
            input.dispatchEvent(new Event('input'));
        }
    }
};

// ==========================================================================
// Interactive Project Deep-Dive Modal Inspector
// ==========================================================================
window.openProjectModal = function (projectId) {
    const backdrop = document.getElementById('project-modal-backdrop');
    const content = document.getElementById('project-modal-content');
    if (!backdrop || !content || !portfolioData.projects) return;

    const proj = portfolioData.projects.find(p => p.id === projectId) || portfolioData.projects[0];

    content.innerHTML = `
        <button class="modal-close-btn" onclick="closeProjectModal()" aria-label="Close Modal">
            <i class="fa-solid fa-xmark"></i>
        </button>

        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
            <div class="project-icon-box" style="width: 56px; height: 56px; font-size: 1.6rem;">
                <i class="${proj.icon}"></i>
            </div>
            <div>
                <span class="pill-tag" style="color: var(--accent-cyan); border-color: var(--accent-cyan);">${proj.categoryLabel}</span>
                <h2 style="font-size: 1.8rem; margin-top: 0.3rem;">${proj.title}</h2>
            </div>
        </div>

        <p style="font-size: 1.1rem; color: var(--accent-blue); font-weight: 500; margin-bottom: 1rem;">
            ${proj.tagline}
        </p>

        <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.8rem;">
            ${proj.description}
        </p>

        ${proj.stats ? `
            <div class="flight-details-grid" style="margin-bottom: 2rem; background: rgba(0, 240, 255, 0.04); border-color: rgba(0, 240, 255, 0.2);">
                ${proj.stats.map(s => `
                    <div>
                        <div class="detail-item-val" style="color: var(--accent-cyan);">${s.value}</div>
                        <div class="detail-item-lbl">${s.label}</div>
                    </div>
                `).join('')}
            </div>
        ` : ''}

        <h4 style="font-size: 1.1rem; margin-bottom: 0.8rem; color: var(--text-primary);"><i class="fa-solid fa-layer-group"></i> Key Engineering Highlights:</h4>
        <ul class="project-highlights-list" style="margin-bottom: 2rem;">
            ${proj.highlights.map(h => `<li style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 0.6rem;">${h}</li>`).join('')}
        </ul>

        <div style="margin-bottom: 2rem;">
            <h4 style="font-size: 0.9rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.6rem;">Technologies & Frameworks:</h4>
            <div class="timeline-tags">
                ${proj.tags.map(t => `<span class="pill-tag" style="background: rgba(255,255,255,0.06);">${t}</span>`).join('')}
            </div>
        </div>

        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            ${proj.links.chatgpt ? `
                <a href="${proj.links.chatgpt}" target="_blank" rel="noopener" class="btn btn-primary" style="background: #10a37f; border-color: #10a37f;">
                    <i class="fa-solid fa-brain"></i> Try on ChatGPT App
                </a>
            ` : ''}
            ${proj.links.demo ? `
                <button onclick="closeProjectModal(); scrollToSection('mcp-playground')" class="btn btn-outline">
                    <i class="fa-solid fa-eye"></i> View ChatGPT Preview
                </button>
            ` : ''}
            ${proj.links.live ? `
                <a href="${proj.links.live}" target="_blank" rel="noopener" class="btn btn-primary">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Visit Official Product
                </a>
            ` : ''}
            ${proj.links.github ? `
                <a href="${proj.links.github}" target="_blank" rel="noopener" class="btn ${(!proj.links.live && !proj.links.chatgpt) ? 'btn-primary' : 'btn-outline'}">
                    <i class="fa-brands fa-github"></i> View GitHub Repo
                </a>
            ` : ''}
        </div>
    `;

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
};

window.closeProjectModal = function () {
    const backdrop = document.getElementById('project-modal-backdrop');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
};

// ==========================================================================
// Keyword Projects Pop-Up Modal (Deterministic Matching Strategy)
// ==========================================================================
const KEYWORD_PROJECT_MAP = {
    "flutter": ["akasa-mobile", "cross-share"],
    "android (kotlin)": ["akasa-mobile", "cross-share", "andromonth-curriculum", "amcho-jagdalpur", "atms-voice"],
    "dart plugin architecture": ["clipboard-networking", "cross-share"],
    "p2p discovery & mdns": ["clipboard-networking", "cross-share"],
    "websockets & real-time sync": ["cross-share", "clipboard-networking"],
    "android tv & desktop bridge": ["cross-share"],
    "jetpack compose": ["andromonth-curriculum", "akasa-mobile"],
    "swift & ios": ["akasa-mobile"],
    "java & xml legacy": ["chat-application"],
    "mobile architecture": ["akasa-mobile", "cross-share", "andromonth-curriculum"],
    "state management": ["akasa-mobile", "cross-share", "andromonth-curriculum"],
    "graphql & rest apis": ["akasa-mobile", "carjoz-engine", "akasa-mcp"],
    "system design": ["akasa-mobile", "cross-share", "clipboard-networking", "akasa-mcp"],
    "model context protocol (mcp)": ["akasa-mcp"],
    "offline-first sync": ["cross-share", "carjoz-engine", "amcho-jagdalpur"],
    "app performance": ["akasa-mobile", "cross-share"],
    "clean architecture (mvvm)": ["akasa-mobile", "andromonth-curriculum", "amcho-jagdalpur"],
    "crash reduction (-30%)": ["akasa-mobile"],
    "coroutines & flow": ["andromonth-curriculum", "akasa-mobile"],
    "ai agents & tool calling": ["akasa-mcp", "smart-traffic-iot"],
    "leakcanary & profiling": ["akasa-mobile"],
    "ci/cd & fastlane": ["akasa-mobile"],
    "local lan peer-to-peer": ["cross-share", "clipboard-networking"],
    "cross-platform desktop": ["cross-share"]
};

window.openKeywordProjectsModal = function (keywordName) {
    const backdrop = document.getElementById('keyword-modal-backdrop');
    const content = document.getElementById('keyword-modal-content');
    if (!backdrop || !content || !portfolioData || !portfolioData.projects) return;

    const term = (keywordName || '').toLowerCase().trim();

    // Find keyword info to get category & styling
    const kwObj = (portfolioData.about && portfolioData.about.coreKeywords)
        ? portfolioData.about.coreKeywords.find(k => k.name.toLowerCase() === term)
        : null;
    const catLabel = kwObj ? kwObj.cat : 'Engineering';

    let icon = 'fa-brands fa-flutter';
    if (term.includes('java') || term.includes('xml')) icon = 'fa-brands fa-java';
    else if (term.includes('tv')) icon = 'fa-solid fa-tv';
    else if (term.includes('android')) icon = 'fa-brands fa-android';
    else if (term.includes('swift') || term.includes('ios')) icon = 'fa-brands fa-apple';
    else if (term.includes('dart')) icon = 'fa-solid fa-cube';
    else if (term.includes('socket')) icon = 'fa-solid fa-bolt';
    else if (term.includes('lan') || term.includes('peer-to-peer')) icon = 'fa-solid fa-circle-nodes';
    else if (term.includes('p2p') || term.includes('mdns')) icon = 'fa-solid fa-network-wired';
    else if (term.includes('desktop')) icon = 'fa-solid fa-desktop';
    else if (term.includes('graphql') || term.includes('rest')) icon = 'fa-solid fa-arrows-split-up-and-left';
    else if (term.includes('fastlane') || term.includes('ci/cd')) icon = 'fa-solid fa-rocket';
    else if (term.includes('compose')) icon = 'fa-solid fa-shapes';
    else if (term.includes('leak') || term.includes('profiling')) icon = 'fa-solid fa-magnifying-glass-chart';
    else if (term.includes('crash')) icon = 'fa-solid fa-shield-halved';
    else if (term.includes('clean') || term.includes('mvvm')) icon = 'fa-solid fa-cubes';
    else if (term.includes('state')) icon = 'fa-solid fa-arrows-spin';
    else if (term.includes('system')) icon = 'fa-solid fa-diagram-project';
    else if (term.includes('offline')) icon = 'fa-solid fa-cloud-arrow-down';
    else if (term.includes('coroutines') || term.includes('flow')) icon = 'fa-solid fa-water';
    else if (term.includes('ai') || term.includes('mcp') || term.includes('agent')) icon = 'fa-solid fa-brain';
    else if (catLabel === 'Architecture') icon = 'fa-solid fa-layer-group';
    else if (catLabel === 'Backend') icon = 'fa-solid fa-server';
    else if (catLabel === 'Performance') icon = 'fa-solid fa-gauge-high';

    let matchedProjects = [];

    // 1. Direct explicit keyword mapping (Deterministic, 100% accurate)
    if (KEYWORD_PROJECT_MAP[term]) {
        const targetIds = KEYWORD_PROJECT_MAP[term];
        matchedProjects = targetIds
            .map(id => portfolioData.projects.find(p => p.id === id))
            .filter(Boolean);
    }

    // 2. Strict exact tag matching (fallback for custom searches)
    if (matchedProjects.length === 0) {
        matchedProjects = portfolioData.projects.filter(p => {
            return p.tags && p.tags.some(t => t.toLowerCase() === term);
        });
    }

    content.innerHTML = `
        <button class="modal-close-btn" onclick="closeKeywordModal()" aria-label="Close Modal">
            <i class="fa-solid fa-xmark"></i>
        </button>

        <div class="keyword-modal-header">
            <div class="keyword-modal-icon-badge">
                <i class="${icon}"></i>
            </div>
            <div class="keyword-modal-title-wrap">
                <div class="keyword-modal-tags">
                    <span class="pill-tag keyword-pill-cat">${catLabel}</span>
                    <span class="pill-tag keyword-pill-count">${matchedProjects.length} Project${matchedProjects.length === 1 ? '' : 's'} Associated</span>
                </div>
                <h2 class="keyword-modal-title">Projects with <span class="keyword-glow-title">${keywordName}</span></h2>
            </div>
        </div>

        <p class="keyword-modal-intro">
            Curated showcase of production applications and engineering projects built by Indresh that explicitly utilize <strong>${keywordName}</strong>:
        </p>

        <div class="keyword-projects-list">
            ${matchedProjects.length === 0 ? `
                <div style="text-align: center; padding: 2.5rem 1rem;">
                    <i class="fa-solid fa-layer-group" style="font-size: 2.2rem; color: var(--text-muted); margin-bottom: 1rem; display: block;"></i>
                    <h3 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--text-primary);">No Direct Projects Associated Yet</h3>
                    <p style="color: var(--text-secondary); max-width: 440px; margin: 0 auto 1.5rem; font-size: 0.9rem;">
                        Currently, no standalone project is tagged with <strong>"${keywordName}"</strong>. Browse the full engineering catalog below.
                    </p>
                    <button class="btn btn-primary btn-sm" onclick="closeKeywordModal(); scrollToSection('projects');">
                        <i class="fa-solid fa-list-check"></i> View All Projects
                    </button>
                </div>
            ` : matchedProjects.map(proj => `
                <div class="keyword-project-card">
                    <div class="keyword-proj-head">
                        <div class="keyword-proj-title-box">
                            <div class="keyword-proj-icon"><i class="${proj.icon}"></i></div>
                            <div>
                                <div class="keyword-proj-name">${proj.title}</div>
                                <div class="keyword-proj-tagline">${proj.tagline}</div>
                            </div>
                        </div>
                        ${proj.storeBadges ? `
                            <div class="store-badge-group">
                                ${proj.storeBadges.map(st => `
                                    <span class="store-badge-pill" style="font-size: 0.72rem; padding: 0.15rem 0.5rem;">
                                        <i class="${st.includes('Google') ? 'fa-brands fa-google-play' :
            st.includes('Apple') ? 'fa-brands fa-apple' :
                st.includes('Desktop') || st.includes('Windows') ? 'fa-brands fa-windows' :
                    st.includes('TV') ? 'fa-solid fa-tv' :
                        st.includes('ChatGPT') ? 'fa-solid fa-robot' :
                            st.includes('IEEE') ? 'fa-solid fa-certificate' :
                                st.includes('Open Source') ? 'fa-brands fa-github' :
                                    'fa-solid fa-bolt'
        }"></i>
                                        ${st}
                                    </span>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>

                    <p class="keyword-proj-desc">${proj.description}</p>

                    ${proj.stats ? `
                        <div class="keyword-proj-stats">
                            ${proj.stats.map(s => `
                                <div class="keyword-mini-stat">
                                    <span class="stat-lbl">${s.label}:</span>
                                    <span class="stat-val">${s.value}</span>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    <div class="keyword-proj-footer">
                        <div class="keyword-proj-tags">
                            ${proj.tags.map(t => {
            const isMatch = t.toLowerCase() === term ||
                (t.length > 3 && term.includes(t.toLowerCase())) ||
                (term.length > 3 && t.toLowerCase().includes(term));
            return `<span class="pill-tag ${isMatch ? 'matched-pill' : ''}">${t}</span>`;
        }).join('')}
                        </div>
                        <div class="keyword-proj-actions">
                            <button class="btn btn-sm btn-outline" onclick="closeKeywordModal(); openProjectModal('${proj.id}');">
                                <i class="fa-solid fa-circle-info"></i> Full Details
                            </button>
                            ${proj.links.github ? `
                                <a href="${proj.links.github}" target="_blank" rel="noopener" class="btn btn-sm btn-primary" title="View Source on GitHub">
                                    <i class="fa-brands fa-github"></i> Code
                                </a>
                            ` : ''}
                            ${proj.links.live ? `
                                <a href="${proj.links.live}" target="_blank" rel="noopener" class="btn btn-sm btn-primary" title="Live Application / Store">
                                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Visit
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
};

window.closeKeywordModal = function () {
    const backdrop = document.getElementById('keyword-modal-backdrop');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
};

// ==========================================================================
// Command Palette (Ctrl+K / Cmd+K)
// ==========================================================================
let renderCommandList = null;

const COMMAND_ITEMS = [
    { title: "About Me & Mobile Craftsmanship", desc: "Java/XML roots, engineering philosophy & pillars", cat: "About", action: () => { closeCommandPalette(); scrollToSection('about'); } },
    { title: "Mobile Phone: Boarding Pass Screen", desc: "Interactive Akasa Air mobile pass on device", cat: "Mobile", action: () => { closeCommandPalette(); switchPhoneScreen('flight'); scrollToSection('hero'); } },
    { title: "Mobile Phone: Architecture Flow", desc: "Client-server contracts & microservice diagram", cat: "Mobile", action: () => { closeCommandPalette(); switchPhoneScreen('arch'); scrollToSection('hero'); } },
    { title: "Mobile Phone: Production Vitals", desc: "500K+ active users & 30% crash drop stats", cat: "Mobile", action: () => { closeCommandPalette(); switchPhoneScreen('vitals'); scrollToSection('hero'); } },
    { title: "Akasa Air on ChatGPT (MCP)", desc: "Showcase of Model Context Protocol integration", cat: "Feature", action: () => { closeCommandPalette(); scrollToSection('mcp-playground'); } },
    { title: "Open Akasa Air in ChatGPT", desc: "Try the live ChatGPT extension", cat: "ChatGPT App", action: () => { window.open('https://chatgpt.com/plugins/plugin_asdk_app_69ef573311908191975c1bfb3baa12fc?q=akasa', '_blank'); closeCommandPalette(); } },
    { title: "Akasa Air Mobile App", desc: "Production airline application for 500k+ passengers", cat: "Project", action: () => { closeCommandPalette(); openProjectModal('akasa-mobile'); } },
    { title: "CrossShare (Flutter Multi-Platform)", desc: "P2P LAN clipboard sync for Android TV, Mobile & PC", cat: "Project", action: () => { closeCommandPalette(); openProjectModal('cross-share'); } },
    { title: "clipboard_networking (Dart Plugin)", desc: "Core mDNS, WebSockets & typed protocol engine", cat: "Project", action: () => { closeCommandPalette(); openProjectModal('clipboard-networking'); } },
    { title: "MyWhatsApp (Java & XML Android)", desc: "Real-time Firebase chat app built with native Java & XML", cat: "Project", action: () => { closeCommandPalette(); openProjectModal('chat-application'); } },
    { title: "IEEE 2024 Research Publication", desc: "AI-SIoT Hybrid Architecture for Smart Cities (CSNT 2024)", cat: "Research", action: () => { closeCommandPalette(); scrollToSection('research'); } },
    { title: "Work Experience Timeline", desc: "Akasa Air & Carjoz software engineering history", cat: "Navigation", action: () => { closeCommandPalette(); scrollToSection('experience'); } },
    { title: "Technical Skills Matrix", desc: "Flutter, Android, Micronaut, AWS, MCP", cat: "Navigation", action: () => { closeCommandPalette(); scrollToSection('skills'); } },
    { title: "Education & Leadership", desc: "Christ University & Student Placement Coordinator", cat: "Navigation", action: () => { closeCommandPalette(); scrollToSection('education'); } },
    { title: "Toggle Dark / Light Theme", desc: "Switch theme palette dynamically", cat: "Action", action: () => { closeCommandPalette(); document.getElementById('theme-toggle-btn').click(); } },
    { title: "Copy Contact Email", desc: "hemaniindresh@gmail.com", cat: "Action", action: () => { closeCommandPalette(); copyToClipboard('hemaniindresh@gmail.com', 'Email copied!'); } },
    {
        get title() { return isMusicVibePlaying ? "Stop the Vibe 🎵" : "Start the Vibe 🎵"; },
        get desc() { return isMusicVibePlaying ? "Pause the retro jazz synth chillhop session" : "Play retro chillhop & lo-fi jazz synth chords"; },
        cat: "Action",
        action: () => {
            closeCommandPalette();
            if (typeof toggleMusicVibe === 'function') {
                toggleMusicVibe();
            } else {
                const fab = document.getElementById('floating-vibe-fab');
                if (fab) fab.click();
            }
        }
    },
    { title: "Open CrossShare on GitHub", desc: "github.com/Indresh10/cross_share", cat: "External", action: () => { window.open('https://github.com/Indresh10/cross_share', '_blank'); closeCommandPalette(); } },
    { title: "Open clipboard_networking on GitHub", desc: "github.com/Indresh10/clipboard_networking", cat: "External", action: () => { window.open('https://github.com/Indresh10/clipboard_networking', '_blank'); closeCommandPalette(); } },
    { title: "Open MyWhatsApp on GitHub", desc: "github.com/Indresh10/Chat_Application", cat: "External", action: () => { window.open('https://github.com/Indresh10/Chat_Application', '_blank'); closeCommandPalette(); } },
    { title: "Open GitHub Profile", desc: "github.com/Indresh10", cat: "External", action: () => { window.open('https://github.com/Indresh10', '_blank'); closeCommandPalette(); } }
];

function initCommandPalette() {
    const triggerBtn = document.getElementById('open-cmd-btn');
    const backdrop = document.getElementById('cmd-palette-backdrop');
    const input = document.getElementById('cmd-palette-input');
    const list = document.getElementById('cmd-palette-list');

    if (!backdrop || !input || !list) return;

    renderCommandList = function (query = '') {
        const q = query.toLowerCase().trim();
        const filtered = COMMAND_ITEMS.filter(item =>
            item.title.toLowerCase().includes(q) ||
            item.desc.toLowerCase().includes(q) ||
            item.cat.toLowerCase().includes(q)
        );

        if (filtered.length === 0) {
            list.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--text-muted);">No matching commands found.</div>`;
            return;
        }

        list.innerHTML = filtered.map((item, idx) => `
            <div class="cmd-item ${idx === 0 ? 'selected' : ''}" data-idx="${idx}">
                <i class="fa-solid fa-chevron-right"></i>
                <div>
                    <div class="cmd-item-title">${item.title}</div>
                    <div class="cmd-item-desc">${item.desc}</div>
                </div>
                <span class="cmd-item-cat">${item.cat}</span>
            </div>
        `).join('');

        list.querySelectorAll('.cmd-item').forEach((el, index) => {
            el.addEventListener('click', () => {
                filtered[index].action();
            });
        });
    };

    renderCommandList();

    if (triggerBtn) {
        triggerBtn.addEventListener('click', () => openCommandPalette());
    }

    input.addEventListener('input', () => {
        renderCommandList(input.value);
    });

    // Global keyboard shortcut: Ctrl+K / Cmd+K / Escape
    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            const isOpen = backdrop.classList.contains('open');
            if (isOpen) {
                closeCommandPalette();
            } else {
                openCommandPalette();
            }
        } else if (e.key === 'Escape') {
            closeCommandPalette();
            closeProjectModal();
            closeKeywordModal();
        }
    });

    // Close on backdrop click
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeCommandPalette();
    });

    const projectBackdrop = document.getElementById('project-modal-backdrop');
    if (projectBackdrop) {
        projectBackdrop.addEventListener('click', (e) => {
            if (e.target === projectBackdrop) closeProjectModal();
        });
    }

    const keywordBackdrop = document.getElementById('keyword-modal-backdrop');
    if (keywordBackdrop) {
        keywordBackdrop.addEventListener('click', (e) => {
            if (e.target === keywordBackdrop) closeKeywordModal();
        });
    }
}

window.openCommandPalette = function () {
    const backdrop = document.getElementById('cmd-palette-backdrop');
    const input = document.getElementById('cmd-palette-input');
    if (backdrop && input) {
        backdrop.classList.add('open');
        input.value = '';
        if (typeof renderCommandList === 'function') {
            renderCommandList('');
        }
        input.focus();
    }
};

window.closeCommandPalette = function () {
    const backdrop = document.getElementById('cmd-palette-backdrop');
    if (backdrop) backdrop.classList.remove('open');
};

window.scrollToSection = function (id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
};

// ==========================================================================
// Copy to Clipboard Utility & Toast
// ==========================================================================
window.copyToClipboard = function (text, message = 'Copied to clipboard!') {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(message);
        }).catch(() => {
            fallbackCopy(text, message);
        });
    } else {
        fallbackCopy(text, message);
    }
};

function fallbackCopy(text, message) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(message);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}
