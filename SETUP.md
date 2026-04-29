# Quick Setup Guide

## Option 1: Automatic Installation (Recommended)

1. **Double-click the `install.bat` file** in the project folder
2. Wait for installation to complete
3. Run `npm run dev` to start the development server

## Option 2: Manual Installation

Open Command Prompt or PowerShell in the project folder and run:

```bash
# Install production dependencies
npm install react react-dom react-router-dom emailjs-com framer-motion lucide-react

# Install development dependencies  
npm install -D @types/react @types/react-dom @vitejs/plugin-react autoprefixer postcss tailwindcss vite

# Start development server
npm run dev
```

## Option 3: Using Yarn (if npm doesn't work)

```bash
# Install dependencies
yarn add react react-dom react-router-dom emailjs-com framer-motion lucide-react
yarn add -D @types/react @types/react-dom @vitejs/plugin-react autoprefixer postcss tailwindcss vite

# Start development server
yarn dev
```

## Troubleshooting

If npm commands don't work:

1. **Check if Node.js is installed**: Run `node --version`
2. **Install Node.js**: Download from https://nodejs.org/ (LTS version recommended)
3. **Restart your terminal** after installation
4. **Try the install.bat file** again

## Once Running

- Open your browser to: `http://localhost:3000`
- The website will be live and ready for customization
- All features are functional except email (needs EmailJS setup)

## EmailJS Setup (for appointment booking)

1. Go to https://www.emailjs.com/
2. Create a free account
3. Add an email service (Gmail, Outlook, etc.)
4. Create an email template
5. Update the IDs in `src/components/AppointmentBooking.jsx`:
   - `serviceId`: Your EmailJS service ID
   - `templateId`: Your EmailJS template ID  
   - `userId`: Your EmailJS user ID

## Ready to Use!

The website includes:
- ✅ Fully responsive design
- ✅ All sections from requirements
- ✅ WhatsApp integration
- ✅ Contact forms
- ✅ Gallery with lightbox
- ✅ Smooth animations
- ✅ Professional UI/UX

Replace placeholder images with actual clinic photos for production use.
