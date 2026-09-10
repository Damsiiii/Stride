import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-10 size-full pointer-events-none">
        <div className="grid w-full grid-cols-12 divide-x divide-white/20 h-screen">
          <div className="col-span-1 h-screen" />
          <div className="col-span-3 h-screen" />
          <div className="col-span-4 h-screen" />
          <div className="col-span-3 h-screen" />
          <div className="col-span-1 h-screen" />
        </div>
      </div>

      {/* Header Bar */}
      <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <img
            src="/images/stride-logo-dark.jpeg"
            alt="Stride Run Club Logo"
            className="h-12 w-12 rounded-full border border-white/20 object-cover"
          />
          <span className="font-extrabold text-xl text-white tracking-wider">
            STRIDE <span className="text-[#e25822]">RUN CLUB</span>
          </span>
        </div>

        <span className="text-xs font-semibold text-white/80 uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20">
          Kurunegala • Sri Lanka
        </span>
      </header>

      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=2000&q=80)",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-20 max-w-5xl px-6 text-center text-white">
        <h1 className="text-center font-normal text-5xl text-white tracking-tight md:text-6xl lg:text-8xl mb-6">
          FIND YOUR STRIDE UNDER ELEPHANT ROCK
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-center font-light text-lg text-white/90 md:text-xl leading-relaxed">
          Kurunegala's premier running community. Connecting runners of all levels around the lake, Ethagala trails, and scenic North Western routes.
        </p>

        <Button className="group not-disabled:inset-shadow-none mx-auto flex cursor-pointer items-center justify-center gap-0 rounded-full border-none bg-transparent px-0 py-5 font-normal shadow-none hover:bg-transparent [:hover,[data-pressed]]:bg-transparent">
          <span className="rounded-full bg-[#e25822] px-8 py-4 text-white text-base font-bold duration-500 ease-in-out group-hover:bg-[#122023] group-hover:text-[#e25822] group-hover:transition-colors">
            Join Stride Run Club
          </span>
          <div className="relative flex h-fit cursor-pointer items-center overflow-hidden rounded-full bg-[#e25822] p-5 text-white duration-500 ease-in-out group-hover:bg-[#122023] group-hover:text-[#e25822] group-hover:transition-colors">
            <ArrowUpRight className="absolute h-5 w-5 -translate-x-1/2 transition-all duration-500 ease-in-out group-hover:translate-x-10" />
            <ArrowUpRight className="absolute h-5 w-5 -translate-x-10 transition-all duration-500 ease-in-out group-hover:-translate-x-1/2" />
          </div>
        </Button>
      </div>
    </section>
  );
}
