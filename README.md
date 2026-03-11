# CleanLoop - Just a Click Away ♻️

**CleanLoop** is a modern, smart, and eco-conscious waste management platform designed to make garbage collection as simple as ordering a pizza. Built with a premium aesthetic and powered by a robust tech stack, it connects users with professional disposal services for various waste categories.

## ✨ Core Features

-   **Smart Scheduling**: Book waste collection for Organic, Recyclable, Electronic, Hazardous, or General waste in seconds.
-   **User Roles**: Separate interfaces for **Customers** and **Admins**.
-   **Admin Dashboard**: Comprehensive overview for administrators to manage users, monitor all bookings, and update collection statuses.
-   **My Bookings**: Real-time tracking of personal collection history and statuses for users.
-   **Premium UI/UX**: High-end design using Tailwind CSS with glassmorphism, smooth animations (blobs, floats), and the modern *Outfit* typeface.
-   **Supabase Integration**: Secure authentication and real-time data persistence.

## 🚀 Tech Stack

-   **Frontend**: React 18 with TypeScript
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS (with custom design system & animations)
-   **Icons**: Lucide React
-   **Backend/BaaS**: Supabase (Auth & Database)
-   **Deployment Strategy**: Ready for Vercel/Netlify

## 🛠️ Project Structure

```text
src/
├── components/         # UI Components (Admin, Booking, Home, etc.)
├── constants/          # Static data (Waste categories, etc.)
├── lib/               # Third-party configurations (Supabase client)
├── services/          # API & Business logic (Supabase interactions)
├── types/             # TypeScript interfaces and types
├── App.tsx            # Main Application routing and state
└── index.css          # Global styles and Tailwind layers
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
-   **Node.js** (v18.x or higher)
-   **npm** or **yarn**

## ⚙️ Setup & Execution

### 1. Clone the repository
```bash
git clone <repository-url>
cd CleanLoop
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Locally
Start the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

### 5. Build for Production
```bash
npm run build
```

## 🔐 Admin Access
To access the Admin Portal:
1.  Sign up as a user.
2.  Set the user role to `admin` in the Supabase `profiles` table OR use the default admin email `admin@cleanloop.com` (if configured in `App.tsx`).

