"use client";

import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
  LineChart, Line,
} from "recharts";
import { useRouter } from "next/navigation";
import "./DashboardHome.css";

const COLORS = ["#E31C1C", "#f59e0b", "#0284c7", "#16a34a", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"];

const DashboardHome = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/leads`,
          { headers: { Authorization: token } }
        );
        if (res.status === 401) {
          localStorage.removeItem("token");
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        setLeads(data.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  if (loading) {
    return (
      <div className="dash-loading">
        <div className="dash-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // STAT COUNTS
  const total = leads.length;
  const pending = leads.filter((l) => (l.status || "pending") === "pending").length;
  const contacted = leads.filter((l) => l.status === "contacted").length;
  const converted = leads.filter((l) => l.status === "converted").length;

  // PIE — status breakdown
  const pieData = [
    { name: "Pending",   value: pending   },
    { name: "Contacted", value: contacted },
    { name: "Converted", value: converted },
  ];

  // BAR — course wise leads
  const courseMap = {};
  leads.forEach((l) => {
    const c = l.course || "Unknown";
    courseMap[c] = (courseMap[c] || 0) + 1;
  });
  const barData = Object.entries(courseMap)
    .map(([name, count]) => ({ name: name.length > 14 ? name.slice(0, 14) + "…" : name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // LINE — last 7 days
  const last7 = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
    const dateStr = d.toISOString().split("T")[0];
    const count = leads.filter((l) => {
      const ld = new Date(l.createdAt).toISOString().split("T")[0];
      return ld === dateStr;
    }).length;
    last7.push({ date: label, leads: count });
  }

  const statCards = [
    { label: "Total Leads",  value: total,     color: "#E31C1C" },
    { label: "Pending",      value: pending,   color: "#f59e0b" },
    { label: "Contacted",    value: contacted, color: "#0284c7" },
    { label: "Converted",    value: converted, color: "#16a34a" },
  ];

  return (
    <div className="dash-home">

      {/* STAT CARDS */}
      <div className="dash-stats">
        {statCards.map((s) => (
          <div className="dash-stat-card" key={s.label}>
            <span className="dash-stat-num" style={{ color: s.color }}>{s.value}</span>
            <span className="dash-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* CHARTS ROW */}
      <div className="dash-charts-row">

        {/* LINE CHART */}
        <div className="dash-chart-box">
          <h3>📈 Leads — Last 7 Days</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={last7}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="leads" stroke="#E31C1C" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="dash-chart-box">
          <h3>🥧 Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={false}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={["#f59e0b", "#0284c7", "#16a34a"][i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* BAR CHART */}
      <div className="dash-chart-box dash-chart-full">
        <h3>📊 Leads by Course</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={barData} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-30} textAnchor="end" interval={0} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {barData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default DashboardHome;