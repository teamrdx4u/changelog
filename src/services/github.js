// GitHub API service with Infisical integration
import { getGitHubToken } from './infisical';

const CONFIG = {
  owner: 'holmesisback',
  androidRepo: 'Dab-Android-Beta-V2',
  windowsRepo: 'Dab-Windows',
  apiBase: 'https://api.github.com',
};

let githubToken = null;

// Initialize GitHub token from Infisical
export async function initializeGitHubToken() {
  if (!githubToken) {
    githubToken = await getGitHubToken();
  }
  return githubToken;
}

// Fetch from GitHub API
async function fetchGitHub(endpoint) {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
  };

  // Add auth token if available (increases rate limit from 60 to 5000 requests/hour)
  if (githubToken) {
    headers['Authorization'] = `Bearer ${githubToken}`;
  }

  try {
    const response = await fetch(`${CONFIG.apiBase}${endpoint}`, { headers });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('GitHub API fetch error:', error);
    throw error;
  }
}

// Fetch releases for a repository
export async function fetchReleases(platform) {
  const repo = platform === 'android' ? CONFIG.androidRepo : CONFIG.windowsRepo;
  return fetchGitHub(`/repos/${CONFIG.owner}/${repo}/releases?per_page=20`);
}

// Fetch closed issues (fixed bugs)
export async function fetchClosedIssues(platform) {
  const repo = platform === 'android' ? CONFIG.androidRepo : CONFIG.windowsRepo;
  const issues = await fetchGitHub(`/repos/${CONFIG.owner}/${repo}/issues?state=closed&per_page=50`);
  return issues.map(issue => ({ ...issue, platform }));
}

// Fetch open issues
export async function fetchOpenIssues(platform) {
  const repo = platform === 'android' ? CONFIG.androidRepo : CONFIG.windowsRepo;
  const issues = await fetchGitHub(`/repos/${CONFIG.owner}/${repo}/issues?state=open&per_page=50`);
  return issues.map(issue => ({ ...issue, platform }));
}

// Fetch all data
export async function fetchAllData() {
  await initializeGitHubToken();

  const [
    androidReleases,
    windowsReleases,
    androidClosedIssues,
    windowsClosedIssues,
    androidOpenIssues,
    windowsOpenIssues,
  ] = await Promise.allSettled([
    fetchReleases('android'),
    fetchReleases('windows'),
    fetchClosedIssues('android'),
    fetchClosedIssues('windows'),
    fetchOpenIssues('android'),
    fetchOpenIssues('windows'),
  ]);

  return {
    android: androidReleases.status === 'fulfilled' ? androidReleases.value : [],
    windows: windowsReleases.status === 'fulfilled' ? windowsReleases.value : [],
    closedIssues: [
      ...(androidClosedIssues.status === 'fulfilled' ? androidClosedIssues.value : []),
      ...(windowsClosedIssues.status === 'fulfilled' ? windowsClosedIssues.value : []),
    ].sort((a, b) => new Date(b.closed_at) - new Date(a.closed_at)),
    openIssues: [
      ...(androidOpenIssues.status === 'fulfilled' ? androidOpenIssues.value : []),
      ...(windowsOpenIssues.status === 'fulfilled' ? windowsOpenIssues.value : []),
    ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
  };
}

// Parse release body into changes
export function parseReleaseBody(body) {
  if (!body) return [];

  const changes = [];
  const lines = body.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    let text = trimmed.replace(/^[-*•]\s*/, '').replace(/^\d+\.\s*/, '');
    if (!text) continue;

    let type = 'improvement';
    const lowerText = text.toLowerCase();

    if (lowerText.includes('fix') || lowerText.includes('bug') || lowerText.includes('issue') || lowerText.includes('crash')) {
      type = 'fix';
    } else if (lowerText.includes('add') || lowerText.includes('new') || lowerText.includes('feature') || lowerText.includes('implement')) {
      type = 'feature';
    } else if (lowerText.includes('break') || lowerText.includes('remove') || lowerText.includes('deprecat')) {
      type = 'breaking';
    }

    changes.push({ text, type });
  }

  return changes;
}

// Format date
export function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

export default {
  fetchAllData,
  fetchReleases,
  fetchClosedIssues,
  fetchOpenIssues,
  parseReleaseBody,
  formatDate,
  initializeGitHubToken,
};
