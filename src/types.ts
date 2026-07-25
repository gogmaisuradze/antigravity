export enum CalculationType {
  HOROSCOPE = "horoscope",
  ENNEAGRAM = "enneagram",
  PSYCHOMATRIX = "psychomatrix",
  NUMEROLOGY = "numerology",
  HUMAN_DESIGN = "human_design",
  VEDIC = "vedic",
  BAZI = "bazi",
  ARCHETYPE = "archetype"
}

export interface BirthProfile {
  phone: string;
  name: string;
  surname: string;
  birthPlace: string;
  day: number;
  month: number;
  year: number;
  createdAt: string;
}

export interface ReadingRequest {
  phone: string;
  type: CalculationType;
}

export interface ReadingResponse {
  success?: boolean;
  type: CalculationType;
  title: string;
  content: string;
}

export interface CompatibilityRequest {
  phoneA: string;
  phoneB: string;
}

export interface CompatibilityResponse {
  profileA: BirthProfile;
  profileB: BirthProfile;
  compatibilityScore: number; // 0 to 100
  dimensions: {
    astrological: number; // 0 to 100
    psychological: number; // 0 to 100
    vibrational: number; // 0 to 100
    karmic: number; // 0 to 100
  };
  narrative: string; // georgian text response from Gemini
}
