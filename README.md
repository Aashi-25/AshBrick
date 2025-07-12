<!-- HEADER BANNER -->

<p align="center">
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=400&size=20&duration=5000&pause=1000&color=4CAF50FF&background=00000000&center=true&vCenter=true&lines=%F0%9F%9A%A7+Welcome+to+AshBrick!;Build+Smarter.+Supply+Faster.+Trade+Greener." alt="Welcome animation for AshBrick" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Built%20with-Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Auth-Role%20Based%20Access-blue?style=for-the-badge&logo=auth0&logoColor=white" />
</p>

---

<p align="center" style="font-size:1.3em; font-family:'Arial', sans-serif">
  <strong>🏗️ AshBrick: Connecting Buyers, Suppliers & Admins in the Brick Trade</strong><br>
  <em>A full-stack B2B platform for seamless procurement, order management, and supply-chain visibility—powered by Supabase.</em>
</p>

---

## 📸 Screenshots

<p align="center">
  <img src="https://res.cloudinary.com/dtjjgiitl/image/upload/q_auto:good,f_auto,fl_progressive/v1752353504/wrpsi6mgwqsnz8mz9pao.jpg" width="45%" alt="Buyer Dashboard" />
  &nbsp;
  <img src="https://res.cloudinary.com/dtjjgiitl/image/upload/q_auto:good,f_auto,fl_progressive/v1752353555/vujyzcdfe8jxbjelywpc.jpg" width="45%" alt="Supplier Panel" />
</p>

---

## 🌟 AI-Powered AshBrick: Features & Tech in Plain Language

### 🤖 1. AI Matchmaking Assistant

* **What it does**: Like a dating app for fly ash! Finds best plant-factory matches based on distance, quality, pricing.
* **Tech Used**:

  * **Llama LLM** for natural language queries
  * **Agentic AI** for deal negotiation automation

### 🔮 2. Smart Supply Predictor

* **What it does**: Forecasts ash availability and demand trends.
* **Tech Used**:

  * **ML Models** (scikit-learn)
  * Power plant data + permit data

### 📄 3. Instant Report Generator

* **What it does**: Auto-generates ESG, compliance, and contract reports.
* **Tech Used**:

  * Llama-powered **Generative AI**
  * Prebuilt dynamic templates

### 🗣️ 4. Voice Chat Helper

* **What it does**: Talk to the app! Commands like "Find cheap ash near Delhi."
* **Tech Used**:

  * **Speech Recognition**
  * **Llama LLM** for NLP

### 📊 5. Smart Deal Advisor

* **What it does**: Recommends negotiation changes ("Add 5% discount for early pay")
* **Tech Used**:

  * **Reinforcement Learning** + Agentic AI

---

### 🛠️ Technology Requirements Simplified

| AI Feature        | Requirements              | Difficulty |
| ----------------- | ------------------------- | ---------- |
| Matchmaking       | Llama 7B, basic logic     | Easy 🟢    |
| Prediction Engine | Python, scikit-learn      | Medium 🟡  |
| Report Generator  | jsPDF + LLM templates     | Easy 🟢    |
| Voice Chat        | Browser mic + Llama       | Medium 🟡  |
| Deal Advisor      | LangChain + prebuilt bots | Hard 🔴    |

---

## 🔄 Full Conversation Flow Example

**Raj (Plant Manager)**

🎤 *"List 500 tons ash from Mumbai plant"*

**AI Assistant**

💬 *"Listing created! Quality score 92%. I've found 4 buyers nearby. Top match: EcoBricks needs 200 tons. Should I negotiate?"*

**Raj**

🐟 *Clicks "Start Negotiation"*

**AI Agent (Plant)**

🤖 *"We offer 200 tons at ₹170. Free loading included."*

**AI Agent (Factory)**

🤖 *"Can do ₹160 if you cover transport permits."*

**AI Mediator**

💡 *"Compromise: ₹165/ton with shared permits. Deal?"*

**Both**

✅ *Click "Accept"*

**System**

📢 *"Deal closed! Truck dispatched. Estimated CO₂ savings: 15,000 kg 🌱"*

---

### 🛠️ Tech Stack Summary

