# Smile Care Dental Clinic Website

A modern, responsive dental clinic website built with React, Vite, and TailwindCSS. Features include appointment booking, WhatsApp integration, testimonials gallery, and more.

## Features

- ✅ Fully responsive design (mobile-first)
- ✅ Modern UI with animations and micro-interactions
- ✅ Functional appointment booking form with EmailJS integration
- ✅ WhatsApp chat integration
- ✅ Interactive before/after gallery
- ✅ Testimonials carousel
- ✅ FAQ accordion
- ✅ Doctor profiles
- ✅ Contact section with embedded map
- ✅ SEO optimized
- ✅ Fast performance

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email Service**: EmailJS
- **Deployment**: Ready for Vercel/Netlify

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure EmailJS** (for appointment booking):
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Create a new email service
   - Create an email template
   - Update the EmailJS configuration in `src/components/AppointmentBooking.jsx`:
     ```javascript
     const serviceId = 'your_service_id';
     const templateId = 'your_template_id';
     const userId = 'your_user_id';
     ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000`

## Project Structure

```
smiley-dental/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation with mobile menu
│   │   ├── Hero.jsx             # Hero section with CTAs
│   │   ├── Services.jsx         # Services cards grid
│   │   ├── Doctors.jsx          # Doctor profiles
│   │   ├── WhyChooseUs.jsx      # Features section
│   │   ├── Testimonials.jsx     # Patient testimonials
│   │   ├── BeforeAfter.jsx      # Before/after gallery
│   │   ├── AppointmentBooking.jsx # Functional booking form
│   │   ├── FAQ.jsx              # FAQ accordion
│   │   ├── Contact.jsx          # Contact with map
│   │   ├── Gallery.jsx          # Photo gallery page
│   │   ├── Footer.jsx           # Footer with links
│   │   └── WhatsAppButton.jsx   # Floating WhatsApp button
│   ├── App.jsx                  # Main app with routing
│   ├── main.jsx                 # App entry point
│   └── index.css                # Global styles
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
theme: {
  extend: {
    colors: {
      'soft-mint': '#E8F5F0',
      'teal': '#2A9D8F',
      'warm-white': '#FAFAFA',
    }
  }
}
```

### Content
Update the following files to customize content:
- **Contact Info**: `src/components/Contact.jsx`, `src/components/Footer.jsx`
- **Doctors**: `src/components/Doctors.jsx`
- **Services**: `src/components/Services.jsx`
- **Testimonials**: `src/components/Testimonials.jsx`
- **Clinic Details**: Update throughout components

### Images
Replace placeholder images with actual clinic photos. Image URLs are currently using Unsplash placeholders.

## EmailJS Setup

1. Create an EmailJS account
2. Set up an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{to_name}}` - Patient name
   - `{{to_email}}` - Patient email
   - `{{phone}}` - Phone number
   - `{{date}}` - Appointment date
   - `{{time}}` - Time slot
   - `{{from_name}}` - Clinic name
   - `{{clinic_phone}}` - Clinic phone
   - `{{clinic_address}}` - Clinic address

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Netlify
1. Run `npm run build`
2. Upload `dist` folder to Netlify
3. Configure environment variables for EmailJS

### Traditional Hosting
1. Run `npm run build`
2. Upload `dist` folder to your hosting provider
3. Ensure server supports SPA routing

## Environment Variables

For production, set these environment variables:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_USER_ID=your_user_id
```

## Performance Optimization

- Images are optimized with lazy loading
- Components use code splitting
- CSS is purged with Tailwind
- Animations are GPU accelerated

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Android Chrome)

## SEO Features

- Semantic HTML5 structure
- Meta tags for social sharing
- Structured data for local business
- Optimized page titles
- Clean URLs

## Security

- Form validation on client and server
- HTTPS ready
- No sensitive data in frontend
- CSP headers recommended

## Support

For issues or questions:
1. Check the README
2. Review component documentation
3. Contact development team

## License

This project is licensed under the MIT License.
