import React from 'react';
import { PortfolioData } from '../types';
import { useI18n } from '../contexts/I18nContext';

interface PortfolioPreviewProps {
  data: PortfolioData;
}

const Section: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => (
    <section>
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 border-b-2 border-slate-200 dark:border-slate-700 pb-2 mb-3 uppercase tracking-wider">{title}</h2>
      {children}
    </section>
);


const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({ data }) => {
  const { t } = useI18n();
  return (
    <div className="bg-gray-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 rounded-lg w-full h-full">
      <header className="p-6 text-center">
        <h1 className="text-3xl font-bold text-slate-950 dark:text-slate-50">{data.name}</h1>
        <p className="text-slate-700 dark:text-slate-300 mt-1">{data.title}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center text-sm text-slate-600 dark:text-slate-400 mt-3">
            <span>{data.contact.phone}</span>
            <span className="hidden sm:inline">&bull;</span>
            <a href={`mailto:${data.contact.email}`} className="hover:text-teal-500 dark:hover:text-teal-400">{data.contact.email}</a>
            <span className="hidden sm:inline">&bull;</span>
            <span>{data.contact.location}</span>
             <span className="hidden sm:inline">&bull;</span>
            <a href={`https://${data.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-teal-500 dark:hover:text-teal-400">LinkedIn</a>
             <span className="hidden sm:inline">&bull;</span>
            <a href={`https://${data.contact.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-teal-500 dark:hover:text-teal-400">GitHub</a>
        </div>
      </header>
      
      <div className="text-center px-6 py-4">
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">{data.about}</p>
      </div>

      <main className="p-6 space-y-6">
        
        <Section title={t('previewFormation')}>
           <div className="space-y-4">
            {data.education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100">{edu.institution}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{edu.startDate} - {edu.endDate}</p>
                </div>
                <div className="flex justify-between items-baseline">
                  <p className="text-md text-slate-700 dark:text-slate-300 italic">{edu.degree}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{edu.location}</p>
                </div>
                {edu.description && <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">{edu.description}</p>}
              </div>
            ))}
          </div>
        </Section>

        <Section title={t('previewSkills')}>
          <div className="space-y-2">
            {data.skills.map(skillCat => (
              <div key={skillCat.id} className="flex text-sm">
                <p className="w-1/3 font-semibold text-slate-700 dark:text-slate-300">{skillCat.category}:</p>
                <p className="w-2/3 text-slate-600 dark:text-slate-400">{skillCat.skills}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title={t('previewExperience')}>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100">{exp.role}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{exp.startDate} - {exp.endDate}</p>
                </div>
                 <div className="flex justify-between items-baseline">
                    <p className="text-md text-slate-700 dark:text-slate-300 italic">{exp.company}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{exp.location}</p>
                 </div>
                <ul className="text-slate-600 dark:text-slate-400 mt-2 text-sm list-disc list-inside space-y-1">
                  {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title={t('previewProjects')}>
          <div className="space-y-6">
            {data.projects.map(proj => (
              <div key={proj.id} className="border-l-4 border-slate-200 dark:border-slate-800 pl-4">
                <h3 className="font-bold text-slate-900 dark:text-slate-100">{proj.name}</h3>
                <div className="flex justify-between items-baseline">
                    <p className="text-md text-slate-700 dark:text-slate-300 italic">{proj.subtitle}</p>
                     <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 text-sm">
                      {t('viewProject')} &rarr;
                    </a>
                </div>
                <ul className="text-slate-600 dark:text-slate-400 mt-2 text-sm list-disc list-inside space-y-1">
                   {proj.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Section>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <Section title={t('previewExtracurricular')}>
                     <ul className="text-slate-600 dark:text-slate-400 text-sm list-disc list-inside space-y-1">
                      {data.extracurricular.map((item, i) => item && <li key={i}>{item}</li>)}
                    </ul>
                </Section>
            </div>
             <div>
                <Section title={t('previewInterests')}>
                     <ul className="text-slate-600 dark:text-slate-400 text-sm list-disc list-inside space-y-1">
                      {data.interests.map((item, i) => item && <li key={i}>{item}</li>)}
                    </ul>
                </Section>
            </div>
        </div>


        <Section title={t('previewLanguages')}>
           <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
             {data.languages.map(lang => (
              <p key={lang.id} className="text-slate-700 dark:text-slate-300"><span className="font-semibold">{lang.name}:</span> {lang.proficiency}</p>
             ))}
           </div>
        </Section>
      </main>
    </div>
  );
};

export default PortfolioPreview;