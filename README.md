# meAsYC - Advanced Portfolio Ecosystem

A dynamic portfolio built with Next.js, Framer Motion, and Tailwind CSS. Features immersive theme-driven animations ("Hell Fire" & "Celestial") and a built-in admin panel for content management.

Demo link: https://yc-mu-three.vercel.app/

## 🚀 Features

- **Dynamic Themes**: Switch between "Celestial" (Tech/Dark), "White Heaven" (Elegant/Light), and "Hell Fire" (Aggressive/Red).
- **Admin Panel**: Manage projects, education, experience, and site content live.
- **Bento Layout**: Modern grid-based project showcasing.
- **Pluggable Games**: Interactive game section for visitor engagement.
- **Spam Protection**: Integrated Cloudflare Turnstile verification.
- **Mailing Ready**: Pre-configured API for contact form transmissions with Resend.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4 + Framer Motion
- **Database**: Supabase
- **Security**: Cloudflare Turnstile
- **Icons**: Lucide React

## ⚙️ Setup

1. **Clone & Install**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Copy `.env.local.example` to `.env.local` and fill in your keys:
   - Supabase URL & Anon Key
   - Admin Password (for `/admin`)
   - Cloudflare Turnstile Keys
   - Resend API Key (Optional)

3. **Database Setup**:
   Run the provided `supabase_setup.sql` in your Supabase SQL editor to create the necessary tables.

4. **Development**:
   ```bash
   npm run dev
   ```

## 🔐 Admin Panel
Access the management dashboard at `/admin`. The default password is set in your `.env.local`.

---
Built with ⚡ by Yashkumar Mayani.
