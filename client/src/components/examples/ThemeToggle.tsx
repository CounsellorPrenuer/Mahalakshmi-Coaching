import { ThemeToggle } from "../ThemeToggle";
import { ThemeProvider } from "../layout/ThemeProvider";

export default function ThemeToggleExample() {
  return (
    <ThemeProvider>
      <div className="p-8 bg-background flex items-center justify-center gap-4">
        <span className="text-foreground">Click to toggle theme:</span>
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}
