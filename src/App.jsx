import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsCards from './components/StatsCards';
import ChangelogSection from './components/ChangelogSection';
import IssuesSection from './components/IssuesSection';
import Footer from './components/Footer';
import { fetchAllData } from './services/github';

function App() {
  const [data, setData] = useState({
    android: [],
    windows: [],
    closedIssues: [],
    openIssues: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchAllData();
      setData(result);
    } catch (err) {
      console.error('Failed to load data:', err);
      setError('Failed to load data from GitHub. Using cached data if available.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <StatsCards
          androidReleases={data.android}
          windowsReleases={data.windows}
          closedIssues={data.closedIssues}
          openIssues={data.openIssues}
        />
        <ChangelogSection
          androidReleases={data.android}
          windowsReleases={data.windows}
          loading={loading}
        />
        <IssuesSection
          closedIssues={data.closedIssues}
          openIssues={data.openIssues}
          loading={loading}
        />
      </main>
      <Footer />
      {error && (
        <div className="error-toast">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}
    </div>
  );
}

export default App;
