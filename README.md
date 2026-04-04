# Eatly
> AI-powered smart menu analyzer that translates, detects dietary restrictions, and provides health ratings for restaurant dishes worldwide.

## 🔗 Demo
[![Eatly Demo Video](https://img.youtube.com/vi/pRQjLgnm-l0/maxresdefault.jpg)](https://youtu.be/pRQjLgnm-l0)

## 📋 Description
Eatly solves the anxiety and confusion of dining in unfamiliar places by using AI to decode complex or foreign restaurant menus. Travelers and people with strict dietary restrictions (like vegans, or those avoiding specific meats like beef) use Eatly to instantly scan a menu and understand exactly what is in a dish. Built with a ridiculously fast Bun/Hono backend and an interactive React frontend, Eatly acts as a pocket translator and personal nutritionist.

## ⚙️ Tech Stack
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge&logo=react)
![Bun](https://img.shields.io/badge/bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)
![Hono](https://img.shields.io/badge/hono-%23E36002.svg?style=for-the-badge&logo=hono&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-%238E75B2.svg?style=for-the-badge&logo=google&logoColor=white)

## ✨ Features
* **AI Vision Menu Scanner**: Take a picture of any menu and instantly extract the items using Gemini Vision.
* **Smart Dietary Detection**: Automatically flags veg/non-veg status and highlights hidden ingredients (e.g., beef broths or allergens).
* **AI Health Scoring**: Rates dishes as Healthy, Moderate, or Avoid, complete with a detailed localized justification.
* **Freemium Subscription Model**: Secure, recurring Stripe integration gating advanced features and unlimited scans.
* **Lightning Fast Backend**: Built directly on Bun and Hono to ensure sub-millisecond route resolution.
* **Scan History Dashboard**: Users can review previously scanned menus and tracked dietary insights.

## 🔄 How It Works
1. User travels to a new city and scans a confusing local restaurant menu.
2. The image is compressed and sent to the Bun/Hono Backend.
3. Eatly securely forwards the image and dietary context to the Gemini Vision API.
4. Gemini extracts dish names, translates them, and analyzes ingredients against the user's profile.
5. The AI identifies specific dietary restrictions (e.g., hidden beef) and assigns a health score.
6. The Backend parses the data into structured JSON format to store in PostgreSQL.
7. Eatly presents the filtered, safe recommendations to the user on an interactive React dashboard.

```text
User Scans Menu → Frontend UI → Bun/Hono Backend → Gemini Vision API → Extract & Analyze Intents → Persist via Prisma → Return Safe Dietary Results
```

## 📁 Project Structure
```
Eatly/
├── Frontend/           # React workspace
│   ├── src/pages/      # Route-level components (Home, Dashboard, Scan, Upgrade)
│   ├── src/components/ # Reusable UI components (shadcn/ui, Feature blocks)
│   ├── src/stores/     # Zustand state management (Authentication)
│   └── package.json    # Vite setup and client dependencies
└── Backend/            # Bun/Hono Workspace
    ├── src/routes/     # Core API Endpoints (Auth, Scans, Subscriptions)
    ├── src/services/   # External integrations (Stripe, Gemini, Cloudinary)
    ├── prisma/         # PostgreSQL Schema & migrations
    └── package.json    # Server dependencies
```

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) & [Bun](https://bun.sh/) installed.
* A PostgreSQL instance.
* API Keys for Stripe, Firebase, and Google Gemini.

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/kumarlalit79/Eatly-SaaS.git
cd Eatly-SaaS
```

**2. Setup Backend**
```bash
cd Backend
bun install
bunx prisma db push
bun run dev
```

**3. Setup Frontend**
```bash
cd ../Frontend
npm install
npm run dev
```

### Environment Variables
**Frontend (`Frontend/.env`)**
| Variable | Description | Example |
| -------- | ----------- | ------- |
| `VITE_API_URL` | Hono Backend URL | `http://localhost:3000/api` |
| `VITE_FIREBASE_API_KEY` | Firebase Client Key | `AIzaSyB...` |

**Backend (`Backend/.env`)**
| Variable | Description | Example |
| -------- | ----------- | ------- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/eatly` |
| `GEMINI_API_KEY` | Google Vertex/Gemini Key | `AIzaSy...` |
| `STRIPE_SECRET_KEY` | Stripe Server Key | `sk_test_...` |
| `STRIPE_PRO_PRICE_ID` | Price ID for the $9 plan | `price_1P...` |
| `FIREBASE_PROJECT_ID` | Firebase Admin ID | `eatly-saas-123` |
| `FRONTEND_URL` | CORS Policy URL | `http://localhost:5173` |

## 🔌 API Endpoints
| Method | Route | Description |
| ------ | ----- | ----------- |
| `POST` | `/api/auth/verify` | Verifies a Firebase JWT token |
| `GET`  | `/api/users/profile` | Fetches authenticated user profile |
| `POST` | `/api/scans/analyze` | Receives image data and triggers Gemini AI pipeline |
| `GET`  | `/api/scans/history` | Returns paginated previous menu scans from PostgreSQL |
| `POST` | `/api/subscription/create-checkout` | Initializes a Stripe checkout session |
| `POST` | `/api/subscription/webhook` | Listens for Stripe billing events |

## 👤 Author
Lalit Kumar — GitHub: [kumarlalit79](https://github.com/kumarlalit79)
