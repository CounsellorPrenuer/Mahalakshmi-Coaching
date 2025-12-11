import { CustomCursor } from "../CustomCursor";
import { Button } from "@/components/ui/button";

export default function CustomCursorExample() {
  return (
    <div className="min-h-[300px] bg-background p-8 flex flex-col items-center justify-center gap-4">
      <CustomCursor />
      <p className="text-foreground text-center">Move your mouse around to see the custom cursor</p>
      <Button data-testid="button-cursor-test">Hover me to see cursor change</Button>
    </div>
  );
}
