import React from 'react';
import { Button } from './ui/Button';
import { Dropdown, DropdownItem } from './ui/Dropdown';
import { useTheme } from '../contexts/ThemeContext';

// FIX: Update component to accept props and merge classNames
const SunIcon = ({ className, ...props }: React.ComponentProps<'svg'>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-5 w-5 ${className ?? ''}`} {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
);

// FIX: Update component to accept props and merge classNames
const MoonIcon = ({ className, ...props }: React.ComponentProps<'svg'>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-5 w-5 ${className ?? ''}`} {...props}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
);

export const ThemeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <Dropdown
      trigger={
        <Button variant="ghost" size="icon">
          <SunIcon className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      }
    >
      <DropdownItem onClick={() => setTheme('light')}>Light</DropdownItem>
      <DropdownItem onClick={() => setTheme('dark')}>Dark</DropdownItem>
      <DropdownItem onClick={() => setTheme('system')}>System</DropdownItem>
    </Dropdown>
  );
};
