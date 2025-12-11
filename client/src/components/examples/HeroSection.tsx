import { HeroSection } from "../HeroSection";
import { ThemeProvider } from "../layout/ThemeProvider";

export default function HeroSectionExample() {
  return (
    <ThemeProvider>
      <HeroSection />
    </ThemeProvider>
  );
}
