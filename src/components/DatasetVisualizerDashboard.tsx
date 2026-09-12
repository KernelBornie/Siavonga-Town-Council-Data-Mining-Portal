import React, { useState } from "react";
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
  Area,
} from "recharts";
import {
  CDF_PROJECTS,
  ZDSP_PROJECTS,
  FINANCIAL_RECORDS,
  ADMIN_DATA,
  NEWS_ARTICLES,
} from "../data/datasets";
import {
  BarChart3,
  PieChart as PieIcon,
  Layers,
  Coins,
  Building2,
  Calendar,
  Sparkles,
} from "lucide-react";

const PALETTE = [
  "#047857", // emerald-700
  "#2563eb", // blue-600
  "#d97706", // amber-600
  "#7c3aed", // violet-600
  "#e11d48", // rose-600
  "#0891b2", // cyan-600
  "#475569", // slate-600
  "#16a34a", // green-600
];

export const DatasetVisualizerDashboard: React.FC = () => {
  const [activeDataset, setActiveDataset] = useState<string>("cdf_projects");

  // 1. CDF Projects: Distribution by Category / Project Type (Count & Funding ZMW M)
  const cdfData = React.useMemo(() => {
    const map = new Map<string, { count: number; totalZmw: number }>();
    CDF_PROJECTS.forEach((p) => {
      const type = p.project_type;
      const cur = map.get(type) || { count: 0, totalZmw: 0 };
      map.set(type, {
        count: cur.count + 1,
        totalZmw: cur.totalZmw + p.amount_zmw,
      });
    });
    return Array.from(map.entries()).map(([name, { count, totalZmw }]) => ({
      name: name.replace(" Infrastructure", " Infra").replace(" & Skills Development", " & Skills"),
      fullName: name,
      count,
      amountM: Number((totalZmw / 1_000_000).toFixed(2)),
      rawZmw: totalZmw,
    })).sort((a, b) => b.amountM - a.amountM);
  }, []);

  // 2. ZDSP Projects: Distribution by Project Name / Status & Funding (ZMW M)
  const zdspData = React.useMemo(() => {
    return ZDSP_PROJECTS.map((p) => {
      const shortName = p.project_name.length > 25 ? p.project_name.slice(0, 23) + "…" : p.project_name;
      return {
        name: shortName,
        fullName: p.project_name,
        status: p.status.includes("completed") ? "Commissioned / Tendered" : "Active Civil Works",
        amountM: Number((p.total_cost_zmw / 1_000_000).toFixed(2)),
        rawZmw: p.total_cost_zmw,
        source: p.source_of_fin,
      };
    }).sort((a, b) => b.amountM - a.amountM);
  }, []);

  const zdspStatusData = React.useMemo(() => {
    const map = new Map<string, { count: number; totalZmw: number }>();
    ZDSP_PROJECTS.forEach((p) => {
      const isCompleted = p.status.toLowerCase().includes("completed") || p.status.toLowerCase().includes("commissioned");
      const key = isCompleted ? "Phase Completed / Ready" : "Civil Works in Progress";
      const cur = map.get(key) || { count: 0, totalZmw: 0 };
      map.set(key, { count: cur.count + 1, totalZmw: cur.totalZmw + p.total_cost_zmw });
    });
    return Array.from(map.entries()).map(([name, { count, totalZmw }]) => ({
      name,
      count,
      value: Number((totalZmw / 1_000_000).toFixed(2)),
    }));
  }, []);

  // 3. Financial Records: Distribution by Revenue / Funding Category
  const finData = React.useMemo(() => {
    const map = new Map<string, { count: number; totalZmw: number }>();
    FINANCIAL_RECORDS.forEach((r) => {
      const cat = r.category;
      const cur = map.get(cat) || { count: 0, totalZmw: 0 };
      map.set(cat, {
        count: cur.count + 1,
        totalZmw: cur.totalZmw + r.amount_zmw,
      });
    });
    return Array.from(map.entries()).map(([name, { count, totalZmw }]) => ({
      name,
      count,
      value: Number((totalZmw / 1_000_000).toFixed(2)),
      amountM: Number((totalZmw / 1_000_000).toFixed(2)),
    })).sort((a, b) => b.amountM - a.amountM);
  }, []);

  // 4. Administrative Data: Demographics, Staffing & Civic Allocation Benchmark
  const adminData = React.useMemo(() => {
    const row = ADMIN_DATA[0];
    const totalCivicCap = CDF_PROJECTS.reduce((s, p) => s + p.amount_zmw, 0) +
      ZDSP_PROJECTS.reduce((s, p) => s + p.total_cost_zmw, 0) +
      FINANCIAL_RECORDS.reduce((s, p) => s + p.amount_zmw, 0);
    const perCapitaZmw = Math.round(totalCivicCap / (row?.population_2022 || 66030));

    return [
      { metric: "2022 Census Pop.", value: row?.population_2022 || 66030, unit: "Citizens", display: "66,030" },
      { metric: "Constituency Wards", value: 12, unit: "Civic Wards", display: "12 Wards" },
      { metric: "Per Capita Public Outlay", value: perCapitaZmw, unit: "ZMW / Person", display: `K${perCapitaZmw.toLocaleString()}` },
      { metric: "Key Administrative Units", value: 8, unit: "Departments", display: "8 Directorates" },
    ];
  }, []);

  const adminComparisonData = React.useMemo(() => {
    return [
      { ward: "Lusitu Ward", populationEst: 9200, cdfProjects: 4, fundingM: 4.85 },
      { ward: "Sikoongo Ward", populationEst: 7800, cdfProjects: 3, fundingM: 3.42 },
      { ward: "Kariba Ward", populationEst: 8400, cdfProjects: 3, fundingM: 4.10 },
      { ward: "Matua Ward", populationEst: 6100, cdfProjects: 2, fundingM: 2.05 },
      { ward: "Siavonga Central", populationEst: 14500, cdfProjects: 2, fundingM: 10.2 },
    ];
  }, []);

  // 5. News Articles: Distribution by Publication Category and Frequency Over Time
  const newsCategoryData = React.useMemo(() => {
    const map = new Map<string, number>();
    NEWS_ARTICLES.forEach((n) => {
      map.set(n.category, (map.get(n.category) || 0) + 1);
    });
    return Array.from(map.entries()).map(([name, count]) => ({
      name,
      value: count,
      count,
    }));
  }, []);

  const newsChronologyData = React.useMemo(() => {
    return NEWS_ARTICLES.map((n) => ({
      date: n.date_published,
      title: n.title.length > 28 ? n.title.slice(0, 26) + "…" : n.title,
      fullTitle: n.title,
      category: n.category,
      wordCount: n.body.split(/\s+/).length,
    })).sort((a, b) => a.date.localeCompare(b.date));
  }, []);

  return (
    <section className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-5">
      {/* Header & Dataset Visualizer Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
              <BarChart3 className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-stone-900 tracking-tight">
              Dataset Visualization & Distribution Dashboard (Recharts)
            </h3>
          </div>
          <p className="text-xs text-stone-600 mt-1">
            Visualizing project distributions, categories, and funding amounts across all 5 relational datasets.
          </p>
        </div>

        {/* Tab switcher between all 5 datasets */}
        <div className="flex items-center flex-wrap gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200 text-xs">
          {[
            { id: "cdf_projects", label: "1. CDF Projects", count: CDF_PROJECTS.length },
            { id: "zdsp_projects", label: "2. ZDSP Projects", count: ZDSP_PROJECTS.length },
            { id: "financial_records", label: "3. Financials", count: FINANCIAL_RECORDS.length },
            { id: "administrative_data", label: "4. Admin Profile", count: 1 },
            { id: "news_articles", label: "5. News Corpus", count: NEWS_ARTICLES.length },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveDataset(item.id)}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeDataset === item.id
                  ? "bg-white text-emerald-800 font-semibold shadow-2xs"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/60"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* DATASET 1: CDF PROJECTS DISTRIBUTION */}
      {activeDataset === "cdf_projects" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs text-stone-700">
              <strong>14 Verified CDF Projects</strong> • Total Capital:{" "}
              <span className="font-mono font-bold text-emerald-700">ZMW 33.45M</span>
            </div>
            <span className="text-[11px] text-stone-500 bg-stone-50 border border-stone-200 px-2 py-0.5 rounded">
              Grouped by Priority Sector &amp; Investment Volume
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Chart 1A: Horizontal Bar by Funding Amount */}
            <div className="border border-stone-200 rounded-lg p-4 bg-stone-50/40 space-y-2">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-emerald-700" />
                Funding Amount by Sector (ZMW Millions)
              </h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cdfData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                    <XAxis type="number" tickFormatter={(v) => `K${v}M`} stroke="#64748b" fontSize={11} />
                    <YAxis dataKey="name" type="category" width={115} stroke="#64748b" fontSize={10} />
                    <Tooltip
                      formatter={(v: unknown) => [`ZMW ${Number(v).toFixed(2)}M`, "Total Allocation"]}
                      labelFormatter={(label) => `Sector: ${label}`}
                      contentStyle={{ backgroundColor: "#1e293b", borderRadius: "6px", color: "#fff", fontSize: "12px" }}
                    />
                    <Bar dataKey="amountM" fill="#047857" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 1B: Donut Chart by Project Count */}
            <div className="border border-stone-200 rounded-lg p-4 bg-stone-50/40 space-y-2">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                <PieIcon className="w-3.5 h-3.5 text-blue-600" />
                Project Count Breakdown by Priority Category
              </h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={cdfData}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={3}
                    >
                      {cdfData.map((_, i) => (
                        <Cell key={`cell-cdf-${i}`} fill={PALETTE[i % PALETTE.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v: unknown) => [`${v} Projects`, "Volume"]}
                      contentStyle={{ backgroundColor: "#1e293b", borderRadius: "6px", color: "#fff", fontSize: "12px" }}
                    />
                    <Legend verticalAlign="bottom" height={36} formatter={(val) => <span className="text-[11px] text-stone-700">{val}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DATASET 2: ZDSP CAPITAL PROJECTS */}
      {activeDataset === "zdsp_projects" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs text-stone-700">
              <strong>5 Devolution Capital Works</strong> • World Bank / Ministry Grant:{" "}
              <span className="font-mono font-bold text-blue-700">ZMW 11.20M</span>
            </div>
            <span className="text-[11px] text-stone-500 bg-stone-50 border border-stone-200 px-2 py-0.5 rounded">
              Zambia Devolution Support Programme (ZDSP)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Chart 2A: Individual Project Cost */}
            <div className="border border-stone-200 rounded-lg p-4 bg-stone-50/40 space-y-2">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                Devolution Project Cost Allocation (ZMW Millions)
              </h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={zdspData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                    <XAxis type="number" tickFormatter={(v) => `K${v}M`} stroke="#64748b" fontSize={11} />
                    <YAxis dataKey="name" type="category" width={120} stroke="#64748b" fontSize={10} />
                    <Tooltip
                      formatter={(v: unknown) => [`ZMW ${Number(v).toFixed(2)}M`, "Total Cost"]}
                      labelFormatter={(_, payload) => payload?.[0]?.payload?.fullName || ""}
                      contentStyle={{ backgroundColor: "#1e293b", borderRadius: "6px", color: "#fff", fontSize: "12px" }}
                    />
                    <Bar dataKey="amountM" fill="#2563eb" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2B: Status Distribution Pie */}
            <div className="border border-stone-200 rounded-lg p-4 bg-stone-50/40 space-y-2">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-600" />
                Implementation Status Distribution
              </h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={zdspStatusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                    >
                      <Cell fill="#047857" />
                      <Cell fill="#2563eb" />
                    </Pie>
                    <Tooltip
                      formatter={(v: unknown) => [`ZMW ${Number(v).toFixed(2)}M`, "Committed"]}
                      contentStyle={{ backgroundColor: "#1e293b", borderRadius: "6px", color: "#fff", fontSize: "12px" }}
                    />
                    <Legend verticalAlign="bottom" height={36} formatter={(val) => <span className="text-[11px] text-stone-700">{val}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DATASET 3: FINANCIAL RECORDS & REVENUE MENTIONS */}
      {activeDataset === "financial_records" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs text-stone-700">
              <strong>10 Verified Financial Entries</strong> • Total Analyzed Portfolio:{" "}
              <span className="font-mono font-bold text-purple-700">ZMW 206.45M</span>
            </div>
            <span className="text-[11px] text-stone-500 bg-stone-50 border border-stone-200 px-2 py-0.5 rounded">
              LGEF Grants • Approved Budgets • CDF Allocations • Local Revenues
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Chart 3A: Funding Distribution by Category */}
            <div className="border border-stone-200 rounded-lg p-4 bg-stone-50/40 space-y-2">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-purple-700" />
                Funding Amount by Financial Category (ZMW Millions)
              </h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={finData} margin={{ top: 10, right: 20, left: 0, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={10} angle={-15} textAnchor="end" />
                    <YAxis tickFormatter={(v) => `K${v}M`} stroke="#64748b" fontSize={11} />
                    <Tooltip
                      formatter={(v: unknown) => [`ZMW ${Number(v).toFixed(2)}M`, "Funding"]}
                      contentStyle={{ backgroundColor: "#1e293b", borderRadius: "6px", color: "#fff", fontSize: "12px" }}
                    />
                    <Bar dataKey="amountM" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 3B: Category Proportion */}
            <div className="border border-stone-200 rounded-lg p-4 bg-stone-50/40 space-y-2">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                <PieIcon className="w-3.5 h-3.5 text-emerald-700" />
                Financial Portfolio Share Breakdown
              </h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={finData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={3}
                    >
                      {finData.map((_, i) => (
                        <Cell key={`cell-fin-${i}`} fill={PALETTE[i % PALETTE.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v: unknown) => [`ZMW ${Number(v).toFixed(2)}M`, "Amount"]}
                      contentStyle={{ backgroundColor: "#1e293b", borderRadius: "6px", color: "#fff", fontSize: "12px" }}
                    />
                    <Legend verticalAlign="bottom" height={36} formatter={(val) => <span className="text-[11px] text-stone-700">{val}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DATASET 4: ADMINISTRATIVE DATA */}
      {activeDataset === "administrative_data" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs text-stone-700">
              <strong>Council Administrative Profile</strong> • Population (2022 Census):{" "}
              <span className="font-mono font-bold text-stone-900">66,030 Residents</span>
            </div>
            <span className="text-[11px] text-stone-500 bg-stone-50 border border-stone-200 px-2 py-0.5 rounded">
              Zambia Statistical Agency (ZamStats) &amp; Council Gazette
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {adminData.map((d) => (
              <div key={d.metric} className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <div className="text-[11px] text-stone-500">{d.metric}</div>
                <div className="text-lg font-bold font-mono text-emerald-800 mt-1">{d.display}</div>
                <div className="text-[10px] text-stone-400 mt-0.5">{d.unit}</div>
              </div>
            ))}
          </div>

          {/* Ward Population & Funding Correlation Chart */}
          <div className="border border-stone-200 rounded-lg p-4 bg-stone-50/40 space-y-2">
            <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-700" />
              Ward Population vs. Tracked Development Funding (ZMW Millions)
            </h4>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adminComparisonData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="ward" stroke="#64748b" fontSize={11} />
                  <YAxis yAxisId="left" stroke="#047857" fontSize={11} tickFormatter={(v) => `K${v}M`} />
                  <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={11} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                  <Tooltip
                    formatter={(val: unknown, name: string) => [
                      name === "fundingM" ? `ZMW ${val}M` : `${Number(val).toLocaleString()} people`,
                      name === "fundingM" ? "Tracked Allocation" : "Est. Population"
                    ]}
                    contentStyle={{ backgroundColor: "#1e293b", borderRadius: "6px", color: "#fff", fontSize: "12px" }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                  <Bar yAxisId="left" dataKey="fundingM" name="Tracked Outlay (ZMW M)" fill="#047857" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="populationEst" name="Ward Population" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* DATASET 5: NEWS ARTICLES CORPUS */}
      {activeDataset === "news_articles" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs text-stone-700">
              <strong>5 Civic News Disclosures</strong> • Official press statements &amp; public notices
            </div>
            <span className="text-[11px] text-stone-500 bg-stone-50 border border-stone-200 px-2 py-0.5 rounded">
              Extracted directly from siavongacouncil.gov.zm
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Chart 5A: News by Topic Category */}
            <div className="border border-stone-200 rounded-lg p-4 bg-stone-50/40 space-y-2">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                <PieIcon className="w-3.5 h-3.5 text-emerald-700" />
                News Article Distribution by Civic Category
              </h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={newsCategoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                    >
                      {newsCategoryData.map((_, i) => (
                        <Cell key={`cell-news-${i}`} fill={PALETTE[i % PALETTE.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v: unknown) => [`${v} Articles`, "Disclosures"]}
                      contentStyle={{ backgroundColor: "#1e293b", borderRadius: "6px", color: "#fff", fontSize: "12px" }}
                    />
                    <Legend verticalAlign="bottom" height={36} formatter={(val) => <span className="text-[11px] text-stone-700">{val}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 5B: Article Content Volume / Word Count by Publication Date */}
            <div className="border border-stone-200 rounded-lg p-4 bg-stone-50/40 space-y-2">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                Article Detail Depth &amp; Disclosure Timeline (Word Count)
              </h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={newsChronologyData} margin={{ top: 10, right: 20, left: 0, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={10} />
                    <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `${v}w`} />
                    <Tooltip
                      formatter={(v: unknown) => [`${v} words`, "Length"]}
                      labelFormatter={(_, payload) => payload?.[0]?.payload?.fullTitle || ""}
                      contentStyle={{ backgroundColor: "#1e293b", borderRadius: "6px", color: "#fff", fontSize: "12px" }}
                    />
                    <Bar dataKey="wordCount" fill="#0891b2" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DatasetVisualizerDashboard;
