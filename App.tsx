import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';

// Contexts
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProjectProvider } from './contexts/ProjectContext';
import { ContentProvider } from './contexts/ContentContext';
import { ServiceProvider } from './contexts/ServiceContext';

// Public Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Portfolio } from './pages/Portfolio';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { FAQPage } from './pages/FAQPage';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';

// Admin Pages
import { Login } from './pages/admin/Login';
import { AdminLayout } from './components/admin/AdminLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { Projects } from './pages/admin/Projects';
import { Categories } from './pages/admin/Categories';
import { Settings } from './pages/admin/Settings';
import { ManageServices } from './pages/admin/ManageServices';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Redirect to home on initial refresh/mount
const RedirectOnRefresh = () => {
  const navigate = useNavigate();
  useEffect(() => {
     if (window.location.hash === '#/') {
       // Just ensuring we start clean if needed, mostly for development
     }
  }, []);
  return null;
};

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen text-white bg-jp-dark font-sans">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <ServiceProvider>
          <ContentProvider>
            <HashRouter>
              <RedirectOnRefresh />
              <ScrollToTop />
              <Routes>
                {/* Admin Routes */}
                <Route path="/login" element={<Login />} />
                
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="projects/new" element={<Projects />} />
                  <Route path="services" element={<ManageServices />} />
                  <Route path="categories" element={<Categories />} />
                  <Route path="settings" element={<Settings />} />
                </Route>

                {/* Public Routes */}
                <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
                <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
                <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
                <Route path="/portfolio" element={<PublicLayout><Portfolio /></PublicLayout>} />
                <Route path="/testimonials" element={<PublicLayout><TestimonialsPage /></PublicLayout>} />
                <Route path="/faq" element={<PublicLayout><FAQPage /></PublicLayout>} />
                <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
                <Route path="/privacy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
                <Route path="/terms" element={<PublicLayout><TermsOfService /></PublicLayout>} />
                
                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </HashRouter>
          </ContentProvider>
        </ServiceProvider>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;