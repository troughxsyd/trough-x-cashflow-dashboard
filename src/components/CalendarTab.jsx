import React, { useState } from 'react';
import { Plus, Trash2, Calendar, Save, X } from 'lucide-react';

export default function CalendarTab({
  calendar,
  handleCalendarChange,
  handleDeleteEvent,
  handleAddEvent,
  onSave
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    date: "2026-12-25",
    title: "",
    promoter: "",
    model: "Promoter Hosted ($5 clip)",
    pax: 200,
    barSales: 5000,
    ticketClip: 1000,
    estWages: 3200,
    notes: ""
  });

  const onSubmit = (e) => {
    e.preventDefault();
    handleAddEvent(newEvent);
    setShowAddModal(false);
    setNewEvent({
      date: "2026-12-25",
      title: "",
      promoter: "",
      model: "Promoter Hosted ($5 clip)",
      pax: 200,
      barSales: 5000,
      ticketClip: 1000,
      estWages: 3200,
      notes: ""
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-trough-card border border-trough-border rounded-2xl p-6">
        
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-trough-border">
          <div>
            <h2 className="text-base font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <Calendar className="w-5 h-5 text-trough-yellow" />
              <span>Forthcoming Events & Pipeline Manager</span>
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Add, edit, or adjust all figures for scheduled bookings.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 bg-trough-dark hover:bg-trough-border border border-trough-yellow/40 text-trough-yellow font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Forthcoming Event</span>
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 bg-trough-yellow hover:bg-trough-yellowDark text-trough-dark font-bold rounded-xl text-xs transition-all shadow flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Calendar</span>
            </button>
          </div>
        </div>

        {/* Calendar Table */}
        <div className="overflow-x-auto custom-scrollbar mt-4">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#13141C] text-gray-300 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-2 rounded-l-lg">Date</th>
                <th className="py-3 px-3">Title</th>
                <th className="py-3 px-3">Promoter</th>
                <th className="py-3 px-2">Model</th>
                <th className="py-3 px-2 text-center">Pax</th>
                <th className="py-3 px-2 text-right">Target Bar ($)</th>
                <th className="py-3 px-2 text-right">Ticket/Clip ($)</th>
                <th className="py-3 px-2 text-right">Venue Wages ($)</th>
                <th className="py-3 px-2 text-right">Est. Surplus</th>
                <th className="py-3 px-3">Status / Notes</th>
                <th className="py-3 px-2 text-center rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-trough-border/50 text-gray-300">
              {calendar.map((ev) => {
                const gross = (Number(ev.barSales) || 0) + (Number(ev.ticketClip) || 0);
                const surplus = gross - ((Number(ev.barSales) || 0) * 0.22) - (Number(ev.estWages) || 0) - 250;
                return (
                  <tr key={ev.id} className="hover:bg-trough-card/40 transition-colors">
                    <td className="py-2.5 px-2">
                      <input
                        type="text"
                        value={ev.date}
                        onChange={(e) => handleCalendarChange(ev.id, 'date', e.target.value)}
                        className="w-24 px-2 py-1 bg-trough-dark border border-trough-border rounded text-white text-xs font-semibold focus:border-trough-yellow outline-none"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={ev.title}
                        onChange={(e) => handleCalendarChange(ev.id, 'title', e.target.value)}
                        className="w-32 px-2 py-1 bg-trough-dark border border-trough-border rounded text-white text-xs font-bold focus:border-trough-yellow outline-none"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={ev.promoter}
                        onChange={(e) => handleCalendarChange(ev.id, 'promoter', e.target.value)}
                        className="w-28 px-2 py-1 bg-trough-dark border border-trough-border rounded text-gray-300 text-xs focus:border-trough-yellow outline-none"
                      />
                    </td>
                    <td className="py-2.5 px-2">
                      <select
                        value={ev.model}
                        onChange={(e) => handleCalendarChange(ev.id, 'model', e.target.value)}
                        className="px-2 py-1 bg-trough-dark border border-trough-border rounded text-gray-300 text-[11px] focus:border-trough-yellow outline-none"
                      >
                        <option value="Promoter Hosted ($5 clip)">Promoter Hosted ($5 clip)</option>
                        <option value="Owned Party (100% Rev)">Owned Party (100% Rev)</option>
                        <option value="Daytime Concept (Mode B)">Daytime Concept (Mode B)</option>
                        <option value="Co-Branded Hero Night">Co-Branded Hero Night</option>
                        <option value="Owned Festival Takeover">Owned Festival Takeover</option>
                        <option value="Sunday Recovery Mode">Sunday Recovery Mode</option>
                      </select>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <input
                        type="number"
                        min="10"
                        max="300"
                        value={ev.pax}
                        onChange={(e) => handleCalendarChange(ev.id, 'pax', e.target.value)}
                        className="w-14 px-1.5 py-1 bg-trough-dark border border-trough-border rounded text-center text-white text-xs font-bold focus:border-trough-yellow outline-none"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-right">
                      <input
                        type="number"
                        min="0"
                        step="250"
                        value={ev.barSales}
                        onChange={(e) => handleCalendarChange(ev.id, 'barSales', e.target.value)}
                        className="w-20 px-2 py-1 bg-trough-dark border border-trough-border rounded text-right text-gray-200 text-xs focus:border-trough-yellow outline-none"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-right">
                      <input
                        type="number"
                        min="0"
                        step="100"
                        value={ev.ticketClip}
                        onChange={(e) => handleCalendarChange(ev.id, 'ticketClip', e.target.value)}
                        className="w-20 px-2 py-1 bg-trough-dark border border-trough-border rounded text-right text-gray-200 text-xs focus:border-trough-yellow outline-none"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-right">
                      <input
                        type="number"
                        min="0"
                        step="100"
                        value={ev.estWages}
                        onChange={(e) => handleCalendarChange(ev.id, 'estWages', e.target.value)}
                        className="w-20 px-2 py-1 bg-trough-dark border border-trough-border rounded text-right text-rose-300 text-xs font-semibold focus:border-trough-yellow outline-none"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-right font-black text-trough-yellow whitespace-nowrap">
                      ${surplus.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={ev.notes}
                        onChange={(e) => handleCalendarChange(ev.id, 'notes', e.target.value)}
                        className="w-full min-w-[140px] px-2 py-1 bg-trough-dark border border-trough-border rounded text-gray-400 text-xs focus:border-trough-yellow outline-none"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <button
                        onClick={() => handleDeleteEvent(ev.id)}
                        className="p-1.5 text-gray-500 hover:text-rose-400 transition-colors"
                        title="Delete Event"
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
                <td className="py-3 px-2" colSpan="4">TOTAL PIPELINE ({calendar.length} Events)</td>
                <td className="py-3 px-2 text-center">
                  {calendar.reduce((acc, e) => acc + (Number(e.pax) || 0), 0).toLocaleString()} PAX
                </td>
                <td className="py-3 px-2 text-right">
                  ${calendar.reduce((acc, e) => acc + (Number(e.barSales) || 0), 0).toLocaleString()}
                </td>
                <td className="py-3 px-2 text-right">
                  ${calendar.reduce((acc, e) => acc + (Number(e.ticketClip) || 0), 0).toLocaleString()}
                </td>
                <td className="py-3 px-2 text-right text-rose-300">
                  ${calendar.reduce((acc, e) => acc + (Number(e.estWages) || 0), 0).toLocaleString()}
                </td>
                <td className="py-3 px-2 text-right text-trough-yellow font-black text-sm">
                  ${calendar.reduce((acc, e) => {
                    const g = (Number(e.barSales) || 0) + (Number(e.ticketClip) || 0);
                    return acc + (g - ((Number(e.barSales) || 0) * 0.22) - (Number(e.estWages) || 0) - 250);
                  }, 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </td>
                <td className="py-3 px-3 text-gray-400 text-xs" colSpan="2">
                  Total Net Pipeline Surplus
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-trough-card border border-trough-border rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-trough-border">
              <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-5 h-5 text-trough-yellow" />
                <span>Add Forthcoming Event</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-medium">Event Date</label>
                  <input
                    type="text"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    placeholder="YYYY-MM-DD or DD/MM/YYYY"
                    className="w-full px-3 py-2 bg-trough-dark border border-trough-border rounded-lg text-white font-semibold focus:border-trough-yellow outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-medium">Attendance (PAX)</label>
                  <input
                    type="number"
                    min="10"
                    max="300"
                    value={newEvent.pax}
                    onChange={(e) => setNewEvent({ ...newEvent, pax: e.target.value })}
                    className="w-full px-3 py-2 bg-trough-dark border border-trough-border rounded-lg text-white font-semibold focus:border-trough-yellow outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-medium">Event Title / Brand</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="e.g. THROBB, Red Rave, Club Fernando"
                  className="w-full px-3 py-2 bg-trough-dark border border-trough-border rounded-lg text-white font-bold focus:border-trough-yellow outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-medium">Promoter / Producer</label>
                  <input
                    type="text"
                    value={newEvent.promoter}
                    onChange={(e) => setNewEvent({ ...newEvent, promoter: e.target.value })}
                    placeholder="e.g. brute.club, POOF DOOF"
                    className="w-full px-3 py-2 bg-trough-dark border border-trough-border rounded-lg text-white focus:border-trough-yellow outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-medium">Operating Model</label>
                  <select
                    value={newEvent.model}
                    onChange={(e) => setNewEvent({ ...newEvent, model: e.target.value })}
                    className="w-full px-3 py-2 bg-trough-dark border border-trough-border rounded-lg text-white font-medium focus:border-trough-yellow outline-none"
                  >
                    <option value="Promoter Hosted ($5 clip)">Promoter Hosted ($5 clip)</option>
                    <option value="Owned Party (100% Rev)">Owned Party (100% Rev)</option>
                    <option value="Daytime Concept (Mode B)">Daytime Concept (Mode B)</option>
                    <option value="Co-Branded Hero Night">Co-Branded Hero Night</option>
                    <option value="Owned Festival Takeover">Owned Festival Takeover</option>
                    <option value="Sunday Recovery Mode">Sunday Recovery Mode</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-medium">Target Bar ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="250"
                    value={newEvent.barSales}
                    onChange={(e) => setNewEvent({ ...newEvent, barSales: e.target.value })}
                    className="w-full px-3 py-2 bg-trough-dark border border-trough-border rounded-lg text-white font-semibold focus:border-trough-yellow outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-medium">Ticket/Clip ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={newEvent.ticketClip}
                    onChange={(e) => setNewEvent({ ...newEvent, ticketClip: e.target.value })}
                    className="w-full px-3 py-2 bg-trough-dark border border-trough-border rounded-lg text-white font-semibold focus:border-trough-yellow outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-medium">Est. Wages ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={newEvent.estWages}
                    onChange={(e) => setNewEvent({ ...newEvent, estWages: e.target.value })}
                    className="w-full px-3 py-2 bg-trough-dark border border-trough-border rounded-lg text-rose-300 font-semibold focus:border-trough-yellow outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-medium">Status / Notes</label>
                <input
                  type="text"
                  value={newEvent.notes}
                  onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
                  placeholder="e.g. Deposit paid, security ratio, queue pacing"
                  className="w-full px-3 py-2 bg-trough-dark border border-trough-border rounded-lg text-gray-300 focus:border-trough-yellow outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-trough-border">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-trough-dark hover:bg-trough-border text-gray-300 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-trough-yellow hover:bg-trough-yellowDark text-trough-dark font-bold rounded-lg transition-all shadow"
                >
                  Add to Calendar
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
