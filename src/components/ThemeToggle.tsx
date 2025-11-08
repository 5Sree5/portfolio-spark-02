import { Palette, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/ThemeContext";

export const ThemeToggle = () => {
  const { theme, setTheme, mode, setMode } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="transition-transform hover:scale-110">
          <Palette className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => setMode("light")}>
          <div className="flex items-center gap-2 w-full">
            <Sun className="h-4 w-4" />
            <span>Light Mode{mode === "light" && " ✓"}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setMode("dark")}>
          <div className="flex items-center gap-2 w-full">
            <Moon className="h-4 w-4" />
            <span>Dark Mode{mode === "dark" && " ✓"}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme("orange")}>
          <div className="flex items-center gap-2 w-full">
            <div className="w-4 h-4 rounded-full bg-[#FF6A00]" />
            <span>Orange{theme === "orange" && " ✓"}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("blue")}>
          <div className="flex items-center gap-2 w-full">
            <div className="w-4 h-4 rounded-full bg-[#0077FF]" />
            <span>Blue{theme === "blue" && " ✓"}</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
