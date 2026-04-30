import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Doctors from './components/Doctors';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import BeforeAfter from './components/BeforeAfter';
import AppointmentBooking from './components/AppointmentBooking';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Gallery from './components/Gallery';
import PrivacyPolicy from "./components/PrivacyPolicy";
import Terms from "./components/Terms";
import AdminDashboard from './pages/AdminDashboard';
function HomePage() {
  return (
    <div className="min-h-screen bg-warm-white">
      <Navbar />
      <Hero />
      <Services />
      <Doctors />
      <WhyChooseUs />
      <Testimonials />
      <BeforeAfter />
      <AppointmentBooking />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />}/>
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
