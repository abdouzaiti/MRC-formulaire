export type Language = 'fr' | 'ar' | 'en' | 'es';

export interface TranslationSchema {
  // Header & Brand
  appTitle: string;
  appSubtitle: string;
  officialBadge: string;
  tagline: string;

  // Form Section Headers
  personalInfoSection: string;
  healthSection: string;
  healthConfidentialBadge: string;

  // Form Field Labels & Options
  fullNameLabel: string;
  fullNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  birthDateLabel: string;
  genderLabel: string;
  genderMale: string;
  genderFemale: string;
  genderOther: string;
  runningLevelLabel: string;
  levelBeginner: string;
  levelIntermediate: string;
  levelAdvanced: string;
  levelElite: string;

  // Health Questions
  healthQuestion: string;
  healthOptNo: string;
  healthOptYes: string;
  healthOptUnsure: string;
  healthDetailLabel: string;
  healthDetailPlaceholder: string;
  healthPrivacyNotice: string;
  medicalConsentText: string;
  termsAcceptedText: string;

  // Submit & Footer
  submitButton: string;
  submittingText: string;
  captainsPortalLink: string;
  returnButton: string;

  // Confirmation Pass
  welcomeTitle: string;
  motto: string;
  memberCardTitle: string;
  clubMemberLabel: string;
  joinDateLabel: string;
  whatsappTitle: string;
  whatsappDesc: string;
  whatsappBtn: string;
  scheduleTitle: string;
  sundayLabel: string;
  sundayTitle: string;
  sundayLocation: string;
  tuesdayLabel: string;
  tuesdayTitle: string;
  tuesdayLocation: string;
  fridayLabel: string;
  fridayTitle: string;
  fridayLocation: string;

  // Validation Errors
  errFullNameRequired: string;
  errFullNameMin: string;
  errEmailInvalid: string;
  errPhoneInvalid: string;
  errBirthDateRequired: string;
  errHealthRequired: string;
  errMedicalConsentRequired: string;
  errTermsRequired: string;
}

