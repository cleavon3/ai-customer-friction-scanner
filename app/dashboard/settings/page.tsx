import "../dashboard.css";

export default function SettingsPage() {
  return (
    <main className="dashboard">
      <section className="dashboard-card">
        <div className="card-header">
          <div>
            <h1>Settings</h1>

            <p>Manage dashboard preferences and account configuration.</p>
          </div>
        </div>
      </section>

      <section className="dashboard-card">
        <h2>Account</h2>

        <p>Skill Digital Solutions Admin Dashboard</p>
      </section>

      <section className="dashboard-card">
        <h2>System</h2>

        <p>AI audit engine, reporting and CRM settings.</p>
      </section>
    </main>
  );
}
