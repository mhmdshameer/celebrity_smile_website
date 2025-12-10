import "@/styles/animations.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AdminLayout } from "./components/AdminLayout";
import { AuthProvider } from "./contexts/auth-context";
import ProtectedRoute from "./components/protected-route";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Index from "./pages/Index";
import Doctors from "./pages/Doctors";
import Services from "./pages/Services";
import Departments from "./pages/Departments";
import Offers from "./pages/Offers";
import PriceList from "./pages/PriceList";
import PrivilegeCard from "./pages/PrivilegeCard";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/admin/Dashboard";
import AdminDoctors from "./pages/admin/AdminDoctors";
import AdminServices from "./pages/admin/AdminServices";
import AdminDepartments from "./pages/admin/AdminDepartments";
import AdminOffers from "./pages/admin/AdminOffers";
import AdminPriceList from "./pages/admin/AdminPriceList";
import AdminBlog from "./pages/admin/AdminBlog";
import BlogPost from "./pages/BlogPost";
import PediatricDentistry from "./pages/PediatricDentistry";

import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <ScrollToTop />
              <FloatingWhatsApp />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/services" element={<Services />} />
                <Route path="/departments" element={<Departments />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/price-list" element={<PriceList />} />
                <Route path="/privilege-card" element={<PrivilegeCard />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/pediatric-dentistry" element={<PediatricDentistry />} />

                {/* Admin Routes - Protected */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="doctors" element={<AdminDoctors />} />
                    <Route path="services" element={<AdminServices />} />
                    <Route path="departments" element={<AdminDepartments />} />
                    <Route path="offers" element={<AdminOffers />} />
                    <Route path="price-list" element={<AdminPriceList />} />
                    <Route path="blog" element={<AdminBlog />} />
                  </Route>
                </Route>

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
