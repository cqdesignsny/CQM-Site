import type { ServiceCategory } from "@/lib/proposals/types";
import type { AssessmentAnswer, CategoryScore } from "@/lib/proposals/types";
import { ASSESSMENT_QUESTIONS } from "./questions";
import { CATEGORIES } from "@/lib/proposals/services-data";

// Map low-scoring categories to recommended service IDs
const CATEGORY_SERVICE_MAP: Record<ServiceCategory, string[]> = {
  strategy: ["brand-audit", "customer-journey"],
  website: ["landing-page", "website-1-3-wordpress", "website-maintenance"],
  ecommerce: ["shopify-setup", "woocommerce-setup"],
  "social-media": ["social-1-platform", "community-management"],
  content: ["blog-writing", "static-post", "reel-edit"],
  "video-production": ["brand-video", "podcast-episode"],
  email: ["newsletter", "email-sequence"],
  seo: ["seo-audit", "ongoing-seo", "local-seo"],
  ads: ["ad-management", "retargeting", "pixel-setup"],
  "ai-automation": ["ai-agent", "ai-automation"],
};

export function calculateCategoryScores(
  answers: AssessmentAnswer[]
): CategoryScore[] {
  return CATEGORIES.map((cat) => {
    const categoryQuestions = ASSESSMENT_QUESTIONS.filter(
      (q) => q.category === cat.id
    );
    const maxScore = categoryQuestions.length * 5;

    const score = categoryQuestions.reduce((sum, q) => {
      const answer = answers.find((a) => a.questionId === q.id);
      return sum + (answer?.score ?? 0);
    }, 0);

    return {
      category: cat.id,
      score,
      maxScore,
      percentage: maxScore > 0 ? Math.round((score / maxScore) * 100) : 0,
    };
  });
}

export function calculateOverallScore(categoryScores: CategoryScore[]): number {
  const totalScore = categoryScores.reduce((sum, cs) => sum + cs.score, 0);
  const totalMax = categoryScores.reduce((sum, cs) => sum + cs.maxScore, 0);
  return totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;
}

export function getRecommendedServices(
  categoryScores: CategoryScore[]
): string[] {
  const recommendations: string[] = [];

  for (const cs of categoryScores) {
    // Recommend services for categories scoring below 60%
    if (cs.percentage < 60) {
      const services = CATEGORY_SERVICE_MAP[cs.category] || [];
      recommendations.push(...services);
    }
  }

  // Remove duplicates
  return [...new Set(recommendations)];
}

export function getScoreLabel(
  score: number,
  locale: "en" | "es" | "fr" = "en"
): string {
  if (score >= 80) return locale === "es" ? "Profesional del Marketing" : locale === "fr" ? "Pro du Marketing" : "Marketing Pro";
  if (score >= 60) return locale === "es" ? "Base Sólida" : locale === "fr" ? "Base Solide" : "Solid Foundation";
  if (score >= 40) return locale === "es" ? "Progresando" : locale === "fr" ? "En Progrès" : "Getting There";
  return locale === "es" ? "Necesita Trabajo" : locale === "fr" ? "À Améliorer" : "Needs Work";
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-400";
  if (score >= 60) return "text-blue-400";
  if (score >= 40) return "text-amber-400";
  return "text-red-400";
}

export function getScoreBarColor(score: number): string {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-blue-500";
  if (score >= 40) return "bg-amber-500";
  return "bg-red-500";
}
