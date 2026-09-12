import Hero from "@/components/ui/hero"
import AboutSection from "@/components/ui/AboutSection"
import ScheduleSection from "@/components/ui/ScheduleSection"
import GallerySection from "@/components/ui/GallerySection"
import ContactSection from "@/components/ui/ContactSection"

export default function DemoOne() {
  return (
    <div className="min-h-screen h-full w-full bg-[#070707] text-white">
      <Hero />
      <AboutSection />
      <ScheduleSection />
      <GallerySection />
      <ContactSection />
    </div>
  )
}
