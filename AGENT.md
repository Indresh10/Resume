# AGENT GUIDELINES & ARCHITECTURE REFERENCE

> **Repository**: [Indresh Hemani - 3D Portfolio & Engineering Resume](https://github.com/Indresh10/Resume)  
> **Tech Stack**: Vanilla HTML5, CSS3, JavaScript (ES6+), Three.js (WebGL), Web Audio API  
> **Target Roles**: Senior Mobile Software Engineer, Full-Stack Mobile Specialist, Agentic AI / MCP Architect  

This document serves as the mandatory reference for all AI agents and developers contributing to this codebase. Any agent working on this repository MUST strictly follow these guidelines to prevent regressions in responsive layouts, theme styling, and web accessibility.

---

## 1. System Architecture & Component Inventory

- **Three.js WebGL Canvas (`#bg-canvas` / `js/scene3d.js`)**: Interactive 3D Cyber Planet, dynamic rings, and particle starfield. Maintains a subtle low opacity in light mode (`opacity: 0.35`) so text remains readable.
- **Top Navigation Bar (`.navbar` / `index.html`)**: Fixed glassmorphism header containing identity badge, desktop links, command palette trigger (`Ctrl+K`), theme switcher (dark/light), vibe music player (desktop), and mobile hamburger button.
- **iPhone Duo Side Drawer (`#side-drawer` & `#side-drawer-backdrop`)**: Modern dual-pane slide-in navigation drawer for tablet and mobile devices (`≤ 992px`), featuring squircle icon badges, live Retro Beats mini player, and command palette trigger.
- **Akasa Air MCP Live Playground (`#mcp-playground` / `js/main.js`)**: Interactive interactive console simulating the Akasa Air Model Context Protocol server on ChatGPT with live airline tool invocations (PNR, Flight Status, Route Search, Fares, Check-in).
- **Retro Beats & Jazz Vibe Player (`toggleMusicVibe()` in `js/main.js`)**: Real-time Web Audio API synthesizer generating chill jazzy chords with synchronized multi-channel animated equalizer bars across the header, side drawer, and floating action button.
- **Floating Action Buttons**:
  - `#floating-vibe-fab`: Mobile floating music vibe controller with live bouncing EQ bars.
  - `.floating-mcp-launcher`: Desktop launcher jumping to the Akasa MCP playground.
- **Modals**:
  - `#cmd-palette-backdrop`: Fuzzy search command palette (`Ctrl+K`).
  - `#project-modal-backdrop`: Deep-dive architectural project inspector modal.
- **Toast & Snackbar (`#toast` / `showToast()`)**:
  - **Desktop (`> 768px`)**: Positioned at top-right, directly beneath the menu bar.
  - **Mobile (`≤ 768px`)**: Transforms into a bottom-docked native snackbar.

---

## 2. Light Mode & Theme System Guidelines

### 2.1 CSS Variable Architecture
All colors, backgrounds, borders, and text contrasts MUST be governed by semantic variables:

```css
:root {
    --bg-primary: #0a0c14;
    --bg-secondary: #111424;
    --bg-card: rgba(18, 22, 39, 0.75);
    --border-glass: rgba(255, 255, 255, 0.08);
    --border-glow: rgba(0, 240, 255, 0.35);
    
    /* Dark Mode High-Contrast Typography */
    --text-primary: #ffffff;
    --text-secondary: #cbd5e1; /* Crisp Slate-300 — never use dark slate here */
    --text-muted: #94a3b8;     /* Legible Slate-400 */
}

[data-theme="light"] {
    --bg-primary: #f8fafc;
    --bg-secondary: #ffffff;
    --bg-card: #ffffff;
    --border-glass: rgba(0, 0, 0, 0.09);
    --border-glow: rgba(2, 132, 199, 0.35);

    /* Light Mode High-Contrast Typography */
    --text-primary: #090d16;   /* Deep obsidian black */
    --text-secondary: #1e293b; /* Deep slate-800 — high contrast and crystal clear */
    --text-muted: #475569;     /* Slate-600 — sharp, never faded or washed out */
}
```

### 2.2 Crucial Light Mode Rules
1. **Never hardcode dark backgrounds without a light mode override**:
   - Sub-boxes (e.g. `.hud-metric-box`, `.project-stats-strip`, `.mini-metric-chip`, `.retro-equalizer`) must NEVER use hardcoded `rgba(0, 0, 0, ...)` or `#0f172a` in light mode.
   - In `[data-theme="light"]`, use `#f8fafc` or `#f1f5f9` with subtle borders (`rgba(0, 0, 0, 0.08)`).
2. **Never hardcode `#ffffff` text on elements that render in light mode**:
   - Metric values (`.hud-metric-val`, `.stat-p-val`, `.mini-metric-chip`) must explicitly switch to `#090d16` or `#0f172a` in light mode.
3. **Contrast over 3D Canvas**:
   - Because the 3D canvas renders behind sections, text sitting directly on the canvas (e.g. `.hero-bio`, `.section-subtitle`, `.about-lead-text`) must have strong font weight (`450` or `500`) and deep color (`#1e293b` / `#334155`).
4. **Vibrant Accents in Light Mode**:
   - Cyan: `#0284c7` (Sky-600 for optimal contrast on white).
   - Purple: `#7c3aed` (Purple-600 for crisp text and badges).
   - Emerald: `#059669` (Emerald-600).
   - Amber: `#d97706` (Amber-600).

---

## 3. Mobile & Tablet Responsive Design Guidelines

### 3.1 Standard Breakpoints
- **Desktop**: `> 992px`
- **Tablet**: `768px – 992px`
- **Mobile**: `< 768px`
- **Compact Mobile**: `≤ 480px`

### 3.2 Header & Navbar Constraints (No Overflow / No Missing Hamburger)
On screens `≤ 992px`:
- **Hide wide elements**: Always hide `.vibe-nav-btn` and `.nav-cta-btn` (`display: none !important;`) from the top header. This prevents header crowding that pushes the hamburger button off-screen.
- **Prominent Hamburger**:
  ```css
  .hamburger-btn {
      display: flex !important;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      border-radius: var(--border-radius-sm);
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--border-glass);
      color: var(--text-primary);
      flex-shrink: 0;
  }
  ```
- **Compact Screen Sizing (`≤ 480px`)**:
  - Logo badge: `32px × 32px`
  - Action buttons (`.cmd-palette-btn`, `.theme-toggle-btn`, `.hamburger-btn`): `36px – 38px`
  - This ensures total navbar width stays well under $270\text{px}$, leaving safe margins on any $320\text{px}$ device.

### 3.3 iPhone Duo / iPad Style Side Drawer
- The side drawer (`#side-drawer`) is the dedicated navigation controller for tablets and mobile devices.
- It slides smoothly from the right (`transition: right 0.35s cubic-bezier(0.16, 1, 0.3, 1)`).
- Must always support:
  - Tapping backdrop (`#side-drawer-backdrop`) to close.
  - Tapping close icon (`.side-drawer-close`) to close.
  - Pressing `Escape` key to close.
  - Tapping any navigation link (`.duo-nav-item`) to close.

### 3.4 Toast & Snackbar Dual-Mode Behavior
- **Desktop (`> 768px`)**:
  - Position: `top: calc(var(--nav-height) + 14px); right: 24px; bottom: auto; left: auto;`
  - Motion: Slides down from just below the top navbar (`translateY(-20px)` to `translateY(0)`).
- **Mobile (`≤ 768px`)**:
  - Position: `top: auto; bottom: 76px; left: 16px; right: 16px; width: auto; max-width: calc(100vw - 32px);`
  - Motion: Converts into a native bottom snackbar sliding up (`translateY(30px)` to `translateY(0)`).
  - Docked safely at `bottom: 76px` to never obstruct bottom floating action buttons.

### 3.5 Floating Vibe FAB (`#floating-vibe-fab`)
- Visible on mobile & tablet viewports (`≤ 992px`) where the navbar music button is hidden.
- Docked at bottom-right (`right: 20px; bottom: 24px;` or `right: 14px; bottom: 18px;` on small screens).
- Synchronizes with `toggleMusicVibe()`:
  - Playing: Adds `.playing` class, runs 3-bar equalizer animation, pulses ring, label reads `Grooving`.
  - Paused: Stops animation, label reads `Vibe`.

---

## 4. Web Accessibility (a11y) Guidelines

Adhere strictly to **WCAG 2.1 AA** standards:

### 4.1 Color Contrast
- Normal body text and descriptions must maintain at least **4.5:1** contrast ratio against their immediate background in both themes.
- Large headings, badges, and active icons must maintain at least **3:1** contrast ratio.
- Never use low-contrast text like `#94a3b8` on pure white backgrounds, or `#64748b` on pitch-black backgrounds.

### 4.2 Keyboard Navigation & Focus
- Every interactive element (buttons, links, drawer toggles, FABs) must be reachable via `Tab` and activatable via `Enter` or `Space`.
- Modals (`#cmd-palette-backdrop`, `#project-modal-backdrop`, `#side-drawer`) must dismiss on `Escape`.
- Maintain visible focus indicators:
  ```css
  :focus-visible {
      outline: 2px solid var(--accent-cyan);
      outline-offset: 3px;
  }
  ```

### 4.3 Semantic HTML & ARIA
- Interactive triggers MUST be `<button>` or `<a href="...">` elements, never unadorned `<div>` or `<span>` without keyboard handlers and roles.
- Use explicit `aria-label` on icon-only buttons (e.g., `#hamburger-btn`, `#theme-toggle-btn`, `#open-cmd-btn`, `.side-drawer-close`, `.back-to-top`).
- Use `aria-hidden="true"` on decorative icons (`<i class="...">`).

### 4.4 Touch Target Sizing
- All interactive mobile targets (buttons, links, FABs, chips) must have a minimum tap area of **$44 \times 44\text{px}$** (or $40\text{px}$ with padding) to ensure effortless touch interaction.

---

## 5. Development, Verification & Deployment Checklist

Before committing or pushing changes:

1. **Syntax Verification**:
   ```powershell
   node -c js/data.js js/main.js js/scene3d.js server.js
   ```
2. **Local HTTP Validation**:
   ```powershell
   Invoke-WebRequest -Uri "http://127.0.0.1:3000" -UseBasicParsing | Select-Object StatusCode
   ```
3. **Dual-Theme Verification**:
   - Toggle theme button (`#theme-toggle-btn`) and verify both light and dark mode appearance.
   - Inspect cards, metric strips, philosophy badges, and timeline in light mode to confirm zero washed-out elements.
4. **Responsive Verification**:
   - Test viewport at $1440\text{px}$ (Desktop), $820\text{px}$ (iPad/Tablet), $390\text{px}$ (iPhone Pro), and $360\text{px}$ (Compact Android).
   - Ensure the hamburger button is never pushed off-screen.
   - Ensure the side drawer opens smoothly and the FAB functions properly.
5. **Git Commit Standard**:
   - Use conventional commit messages: `feat(...)`, `fix(...)`, `refactor(...)`.
   - Push to `origin/main`.
