import Hero from "@/components/sections/Hero";
import MarqueeBar from "@/components/sections/MarqueeBar";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Works from "@/components/sections/Works";
import Gallery from "@/components/sections/Gallery";
import Certifications from "@/components/sections/Certifications";
import Languages from "@/components/sections/Languages";
import Contact from "@/components/sections/Contact";
import SectionFlash from "@/components/cinema/SectionFlash";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeBar />
      <SectionFlash><About /></SectionFlash>
      <SectionFlash><Education /></SectionFlash>
      <SectionFlash><Experience /></SectionFlash>
      <SectionFlash><Skills /></SectionFlash>
      <SectionFlash><Works /></SectionFlash>
      <SectionFlash><Gallery /></SectionFlash>
      <SectionFlash><Certifications /></SectionFlash>
      <SectionFlash><Languages /></SectionFlash>
      <SectionFlash><Contact /></SectionFlash>
    </>
  );
}
