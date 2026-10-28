import { Hero } from "@/pages/HomeComponent/Hero";
import { Features } from "@/pages/HomeComponent/Features";
import { Benefits } from "@/pages/HomeComponent/Benefits";
import { About } from "@/pages/HomeComponent/About";
import { FAQ } from "@/pages/HomeComponent/FAQ";

export const dynamic = "force-static";

export default function Page() {
  return (
    <main className="flex-grow">
      <Hero />
      <Features />
      <Benefits />
      <About />
      <FAQ />
    </main>
  );
}
