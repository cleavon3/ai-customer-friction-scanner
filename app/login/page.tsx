"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Mail, Lock, Sparkles } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const supabase = createClient();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,

      password,
    });

    if (error) {
      setError(error.message);

      setLoading(false);

      return;
    }

    router.push("/dashboard");

    router.refresh();
  }

  return (
    <main className="login-page">
      <section className="login-container">
        {/* BRAND SIDE */}

        <div className="login-brand">
          <div className="brand-icon">
            <Sparkles size={45} />
          </div>

          <span className="brand-name">SKILL DIGITAL SOLUTIONS</span>

          <h1>
            AI CUSTOMER
            <br />
            FRICTION SCANNER
          </h1>

          <div className="brand-line" />

          <h2>AI Customer Intelligence Centre</h2>

          <p>
            Monitor customer friction, audits, leads and growth opportunities.
          </p>
        </div>

        {/* LOGIN SIDE */}

        <div className="login-form-section">
          <h2>Welcome Back</h2>

          <p>Sign in to access your dashboard</p>

          <form onSubmit={handleLogin}>
            <label>Admin email</label>

            <div className="input-box">
              <Mail size={18} />

              <input
                type="email"
                placeholder="Enter your admin email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <label>Password</label>

            <div className="input-box">
              <Lock size={18} />

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            {error && <p className="login-error">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Access Dashboard"}
            </button>
          </form>
        </div>
      </section>

      <footer>© 2026 Skill Digital Solutions. All rights reserved.</footer>
    </main>
  );
}
