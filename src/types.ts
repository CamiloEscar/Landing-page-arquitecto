import type { z } from "astro:content";

import { projectSchema } from "./api";

export type Project = z.infer<typeof projectSchema>;

export interface Service {
  icon: string; // Lucide icon name
  title: string;
  description: string;
  link?: string;
  image?: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  duration?: string;
  bullets?: string[];
}

export interface Technology {
  name: string;
  category: string;
  description: string;
  logo: string;
}

export interface Testimonial {
  client: string;
  project: string;
  quote: string;
  rating: number; // 1-5
  avatar?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HeroSectionProps {
  studioName?: string;
  tagline?: string;
  yearsExperience?: string;
  ctaText?: string;
  ctaHref?: string;
  categories?: string[];
}
