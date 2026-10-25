import { RegistrationData } from '../types';
import {
  isSupabaseConfigured,
  insertRegistrationToSupabase,
  fetchRegistrationsFromSupabase,
} from './supabase';

const STORAGE_KEY = 'mrc_registrations_v1';

const INITIAL_MEMBERS: RegistrationData[] = [
  {
    id: 'mrc-seed-1',
    bibNumber: 'MRC-26-018',
    registeredAt: '2026-10-20T09:30:00.000Z',
    fullName: 'Amine Benali',
    email: 'amine.benali@gmail.com',
    phone: '+213 555 12 34 56',
    birthDate: '1995-04-12',
    gender: 'homme',
    runningLevel: 'avance',
    healthStatus: 'non',
    medicalConsent: true,
    termsAccepted: true,
  },
  {
    id: 'mrc-seed-2',
    bibNumber: 'MRC-26-019',
    registeredAt: '2026-10-22T14:15:00.000Z',
    fullName: 'Yasmine Mansouri',
    email: 'yasmine.running@outlook.com',
    phone: '+213 661 78 90 12',
    birthDate: '1998-08-25',
    gender: 'femme',
    runningLevel: 'intermediaire',
    healthStatus: 'non',
    medicalConsent: true,
    termsAccepted: true,
  },
  {
    id: 'mrc-seed-3',
    bibNumber: 'MRC-26-020',
    registeredAt: '2026-10-24T18:40:00.000Z',
    fullName: 'Tarek Kaddour',
    email: 'tarek.kaddour@gmail.com',
    phone: '+213 770 45 67 89',
    birthDate: '1990-11-03',
    gender: 'homme',
    runningLevel: 'intermediaire',
    healthStatus: 'non',
    medicalConsent: true,
    termsAccepted: true,
  },
];

export const getStoredRegistrations = (): RegistrationData[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MEMBERS));
      return INITIAL_MEMBERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_MEMBERS;
  } catch (e) {
    console.error('Failed to load registrations', e);
    return INITIAL_MEMBERS;
  }
};

export const saveNewRegistration = async (
  formData: Omit<RegistrationData, 'id' | 'bibNumber' | 'registeredAt'>
): Promise<RegistrationData> => {
  // 1. Try syncing directly with Supabase first if configured
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await insertRegistrationToSupabase(formData);
      if (data && !error) {
        // Persist to local cache for instant offline review
        const current = getStoredRegistrations();
        const updated = [data, ...current.filter((r) => r.id !== data.id)];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
          console.error('Local cache storage error:', e);
        }
        return data;
      }
      console.warn('Supabase insertion failed, falling back to local storage:', error);
    } catch (err) {
      console.error('Supabase exception, falling back to local storage:', err);
    }
  }

  // 2. Fallback to local storage (e.g. before Supabase credentials are input)
  const current = getStoredRegistrations();
  const nextNum = current.length + 21;
  const bibNumber = `MRC-26-${String(nextNum).padStart(3, '0')}`;

  const newRecord: RegistrationData = {
    ...formData,
    id: `mrc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    bibNumber,
    registeredAt: new Date().toISOString(),
  };

  const updated = [newRecord, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to persist registration', e);
  }

  return newRecord;
};

export const syncAllRegistrationsWithSupabase = async (): Promise<RegistrationData[]> => {
  if (!isSupabaseConfigured()) {
    return getStoredRegistrations();
  }

  const remote = await fetchRegistrationsFromSupabase();
  if (remote && Array.isArray(remote) && remote.length > 0) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(remote));
    } catch (e) {
      console.error('Error saving remote registrations to storage', e);
    }
    return remote;
  }

  return getStoredRegistrations();
};

export const deleteStoredRegistration = (id: string): RegistrationData[] => {
  const current = getStoredRegistrations();
  const updated = current.filter((r) => r.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update storage', e);
  }
  return updated;
};

export const exportToCsv = (registrations: RegistrationData[]): void => {
  const headers = [
    'Dossard',
    'Date Inscription',
    'Nom Complet',
    'Email',
    'Téléphone',
    'Date de Naissance',
    'Genre',
    'Niveau',
    'Statut Santé',
    'Restrictions Déclarées',
  ];

  const rows = registrations.map((r) => [
    `"${r.bibNumber}"`,
    `"${new Date(r.registeredAt).toLocaleDateString('fr-FR')}"`,
    `"${r.fullName.replace(/"/g, '""')}"`,
    `"${r.email}"`,
    `"${r.phone}"`,
    `"${r.birthDate}"`,
    `"${r.gender}"`,
    `"${r.runningLevel}"`,
    `"${r.healthStatus}"`,
    `"${(r.healthRestrictions || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent =
    'data:text/csv;charset=utf-8,\uFEFF' +
    [headers.join(';'), ...rows.map((e) => e.join(';'))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute(
    'download',
    `mrc_inscriptions_${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
