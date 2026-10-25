import React from 'react';

export const FlyerHeaderBar: React.FC = () => {
  return (
    <header className="w-full border-b border-[#0047AB]/20 bg-white sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between text-xs text-slate-600 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0047AB] animate-pulse" />
          <span className="font-bold text-[#0047AB] tracking-wider uppercase font-condensed text-sm">
            MOSTA RUN CLUB
          </span>
          <span className="hidden sm:inline text-slate-400">/</span>
          <span className="hidden sm:inline font-sans text-[11px] text-slate-500">
            Campagne d'adhésion officielle
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="hidden md:inline font-mono text-slate-400">
            35°56′N 0°05′E · MOSTAGANEM
          </span>
          <div className="px-2 py-0.5 border border-[#0047AB] text-[#0047AB] font-bold uppercase text-[10px] tracking-wider">
            SAISON 2026-2027
          </div>
        </div>
      </div>
    </header>
  );
};

export const FlyerEditorialGrid: React.FC = () => {
  return (
    <div className="w-full border-y border-[#0047AB]/25 my-6 py-2 px-3 bg-[#F0F6FF]/60 flex flex-wrap items-center justify-between gap-y-2 text-[11px] text-slate-600 font-mono">
      <div className="flex items-center gap-2">
        <span className="text-[#0047AB] font-bold">DOC:</span>
        <span className="uppercase tracking-wider">BULLETIN-ADHESION-MRC</span>
      </div>
      <div className="hidden sm:flex items-center gap-3">
        <span>LA SALAMANDRE</span>
        <span>·</span>
        <span>CORNICHE</span>
        <span>·</span>
        <span>PORT DE MOSTA</span>
      </div>
      <div className="flex items-center gap-2 text-[#0047AB] font-bold">
        <span>⚓ LES MARINS</span>
        <span>#001</span>
      </div>
    </div>
  );
};
