export const N8N_BASE_URL = 'https://meticulous-oyster.pikapod.net/webhook';

export const API_URLS = {
  getProfile: (phone: string) => `${N8N_BASE_URL}/profile?phone=${encodeURIComponent(phone)}`,
  saveProfile: `${N8N_BASE_URL}/profile`,
  deleteProfile: (phone: string) => `${N8N_BASE_URL}/profile?phone=${encodeURIComponent(phone)}`,
  generateReading: `${N8N_BASE_URL}/generate-reading`,
  balanceAnalysis: `${N8N_BASE_URL}/balance-analysis`,
  chat: `${N8N_BASE_URL}/idc-website-chat`,
  compatibility: `${N8N_BASE_URL}/compatibility`,
  views: '', // Disabled (backend doesn't exist)
};

// Maps frontend CalculationType values to the keys configured in your n8n workflow
export const mapCalculationTypeToN8n = (type: string): string => {
  const mapping: Record<string, string> = {
    horoscope: "western",
    enneagram: "enneagram",
    psychomatrix: "matrix",
    numerology: "numerology",
    human_design: "human_design",
    vedic: "vedic",
    bazi: "chinese", // Maps "bazi" in code to "chinese" in your n8n
    archetype: "archetype"
  };
  return mapping[type] || type;
};
