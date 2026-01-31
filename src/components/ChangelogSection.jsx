import React, { useState } from 'react';
import ReleaseCard from './ReleaseCard';

function ChangelogSection({ androidReleases, windowsReleases, loading }) {
  const [activeTab, setActiveTab] = useState('android');

  const releases = activeTab === 'android' ? androidReleases : windowsReleases;

  return (
    <section id="changelog" className="changelog-section">
      <div className="container">
        <div className="section-header">
          <div className="section-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
            </svg>
          </div>
          <div>
            <h2>Changelog</h2>
            <p>Browse release history for each platform</p>
          </div>
        </div>

        <div className="platform-tabs">
          <button
            className={`tab-btn ${activeTab === 'android' ? 'active' : ''}`}
            onClick={() => setActiveTab('android')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
            Android
          </button>
          <button
            className={`tab-btn ${activeTab === 'windows' ? 'active' : ''}`}
            onClick={() => setActiveTab('windows')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <path d="M8 21h8M12 17v4"/>
            </svg>
            Windows
          </button>
        </div>

        <div className="releases-container">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading releases...</p>
            </div>
          ) : releases.length === 0 ? (
            <div className="empty-state">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <h3>No releases found</h3>
              <p>Check back later for updates.</p>
            </div>
          ) : (
            <div className="releases-list">
              {releases.map((release, index) => (
                <ReleaseCard
                  key={release.id}
                  release={release}
                  isFirst={index === 0}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ChangelogSection;
