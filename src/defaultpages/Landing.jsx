import DarkVeil from '../defaultcomponents/DarkVeil';
import Hero from '../defaultcomponents/DefaultHero';
import AboutSection from '../defaultcomponents/AboutSection';
import Testimonial from '../defaultcomponents/Testimonial';
import Features from '../defaultcomponents/Features';
import LogoCarousel from '../defaultcomponents/LogoCarousel';
import Footer from '../defaultcomponents/DefaultFooter';

export default function Landing() {
    return (
        <div className="relative w-full overflow-hidden bg-black">

            {/* Hero Component */}
            <div className="relative z-10">
                <Hero />
                <AboutSection />
                <Features />
                <Testimonial />
                <LogoCarousel />
                <Footer />
            </div>
        </div>
    );
}