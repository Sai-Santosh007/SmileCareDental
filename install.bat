@echo off
echo Installing dependencies for Smile Care Dental Website...
echo.

echo Installing production dependencies...
npm install react react-dom react-router-dom emailjs-com framer-motion lucide-react

echo.
echo Installing development dependencies...
npm install -D @types/react @types/react-dom @vitejs/plugin-react autoprefixer postcss tailwindcss vite

echo.
echo Installation complete!
echo.
echo To start the development server, run:
echo npm run dev
echo.
pause
