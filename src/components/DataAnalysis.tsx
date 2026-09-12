import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area
} from "recharts";
import { FINANCIAL_RECORDS, CDF_PROJECTS } from "../data/datasets";
import { TrendingUp, PieChart as PieIcon, BarChart3, Coins, Building2, Users } from "lucide-react";

const COLORS = ["#047857", "#2563eb", "#d97706", "#7c3aed", "#e11d48", "#0891b2"];

export const DataAnalysis: React.FC = () => {
  // Aggregate revenue and budget allocations from FINANCIAL_RECORDS
  const revenueData = FINANCIAL_RECORDS.map((item) => ({
    name: item.description.length > 28 ? item.description.slice(0, 26) + "…" : item.description,
    category: item.category,
    amount: item.amount_zmw / 1_000_000,
    amountZmw: item.amount_zmw,
    year: item.fiscal_year || 2025,
  })).sort((a, b) => b.amount - a.amount);

  // Category totals for Pie chart
  const categoryTotals = FINANCIAL_RECORDS.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount_zmw;
    return acc;
  }, {});

  const pieChartData = Object.entries(categoryTotals).map(([name, val]) => ({
    name,
    value: val / 1_000_000,
    rawVal: val,
  }));

  // CDF sector distribution
  const cdfSectors = CDF_PROJECTS.reduce<Record<string, number>>((acc, p) => {
    acc[p.project_type] = (acc[p.project_type] || 0) + p.amount_zmw;
    return acc;
  }, {});

  const cdfSectorData = Object.entries(cdfSectors).map(([name, val]) => ({
    name: name.replace(" Infrastructure", " Infra").replace(" & Skills Development", " & Skills"),
    amount: val / 1_000_000,
  })).sort((a, b) => b.amount - a.amount);

  // Yearly financial commitments
  const yearlyCommitments = [
    { year: "2022", amount: 1.3, label: "Hospital Med Equipment" },
    { year: "2023", amount: 2.88, label: "Lusitu, Sikoongo, Kariba" },
    { year: "2024", amount: 65.1, label: "Approved Budget + CDF Bursary/Crawler" },
    { year: "2025", amount: 78.7, label: "Budget + LGEF + Lake Rig/Tourism Levies" },
    { year: "2026", amount: 40.0, label: "CDF Statutory Ceiling (Act 76)" },
  ];

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-stone-900">
              Municipal Financial Analysis & Revenue Visualization
            </h3>
          </div>
          <p className="text-xs text-stone-600 mt-1">
            Interactive Recharts visualizations covering statutory grants (Act 28 &amp; 76), local levies, and sectoral CDF allocations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs font-mono bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-md text-stone-700">
            Total Analyzed: <strong className="text-emerald-700">ZMW 251.10M</strong>
          </div>
        </div>
      </div>

      {/* Municipal Metric Summary Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-stone-50 p-3 rounded-lg border border-stone-200/80">
          <div className="flex items-center gap-1.5 text-stone-600 text-xs">
            <Building2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>2025 Approved Budget</span>
          </div>
          <div className="text-base font-bold text-stone-900 font-mono mt-1">ZMW 51.30M</div>
          <div className="text-[10px] text-stone-500">Council approved civic budget</div>
        </div>

        <div className="bg-stone-50 p-3 rounded-lg border border-stone-200/80">
          <div className="flex items-center gap-1.5 text-stone-600 text-xs">
            <Coins className="w-3.5 h-3.5 text-blue-600" />
            <span>LGEF Recurrent Grant</span>
          </div>
          <div className="text-base font-bold text-stone-900 font-mono mt-1">ZMW 16.80M</div>
          <div className="text-[10px] text-stone-500">Act No. 28 of 2023</div>
        </div>

        <div className="bg-stone-50 p-3 rounded-lg border border-stone-200/80">
          <div className="flex items-center gap-1.5 text-stone-600 text-xs">
            <Coins className="w-3.5 h-3.5 text-amber-600" />
            <span>Local Levies &amp; Rates</span>
          </div>
          <div className="text-base font-bold text-stone-900 font-mono mt-1">ZMW 10.60M</div>
          <div className="text-[10px] text-stone-500">Rig, Tourism, Property &amp; Fees</div>
        </div>

        <div className="bg-stone-50 p-3 rounded-lg border border-stone-200/80">
          <div className="flex items-center gap-1.5 text-stone-600 text-xs">
            <Users className="w-3.5 h-3.5 text-purple-600" />
            <span>2026 CDF Threshold</span>
          </div>
          <div className="text-base font-bold text-stone-900 font-mono mt-1">ZMW 40.00M</div>
          <div className="text-[10px] text-stone-500">Act No. 76 of 2026</div>
        </div>
      </div>

      {/* Row 1 Charts: Revenue Composition and CDF Sectors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Revenue Streams Distribution */}
        <div className="border border-stone-200 rounded-lg p-4 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <PieIcon className="w-4 h-4 text-emerald-700" />
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Financial Portfolio by Classification (ZMW Millions)
              </h4>
            </div>
            <span className="text-[11px] text-stone-500">Share of Total</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: unknown) => [
                    `ZMW ${Number(value).toFixed(2)}M`,
                    "Amount"
                  ]}
                  contentStyle={{
                    backgroundColor: "#1c1917",
                    borderRadius: "8px",
                    border: "none",
                    color: "#f5f5f4",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => <span className="text-xs text-stone-700">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: CDF Allocation by Sector */}
        <div className="border border-stone-200 rounded-lg p-4 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                CDF Investments by Priority Sector (ZMW Millions)
              </h4>
            </div>
            <span className="text-[11px] text-stone-500">14 Verified Projects</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cdfSectorData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" tickFormatter={(v) => `K${v}M`} stroke="#78716c" fontSize={11} />
                <YAxis dataKey="name" type="category" width={110} stroke="#78716c" fontSize={10} />
                <Tooltip
                  formatter={(value: unknown) => [`ZMW ${Number(value).toFixed(2)}M`, "Total Budget"]}
                  contentStyle={{
                    backgroundColor: "#1c1917",
                    borderRadius: "8px",
                    border: "none",
                    color: "#f5f5f4",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="amount" fill="#047857" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2 Chart: Financial Growth Progression Over Time */}
      <div className="border border-stone-200 rounded-lg p-4 bg-white space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Yearly Capital &amp; Budget Expansion Curve (2022–2026)
            </h4>
          </div>
          <span className="text-xs font-mono font-semibold text-emerald-800">
            Decentralization Surge
          </span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={yearlyCommitments} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="growthColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#047857" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#047857" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="year" stroke="#78716c" fontSize={11} />
              <YAxis tickFormatter={(v) => `K${v}M`} stroke="#78716c" fontSize={11} />
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <Tooltip
                formatter={(value: unknown) => [`ZMW ${Number(value).toFixed(2)}M`, "Annual Commitments"]}
                contentStyle={{
                  backgroundColor: "#1c1917",
                  borderRadius: "8px",
                  border: "none",
                  color: "#f5f5f4",
                  fontSize: "12px",
                }}
              />
              <Area type="monotone" dataKey="amount" stroke="#047857" strokeWidth={2} fillOpacity={1} fill="url(#growthColor)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
