import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, X, ShieldAlert, ArrowRight } from 'lucide-react';

interface CaptainsLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (captainName: string) => void;
}

export const CaptainsLoginModal: React.FC<CaptainsLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanUser || !cleanPass) {
      setError('Veuillez remplir les deux champs.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      // Verify against club captain credentials:
      // 1. user: abdou, pass: uobda8002
      // 2. user: mohamed, pass: mohamed1999
      if (cleanUser === 'abdou' && cleanPass === 'uobda8002') {
        setUsername('');
        setPassword('');
        onSuccess('Abdou');
      } else if (cleanUser === 'mohamed' && cleanPass === 'mohamed1999') {
        setUsername('');
        setPassword('');
        onSuccess('Mohamed');
      } else {
        setError('Identifiant ou mot de passe incorrect.');
      }
    }, 300);
  };

  const handleClose = () => {
    setError('');
    setUsername('');
    setPassword('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white border-2 border-[#0047AB] shadow-2xl p-6 sm:p-7 animate-fadeIn">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center pb-5 border-b border-[#0047AB]/20 mb-5">
          <img
            src="/mosta.png"
            alt="MRC Logo"
            className="h-16 w-auto object-contain mx-auto mb-2.5"
          />
          <h3 className="font-condensed font-black text-2xl text-[#0047AB] uppercase tracking-tight">
            AUTHENTIFICATION CAPITAINE
          </h3>
          <p className="text-xs font-mono text-slate-500 mt-1 uppercase">
            Accès sécurisé · Staff Mosta Run Club
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-mono flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0047AB] mb-1 font-mono">
              Identifiant Capitaine
            </label>
            <div className="relative">
              <input
                type="text"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ex: ahmed"
                className="w-full pl-9 pr-3 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 focus:border-[#0047AB] focus:ring-2 focus:ring-[#0047AB]/20 focus:outline-hidden font-mono"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0047AB] mb-1 font-mono">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 focus:border-[#0047AB] focus:ring-2 focus:ring-[#0047AB]/20 focus:outline-hidden font-mono"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-2.5 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0047AB] hover:bg-[#003078] text-white font-condensed font-bold text-lg uppercase py-3 px-4 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isLoading ? (
                <span>VÉRIFICATION EN COURS...</span>
              ) : (
                <>
                  <span>ACCÉDER AU TABLEAU DE BORD</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-200 text-center text-[10px] text-slate-400 font-mono">
          MOSTA RUN CLUB · ACCÈS PRIVÉ ENCADRANTS
        </div>
      </div>
    </div>
  );
};
