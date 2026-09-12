import Navbar from "@/components/ui/Navbar"
import Hero from "@/components/ui/hero"
import AboutSection from "@/components/ui/AboutSection"
import ScheduleSection from "@/components/ui/ScheduleSection"
import GallerySection from "@/components/ui/GallerySection"
import ContactSection from "@/components/ui/ContactSection"
import Footer from "@/components/ui/Footer"

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-[#070707] text-white selection:bg-[#D6FF57] selection:text-black">
      {/* Accessibility: Skip to Content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-[#D6FF57] focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:text-black focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Fixed Navigation Bar */}
      <Navbar />

      {/* Main Page Content Flow */}
      <main id="main-content" className="w-full">
        <Hero />
        <AboutSection />
        <ScheduleSection />
        <GallerySection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
