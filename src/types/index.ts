export type HealthAnswer = 'oui' | 'non' | 'ne_sais_pas';

export type RunningLevel = 'debutant' | 'intermediaire' | 'avance' | 'elite';

export type Gender = 'femme' | 'homme' | 'autre';

export type ShirtSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface RegistrationData {
  id: string;
  bibNumber: string;
  registeredAt: string;
  // 6 Original Fields
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: Gender;
  runningLevel: RunningLevel;
  shirtSize?: ShirtSize;
  // Health Question (Sensitive Data)
  healthStatus: HealthAnswer;
  healthRestrictions?: string;
  // Consent
  medicalConsent: boolean;
  termsAccepted: boolean;
}

export type RegistrationFormErrors = Partial<Record<keyof RegistrationData, string>>;
