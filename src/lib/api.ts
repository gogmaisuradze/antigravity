// ═══════════════════════════════════════════════════════════
// n8n Backend API Client — idc.edu.ge
// ═══════════════════════════════════════════════════════════
import { CalculationType, BirthProfile, ReadingResponse } from '../types';
import { API_URLS, mapCalculationTypeToN8n } from '../config';

// ─── 1. Profile: get / save / delete ───────────────────────
export async function getProfile(phone: string): Promise<{ success: boolean; exists: boolean; name?: string; surname?: string; profile?: BirthProfile }> {
  const r = await fetch(API_URLS.getProfile(phone));
  if (!r.ok) throw new Error(`getProfile failed: ${r.status}`);
  return r.json();
}

export async function saveProfile(profile: Omit<BirthProfile, 'createdAt'>): Promise<{ success: boolean; profile: BirthProfile }> {
  const r = await fetch(API_URLS.saveProfile, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });
  if (!r.ok) throw new Error(`saveProfile failed: ${r.status}`);
  return r.json();
}

export async function deleteProfile(phone: string): Promise<{ success: boolean }> {
  const r = await fetch(API_URLS.deleteProfile(phone), {
    method: 'DELETE',
  });
  if (!r.ok) throw new Error(`deleteProfile failed: ${r.status}`);
  return r.json();
}

// ─── 2. Cosmic ID Reader (8 ანალიზი) ───────────────────────
export async function generateReading(phone: string, type: CalculationType): Promise<ReadingResponse> {
  const mappedType = mapCalculationTypeToN8n(type);
  const r = await fetch(API_URLS.generateReading, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, type: mappedType }),
  });
  if (!r.ok) throw new Error(`generateReading failed: ${r.status}`);
  return r.json();
}

// ─── 3. Balance Model (Peseschkian) ────────────────────────
export interface BalanceScores {
  bodyScore: number;
  achievementScore: number;
  contactScore: number;
  futureScore: number;
  phone: string;
}

export async function analyzeBalance(scores: BalanceScores): Promise<{ success: boolean; content: string }> {
  const r = await fetch(API_URLS.balanceAnalysis, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(scores),
  });
  if (!r.ok) throw new Error(`analyzeBalance failed: ${r.status}`);
  return r.json();
}
