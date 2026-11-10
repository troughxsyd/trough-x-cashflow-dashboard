# TROUGH X CASHFLOW DASHBOARD

Modern React 18 single-page dashboard built with **Vite, Tailwind CSS, Lucide Icons, and Poppins typography**, styled in accordance with **TROUGH X brand guidelines** (White, Steel Grey `#2B2D42`, and Trough Yellow `#FFCC00`).

Designed for instant deployment via **GitHub** and **Vercel** with zero backend configuration needed.

---

## Features

* **Budget Simulator:**
  * Toggle between **Promoter Hosted ($5 clip)** and **Trough Owned (100% ticket retention)** models.
  * Direct numeric input and slider controls for Attendance (PAX up to 300), Bar Spend per Head ($), Ticket Yield ($), Cloakroom check-in % & fee, Beverage COGS %, and production overheads.
  * Live P&L financial statement with instantaneous gross margin, wage percentages, and net surplus recalculation.
  * Dynamic Breakeven Indicator (144 pax base, 121 pax with deposit).
* **Live Staffing Roster & Wage Calculator:**
  * Configurable staffing matrix tied to Trough X's flat-rate Individual Flexibility Agreements (IFAs: $55, $45, $35/hr, $50 medic).
  * Direct inline editing for position names, headcount, shift hours, hourly rates, and superannuation toggles (11.5% vs. agency/exempt).
  * Add and remove staff roles on the fly.
* **Forthcoming Calendar Pipeline:**
  * Pre-loaded with upcoming confirmed dates (Nov 2026 – Mardi Gras 2027) at 273 Crown Street.
  * Edit every date, promoter, model, attendance, bar forecast, ticket clip, and wage commitment.
  * Modal form to add upcoming events and automated pipeline totals.
* **Executive Report:**
  * Side-by-side reconciliation of the Friday 11 September historical event against current owned and promoter targets.
* **Full Persistence:**
  * Auto-saves changes to `localStorage` on every keystroke.
  * Single-click JSON backup export and import.
  * Reset to factory baseline benchmarks anytime.

---

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## Deploy to GitHub & Vercel (2 Minutes)

### Step 1: Push to GitHub

```bash
# Inside the trough-x-cashflow-dashboard directory:
git init
git add .
git commit -m "Initial commit of Trough X Financial Dashboard"

# Create a new repository on GitHub (e.g. trough-x-cashflow-dashboard), then:
git remote add origin https://github.com/<your-username>/trough-x-cashflow-dashboard.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **Add New...** > **Project**.
3. Import your `trough-x-cashflow-dashboard` repository from GitHub.
4. Vercel automatically detects **Vite**:
   * **Framework Preset:** Vite
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
5. Click **Deploy**.

Your live dashboard will be deployed with a custom HTTPS URL (e.g., `https://trough-x-cashflow-dashboard.vercel.app`) in under 60 seconds!
