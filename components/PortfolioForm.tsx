import React, { useState } from 'react';
import { PortfolioData, Experience, Project, Education, SkillCategory, Language } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';
import { useI18n } from '../contexts/I18nContext';

interface PortfolioFormProps {
  portfolioData: PortfolioData;
  setPortfolioData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

const PortfolioForm: React.FC<PortfolioFormProps> = ({ portfolioData, setPortfolioData }) => {
  const { t } = useI18n();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleInputChange = <T extends keyof PortfolioData>(field: T, value: PortfolioData[T]) => {
    if (field === 'domain') {
        setIsVerified(false);
    }
    setPortfolioData(prev => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field: keyof PortfolioData['contact'], value: string) => {
    setPortfolioData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
  };

  const handleArrayChange = <T,>(arrayName: keyof PortfolioData, index: number, field: keyof T, value: string) => {
    const newArray = [...(portfolioData[arrayName] as T[])] as T[];
    newArray[index] = { ...newArray[index], [field]: value };
    handleInputChange(arrayName, newArray as any);
  };
  
  const addArrayItem = <T,>(arrayName: keyof PortfolioData, newItem: T) => {
    handleInputChange(arrayName, [...(portfolioData[arrayName] as T[]), newItem] as any);
  };
  
  const removeArrayItem = (arrayName: keyof PortfolioData, index: number) => {
    handleInputChange(arrayName, (portfolioData[arrayName] as any[]).filter((_, i) => i !== index));
  };

  const handleStringArrayChange = (arrayName: keyof PortfolioData, value: string) => {
     handleInputChange(arrayName, value.split('\n') as any);
  };
  
  const handleVerifyDomain = () => {
    setIsVerifying(true);
    // Simulate API call
    setTimeout(() => {
        setIsVerifying(false);
        setIsVerified(true);
    }, 1500);
  }


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('personalInfo')}</CardTitle>
          <CardDescription>{t('personalInfoDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('fullName')}</Label>
            <Input id="name" value={portfolioData.name} onChange={e => handleInputChange('name', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">{t('professionalTitle')}</Label>
            <Input id="title" value={portfolioData.title} onChange={e => handleInputChange('title', e.target.value)} />
          </div>
           <div className="space-y-2">
            <Label>{t('phone')}</Label>
            <Input value={portfolioData.contact.phone} onChange={e => handleContactChange('phone', e.target.value)} />
          </div>
           <div className="space-y-2">
            <Label>{t('email')}</Label>
            <Input type="email" value={portfolioData.contact.email} onChange={e => handleContactChange('email', e.target.value)} />
          </div>
           <div className="space-y-2">
            <Label>{t('location')}</Label>
            <Input value={portfolioData.contact.location} onChange={e => handleContactChange('location', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>{t('linkedinUrl')}</Label>
            <Input value={portfolioData.contact.linkedin} onChange={e => handleContactChange('linkedin', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>{t('githubUrl')}</Label>
            <Input value={portfolioData.contact.github} onChange={e => handleContactChange('github', e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="about">{t('aboutMe')}</Label>
            <Textarea rows={4} id="about" value={portfolioData.about} onChange={e => handleInputChange('about', e.target.value)} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('education')}</CardTitle>
          <CardDescription>{t('educationDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {portfolioData.education.map((edu, index) => (
            <div key={edu.id} className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg space-y-4 relative">
               <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => removeArrayItem('education', index)}>
                &times;
              </Button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('institution')}</Label>
                    <Input value={edu.institution} onChange={e => handleArrayChange<Education>('education', index, 'institution', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('degree')}</Label>
                    <Input value={edu.degree} onChange={e => handleArrayChange<Education>('education', index, 'degree', e.target.value)} />
                  </div>
                   <div className="space-y-2">
                    <Label>{t('location')}</Label>
                    <Input value={edu.location} onChange={e => handleArrayChange<Education>('education', index, 'location', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('descriptionOptional')}</Label>
                    <Input value={edu.description} onChange={e => handleArrayChange<Education>('education', index, 'description', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('startDate')}</Label>
                    <Input value={edu.startDate} onChange={e => handleArrayChange<Education>('education', index, 'startDate', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('endDate')}</Label>
                    <Input value={edu.endDate} onChange={e => handleArrayChange<Education>('education', index, 'endDate', e.target.value)} />
                  </div>
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={() => addArrayItem<Education>('education', { id: `edu${Date.now()}`, institution: '', degree: '', location: '', startDate: '', endDate: '', description: ''})}>{t('addEducation')}</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('skills')}</CardTitle>
          <CardDescription>{t('skillsDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           {portfolioData.skills.map((skillCat, index) => (
             <div key={skillCat.id} className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg relative">
                <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => removeArrayItem('skills', index)}>
                  &times;
                </Button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="space-y-2 md:col-span-1">
                        <Label>{t('categoryName')}</Label>
                        <Input value={skillCat.category} onChange={e => handleArrayChange<SkillCategory>('skills', index, 'category', e.target.value)} placeholder={t('categoryNamePlaceholder')}/>
                    </div>
                     <div className="space-y-2 md:col-span-2">
                        <Label>{t('skillsCommaSeparated')}</Label>
                        <Input value={skillCat.skills} onChange={e => handleArrayChange<SkillCategory>('skills', index, 'skills', e.target.value)} placeholder={t('skillsPlaceholder')}/>
                    </div>
                </div>
            </div>
          ))}
          <Button variant="outline" onClick={() => addArrayItem<SkillCategory>('skills', { id: `skillcat${Date.now()}`, category: '', skills: ''})}>{t('addSkillCategory')}</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('experience')}</CardTitle>
          <CardDescription>{t('experienceDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {portfolioData.experience.map((exp, index) => (
            <div key={exp.id} className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg space-y-4 relative">
               <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => removeArrayItem('experience', index)}>
                &times;
              </Button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('role')}</Label>
                    <Input value={exp.role} onChange={e => handleArrayChange<Experience>('experience', index, 'role', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('company')}</Label>
                    <Input value={exp.company} onChange={e => handleArrayChange<Experience>('experience', index, 'company', e.target.value)} />
                  </div>
                   <div className="space-y-2">
                    <Label>{t('location')}</Label>
                    <Input value={exp.location} onChange={e => handleArrayChange<Experience>('experience', index, 'location', e.target.value)} />
                  </div>
                  <div className="space-y-2 sm:col-span-2"></div>
                  <div className="space-y-2">
                    <Label>{t('startDate')}</Label>
                    <Input value={exp.startDate} onChange={e => handleArrayChange<Experience>('experience', index, 'startDate', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('endDate')}</Label>
                    <Input value={exp.endDate} onChange={e => handleArrayChange<Experience>('experience', index, 'endDate', e.target.value)} />
                  </div>
              </div>
              <div className="space-y-2">
                <Label>{t('descriptionBullets')}</Label>
                <Textarea rows={5} value={exp.description} onChange={e => handleArrayChange<Experience>('experience', index, 'description', e.target.value)} />
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={() => addArrayItem<Experience>('experience', { id: `exp${Date.now()}`, role: '', company: '', location: '', startDate: '', endDate: '', description: '' })}>{t('addExperience')}</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('projects')}</CardTitle>
          <CardDescription>{t('projectsDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {portfolioData.projects.map((proj, index) => (
             <div key={proj.id} className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg space-y-4 relative">
              <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => removeArrayItem('projects', index)}>
                &times;
              </Button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('projectName')}</Label>
                  <Input value={proj.name} onChange={e => handleArrayChange<Project>('projects', index, 'name', e.target.value)} />
                </div>
                 <div className="space-y-2">
                  <Label>{t('subtitle')}</Label>
                  <Input value={proj.subtitle} onChange={e => handleArrayChange<Project>('projects', index, 'subtitle', e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t('descriptionBullets')}</Label>
                <Textarea rows={4} value={proj.description} onChange={e => handleArrayChange<Project>('projects', index, 'description', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t('url')}</Label>
                <Input value={proj.url} onChange={e => handleArrayChange<Project>('projects', index, 'url', e.target.value)} />
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={() => addArrayItem<Project>('projects', { id: `proj${Date.now()}`, name: '', subtitle: '', description: '', url: '' })}>{t('addProject')}</Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('languages')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {portfolioData.languages.map((lang, index) => (
              <div key={lang.id} className="flex gap-2 items-end relative">
                <div className="grid grid-cols-2 gap-2 flex-grow">
                    <div className="space-y-1">
                        <Label className="text-xs">{t('language')}</Label>
                        <Input value={lang.name} onChange={e => handleArrayChange<Language>('languages', index, 'name', e.target.value)} placeholder={t('languagePlaceholder')}/>
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">{t('proficiency')}</Label>
                        <Input value={lang.proficiency} onChange={e => handleArrayChange<Language>('languages', index, 'proficiency', e.target.value)} placeholder={t('proficiencyPlaceholder')}/>
                    </div>
                </div>
                 <Button variant="destructive" size="icon" className="h-7 w-7 flex-shrink-0" onClick={() => removeArrayItem('languages', index)}>&times;</Button>
              </div>
            ))}
            <Button variant="outline" className="w-full" onClick={() => addArrayItem<Language>('languages', {id: `lang${Date.now()}`, name: '', proficiency: ''})}>{t('addLanguage')}</Button>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>{t('interests')}</CardTitle>
                <CardDescription>{t('interestsDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea value={portfolioData.interests.join('\n')} onChange={e => handleStringArrayChange('interests', e.target.value)} rows={4} />
            </CardContent>
        </Card>
      </div>

       <Card>
            <CardHeader>
                <CardTitle>{t('extracurricular')}</CardTitle>
                <CardDescription>{t('extracurricularDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea value={portfolioData.extracurricular.join('\n')} onChange={e => handleStringArrayChange('extracurricular', e.target.value)} rows={4} />
            </CardContent>
        </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('domain')}</CardTitle>
          <CardDescription>{t('domainDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">https://</span>
              <Input className="flex-grow" value={portfolioData.domain} onChange={e => handleInputChange('domain', e.target.value)} placeholder="yourname.com"/>
               <Button onClick={handleVerifyDomain} disabled={isVerifying || isVerified}>
                {isVerified ? t('verified') : (isVerifying ? t('verifying') : t('verify'))}
              </Button>
            </div>
            {isVerified && <p className="text-xs text-green-600 dark:text-green-400 pt-1">{t('domainVerifiedSuccess')}</p>}
             <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">{t('domainSubdesc')}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioForm;