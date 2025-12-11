import { Navigation } from "../Navigation";
import { ThemeProvider } from "../layout/ThemeProvider";

export default function NavigationExample() {
  return (
    <ThemeProvider>
      <div className="min-h-[200px] bg-background">
        <Navigation />
        <div className="pt-20 p-8 text-center text-muted-foreground">
          Scroll down to see sticky navigation effect
        </div>
      </div>
    </ThemeProvider>
  );
}
