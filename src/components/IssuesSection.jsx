import React, { useState, useMemo } from 'react';
import IssueCard from './IssueCard';

function IssuesSection({ closedIssues, openIssues, loading }) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');

  const allIssues = useMemo(() => {
    return [...closedIssues, ...openIssues];
  }, [closedIssues, openIssues]);

  const filteredIssues = useMemo(() => {
    return allIssues.filter(issue => {
      // Status filter
      if (statusFilter === 'closed' && issue.state !== 'closed') return false;
      if (statusFilter === 'open' && issue.state !== 'open') return false;

      // Platform filter
      if (platformFilter === 'android' && issue.platform !== 'android') return false;
      if (platformFilter === 'windows' && issue.platform !== 'windows') return false;

      return true;
    });
  }, [allIssues, statusFilter, platformFilter]);

  return (
    <section id="issues" className="issues-section">
      <div className="container">
        <div className="section-header">
          <div className="section-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4M12 16h.01"/>
            </svg>
          </div>
          <div>
            <h2>Issues & Bug Fixes</h2>
            <p>Track reported issues and their resolution status</p>
          </div>
        </div>

        <div className="issues-stats">
          <div className="issue-stat">
            <span className="issue-stat-number">{closedIssues.length}</span>
            <span className="issue-stat-label">Fixed</span>
          </div>
          <div className="issue-stat">
            <span className="issue-stat-number">{openIssues.length}</span>
            <span className="issue-stat-label">Open</span>
          </div>
        </div>

        <div className="issues-filters">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="closed">Fixed</option>
            <option value="open">Open</option>
          </select>

          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Platforms</option>
            <option value="android">Android</option>
            <option value="windows">Windows</option>
          </select>
        </div>

        <div className="issues-list">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading issues...</p>
            </div>
          ) : filteredIssues.length === 0 ? (
            <div className="empty-state">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>
              <h3>No issues found</h3>
              <p>Try adjusting your filters.</p>
            </div>
          ) : (
            filteredIssues.map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default IssuesSection;
