import React, { useState, useRef } from 'react';
import { MrcLogo } from './MrcLogo';
import { CaptainsLoginModal } from './CaptainsLoginModal';
import {
  RegistrationData,
  HealthAnswer,
  RunningLevel,
  Gender,
  RegistrationFormErrors,
} from '../types';
import {
  ShieldAlert,
  CheckCircle2,
  HeartPulse,
  User,
  Mail,
  Phone,
  Calendar,
  ArrowRight,
} from 'lucide-react';

interface RegistrationFormProps {
  onSubmitSuccess: (data: RegistrationData) => void;
  onOpenCaptainsPortal: (captainName?: string) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmitSuccess,
  onOpenCaptainsPortal,
}) => {
  // Secret Triple-Click State for Captains Access
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSecretTripleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    clickCountRef.current += 1;

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      setIsAuthModalOpen(true);
    } else {
      // Allow up to 1200ms window to complete the 3 clicks
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 1200);
    }
  };

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<Gender>('homme');
  const [runningLevel, setRunningLevel] = useState<RunningLevel>('intermediaire');

  // Ref for date input trigger
  const birthDateInputRef = useRef<HTMLInputElement>(null);

  const handleOpenDatePicker = () => {
    if (birthDateInputRef.current) {
      try {
        birthDateInputRef.current.showPicker();
      } catch {
        birthDateInputRef.current.focus();
      }
    }
  };

  // Health Question State
  const [healthStatus, setHealthStatus] = useState<HealthAnswer>('non');
  const [healthRestrictions, setHealthRestrictions] = useState('');

  // Consent
  const [medicalConsent, setMedicalConsent] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Errors & Submitting
  const [errors, setErrors] = useState<RegistrationFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation
  const validate = (): boolean => {
    const errs: RegistrationFormErrors = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = 'Veuillez saisir votre nom et prénom complets.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = 'Veuillez saisir une adresse e-mail valide.';
    }

    const cleanPhone = phone.replace(/\s+/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      errs.phone = 'Veuillez indiquer un numéro de téléphone valide (WhatsApp).';
    }

    if (!birthDate) {
      errs.birthDate = 'Veuillez indiquer votre date de naissance.';
    } else {
      const birthYear = new Date(birthDate).getFullYear();
      const currentYear = new Date().getFullYear();
      if (birthYear > currentYear - 10 || birthYear < 1920) {
        errs.birthDate = 'Veuillez indiquer une date de naissance valide.';
      }
    }

    if (!gender) {
      errs.gender = 'Veuillez sélectionner votre genre.';
    }

    if (!runningLevel) {
      errs.runningLevel = 'Veuillez indiquer votre niveau de course actuel.';
    }

    if (!healthStatus) {
      errs.healthStatus = 'Veuillez répondre à la question médicale.';
    }

    if (!medicalConsent) {
      errs.medicalConsent = "Veuillez attester sur l'honneur être apte à courir.";
    }

    if (!termsAccepted) {
      errs.termsAccepted = 'Veuillez accepter la charte et le règlement du club.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      // Scroll to first error
      const firstError = document.querySelector('.form-field-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    // Simulate clean athletic verification
    setTimeout(() => {
      import('../utils/storage').then(({ saveNewRegistration }) => {
        const saved = saveNewRegistration({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          birthDate,
          gender,
          runningLevel,
          healthStatus,
          healthRestrictions: healthStatus === 'oui' ? healthRestrictions.trim() : '',
          medicalConsent,
          termsAccepted,
        });

        setIsSubmitting(false);
        onSubmitSuccess(saved);
      });
    }, 450);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 bg-white">
      {/* Official Top Branding */}
      <div className="text-center mb-6">
        <MrcLogo variant="badge" showSubtitle={false} />

        {/* Swiss Modern Sports Editorial Headline */}
        <div className="mt-6 border-b-2 border-[#0047AB] pb-4">
          <h2 className="font-condensed font-black tracking-tight text-4xl sm:text-5xl text-[#0047AB] uppercase leading-[0.95]">
            REJOINS LES MARINS.
          </h2>
        </div>
      </div>

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-8 mt-6">
        {/* SECTION 1: INFORMATIONS PERSONNELLES (CHAMPS 1 À 5) */}
        <div>
          <div className="flex items-center gap-2 border-b border-[#0047AB] pb-1.5 mb-5">
            <span className="w-6 h-6 bg-[#0047AB] text-white font-mono font-bold text-xs flex items-center justify-center">
              01
            </span>
            <h3 className="font-condensed font-black text-xl text-[#0047AB] tracking-wide uppercase">
              INFORMATIONS DU MARIN
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* 1. NOM ET PRÉNOM */}
            <div className="sm:col-span-2">
              <label
                htmlFor="fullName"
                className="block text-xs font-bold uppercase tracking-wider text-[#0047AB] mb-1 font-mono"
              >
                1. Nom et Prénom <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="ex: Amina Mansouri"
                  className={`w-full px-3.5 py-3 text-sm text-slate-900 bg-white border ${
                    errors.fullName ? 'border-red-500' : 'border-slate-300'
                  } focus:border-[#0047AB] focus:ring-2 focus:ring-[#0047AB]/20 focus:outline-hidden transition-all`}
                />
                <div className="absolute right-3 top-3.5 text-slate-400 pointer-events-none">
                  <User className="w-4 h-4" />
                </div>
              </div>
              {errors.fullName && (
                <p className="text-red-600 text-xs mt-1 font-medium form-field-error">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* 2. ADRESSE E-MAIL */}
            <div className="sm:col-span-1">
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-[#0047AB] mb-1 font-mono"
              >
                2. Adresse E-mail <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@exemple.com"
                  className={`w-full px-3.5 py-3 text-sm text-slate-900 bg-white border ${
                    errors.email ? 'border-red-500' : 'border-slate-300'
                  } focus:border-[#0047AB] focus:ring-2 focus:ring-[#0047AB]/20 focus:outline-hidden transition-all`}
                />
                <div className="absolute right-3 top-3.5 text-slate-400 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </div>
              </div>
              {errors.email && (
                <p className="text-red-600 text-xs mt-1 font-medium form-field-error">
                  {errors.email}
                </p>
              )}
            </div>

            {/* 3. TÉLÉPHONE / WHATSAPP */}
            <div className="sm:col-span-1">
              <label
                htmlFor="phone"
                className="block text-xs font-bold uppercase tracking-wider text-[#0047AB] mb-1 font-mono"
              >
                3. N° Téléphone / WhatsApp <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+213 6XX XX XX XX"
                  className={`w-full px-3.5 py-3 text-sm text-slate-900 bg-white border ${
                    errors.phone ? 'border-red-500' : 'border-slate-300'
                  } focus:border-[#0047AB] focus:ring-2 focus:ring-[#0047AB]/20 focus:outline-hidden transition-all`}
                />
                <div className="absolute right-3 top-3.5 text-slate-400 pointer-events-none">
                  <Phone className="w-4 h-4" />
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Nécessaire pour le groupe WhatsApp officiel des sorties.
              </p>
              {errors.phone && (
                <p className="text-red-600 text-xs mt-1 font-medium form-field-error">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* 4. DATE DE NAISSANCE */}
            <div className="sm:col-span-1">
              <label
                htmlFor="birthDate"
                className="block text-xs font-bold uppercase tracking-wider text-[#0047AB] mb-1 font-mono"
              >
                4. Date de Naissance <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  ref={birthDateInputRef}
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  onClick={handleOpenDatePicker}
                  className={`w-full pl-3.5 pr-11 py-3 text-sm text-slate-900 bg-white border cursor-pointer ${
                    errors.birthDate ? 'border-red-500' : 'border-slate-300'
                  } focus:border-[#0047AB] focus:ring-2 focus:ring-[#0047AB]/20 focus:outline-hidden transition-all [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:w-8`}
                />
                <button
                  type="button"
                  onClick={handleOpenDatePicker}
                  aria-label="Sélectionner la date de naissance"
                  tabIndex={-1}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#0047AB] hover:text-[#003078] hover:bg-[#F0F6FF] transition-colors cursor-pointer flex items-center justify-center rounded-xs"
                >
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
              {errors.birthDate && (
                <p className="text-red-600 text-xs mt-1 font-medium form-field-error">
                  {errors.birthDate}
                </p>
              )}
            </div>

            {/* 5. GENRE / CATÉGORIE */}
            <div className="sm:col-span-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0047AB] mb-1 font-mono">
                5. Genre / Catégorie <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('femme')}
                  className={`py-3 px-3 text-xs font-bold uppercase tracking-wider border text-center transition-all ${
                    gender === 'femme'
                      ? 'bg-[#0047AB] text-white border-[#0047AB] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-[#0047AB]'
                  }`}
                >
                  Femme
                </button>
                <button
                  type="button"
                  onClick={() => setGender('homme')}
                  className={`py-3 px-3 text-xs font-bold uppercase tracking-wider border text-center transition-all ${
                    gender === 'homme'
                      ? 'bg-[#0047AB] text-white border-[#0047AB] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-[#0047AB]'
                  }`}
                >
                  Homme
                </button>
              </div>
              {errors.gender && (
                <p className="text-red-600 text-xs mt-1 font-medium form-field-error">
                  {errors.gender}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: PROFIL ATHLÉTIQUE (CHAMP 6 & ÉQUIPEMENT) */}
        <div>
          <div className="flex items-center gap-2 border-b border-[#0047AB] pb-1.5 mb-5">
            <span className="w-6 h-6 bg-[#0047AB] text-white font-mono font-bold text-xs flex items-center justify-center">
              02
            </span>
            <h3 className="font-condensed font-black text-xl text-[#0047AB] tracking-wide uppercase">
              PROFIL SPORTIF
            </h3>
          </div>

          <div className="space-y-4">
            {/* 6. NIVEAU DE COURSE */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0047AB] mb-2 font-mono">
                6. Niveau de Course Actuel <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    key: 'debutant',
                    title: 'Débutant / Reprise',
                    desc: 'Je cours peu ou je reprends le rythme (1 à 5 km).',
                    pace: 'Allure libre',
                  },
                  {
                    key: 'intermediaire',
                    title: 'Intermédiaire',
                    desc: 'Je cours régulièrement (5 à 10 km, 1-2 fois/semaine).',
                    pace: 'Allure 5:30 - 6:30/km',
                  },
                  {
                    key: 'avance',
                    title: 'Confirmé / Marathon',
                    desc: 'Habitué aux sorties longues, 15km+, semi ou marathons.',
                    pace: 'Allure < 5:15/km',
                  },
                ].map((lvl) => (
                  <div
                    key={lvl.key}
                    onClick={() => setRunningLevel(lvl.key as RunningLevel)}
                    className={`cursor-pointer p-3.5 border transition-all text-left relative ${
                      runningLevel === lvl.key
                        ? 'border-[#0047AB] bg-[#F0F6FF] ring-1 ring-[#0047AB]'
                        : 'border-slate-300 bg-white hover:border-[#0047AB]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-condensed font-bold text-base text-[#0047AB] uppercase">
                        {lvl.title}
                      </span>
                      {runningLevel === lvl.key && (
                        <CheckCircle2 className="w-4 h-4 text-[#0047AB]" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-snug mb-2">
                      {lvl.desc}
                    </p>
                    <span className="text-[10px] font-mono font-semibold uppercase text-slate-500 bg-white px-1.5 py-0.5 border border-slate-200">
                      {lvl.pace}
                    </span>
                  </div>
                ))}
              </div>
              {errors.runningLevel && (
                <p className="text-red-600 text-xs mt-1 font-medium form-field-error">
                  {errors.runningLevel}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 3: QUESTION DE SANTÉ ET CONFIDENTIALITÉ (MANDATORY EXACT TEXT) */}
        <div>
          <div className="flex items-center gap-2 border-b border-[#0047AB] pb-1.5 mb-5">
            <span className="w-6 h-6 bg-[#0047AB] text-white font-mono font-bold text-xs flex items-center justify-center">
              03
            </span>
            <div className="flex items-center gap-2">
              <h3 className="font-condensed font-black text-xl text-[#0047AB] tracking-wide uppercase">
                QUESTION DE SANTÉ & SUIVI MÉDICAL
              </h3>
            </div>
          </div>

          <div className="border border-[#0047AB]/30 p-5 bg-[#F0F6FF]/40 space-y-5">
            {/* Health Prompt verbatim */}
            <div>
              <div className="flex items-start gap-2.5 mb-3">
                <HeartPulse className="w-5 h-5 text-[#0047AB] shrink-0 mt-0.5" />
                <label className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  « As-tu un problème de santé ou une contre-indication médicale pouvant
                  limiter ou empêcher la pratique du running ? »{' '}
                  <span className="text-red-500">*</span>
                </label>
              </div>

              {/* 3 Options */}
              <div className="space-y-2.5 pl-0 sm:pl-7">
                {[
                  {
                    value: 'oui',
                    label: 'Oui',
                    desc: 'J’ai un antécédent, une blessure ou une restriction.',
                  },
                  {
                    value: 'non',
                    label: 'Non',
                    desc: 'Aucune contre-indication connue à ce jour.',
                  },
                  {
                    value: 'ne_sais_pas',
                    label: 'Je ne sais pas / Je préfère demander un avis médical',
                    desc: 'Je souhaite faire un bilan ou consulter un médecin.',
                  },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-start gap-3 p-3 border cursor-pointer transition-all ${
                      healthStatus === opt.value
                        ? 'border-[#0047AB] bg-white ring-1 ring-[#0047AB]'
                        : 'border-slate-300 bg-white hover:border-[#0047AB]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="healthStatus"
                      value={opt.value}
                      checked={healthStatus === opt.value}
                      onChange={() => setHealthStatus(opt.value as HealthAnswer)}
                      className="mt-1 w-4 h-4 text-[#0047AB] border-slate-300 focus:ring-[#0047AB]"
                    />
                    <div className="text-left">
                      <span className="block text-sm font-bold text-slate-900">
                        {opt.label}
                      </span>
                      <span className="block text-xs text-slate-500 mt-0.5">
                        {opt.desc}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
              {errors.healthStatus && (
                <p className="text-red-600 text-xs mt-1.5 font-medium pl-0 sm:pl-7 form-field-error">
                  {errors.healthStatus}
                </p>
              )}
            </div>

            {/* Conditional Field if "Oui" */}
            {healthStatus === 'oui' && (
              <div className="pl-0 sm:pl-7 pt-2 animate-fadeIn">
                <div className="bg-white p-4 border border-[#0047AB]/40">
                  <label
                    htmlFor="healthRestrictions"
                    className="block text-xs sm:text-sm font-bold text-[#0047AB] mb-1.5 uppercase font-mono"
                  >
                    « Si tu le souhaites, précise les restrictions à prendre en compte. »
                    <span className="text-slate-500 text-xs font-normal normal-case block sm:inline sm:ml-2">
                      (Champ optionnel & strictement confidentiel)
                    </span>
                  </label>
                  <textarea
                    id="healthRestrictions"
                    rows={3}
                    value={healthRestrictions}
                    onChange={(e) => setHealthRestrictions(e.target.value)}
                    placeholder="Ex: Asthme à l'effort, ancienne entorse à la cheville droite, reprise post-blessure..."
                    className="w-full p-3 text-sm text-slate-900 bg-[#F0F6FF]/20 border border-slate-300 focus:border-[#0047AB] focus:ring-2 focus:ring-[#0047AB]/20 focus:outline-hidden"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Ces détails aident nos coachs et capitaines à adapter les allures et
                    veiller sur toi lors des sorties club.
                  </p>
                </div>
              </div>
            )}

            {/* Confidentiality & Non-exclusion Assurance */}
            <div className="flex items-start gap-2.5 text-xs text-slate-600 border-t border-[#0047AB]/20 pt-3">
              <ShieldAlert className="w-4 h-4 text-[#0047AB] shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-bold text-slate-900">Protection des données : </span>
                Les informations de santé sont traitées comme des données personnelles
                sensibles, avec accès strictement réservé aux encadrants. Aucun membre
                n'est exclu ou rejeté sur la base de cette réponse.
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: ENGAGEMENT ET ATTESTATION */}
        <div className="space-y-3 pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={medicalConsent}
              onChange={(e) => setMedicalConsent(e.target.checked)}
              className="mt-1 w-4 h-4 text-[#0047AB] border-slate-300 rounded-none focus:ring-[#0047AB]"
            />
            <span className="text-xs sm:text-sm text-slate-700 leading-snug">
              J'atteste sur l'honneur être apte à la pratique de la course à pied et m'engage à
              courir en toute sécurité et à mon propre rythme lors des sorties.
            </span>
          </label>
          {errors.medicalConsent && (
            <p className="text-red-600 text-xs font-medium form-field-error">
              {errors.medicalConsent}
            </p>
          )}

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 text-[#0047AB] border-slate-300 rounded-none focus:ring-[#0047AB]"
            />
            <span className="text-xs sm:text-sm text-slate-700 leading-snug">
              J'accepte l'esprit sportif, la bienveillance et la charte officielle des Marins
              du Mosta Run Club.
            </span>
          </label>
          {errors.termsAccepted && (
            <p className="text-red-600 text-xs font-medium form-field-error">
              {errors.termsAccepted}
            </p>
          )}
        </div>

        {/* PROMINENT MRC-BLUE SUBMIT BUTTON */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0047AB] hover:bg-[#003078] text-white font-condensed font-black tracking-wider text-xl sm:text-2xl uppercase py-4 px-6 transition-all duration-200 active:scale-[0.99] shadow-md flex items-center justify-center gap-3 disabled:opacity-75 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ENREGISTREMENT EN COURS...
              </span>
            ) : (
              <>
                <span>VALIDER MON INSCRIPTION</span>
                <ArrowRight className="w-6 h-6 stroke-[2.5]" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Swiss Editorial Footer / Discreet Organizer Access (Triple-click protected) */}
      <footer className="mt-12 pt-6 border-t border-[#0047AB]/20 flex justify-center text-xs text-slate-500 font-mono">
        <button
          type="button"
          onClick={handleSecretTripleClick}
          className="px-3 py-1.5 border border-slate-300 hover:border-[#0047AB] text-slate-600 hover:text-[#0047AB] text-[11px] uppercase tracking-wider font-mono transition-colors cursor-pointer select-none active:scale-95"
        >
          Espace Capitaines / Liste des Membres
        </button>
      </footer>

      {/* Secret Authentication Modal for Capitaines (Triggered only after 3 quick clicks) */}
      <CaptainsLoginModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(captainName) => {
          setIsAuthModalOpen(false);
          onOpenCaptainsPortal(captainName);
        }}
      />
    </div>
  );
};
