import type { Locale } from "./types";

const translations: Record<string, Record<string, string>> = {
  en: {
    // Builder page
    "builder.title": "Proposal Builder",
    "builder.subtitle": "Build your custom marketing package",
    "builder.instructions": "Use this tool to build a custom proposal or select a pre-made package.",

    // Mode selector
    "mode.custom": "Build Custom",
    "mode.package": "Choose Package",

    // Sections
    "section.services": "Select Services",
    "section.packages": "Choose Your Package",
    "subtitle.packages": "Pre-built packages designed for different business stages",

    // Search
    "placeholder.search": "Search services...",

    // Sidebar
    "sidebar.title": "Your Proposal",
    "sidebar.empty": "No services selected yet",
    "sidebar.serviceCount": "services selected",
    "sidebar.continue": "Continue to Review",

    // Pricing labels
    "label.onetime": "One-Time Investment",
    "label.monthly": "Monthly Recurring",
    "label.hosting": "Website Hosting & Domain",
    "label.hostingNote": "Auto-included for website services",
    "label.discount": "Discount",
    "label.subtotal": "Subtotal",
    "label.total": "Total First Month",

    // Buttons
    "btn.generate": "Generate Proposal",
    "btn.clear": "Clear All",
    "btn.back": "Back",
    "btn.continue": "Continue",
    "btn.send": "Send Proposal",
    "btn.addCustom": "Add Custom Service",

    // Billing badges
    "billing.one-time": "one-time",
    "billing.monthly": "monthly",

    // Discount
    "discount.title": "Apply Discount",
    "discount.percentage": "Percentage",
    "discount.flat": "Flat Amount",
    "discount.placeholder": "Enter amount",
    "discount.clear": "Remove discount",

    // Custom items
    "custom.title": "Custom Services",
    "custom.namePlaceholder": "Service name",
    "custom.pricePlaceholder": "Price",

    // Review step
    "review.title": "Review Your Proposal",
    "review.subtitle": "Verify the services and pricing before sending",
    "review.edit": "Edit Selection",

    // Contact step
    "contact.title": "Send Proposal",
    "contact.subtitle": "Enter client details to finalize and send the proposal",
    "form.name": "Client Name",
    "form.email": "Client Email",
    "form.phone": "Phone Number",
    "form.referredBy": "Referred By",
    "form.referredByPlaceholder": "Your name (leave blank if direct inquiry)",
    "form.sending": "Sending...",

    // Success
    "success.title": "Proposal Sent!",
    "success.message": "The proposal has been sent to the client and a copy has been saved.",
    "success.viewLink": "View Proposal",
    "success.buildAnother": "Build Another Proposal",

    // Proposal view page
    "proposal.title": "Marketing Proposal",
    "proposal.preparedFor": "Prepared For",
    "proposal.date": "Date",
    "proposal.version": "Version",
    "proposal.referredBy": "Referred By",
    "proposal.direct": "Direct Inquiry",
    "proposal.staleNotice": "This proposal was created over 30 days ago. Pricing may have changed. Contact us for an updated quote.",
    "proposal.accept": "Accept Proposal",
    "proposal.accepted": "Proposal Accepted",
    "proposal.acceptedOn": "Accepted on",
    "proposal.acceptConfirm": "Are you sure you want to accept this proposal?",
    "proposal.print": "Print / Download",
    "proposal.validNote": "This proposal is valid for 30 days from the date above.",
    "proposal.notFound": "Proposal Not Found",
    "proposal.notFoundMessage": "The proposal you are looking for does not exist or has been removed.",

    // Email
    "email.subject": "Your Marketing Proposal from Creative Quality Marketing",
    "email.greeting": "Hi",
    "email.intro": "Thank you for your interest in Creative Quality Marketing. Here is your custom marketing proposal.",
    "email.viewButton": "View Your Full Proposal",
    "email.footer": "This proposal is valid for 30 days.",
    "email.acceptedSubject": "Proposal Accepted",
    "email.acceptedBody": "has accepted their marketing proposal.",

    // Assessment
    "assessment.title": "Marketing Assessment",
    "assessment.subtitle": "Find out how your marketing stacks up",
    "assessment.start": "Start Assessment",
    "assessment.next": "Next",
    "assessment.previous": "Previous",
    "assessment.seeResults": "See My Results",
    "assessment.overallScore": "Your Marketing Score",
    "assessment.breakdown": "Score Breakdown",
    "assessment.recommendations": "Recommended Services",
    "assessment.buildPackage": "Build Your Package",
    "assessment.emailResults": "Email My Results",
    "assessment.needsWork": "Needs Work",
    "assessment.gettingThere": "Getting There",
    "assessment.solidFoundation": "Solid Foundation",
    "assessment.marketingPro": "Marketing Pro",

    // Packages
    "package.startup": "Business Startup",
    "package.growth": "Business Growth",
    "package.scale": "Business Scale",
    "package.popular": "Most Popular",
    "package.select": "Select Package",
    "package.custom": "Build Custom",
    "package.customDesc": "Pick exactly the services you need",
  },
  es: {
    // Builder page
    "builder.title": "Constructor de Propuestas",
    "builder.subtitle": "Construye tu paquete de marketing personalizado",
    "builder.instructions": "Utilice esta herramienta para crear una propuesta personalizada o seleccionar un paquete predise\u00F1ado.",

    // Mode selector
    "mode.custom": "Personalizado",
    "mode.package": "Paquetes",

    // Sections
    "section.services": "Seleccionar Servicios",
    "section.packages": "Elige tu Paquete",
    "subtitle.packages": "Paquetes predise\u00F1ados para diferentes etapas de negocio",

    // Search
    "placeholder.search": "Buscar servicios...",

    // Sidebar
    "sidebar.title": "Tu Propuesta",
    "sidebar.empty": "No hay servicios seleccionados",
    "sidebar.serviceCount": "servicios seleccionados",
    "sidebar.continue": "Continuar a Revisi\u00F3n",

    // Pricing labels
    "label.onetime": "Inversi\u00F3n \u00DAnica",
    "label.monthly": "Recurrente Mensual",
    "label.hosting": "Hospedaje Web y Dominio",
    "label.hostingNote": "Incluido autom\u00E1ticamente para servicios web",
    "label.discount": "Descuento",
    "label.subtotal": "Subtotal",
    "label.total": "Total Primer Mes",

    // Buttons
    "btn.generate": "Generar Propuesta",
    "btn.clear": "Borrar Todo",
    "btn.back": "Volver",
    "btn.continue": "Continuar",
    "btn.send": "Enviar Propuesta",
    "btn.addCustom": "Agregar Servicio Personalizado",

    // Billing badges
    "billing.one-time": "pago \u00FAnico",
    "billing.monthly": "mensual",

    // Discount
    "discount.title": "Aplicar Descuento",
    "discount.percentage": "Porcentaje",
    "discount.flat": "Monto Fijo",
    "discount.placeholder": "Ingrese monto",
    "discount.clear": "Eliminar descuento",

    // Custom items
    "custom.title": "Servicios Personalizados",
    "custom.namePlaceholder": "Nombre del servicio",
    "custom.pricePlaceholder": "Precio",

    // Review step
    "review.title": "Revisa Tu Propuesta",
    "review.subtitle": "Verifica los servicios y precios antes de enviar",
    "review.edit": "Editar Selecci\u00F3n",

    // Contact step
    "contact.title": "Enviar Propuesta",
    "contact.subtitle": "Ingrese los datos del cliente para finalizar y enviar la propuesta",
    "form.name": "Nombre del Cliente",
    "form.email": "Correo del Cliente",
    "form.phone": "Tel\u00E9fono",
    "form.referredBy": "Referido Por",
    "form.referredByPlaceholder": "Tu nombre (dejar en blanco si es consulta directa)",
    "form.sending": "Enviando...",

    // Success
    "success.title": "\u00A1Propuesta Enviada!",
    "success.message": "La propuesta ha sido enviada al cliente y se ha guardado una copia.",
    "success.viewLink": "Ver Propuesta",
    "success.buildAnother": "Crear Otra Propuesta",

    // Proposal view page
    "proposal.title": "Propuesta de Marketing",
    "proposal.preparedFor": "Preparado Para",
    "proposal.date": "Fecha",
    "proposal.version": "Versi\u00F3n",
    "proposal.referredBy": "Referido Por",
    "proposal.direct": "Consulta Directa",
    "proposal.staleNotice": "Esta propuesta fue creada hace m\u00E1s de 30 d\u00EDas. Los precios pueden haber cambiado. Cont\u00E1ctenos para una cotizaci\u00F3n actualizada.",
    "proposal.accept": "Aceptar Propuesta",
    "proposal.accepted": "Propuesta Aceptada",
    "proposal.acceptedOn": "Aceptado el",
    "proposal.acceptConfirm": "\u00BFEst\u00E1 seguro de que desea aceptar esta propuesta?",
    "proposal.print": "Imprimir / Descargar",
    "proposal.validNote": "Esta propuesta es v\u00E1lida por 30 d\u00EDas a partir de la fecha anterior.",
    "proposal.notFound": "Propuesta No Encontrada",
    "proposal.notFoundMessage": "La propuesta que busca no existe o ha sido eliminada.",

    // Email
    "email.subject": "Su Propuesta de Marketing de Creative Quality Marketing",
    "email.greeting": "Hola",
    "email.intro": "Gracias por su inter\u00E9s en Creative Quality Marketing. Aqu\u00ED est\u00E1 su propuesta de marketing personalizada.",
    "email.viewButton": "Ver Su Propuesta Completa",
    "email.footer": "Esta propuesta es v\u00E1lida por 30 d\u00EDas.",
    "email.acceptedSubject": "Propuesta Aceptada",
    "email.acceptedBody": "ha aceptado su propuesta de marketing.",

    // Assessment
    "assessment.title": "Evaluaci\u00F3n de Marketing",
    "assessment.subtitle": "Descubra c\u00F3mo est\u00E1 su marketing",
    "assessment.start": "Iniciar Evaluaci\u00F3n",
    "assessment.next": "Siguiente",
    "assessment.previous": "Anterior",
    "assessment.seeResults": "Ver Mis Resultados",
    "assessment.overallScore": "Su Puntuaci\u00F3n de Marketing",
    "assessment.breakdown": "Desglose de Puntuaci\u00F3n",
    "assessment.recommendations": "Servicios Recomendados",
    "assessment.buildPackage": "Construir Tu Paquete",
    "assessment.emailResults": "Enviar Resultados por Email",
    "assessment.needsWork": "Necesita Trabajo",
    "assessment.gettingThere": "Progresando",
    "assessment.solidFoundation": "Base S\u00F3lida",
    "assessment.marketingPro": "Profesional del Marketing",

    // Packages
    "package.startup": "Inicio de Negocio",
    "package.growth": "Crecimiento Empresarial",
    "package.scale": "Escala Empresarial",
    "package.popular": "M\u00E1s Popular",
    "package.select": "Seleccionar Paquete",
    "package.custom": "Personalizado",
    "package.customDesc": "Elige exactamente los servicios que necesitas",
  },
  fr: {
    // Builder page
    "builder.title": "Créateur de Propositions",
    "builder.subtitle": "Construisez votre forfait marketing personnalisé",
    "builder.instructions": "Utilisez cet outil pour créer une proposition personnalisée ou sélectionner un forfait prédéfini.",

    // Mode selector
    "mode.custom": "Personnalisé",
    "mode.package": "Forfaits",

    // Sections
    "section.services": "Sélectionner les Services",
    "section.packages": "Choisissez Votre Forfait",
    "subtitle.packages": "Des forfaits prédéfinis conçus pour différentes étapes de croissance",

    // Search
    "placeholder.search": "Rechercher des services...",

    // Sidebar
    "sidebar.title": "Votre Proposition",
    "sidebar.empty": "Aucun service sélectionné",
    "sidebar.serviceCount": "services sélectionnés",
    "sidebar.continue": "Continuer vers la Révision",

    // Pricing labels
    "label.onetime": "Investissement Unique",
    "label.monthly": "Récurrent Mensuel",
    "label.hosting": "Hébergement Web et Domaine",
    "label.hostingNote": "Inclus automatiquement pour les services web",
    "label.discount": "Remise",
    "label.subtotal": "Sous-total",
    "label.total": "Total Premier Mois",

    // Buttons
    "btn.generate": "Générer la Proposition",
    "btn.clear": "Tout Effacer",
    "btn.back": "Retour",
    "btn.continue": "Continuer",
    "btn.send": "Envoyer la Proposition",
    "btn.addCustom": "Ajouter un Service Personnalisé",

    // Billing badges
    "billing.one-time": "paiement unique",
    "billing.monthly": "mensuel",

    // Discount
    "discount.title": "Appliquer une Remise",
    "discount.percentage": "Pourcentage",
    "discount.flat": "Montant Fixe",
    "discount.placeholder": "Entrez le montant",
    "discount.clear": "Supprimer la remise",

    // Custom items
    "custom.title": "Services Personnalisés",
    "custom.namePlaceholder": "Nom du service",
    "custom.pricePlaceholder": "Prix",

    // Review step
    "review.title": "Révisez Votre Proposition",
    "review.subtitle": "Vérifiez les services et les tarifs avant l'envoi",
    "review.edit": "Modifier la Sélection",

    // Contact step
    "contact.title": "Envoyer la Proposition",
    "contact.subtitle": "Entrez les coordonnées du client pour finaliser et envoyer la proposition",
    "form.name": "Nom du Client",
    "form.email": "Email du Client",
    "form.phone": "Numéro de Téléphone",
    "form.referredBy": "Recommandé Par",
    "form.referredByPlaceholder": "Votre nom (laissez vide si demande directe)",
    "form.sending": "Envoi en cours...",

    // Success
    "success.title": "Proposition Envoyée !",
    "success.message": "La proposition a été envoyée au client et une copie a été enregistrée.",
    "success.viewLink": "Voir la Proposition",
    "success.buildAnother": "Créer une Autre Proposition",

    // Proposal view page
    "proposal.title": "Proposition Marketing",
    "proposal.preparedFor": "Préparée Pour",
    "proposal.date": "Date",
    "proposal.version": "Version",
    "proposal.referredBy": "Recommandé Par",
    "proposal.direct": "Demande Directe",
    "proposal.staleNotice": "Cette proposition a été créée il y a plus de 30 jours. Les tarifs peuvent avoir changé. Contactez-nous pour un devis actualisé.",
    "proposal.accept": "Accepter la Proposition",
    "proposal.accepted": "Proposition Acceptée",
    "proposal.acceptedOn": "Acceptée le",
    "proposal.acceptConfirm": "Êtes-vous sûr de vouloir accepter cette proposition ?",
    "proposal.print": "Imprimer / Télécharger",
    "proposal.validNote": "Cette proposition est valable 30 jours à compter de la date ci-dessus.",
    "proposal.notFound": "Proposition Introuvable",
    "proposal.notFoundMessage": "La proposition que vous recherchez n'existe pas ou a été supprimée.",

    // Email
    "email.subject": "Votre Proposition Marketing de Creative Quality Marketing",
    "email.greeting": "Bonjour",
    "email.intro": "Merci pour votre intérêt pour Creative Quality Marketing. Voici votre proposition marketing personnalisée.",
    "email.viewButton": "Voir Votre Proposition Complète",
    "email.footer": "Cette proposition est valable 30 jours.",
    "email.acceptedSubject": "Proposition Acceptée",
    "email.acceptedBody": "a accepté sa proposition marketing.",

    // Assessment
    "assessment.title": "Évaluation Marketing",
    "assessment.subtitle": "Découvrez la performance de votre marketing",
    "assessment.start": "Commencer l'Évaluation",
    "assessment.next": "Suivant",
    "assessment.previous": "Précédent",
    "assessment.seeResults": "Voir Mes Résultats",
    "assessment.overallScore": "Votre Score Marketing",
    "assessment.breakdown": "Détail des Scores",
    "assessment.recommendations": "Services Recommandés",
    "assessment.buildPackage": "Construire Votre Forfait",
    "assessment.emailResults": "Envoyer les Résultats par Email",
    "assessment.needsWork": "À Améliorer",
    "assessment.gettingThere": "En Progrès",
    "assessment.solidFoundation": "Base Solide",
    "assessment.marketingPro": "Pro du Marketing",

    // Packages
    "package.startup": "Lancement d'Entreprise",
    "package.growth": "Croissance d'Entreprise",
    "package.scale": "Expansion d'Entreprise",
    "package.popular": "Le Plus Populaire",
    "package.select": "Sélectionner le Forfait",
    "package.custom": "Personnalisé",
    "package.customDesc": "Choisissez exactement les services dont vous avez besoin",
  },
};

export function t(key: string, locale: Locale = "en"): string {
  return translations[locale]?.[key] ?? translations.en[key] ?? key;
}
