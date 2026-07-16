export const N8N_BASE_URL = 'https://meticulous-oyster.pikapod.net/webhook';

export const API_URLS = {
  getProfile: (phone: string) => `${N8N_BASE_URL}/profile?phone=${encodeURIComponent(phone)}`,
  saveProfile: `${N8N_BASE_URL}/profile`,
  deleteProfile: (phone: string) => `${N8N_BASE_URL}/profile?phone=${encodeURIComponent(phone)}`,
  generateReading: `${N8N_BASE_URL}/generate-reading`,
  balanceAnalysis: `${N8N_BASE_URL}/balance-analysis`,
  compatibility: `${N8N_BASE_URL}/compatibility`,
  views: `${N8N_BASE_URL}/views`,
};
