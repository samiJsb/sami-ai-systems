# Samuel AI — Intelligent Project Workspace & Executive Insights SaaS

Welcome to **Samuel AI** (originally known as *Nexus AI*), a production-grade, full-stack enterprise project management workspace and automated intelligence system. 

Engineered with a high-contrast dark aesthetic, this workspace streamlines complex business projects, coordinates collaborative task containers, and integrates server-side **Google Gemini AI** to automatically evaluate active projects, uncover strategic expansion opportunities, flag systemic bottlenecks, and generate executive summaries.

---

## 🚀 Key Features & System Architecture

### 1. Unified Project & Task Workspace
* **Project Container Hub**: Create, edit, and track business projects categorized by status indicators (`Active`, `Completed`, `Archived`).
* **Multi-User Permission & Ownership Matrix**: Secure user schemas where projects remain strictly owned by their creators, while support for secure team member assignments enables clean workspace transparency.
* **Faceted Search & Filters**: Instant full-text searching and status sorting controls to manage complex enterprise task backlogs.

### 2. Live AI Insights & Analytics Engine
* **Automated Risk Assessment**: The AI engine scans project descriptions and parameters to surface hidden timeline risks or critical bottleneck areas.
* **Business Opportunity Spotter**: Translates high-level project targets into concrete suggestions for revenue streams, partnerships, or scale-up plans.
* **Instant Executive Briefings**: Generates highly legible executive summaries of project collections for fast leadership decision-making.

### 3. High-Performance Diagnostics & Terminal Logs
* **Cinematic Live Logging Desk**: An animated logging monitor styled as a real-time console. It continuously updates simulated system steps, task processing checkpoints, and worker queue flags.
* **Resource Matrix Monitor**: Live gauges showing system CPU loads, active user sockets, and system memory heap distributions (`heapUsed` and total buffers).

---

## 🛠️ Technology Stack & Dependencies

* **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React, and **motion/react** (for high-fidelity fluid card entry effects, staggering transitions, and terminal log tickers).
* **AI Model Engine**: `@google/genai` (utilizing server-side Gemini 2.5 Flash for prompt analysis and fast output stream generation).
* **Backend Platform**: Modular Node.js / Express web server, fully optimized for static client builds and secure API endpoint routing.
* **Durable Datastore**: Google Firebase Firestore (maintaining collections for `/users`, `/projects`, and `/projects/{id}/insights`).

---

## 💻 Local Installation & Setup Guide

Get Samuel AI up and running on your local computer in five simple steps:

### Prerequisites
Before you begin, make sure you have installed:
* **Node.js** (v18.0.0 or higher)
* **npm** (v9.0.0 or higher)

### Step-by-Step Launch

1. **Clone the folder and navigate to the directory**:
   ```bash
   git clone https://github.com/your-username/samuel-ai-workspace.git
   cd samuel-ai-workspace
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the root folder to house server ports and private API tokens:
   ```env
   PORT=3000
   NODE_ENV=development
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(Note: Never check actual API keys directly into public repositories or shared git histories.)*

3. **Install Dependencies**:
   Install all compiled libraries and package bundles:
   ```bash
   npm install
   ```

4. **Boot Up the Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to: 👉 **`http://localhost:3000`**

5. **Production Build & Verification**:
   To bundle static frontend assets and start the high-performance standalone server:
   ```bash
   npm run build
   npm run start
   ```

---

## 🔒 Firebase Datastore Schema & Security Invariants

Our secure data integration establishes reliable ownership parameters to protect sensitive project information:

* **User Verification**: Unverified logins are rejected. Every profile corresponds directly to authenticated user states.
* **Ownership Invariants**: Read and write requests on project files are strictly limited to the creator of the container (`ownerId == request.auth.uid`).
* **Nested Secrets**: Strategic insights and risk cards are nested directly under parent project rules (`/projects/{projectId}/insights/{insightId}`) preventing unauthorized cross-user scraping.

---

## 🐙 Step-by-Step Git Commit & Push Guide

Follow these commands in your command terminal to stage and push your workspace changes cleanly and professionally to your GitHub account:

### Initialize Git & Initial Check-In
If you are initializing tracking on a fresh repository:
```bash
# 1. Initialize local Git tracker
git init

# 2. Stage all project files (respecting .gitignore)
git add .

# 3. Create your inaugural commit
git commit -m "feat: launch high-performance Samuel AI workspace and terminal monitoring ledger"
```

### Clean Stage-by-Stage Commits
Organize your project updates with highly professional commit logs:

* **When editing Contexts, Firebase connectors, or Auth hooks**:
  ```bash
  git add src/context/ src/lib/
  git commit -m "refactor: optimize project state contexts and Firebase insight security rules"
  ```

* **When styling the visual layout or modifying CSS parameters**:
  ```bash
  git add src/index.css src/components/
  git commit -m "style: polish dark high-contrast dashboard grids and terminal animation loops"
  ```

* **When updating UI pages, search controls, or project forms**:
  ```bash
  git add src/pages/
  git commit -m "feat: complete active search query filters and detail insight forms"
  ```

### Pushing Code to Your Remote GitHub Account
1. Create a new, blank repository named `samuel-ai-workspace` on your [GitHub dashboard](https://github.com).
2. Connect your local directory and upload the code:
   ```bash
   # Add your repository remote URL
   git remote add origin https://github.com/your-username/samuel-ai-workspace.git

   # Set primary branch name to main
   git branch -M main

   # Push to main branch online
   git push -u origin main
   ```

> **Note on "nothing to commit, working tree clean":**
> If you run `git commit` and see this prompt, your workspace modifications are already fully committed locally. Simply run `git push origin main` directly to upload your changes!

