import { Appbar } from "@/components/Appbar";
import { Hero } from "@/components/Hero";
import { HeroVideo } from "@/components/HeroVideo";

export default function Home() {
  return (
    <div className="pb-40">
      <Appbar />
      <Hero />
      <HeroVideo />
    </div>
  );
}