export const translations: Record<Language, TranslationSchema> = {
  fr: {
    appTitle: 'MOSTA RUN CLUB',
    appSubtitle: 'Formulaire d\'Adhésion Officiel · Saison 2026',
    officialBadge: 'REJOINDRE LES MARINS',
    tagline: 'L\'esprit du running côtier à Mostaganem',

    personalInfoSection: 'INFORMATIONS PERSONNELLES & COORDONNÉES',
    healthSection: 'QUESTION DE SANTÉ & SUIVI MÉDICAL',
    healthConfidentialBadge: 'Confidentiel',

    fullNameLabel: 'Nom & Prénom',
    fullNamePlaceholder: 'ex: Ahmed Benali',
    emailLabel: 'Adresse e-mail',
    emailPlaceholder: 'ex: ahmed@example.com',
    phoneLabel: 'Numéro de Téléphone (WhatsApp)',
    phonePlaceholder: 'ex: 0550 12 34 56',
    birthDateLabel: 'Date de naissance',
    genderLabel: 'Genre',
    genderMale: 'Homme',
    genderFemale: 'Femme',
    genderOther: 'Autre',
    runningLevelLabel: 'Niveau de course actuel',
    levelBeginner: 'Débutant / Reprise progressive',
    levelIntermediate: 'Intermédiaire (5 à 10 km réguliers)',
    levelAdvanced: 'Avancé',
    levelElite: 'Élite',

    healthQuestion: 'Avez-vous une contre-indication médicale connue pour la pratique de la course à pied ?',
    healthOptNo: 'Non, aucune contre-indication connue à ce jour.',
    healthOptYes: 'Oui, j\'ai une restriction ou un antécédent particulier.',
    healthOptUnsure: 'Je ne sais pas / Je souhaite en discuter avec un responsable.',
    healthDetailLabel: 'Précisez votre condition médicale ou vos restrictions (confidentiel) :',
    healthDetailPlaceholder: 'ex: Asthme d\'effort léger, ancienne entorse, hypertension...',
    healthPrivacyNotice: 'Vos réponses médicales sont strictement confidentielles et uniquement accessibles aux responsables du club.',
    medicalConsentText: 'J\'atteste sur l\'honneur être en bonne condition physique et apte à la pratique du running avec le club.',
    termsAcceptedText: 'J\'accepte l\'esprit sportif, la bienveillance et la charte officielle des Marins du Mosta Run Club.',

    submitButton: 'VALIDER MON INSCRIPTION',
    submittingText: 'ENREGISTREMENT EN COURS...',
    captainsPortalLink: 'Espace Capitaines / Liste des Membres',
    returnButton: 'RETOUR',

    welcomeTitle: 'BIENVENUE CHEZ LES MARINS !',
    motto: '« Une seule passion. Un seul club. Une seule famille. »',
    memberCardTitle: 'PASS OFFICIEL MARIN',
    clubMemberLabel: 'MEMBRE DU CLUB',
    joinDateLabel: 'DATE D\'ENTRÉE',
    whatsappTitle: 'Rejoins le Groupe WhatsApp Officiel',
    whatsappDesc: 'C\'est ici que sont annoncés les points de rendez-vous, les allures de groupe et les sorties à Mostaganem.',
    whatsappBtn: 'ACCÉDER AU GROUPE DES MARINS',
    scheduleTitle: 'PLANNING HEBDOMADAIRE DES SORTIES',
    sundayLabel: 'Dimanche 17h30',
    sundayTitle: 'Entraînement de Groupe',
    sundayLocation: 'Complexe sportif Raïd Feradj',
    tuesdayLabel: 'Mardi 17h30',
    tuesdayTitle: 'Séance de Groupe',
    tuesdayLocation: 'Complexe sportif Raïd Feradj',
    fridayLabel: 'Vendredi 07h30',
    fridayTitle: 'Sortie Longue des Marins',
    fridayLocation: 'La Salamandre',

    errFullNameRequired: 'Le nom et prénom sont obligatoires.',
    errFullNameMin: 'Veuillez saisir votre nom complet (au moins 3 caractères).',
    errEmailInvalid: 'Adresse e-mail valide requise.',
    errPhoneInvalid: 'Numéro de téléphone valide requis (ex: 0550123456).',
    errBirthDateRequired: 'La date de naissance est requise.',
    errHealthRequired: 'Veuillez répondre à la question médicale.',
    errMedicalConsentRequired: 'Veuillez attester sur l\'honneur être apte à courir.',
    errTermsRequired: 'Veuillez accepter la charte et le règlement du club.',
  },

  ar: {
    appTitle: 'نادي مستغانم للركض',
    appSubtitle: 'استمارة الانضمام الرسمية · موسم 2026',
    officialBadge: 'الانضمام إلى البحارة',
    tagline: 'روح الركض الساحلي في مستغانم',

    personalInfoSection: 'المعلومات الشخصية ومعلومات الاتصال',
    healthSection: 'الاستبيان الصحي والمتابعة الطبية',
    healthConfidentialBadge: 'سري للغاية',

    fullNameLabel: 'الاسم واللقب',
    fullNamePlaceholder: 'مثال: أحمد بن علي',
    emailLabel: 'البريد الإلكتروني',
    emailPlaceholder: 'مثال: ahmed@example.com',
    phoneLabel: 'رقم الهاتف (واتساب)',
    phonePlaceholder: 'مثال: 0550 12 34 56',
    birthDateLabel: 'تاريخ الميلاد',
    genderLabel: 'الجنس',
    genderMale: 'رجل',
    genderFemale: 'امرأة',
    genderOther: 'آخر',
    runningLevelLabel: 'مستوى الركض الحالي',
    levelBeginner: 'مبتدئ / العودة التدريجية للرياضة',
    levelIntermediate: 'متوسط (من 5 إلى 10 كم بانتظام)',
    levelAdvanced: 'متقدم',
    levelElite: 'نخبة',

    healthQuestion: 'هل لديك أي موانع طبية معروفة لممارسة رياضة الركض؟',
    healthOptNo: 'لا، لا توجد أي موانع طبية معروفة حتى الآن.',
    healthOptYes: 'نعم، لدي حالة خاصة أو إصابة سابقة.',
    healthOptUnsure: 'لا أعلم / أرغب في مناقشة ذلك مع أحد مسؤولي النادي.',
    healthDetailLabel: 'يرجى توضيح حالتك الطبية (معلومات سرية):',
    healthDetailPlaceholder: 'مثال: ربو خفيف، التواء سابق بالقدم، ضغط الدم...',
    healthPrivacyNotice: 'معلوماتك الطبية سرية للغاية ولن يطلع عليها إلا مسؤولو النادي.',
    medicalConsentText: 'أقر بمسؤوليتي الكاملة بأنني في حالة بدنية جيدة ولا أجد مانعاً من ممارسة الركض مع النادي.',
    termsAcceptedText: 'أوافق على الروح الرياضية وميثاق الاحترام الخاص بنادي مستغانم للركض.',

    submitButton: 'تأكيد التسجيل',
    submittingText: 'جاري التسجيل...',
    captainsPortalLink: 'فضاء القادة / قائمة الأعضاء',
    returnButton: 'رجوع',

    welcomeTitle: 'مرحباً بك في نادي البحارة !',
    motto: '« شغف واحد. نادي واحد. عائلة واحدة. »',
    memberCardTitle: 'بطاقة العضوية الرسمية',
    clubMemberLabel: 'عضو بالنادي',
    joinDateLabel: 'تاريخ الانضمام',
    whatsappTitle: 'انضم إلى مجموعة الواتساب الرسمية',
    whatsappDesc: 'هنا يتم الإعلان عن نقاط التجمع وسرعات المجموعات والحصص التدريبية بمستغانم.',
    whatsappBtn: 'الدخول إلى مجموعة البحارة',
    scheduleTitle: 'البرنامج الأسبوعي للحصص',
    sundayLabel: 'الأحد 17:30',
    sundayTitle: 'تدريب الجماعة',
    sundayLocation: 'المركب الرياضي الرائد فراج',
    tuesdayLabel: 'الثلاثاء 17:30',
    tuesdayTitle: 'حصة تدريبية',
    tuesdayLocation: 'المركب الرياضي الرائد فراج',
    fridayLabel: 'الجمعة 07:30',
    fridayTitle: 'الحصة الطويلة للبحارة',
    fridayLocation: 'شاطئ السلامندر',

    errFullNameRequired: 'الاسم واللقب مطلوبان.',
    errFullNameMin: 'يرجى إدخال الاسم الكامل (3 أحرف على الأقل).',
    errEmailInvalid: 'يرجى إدخال بريد إلكتروني صحيح.',
    errPhoneInvalid: 'يرجى إدخال رقم هاتف صحيح.',
    errBirthDateRequired: 'تاريخ الميلاد مطلوب.',
    errHealthRequired: 'يرجى الإجابة على السؤال الطبي.',
    errMedicalConsentRequired: 'يرجى التأكيد على لياقتك البدنية للركض.',
    errTermsRequired: 'يرجى القبول بميثاق النادي.',
  },

  en: {
    appTitle: 'MOSTA RUN CLUB',
    appSubtitle: 'Official Membership Form · Season 2026',
    officialBadge: 'JOIN THE MARINS',
    tagline: 'The coastal running spirit in Mostaganem',

    personalInfoSection: 'PERSONAL INFORMATION & CONTACT',
    healthSection: 'HEALTH QUESTION & MEDICAL TRACKING',
    healthConfidentialBadge: 'Confidential',

    fullNameLabel: 'Full Name',
    fullNamePlaceholder: 'e.g., Ahmed Benali',
    emailLabel: 'Email Address',
    emailPlaceholder: 'e.g., ahmed@example.com',
    phoneLabel: 'Phone Number (WhatsApp)',
    phonePlaceholder: 'e.g., 0550 12 34 56',
    birthDateLabel: 'Date of Birth',
    genderLabel: 'Gender',
    genderMale: 'Male',
    genderFemale: 'Female',
    genderOther: 'Other',
    runningLevelLabel: 'Current Running Level',
    levelBeginner: 'Beginner / Gradual Restart',
    levelIntermediate: 'Intermediate (Regular 5–10 km)',
    levelAdvanced: 'Advanced',
    levelElite: 'Elite',

    healthQuestion: 'Do you have any known medical contraindications for running?',
    healthOptNo: 'No, no known medical issues to date.',
    healthOptYes: 'Yes, I have a specific condition or previous injury.',
    healthOptUnsure: 'Not sure / I would like to consult with a team captain.',
    healthDetailLabel: 'Please specify your medical condition (confidential):',
    healthDetailPlaceholder: 'e.g., Mild asthma, past ankle sprain, blood pressure...',
    healthPrivacyNotice: 'Your health disclosures are strictly confidential and accessible only to club organizers.',
    medicalConsentText: 'I certify that I am in good physical condition and fit to run with the club.',
    termsAcceptedText: 'I accept the sportsmanship charter and official regulations of the Mosta Run Club.',

    submitButton: 'SUBMIT MY REGISTRATION',
    submittingText: 'SUBMITTING REGISTRATION...',
    captainsPortalLink: 'Captains Portal / Members List',
    returnButton: 'BACK',

    welcomeTitle: 'WELCOME TO THE SAILORS!',
    motto: '“One passion. One club. One family.”',
    memberCardTitle: 'OFFICIAL SAILOR PASS',
    clubMemberLabel: 'CLUB MEMBER',
    joinDateLabel: 'JOIN DATE',
    whatsappTitle: 'Join the Official WhatsApp Community',
    whatsappDesc: 'This is where meeting points, group paces, and weekly runs in Mostaganem are shared.',
    whatsappBtn: 'JOIN THE SAILORS GROUP',
    scheduleTitle: 'WEEKLY RUNNING SCHEDULE',
    sundayLabel: 'Sunday 5:30 PM',
    sundayTitle: 'Group Training',
    sundayLocation: 'Raïd Feradj Sports Complex',
    tuesdayLabel: 'Tuesday 5:30 PM',
    tuesdayTitle: 'Group Session',
    tuesdayLocation: 'Raïd Feradj Sports Complex',
    fridayLabel: 'Friday 7:30 AM',
    fridayTitle: 'Sailors Long Run',
    fridayLocation: 'La Salamandre Beach',

    errFullNameRequired: 'Full name is required.',
    errFullNameMin: 'Please enter your full name (at least 3 characters).',
    errEmailInvalid: 'Valid email address is required.',
    errPhoneInvalid: 'Valid phone number is required.',
    errBirthDateRequired: 'Date of birth is required.',
    errHealthRequired: 'Please answer the medical question.',
    errMedicalConsentRequired: 'Please confirm you are physically fit to run.',
    errTermsRequired: 'Please accept the club charter.',
  },

  es: {
    appTitle: 'MOSTA RUN CLUB',
    appSubtitle: 'Formulario Oficial de Inscripción · Temporada 2026',
    officialBadge: 'UNIRSE A LOS MARINEROS',
    tagline: 'El espíritu del running costero en Mostaganem',

    personalInfoSection: 'INFORMACIÓN PERSONAL Y CONTACTO',
    healthSection: 'CUESTIONARIO DE SALUD Y SEGUIMIENTO MÉDICO',
    healthConfidentialBadge: 'Confidencial',

    fullNameLabel: 'Nombre y Apellidos',
    fullNamePlaceholder: 'ej: Ahmed Benali',
    emailLabel: 'Correo Electrónico',
    emailPlaceholder: 'ej: ahmed@example.com',
    phoneLabel: 'Número de Teléfono (WhatsApp)',
    phonePlaceholder: 'ej: 0550 12 34 56',
    birthDateLabel: 'Fecha de Nacimiento',
    genderLabel: 'Género',
    genderMale: 'Hombre',
    genderFemale: 'Mujer',
    genderOther: 'Otro',
    runningLevelLabel: 'Nivel Actual de Running',
    levelBeginner: 'Principiante / Reanudación progresiva',
    levelIntermediate: 'Intermedio (5 a 10 km habituales)',
    levelAdvanced: 'Avanzado',
    levelElite: 'Élite',

    healthQuestion: '¿Tiene alguna contraindicación médica conocida para la práctica del running?',
    healthOptNo: 'No, ninguna contraindicación conocida hasta la fecha.',
    healthOptYes: 'Sí, tengo una condición o antecedente específico.',
    healthOptUnsure: 'No lo sé / Deseo consultarlo con un responsable del club.',
    healthDetailLabel: 'Especifique su condición médica (confidencial):',
    healthDetailPlaceholder: 'ej: Asma leve de esfuerzo, esguince previo, hipertensión...',
    healthPrivacyNotice: 'Sus datos médicos son estrictamente confidenciales y solo accesibles para los responsables del club.',
    medicalConsentText: 'Declaro bajo mi responsabilidad estar en buena condición física y apto para correr con el club.',
    termsAcceptedText: 'Acepto el espíritu deportivo y el reglamento oficial del Mosta Run Club.',

    submitButton: 'CONFIRMAR MI INSCRIPCIÓN',
    submittingText: 'REGISTRANDO INSCRIPCIÓN...',
    captainsPortalLink: 'Área de Capitanes / Lista de Miembros',
    returnButton: 'VOLVER',

    welcomeTitle: '¡BIENVENIDO A LOS MARINEROS!',
    motto: '«Una sola pasión. Un solo club. Una sola familia.»',
    memberCardTitle: 'CARNET OFICIAL DE MIEMBRO',
    clubMemberLabel: 'MIEMBRO DEL CLUB',
    joinDateLabel: 'FECHA DE INGRESO',
    whatsappTitle: 'Únete al Grupo Oficial de WhatsApp',
    whatsappDesc: 'Aquí se anuncian los puntos de encuentro, ritmos de grupo y salidas en Mostaganem.',
    whatsappBtn: 'UNIRSE AL GRUPO DE MARINEROS',
    scheduleTitle: 'CALENDARIO SEMANAL DE ENTRENAMIENTOS',
    sundayLabel: 'Domingo 17:30',
    sundayTitle: 'Entrenamiento en Grupo',
    sundayLocation: 'Complejo deportivo Raïd Feradj',
    tuesdayLabel: 'Martes 17:30',
    tuesdayTitle: 'Sesión de Grupo',
    tuesdayLocation: 'Complexe deportivo Raïd Feradj',
    fridayLabel: 'Viernes 07:30',
    fridayTitle: 'Tirada Larga de Marineros',
    fridayLocation: 'La Salamandre',

    errFullNameRequired: 'El nombre y apellidos son obligatorios.',
    errFullNameMin: 'Por favor introduzca su nombre completo (al menos 3 caracteres).',
    errEmailInvalid: 'Correo electrónico válido requerido.',
    errPhoneInvalid: 'Teléfono válido requerido.',
    errBirthDateRequired: 'Fecha de nacimiento requerida.',
    errHealthRequired: 'Por favor responda a la pregunta médica.',
    errMedicalConsentRequired: 'Por favor confirme que está apto para correr.',
    errTermsRequired: 'Por favor acepte el reglamento del club.',
  },
};
