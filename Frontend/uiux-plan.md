# Eatly MVP Phase 1 — UI Development Plan (Complete Screen List)

> **Source of Truth** for all product UI/UX requirements throughout development.

---

## Screen Flow Summary (Correct Order)

### Marketing Side

1. Landing Page
2. Pricing Page

### Product Side (App)

3. Signup Screen
4. Login Screen
5. Welcome Onboarding Screen
6. Dashboard Screen
7. Upload Menu Screen
8. Scanning / Processing Screen
9. Scan Results Screen
10. Dish Details Screen
11. Scan History Screen
12. Upgrade Screen
13. Payment Checkout Screen ❌
14. Subscription Success Screen ❌
15. Profile / Account Screen ✅
16. Error / Empty States
17. Terms & Privacy Pages

---

## 1. Landing Page (Marketing Website)

**Purpose:** First screen a user sees. Instantly explain what Eatly is, build trust, and push toward the main CTA: _Try Eatly Free_.

### Hero Section

- **Headline:** "Scan any restaurant menu. Eat healthy anywhere."
- **Subheadline:** "Eatly tells you what each dish is, whether it's veg/non-veg, and which meals are healthy."
- **Primary CTA:** "Try Eatly Free"
- **Secondary CTA (optional):** "See Demo"

### Demo / Product Preview Section

- Show the transformation visually: **Menu Photo → AI Results**
- Can be a static image for MVP — critical for trust

### Benefits Section

- Understand dishes instantly
- Veg/non-veg detection
- Healthy vs unhealthy rating
- Top recommended dishes

### How It Works Section (3 steps)

1. Upload menu photo
2. Eatly analyzes it
3. Get healthy recommendations instantly

### Testimonials / Social Proof Section (Optional)

- "Trusted by travelers, gym people, and food lovers"

### Pricing Preview Section

- Free vs Pro summary with CTA

### Footer

- Privacy Policy
- Terms
- Contact email
- Social links

---

## 2. Pricing Page (Marketing Website)

**Purpose:** Clearly show Free vs Pro and push toward upgrading.

### Pricing Cards

- **Free** — list features + scan limits
- **Pro** — visually more premium, highlighted

### FAQ Section

- "How accurate is it?"
- "Does it work in India?"
- "Can I scan any language menu?"
- "Can I cancel anytime?"

### CTA Buttons

- "Start Free"
- "Upgrade to Pro"

---

## 3. Sign Up Screen (Authentication)

**Purpose:** Reduce friction, get user into the app quickly.

### Options

- Continue with Google
- Continue with Email

### Micro-copy

- "We don't store your card unless you upgrade."

### Links

- Already have an account? Login
- Terms and Privacy links

---

## 4. Login Screen (Authentication)

**Purpose:** Returning users access the dashboard.

### Elements

- Email + password login
- Google login
- Forgot password
- Back to landing page link

> Must match Signup UI for consistency.

---

## 5. Onboarding Welcome Screen (First Time Only)

**Purpose:** Shown only on first login. Give clarity and push user to scan immediately.

### Welcome Message

"Welcome to Eatly. Scan a menu and we'll instantly tell you what's healthy and what to avoid."

### Primary CTA

- "Upload Your First Menu"

### Optional Mini Steps (very light)

1. Upload menu photo
2. Get health ratings
3. Find best dishes instantly

> Should NOT feel like a long tutorial. Push action.

---

## 6. Main Dashboard Screen (Home Screen)

**Purpose:** Core home screen. Make the next action obvious.

### Header Navigation

- Eatly logo
- Dashboard
- Scan History
- Pricing/Upgrade
- Profile/Account

### Main CTA Section

- Big card: "Upload a Menu Photo"
- Button: "Scan Menu Now" (primary focus)

### Recent Scans Preview

- Last 3 scanned menus
- Each shows: restaurant/menu name, date, badge (e.g., "12 items analyzed")
- Click to open results

### Scan Limit Indicator

- "You have 2 free scans left." (creates urgency, not annoying)

---

## 7. Upload Menu Screen (Core Action Screen)

**Purpose:** Where user uploads the menu image. Must feel smooth and premium.

### Upload Box / Drag & Drop

- Drag and drop or browse files
- Supported: JPG, PNG (PDF optional)

### After Upload

- Show image preview clearly

### Buttons

- "Scan Menu" (primary)
- "Replace Image" (secondary)
- "Cancel" (back to dashboard)

### Optional Input

- "Restaurant Name (optional)" — improves scan history clarity

---

## 8. Scanning / Processing Screen (Loading Experience)

**Purpose:** Build trust and excitement while AI processes the menu.

### Progress Indicator

- Progress bar or animated loader

### Step-by-step Text Updates

