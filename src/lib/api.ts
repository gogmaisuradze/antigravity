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

export async function saveProfile(profile: Omit<BirthProfile, 'createdAt'>): Promise<{ success: boolean; profile?: BirthProfile; error?: string }> {
  const yyyy = Number(profile.year);
  const mmNum = Number(profile.month);
  const ddNum = Number(profile.day);
  const mm = String(mmNum).padStart(2, '0');
  const dd = String(ddNum).padStart(2, '0');
  const effectiveTime = profile.birthTime?.trim() || "";

  const payload: any = {
    ...profile,
    name: profile.name,
    surname: profile.surname,
    phone: profile.phone,
    birthPlace: profile.birthPlace,
    day: ddNum,
    month: mmNum,
    year: yyyy,
    birthDay: ddNum,
    birth_day: ddNum,
    birthMonth: mmNum,
    birth_month: mmNum,
    birthYear: yyyy,
    birth_year: yyyy,
    birthDate: `${yyyy}-${mm}-${dd}`,
    birthdate: `${yyyy}-${mm}-${dd}`,
    birth_date: `${dd}.${mm}.${yyyy}`,
    date: `${dd}.${mm}.${yyyy}`,
    birthTime: effectiveTime || undefined,
  };

  if (effectiveTime) {
    payload.time = effectiveTime;
    payload.hour = effectiveTime;
    payload.birth_time = effectiveTime;
  }

  const r = await fetch(API_URLS.saveProfile, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
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
export async function generateReading(
  phone: string,
  type: CalculationType,
  birthTime?: string,
  profile?: Partial<BirthProfile>
): Promise<ReadingResponse> {
  const mappedType = mapCalculationTypeToN8n(type);
  const effectiveTime = (birthTime || profile?.birthTime || "").trim();

  const payload: any = {
    phone,
    type: mappedType,
    birthTime: effectiveTime || undefined,
  };

  if (profile) {
    const yyyy = Number(profile.year);
    const mmNum = Number(profile.month);
    const ddNum = Number(profile.day);
    const mm = String(mmNum).padStart(2, '0');
    const dd = String(ddNum).padStart(2, '0');

    if (profile.name) payload.name = profile.name;
    if (profile.surname) payload.surname = profile.surname;
    if (profile.birthPlace) payload.birthPlace = profile.birthPlace;

    if (yyyy && mmNum && ddNum) {
      payload.day = ddNum;
      payload.month = mmNum;
      payload.year = yyyy;
      payload.birthDay = ddNum;
      payload.birth_day = ddNum;
      payload.birthMonth = mmNum;
      payload.birth_month = mmNum;
      payload.birthYear = yyyy;
      payload.birth_year = yyyy;
      payload.birthDate = `${yyyy}-${mm}-${dd}`;
      payload.birthdate = `${yyyy}-${mm}-${dd}`;
      payload.birth_date = `${dd}.${mm}.${yyyy}`;
      payload.date = `${dd}.${mm}.${yyyy}`;
    }
  }

  if (effectiveTime) {
    payload.time = effectiveTime;
    payload.hour = effectiveTime;
    payload.birth_time = effectiveTime;
  }

  const userName = profile?.name || "მეგობარო";
  payload.instruction = `პასუხი ააგე მკაფიო თავებად (## სათაური) და აბზაცებად ბალანსის მოდელის სტრუქტურის მსგავსად:
1. დაიწყე თბილი მისალმებით: "ძვირფასო ${userName},"
2. თითოეული ქვეთავი გამოყავი მკაფიო სათაურით: "## [ნომერი]. [სათაური]"
3. ტექსტი გაწერე სუფთა აბზაცებად (პარაგრაფებად)
4. გამოიყენე მარკირებული სიები (- ...)
5. ბოლო თავი დაუთმე შემაჯამებელ პრაქტიკულ რეკომენდაციებსა და რჩევებს.`;
  payload.systemInstruction = `შენ ხარ პროფესიონალი ექსპერტი და ფსიქოლოგი. პასუხი გაეცი ქართულ ენაზე, მარკდაუნის (Markdown) ლამაზი ფორმატირებით, თავებად (## სათაურებით), აბზაცებით და სიებით ბალანსის მოდელის სტილში.`;

  const r = await fetch(API_URLS.generateReading, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
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
