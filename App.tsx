import React, { useState, useEffect, useCallback } from 'react';
import { PortfolioData, User } from './types';
import PortfolioForm from './components/PortfolioForm';
import PortfolioPreview from './components/PortfolioPreview';
import LatexGenerator from './components/LatexGenerator';
import { useI18n } from './contexts/I18nContext';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import * as apiService from './services/apiService';
import { Button } from './components/ui/Button';
import { Dropdown, DropdownItem } from './components/ui/Dropdown';

// Shadcn-inspired Tabs components defined directly for simplicity
type TabsProps = {
  defaultValue: string;
  children: React.ReactNode;
};
const TabsContext = React.createContext<{ value: string; setValue: (value: string) => void } | null>(null);

const Tabs: React.FC<TabsProps> = ({ defaultValue, children }) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
};

const TabsList: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="inline-flex h-10 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800 p-1 text-slate-500 dark:text-slate-400">
    {children}
  </div>
);

const TabsTrigger: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within a Tabs component");
  const isActive = context.value === value;
  return (
    <button
      onClick={() => context.setValue(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white dark:ring-offset-slate-900 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isActive ? 'bg-white dark:bg-slate-950 text-slate-950 dark:text-slate-50 shadow-sm' : ''}`}
    >
      {children}
    </button>
  );
};

const TabsContent: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used within a Tabs component");
  return context.value === value ? <div className="mt-4">{children}</div> : null;
};
// End of Tabs components

const UserMenu: React.FC<{ user: User, onLogout: () => void }> = ({ user, onLogout }) => {
  const { t } = useI18n();
  return (
    <Dropdown trigger={
      <Button variant="outline" className="flex items-center gap-2">
        {user.email}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </Button>
    }>
      <DropdownItem onClick={onLogout}>{t('logout')}</DropdownItem>
    </Dropdown>
  );
}

const App: React.FC = () => {
  const { t } = useI18n();
  const { user, isLoading: isAuthLoading, logout } = useAuth();
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        const data = await apiService.getPortfolioData(user.id);
        setPortfolioData(data);
      } else {
        setPortfolioData(null);
      }
    };
    loadData();
  }, [user]);

  const handleSave = useCallback(async () => {
    if (!user || !portfolioData) return;
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await apiService.savePortfolioData(user.id, portfolioData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (error) {
      console.error("Failed to save data", error);
    } finally {
      setIsSaving(false);
    }
  }, [user, portfolioData]);

  if (isAuthLoading || (user && !portfolioData)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <svg className="animate-spin h-8 w-8 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen font-sans">
       <header className="border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-10 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">{t('appTitle')}</h1>
        <div className="flex items-center gap-2 md:gap-4">
           <Button onClick={handleSave} disabled={isSaving || saveSuccess}>
            {saveSuccess ? t('saved') : (isSaving ? t('saving') : t('save'))}
          </Button>
          <LanguageSwitcher />
          <ThemeToggle />
          <UserMenu user={user} onLogout={logout} />
        </div>
      </header>
      
      {portfolioData && (
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 lg:p-8 max-w-screen-2xl mx-auto">
          <div className="dark h-full max-h-[calc(100vh-100px)] overflow-y-auto pr-4">
            <PortfolioForm portfolioData={portfolioData} setPortfolioData={setPortfolioData} />
          </div>
          
          <div className="dark h-full max-h-[calc(100vh-100px)] overflow-y-auto rounded-lg border border-slate-800 bg-slate-950 p-4 lg:p-6">
            <Tabs defaultValue="preview">
              <TabsList>
                <TabsTrigger value="preview">{t('portfolioPreview')}</TabsTrigger>
                <TabsTrigger value="latex">{t('latexResume')}</TabsTrigger>
              </TabsList>
              <TabsContent value="preview">
                <PortfolioPreview data={portfolioData} />
              </TabsContent>
              <TabsContent value="latex">
                <LatexGenerator data={portfolioData} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      )}
    </div>
  );
};

export default App;