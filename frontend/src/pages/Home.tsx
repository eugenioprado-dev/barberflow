import { Hero } from "../components/sections/Hero";
import { Services } from "../components/sections/Services";
import { Team } from "../components/sections/Team";
import { Gallery } from "../components/sections/Gallery";
import { Testimonials } from "../components/sections/Testimonial";
import { Contact } from "../components/sections/Contact";
import { Footer } from "../components/sections/Footer";

export function Home() {
    return (
        <>
            <Hero />
            <Services />
            <Team />
            <Gallery />
            <Testimonials />
            <Contact />
            <Footer />
        </>
    );
}