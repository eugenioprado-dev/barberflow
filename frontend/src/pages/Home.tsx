import { Navbar } from "../components/layout/Navbar";
import { Hero } from "../components/sections/Hero";
import { Stats } from "../components/sections/Stats";
import { Services } from "../components/sections/Services";
import { Team } from "../components/sections/Team";
import { Gallery } from "../components/sections/Gallery";
import { Testimonials } from "../components/sections/Testimonial";
import { Contact } from "../components/sections/Contact";
import { Footer } from "../components/sections/Footer";

export function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <Stats />
            <Services />
            <Team />
            <Gallery />
            <Testimonials />
            <Contact />
            <Footer />
        </>
    );
}