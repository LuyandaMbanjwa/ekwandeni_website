import { Audience } from './components/Audience';
import { Contact } from './components/Contact';
import { FAQ } from './components/FAQ';
import { FeatureSection } from './components/FeatureSection';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { OneOfAKind } from './components/oneOfAKind/OneOfAKind';
import { Navbar } from './components/Navbar';
import { SolutionPillars } from './components/SolutionPillars';
import { StatsBand } from './components/StatsBand';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <OneOfAKind />
        <StatsBand />
        <SolutionPillars />
        <FeatureSection />
        <Audience />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
