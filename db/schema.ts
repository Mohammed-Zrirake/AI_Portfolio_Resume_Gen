import { pgTable, text, varchar, timestamp, uuid, foreignKey, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// This file defines the database schema using Drizzle ORM.
// It's a blueprint for your backend database (e.g., PostgreSQL).
// This code doesn't run in the frontend but is essential for a full-stack setup.

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const portfolios = pgTable('portfolios', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 255 }).notNull(),
    title: varchar('title', { length: 255 }),
    about: text('about'),
    domain: varchar('domain', { length: 255 }),
});

export const contacts = pgTable('contacts', {
    id: uuid('id').defaultRandom().primaryKey(),
    portfolioId: uuid('portfolio_id').notNull().references(() => portfolios.id, { onDelete: 'cascade' }),
    email: varchar('email', { length: 255 }),
    phone: varchar('phone', { length: 50 }),
    linkedin: varchar('linkedin', { length: 255 }),
    github: varchar('github', { length: 255 }),
    location: varchar('location', { length: 255 }),
});

export const education = pgTable('education', {
    id: uuid('id').defaultRandom().primaryKey(),
    portfolioId: uuid('portfolio_id').notNull().references(() => portfolios.id, { onDelete: 'cascade' }),
    institution: varchar('institution', { length: 255 }).notNull(),
    degree: varchar('degree', { length: 255 }).notNull(),
    location: varchar('location', { length: 255 }),
    startDate: varchar('start_date', { length: 50 }),
    endDate: varchar('end_date', { length: 50 }),
    description: text('description'),
});

export const experiences = pgTable('experiences', {
    id: uuid('id').defaultRandom().primaryKey(),
    portfolioId: uuid('portfolio_id').notNull().references(() => portfolios.id, { onDelete: 'cascade' }),
    role: varchar('role', { length: 255 }).notNull(),
    company: varchar('company', { length: 255 }),
    location: varchar('location', { length: 255 }),
    startDate: varchar('start_date', { length: 50 }),
    endDate: varchar('end_date', { length: 50 }),
    description: text('description'),
});

export const projects = pgTable('projects', {
    id: uuid('id').defaultRandom().primaryKey(),
    portfolioId: uuid('portfolio_id').notNull().references(() => portfolios.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 255 }).notNull(),
    subtitle: varchar('subtitle', { length: 255 }),
    description: text('description'),
    url: varchar('url', { length: 512 }),
});

export const skillCategories = pgTable('skill_categories', {
    id: uuid('id').defaultRandom().primaryKey(),
    portfolioId: uuid('portfolio_id').notNull().references(() => portfolios.id, { onDelete: 'cascade' }),
    category: varchar('category', { length: 255 }).notNull(),
    skills: text('skills').notNull(),
});

export const languages = pgTable('languages', {
    id: uuid('id').defaultRandom().primaryKey(),
    portfolioId: uuid('portfolio_id').notNull().references(() => portfolios.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 100 }).notNull(),
    proficiency: varchar('proficiency', { length: 100 }),
});

// Using text arrays for simple lists
export const interests = pgTable('interests', {
    id: uuid('id').defaultRandom().primaryKey(),
    portfolioId: uuid('portfolio_id').notNull().references(() => portfolios.id, { onDelete: 'cascade' }),
    interest: text('interest').notNull(),
});

export const extracurriculars = pgTable('extracurriculars', {
    id: uuid('id').defaultRandom().primaryKey(),
    portfolioId: uuid('portfolio_id').notNull().references(() => portfolios.id, { onDelete: 'cascade' }),
    activity: text('activity').notNull(),
});


// --- RELATIONS ---

export const usersRelations = relations(users, ({ one }) => ({
  portfolio: one(portfolios, {
    fields: [users.id],
    references: [portfolios.userId],
  }),
}));

export const portfoliosRelations = relations(portfolios, ({ one, many }) => ({
  user: one(users, {
    fields: [portfolios.userId],
    references: [users.id],
  }),
  contact: one(contacts, {
      fields: [portfolios.id],
      references: [contacts.portfolioId]
  }),
  education: many(education),
  experiences: many(experiences),
  projects: many(projects),
  skillCategories: many(skillCategories),
  languages: many(languages),
  interests: many(interests),
  extracurriculars: many(extracurriculars),
}));
