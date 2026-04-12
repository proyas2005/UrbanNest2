import { useEffect, useState } from "react";

import Hero from "../components/Hero";
import Services from "../components/Services";
import Pricing from "../components/Pricing";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload(); // simple refresh
  };

  return (
    <>
      {/* ✅ USER BAR (only if logged in) */}
      {user && (
        <div className="flex justify-between items-center p-4 bg-gray-100">
          <h2 className="font-semibold">
            Welcome, {user.name} 👋
          </h2>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}

      {/* Your existing UI */}
      <Hero />
      <Services />
      <Pricing />
      <CTA />
      <Footer />
    </>
  );
};

export default Home;