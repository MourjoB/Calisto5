import React from "react";
import Nav from "../components/Nav";
import HeroSection from "../components/herosection";
import ProductDetails from "../components/ProductDetails";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import '../styles/styles.css';
import '../components/Calculator'
import '../styles/globals.css';
import QuoteCalculator from "../components/Calculator";
import '../components/ProductDetails.css'



function App() {
    return (
        <div className="App">
            <Nav />
            <HeroSection />
            <QuoteCalculator/>
            <ProductDetails />
            <AboutSection />
            <ContactSection />
            <Footer />
            
            {/* Other components will go here */}
        </div>
    );
}

export default App;
