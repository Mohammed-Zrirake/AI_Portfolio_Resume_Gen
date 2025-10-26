import React, { useState } from 'react';
import { PortfolioData } from '../types';
import { generateLatexResume } from '../services/geminiService';
import { Button } from './ui/Button';
import { useI18n } from '../contexts/I18nContext';

interface LatexGeneratorProps {
  data: PortfolioData;
}

const LatexGenerator: React.FC<LatexGeneratorProps> = ({ data }) => {
  const { t } = useI18n();
  const [latexCode, setLatexCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState('');

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setLatexCode('');
    try {
      const code = await generateLatexResume(data);
      // Clean up the response from Gemini
      const cleanedCode = code.replace(/^```latex\s*|```\s*$/g, '');
      setLatexCode(cleanedCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(latexCode).then(() => {
        setCopySuccess(t('copied'));
        setTimeout(() => setCopySuccess(''), 2000);
      }, () => {
        setCopySuccess(t('copyFailed'));
        setTimeout(() => setCopySuccess(''), 2000);
      });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{t('generateLatexResume')}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t('generateLatexDesc')}
        </p>
      </div>
      <Button onClick={handleGenerate} disabled={isLoading}>
        {isLoading ? t('generating') : t('generateLatexCode')}
      </Button>

      {error && <div className="p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-md">{error}</div>}

      {latexCode && (
        <div className="relative">
          <pre className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-4 max-h-96 overflow-auto text-sm text-slate-800 dark:text-slate-200">
            <code>{latexCode}</code>
          </pre>
          <Button variant="ghost" className="absolute top-2 right-2 h-8 px-2" onClick={handleCopy}>
            {copySuccess || t('copy')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default LatexGenerator;