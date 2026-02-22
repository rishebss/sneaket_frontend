import Hero from "../usercomponents/Hero";
import FeatureSection from "../usercomponents/FeatureSection";
import BentoCards from "../usercomponents/BentoCards";
import DefaultFooter from "../defaultcomponents/DefaultFooter";

export default function Home() {
    return (
        <>
            <Hero />
            <BentoCards />
            <FeatureSection />
            <DefaultFooter />
        </>
    );
}

