import type { ServiceCategory } from "@/lib/proposals/types";

export interface AssessmentOption {
  text: string;
  text_es: string;
  text_fr: string;
  score: number;
}

export interface AssessmentQuestion {
  id: string;
  category: ServiceCategory;
  question: string;
  question_es: string;
  question_fr: string;
  options: AssessmentOption[];
}

/**
 * Streamlined assessment: 10 questions, one per category.
 * Each question is the most diagnostic for its category.
 * Scoring: 5 (strong), 2 (needs improvement), 0 (missing entirely)
 */
export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // ── Strategy ──
  {
    id: "strategy-1",
    category: "strategy",
    question: "Do you have a documented marketing strategy with clear goals?",
    question_es: "\u00BFTienes una estrategia de marketing documentada con objetivos claros?",
    question_fr: "Avez-vous une strat\u00E9gie marketing document\u00E9e avec des objectifs clairs?",
    options: [
      { text: "Yes, with KPIs and regular reviews", text_es: "S\u00ED, con KPIs y revisiones regulares", text_fr: "Oui, avec des KPIs et des revues r\u00E9guli\u00E8res", score: 5 },
      { text: "We have some goals but nothing formal", text_es: "Tenemos algunas metas pero nada formal", text_fr: "Nous avons quelques objectifs mais rien de formel", score: 2 },
      { text: "No, we just wing it", text_es: "No, solo improvisamos", text_fr: "Non, on improvise", score: 0 },
    ],
  },

  // ── Website ──
  {
    id: "website-1",
    category: "website",
    question: "Does your website look professional, load fast, and convert visitors into leads?",
    question_es: "\u00BFTu sitio web se ve profesional, carga r\u00E1pido y convierte visitantes en prospectos?",
    question_fr: "Votre site web est-il professionnel, rapide et convertit-il les visiteurs en prospects?",
    options: [
      { text: "Yes, it looks great and generates leads consistently", text_es: "S\u00ED, se ve genial y genera prospectos consistentemente", text_fr: "Oui, il est super et g\u00E9n\u00E8re des prospects r\u00E9guli\u00E8rement", score: 5 },
      { text: "It works but could use some updates", text_es: "Funciona pero podr\u00EDa mejorar", text_fr: "\u00C7a fonctionne mais pourrait \u00EAtre am\u00E9lior\u00E9", score: 2 },
      { text: "It is outdated, slow, or we do not have one", text_es: "Est\u00E1 desactualizado, lento, o no tenemos uno", text_fr: "Il est obsol\u00E8te, lent, ou nous n'en avons pas", score: 0 },
    ],
  },

  // ── Ecommerce ──
  {
    id: "ecommerce-1",
    category: "ecommerce",
    question: "If you sell online, is your checkout experience smooth and optimized?",
    question_es: "Si vendes en l\u00EDnea, tu experiencia de compra es fluida y optimizada?",
    question_fr: "Si vous vendez en ligne, votre exp\u00E9rience de paiement est-elle fluide et optimis\u00E9e?",
    options: [
      { text: "Yes, smooth checkout with low abandonment", text_es: "S\u00ED, compra fluida con bajo abandono", text_fr: "Oui, paiement fluide avec faible taux d'abandon", score: 5 },
      { text: "It works but customers complain sometimes", text_es: "Funciona pero los clientes se quejan a veces", text_fr: "\u00C7a fonctionne mais les clients se plaignent parfois", score: 2 },
      { text: "We do not sell online or our checkout is clunky", text_es: "No vendemos en l\u00EDnea o nuestro checkout es complicado", text_fr: "Nous ne vendons pas en ligne ou notre checkout est compliqu\u00E9", score: 0 },
    ],
  },

  // ── Social Media ──
  {
    id: "social-1",
    category: "social-media",
    question: "Do you post consistently on social media and actually engage with your audience?",
    question_es: "Publicas consistentemente en redes sociales y realmente interactuas con tu audiencia?",
    question_fr: "Publiez-vous r\u00E9guli\u00E8rement sur les r\u00E9seaux sociaux et interagissez-vous vraiment avec votre audience?",
    options: [
      { text: "Yes, multiple times a week with real engagement", text_es: "S\u00ED, varias veces por semana con interacci\u00F3n real", text_fr: "Oui, plusieurs fois par semaine avec de vraies interactions", score: 5 },
      { text: "We post sometimes but it is not consistent", text_es: "Publicamos a veces pero no es consistente", text_fr: "Nous postons parfois mais ce n'est pas r\u00E9gulier", score: 2 },
      { text: "Rarely or never", text_es: "Raramente o nunca", text_fr: "Rarement ou jamais", score: 0 },
    ],
  },

  // ── Content ──
  {
    id: "content-1",
    category: "content",
    question: "Do you create original, branded content for your business (photos, graphics, blogs)?",
    question_es: "Creas contenido original y de marca para tu negocio (fotos, gr\u00E1ficos, blogs)?",
    question_fr: "Cr\u00E9ez-vous du contenu original et de marque pour votre entreprise (photos, graphismes, blogs)?",
    options: [
      { text: "Yes, consistently with a content strategy", text_es: "S\u00ED, consistentemente con una estrategia de contenido", text_fr: "Oui, r\u00E9guli\u00E8rement avec une strat\u00E9gie de contenu", score: 5 },
      { text: "Sometimes, but quality and consistency vary", text_es: "A veces, pero la calidad y consistencia var\u00EDan", text_fr: "Parfois, mais la qualit\u00E9 et la r\u00E9gularit\u00E9 varient", score: 2 },
      { text: "We mostly use stock images or nothing at all", text_es: "Mayormente usamos im\u00E1genes gen\u00E9ricas o nada", text_fr: "Nous utilisons surtout des images g\u00E9n\u00E9riques ou rien du tout", score: 0 },
    ],
  },

  // ── Video Production ──
  {
    id: "video-1",
    category: "video-production",
    question: "Do you use video in your marketing (social, website, ads)?",
    question_es: "Usas video en tu marketing (redes, sitio web, anuncios)?",
    question_fr: "Utilisez-vous la vid\u00E9o dans votre marketing (r\u00E9seaux, site web, pubs)?",
    options: [
      { text: "Yes, we produce professional video content regularly", text_es: "S\u00ED, producimos contenido de video profesional regularmente", text_fr: "Oui, nous produisons r\u00E9guli\u00E8rement du contenu vid\u00E9o professionnel", score: 5 },
      { text: "We have done some but it is not consistent", text_es: "Hemos hecho algunos pero no es consistente", text_fr: "Nous en avons fait quelques uns mais ce n'est pas r\u00E9gulier", score: 2 },
      { text: "No video content at all", text_es: "Sin contenido de video", text_fr: "Aucun contenu vid\u00E9o", score: 0 },
    ],
  },

  // ── Email Marketing ──
  {
    id: "email-1",
    category: "email",
    question: "Do you have an email list and send regular emails with automations?",
    question_es: "Tienes una lista de email y env\u00EDas emails regulares con automatizaciones?",
    question_fr: "Avez-vous une liste email et envoyez-vous des emails r\u00E9guliers avec des automatisations?",
    options: [
      { text: "Yes, with segmentation, automations, and good open rates", text_es: "S\u00ED, con segmentaci\u00F3n, automatizaciones y buenas tasas de apertura", text_fr: "Oui, avec segmentation, automatisations et bons taux d'ouverture", score: 5 },
      { text: "We have a list but barely email them", text_es: "Tenemos una lista pero casi no les enviamos", text_fr: "Nous avons une liste mais leur envoyons \u00E0 peine des emails", score: 2 },
      { text: "No email marketing at all", text_es: "Sin email marketing", text_fr: "Aucun email marketing", score: 0 },
    ],
  },

  // ── SEO ──
  {
    id: "seo-1",
    category: "seo",
    question: "Does your business show up on the first page of Google for your main keywords?",
    question_es: "Tu negocio aparece en la primera p\u00E1gina de Google para tus palabras clave principales?",
    question_fr: "Votre entreprise appara\u00EEt-elle en premi\u00E8re page de Google pour vos mots-cl\u00E9s principaux?",
    options: [
      { text: "Yes, consistently for multiple keywords", text_es: "S\u00ED, consistentemente para m\u00FAltiples palabras clave", text_fr: "Oui, r\u00E9guli\u00E8rement pour plusieurs mots-cl\u00E9s", score: 5 },
      { text: "For some keywords, not all", text_es: "Para algunas palabras clave, no todas", text_fr: "Pour certains mots-cl\u00E9s, pas tous", score: 2 },
      { text: "No, or I have no idea", text_es: "No, o no tengo idea", text_fr: "Non, ou je n'en ai aucune id\u00E9e", score: 0 },
    ],
  },

  // ── Ads ──
  {
    id: "ads-1",
    category: "ads",
    question: "Do you run paid ads (Google, Meta, LinkedIn) with tracked ROI?",
    question_es: "Ejecutas anuncios pagados (Google, Meta, LinkedIn) con ROI rastreado?",
    question_fr: "Faites-vous de la pub payante (Google, Meta, LinkedIn) avec un ROI suivi?",
    options: [
      { text: "Yes, with tracking and positive returns", text_es: "S\u00ED, con seguimiento y retornos positivos", text_fr: "Oui, avec suivi et retours positifs", score: 5 },
      { text: "We have tried it but are not sure about results", text_es: "Lo hemos intentado pero no estamos seguros de los resultados", text_fr: "Nous avons essay\u00E9 mais ne sommes pas s\u00FBrs des r\u00E9sultats", score: 2 },
      { text: "No paid advertising", text_es: "Sin publicidad pagada", text_fr: "Aucune publicit\u00E9 payante", score: 0 },
    ],
  },

  // ── AI & Automation ──
  {
    id: "ai-1",
    category: "ai-automation",
    question: "Do you use AI tools or automation to streamline your business operations?",
    question_es: "Usas herramientas de IA o automatizaci\u00F3n para optimizar las operaciones de tu negocio?",
    question_fr: "Utilisez-vous des outils d'IA ou d'automatisation pour optimiser vos op\u00E9rations?",
    options: [
      { text: "Yes, for content, customer service, or workflows", text_es: "S\u00ED, para contenido, servicio al cliente o flujos de trabajo", text_fr: "Oui, pour le contenu, le service client ou les workflows", score: 5 },
      { text: "We are exploring it but have not implemented much", text_es: "Lo estamos explorando pero no hemos implementado mucho", text_fr: "Nous explorons mais n'avons pas beaucoup impl\u00E9ment\u00E9", score: 2 },
      { text: "No, everything is still manual", text_es: "No, todo sigue siendo manual", text_fr: "Non, tout est encore manuel", score: 0 },
    ],
  },
];

export const TOTAL_QUESTIONS = ASSESSMENT_QUESTIONS.length;
