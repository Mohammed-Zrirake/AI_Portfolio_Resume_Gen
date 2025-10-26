import { GoogleGenAI } from "@google/genai";
import { PortfolioData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// Helper to escape special LaTeX characters
const escapeLatex = (str: string): string => {
  return str
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/{/g, '\\{')
    .replace(/}/g, '\\}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}')
    .replace(/\\/g, '\\textbackslash{}');
};

const createDescriptionList = (description: string): string => {
  if (!description) return '';
  const items = description.split('\n').filter(line => line.trim() !== '');
  if (items.length === 0) return '';
  return `
  \\resumeItemListStart
    ${items.map(item => `\\resumeItem{${escapeLatex(item.replace(/^- /, ''))}}`).join('\n    ')}
  \\resumeItemListEnd`;
}

function createPrompt(data: PortfolioData): string {
  const educationSection = data.education.map(edu => `
\\resumeSubheading
  {${escapeLatex(edu.institution)}}{${escapeLatex(edu.startDate)} - ${escapeLatex(edu.endDate)}}
  {${escapeLatex(edu.degree)}}{${escapeLatex(edu.location)}}
  ${edu.description ? `\\resumeItemListStart\\resumeItem{${escapeLatex(edu.description)}}\\resumeItemListEnd` : ''}
`).join('');

  const skillsSection = data.skills.map(skillCat => `
    \\item\\small{\\textbf{${escapeLatex(skillCat.category)}}{: ${escapeLatex(skillCat.skills)}}}`).join('');

  const experienceSection = data.experience.map(exp => `
\\resumeSubheading
  {${escapeLatex(exp.role)}}{${escapeLatex(exp.startDate)} - ${escapeLatex(exp.endDate)}}
  {${escapeLatex(exp.company)}}{${escapeLatex(exp.location)}}
  ${createDescriptionList(exp.description)}
`).join('');

  const projectsSection = data.projects.map(proj => `
\\resumeSubheading
  {${escapeLatex(proj.name)}}{${proj.url ? `\\href{${proj.url}}{View Project}` : ''}}
  {${escapeLatex(proj.subtitle)}}{ }
  ${createDescriptionList(proj.description)}
`).join('');
  
  const extracurricularSection = data.extracurricular.map(item => `\\resumeItem{${escapeLatex(item)}}`).join('\n');
  const interestsSection = data.interests.map(item => `\\resumeItem{${escapeLatex(item)}}`).join('\n');
  const languagesSection = data.languages.map(lang => `${escapeLatex(lang.name)} (${escapeLatex(lang.proficiency)})`).join(' \\quad ');


  return `
You are an expert in LaTeX resume creation. Your task is to generate a complete, well-formatted, and compilable LaTeX document for a resume based on the provided JSON data.

Use the provided LaTeX template structure below. Do not deviate from it. Fill in the placeholders with the user's data.
You MUST properly escape all special LaTeX characters in the user's data, such as &, %, $, #, _, {, }, ~, ^, and \\.

The user's data has been pre-processed and included in the template placeholders. Your job is to assemble the final, complete LaTeX file.

Here is the LaTeX template to use. You MUST output only the complete LaTeX document.

---
\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{fontawesome5}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\pdfgentounicode=1

\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    #1
    \\vspace{-2pt}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeItemListStart}{\\begin{itemize}[leftmargin=0.15in, label=\\textbullet]}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}}
\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}

\\begin{document}

\\begin{center}
    \\textbf{\\Huge \\scshape ${escapeLatex(data.name)}} \\\\ \\vspace{1pt}
    \\small 
    \\faPhone*~${escapeLatex(data.contact.phone)} $|$ 
    \\href{mailto:${data.contact.email}}{\\underline{${escapeLatex(data.contact.email)}}} $|$ 
    \\href{https://${escapeLatex(data.contact.linkedin)}/}{\\underline{${escapeLatex(data.contact.linkedin)}}} $|$ 
    \\href{https://${escapeLatex(data.contact.github)}}{\\underline{${escapeLatex(data.contact.github)}}} $|$
    \\faMapMarkerAlt~${escapeLatex(data.contact.location)}
    \\vspace{5pt}
\end{center}
${escapeLatex(data.about)}

\\section{Formation}
  \\resumeSubHeadingListStart
    ${educationSection}
  \\resumeSubHeadingListEnd

\\section{Compétences Techniques}
  \\begin{itemize}[leftmargin=0.15in, label={}]
    ${skillsSection}
  \\end{itemize}

\\section{Expérience Professionnelle}
  \\resumeSubHeadingListStart
    ${experienceSection}
  \\resumeSubHeadingListEnd

\\section{Projets}
  \\resumeSubHeadingListStart
    ${projectsSection}
  \\resumeSubHeadingListEnd

\\section{Activités Extrascolaires}
    \\resumeItemListStart
        ${extracurricularSection}
    \\resumeItemListEnd
    
\\section{Centres d'Intérêt}
    \\resumeItemListStart
        ${interestsSection}
    \\resumeItemListEnd
    
\\section{Langues}
    \\small{${languagesSection}}

\\end{document}
---
Generate only the LaTeX code. Do not add any extra explanations or markdown formatting like \`\`\`latex.
`;
}


export async function generateLatexResume(data: PortfolioData): Promise<string> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const prompt = createPrompt(data);

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate LaTeX code from AI. Please check your API key and try again.");
  }
}
