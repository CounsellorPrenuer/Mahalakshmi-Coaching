import { ScrollProgress } from "../ScrollProgress";
import { BackToTop } from "../BackToTop";
import { FloatingContactFAB } from "../FloatingContactFAB";
import { ThemeProvider } from "../layout/ThemeProvider";

export default function FloatingElementsExample() {
  return (
    <ThemeProvider>
      <div className="min-h-[400px] bg-background p-8 relative">
        <ScrollProgress />
        <BackToTop />
        <FloatingContactFAB />
        <p className="text-center text-muted-foreground">
          Scroll down to see floating elements (Back to Top button appears after scrolling)
        </p>
        <div className="absolute bottom-6 right-24 text-sm text-muted-foreground">
          WhatsApp FAB visible on right
        </div>
      </div>
    </ThemeProvider>
  );
}
