import React from 'react';
import { Download, Upload, RotateCcw, Save, Calendar, Users, Calculator, BarChart3, Building2 } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  rosterCount,
  calendarCount,
  onSave,
  onExport,
  onImport,
  onReset
}) {
  return (
    <header className="bg-trough-dark border-b border-trough-border sticky top-0 z-50 px-4 md:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-trough-yellow rounded-xl flex items-center justify-center font-black text-trough-dark text-xl tracking-tighter shadow-lg shadow-yellow-500/25">
            TX
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-wide text-white uppercase">TROUGH X CASHFLOW DASHBOARD</h1>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-trough-card text-trough-yellow border border-trough-yellow/30">
                REACT + VERCEL
              </span>
            </div>
            <p className="text-[11px] text-gray-400">273 Crown St | Capacity 300 | Multi-Stream Financial Suite</p>
          </div>
        </div>

        {/* Navigation & Persistent Actions */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Navigation Tabs */}
          <div className="flex bg-[#181A24] p-1 rounded-xl border border-trough-border text-xs font-semibold">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'simulator' ? 'bg-trough-yellow text-trough-dark shadow font-bold' : 'text-gray-300 hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Budget Simulator</span>
            </button>

            <button
              onClick={() => setActiveTab('wages')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'wages' ? 'bg-trough-yellow text-trough-dark shadow font-bold' : 'text-gray-300 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Roster ({rosterCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'calendar' ? 'bg-trough-yellow text-trough-dark shadow font-bold' : 'text-gray-300 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Calendar ({calendarCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('executive')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'executive' ? 'bg-trough-yellow text-trough-dark shadow font-bold' : 'text-gray-300 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Executive Report</span>
            </button>
          </div>

          {/* Cloud & Local Persistence Actions */}
          <button
            onClick={onSave}
            className="px-3.5 py-1.5 rounded-xl bg-trough-yellow hover:bg-trough-yellowDark text-trough-dark text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
            title="Save all changes to browser & database"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save All</span>
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={onExport}
              className="p-2 rounded-lg bg-trough-card hover:bg-trough-border text-gray-300 text-xs border border-trough-border transition-colors"
              title="Export Full Backup (JSON)"
            >
              <Download className="w-3.5 h-3.5" />
            </button>

            <label
              className="p-2 rounded-lg bg-trough-card hover:bg-trough-border text-gray-300 text-xs border border-trough-border cursor-pointer transition-colors"
              title="Import Backup (JSON)"
            >
              <input type="file" accept=".json" onChange={onImport} className="hidden" />
              <Upload className="w-3.5 h-3.5" />
            </label>

            <button
              onClick={onReset}
              className="p-2 rounded-lg bg-trough-card hover:bg-rose-950/50 hover:text-rose-300 text-gray-400 text-xs border border-trough-border transition-colors"
              title="Reset All to Factory Defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
