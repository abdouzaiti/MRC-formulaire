import React from 'react';
import { RegistrationData } from '../types';
import { Calendar, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface ConfirmationScreenProps {
  data: RegistrationData;
  onReset: () => void;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  data,
  onReset,
}) => {
  const { t, language, isRtl } = useLanguage();

  const formattedDate = new Date(data.registeredAt).toLocaleDateString(
    language === 'ar' ? 'ar-DZ' : language === 'es' ? 'es-ES' : language === 'en' ? 'en-US' : 'fr-FR',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 bg-white">
      {/* Language Switcher Bar */}
      {/* Language Switcher Bar */}
      <div className="flex justify-center sm:justify-end mb-6">
        <LanguageSelector />
      </div>

      {/* Top Success Badge */}
      <div className="text-center mb-6">
        <img
          src="/mosta.png"
          alt="Mosta Run Club"
          className="h-20 sm:h-24 w-auto object-contain mx-auto mb-3 drop-shadow-xs"
        />
        <h2 className="font-condensed font-black text-3xl sm:text-5xl text-[#0047AB] uppercase tracking-tight mt-2">
          {t.welcomeTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-700 font-medium italic mt-1">
          {t.motto}
        </p>
      </div>

      {/* OFFICIAL MEMBERSHIP PASS */}
      <div className="border-2 border-[#0047AB] bg-white shadow-md relative overflow-hidden mb-8 print:border-black">
        {/* Top Header */}
        <div className="bg-[#0047AB] text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">⚓</span>
            <div>
              <div className="font-condensed font-black tracking-wider text-lg uppercase leading-none">
                {t.memberCardTitle}
              </div>
              <div className="text-[10px] font-mono tracking-widest text-blue-100 uppercase">
                {t.appTitle} · MOSTAGANEM
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-bold tracking-widest bg-white/20 px-2 py-0.5">
              2026
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-mono font-bold uppercase text-slate-400">
                {t.clubMemberLabel}
              </div>
              <div className="font-condensed font-black text-2xl sm:text-3xl text-slate-900 uppercase tracking-tight">
                {data.fullName}
              </div>
              <div className="text-xs text-slate-600 font-mono mt-0.5">
                {data.email} · {data.phone}
              </div>
            </div>
            <div className="text-right font-mono text-xs shrink-0">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">
                {t.joinDateLabel}
              </span>
              <span className="font-bold text-slate-800">{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* WHATSAPP COMMUNITY & WEEKLY SCHEDULE */}
      <div className="space-y-4 mb-8">
        {/* WhatsApp CTA */}
        <div className="bg-[#0047AB] text-white p-5 border border-[#0047AB] shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white text-[#0047AB] flex items-center justify-center font-bold text-xl shrink-0">
              💬
            </div>
            <div className="flex-1">
              <div className="font-condensed font-black text-xl uppercase tracking-wide">
                {t.whatsappTitle}
              </div>
              <p className="text-xs sm:text-sm text-blue-100 mt-1 leading-relaxed">
                {t.whatsappDesc}
              </p>
              <a
                href="https://chat.whatsapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3.5 inline-flex items-center gap-2 bg-white text-[#0047AB] font-condensed font-bold text-sm tracking-wider uppercase px-4 py-2 hover:bg-blue-50 transition-colors shadow-xs"
              >
                <span>{t.whatsappBtn}</span>
                <span className="text-base">⚓</span>
              </a>
            </div>
          </div>
        </div>

        {/* Weekly Training Schedule */}
        <div className="border border-[#0047AB]/30 p-5 bg-[#F0F6FF]/30">
          <div className="flex items-center gap-2 border-b border-[#0047AB]/30 pb-2 mb-3">
            <Calendar className="w-4 h-4 text-[#0047AB]" />
            <h3 className="font-condensed font-black text-lg text-[#0047AB] uppercase tracking-wide">
              {t.scheduleTitle}
            </h3>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            <div className="flex items-start gap-3 bg-white p-3 border border-slate-200">
              <div className="font-mono font-bold text-[#0047AB] w-32 shrink-0 uppercase">
                {t.sundayLabel}
              </div>
              <div>
                <strong className="text-slate-900 block">{t.sundayTitle}</strong>
                <span className="text-slate-500 text-xs">{t.sundayLocation}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-3 border border-slate-200">
              <div className="font-mono font-bold text-[#0047AB] w-32 shrink-0 uppercase">
                {t.tuesdayLabel}
              </div>
              <div>
                <strong className="text-slate-900 block">{t.tuesdayTitle}</strong>
                <span className="text-slate-500 text-xs">{t.tuesdayLocation}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-3 border border-slate-200">
              <div className="font-mono font-bold text-[#0047AB] w-32 shrink-0 uppercase">
                {t.fridayLabel}
              </div>
              <div>
                <strong className="text-slate-900 block">{t.fridayTitle}</strong>
                <span className="text-slate-500 text-xs">{t.fridayLocation}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="print:hidden">
        <button
          type="button"
          onClick={onReset}
          className="w-full bg-[#0047AB] hover:bg-[#003078] text-white font-condensed font-bold text-base uppercase py-3.5 px-4 flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
          <span>{t.returnButton}</span>
        </button>
      </div>
    </div>
  );
};
