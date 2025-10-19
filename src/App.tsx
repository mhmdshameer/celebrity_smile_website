import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AdminLayout } from "./components/AdminLayout";
import Index from "./pages/Index";
import Doctors from "./pages/Doctors";
import Services from "./pages/Services";
import Departments from "./pages/Departments";
import Offers from "./pages/Offers";
import PriceList from "./pages/PriceList";
import PrivilegeCard from "./pages/PrivilegeCard";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/admin/Dashboard";
import AdminDoctors from "./pages/admin/AdminDoctors";
import AdminServices from "./pages/admin/AdminServices";
import AdminDepartments from "./pages/admin/AdminDepartments";
import AdminOffers from "./pages/admin/AdminOffers";
import AdminPriceList from "./pages/admin/AdminPriceList";
import AdminBlog from "./pages/admin/AdminBlog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/services" element={<Services />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/price-list" element={<PriceList />} />
            <Route path="/privilege-card" element={<PrivilegeCard />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="doctors" element={<AdminDoctors />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="departments" element={<AdminDepartments />} />
              <Route path="offers" element={<AdminOffers />} />
              <Route path="price-list" element={<AdminPriceList />} />
              <Route path="blog" element={<AdminBlog />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
