import {
  TrendingUp,
  FileSearch,
  CalendarCheck,
  DollarSign,
} from "lucide-react";


const icons = {
  leads: TrendingUp,
  audits: FileSearch,
  calls: CalendarCheck,
  revenue: DollarSign,
};


type StatCardProps = {
  title: string;
  value: string | number;
  description?: string;
  type?: keyof typeof icons;
};


export default function StatCard({
  title,
  value,
  description,
  type = "leads",
}: StatCardProps) {

  const Icon = icons[type];


  return (
    <div className="stat-card">

      <div className="stat-header">

        <div className="stat-icon">
          <Icon size={20} />
        </div>


        <span className="stat-label">
          {title}
        </span>

      </div>


      <h2 className="stat-value">
        {value}
      </h2>


      {description && (
        <p className="stat-description">
          {description}
        </p>
      )}

    </div>
  );
}