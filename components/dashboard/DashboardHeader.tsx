import { Search, Bell, Sparkles } from "lucide-react";

import LogoutButton from "./LogoutButton";

export default function DashboardHeader({ userEmail }: { userEmail?: string }) {
  return (
    <header className="dashboard-header">
      <div className="dashboard-title">
        <span className="dashboard-eyebrow">SKILL DIGITAL SOLUTIONS</span>

        <h1>AI Customer Intelligence Centre</h1>

        <p className="dashboard-description">
          Monitor customer friction, audits, leads and growth opportunities.
        </p>
      </div>

      <div className="dashboard-actions">
        <div className="search-box">
          <Search size={17} />

          <input placeholder="Search stores, leads..." />
        </div>

        <button className="icon-button">
          <Bell size={18} />
        </button>

        <div className="admin-profile">
          <div className="admin-avatar">
            <Sparkles size={18} />
          </div>

          <div>
            <strong>Skill Digital Solutions</strong>

            <span>{userEmail || "Admin"}</span>
          </div>

          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
