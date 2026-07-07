import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import {
  Mission,
  Services,
  Facilities,
  Owner,
  StaffSafety,
  DayInLife,
  Community,
  Footer,
} from "./components/sections";

export default function App() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Mission />
        <Services />
        <Facilities />
        <Gallery />
        <Owner />
        <StaffSafety />
        <DayInLife />
        <Community />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
