import React from 'react';
import { RegistrationData } from '../types';
import { MrcLogo } from './MrcLogo';
import {
  CheckCircle,
  Share2,
  Printer,
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface ConfirmationScreenProps {
  data: RegistrationData;
  onReset: () => void;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  data,
  onReset,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(data.registeredAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const getLevelLabel = (lvl: string) => {
    switch (lvl) {
      case 'debutant':
        return 'Débutant / Reprise';
      case 'intermediaire':
        return 'Intermédiaire (5-10 km)';
      case 'avance':
        return 'Confirmé / Semi-Marathon';
      default:
        return lvl;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 bg-white">
      {/* Top Success Badge */}
      <div className="text-center mb-6">
        <img
          src="/mosta.png"
          alt="Mosta Run Club"
          className="h-20 sm:h-24 w-auto object-contain mx-auto mb-3 drop-shadow-xs"
        />
        <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase font-bold text-[#0047AB] tracking-widest bg-[#F0F6FF] px-3 py-1 border border-[#0047AB]/25">
          <CheckCircle className="w-3.5 h-3.5 text-[#0047AB]" />
          ADHÉSION CONFIRMÉE
        </div>
        <h2 className="font-condensed font-black text-3xl sm:text-5xl text-[#0047AB] uppercase tracking-tight mt-2">
          BIENVENUE CHEZ LES MARINS !
        </h2>
        <p className="text-sm sm:text-base text-slate-700 font-medium italic mt-1">
          « Une seule passion. Un seul club. Une seule famille. »
        </p>
      </div>

      {/* OFFICIAL MEMBERSHIP BIB / PASS MARIN (SWISS FLYER STYLE) */}
      <div className="border-2 border-[#0047AB] bg-white shadow-md relative overflow-hidden mb-8 print:border-black">
        {/* Top Header of the Bib */}
        <div className="bg-[#0047AB] text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">⚓</span>
            <div>
              <div className="font-condensed font-black tracking-wider text-lg uppercase leading-none">
                PASS OFFICIEL MARIN
              </div>
              <div className="text-[10px] font-mono tracking-widest text-blue-100 uppercase">
                MOSTA RUN CLUB · MOSTAGANEM
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-bold tracking-widest bg-white/20 px-2 py-0.5">
              SAISON 2026
            </span>
          </div>
        </div>

        {/* Bib Body */}
        <div className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#0047AB]/20 pb-5">
            <div>
              <div className="text-[11px] font-mono font-bold uppercase text-slate-400">
                ATHLÈTE ENGAGÉ
              </div>
              <div className="font-condensed font-black text-2xl sm:text-3xl text-slate-900 uppercase tracking-tight">
                {data.fullName}
              </div>
              <div className="text-xs text-slate-600 font-mono mt-0.5">
                {data.email} · {data.phone}
              </div>
            </div>

            {/* Prominent Dossard Number */}
            <div className="text-right bg-[#F0F6FF] px-4 py-2 border border-[#0047AB]">
              <div className="text-[10px] font-mono font-bold text-[#0047AB] uppercase tracking-widest">
                DOSSARD CLUB
              </div>
              <div className="font-condensed font-black text-3xl sm:text-4xl text-[#0047AB] leading-none">
                {data.bibNumber}
              </div>
            </div>
          </div>

          {/* Grid Information */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 text-xs font-mono border-b border-[#0047AB]/20">
            <div>
              <span className="block text-slate-400 text-[10px] uppercase font-bold">
                GENRE
              </span>
              <span className="font-bold text-slate-800 uppercase">
                {data.gender}
              </span>
            </div>
            <div>
              <span className="block text-slate-400 text-[10px] uppercase font-bold">
                NIVEAU
              </span>
              <span className="font-bold text-[#0047AB]">
                {getLevelLabel(data.runningLevel)}
              </span>
            </div>
            <div>
              <span className="block text-slate-400 text-[10px] uppercase font-bold">
                VILLE
              </span>
              <span className="font-bold text-slate-800">
                Mostaganem (27)
              </span>
            </div>
            <div>
              <span className="block text-slate-400 text-[10px] uppercase font-bold">
                DATE D'ENTRÉE
              </span>
              <span className="font-bold text-slate-800">
                {formattedDate}
              </span>
            </div>
          </div>

          {/* Health declaration privacy statement */}
          <div className="mt-3.5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0047AB]" />
              Dossier médical validé & engagement sportif consenti
            </span>
            <span className="text-[#0047AB] font-bold">SECTION 27</span>
          </div>

          {/* Decorative Sports Barcode */}
          <div className="mt-4 pt-3 border-t border-dashed border-slate-300 flex items-center justify-between">
            <div className="h-6 w-32 sports-barcode opacity-80" />
            <div className="text-[10px] font-mono text-slate-400">
              COORD. 35°56′N 0°05′E
            </div>
          </div>
        </div>
      </div>

      {/* PROCHAINES ÉTAPES : WHATSAPP ET PLANNING DES ENTRAÎNEMENTS */}
      <div className="space-y-4 mb-8">
        {/* WhatsApp Official Community CTA */}
        <div className="bg-[#0047AB] text-white p-5 border border-[#0047AB] shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white text-[#0047AB] flex items-center justify-center font-bold text-xl shrink-0">
              💬
            </div>
            <div className="flex-1">
              <div className="font-condensed font-black text-xl uppercase tracking-wide">
                Rejoins le Groupe WhatsApp Officiel
              </div>
              <p className="text-xs sm:text-sm text-blue-100 mt-1 leading-relaxed">
                C'est ici que sont annoncés les points de rendez-vous, les allures de
                groupe et les sorties dominicales à Mostaganem.
              </p>
              <a
                href="https://chat.whatsapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3.5 inline-flex items-center gap-2 bg-white text-[#0047AB] font-condensed font-bold text-sm tracking-wider uppercase px-4 py-2 hover:bg-blue-50 transition-colors shadow-xs"
              >
                <span>ACCÉDER AU GROUPE DES MARINS</span>
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
              PLANNING HEBDOMADAIRE DES SORTIES
            </h3>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            <div className="flex items-start gap-3 bg-white p-3 border border-slate-200">
              <div className="font-mono font-bold text-[#0047AB] w-20 shrink-0 uppercase">
                Mardi 19h00
              </div>
              <div>
                <strong className="text-slate-900 block">Fractionné & Côtes</strong>
                <span className="text-slate-500 text-xs">
                  Complexe sportif Raïd Feradj / Corniche
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-3 border border-slate-200">
              <div className="font-mono font-bold text-[#0047AB] w-20 shrink-0 uppercase">
                Jeudi 19h00
              </div>
              <div>
                <strong className="text-slate-900 block">Footing Convivial & Récup</strong>
                <span className="text-slate-500 text-xs">
                  La Salamandre — 6 à 8 km (tous niveaux bienvenus)
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-3 border border-slate-200">
              <div className="font-mono font-bold text-[#0047AB] w-20 shrink-0 uppercase">
                Samedi 07h30
              </div>
              <div>
                <strong className="text-slate-900 block">Grande Sortie Longue des Marins</strong>
                <span className="text-slate-500 text-xs">
                  Front de Mer vers Cap Ivi — 10 km à 21 km avec groupes de pacer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 print:hidden">
        <button
          type="button"
          onClick={handlePrint}
          className="w-full sm:w-1/2 border-2 border-[#0047AB] text-[#0047AB] hover:bg-[#F0F6FF] font-condensed font-bold text-base uppercase py-3 px-4 flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimer mon Dossard</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-1/2 bg-slate-900 hover:bg-slate-800 text-white font-condensed font-bold text-base uppercase py-3 px-4 flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Nouvelle Inscription</span>
        </button>
      </div>
    </div>
  );
};
