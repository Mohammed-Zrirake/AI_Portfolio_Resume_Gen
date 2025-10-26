import React from 'react';
import { Button } from './ui/Button';
import { Dropdown, DropdownItem } from './ui/Dropdown';
import { useI18n } from '../contexts/I18nContext';

const LanguagesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="m5 8 6 6" />
    <path d="m4 14 6-6 2-3" />
    <path d="M2 5h12" />
    <path d="M7 2h1" />
    <path d="m22 22-5-10-5 10" />
    <path d="M14 18h6" />
  </svg>
);

export const LanguageSwitcher = () => {
  const { setLanguage } = useI18n();

  return (
    <Dropdown
      trigger={
        <Button variant="ghost" size="icon">
          <LanguagesIcon />
          <span className="sr-only">Change language</span>
        </Button>
      }
    >
      <DropdownItem onClick={() => setLanguage('en')}>English</DropdownItem>
      <DropdownItem onClick={() => setLanguage('fr')}>Français</DropdownItem>
      <DropdownItem onClick={() => setLanguage('ar')}>العربية</DropdownItem>
    </Dropdown>
  );
};
