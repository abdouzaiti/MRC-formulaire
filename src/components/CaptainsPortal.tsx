import React, { useState } from 'react';
import { RegistrationData } from '../types';
import { exportToCsv, deleteStoredRegistration } from '../utils/storage';
import {
  X,
  Download,
  Search,
  Trash2,
  ShieldAlert,
  Users,
  Eye,
  EyeOff,
  Filter,
} from 'lucide-react';

interface CaptainsPortalProps {
  isOpen: boolean;
  onClose: () => void;
  registrations: RegistrationData[];
  onRefresh: () => void;
  activeCaptain?: string;
}

export const CaptainsPortal: React.FC<CaptainsPortalProps> = ({
  isOpen,
  onClose,
  registrations,
  onRefresh,
  activeCaptain,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [unmaskedHealthId, setUnmaskedHealthId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = registrations.filter((r) => {
    const matchesSearch =
      r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.bibNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm);

    const matchesLevel =
      levelFilter === 'all' ? true : r.runningLevel === levelFilter;

    return matchesSearch && matchesLevel;
  });

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Confirmer la suppression de l'inscription de ${name} ?`)) {
      deleteStoredRegistration(id);
      onRefresh();
    }
  };

  const handleExport = () => {
    exportToCsv(registrations);
  };

  // Metrics
  const totalCount = registrations.length;
  const womenCount = registrations.filter((r) => r.gender === 'femme').length;
  const menCount = registrations.filter((r) => r.gender === 'homme').length;
  const healthRestrictionsCount = registrations.filter(
    (r) => r.healthStatus === 'oui'
  ).length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-4xl bg-white h-full shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-[#0047AB] text-white px-6 py-4 flex items-center justify-between border-b border-[#003078]">
          <div className="flex items-center gap-3">
            <img
              src="/mosta.png"
              alt="MRC Logo"
              className="w-10 h-10 object-contain bg-white p-0.5"
            />
            <div>
              <h2 className="font-condensed font-black text-xl uppercase tracking-wider">
                ESPACE CAPITAINES & ENCADRANTS MRC
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Top Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#F0F6FF] border-b border-[#0047AB]/20 text-xs font-mono">
          <div className="bg-white p-3 border border-slate-200">
            <span className="text-slate-400 block uppercase font-bold text-[10px]">
              TOTAL MARINS
            </span>
            <span className="text-2xl font-condensed font-black text-[#0047AB]">
              {totalCount}
            </span>
          </div>

          <div className="bg-white p-3 border border-slate-200">
            <span className="text-slate-400 block uppercase font-bold text-[10px]">
              RÉPARTITION
            </span>
            <span className="text-sm font-bold text-slate-800">
              {womenCount} F · {menCount} H
            </span>
          </div>

          <div className="bg-white p-3 border border-slate-200">
            <span className="text-slate-400 block uppercase font-bold text-[10px]">
              SUIVI SANTÉ
            </span>
            <span className="text-sm font-bold text-amber-600 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              {healthRestrictionsCount} mention(s)
            </span>
          </div>

          <div className="bg-white p-3 border border-slate-200 flex items-center justify-center">
            <button
              onClick={handleExport}
              className="w-full bg-[#0047AB] hover:bg-[#003078] text-white text-xs font-condensed font-bold py-2 px-3 flex items-center justify-center gap-1.5 uppercase transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exporter CSV</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par nom, email, dossard..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 focus:border-[#0047AB] focus:ring-1 focus:ring-[#0047AB] focus:outline-hidden"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="text-xs border border-slate-300 py-2 px-2.5 bg-white text-slate-700 focus:border-[#0047AB] focus:outline-hidden"
            >
              <option value="all">Tous les niveaux</option>
              <option value="debutant">Débutant</option>
              <option value="intermediaire">Intermédiaire</option>
              <option value="avance">Confirmé / Marathon</option>
            </select>
          </div>
        </div>

        {/* Members Table */}
        <div className="flex-1 overflow-y-auto p-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400 font-mono text-xs">
              Aucun marin trouvé pour cette recherche.
            </div>
          ) : (
            <div className="divide-y divide-slate-200 border border-slate-200">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-white hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs bg-[#0047AB] text-white px-2 py-0.5">
                          {item.bibNumber}
                        </span>
                        <h4 className="font-condensed font-black text-lg text-slate-900 uppercase">
                          {item.fullName}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-500 uppercase px-1.5 py-0.5 border border-slate-200">
                          {item.gender}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-slate-600 font-mono">
                        <span>📧 {item.email}</span>
                        <span>📱 {item.phone}</span>
                        <span>
                          🏃 Niveau :{' '}
                          <strong className="text-[#0047AB]">
                            {item.runningLevel}
                          </strong>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => handleDelete(item.id, item.fullName)}
                        title="Supprimer"
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Health Sensitive Info Display (Controlled & Privacy Conscious) */}
                  <div className="mt-3 pt-2 border-t border-dashed border-slate-200 text-xs flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">
                        Statut Santé :
                      </span>
                      {item.healthStatus === 'non' && (
                        <span className="text-emerald-700 font-mono text-[11px] font-semibold">
                          ✓ Aucune contre-indication
                        </span>
                      )}
                      {item.healthStatus === 'ne_sais_pas' && (
                        <span className="text-amber-700 font-mono text-[11px] font-semibold">
                          ⚠ Souhaite avis médical
                        </span>
                      )}
                      {item.healthStatus === 'oui' && (
                        <div className="flex items-center gap-2">
                          <span className="bg-amber-100 text-amber-800 font-mono text-[10px] font-bold px-1.5 py-0.5 uppercase">
                            Restrictions signalées
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setUnmaskedHealthId(
                                unmaskedHealthId === item.id ? null : item.id
                              )
                            }
                            className="text-[#0047AB] hover:underline text-[11px] font-mono flex items-center gap-1"
                          >
                            {unmaskedHealthId === item.id ? (
                              <>
                                <EyeOff className="w-3 h-3" /> Masquer détail
                              </>
                            ) : (
                              <>
                                <Eye className="w-3 h-3" /> Voir restriction
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    <span className="text-[10px] font-mono text-slate-400">
                      Inscrit le {new Date(item.registeredAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>

                  {/* Unmasked Sensitive Restriction Content */}
                  {unmaskedHealthId === item.id && item.healthRestrictions && (
                    <div className="mt-2 p-2.5 bg-amber-50/80 border border-amber-200 text-xs text-amber-900 font-mono">
                      <strong>Précision confidentielle :</strong>{' '}
                      {item.healthRestrictions}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
