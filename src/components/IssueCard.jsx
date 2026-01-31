import React from 'react';
import { formatDate } from '../services/github';

function IssueCard({ issue }) {
  const isClosed = issue.state === 'closed';
  const labels = issue.labels || [];

  return (
    <div className="issue-card">
      <div className={`issue-status ${isClosed ? 'closed' : 'open'}`}>
        {isClosed ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        )}
      </div>

      <div className="issue-content">
        <div className="issue-title">
          <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
            {issue.title}
          </a>
          <span className="issue-number">#{issue.number}</span>
          <span className={`platform-badge ${issue.platform}`}>
            {issue.platform === 'android' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <path d="M8 21h8M12 17v4"/>
              </svg>
            )}
            {issue.platform}
          </span>
        </div>

        {labels.length > 0 && (
          <div className="issue-labels">
            {labels.map(label => (
              <span
                key={label.id}
                className="issue-label"
                style={{
                  background: `#${label.color}20`,
                  color: `#${label.color}`,
                  border: `1px solid #${label.color}40`,
                }}
              >
                {label.name}
              </span>
            ))}
          </div>
        )}

        <div className="issue-meta">
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            {isClosed
              ? `Fixed ${formatDate(issue.closed_at)}`
              : `Opened ${formatDate(issue.created_at)}`
            }
          </span>
          {issue.user && (
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              {issue.user.login}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default IssueCard;
