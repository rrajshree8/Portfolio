# Portfolio Website

This is a modern, animated portfolio website built with Next.js, React, and EmailJS for contact form functionality. It features smooth animations, responsive design, and a fully functional contact form that sends messages directly to your email using EmailJS (no backend password required).

## 🚀 Live Demo

View the deployed site here: [https://rrajshree28.vercel.app/](https://rrajshree28.vercel.app/)

---

## ✨ Features
- Animated, interactive UI with React and GSAP
- Responsive design for all devices
- Projects, About, Skills, and Contact sections
- Contact form with real-time validation and email sending via EmailJS
- Easy to customize and deploy

---

## 🛠️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### 2. Install Dependencies
```bash
yarn install
# or
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory with your EmailJS credentials:

```
NEXT_PUBLIC_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_USER_ID=your_emailjs_public_key
```

- Get these values from your [EmailJS dashboard](https://dashboard.emailjs.com/).
- **Do not commit `.env.local` to GitHub.**

### 4. Run the Development Server
```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

---

## 📦 Deployment
This project is ready to deploy on [Vercel](https://vercel.com/) or any platform that supports Next.js.

- The live site is deployed at: [https://rrajshree28.vercel.app/](https://rrajshree28.vercel.app/)
- For production, set the same environment variables in your deployment platform's dashboard.

---

## 📁 Project Structure
- `components/` - All React components (Contact form, Hero, Projects, etc.)
- `pages/` - Next.js pages (main entry: `index.js`)
- `styles/` - SCSS and Tailwind CSS files
- `public/` - Static assets
- `.env.local` - Your local environment variables (not committed)

---

## ✉️ Contact Form (EmailJS)
- The contact form uses EmailJS to send emails directly from the frontend.
- No backend or password is required—just your EmailJS public keys.
- Make sure your EmailJS template uses the variables: `name`, `email`, `message`.

---

## 📝 License
This project is open source and free to use for personal portfolios.
