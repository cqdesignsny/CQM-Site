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

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // ── Strategy (2 questions) ──
  {
    id: "strategy-1",
    category: "strategy",
    question: "Do you have a documented marketing strategy?",
    question_es: "¿Tiene una estrategia de marketing documentada?",
    question_fr: "Avez-vous une stratégie marketing documentée ?",
    options: [
      { text: "Yes, with clear KPIs and regular reviews", text_es: "Sí, con KPIs claros y revisiones regulares", text_fr: "Oui, avec des KPIs clairs et des revues régulières", score: 5 },
      { text: "We have some goals but nothing formal", text_es: "Tenemos algunas metas pero nada formal", text_fr: "Nous avons quelques objectifs mais rien de formel", score: 2 },
      { text: "No, we market without a plan", text_es: "No, hacemos marketing sin un plan", text_fr: "Non, nous faisons du marketing sans plan", score: 0 },
    ],
  },
  {
    id: "strategy-2",
    category: "strategy",
    question: "Do you understand your customer journey from awareness to purchase?",
    question_es: "¿Entiende el viaje de su cliente desde el conocimiento hasta la compra?",
    question_fr: "Comprenez-vous le parcours de votre client de la découverte à l'achat ?",
    options: [
      { text: "Yes, we've mapped every touchpoint", text_es: "Sí, hemos mapeado cada punto de contacto", text_fr: "Oui, nous avons cartographié chaque point de contact", score: 5 },
      { text: "Somewhat, but there are gaps", text_es: "Algo, pero hay brechas", text_fr: "Un peu, mais il y a des lacunes", score: 2 },
      { text: "Not really sure how customers find us", text_es: "No estoy seguro de cómo nos encuentran los clientes", text_fr: "Pas vraiment sûr de comment les clients nous trouvent", score: 0 },
    ],
  },

  // ── Website (3 questions) ──
  {
    id: "website-1",
    category: "website",
    question: "Do you have a professional website?",
    question_es: "¿Tiene un sitio web profesional?",
    question_fr: "Avez-vous un site web professionnel ?",
    options: [
      { text: "Yes, modern, fast, and mobile-optimized", text_es: "Sí, moderno, rápido y optimizado para móviles", text_fr: "Oui, moderne, rapide et optimisé mobile", score: 5 },
      { text: "Yes, but it\u2019s outdated or slow", text_es: "Sí, pero está desactualizado o lento", text_fr: "Oui, mais il est obsolète ou lent", score: 2 },
      { text: "No website or just a basic template", text_es: "Sin sitio web o solo una plantilla básica", text_fr: "Pas de site web ou juste un modèle basique", score: 0 },
    ],
  },
  {
    id: "website-2",
    category: "website",
    question: "Does your website convert visitors into leads or customers?",
    question_es: "¿Su sitio web convierte visitantes en clientes potenciales o compradores?",
    question_fr: "Votre site web convertit-il les visiteurs en prospects ou clients ?",
    options: [
      { text: "Yes, we have clear CTAs and forms that generate leads", text_es: "Sí, tenemos CTAs claros y formularios que generan clientes potenciales", text_fr: "Oui, nous avons des CTA clairs et des formulaires qui génèrent des leads", score: 5 },
      { text: "Sometimes, but we could do better", text_es: "A veces, pero podríamos mejorar", text_fr: "Parfois, mais nous pourrions faire mieux", score: 2 },
      { text: "We don\u2019t track conversions or have lead forms", text_es: "No rastreamos conversiones ni tenemos formularios", text_fr: "Nous ne suivons pas les conversions et n'avons pas de formulaires", score: 0 },
    ],
  },
  {
    id: "website-3",
    category: "website",
    question: "Is your website regularly updated with fresh content?",
    question_es: "¿Su sitio web se actualiza regularmente con contenido nuevo?",
    question_fr: "Votre site web est-il régulièrement mis à jour avec du contenu frais ?",
    options: [
      { text: "Yes, at least monthly", text_es: "Sí, al menos mensualmente", text_fr: "Oui, au moins mensuellement", score: 5 },
      { text: "Occasionally, a few times a year", text_es: "Ocasionalmente, algunas veces al año", text_fr: "Occasionnellement, quelques fois par an", score: 2 },
      { text: "Rarely or never", text_es: "Raramente o nunca", text_fr: "Rarement ou jamais", score: 0 },
    ],
  },

  // ── Ecommerce (2 questions) ──
  {
    id: "ecommerce-1",
    category: "ecommerce",
    question: "Do you sell products or services online?",
    question_es: "¿Vende productos o servicios en línea?",
    question_fr: "Vendez-vous des produits ou services en ligne ?",
    options: [
      { text: "Yes, with a full online store", text_es: "Sí, con una tienda en línea completa", text_fr: "Oui, avec une boutique en ligne complète", score: 5 },
      { text: "Partially \u2014 some products, but not all", text_es: "Parcialmente \u2014 algunos productos, pero no todos", text_fr: "Partiellement — certains produits, mais pas tous", score: 2 },
      { text: "No, we don\u2019t sell online yet", text_es: "No, aún no vendemos en línea", text_fr: "Non, nous ne vendons pas encore en ligne", score: 0 },
    ],
  },
  {
    id: "ecommerce-2",
    category: "ecommerce",
    question: "Is your online checkout experience optimized and easy to use?",
    question_es: "¿Su experiencia de compra en línea está optimizada y es fácil de usar?",
    question_fr: "Votre expérience de paiement en ligne est-elle optimisée et facile à utiliser ?",
    options: [
      { text: "Yes, it\u2019s smooth with low cart abandonment", text_es: "Sí, es fluida con bajo abandono de carrito", text_fr: "Oui, elle est fluide avec un faible taux d'abandon de panier", score: 5 },
      { text: "It works but could be improved", text_es: "Funciona pero podría mejorar", text_fr: "Ça fonctionne mais pourrait être amélioré", score: 2 },
      { text: "We don\u2019t have an online store / it\u2019s clunky", text_es: "No tenemos tienda en línea / es complicada", text_fr: "Nous n'avons pas de boutique en ligne / elle est compliquée", score: 0 },
    ],
  },

  // ── Social Media (2 questions) ──
  {
    id: "social-1",
    category: "social-media",
    question: "How often do you post on social media?",
    question_es: "¿Con qué frecuencia publica en redes sociales?",
    question_fr: "À quelle fréquence publiez-vous sur les réseaux sociaux ?",
    options: [
      { text: "Multiple times per week with a content calendar", text_es: "Varias veces por semana con un calendario de contenido", text_fr: "Plusieurs fois par semaine avec un calendrier de contenu", score: 5 },
      { text: "Occasionally, without a real plan", text_es: "Ocasionalmente, sin un plan real", text_fr: "Occasionnellement, sans vrai plan", score: 2 },
      { text: "Rarely or never", text_es: "Raramente o nunca", text_fr: "Rarement ou jamais", score: 0 },
    ],
  },
  {
    id: "social-2",
    category: "social-media",
    question: "Do you actively engage with your social media audience?",
    question_es: "¿Interactúa activamente con su audiencia en redes sociales?",
    question_fr: "Interagissez-vous activement avec votre audience sur les réseaux sociaux ?",
    options: [
      { text: "Yes, we respond to comments and DMs promptly", text_es: "Sí, respondemos a comentarios y mensajes rápidamente", text_fr: "Oui, nous répondons rapidement aux commentaires et messages", score: 5 },
      { text: "Sometimes, when we have time", text_es: "A veces, cuando tenemos tiempo", text_fr: "Parfois, quand nous avons le temps", score: 2 },
      { text: "We mostly just post and leave it", text_es: "Mayormente solo publicamos y lo dejamos", text_fr: "Nous publions surtout et laissons faire", score: 0 },
    ],
  },

  // ── Content (2 questions) ──
  {
    id: "content-1",
    category: "content",
    question: "Do you create original content for your brand (blogs, graphics, photos)?",
    question_es: "¿Crea contenido original para su marca (blogs, gráficos, fotos)?",
    question_fr: "Créez-vous du contenu original pour votre marque (blogs, graphismes, photos) ?",
    options: [
      { text: "Yes, consistently with a content strategy", text_es: "Sí, consistentemente con una estrategia de contenido", text_fr: "Oui, régulièrement avec une stratégie de contenu", score: 5 },
      { text: "Sometimes, but it\u2019s inconsistent", text_es: "A veces, pero es inconsistente", text_fr: "Parfois, mais c'est irrégulier", score: 2 },
      { text: "No, we rely on stock content or nothing", text_es: "No, dependemos de contenido genérico o nada", text_fr: "Non, nous dépendons de contenu générique ou rien", score: 0 },
    ],
  },
  {
    id: "content-2",
    category: "content",
    question: "Do you use professional photography and branded visuals?",
    question_es: "¿Utiliza fotografía profesional y visuales de marca?",
    question_fr: "Utilisez-vous de la photographie professionnelle et des visuels de marque ?",
    options: [
      { text: "Yes, all our visuals are on-brand and professional", text_es: "Sí, todos nuestros visuales son profesionales y de marca", text_fr: "Oui, tous nos visuels sont professionnels et de marque", score: 5 },
      { text: "We have some, but it\u2019s mixed quality", text_es: "Tenemos algunos, pero la calidad es mixta", text_fr: "Nous en avons quelques-uns, mais la qualité est variable", score: 2 },
      { text: "We mostly use phone photos or stock images", text_es: "Mayormente usamos fotos del teléfono o imágenes genéricas", text_fr: "Nous utilisons surtout des photos de téléphone ou images génériques", score: 0 },
    ],
  },

  // ── Video Production (2 questions) ──
  {
    id: "video-1",
    category: "video-production",
    question: "Do you use video in your marketing?",
    question_es: "¿Utiliza video en su marketing?",
    question_fr: "Utilisez-vous la vidéo dans votre marketing ?",
    options: [
      { text: "Yes, we create professional video content regularly", text_es: "Sí, creamos contenido de video profesional regularmente", text_fr: "Oui, nous créons régulièrement du contenu vidéo professionnel", score: 5 },
      { text: "We\u2019ve done some videos but not consistently", text_es: "Hemos hecho algunos videos pero no consistentemente", text_fr: "Nous avons fait quelques vidéos mais pas régulièrement", score: 2 },
      { text: "No video content at all", text_es: "Sin contenido de video", text_fr: "Aucun contenu vidéo", score: 0 },
    ],
  },
  {
    id: "video-2",
    category: "video-production",
    question: "Do you have a podcast or video series for your brand?",
    question_es: "¿Tiene un podcast o serie de videos para su marca?",
    question_fr: "Avez-vous un podcast ou une série vidéo pour votre marque ?",
    options: [
      { text: "Yes, with regular episodes", text_es: "Sí, con episodios regulares", text_fr: "Oui, avec des épisodes réguliers", score: 5 },
      { text: "We\u2019ve considered it but haven\u2019t started", text_es: "Lo hemos considerado pero no hemos empezado", text_fr: "Nous y avons pensé mais n'avons pas commencé", score: 2 },
      { text: "No, not something we\u2019ve thought about", text_es: "No, no es algo que hayamos pensado", text_fr: "Non, ce n'est pas quelque chose que nous avons envisagé", score: 0 },
    ],
  },

  // ── Email Marketing (2 questions) ──
  {
    id: "email-1",
    category: "email",
    question: "Do you have an email list and send regular newsletters?",
    question_es: "¿Tiene una lista de correo y envía boletines regularmente?",
    question_fr: "Avez-vous une liste email et envoyez-vous des newsletters régulièrement ?",
    options: [
      { text: "Yes, with segmentation and automation", text_es: "Sí, con segmentación y automatización", text_fr: "Oui, avec segmentation et automatisation", score: 5 },
      { text: "We have a list but rarely email them", text_es: "Tenemos una lista pero raramente les enviamos", text_fr: "Nous avons une liste mais leur envoyons rarement des emails", score: 2 },
      { text: "No email marketing at all", text_es: "Sin email marketing", text_fr: "Aucun email marketing", score: 0 },
    ],
  },
  {
    id: "email-2",
    category: "email",
    question: "Do you use email automations (welcome series, abandoned cart, etc.)?",
    question_es: "¿Utiliza automatizaciones de email (serie de bienvenida, carrito abandonado, etc.)?",
    question_fr: "Utilisez-vous des automatisations email (série de bienvenue, panier abandonné, etc.) ?",
    options: [
      { text: "Yes, we have multiple active automations", text_es: "Sí, tenemos múltiples automatizaciones activas", text_fr: "Oui, nous avons plusieurs automatisations actives", score: 5 },
      { text: "One or two basic ones", text_es: "Una o dos básicas", text_fr: "Une ou deux basiques", score: 2 },
      { text: "No automations set up", text_es: "Sin automatizaciones configuradas", text_fr: "Aucune automatisation configurée", score: 0 },
    ],
  },

  // ── SEO (3 questions) ──
  {
    id: "seo-1",
    category: "seo",
    question: "Does your business appear on the first page of Google for your main keywords?",
    question_es: "¿Su negocio aparece en la primera página de Google para sus palabras clave principales?",
    question_fr: "Votre entreprise apparaît-elle en première page de Google pour vos mots-clés principaux ?",
    options: [
      { text: "Yes, consistently for multiple keywords", text_es: "Sí, consistentemente para múltiples palabras clave", text_fr: "Oui, régulièrement pour plusieurs mots-clés", score: 5 },
      { text: "For some keywords, not all", text_es: "Para algunas palabras clave, no todas", text_fr: "Pour certains mots-clés, pas tous", score: 2 },
      { text: "No, or I don\u2019t know", text_es: "No, o no lo sé", text_fr: "Non, ou je ne sais pas", score: 0 },
    ],
  },
  {
    id: "seo-2",
    category: "seo",
    question: "Is your Google Business Profile optimized and actively managed?",
    question_es: "¿Su perfil de Google Business está optimizado y se gestiona activamente?",
    question_fr: "Votre profil Google Business est-il optimisé et activement géré ?",
    options: [
      { text: "Yes, with regular posts, photos, and review responses", text_es: "Sí, con publicaciones regulares, fotos y respuestas a reseñas", text_fr: "Oui, avec des publications, photos et réponses aux avis régulières", score: 5 },
      { text: "It\u2019s set up but not actively managed", text_es: "Está configurado pero no se gestiona activamente", text_fr: "Il est configuré mais pas activement géré", score: 2 },
      { text: "I haven\u2019t claimed it / don\u2019t have one", text_es: "No lo he reclamado / no tengo uno", text_fr: "Je ne l'ai pas revendiqué / je n'en ai pas", score: 0 },
    ],
  },
  {
    id: "seo-3",
    category: "seo",
    question: "Do you track your website analytics (traffic, conversions, bounce rate)?",
    question_es: "¿Rastrea las analíticas de su sitio web (tráfico, conversiones, tasa de rebote)?",
    question_fr: "Suivez-vous les analytiques de votre site web (trafic, conversions, taux de rebond) ?",
    options: [
      { text: "Yes, we review data monthly and adjust strategy", text_es: "Sí, revisamos datos mensualmente y ajustamos la estrategia", text_fr: "Oui, nous révisons les données mensuellement et ajustons la stratégie", score: 5 },
      { text: "We have analytics but rarely look at them", text_es: "Tenemos analíticas pero raramente las revisamos", text_fr: "Nous avons des analytiques mais les regardons rarement", score: 2 },
      { text: "No analytics tracking set up", text_es: "Sin seguimiento de analíticas configurado", text_fr: "Aucun suivi analytique configuré", score: 0 },
    ],
  },

  // ── Ads (2 questions) ──
  {
    id: "ads-1",
    category: "ads",
    question: "Do you run paid advertising (Google Ads, Facebook Ads, etc.)?",
    question_es: "¿Ejecuta publicidad pagada (Google Ads, Facebook Ads, etc.)?",
    question_fr: "Faites-vous de la publicité payante (Google Ads, Facebook Ads, etc.) ?",
    options: [
      { text: "Yes, with tracking and positive ROI", text_es: "Sí, con seguimiento y ROI positivo", text_fr: "Oui, avec suivi et ROI positif", score: 5 },
      { text: "We\u2019ve tried it but aren\u2019t sure about results", text_es: "Lo hemos intentado pero no estamos seguros de los resultados", text_fr: "Nous avons essayé mais ne sommes pas sûrs des résultats", score: 2 },
      { text: "No paid advertising", text_es: "Sin publicidad pagada", text_fr: "Aucune publicité payante", score: 0 },
    ],
  },
  {
    id: "ads-2",
    category: "ads",
    question: "Do you retarget website visitors with ads?",
    question_es: "¿Retargeta a los visitantes de su sitio web con anuncios?",
    question_fr: "Faites-vous du retargeting des visiteurs de votre site web avec des publicités ?",
    options: [
      { text: "Yes, with pixel tracking and custom audiences", text_es: "Sí, con seguimiento de píxel y audiencias personalizadas", text_fr: "Oui, avec suivi par pixel et audiences personnalisées", score: 5 },
      { text: "We\u2019ve set up pixels but don\u2019t retarget yet", text_es: "Hemos configurado píxeles pero no retargeteamos aún", text_fr: "Nous avons configuré les pixels mais ne faisons pas encore de retargeting", score: 2 },
      { text: "No retargeting at all", text_es: "Sin retargeting", text_fr: "Aucun retargeting", score: 0 },
    ],
  },

  // ── AI & Automation (2 questions) ──
  {
    id: "ai-1",
    category: "ai-automation",
    question: "Do you use any AI tools or automation in your business?",
    question_es: "¿Utiliza herramientas de IA o automatización en su negocio?",
    question_fr: "Utilisez-vous des outils d'IA ou d'automatisation dans votre entreprise ?",
    options: [
      { text: "Yes, for content, customer service, or workflows", text_es: "Sí, para contenido, servicio al cliente o flujos de trabajo", text_fr: "Oui, pour le contenu, le service client ou les workflows", score: 5 },
      { text: "We\u2019re exploring it but haven\u2019t implemented much", text_es: "Lo estamos explorando pero no hemos implementado mucho", text_fr: "Nous explorons mais n'avons pas beaucoup implémenté", score: 2 },
      { text: "No, we haven\u2019t started with AI/automation", text_es: "No, no hemos comenzado con IA/automatización", text_fr: "Non, nous n'avons pas commencé avec l'IA/automatisation", score: 0 },
    ],
  },
  {
    id: "ai-2",
    category: "ai-automation",
    question: "Are your customer touchpoints automated (chatbots, auto-responses, CRM flows)?",
    question_es: "¿Sus puntos de contacto con clientes están automatizados (chatbots, respuestas automáticas, flujos CRM)?",
    question_fr: "Vos points de contact client sont-ils automatisés (chatbots, réponses automatiques, flux CRM) ?",
    options: [
      { text: "Yes, with a connected system", text_es: "Sí, con un sistema conectado", text_fr: "Oui, avec un système connecté", score: 5 },
      { text: "Some basic automation (auto-replies, etc.)", text_es: "Alguna automatización básica (respuestas automáticas, etc.)", text_fr: "Quelques automatisations basiques (réponses auto, etc.)", score: 2 },
      { text: "Everything is manual", text_es: "Todo es manual", text_fr: "Tout est manuel", score: 0 },
    ],
  },
];

export const TOTAL_QUESTIONS = ASSESSMENT_QUESTIONS.length;
