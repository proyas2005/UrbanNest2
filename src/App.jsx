import React from "react";
import Navbar from "./Navbar.jsx";
import Hero from "./Hero.jsx";
import Features from "./Features.jsx";
import Services from "./Services.jsx";
import Pricing from "./Pricing.jsx";
import CTA from "./CTA.jsx";
import Footer from "./Footer.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Services />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;