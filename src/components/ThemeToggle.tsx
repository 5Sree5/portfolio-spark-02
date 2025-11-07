import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/ThemeContext";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("orange")}>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#FF6A00]" />
            <span>Dark - Orange{theme === "orange" && " ✓"}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("blue")}>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#0077FF]" />
            <span>Dark - Blue{theme === "blue" && " ✓"}</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
