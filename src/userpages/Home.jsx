import Hero from "../usercomponents/Hero";
import BentoCards from "../usercomponents/BentoCards";
import DefaultFooter from "../defaultcomponents/DefaultFooter";
import AboutSection from "../defaultcomponents/AboutSection";

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

