import React from 'react';

function StatsCards({ androidReleases, windowsReleases, closedIssues, openIssues }) {
  const latestAndroid = androidReleases[0]?.tag_name || '-';
  const latestWindows = windowsReleases[0]?.tag_name || '-';

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-value">{latestAndroid}</span>
              <span className="stat-label">Android</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <path d="M8 21h8M12 17v4"/>
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-value">{latestWindows}</span>
              <span className="stat-label">Windows</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon success">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-value">{closedIssues.length}</span>
              <span className="stat-label">Fixed Issues</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon warning">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-value">{openIssues.length}</span>
              <span className="stat-label">Open Issues</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsCards;
