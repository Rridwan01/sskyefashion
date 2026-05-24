
# S Skye Fashion (SKYE Atelier)

An immersive, high-end luxury editorial fashion showcase, e-commerce storefront, showroom booking platform, and custom couture request system. Built using **Next.js 16 (App Router)**, **Tailwind CSS v4**, **Prisma ORM (PostgreSQL)**, **Stripe**, **Paystack**, and micro-interactions powered by **GSAP** & **Framer Motion**.

---

## ✦ Key Features

### 1. Immersive Editorial Storefront
- **Visual Museum Showcase**: Interactive, high-performance animated gallery and museum-style product displays utilizing `GSAP` and `Framer Motion` micro-animations.
- **Lenis Smooth Scroll**: Silky-smooth viewport scrolling for premium editorial feel.
- **Cart Slide-out & Zustand Store**: Client-side state management for cart operations, persisting across pages.

### 2. Custom Pieces (Atelier Requests)
- **Atelier Requests**: Customers can submit custom fashion requests, including sketches, materials, descriptions, and reference image uploads (hosted on Cloudinary).
- **Admin Review Flow**: Admins can approve, reject, or update request progress from their workspace.

### 3. Showroom Appointments
- **Scheduler**: Appointment booking system for virtual or physical consultations at one of our premium physical locations:
  - **Ibadan Atelier**
  - **NYC SoHo Atelier**
  - **Paris Rue Saint-Honoré**

### 4. Robust Administration Panel
- **Product Management**: Complete CRUD operations for items, collections, aesthetics, materials, and sizes.
- **Category Control**: Organize products into curated worlds.
- **Appointment & Request Review Dashboard**: Real-time management of client interactions.

### 5. Multi-Gateway Payments
- **Stripe**: For seamless international USD payments.
- **Paystack**: For local card and bank transactions tailored to African markets.

---

## 🛠️ Technology Stack

- **Core Framework**: [Next.js 16 (App Router)](https://nextjs.org/) & React 19
- **Database ORM**: [Prisma](https://www.prisma.io/) with PostgreSQL database
- **Authentication**: [NextAuth.js v5 (Beta)](https://authjs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS
- **Animations**: [GSAP](https://gsap.com/), [Framer Motion](https://www.framer.com/motion/), [Lenis Smooth Scroll](https://lenis.darkroom.engineering/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Media Storage**: [Cloudinary](https://cloudinary.com/)
- **Payment Processing**: [Stripe](https://stripe.com/) & [Paystack](https://paystack.com/)

---

## 📁 Directory Structure

```text
├── prisma/
│   ├── schema.prisma       # Database design
│   └── seed.ts             # Default mock data
├── public/                 # Static assets, hero images, product mockups
└── src/
    ├── app/
    │   ├── (admin)/        # Admin routing group & layouts
    │   ├── (editorial)/    # Storefront layout, authentication & catalog
    │   ├── actions/        # Server actions for Auth, Products, and Categories
    │   ├── api/            # API endpoints (Auth, Webhooks, Checkout gateways)
    │   └── layout.tsx      # Core root layout
    ├── components/
    │   ├── auth/           # Authentication UI components
    │   ├── contact/        # Contact forms
    │   ├── home/           # Editorial animations and landing structures
    │   ├── layout/         # Header, Footer, and Page Wrapper layouts
    │   ├── product/        # Cards and display variants
    │   ├── shop/           # Cart and slide-outs
    │   └── ui/             # Reusable core layout utilities (Buttons, Inputs)
    ├── lib/                # Client configurations (Stripe, Cloudinary, Prisma, Paystack)
    ├── store/              # Zustand global state (Cart Store)
    └── server/             # Authentication helper logic
```

---

## ⚙️ Environment Variables

Copy `.env.example` into a local `.env` file and populate it with your API keys:

```bash
cp .env.example .env
```

| Variable | Description |
| :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string |
| `STRIPE_SECRET_KEY` | Stripe Secret Key for payments |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Publishable Key for checkout pages |
| `NEXTAUTH_SECRET` | Secret key for hashing tokens in NextAuth |
| `NEXTAUTH_URL` | Application root URL (e.g. `http://localhost:3000`) |
| `PAYSTACK_SECRET_KEY` | Paystack Secret Key |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Paystack Public Key |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary storage account name |
| `CLOUDINARY_API_KEY` | Cloudinary authentication API key |
| `CLOUDINARY_API_SECRET` | Cloudinary authentication secret |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or later)
- PostgreSQL database instance

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Migration & Seeding
Initialize your database schema and run the seed script to fill it with editorial products and collections:

```bash
# Push database schema to PostgreSQL
npx prisma db push

# Seed the database
npx prisma db seed
```

### 3. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port defined in your `.env`) in your browser to view the application.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 💎 Customizing the Design
S Skye Fashion uses an elegant typography style and an HSL-tailored dark and light palette designed inside `src/app/globals.css`. If you want to modify custom color variables or visual elements, refer directly to `src/app/globals.css` and the Tailwind CSS configuration inside `eslint.config.mjs` and postcss inputs.
