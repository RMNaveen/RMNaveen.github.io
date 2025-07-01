import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTheme } from '@heroui/use-theme';

type ThemeOption = {
  key: string;
  name: string;
  icon: string;
  class: string;
};

const themeOptions: ThemeOption[] = [
  {
    key: "light",
    name: "Light",
    icon: "lucide:sun",
    class: "bg-white text-black"
  },
  {
    key: "dark",
    name: "Dark",
    icon: "lucide:moon",
    class: "bg-black text-white"
  },
  {
    key: "purple",
    name: "Purple",
    icon: "lucide:palette",
    class: "bg-purple-600 text-white"
  }
];

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  
  const selectedTheme = themeOptions.find(t => t.key === theme) || themeOptions[0];

  const handleThemeChange = (newTheme: string) => {
    // First, store the new theme in localStorage
    localStorage.setItem('theme-preference', newTheme);
    
    // Set the theme
    setTheme(newTheme);
    
    // Force a page refresh after a brief delay to ensure theme is saved
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="flat"
            className="bg-content1"
            startContent={<Icon icon={selectedTheme.icon} className="text-xl" />}
          >
            {selectedTheme.name}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Theme selection"
          selectedKeys={new Set([theme])}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0];
            if (selected) {
              handleThemeChange(selected.toString());
            }
          }}
          selectionMode="single"
        >
          {themeOptions.map((option) => (
            <DropdownItem
              key={option.key}
              startContent={<Icon icon={option.icon} className="text-xl" />}
            >
              {option.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
