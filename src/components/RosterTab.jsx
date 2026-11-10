import React from 'react';
import { Plus, Trash2, Save, Info, Users } from 'lucide-react';

export default function RosterTab({
  roster,
  venue,
  wageSummary,
  handleRosterChange,
  handleAddRosterRow,
  handleDeleteRosterRow,
  onSave
}) {
  return (
    <div className="space-y-6">
      <div className="bg-trough-card border border-trough-border rounded-2xl p-6">
        
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-trough-border">
          <div>
            <h2 className="text-base font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <Users className="w-5 h-5 text-trough-yellow" />
              <span>Live Staffing Roster & Wage Calculator</span>
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Directly edit position titles, headcount, shift lengths, hourly wages, and superannuation.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleAddRosterRow}
              className="px-3.5 py-2 bg-trough-dark hover:bg-trough-border border border-trough-yellow/40 text-trough-yellow font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Staff Role</span>
            </button>

            <div className="px-4 py-2 bg-trough-dark rounded-xl border border-trough-border text-xs">
              <span className="text-gray-400">Total Shift Exposure: </span>
              <span className="font-extrabold text-trough-yellow">${wageSummary.totalCost.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Staff Table */}
        <div className="overflow-x-auto custom-scrollbar mt-4">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#13141C] text-gray-300 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-3 rounded-l-lg">Role / Title</th>
                <th className="py-3 px-2 text-center">Headcount</th>
                <th className="py-3 px-2 text-center">Hours</th>
                <th className="py-3 px-2 text-right">Rate ($/hr)</th>
                <th className="py-3 px-3 text-center">Super (11.5%)</th>
                <th className="py-3 px-3 text-right">Total Cost</th>
                <th className="py-3 px-3">Responsibilities / Scope</th>
                <th className="py-3 px-2 text-center rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-trough-border/50 text-gray-300">
              {roster.map((row) => {
                const superMultiplier = row.superEligible ? (1 + venue.standardSuperRate) : 1.0;
                const lineCost = (Number(row.headcount) || 0) * (Number(row.hours) || 0) * (Number(row.rate) || 0) * superMultiplier;
                return (
                  <tr key={row.id} className="hover:bg-trough-card/40 transition-colors">
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={row.role}
                        onChange={(e) => handleRosterChange(row.id, 'role', e.target.value)}
                        className="w-full px-2 py-1 bg-trough-dark border border-trough-border rounded text-white text-xs font-semibold focus:border-trough-yellow outline-none"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={row.headcount}
                        onChange={(e) => handleRosterChange(row.id, 'headcount', e.target.value)}
                        className="w-14 px-2 py-1 bg-trough-dark border border-trough-border rounded text-center text-white text-xs font-semibold focus:border-trough-yellow outline-none"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <input
                        type="number"
                        min="0.5"
                        max="16"
                        step="0.5"
                        value={row.hours}
                        onChange={(e) => handleRosterChange(row.id, 'hours', e.target.value)}
                        className="w-16 px-2 py-1 bg-trough-dark border border-trough-border rounded text-center text-white text-xs font-semibold focus:border-trough-yellow outline-none"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-right">
                      <input
                        type="number"
                        min="20"
                        max="200"
                        step="1"
                        value={row.rate}
                        onChange={(e) => handleRosterChange(row.id, 'rate', e.target.value)}
                        className="w-20 px-2 py-1 bg-trough-dark border border-trough-border rounded text-right text-trough-yellow text-xs font-bold focus:border-trough-yellow outline-none"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => handleRosterChange(row.id, 'superEligible', !row.superEligible)}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-all ${
                          row.superEligible ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600' : 'bg-gray-800 text-gray-400 border-gray-700'
                        }`}
                      >
                        {row.superEligible ? 'Eligible (11.5%)' : 'Exempt / Agency'}
                      </button>
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-white whitespace-nowrap">
                      ${lineCost.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={row.notes}
                        onChange={(e) => handleRosterChange(row.id, 'notes', e.target.value)}
                        className="w-full px-2 py-1 bg-trough-dark border border-trough-border rounded text-gray-300 text-xs focus:border-trough-yellow outline-none"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <button
                        onClick={() => handleDeleteRosterRow(row.id)}
                        className="p-1.5 text-gray-500 hover:text-rose-400 transition-colors"
                        title="Delete Role"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-trough-yellow bg-[#13141C] font-bold text-white">
                <td className="py-3 px-3">TOTAL DIRECT LABOUR</td>
                <td className="py-3 px-2 text-center">{wageSummary.totalHeadcount} Staff</td>
                <td className="py-3 px-2 text-center">{wageSummary.totalHours.toFixed(1)} hrs</td>
                <td className="py-3 px-2 text-right">-</td>
                <td className="py-3 px-3 text-center">-</td>
                <td className="py-3 px-3 text-right text-trough-yellow font-black text-sm">
                  ${wageSummary.totalCost.toFixed(2)}
                </td>
                <td className="py-3 px-3 text-gray-400 text-xs" colSpan="2">
                  Automatically recalculates all simulator models & forecasts
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Footer save helper */}
        <div className="mt-5 p-4 rounded-xl bg-trough-dark border border-trough-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-gray-400">
            <Info className="w-4 h-4 text-trough-yellow flex-shrink-0" />
            <span>Changes made to staff numbers, shift lengths, or rates persist automatically in your browser.</span>
          </div>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-trough-yellow hover:bg-trough-yellowDark text-trough-dark font-bold rounded-lg text-xs transition-all shadow flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Staff Roster</span>
          </button>
        </div>

      </div>
    </div>
  );
}
