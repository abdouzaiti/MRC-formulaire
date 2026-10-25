import React, { useState, useRef } from 'react';
import { MrcLogo } from './MrcLogo';
import { CaptainsLoginModal } from './CaptainsLoginModal';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../i18n/LanguageContext';
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
  const { t, isRtl } = useLanguage();

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
  const [healthStatus, setHealthStatus] = useState<HealthAnswer | ''>('');
  const [healthRestrictions, setHealthRestrictions] = useState('');
  const [medicalConsent, setMedicalConsent] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Validation State
  const [errors, setErrors] = useState<RegistrationFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const validate = (): boolean => {
    const errs: RegistrationFormErrors = {};

    if (!fullName.trim()) {
      errs.fullName = t.errFullNameRequired;
    } else if (fullName.trim().length < 3) {
      errs.fullName = t.errFullNameMin;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = t.errEmailInvalid;
    }

    const cleanPhone = phone.replace(/\s+/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      errs.phone = t.errPhoneInvalid;
    }

    if (!birthDate) {
      errs.birthDate = t.errBirthDateRequired;
    }

    if (!gender) {
      errs.gender = t.errFullNameRequired;
    }

    if (!runningLevel) {
      errs.runningLevel = t.errFullNameRequired;
    }

    if (!healthStatus) {
      errs.healthStatus = t.errHealthRequired;
    }

    if (!medicalConsent) {
      errs.medicalConsent = t.errMedicalConsentRequired;
    }

    if (!termsAccepted) {
      errs.termsAccepted = t.errTermsRequired;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const firstError = document.querySelector('.form-field-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    import('../utils/storage').then(async ({ saveNewRegistration }) => {
      try {
        const saved = await saveNewRegistration({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          birthDate,
          gender,
          runningLevel,
          healthStatus: healthStatus as HealthAnswer,
          healthRestrictions: healthStatus === 'oui' ? healthRestrictions.trim() : '',
          medicalConsent,
          termsAccepted,
        });

        setIsSubmitting(false);
        onSubmitSuccess(saved);
      } catch (err) {
        console.error('Error saving registration:', err);
        setIsSubmitting(false);
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 bg-white">
      {/* Top Language Switcher Bar */}
      <div className="flex justify-center sm:justify-end mb-6">
        <LanguageSelector />
      </div>

      {/* Official Top Branding */}
      <div className="text-center mb-6">
        <MrcLogo variant="badge" showSubtitle={false} />

        {/* Headline */}
        <div className="mt-6 border-b-2 border-[#0047AB] pb-4">
          <h2 className="font-condensed font-black tracking-tight text-4xl sm:text-5xl text-[#0047AB] uppercase leading-[0.95]">
            {t.officialBadge}
          </h2>
        </div>
      </div>

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-8 mt-6">
        {/* SECTION 1: INFORMATIONS PERSONNELLES */}
        <div>
          <div className="flex items-center gap-2 border-b border-[#0047AB] pb-1.5 mb-5">
            <span className="w-6 h-6 bg-[#0047AB] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
              01
            </span>
            <h3 className="font-condensed font-black text-xl text-[#0047AB] tracking-wide uppercase">
              {t.personalInfoSection}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* 1. NOM ET PRÉNOM */}
            <div className="sm:col-span-2">
              <label
                htmlFor="fullName"
                className="block text-xs font-bold uppercase tracking-wider text-[#0047AB] mb-1 font-mono"
              >
                1. {t.fullNameLabel} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t.fullNamePlaceholder}
                  className={`w-full ${
                    isRtl ? 'pr-3.5 pl-10' : 'pl-3.5 pr-10'
                  } py-3 text-sm text-slate-900 bg-white border ${
                    errors.fullName ? 'border-red-500' : 'border-slate-300'
                  } focus:border-[#0047AB] focus:ring-2 focus:ring-[#0047AB]/20 focus:outline-hidden transition-all`}
                />
                <div
                  className={`absolute ${
                    isRtl ? 'left-3' : 'right-3'
                  } top-3.5 text-slate-400 pointer-events-none`}
                >
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
                2. {t.emailLabel} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className={`w-full ${
                    isRtl ? 'pr-3.5 pl-10' : 'pl-3.5 pr-10'
                  } py-3 text-sm text-slate-900 bg-white border ${
                    errors.email ? 'border-red-500' : 'border-slate-300'
                  } focus:border-[#0047AB] focus:ring-2 focus:ring-[#0047AB]/20 focus:outline-hidden transition-all`}
                />
                <div
                  className={`absolute ${
                    isRtl ? 'left-3' : 'right-3'
                  } top-3.5 text-slate-400 pointer-events-none`}
                >
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
                3. {t.phoneLabel} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t.phonePlaceholder}
                  className={`w-full ${
                    isRtl ? 'pr-3.5 pl-10' : 'pl-3.5 pr-10'
                  } py-3 text-sm text-slate-900 bg-white border ${
                    errors.phone ? 'border-red-500' : 'border-slate-300'
                  } focus:border-[#0047AB] focus:ring-2 focus:ring-[#0047AB]/20 focus:outline-hidden transition-all`}
                />
                <div
                  className={`absolute ${
                    isRtl ? 'left-3' : 'right-3'
                  } top-3.5 text-slate-400 pointer-events-none`}
                >
                  <Phone className="w-4 h-4" />
                </div>
              </div>
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
                4. {t.birthDateLabel} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  ref={birthDateInputRef}
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  onClick={handleOpenDatePicker}
                  className={`w-full ${
                    isRtl ? 'pr-3.5 pl-11' : 'pl-3.5 pr-11'
                  } py-3 text-sm text-slate-900 bg-white border cursor-pointer ${
                    errors.birthDate ? 'border-red-500' : 'border-slate-300'
                  } focus:border-[#0047AB] focus:ring-2 focus:ring-[#0047AB]/20 focus:outline-hidden transition-all [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:w-8`}
                />
                <button
                  type="button"
                  onClick={handleOpenDatePicker}
                  aria-label="Select birth date"
                  tabIndex={-1}
                  className={`absolute ${
                    isRtl ? 'left-2.5' : 'right-2.5'
                  } top-1/2 -translate-y-1/2 p-1 text-[#0047AB] hover:text-[#003078] hover:bg-[#F0F6FF] transition-colors cursor-pointer flex items-center justify-center rounded-xs`}
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
                5. {t.genderLabel} <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('femme')}
                  className={`py-3 px-3 text-xs font-bold uppercase tracking-wider border text-center transition-all cursor-pointer ${
                    gender === 'femme'
                      ? 'bg-[#0047AB] text-white border-[#0047AB] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-[#0047AB]'
                  }`}
                >
                  {t.genderFemale}
                </button>
                <button
                  type="button"
                  onClick={() => setGender('homme')}
                  className={`py-3 px-3 text-xs font-bold uppercase tracking-wider border text-center transition-all cursor-pointer ${
                    gender === 'homme'
                      ? 'bg-[#0047AB] text-white border-[#0047AB] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-[#0047AB]'
                  }`}
                >
                  {t.genderMale}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: PROFIL SPORTIF */}
        <div>
          <div className="flex items-center gap-2 border-b border-[#0047AB] pb-1.5 mb-5">
            <span className="w-6 h-6 bg-[#0047AB] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
              02
            </span>
            <h3 className="font-condensed font-black text-xl text-[#0047AB] tracking-wide uppercase">
              {t.runningLevelLabel}
            </h3>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  key: 'debutant',
                  title: t.levelBeginner,
                },
                {
                  key: 'intermediaire',
                  title: t.levelIntermediate,
                },
                {
                  key: 'avance',
                  title: t.levelAdvanced,
                },
                {
                  key: 'elite',
                  title: t.levelElite,
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
                      <CheckCircle2 className="w-4 h-4 text-[#0047AB] shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 3: QUESTION DE SANTÉ ET CONFIDENTIALITÉ */}
        <div>
          <div className="flex items-center gap-2 border-b border-[#0047AB] pb-1.5 mb-5">
            <span className="w-6 h-6 bg-[#0047AB] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
              03
            </span>
            <div className="flex items-center gap-2">
              <h3 className="font-condensed font-black text-xl text-[#0047AB] tracking-wide uppercase">
                {t.healthSection}
              </h3>
            </div>
          </div>

          <div className="border border-[#0047AB]/30 p-5 bg-[#F0F6FF]/40 space-y-5">
            <div>
              <div className="flex items-start gap-2.5 mb-3">
                <HeartPulse className="w-5 h-5 text-[#0047AB] shrink-0 mt-0.5" />
                <label className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {t.healthQuestion} <span className="text-red-500">*</span>
                </label>
              </div>

              {/* 3 Options */}
              <div className="space-y-2.5">
                {[
                  {
                    value: 'non',
                    label: t.healthOptNo,
                  },
                  {
                    value: 'oui',
                    label: t.healthOptYes,
                  },
                  {
                    value: 'ne_sais_pas',
                    label: t.healthOptUnsure,
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
                    <div>
                      <span className="block text-sm font-bold text-slate-900">
                        {opt.label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
              {errors.healthStatus && (
                <p className="text-red-600 text-xs mt-1.5 font-medium form-field-error">
                  {errors.healthStatus}
                </p>
              )}
            </div>

            {/* Conditional Field if "Oui" */}
            {healthStatus === 'oui' && (
              <div className="pt-2 animate-fadeIn">
                <div className="bg-white p-4 border border-[#0047AB]/40">
                  <label
                    htmlFor="healthRestrictions"
                    className="block text-xs sm:text-sm font-bold text-[#0047AB] mb-1.5 uppercase font-mono"
                  >
                    {t.healthDetailLabel}
                  </label>
                  <textarea
                    id="healthRestrictions"
                    rows={3}
                    value={healthRestrictions}
                    onChange={(e) => setHealthRestrictions(e.target.value)}
                    placeholder={t.healthDetailPlaceholder}
                    className="w-full p-3 text-sm text-slate-900 bg-[#F0F6FF]/20 border border-slate-300 focus:border-[#0047AB] focus:ring-2 focus:ring-[#0047AB]/20 focus:outline-hidden"
                  />
                </div>
              </div>
            )}

            {/* Confidentiality Assurance */}
            <div className="flex items-start gap-2.5 text-xs text-slate-600 border-t border-[#0047AB]/20 pt-3">
              <ShieldAlert className="w-4 h-4 text-[#0047AB] shrink-0 mt-0.5" />
              <div className="leading-relaxed">{t.healthPrivacyNotice}</div>
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
              {t.medicalConsentText}
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
              {t.termsAcceptedText}
            </span>
          </label>
          {errors.termsAccepted && (
            <p className="text-red-600 text-xs font-medium form-field-error">
              {errors.termsAccepted}
            </p>
          )}
        </div>

        {/* PROMINENT SUBMIT BUTTON */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0047AB] hover:bg-[#003078] text-white font-condensed font-black tracking-wider text-xl sm:text-2xl uppercase py-4 px-6 transition-all duration-200 active:scale-[0.99] shadow-md flex items-center justify-center gap-3 disabled:opacity-75 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t.submittingText}
              </span>
            ) : (
              <>
                <span>{t.submitButton}</span>
                <ArrowRight
                  className={`w-6 h-6 stroke-[2.5] ${isRtl ? 'rotate-180' : ''}`}
                />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Swiss Editorial Footer / Secret Captains Login */}
      <footer className="mt-12 pt-6 border-t border-[#0047AB]/20 flex justify-center text-xs text-slate-500 font-mono">
        <button
          type="button"
          onClick={handleSecretTripleClick}
          className="px-3 py-1.5 border border-slate-300 hover:border-[#0047AB] text-slate-600 hover:text-[#0047AB] text-[11px] uppercase tracking-wider font-mono transition-colors cursor-pointer select-none active:scale-95"
        >
          {t.captainsPortalLink}
        </button>
      </footer>

      {/* Secret Authentication Modal for Capitaines */}
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
