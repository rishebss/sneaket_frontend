import Hero from "../usercomponents/Hero";
import AboutSection from "../defaultcomponents/AboutSection";
import BentoCards from "../usercomponents/BentoCards";
import DefaultFooter from "../defaultcomponents/DefaultFooter";

export default function Home() {
    return (
        <>
            <Hero />
            <BentoCards />
            <AboutSection />
            <DefaultFooter />
        </>
    );
}

