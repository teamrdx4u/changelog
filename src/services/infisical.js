// Infisical service for fetching secrets using Service Token

const INFISICAL_CONFIG = {
  serviceToken: import.meta.env.VITE_INFISICAL_SERVICE_TOKEN,
  siteUrl: import.meta.env.VITE_INFISICAL_SITE_URL || 'https://app.infisical.com',
};

// Fetch secrets using Service Token
async function fetchSecrets() {
  if (!INFISICAL_CONFIG.serviceToken) {
    console.warn('No Infisical service token configured');
    return {};
  }

  try {
    const response = await fetch(
      `${INFISICAL_CONFIG.siteUrl}/api/v3/secrets/raw`,
      {
        headers: {
          'Authorization': `Bearer ${INFISICAL_CONFIG.serviceToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch secrets: ${response.status}`);
    }

    const data = await response.json();
    const secrets = {};
    
    for (const secret of data.secrets || []) {
      secrets[secret.secretKey] = secret.secretValue;
    }
    
    return secrets;
  } catch (error) {
    console.error('Error fetching secrets from Infisical:', error);
    return {};
  }
}

let cachedSecrets = null;

// Get a specific secret
export async function getSecret(secretName) {
  if (!cachedSecrets) {
    cachedSecrets = await fetchSecrets();
  }
  return cachedSecrets[secretName] || null;
}

// Fetch all secrets
export async function getAllSecrets() {
  if (!cachedSecrets) {
    cachedSecrets = await fetchSecrets();
  }
  return cachedSecrets;
}

// Get GitHub token from Infisical
export async function getGitHubToken() {
  // Try different possible secret names
  const possibleNames = ['GITHUB_TOKEN', 'GITHUB_PAT', 'GH_TOKEN', 'GITHUB_ACCESS_TOKEN'];
  
  for (const name of possibleNames) {
    const token = await getSecret(name);
    if (token) {
      return token;
    }
  }
  
  console.warn('No GitHub token found in Infisical');
  return null;
}

export default {
  getSecret,
  getAllSecrets,
  getGitHubToken,
};
