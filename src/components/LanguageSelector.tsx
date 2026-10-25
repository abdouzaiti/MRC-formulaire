import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';
import { Check } from 'lucide-react';

const LANGUAGES: { code: Language; label: string; flag: string; full: string }[] = [
  { code: 'fr', label: 'FR', flag: '🇫🇷', full: 'Français' },
  { code: 'ar', label: 'العربية', flag: '🇩🇿', full: 'العربية' },
  { code: 'en', label: 'EN', flag: '🇬🇧', full: 'English' },
  { code: 'es', label: 'ES', flag: '🇪🇸', full: 'Español' },
];

export const LanguageSelector: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-full border-2 border-[#0047AB]/25 shadow-md hover:border-[#0047AB]/60 transition-all duration-300 font-sans text-xs ${className}`}
    >
      <div className="flex items-center gap-1">
        {LANGUAGES.map((lang) => {
          const isActive = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code)}
              className={`relative px-3 py-1.5 rounded-full font-bold text-xs transition-all duration-200 cursor-pointer select-none flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#0047AB] text-white shadow-sm ring-2 ring-[#0047AB]/20 font-mono scale-[1.02]'
                  : 'text-slate-600 hover:text-[#0047AB] hover:bg-[#F0F6FF] font-mono'
              }`}
              title={`Changer la langue en ${lang.full}`}
            >
              <span className="tracking-tight">{lang.label}</span>
              {isActive && <Check className="w-3 h-3 text-white shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