1. Extracting menu text
2. Identifying dishes
3. Detecting veg/non-veg
4. Analyzing health score
5. Generating recommendations

### Estimated Time

- "Usually takes 10–20 seconds."

---

## 9. Scan Results Screen — ⭐ MOST IMPORTANT

**Purpose:** The "magic moment." Delivers core value. Users decide here if Eatly is worth paying for.

### Top Summary Header

- Menu Name / Restaurant Name
- Location (optional)
- Total dishes detected (e.g., "24 items analyzed")
- Scan date

### Scan Summary Cards

| Card            | Count |
| --------------- | ----- |
| Healthy dishes  | 8     |
| Moderate dishes | 10    |
| Avoid dishes    | 6     |
| Veg items       | 15    |
| Non-veg items   | 9     |

### 9.1 Menu Items List

Each dish card shows:

- Dish Name (bold)
- Veg/Non-veg badge
- Health badge (Healthy / Moderate / Avoid)
- One-line explanation
- "View Details" button (optional)

> Example: _"Masala Dosa — Veg — Healthy. Crispy dosa with potato filling, served with chutney."_

### 9.2 Filters & Sorting

**Filters:** Veg only | Non-veg only | Healthy only | Moderate only | Avoid only

**Sort by:** Healthiest first | Most unhealthy first | Alphabetical

### 9.3 Top Recommendations Section (High Value)

- Pinned at top or as a card above menu list
- Top 5 healthiest picks with one-line reason
- Example: _"Grilled Chicken Salad — high protein, low oil."_

### 9.4 Scan Limit & Upgrade Prompt (subtle)

- "You have 1 scan left. Upgrade for unlimited scans."
- Must NOT interrupt results display

---

## 10. Dish Details Screen (Single Dish Deep Dive)

**Purpose:** Detailed explanation for one dish. Increases trust, premium feel.

### Sections

- **Dish Title:** Name + Veg/Non-veg badge + Health badge
- **Dish Explanation:** Plain English description
- **Ingredients:** Estimated ingredient list
- **Cooking Style:** e.g., "Likely fried / grilled / steamed / baked"
- **Health Reason:** Why it got its rating (e.g., "Avoid because it is deep fried and contains heavy cheese.")
- **Best For / Avoid If:**
  - Best for: protein diet
  - Avoid if: weight loss, diabetes
- **Back Button:** Back to results list

---

## 11. Scan History Screen ✅ (Retention Screen)

**Purpose:** Helps users return and reuse scans. Critical for SaaS retention.

### Scan Card Shows

- Restaurant/menu name
- Date
- Number of dishes analyzed
- Tags: "Healthy: 7 / Avoid: 5"

### Actions per Scan

- View results
- Delete scan (optional)
- Rename scan (optional)

### Search Bar

- Search scans by restaurant name

---

## 12. Upgrade / Paywall Screen ✅

**Purpose:** Convert users into paying customers.

**Triggered when:**

- User reaches scan limit
- User clicks upgrade button
- User tries to scan without credits

### Value-Based Messaging

"Unlock unlimited menu scans + full recommendations."

### Plan Comparison: Free vs Pro

**Pro Benefits:**

- Unlimited scans
- Faster processing
- Full dish breakdown
- Unlimited history storage
- Best recommendations every scan

### CTA

- "Upgrade to Pro"

---

## 13. Payment Checkout Screen ❌

**Purpose:** Handle subscription purchase.

- Recommended: **Stripe Checkout** for MVP
- Shows: plan name, monthly/yearly price, card entry, pay button

---

## 14. Subscription Success Screen ❌

**Purpose:** Post-payment confirmation and positive reward moment.

- "Welcome to Eatly Pro 🎉"
- "You now have unlimited scans"
- CTA: "Scan a Menu Now"

---

## 15. Profile / Account Settings Screen ✅

**Purpose:** Manage SaaS account.

### User Info

- Name, Email

### Subscription Info

- Current plan (Free / Pro)
- Renewal date (if Pro)
- Upgrade button

### Manage Subscription

- "Manage Billing" (opens Stripe portal)

### Logout

- Simple logout button

---

## 16. Error / Empty States ✅

**Purpose:** Handle AI/OCR failures gracefully so the product doesn't feel broken.

### 16.1 Upload Error State

> "Unsupported file format. Upload JPG/PNG."

### 16.2 OCR Failed State

> "We couldn't read this menu. Please upload a clearer image."

- Try again button
- Tips: better lighting, avoid blur

### 16.3 No Dishes Detected State

> "No menu items detected. Try a different photo."

### 16.4 Server Error State

> "Something went wrong. Please try again."

---

## 17. Legal Screens ✅ (SaaS Requirement)

**Purpose:** Basic legal compliance for MVP.

- Privacy Policy Page (static)
- Terms & Conditions Page (static)
