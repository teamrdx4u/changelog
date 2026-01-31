

A React-based changelog website that fetches release data and issues from GitHub, with secure API key storage via Infisical.

## Features

- ✅ Pure black AMOLED theme
- ✅ Fetches releases from both Android and Windows repos
- ✅ Displays open and closed issues with filtering
- ✅ Platform badges for each issue
- ✅ Secure GitHub token storage via Infisical
- ✅ Responsive design

## Setup

### 1. Install Dependencies

```bash
cd website-react
npm install
```

### 2. Configure Infisical

1. Create a project in [Infisical](https://app.infisical.com)
2. Add a secret named `GITHUB_TOKEN` with your GitHub Personal Access Token
3. Create a Universal Auth identity in your Infisical project
4. Copy the Client ID and Client Secret

### 3. Environment Variables

Copy `.env.example` to `.env` and fill in your Infisical credentials:

```env
VITE_INFISICAL_CLIENT_ID=your_client_id_here
VITE_INFISICAL_CLIENT_SECRET=your_client_secret_here
VITE_INFISICAL_PROJECT_ID=your_project_id_here
VITE_INFISICAL_ENVIRONMENT=dev
VITE_INFISICAL_SECRET_PATH=/
```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
```

## GitHub Token Permissions

Your GitHub Personal Access Token needs the following permissions:
- `repo` (or `public_repo` for public repos only)
- Read access to issues and releases

## How It Works

1. On app load, the app authenticates with Infisical using Universal Auth
2. It fetches the `GITHUB_TOKEN` secret from your Infisical project
3. The token is used to authenticate GitHub API requests (higher rate limits)
4. Releases and issues are fetched from both Android and Windows repos
5. Data is displayed with filtering options

## Security Notes

⚠️ **Important**: This is a client-side implementation. For production:
- Consider using a backend proxy to hide your Infisical credentials
- Or use Infisical's native machine identity for server-side fetching
- The GitHub token should have minimal required permissions

## Project Structure

```
website-react/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── StatsCards.jsx
│   │   ├── ChangelogSection.jsx
│   │   ├── ReleaseCard.jsx
│   │   ├── IssuesSection.jsx
│   │   ├── IssueCard.jsx
│   │   └── Footer.jsx
│   ├── services/
│   │   ├── infisical.js    # Infisical API integration
│   │   └── github.js       # GitHub API integration
│   ├── styles/
│   │   └── index.css       # Pure black AMOLED theme
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── index.html
├── package.json
└── vite.config.js
```

