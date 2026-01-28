import React from "react";
import Navbar from "../../components/LandingPage/Navbar";
import Hero from "../../components/LandingPage/Hero";
import TrustedCompanies from "../../components/LandingPage/TrustedCompanies";
import JobSeekersEmployers from "../../components/LandingPage/JobSeekersEmployers";
import About from "../../components/LandingPage/About";
import CTA from "../../components/LandingPage/CTA";
import Contact from "../../components/LandingPage/Contact";
import Footer from "../../components/LandingPage/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustedCompanies />
      <JobSeekersEmployers />
      <About />
      <CTA />
      <Contact />
      <Footer />
    </>
  );
};

export default LandingPage;
