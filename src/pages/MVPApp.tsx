import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AppNav from "../components/AppNav";
import "../styles/app.css";
import Home from "./Home";
import Search from "./Search";
import Profile from "./Profile";
import Booking from "./Booking";
import Success from "./Success";
import ProviderDashboard from "./ProviderDashboard";
import ProviderAgenda from "./ProviderAgenda";
import ProviderEarnings from "./ProviderEarnings";
import BookingsList from "./BookingsList";
import UserProfile from "./UserProfile";
import Reschedule from "./Reschedule";
import Categories from "./Categories";
import RegisterProvider from "./RegisterProvider";
import MobileAdmin from "./MobileAdmin";
import ProviderAvailability from "./ProviderAvailability";
import ProviderNav from "../components/ProviderNav";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { useAppMode } from "../context/AppModeContext";
import { supabase } from "../lib/supabase";
import { Loader2 } from "lucide-react";

export default function MVPApp() {
  const { mode, loading: modeLoading } = useAppMode();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const isAuthPage = location.pathname.includes("/login") || location.pathname.includes("/register");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      setLoading(false);
      if (!session && !isAuthPage) {
        navigate("/app/login");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      if (!session && !isAuthPage) {
        navigate("/app/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, isAuthPage]);

  if (loading || modeLoading) {
    return (
      <div className="app-container" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Loader2 className="animate-spin" color="var(--orange)" size={48} />
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* APP CONTAINER */}
      <div className="phone fade-in">

        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          {mode === "client" ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/" element={<ProviderDashboard />} />
          )}
          <Route path="search" element={<Search />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="booking/:id" element={<Booking />} />
          <Route path="success" element={<Success />} />
          <Route path="bookings-list" element={<BookingsList />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="reschedule/:id" element={<Reschedule />} />
          <Route path="categories" element={<Categories />} />
          <Route path="register-provider" element={<RegisterProvider />} />
          <Route path="admin-mobile" element={<MobileAdmin />} />
          <Route path="provider-availability" element={<ProviderAvailability />} />
          <Route path="provider-agenda" element={<ProviderAgenda />} />
          <Route path="provider-earnings" element={<ProviderEarnings />} />
        </Routes>

        {!isAuthPage && mode === "client" && <AppNav />}
        {!isAuthPage && mode === "provider" && <ProviderNav />}
      </div>
    </div>
  );
}
