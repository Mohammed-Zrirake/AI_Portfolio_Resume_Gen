import { User, PortfolioData } from './types';

// --- MOCK DATABASE / LOCAL STORAGE HELPERS ---
const SESSION_KEY = 'auth-session';
const MOCK_USERS_KEY = 'mock-users';

const getPortfolioKey = (userId: string) => `portfolio-data-${userId}`;

const initialPortfolioData: PortfolioData = {
  name: 'Mohammed Zrirake',
  title: 'Étudiant en génie informatique',
  about: "Étudiant en génie informatique passionné par les nouvelles technologies et l'innovation, je suis à la recherche d'un stage de fin d'études stimulant. Je souhaite mettre mes compétences techniques au service de projets ambitieux, contribuer activement au sein d'équipes dynamiques et enrichir mon expérience pratique dans un environnement professionnel innovant et challengeant.",
  contact: {
    phone: '(+212) 628830346',
    email: 'mohamed.zrirake@gmail.com',
    linkedin: 'linkedin.com/in/mohammed-zrirake',
    github: 'github.com/mohammed-zrirake',
    location: 'El Bassatine, Meknès, Maroc',
  },
  education: [
    { id: 'edu1', institution: 'École Nationale des Sciences Appliquées', degree: 'Génie Informatique', location: 'Fès, Maroc', startDate: '2023', endDate: 'Present', description: '' },
    { id: 'edu2', institution: 'École Nationale des Sciences Appliquées', degree: 'Classes Préparatoires Intégrées', location: 'Fès, Maroc', startDate: '2021', endDate: '2023', description: '' },
    { id: 'edu3', institution: 'Lycée Lalla Amina', degree: 'Baccalauréat en Sciences Physiques - Mention Très Bien', location: 'Meknès, Maroc', startDate: '2021', endDate: '', description: '' },
  ],
  skills: [
      { id: 'skillcat1', category: 'Langages de Programmation', skills: 'Java, C/C#, JavaScript/TypeScript' },
      { id: 'skillcat2', category: 'Frameworks & Bibliothèques', skills: 'Spring Framework, Express.js/Node.js, Nest.js, Next.js, Tailwind CSS, shadcnUI, AntDesign' },
      { id: 'skillcat3', category: 'Bases de Données', skills: 'SQL server, MySQL, MongoDB, PostgreSQL' },
      { id: 'skillcat4', category: 'Gestion de Versions et de Projets', skills: 'Git, GitHub, Jira(Trello.com), Scrum methodology' },
      { id: 'skillcat5', category: 'Outil DevOps et CI/CD', skills: 'Docker, kubernetes, jenkins, Terraform, Github Actions' },
      { id: 'skillcat6', category: 'Cloud Plateforms', skills: 'Azure, Render, Vercel, DigitalOceans' },
  ],
  experience: [
    { id: 'exp1', role: 'Développeur Full Stack (Stage PFA & Freelance)', company: 'ScreenDay', location: 'Fès, Maroc (Hybride)', startDate: 'Juillet 2025', endDate: 'Présent', description: "Contribution au développement de Rentflow, un système complet de gestion de location de voitures, d'abord lors d'un stage PFA de 3 mois, puis en freelance.\n- Backend : Conception et implémentation d'une API RESTful robuste avec Nest.js et Prisma pour gérer les agences, clients, véhicules, réservations, contrats et paiements.\n- Mise en place d'un système d'authentification sécurisé avec JWT et d'un contrôle d'accès basé sur les rôles, ainsi que la gestion d'alertes et de notifications.\n- Frontend : Développement d'un tableau de bord de gestion dynamique et réactif avec Next.js (App Router) et Ant Design, incluant des opérations CRUD complètes.\n- Intégration de fonctionnalités avancées telles que l'upload de fichiers sur Cloudinary et la génération de PDF côté client pour les contrats et factures avec jsPDF.\n- DevOps : Déploiement du backend sur DigitalOcean et du frontend sur Vercel, avec gestion du projet en **monorepo** via **pnpm workspaces** pour une CI/CD efficace." },
    { id: 'exp2', role: 'Stagiaire en Développement Logiciel', company: 'LafargeHolcim', location: 'Maroc', startDate: 'Juillet-Août 2024', endDate: '', description: "Amélioration d'une application mobile de suivi des chauffeurs en utilisant React Native et déploiement avec Expo et EAS, avec authentification via Firebase.\n- Implémentation d'une cartographie géographique permettant aux chefs de département de suivre les chauffeurs en temps réel dans leur département.\n- Collaboration via GitHub, acquérant une expérience pratique en développement full-stack, sécurité et travail d'équipe." },
  ],
  projects: [
    { id: 'proj1', name: "Plateforme d'enchères de voitures \"Carsties Auctions\"", subtitle: 'Microservices .NET & React/Next.js', url: 'https://github.com', description: "Développement de \"Carsties Auctions\", une plateforme d'enchères de voitures en ligne utilisant une architecture microservices avec un backend .NET et un frontend React/Next.js.\n- Implémentation de fonctionnalités clés incluant la création et la gestion des annonces, les enchères en temps réel (avec SignalR), la recherche avancée (via un microservice de recherche dédié) et la gestion de l'identité des utilisateurs (avec IdentityServer et NextAuth.js).\n- Intégration de RabbitMQ pour la communication inter-services asynchrone, une passerelle API pour la centralisation des requêtes, et utilisation de Docker pour la conteneurisation, avec exploration du déploiement sur Kubernetes.\n- Conception d'une interface utilisateur interactive pour la soumission des offres, le suivi des notifications et la gestion des comptes, tout en garantissant la sécurité et la scalabilité de la plateforme." },
    { id: 'proj2', name: 'Plateforme E-Learning "Nour"', subtitle: 'Node.js & React', url: 'https://github.com', description: "Développement d'une plateforme d'e-learning complète, Nour, avec un backend en Node.js/Express et MongoDB, et un frontend en React et TypeScript.\n- Implémentation de fonctionnalités robustes telles que l'authentification sécurisée via JWT, la gestion des rôles, le traitement des paiements avec Stripe, et la gestion de contenu multimédia via Cloudinary.\n- Intégration d'un système de recommandation basé sur l'algorithme SVD pour suggérer des cours pertinents, ainsi que la génération de certificats PDF à la complétion des cours." },
    { id: 'proj3', name: 'Site E-commerce Full Stack', subtitle: 'Spring Boot et React', url: 'https://github.com', description: "Développement d'un site E-commerce complet incluant la gestion des produits, des utilisateurs et des commandes, avec intégration du paiement via PayPal.\n- Conception et implémentation d'une interface utilisateur intuitive pour la navigation des produits, la gestion du panier (avec Redux), le processus de paiement, et un tableau de bord administrateur pour la gestion du contenu et des commandes.\n- Renforcement des compétences en développement full-stack, conception d'API RESTful, authentification sécurisée avec JWT, gestion de l'état de l'application (Redux), et intégration de base de données SQL (PostgreSQL) via la solution cloud Neon." },
  ],
  extracurricular: [
      'Membre de la branche étudiante The Great Debaters ENSAF section anglaise',
      'Vice-Président de la branche étudiante IEEE ENSAF',
      'Participant au UPF Coding Challenge 2025'
  ],
  interests: [
      "Résolution de Problèmes – Passionné par les défis et l'apprentissage de nouvelles façons de les résoudre.",
      "Communication et Collaboration – Apprécie le travail d'équipe et le partage d'idées."
  ],
  languages: [
      { id: 'lang1', name: 'Arabe', proficiency: 'Natif' },
      { id: 'lang2', name: 'Français', proficiency: 'Intermédiaire' },
      { id: 'lang3', name: 'Anglais', proficiency: 'Intermédiaire' },
  ],
  domain: 'mohammedzrirake.dev',
};

