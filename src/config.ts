export const N8N_BASE_URL = 'https://meticulous-oyster.pikapod.net/webhook';

export const API_URLS = {
  getProfile: (phone: string) => `${N8N_BASE_URL}/7a18bed2-7ae5-4613-820c-463af58b1255/profile?phone=${encodeURIComponent(phone)}`,
  saveProfile: `${N8N_BASE_URL}/d2ad4111-1aee-4325-a599-b92b71247496/profile`,
  deleteProfile: (phone: string) => `${N8N_BASE_URL}/14f7545d-bcc5-4a4d-a30c-4ab2a0c01574/profile?phone=${encodeURIComponent(phone)}`,
  generateReading: `${N8N_BASE_URL}/4f41baaa-a4ac-4563-a966-670bd8e45acc/generate-reading`,
  balanceAnalysis: `${N8N_BASE_URL}/c157fb6d-f99f-4a0e-b6ef-ae933db8d0c2/balance-analysis`,
  chat: `${N8N_BASE_URL}/03bc78b8-7f6f-4cdb-90be-12ae3c86f8d8/idc-website-chat`,
  compatibility: '', // Temporarily disabled (missing n8n workflow)
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
