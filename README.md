# 🌌 Indresh Hemani - 3D Developer Portfolio, Akasa Air MCP Server & IEEE Research

A state-of-the-art, interactive developer portfolio and engineering showcase built for **Indresh Hemani** (Senior Software Engineer at **Akasa Air**). Features an **Interactive Three.js 3D Universe**, real-time **Model Context Protocol (MCP) Live Playground**, deep-dive **Project Modals**, developer **Command Palette (`Ctrl+K`)**, and showcases peer-reviewed **IEEE Research**.

Zero build configuration required — ready for 1-click deployment on **GitHub Pages**!

---

## ✨ Key Highlights & Features

- 🤖 **Akasa Air MCP Server on ChatGPT**:
  - Direct integration with **ChatGPT** via Plugin/App ID: `plugin_asdk_app_69ef573311908191975c1bfb3baa12fc` ([Open in ChatGPT](https://chatgpt.com/plugins/plugin_asdk_app_69ef573311908191975c1bfb3baa12fc?q=akasa)).
  - Clean static portfolio preview showcasing the native **ChatGPT Conversation View** with real-time flight route cards, PNR booking verification, and web check-in.
  - Direct 1-click CTA to test live queries inside the official ChatGPT extension, keeping internal production endpoints and schemas unexposed.
- 📄 **IEEE 2024 Research Publication Showcase**:
  - Highlights co-authored peer-reviewed publication: *"Ai-Siot Hybrid Architecture for Seamless Integration of IoT in Smart Cities"*, presented at the **2024 IEEE 13th International Conference on Communication Systems and Network Technologies (CSNT 2024)**.
- ⚡ **Interactive Developer Command Palette (`Ctrl+K` / `Cmd+K`)**:
  - Fast keyboard-driven fuzzy search to jump to sections, trigger MCP tools, open project modals, copy contact info, or toggle themes.
- 🔍 **Interactive Project Deep-Dive Modals**:
  - Click any project card to open an expanded glassmorphic inspection window with architecture highlights, statistics, and live links.
- 🌌 **Three.js 3D Cybernetic Background with Shockwave Physics**:
  - Orbiting polyhedron, orbital rings, and dynamic particle starfield.
  - Interactive click physics: Clicking in the 3D space triggers expanding glowing shockwave particle rings.
- 🎨 **Sleek Cyberpunk Glassmorphism & Themes**:
  - Full support for dark and light modes with `localStorage` memory.
  - Specular 3D card tilt physics tracking cursor movement.

---

## 🛠️ Project Structure

```
D:/resume/
├── index.html              # Main HTML structure, MCP playground & modals
├── css/
│   └── style.css           # Glassmorphism, cyber terminal, animations & responsive styling
├── js/
│   ├── data.js             # Centralized portfolio data (Akasa Air, IEEE paper, projects)
│   ├── scene3d.js          # Three.js 3D WebGL engine & particle shockwave physics
│   └── main.js             # Command palette, project modal & tilt physics
└── assets/                 # Images, icons, and media
```

---

## 🚀 How to Run Locally

### 1. View Portfolio in Browser
- Double-click `index.html` in your file explorer, OR
- Right-click `index.html` in your IDE and choose **Open with Live Server**.

### 2. Run Local Python / Node Server
```bash
# Python
python -m http.server 8000
```
Then visit [http://localhost:8000](http://localhost:8000).

---

## ✈️ Akasa Air ChatGPT MCP Integration

- **ChatGPT Plugin / App Link:** [https://chatgpt.com/plugins/plugin_asdk_app_69ef573311908191975c1bfb3baa12fc?q=akasa](https://chatgpt.com/plugins/plugin_asdk_app_69ef573311908191975c1bfb3baa12fc?q=akasa)
- **App Identifier:** `plugin_asdk_app_69ef573311908191975c1bfb3baa12fc`
- Connects ChatGPT with real-time flight tracking, PNR status verification, fare discovery, and web check-in.

---

## 🌐 Deploy to GitHub Pages

Push the repository to GitHub under `Indresh10.github.io` or `resume`, then enable GitHub Pages in repository settings pointing to the `main` branch root (`/`). Zero build step needed!