| User Action       | AI Feature         | Tech Stack               |
| ----------------- | ------------------ | ------------------------ |
| Voice commands    | Speech-to-Intent   | Web Speech API + Llama   |
| Finding suppliers | Smart Matching     | Python + Scikit-learn    |
| Price negotiation | Agentic Bargaining | LangChain Framework      |
| Document creation | Generative Reports | Llama + jsPDF            |
| Impact tracking   | CO₂ Calculator     | JavaScript Custom Logic  |
| Notifications     | Smart Alerts       | Firebase Cloud Messaging |

---

## 🌍 About the Project

**AshBrick** is a smart procurement and supply-chain management platform tailored for the construction industry, enabling:

* Buyers to explore and order construction materials.
* Suppliers to list, manage, and fulfill orders.
* Admins to control users, approve listings, and oversee analytics.

Built with **React**, **Tailwind CSS**, and **Supabase**, AshBrick provides a fast, secure, and scalable solution to modernize how brick and material trade operates in India and beyond.

---

## 🔒 Role-Based Access System (RBAC)

AshBrick features secure, role-based authentication powered by **Supabase Auth** and custom JWT claims. There are three roles:

* **Buyer**: Can browse products, place orders, and track deliveries.
* **Supplier**: Can list products, update inventory, and fulfill orders.
* **Admin**: Can manage users, approve suppliers, and monitor operations.

---

## 📊 Features

* 🌍 **Buyer Dashboard** with cart, filters, past orders.
* 🚚 **Supplier Panel** to manage products & inventory.
* 🧱 **Admin Control Center** to approve suppliers and monitor activity.
* 🔑 **JWT-based Role Authorization** for protected routes.
* ✅ **Login/Logout** using **Supabase's email-based OTP login**.
* 💡 **Modular Component Structure** with clean UI using Tailwind.

---

## 🔧 Tech Stack

|     Frontend    |    Backend & Auth    |  Database & Hosting  |
| :-------------: | :------------------: | :------------------: |
| ⚛️ React (Vite) |   🟢 Supabase Auth   | 📃 Supabase Postgres |
| 🎨 Tailwind CSS | 🔐 JWT Role Handling | ☁️ Vercel Deployment |

---

## 🚢 System Architecture

```mermaid
graph TD
  User[User] -->|Login| Frontend
  Frontend -->|Auth| SupabaseAuth
  Frontend -->|Data Fetch| Database
  Frontend -->|Role Context| JWTHandler
  JWTHandler -->|Access Control| Database

  classDef frontend fill:#61dafb,stroke:#222;
  classDef backend fill:#3ECF8E,stroke:#222;
  classDef db fill:#ffa000,stroke:#222;
  classDef auth fill:#673ab7,stroke:#222;

  class Frontend frontend
  class SupabaseAuth auth
  class Database db
  class JWTHandler backend
```

---

## 🌐 Folder Structure

```bash
ashbrick/
├─ src/
│  ├─ components/       # UI Components
│  ├─ pages/            # Page-level views
│  ├─ context/          # Auth & Role Context
│  ├─ lib/              # Supabase Client & Helpers
│  └─ styles/           # Tailwind Config
├─ public/
├─ .env.local           # Environment Variables
└─ README.md
```

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
https://github.com/<your-username>/ashbrick.git

# 2. Install dependencies
npm install

# 3. Add .env.local
SUPABASE_URL=...
SUPABASE_ANON_KEY=...

# 4. Run locally
npm run dev
```

---

## 📊 Database Schema (Supabase)

* **users**: id, email, role
* **products**: id, title, price, category, description, image
* **orders**: id, buyer\_id, product\_id, status, quantity
* **suppliers**: id, user\_id, approved

---

## 💡 APIs & Routes

* `/api/login` – Supabase OTP sign-in
* `/products` – GET all products
* `/orders` – Create/view orders (based on role)
* `/admin` – Role-protected admin actions

---

## 🛡️ Security

* Role-based protected routes via Context + Supabase Session
* Server-side checks for actions like order placement, approval
* JWT tokens signed & validated by Supabase Auth

---

## 📄 Contributors

