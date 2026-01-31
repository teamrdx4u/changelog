import React, { useState } from 'react';
import { parseReleaseBody, formatDate } from '../services/github';

function ReleaseCard({ release, isFirst }) {
  const [expanded, setExpanded] = useState(isFirst);
  const changes = parseReleaseBody(release.body);
  const isLatest = isFirst && !release.prerelease;

  const getChangeIcon = (type) => {
    switch (type) {
      case 'fix': return '🔧';
      case 'feature': return '✨';
      case 'breaking': return '⚠️';
      default: return '📦';
    }
  };

  return (
    <div className={`release-card ${expanded ? 'expanded' : ''}`}>
      <div className="release-header" onClick={() => setExpanded(!expanded)}>
        <div className="release-info">
          <span className="release-version">{release.tag_name}</span>
          {isLatest && <span className="release-tag latest">Latest</span>}
          {release.prerelease && <span className="release-tag pre-release">Pre-release</span>}
          <span className="release-date">{formatDate(release.published_at)}</span>
        </div>
        <div className="release-toggle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>

      <div className="release-body">
        <div className="release-content">
          {release.name && release.name !== release.tag_name && (
            <p className="release-description">{release.name}</p>
          )}

          {changes.length > 0 ? (
            <div className="release-changes">
              {changes.map((change, index) => (
                <div key={index} className="change-item">
                  <div className={`change-icon ${change.type}`}>
                    {getChangeIcon(change.type)}
                  </div>
                  <span className="change-text">{change.text}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="release-description">
              {release.body || 'No release notes available.'}
            </p>
          )}

          <div className="release-footer">
            <a
              href={release.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="release-link"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <path d="M15 3h6v6M10 14L21 3"/>
              </svg>
              View on GitHub
            </a>
            {release.assets && release.assets.length > 0 && (
              <a
                href={release.assets[0].browser_download_url}
                className="release-download"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                Download
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReleaseCard;
