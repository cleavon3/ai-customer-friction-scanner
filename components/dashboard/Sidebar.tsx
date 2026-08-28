import Link from "next/link";

import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Bot,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },

  {
    name: "Leads",
    icon: Users,
    href: "/dashboard/leads",
  },

  {
    name: "Audits",
    icon: FileText,
    href: "/dashboard/audits",
  },

  {
    name: "Pipeline",
    icon: BarChart3,
    href: "/dashboard/pipeline",
  },

  {
    name: "AI Usage",
    icon: Bot,
    href: "/dashboard/ai-usage",
  },

  {
    name: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-brand">
        <h2>Skill Digital</h2>

        <span>AI Intelligence</span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.href} className="sidebar-link">
              <Icon size={18} />

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