type MockUser = User & { passwordHash: string };

const getMockUsers = (): MockUser[] => {
    const usersJson = localStorage.getItem(MOCK_USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
};

const saveMockUsers = (users: MockUser[]) => {
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
};

// --- AUTHENTICATION API ---

export const signup = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        const users = getMockUsers();
        const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (existingUser) {
            return reject(new Error('User already exists'));
        }

        const newUser: MockUser = {
            id: email.toLowerCase(),
            email: email.toLowerCase(),
            passwordHash: `hashed_${password}` // Simple mock hash
        };

        users.push(newUser);
        saveMockUsers(users);

        const sessionUser = { id: newUser.id, email: newUser.email };
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
        
        resolve(sessionUser);

    }, 1000);
  });
};


export const login = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        const users = getMockUsers();
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (user && user.passwordHash === `hashed_${password}`) {
            const sessionUser: User = { id: user.id, email: user.email };
            localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
            resolve(sessionUser);
        } else {
            reject(new Error('Invalid credentials'));
        }
    }, 1000);
  });
};

export const logout = (): Promise<void> => {
  return new Promise(resolve => {
    localStorage.removeItem(SESSION_KEY);
    resolve();
  });
};

export const checkSession = (): Promise<User | null> => {
  return new Promise(resolve => {
    const sessionData = localStorage.getItem(SESSION_KEY);
    if (sessionData) {
      resolve(JSON.parse(sessionData));
    } else {
      resolve(null);
    }
  });
};


// --- PORTFOLIO DATA API ---

export const getPortfolioData = (userId: string): Promise<PortfolioData> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const dataKey = getPortfolioKey(userId);
            const savedData = localStorage.getItem(dataKey);
            if (savedData) {
                resolve(JSON.parse(savedData));
            } else {
                // For new users, return the initial default data
                resolve(initialPortfolioData);
            }
        }, 500);
    });
};

export const savePortfolioData = (userId: string, data: PortfolioData): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const dataKey = getPortfolioKey(userId);
            localStorage.setItem(dataKey, JSON.stringify(data));
            resolve();
        }, 1000);
    });
};