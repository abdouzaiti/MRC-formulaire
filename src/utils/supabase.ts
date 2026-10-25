import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { RegistrationData } from '../types';

const STORAGE_CONFIG_KEY = 'mrc_supabase_config_v1';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export const getSupabaseConfig = (): SupabaseConfig => {
  // 1. Check Vite env variables first
  const envUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
  const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

  if (envUrl && envKey) {
    return { url: envUrl, anonKey: envKey };
  }

  // 2. Check localStorage config (user-configured in Captains Portal)
  try {
    const raw = localStorage.getItem(STORAGE_CONFIG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.url && parsed.anonKey) {
        return { url: parsed.url.trim(), anonKey: parsed.anonKey.trim() };
      }
    }
  } catch (e) {
    console.error('Error loading Supabase config from storage', e);
  }

  return { url: '', anonKey: '' };
};

export const saveSupabaseConfig = (url: string, anonKey: string): void => {
  const cleanUrl = url.trim();
  const cleanKey = anonKey.trim();
  localStorage.setItem(
    STORAGE_CONFIG_KEY,
    JSON.stringify({ url: cleanUrl, anonKey: cleanKey })
  );
  _supabaseInstance = null; // Reset cached client
};

let _supabaseInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient | null => {
  if (_supabaseInstance) return _supabaseInstance;

  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) return null;

  try {
    _supabaseInstance = createClient(url, anonKey, {
      auth: { persistSession: false },
    });
    return _supabaseInstance;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
};

export const isSupabaseConfigured = (): boolean => {
  const { url, anonKey } = getSupabaseConfig();
  return Boolean(url && anonKey);
};

// Test connection
export const testSupabaseConnection = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  const client = getSupabaseClient();
  if (!client) {
    return {
      success: false,
      message: 'Supabase URL et Clé Anon non configurées.',
    };
  }

  try {
    const { error } = await client
      .from('registrations')
      .select('count', { count: 'exact', head: true });

    if (error) {
      return {
        success: false,
        message: `Erreur Supabase: ${error.message} (${error.code || ''})`,
      };
    }

    return {
      success: true,
      message: 'Connexion à la table "registrations" réussie avec succès !',
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Impossible de joindre Supabase.',
    };
  }
};

// Insert a registration row into Supabase
export const insertRegistrationToSupabase = async (
  formData: Omit<RegistrationData, 'id' | 'bibNumber' | 'registeredAt'>
): Promise<{ data: RegistrationData | null; error: Error | null }> => {
  const client = getSupabaseClient();
  if (!client) {
    return { data: null, error: new Error('Supabase non configuré') };
  }

  try {
    const payload = {
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      birth_date: formData.birthDate,
      gender: formData.gender,
      running_level: formData.runningLevel,
      health_status: formData.healthStatus,
      health_restrictions: formData.healthRestrictions || null,
      medical_consent: formData.medicalConsent,
      terms_accepted: formData.termsAccepted,
    };

    // First attempt: insert + select returning record
    const { data, error } = await client
      .from('registrations')
      .insert(payload)
      .select()
      .single();

    if (!error && data) {
      const savedRecord: RegistrationData = {
        id: data.id,
        bibNumber: data.bib_number || `MRC-26-${String(data.id).slice(0, 4)}`,
        registeredAt: data.created_at || new Date().toISOString(),
        fullName: data.full_name,
        email: data.email,
        phone: data.phone,
        birthDate: data.birth_date,
        gender: data.gender,
        runningLevel: data.running_level,
        healthStatus: data.health_status,
        healthRestrictions: data.health_restrictions || '',
        medicalConsent: data.medical_consent,
        termsAccepted: data.terms_accepted,
      };
      return { data: savedRecord, error: null };
    }

    // Fallback if select() failed due to RLS read policy restrictions
    if (error) {
      console.warn('Supabase select error, trying plain insert fallback:', error.message);
      const { error: plainError } = await client
        .from('registrations')
        .insert(payload);

      if (!plainError) {
        const fallbackRecord: RegistrationData = {
          ...formData,
          id: `sp-${Date.now()}`,
          bibNumber: `MRC-26-${Math.floor(100 + Math.random() * 900)}`,
          registeredAt: new Date().toISOString(),
        };
        return { data: fallbackRecord, error: null };
      }

      return { data: null, error: new Error(plainError.message) };
    }

    return { data: null, error: new Error('Insertion échouée') };
  } catch (err: any) {
    console.error('Exception during Supabase insert:', err);
    return { data: null, error: err };
  }
};

// Fetch all registrations from Supabase
export const fetchRegistrationsFromSupabase = async (): Promise<
  RegistrationData[] | null
> => {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch from Supabase:', error);
      return null;
    }

    if (!Array.isArray(data)) return [];

    return data.map((item: any) => ({
      id: item.id,
      bibNumber: item.bib_number || `MRC-26-${String(item.id).slice(0, 3)}`,
      registeredAt: item.created_at || new Date().toISOString(),
      fullName: item.full_name,
      email: item.email,
      phone: item.phone,
      birthDate: item.birth_date,
      gender: item.gender,
      runningLevel: item.running_level,
      healthStatus: item.health_status,
      healthRestrictions: item.health_restrictions || '',
      medicalConsent: item.medical_consent,
      termsAccepted: item.terms_accepted,
    }));
  } catch (err) {
    console.error('Failed to fetch registrations from Supabase:', err);
    return null;
  }
};

// Delete a registration row from Supabase
export const deleteRegistrationFromSupabase = async (
  id: string
): Promise<boolean> => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('registrations').delete().eq('id', id);
    if (error) {
      console.error('Error deleting from Supabase:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Exception deleting from Supabase:', err);
    return false;
  }
};

// Push local registrations into Supabase
export const bulkInsertRegistrationsToSupabase = async (
  items: RegistrationData[]
): Promise<{ count: number; error: string | null }> => {
  const client = getSupabaseClient();
  if (!client) return { count: 0, error: 'Supabase non configuré' };

  try {
    const rows = items.map((r) => ({
      full_name: r.fullName,
      email: r.email,
      phone: r.phone,
      birth_date: r.birthDate,
      gender: r.gender,
      running_level: r.runningLevel,
      health_status: r.healthStatus,
      health_restrictions: r.healthRestrictions || null,
      medical_consent: r.medicalConsent,
      terms_accepted: r.termsAccepted,
    }));

    const { data, error } = await client
      .from('registrations')
      .insert(rows)
      .select();

    if (error) {
      // Fallback: try plain insert if select policy is missing
      const { error: plainErr } = await client.from('registrations').insert(rows);
      if (!plainErr) {
        return { count: items.length, error: null };
      }
      return { count: 0, error: plainErr.message };
    }

    return { count: data ? data.length : items.length, error: null };
  } catch (e: any) {
    return { count: 0, error: e?.message || 'Erreur' };
  }
};
